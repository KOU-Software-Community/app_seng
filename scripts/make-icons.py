#!/usr/bin/env python3
"""
Türetilmiş ikonları `assets/brand/logo.png` ve `assets/icon.png` dosyalarından
yeniden üretir.

    pip install pillow      # ya da: uv pip install pillow
    python3 scripts/make-icons.py

Derleme adımı DEĞİL, tek seferlik bir araç. Pillow bilerek package.json'a
eklenmedi; rozet değişmediği sürece bu script hiç çalıştırılmaz.

Üretilenler:

  assets/notification-icon.png              96×96, beyaz-üzeri-şeffaf
  assets/store/play-icon-512.png            512×512, alfasız
  assets/store/play-feature-graphic.png     1024×500

Neden kelime işaretinin tamamı değil de sadece "KOÜ": bildirim ikonu durum
çubuğunda 24dp görünür. Üç satırın tamamı o boyutta okunmuyor — "YAZILIM" ve
"KULÜBÜ" gri bir lekeye dönüşüyor. Tek satır kalın harf okunur kalıyor.
Tahmin değil; iki aday üretilip 24dp'ye küçültülerek karşılaştırıldı.
"""

from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
BRAND = ROOT / "assets" / "brand" / "logo.png"
APP_ICON = ROOT / "assets" / "icon.png"
STORE = ROOT / "assets" / "store"

# Marka gradyanı — src/theme.ts içindeki `gradients.splash` ile aynı.
GRADIENT = [(0x00, 0x1B, 0x4A), (0x01, 0x45, 0x76), (0x02, 0x6E, 0xA0)]
DOT_RGB = (147, 203, 220)
DOT_ALPHA = 56  # app/index.tsx içindeki DotField ile aynı: rgba(...,0.22)


def white_mask(image: Image.Image, inner_ratio: float = 0.78) -> Image.Image:
    """
    Logodaki beyaz pikselleri maskeye çevirir.

    `inner_ratio` dış beyaz halkayı dışarıda bırakır — halka da beyaz olduğu için
    maskeye girerse kelime işaretinin sınırlayıcı kutusu tüm rozete şişer.
    """
    image = image.convert("RGBA")
    w, h = image.size
    src = image.load()
    mask = Image.new("L", (w, h), 0)
    dst = mask.load()
    cx, cy = w / 2, h / 2
    limit = (inner_ratio * min(w, h) / 2) ** 2

    for y in range(h):
        for x in range(w):
            r, g, b, a = src[x, y]
            if a > 200 and r > 195 and g > 195 and b > 195:
                if (x - cx) ** 2 + (y - cy) ** 2 < limit:
                    dst[x, y] = 255
    return mask


def first_line_box(mask: Image.Image) -> tuple[int, int, int, int]:
    """Kelime işaretinin ilk satırı ("KOÜ"). Boş yatay şeritler satırları ayırır."""
    x0, y0, x1, y1 = mask.getbbox()
    px = mask.load()

    end = y1
    seen_content = False
    for y in range(y0, y1):
        filled = any(px[x, y] for x in range(x0, x1))
        if filled:
            seen_content = True
        elif seen_content:
            end = y
            break

    # Satırın kendi yatay sınırları — tüm işaretinki değil.
    line = mask.crop((x0, y0, x1, end))
    lx0, ly0, lx1, ly1 = line.getbbox()
    return (x0 + lx0, y0 + ly0, x0 + lx1, y0 + ly1)


def notification_icon(mask: Image.Image, box: tuple[int, int, int, int]) -> Image.Image:
    """96×96 beyaz-üzeri-şeffaf. Android alfa kanalını beyaza boyar."""
    crop = mask.crop(box)
    target = int(96 * 0.86)  # kenar boşluğu bırak
    scale = min(target / crop.width, target / crop.height)
    crop = crop.resize((round(crop.width * scale), round(crop.height * scale)), Image.LANCZOS)

    alpha = Image.new("L", (96, 96), 0)
    alpha.paste(crop, ((96 - crop.width) // 2, (96 - crop.height) // 2))
    white = Image.new("L", (96, 96), 255)
    return Image.merge("RGBA", (white, white, white, alpha))


def play_icon() -> Image.Image:
    """512×512, alfasız. Play şeffaflığı kendi maskesiyle ezer."""
    icon = Image.open(APP_ICON).convert("RGBA")
    flat = Image.new("RGB", icon.size, GRADIENT[0])
    flat.paste(icon, mask=icon.split()[3])
    return flat.resize((512, 512), Image.LANCZOS)


def feature_graphic() -> Image.Image:
    """
    1024×500. Play bunun üzerine oynat düğmesi ve metin bindirebiliyor, o yüzden
    içerik ortada ve kenarlardan uzak tutuldu.
    """
    w, h = 1024, 500
    base = Image.new("RGB", (w, h))
    draw = ImageDraw.Draw(base)

    # Köşegen gradyan: her satır boyunca üç durak arasında enterpolasyon.
    span = w + h
    for i in range(span):
        t = i / (span - 1)
        if t < 0.5:
            a, b, local = GRADIENT[0], GRADIENT[1], t / 0.5
        else:
            a, b, local = GRADIENT[1], GRADIENT[2], (t - 0.5) / 0.5
        colour = tuple(round(a[c] + (b[c] - a[c]) * local) for c in range(3))
        draw.line([(i, 0), (i - h, h)], fill=colour)

    # Splash ekranındaki 16px nokta ızgarası.
    dots = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    dd = ImageDraw.Draw(dots)
    for y in range(0, h, 16):
        for x in range(0, w, 16):
            dd.ellipse([x, y, x + 3, y + 3], fill=(*DOT_RGB, DOT_ALPHA))
    base = Image.alpha_composite(base.convert("RGBA"), dots)

    badge = Image.open(BRAND).convert("RGBA")
    size = 360
    badge = badge.resize((size, size), Image.LANCZOS)
    base.alpha_composite(badge, ((w - size) // 2, (h - size) // 2))

    return base.convert("RGB")


def main() -> None:
    STORE.mkdir(parents=True, exist_ok=True)

    mask = white_mask(Image.open(BRAND))
    box = first_line_box(mask)
    print(f'kelime işareti ilk satırı ("KOÜ"): {box}')

    notification_icon(mask, box).save(ROOT / "assets" / "notification-icon.png")
    play_icon().save(STORE / "play-icon-512.png")
    feature_graphic().save(STORE / "play-feature-graphic.png")

    for path in [
        ROOT / "assets" / "notification-icon.png",
        STORE / "play-icon-512.png",
        STORE / "play-feature-graphic.png",
    ]:
        with Image.open(path) as out:
            print(f"  {path.relative_to(ROOT)}  {out.size}  {out.mode}")


if __name__ == "__main__":
    main()
