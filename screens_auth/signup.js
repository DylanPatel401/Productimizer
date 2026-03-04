import { View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from 'firebase/database';
import { FIREBASE_AUTH } from "../firebase/firebase";

import ThemedTextInput from '../functions/components/ui/ThemedTextInput';
import GradientButton from '../functions/components/ui/GradientButton';
import { colors, spacing, typography } from '../styles/style';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      return alert('Please fill in all fields');
    }
    if (password !== confirmPassword) {
      return alert('Passwords do not match');
    }
    if (password.length < 6) return alert("Password must be at least 6 characters");

    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      const db = getDatabase();
      set(ref(db, 'users/' + res.user.uid), {
        username: email.split('@')[0],
        email: email,
        color: "DARK",
      });
    } catch (error) {
      alert(error.message || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, paddingHorizontal: spacing.xl }}
    >
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={[typography.h2, { color: colors.dark.text, marginBottom: spacing.lg }]}>
          Create account
        </Text>

        <ThemedTextInput
          label="Email"
          icon="email-outline"
          value={email}
          onChangeText={setEmail}
          placeholder="your@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <ThemedTextInput
          label="Password"
          icon="lock-outline"
          value={password}
          onChangeText={setPassword}
          placeholder="Min 6 characters"
          secureTextEntry
        />

        <ThemedTextInput
          label="Confirm Password"
          icon="lock-check-outline"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Retype your password"
          secureTextEntry
        />

        <GradientButton
          title="Create Account"
          onPress={handleSignUp}
          loading={loading}
          style={{ marginTop: spacing.md }}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
