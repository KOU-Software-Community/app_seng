import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PixelIcon } from '../../src/components/Pixel';
import { GlassButton, GradientHeader, PrimaryButton, Segmented, Txt } from '../../src/components/ui';
import { useEvent } from '../../src/content';
import { DEPARTMENTS, YEARS } from '../../src/data';
import { useAppStore } from '../../src/store';
import { colors, fonts, gradients, radius } from '../../src/theme';

const STUDENT_NO_LENGTH = 9;

export default function RegistrationRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const event = useEvent(id);
  const { register } = useAppStore();

  const [name, setName] = useState('');
  const [studentNo, setStudentNo] = useState('');
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');
  const [kvkk, setKvkk] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const noValid = new RegExp(`^\\d{${STUDENT_NO_LENGTH}}$`).test(studentNo);
  // Only complain once they have started typing.
  const noError = studentNo.length > 0 && !noValid;
  const valid = name.trim().length > 2 && noValid && !!department && !!year && kvkk;

  const submit = () => {
    if (!valid) return;
    register({ eventId: event.id, name: name.trim(), studentNo, department, year });
    router.replace(`/kayit-basarili?id=${event.id}`);
  };

  const inputStyle = (key: string, error = false) => [
    styles.input,
    focused === key && styles.inputFocused,
    error && { borderColor: colors.dangerBorder },
  ];

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
            Etkinlik Kaydı
          </Txt>
          <Txt size={13} color={colors.blue200} style={{ marginTop: 4 }}>
            {event.title}
          </Txt>
        </GradientHeader>

        <View style={styles.form}>
          <Field label="Ad Soyad">
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Elif Yılmaz"
              placeholderTextColor={colors.faint}
              autoCapitalize="words"
              autoComplete="name"
              onFocus={() => setFocused('name')}
              onBlur={() => setFocused(null)}
              style={inputStyle('name')}
            />
          </Field>

          <Field label="Öğrenci Numarası">
            <TextInput
              value={studentNo}
              // Students paste from all sorts of places — strip anything non-numeric
              // and cap the length rather than rejecting the whole entry.
              onChangeText={(t) => setStudentNo(t.replace(/\D/g, '').slice(0, STUDENT_NO_LENGTH))}
              placeholder="21xxxxxxx"
              placeholderTextColor={colors.faint}
              inputMode="numeric"
              keyboardType="number-pad"
              onFocus={() => setFocused('no')}
              onBlur={() => setFocused(null)}
              style={[inputStyle('no', noError), { letterSpacing: 0.5 }]}
            />
            {noError ? (
              <Txt weight="semibold" size={12} color={colors.danger} style={{ marginTop: 7 }}>
                Öğrenci numarası {STUDENT_NO_LENGTH} haneli olmalı.
              </Txt>
            ) : null}
          </Field>

          <Field label="Bölüm">
            <View style={styles.chips}>
              {DEPARTMENTS.map((d) => {
                const active = d === department;
                return (
                  <Pressable
                    key={d}
                    onPress={() => setDepartment(d)}
                    accessibilityRole="button"
                    accessibilityState={{ selected: active }}
                    style={[
                      styles.deptChip,
                      {
                        borderColor: active ? colors.blue500 : colors.border,
                        backgroundColor: active ? colors.blue100 : colors.surface,
                      },
                    ]}
                  >
                    <Txt weight="semibold" size={13} color={active ? colors.navy700 : colors.muted}>
                      {d}
                    </Txt>
                  </Pressable>
                );
              })}
            </View>
          </Field>

          <Field label="Sınıf">
            <Segmented
              value={year}
              onChange={setYear}
              options={YEARS.map((y) => ({ label: y, value: y }))}
              style={styles.yearSegmented}
            />
          </Field>

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
              Kayıt için verdiğim bilgilerin kulüp tarafından işlenmesini kabul ediyorum.
            </Txt>
          </Pressable>
        </View>
      </ScrollView>

      <View style={[styles.submitBar, { paddingBottom: insets.bottom + 16 }]}>
        <PrimaryButton
          label={valid ? 'Kaydımı Tamamla' : 'Alanları doldur'}
          onPress={submit}
          disabled={!valid}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View>
      <Txt weight="bold" size={12.5} color={colors.textBody} style={{ marginBottom: 8 }}>
        {label}
      </Txt>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  form: { paddingHorizontal: 20, paddingTop: 22, gap: 18 },

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
  inputFocused: { borderColor: colors.blue500 },

  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  deptChip: { borderWidth: 1.5, paddingHorizontal: 14, paddingVertical: 11, borderRadius: 11 },

  yearSegmented: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
  },

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
