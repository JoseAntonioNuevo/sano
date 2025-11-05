import React from "react";
import { View, Text, TextInput, type TextInputProps } from "react-native";

interface FieldProps extends TextInputProps {
  label: string;
  error?: string;
  helper?: string;
}

export function Field({
  label,
  error,
  helper,
  className,
  ...props
}: FieldProps) {
  return (
    <View className="mb-4">
      <Text className="text-sm font-medium text-gray-700 mb-2">{label}</Text>
      <TextInput
        className={`border rounded-xl px-4 py-3 text-base ${
          error ? "border-red-500" : "border-gray-300"
        } ${className || ""}`}
        placeholderTextColor="#9CA3AF"
        {...props}
      />
      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
      {helper && !error && (
        <Text className="text-gray-500 text-sm mt-1">{helper}</Text>
      )}
    </View>
  );
}
