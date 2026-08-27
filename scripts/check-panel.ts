/**
 * `npm run check:panel`
 *
 * Panelin ürettiği HTML'i çalıştırmadan sınar. Bu dosyalar Firestore'a
 * dokunmadığı için doğrudan çağrılabiliyorlar — paneli ayağa kaldırıp gerçek bir
 * veritabanı bağlamaya gerek yok.
 *
 * Buradaki kontroller iki şeyi koruyor: arşiv kipinin **gizlediği alanların
 * veriyi silmemesi** (gizlenen alan formdan da düşerse kaydetmek onu sessizce
 * temizler), ve her enterpolasyonun kaçırılmış olması.
 */
import { isBucketMissing, keyProblem } from '../admin/photos';
import { archiveList, eventForm } from '../admin/views';

let failed = 0;
function assert(name: string, condition: boolean, detail = '') {
  console.log(`${condition ? '✓' : '✗'} ${name}${condition ? '' : `\n    ${detail}`}`);
  if (!condition) failed += 1;
}

const VALUES = {
  id: 'git-atolyesi',
  title: 'Git Atölyesi',
  tag: 'Atölye',
  capacity: '60',
  badge: 'SON GUN',
  soon: true,
  attendance: '42',
  startsAtDate: '2025-11-12',
  startsAtTime: '18:00',
  endsAt: '20:30',
  photos: ['https://example.com/a.jpg', 'https://example.com/b.jpg'],
};

// 1. Normal form: kontenjan ve rozet görünür alanlar.
const normal = eventForm(VALUES, {}, { editing: true, registered: 3, shown: 3 });
assert('normal formda kontenjan görünür', /<input type="number" name="capacity"/.test(normal));
assert('normal formda rozet görünür', /<input type="text" name="badge"/.test(normal));
assert('normal formda kayıt kartı var', /Sayacı gerçek kayıtlara eşitle/.test(normal));
assert('normal formda vazgeç köke gider', /href="\/">Vazgeç/.test(normal));

// 2. Arşiv kipi: olmuş bir etkinlikte kontenjan ve son-gün rozeti anlamsız.
const archive = eventForm(VALUES, {}, { editing: true, archive: true });
assert('arşivde kontenjan alanı yok', !/<input type="number" name="capacity"/.test(archive));
assert('arşivde rozet alanı yok', !/<input type="text" name="badge"/.test(archive));
assert('arşivde kayıt kartı yok', !/Sayacı gerçek kayıtlara eşitle/.test(archive));
assert('arşivde vazgeç arşive döner', /href="\/arsiv">Vazgeç/.test(archive));

// 3. Asıl mesele: gizlenen alan **formdan düşmemeli**. Düşerse arşivden
//    kaydetmek var olan kontenjanı ve rozeti sessizce siler — ekranda hiçbir
//    şey olmaz, veri gider.
assert(
  'gizlenen kontenjan gizli alanda korunuyor',
  /<input type="hidden" name="capacity" value="60">/.test(archive),
);
assert(
  'gizlenen rozet gizli alanda korunuyor',
  /<input type="hidden" name="badge" value="SON GUN">/.test(archive),
);
assert('gizlenen son-gün korunuyor', /<input type="hidden" name="soon" value="1">/.test(archive));

// `soon` kapalıysa gizli alan hiç basılmamalı, yoksa kapalı bir bayrak
// kaydettikçe açılırdı.
const notSoon = eventForm({ ...VALUES, soon: false }, {}, { editing: true, archive: true });
assert('son-gün kapalıyken gizli alan yok', !/name="soon"/.test(notSoon));

// 4. Yeni arşiv kaydı kendi rotasına gönderiyor; düzenleme kendi adresine.
const fresh = eventForm({}, {}, {
  editing: false,
  archive: true,
  sources: [{ id: 'ev1', label: 'Git Atölyesi — 12 Kasım' }],
});
// `method="post"` ile birlikte aranıyor: aynı sayfadaki doldurma formu da
// /arsiv/yeni'ye gidiyor ve yalnızca adrese bakan bir kontrol, POST formu
// bozulsa bile onu bulup yeşil veriyordu.
assert(
  'yeni arşiv formu /arsiv/yeni’ye POST ediyor',
  /<form method="post" action="\/arsiv\/yeni"/.test(fresh),
);
// Düzenleme formu kendi adresine gönderiyor: `action` hiç basılmıyor.
// Sayfadaki her POST formunu aramak işe yaramaz — nav'daki çıkış formu da
// `action` taşıyor ve doğru kodda kırmızı verirdi.
assert(
  'düzenleme kendi adresine gönderiyor',
  /<form method="post" enctype="multipart\/form-data">/.test(archive),
);
assert('düzenleme /arsiv/yeni’ye gönderilmiyor', !/<form method="post" action="\/arsiv/.test(archive));
assert('doldurma listesi yeni formda', /name="from"/.test(fresh));
assert('doldurma listesi düzenlemede yok', !/name="from"/.test(archive));

// 5. Arşiv listesi: görseli olmayan kayıt göze çarpmalı — sayfanın işi bu.
const list = archiveList([
  { id: 'a', title: 'Kış Kampı', short: '12 Aralık · B Blok', tag: 'Atölye', photos: 0 },
  { id: 'b', title: 'Teknoloji Gecesi', short: '3 Kasım · Konferans', tag: 'Söyleşi', photos: 3, attendance: 63 },
]);
assert('görselsiz kayıt işaretleniyor', /görsel yok/.test(list));
assert('görsel sayısı yazıyor', /3 görsel/.test(list));
assert('katılım yazıyor', /63 kişi/.test(list));
assert('katılım girilmemişse tire', /<span class="hint">—<\/span>/.test(list));
assert('boş arşiv kendi metnini veriyor', /Arşivde etkinlik yok/.test(archiveList([])));

// 6. Kaçış. Etkinlik başlıkları serbest metin ve panel açık bir sunucuda
//    çalışıyor; kaçırılmayan tek enterpolasyon paneli kendi kendine XSS taşır.
const nasty = '"><img src=x onerror=alert(1)>';
const escaped = eventForm({ ...VALUES, title: nasty }, {}, { editing: true, archive: true });
assert('başlık kaçırılıyor', !/<img src=x/.test(escaped), 'ham <img çıktıya girdi');
const escapedList = archiveList([
  { id: nasty, title: nasty, short: nasty, tag: nasty, photos: 1 },
]);
assert('liste kaçırılıyor', !/<img src=x/.test(escapedList), 'ham <img çıktıya girdi');

// Hata mesajları da kaçırılmalı: bazıları dosya adı gibi dışarıdan gelen
// parçalar taşıyor.
const withError = eventForm(VALUES, { photos: nasty }, { editing: true, archive: true });
assert('hata mesajı kaçırılıyor', !/<img src=x/.test(withError));

// 7. Yükleme hatasının tanınması.
//
// Bu kontrol var çünkü tam olarak burası bir kez kaçırıldı: Firebase yolunda
// `err.code === 404` diye bakılıyordu, gaxios ise `status` yazıyordu. Dal hiç
// çalışmadı ve yöneticiye üç kez üst üste "Bir şeyler ters gitti" gösterildi.
//
// Supabase'in hata nesnesi başka bir şekle sahip ve `statusCode` **metin**
// olarak geliyor. Aynı hatayı ikinci kez yapmamak için üç alan da sınanıyor.
const SUPABASE_NO_BUCKET = {
  statusCode: '404',
  error: 'Bucket not found',
  message: 'Bucket not found',
};
assert('supabase "Bucket not found" tanınıyor', isBucketMissing(SUPABASE_NO_BUCKET));
assert(
  'metin statusCode sayıya çevriliyor',
  isBucketMissing({ statusCode: '404', message: 'başka bir şey' }),
);
assert('yalnızca mesajdan da tanınıyor', isBucketMissing({ message: 'Bucket not found' }));

// Nesne bulunamadı: bucket **var**, dosya yok. Kuruluma dair bir şey söylemek
// yanlış yönlendirme olurdu — ama ikisi de 404 döndüğü için ayırt edilemiyor.
// Yükleme yolunda bu hata hiç oluşmadığı için sorun değil; yine de not düşülüyor.
assert(
  'yükleme hatası olmayanlar sayılmıyor',
  !isBucketMissing({ statusCode: '400', message: 'Duplicate' }) &&
    !isBucketMissing({ message: 'row-level security policy' }) &&
    !isBucketMissing(new Error('fetch failed')),
);

// 8. Anahtar türü. Panel bir kez yanlış anahtarla denendi ve Supabase
//    "row-level security policy" dedi — yani asıl sorunu (publishable anahtar
//    yazamaz) hiç söylemedi. Önek kontrolü ağa çıkmadan cevap veriyor.
assert(
  'publishable önek yakalanıyor',
  keyProblem('sb_publishable_FR-7VBv8Y_A6q3FlFzQfug_6u7IVEdY') === 'publishable',
);
assert('secret önek geçiyor', keyProblem('sb_secret_ornek123') === null);

// Eski sistem: rol JWT payload'ında.
assert('eski anon JWT yakalanıyor', keyProblem('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiAic3VwYWJhc2UiLCAicm9sZSI6ICJhbm9uIn0.imza') === 'anon');
assert('eski service_role JWT geçiyor', keyProblem('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiAic3VwYWJhc2UiLCAicm9sZSI6ICJzZXJ2aWNlX3JvbGUifQ.imza') === null);

// Çözülemeyen bir şey için karar vermiyoruz; isteğin kendisi konuşsun.
assert('anlamsız değer engellenmiyor', keyProblem('bir-sey') === null);

console.log(failed ? `\n${failed} kontrol başarısız.` : '\nTüm kontroller geçti.');
process.exit(failed ? 1 : 0);
