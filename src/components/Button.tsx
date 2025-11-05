import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  type TouchableOpacityProps,
} from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  variant?: "primary" | "secondary";
}

export function Button({
  title,
  loading = false,
  variant = "primary",
  disabled,
  className,
  ...props
}: ButtonProps) {
  const baseClasses = "px-6 py-4 rounded-xl items-center justify-center";
  const variantClasses =
    variant === "primary"
      ? "bg-blue-600 active:bg-blue-700"
      : "bg-gray-200 active:bg-gray-300";
  const disabledClasses = disabled || loading ? "opacity-50" : "";

  return (
    <TouchableOpacity
      className={`${baseClasses} ${variantClasses} ${disabledClasses} ${className || ""}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === "primary" ? "white" : "black"} />
      ) : (
        <Text
          className={`font-semibold text-base ${variant === "primary" ? "text-white" : "text-gray-800"}`}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
