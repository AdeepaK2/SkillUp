import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Formik } from 'formik';
import React from 'react';
import { Image, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Yup from 'yup';
import { authService } from '../../../api/authService';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { loginFailure, loginStart, loginSuccess } from '../../../store/slices/authSlice';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Please enter a valid email (e.g., user@example.com)'
    )
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export default function LoginScreen() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const theme = useAppSelector((state) => state.theme.mode);

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      dispatch(loginStart());
      const user = await authService.login(values.email, values.password);
      dispatch(loginSuccess(user));
    } catch (err: any) {
      dispatch(loginFailure(err.message || 'Login failed'));
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white dark:bg-dark-900"
    >
      <View className="flex-1 px-6 justify-center">
        <View className="items-center mb-12">
          <Image 
            source={require('../../../assets/images/icon.png')}
            className="w-32 h-32 mb-4"
            resizeMode="contain"
          />
          <Text className="text-4xl font-bold text-dark-900 dark:text-white mb-2">
            Welcome Back
          </Text>
          <Text className="text-dark-600 dark:text-dark-300 text-center">
            Sign in to continue your learning journey
          </Text>
        </View>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View>
              {/* Email Input */}
              <View className="mb-4">
                <Text className="text-dark-700 dark:text-dark-200 font-semibold mb-2">
                  Email
                </Text>
                <View className="flex-row items-center bg-gray-100 dark:bg-dark-800 rounded-xl px-4 py-3">
                  <Feather
                    name="mail"
                    size={20}
                    color={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
                  />
                  <TextInput
                    className="flex-1 ml-3 text-dark-900 dark:text-white"
                    placeholder="Enter your email"
                    placeholderTextColor={theme === 'dark' ? '#9CA3AF' : '#9CA3AF'}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
                {touched.email && errors.email && (
                  <Text className="text-error text-sm mt-1">{errors.email}</Text>
                )}
              </View>

              {/* Password Input */}
              <View className="mb-6">
                <Text className="text-dark-700 dark:text-dark-200 font-semibold mb-2">
                  Password
                </Text>
                <View className="flex-row items-center bg-gray-100 dark:bg-dark-800 rounded-xl px-4 py-3">
                  <Feather
                    name="lock"
                    size={20}
                    color={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
                  />
                  <TextInput
                    className="flex-1 ml-3 text-dark-900 dark:text-white"
                    placeholder="Enter your password"
                    placeholderTextColor={theme === 'dark' ? '#9CA3AF' : '#9CA3AF'}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    secureTextEntry
                  />
                </View>
                {touched.password && errors.password && (
                  <Text className="text-error text-sm mt-1">{errors.password}</Text>
                )}
              </View>

              {/* Error Message */}
              {error && (
                <View className="bg-error/10 border border-error rounded-xl px-4 py-3 mb-4">
                  <Text className="text-error text-center">{error}</Text>
                </View>
              )}

              {/* Login Button */}
              <TouchableOpacity
                onPress={() => handleSubmit()}
                disabled={isLoading}
                className={`bg-primary-600 dark:bg-primary-500 rounded-xl py-4 items-center ${
                  isLoading ? 'opacity-50' : ''
                }`}
              >
                <Text className="text-white font-bold text-lg">
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Text>
              </TouchableOpacity>

              {/* Register Link */}
              <View className="flex-row justify-center mt-6">
                <Text className="text-dark-600 dark:text-dark-300">
                  Don&apos;t have an account?{' '}
                </Text>
                <TouchableOpacity onPress={() => router.push('/register')}>
                  <Text className="text-primary-600 dark:text-primary-400 font-bold">
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </KeyboardAvoidingView>
  );
}
