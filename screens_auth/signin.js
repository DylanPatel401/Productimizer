import { View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../firebase/firebase";

import ThemedTextInput from '../functions/components/ui/ThemedTextInput';
import GradientButton from '../functions/components/ui/GradientButton';
import { colors, spacing, typography } from '../styles/style';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (password.length < 6) return alert("Password must be at least 6 characters");

    setLoading(true);
    try {
      await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
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
          Welcome back
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
          placeholder="Enter your password"
          secureTextEntry
        />

        <GradientButton
          title="Sign In"
          onPress={handleSignIn}
          loading={loading}
          style={{ marginTop: spacing.md }}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
