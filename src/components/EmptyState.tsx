import React from "react";
import { View, Text } from "react-native";
import { Button } from "./Button";

interface EmptyStateProps {
  icon: string;
  message: string;
  action?: {
    label: string;
    onPress: () => void;
  };
}

export function EmptyState({ icon, message, action }: EmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center p-8">
      <Text className="text-6xl mb-4">{icon}</Text>
      <Text className="text-gray-600 text-center text-base mb-6">
        {message}
      </Text>
      {action && (
        <Button
          title={action.label}
          onPress={action.onPress}
          variant="secondary"
        />
      )}
    </View>
  );
}
