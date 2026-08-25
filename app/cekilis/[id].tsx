import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PixelIcon } from '../../src/components/Pixel';
import {
  GlassButton,
  GradientHeader,
  MissingEvent,
  PrimaryButton,
  Txt,
} from '../../src/components/ui';
import { useContent, useEvent } from '../../src/content';
import { PRIVACY_POLICY_URL } from '../../src/data';
import { entriesOpen, validateEntry, type RaffleField } from '../../src/raffleSchema';
import { useAppStore } from '../../src/store';
import { colors, fonts, gradients, radius } from '../../src/theme';

export default function RaffleEntryRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const event = useEvent(id);
  const { getRaffle } = useContent();
  const { enterRaffle, raffleEntryFor } = useAppStore();

  const [values, setValues] = useState<Record<string, string>>({});
  const [kvkk, setKvkk] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // After every hook, so the early return cannot change the hook order.
  if (!event) return <MissingEvent onBack={() => router.replace('/(tabs)/takvim')} />;

  const raffle = getRaffle(event.id);
  if (!raffle) return <MissingEvent onBack={() => router.replace('/(tabs)/takvim')} />;

  const already = raffleEntryFor(event.id);
  const open = entriesOpen(raffle);
  const errors = validateEntry(raffle.fields, values);
  // Errors only surface once the field has been touched or a submit was tried;
  // a form that turns red before it has been filled in is just noise.
  const showError = (key: string) => (submitted || values[key] !== undefined) && errors[key];
  const valid = Object.keys(errors).length === 0 && kvkk;

  const submit = () => {
    setSubmitted(true);
    if (!valid) return;
    enterRaffle(event.id, values);
    router.replace(`/etkinlik/${event.id}`);
  };

  const set = (key: string, value: string) => setValues((v) => ({ ...v, [key]: value }));

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 130 + insets.bottom }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <GradientHeader gradient={gradients.form} bottomRadius={20} style={{ paddingBottom: 20 }}>
          <GlassButton label="‹" accessibilityLabel="Geri" onPress={() => router.back()} size={36} />
          <Txt weight="extrabold" size={23} color="#fff" tracking={-0.4} style={{ marginTop: 16 }}>
            Çekilişe Katıl
          </Txt>
          <Txt size={13} color={colors.blue200} style={{ marginTop: 4 }}>
            {event.title}
          </Txt>
        </GradientHeader>

        {already ? (
          <View style={styles.notice}>
            <Txt weight="bold" size={14} color={colors.navy900}>
              Bu çekilişe zaten katıldın
            </Txt>
            <Txt size={13} leading={1.5} color={colors.muted} style={{ marginTop: 4 }}>
              {already.synced
                ? 'Katılımın kulübe ulaştı. Sonuçlar açıklandığında etkinlik sayfasında görünecek.'
                : 'Katılımın telefonunda duruyor, bağlantı gelince gönderilecek.'}
            </Txt>
          </View>
        ) : !open ? (
          <View style={styles.notice}>
            <Txt weight="bold" size={14} color={colors.navy900}>
              Katılım kapandı
            </Txt>
            <Txt size={13} leading={1.5} color={colors.muted} style={{ marginTop: 4 }}>
              Bu çekilişin son katılım tarihi geçti.
            </Txt>
          </View>
        ) : (
          <View style={styles.form}>
            {raffle.fields.map((field) => (
              <Field key={field.key} label={field.label} required={field.required}>
                {field.type === 'select' ? (
                  <View style={styles.chips}>
                    {(field.options ?? []).map((option) => {
                      const active = values[field.key] === option;
                      return (
                        <Pressable
                          key={option}
                          onPress={() => set(field.key, option)}
                          accessibilityRole="button"
                          accessibilityState={{ selected: active }}
                          style={[
                            styles.chip,
                            {
                              borderColor: active ? colors.blue500 : colors.border,
                              backgroundColor: active ? colors.blue100 : colors.surface,
                            },
                          ]}
                        >
                          <Txt
                            weight="semibold"
                            size={13}
                            color={active ? colors.navy700 : colors.muted}
                          >
                            {option}
                          </Txt>
                        </Pressable>
                      );
                    })}
                  </View>
                ) : (
                  <TextInput
                    value={values[field.key] ?? ''}
                    onChangeText={(t) =>
                      // Students paste student numbers from all sorts of places;
                      // strip anything non-numeric rather than rejecting the entry.
                      set(field.key, field.type === 'studentNo' ? t.replace(/\D/g, '').slice(0, 9) : t)
                    }
                    placeholder={placeholderFor(field)}
                    placeholderTextColor={colors.faint}
                    keyboardType={keyboardFor(field)}
                    autoCapitalize={field.type === 'email' ? 'none' : 'sentences'}
                    onFocus={() => setFocused(field.key)}
                    onBlur={() => setFocused(null)}
                    style={[
                      styles.input,
                      focused === field.key && { borderColor: colors.blue500 },
                      showError(field.key) && { borderColor: colors.dangerBorder },
                    ]}
                  />
                )}

                {showError(field.key) ? (
                  <Txt weight="semibold" size={12} color={colors.danger} style={{ marginTop: 7 }}>
                    {errors[field.key]}
                  </Txt>
                ) : null}
              </Field>
            ))}

            <Pressable
              onPress={() => setKvkk(!kvkk)}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: kvkk }}
              style={styles.consent}
            >
              <View
                style={[
                  styles.checkbox,
                  {
                    borderColor: kvkk ? colors.blue500 : colors.switchOff,
                    backgroundColor: kvkk ? colors.blue500 : colors.surface,
                  },
                ]}
              >
                {kvkk ? <PixelIcon name="check" size={11} color="#fff" /> : null}
              </View>
              <Txt size={12.5} leading={1.5} color={colors.muted} style={{ flex: 1 }}>
                Çekiliş için verdiğim bilgilerin kulüp tarafından işlenmesini kabul ediyorum.
              </Txt>
            </Pressable>

            <Pressable
              onPress={() => {
                Linking.openURL(PRIVACY_POLICY_URL).catch(() => {});
              }}
              accessibilityRole="link"
              style={({ pressed }) => [styles.policyLink, pressed && { opacity: 0.6 }]}
            >
              <Txt weight="semibold" size={12.5} color={colors.blue500}>
                Gizlilik politikası ve KVKK aydınlatma metni
              </Txt>
            </Pressable>
          </View>
        )}
      </ScrollView>

      {!already && open ? (
        <View style={[styles.submitBar, { paddingBottom: insets.bottom + 16 }]}>
          <PrimaryButton
            label={valid ? 'Katılımımı Gönder' : 'Alanları doldur'}
            onPress={submit}
            disabled={!valid}
          />
        </View>
      ) : null}
    </KeyboardAvoidingView>
  );
}

function placeholderFor(field: RaffleField): string {
  if (field.type === 'studentNo') return '21xxxxxxx';
  if (field.type === 'email') return 'ornek@ogr.kocaeli.edu.tr';
  if (field.type === 'phone') return '05xxxxxxxxx';
  return field.label;
}

function keyboardFor(field: RaffleField) {
  if (field.type === 'studentNo') return 'number-pad' as const;
  if (field.type === 'email') return 'email-address' as const;
  if (field.type === 'phone') return 'phone-pad' as const;
  return 'default' as const;
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required: boolean;
  children: React.ReactNode;
}) {
  return (
    <View>
      <Txt weight="bold" size={12.5} color={colors.textBody} style={{ marginBottom: 8 }}>
        {label}
        {required ? '' : ' (isteğe bağlı)'}
      </Txt>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  form: { paddingHorizontal: 20, paddingTop: 22, gap: 18 },
  notice: {
    margin: 20,
    padding: 16,
    borderRadius: radius.md,
    backgroundColor: colors.blue100,
    borderWidth: 1,
    borderColor: colors.blue200,
  },

  input: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 14,
    paddingVertical: 15,
    fontFamily: fonts.medium,
    fontSize: 15,
    color: colors.text,
  },

  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { borderWidth: 1.5, paddingHorizontal: 14, paddingVertical: 11, borderRadius: 11 },

  consent: { flexDirection: 'row', gap: 11, alignItems: 'flex-start', paddingVertical: 2 },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 7,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  policyLink: { paddingLeft: 33, paddingTop: 2, paddingBottom: 4 },

  submitBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.bg,
    paddingHorizontal: 20,
    paddingTop: 14,
  },
});
