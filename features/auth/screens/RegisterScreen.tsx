import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Formik } from 'formik';
import React from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Yup from 'yup';
import { authService } from '../../../api/authService';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { registerFailure, registerStart, registerSuccess } from '../../../store/slices/authSlice';

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
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
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

export default function RegisterScreen() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const theme = useAppSelector((state) => state.theme.mode);

  const handleRegister = async (values: { email: string; password: string; username: string }) => {
    try {
      dispatch(registerStart());
      const user = await authService.register(values.email, values.password, values.username);
      dispatch(registerSuccess(user));
    } catch (err: any) {
      dispatch(registerFailure(err.message || 'Registration failed'));
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white dark:bg-dark-900"
    >
      <ScrollView className="flex-1 px-6">
        <View className="items-center mt-12 mb-8">
          <Image 
            source={require('../../../assets/images/icon.png')}
            className="w-32 h-32 mb-4"
            resizeMode="contain"
          />
          <Text className="text-4xl font-bold text-dark-900 dark:text-white mb-2">
            Create Account
          </Text>
          <Text className="text-dark-600 dark:text-dark-300 text-center">
            Join SkillUp to start learning today
          </Text>
        </View>

        <Formik
          initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
          validationSchema={RegisterSchema}
          onSubmit={handleRegister}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View className="mb-8">
              {/* Username Input */}
              <View className="mb-4">
                <Text className="text-dark-700 dark:text-dark-200 font-semibold mb-2">
                  Username
                </Text>
                <View className="flex-row items-center bg-gray-100 dark:bg-dark-800 rounded-xl px-4 py-3">
                  <Feather
                    name="user"
                    size={20}
                    color={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
                  />
                  <TextInput
                    className="flex-1 ml-3 text-dark-900 dark:text-white"
                    placeholder="Choose a username"
                    placeholderTextColor={theme === 'dark' ? '#9CA3AF' : '#9CA3AF'}
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                    autoCapitalize="none"
                  />
                </View>
                {touched.username && errors.username && (
                  <Text className="text-error text-sm mt-1">{errors.username}</Text>
                )}
              </View>

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
              <View className="mb-4">
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
                    placeholder="Create a password"
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

              {/* Confirm Password Input */}
              <View className="mb-6">
                <Text className="text-dark-700 dark:text-dark-200 font-semibold mb-2">
                  Confirm Password
                </Text>
                <View className="flex-row items-center bg-gray-100 dark:bg-dark-800 rounded-xl px-4 py-3">
                  <Feather
                    name="lock"
                    size={20}
                    color={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
                  />
                  <TextInput
                    className="flex-1 ml-3 text-dark-900 dark:text-white"
                    placeholder="Confirm your password"
                    placeholderTextColor={theme === 'dark' ? '#9CA3AF' : '#9CA3AF'}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                    secureTextEntry
                  />
                </View>
                {touched.confirmPassword && errors.confirmPassword && (
                  <Text className="text-error text-sm mt-1">{errors.confirmPassword}</Text>
                )}
              </View>

              {/* Error Message */}
              {error && (
                <View className="bg-error/10 border border-error rounded-xl px-4 py-3 mb-4">
                  <Text className="text-error text-center">{error}</Text>
                </View>
              )}

              {/* Register Button */}
              <TouchableOpacity
                onPress={() => handleSubmit()}
                disabled={isLoading}
                className={`bg-primary-600 dark:bg-primary-500 rounded-xl py-4 items-center ${
                  isLoading ? 'opacity-50' : ''
                }`}
              >
                <Text className="text-white font-bold text-lg">
                  {isLoading ? 'Creating Account...' : 'Sign Up'}
                </Text>
              </TouchableOpacity>

              {/* Login Link */}
              <View className="flex-row justify-center mt-6">
                <Text className="text-dark-600 dark:text-dark-300">
                  Already have an account?{' '}
                </Text>
                <TouchableOpacity onPress={() => router.back()}>
                  <Text className="text-primary-600 dark:text-primary-400 font-bold">
                    Sign In
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
