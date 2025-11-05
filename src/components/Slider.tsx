import React from "react";
import { View, Text } from "react-native";
import RNSlider from "@react-native-community/slider";

interface SliderProps {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  minimumValue: number;
  maximumValue: number;
  step?: number;
  unit?: string;
  disabled?: boolean;
}

export function Slider({
  label,
  value,
  onValueChange,
  minimumValue,
  maximumValue,
  step = 1,
  unit = "",
  disabled = false,
}: SliderProps) {
  return (
    <View className={`mb-6 ${disabled ? "opacity-60" : ""}`}>
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-sm font-medium text-gray-700">{label}</Text>
        <Text className="text-lg font-semibold text-blue-600">
          {value}
          {unit}
        </Text>
      </View>
      <RNSlider
        value={value}
        onValueChange={onValueChange}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        step={step}
        minimumTrackTintColor="#2563EB"
        maximumTrackTintColor="#E5E7EB"
        thumbTintColor="#2563EB"
        disabled={disabled}
      />
      <View className="flex-row justify-between mt-1">
        <Text className="text-xs text-gray-500">
          {minimumValue}
          {unit}
        </Text>
        <Text className="text-xs text-gray-500">
          {maximumValue}
          {unit}
        </Text>
      </View>
    </View>
  );
}
