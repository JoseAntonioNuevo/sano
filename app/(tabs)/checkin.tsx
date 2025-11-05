import { useEffect, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Toast from "react-native-toast-message";
import { Card } from "../../src/components/Card";
import { Button } from "../../src/components/Button";
import { Field } from "../../src/components/Field";
import { Slider } from "../../src/components/Slider";
import { useEntries } from "../../src/store/useEntries";
import { usePlan } from "../../src/store/usePlan";
import { getTodayISO } from "../../src/lib/format";

const checkInSchema = z.object({
  symptoms: z.number().min(0).max(10),
  stress: z.number().min(0).max(10),
  sleepHours: z.number().min(0).max(12),
  note: z.string().optional(),
});

type CheckInForm = z.infer<typeof checkInSchema>;

export default function CheckInScreen() {
  const createCheckIn = useEntries((state) => state.createCheckIn);
  const tasks = usePlan((state) => state.tasks);

  const checkIns = useEntries((state) => state.checkIns);
  const todayEntry = useMemo(() => {
    const today = getTodayISO();
    return checkIns.find((entry) => entry.date === today);
  }, [checkIns]);
  const isViewing = Boolean(todayEntry);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CheckInForm>({
    resolver: zodResolver(checkInSchema),
    defaultValues: {
      symptoms: todayEntry?.symptoms ?? 0,
      stress: todayEntry?.stress ?? 0,
      sleepHours: todayEntry?.sleepHours ?? 7,
      note: todayEntry?.note ?? "",
    },
  });

  useEffect(() => {
    reset({
      symptoms: todayEntry?.symptoms ?? 0,
      stress: todayEntry?.stress ?? 0,
      sleepHours: todayEntry?.sleepHours ?? 7,
      note: todayEntry?.note ?? "",
    });
  }, [todayEntry, reset]);

  const onSubmit = async (data: CheckInForm) => {
    createCheckIn({
      ...data,
      tasksSnapshot: tasks,
    });

    Toast.show({
      type: "success",
      text1: "Check-in saved!",
      text2: "Your daily check-in has been recorded.",
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView className="flex-1 bg-gray-50">
        <View className="p-6">
          <Card>
            <Text className="text-2xl font-bold text-gray-900 mb-4">
              Daily Check-in
            </Text>
            <Text className="text-gray-600 mb-6">
              {isViewing
                ? "Here's your check-in for today"
                : "How are you feeling today?"}
            </Text>

            <Controller
              control={control}
              name="symptoms"
              render={({ field: { onChange, value } }) => (
                <Slider
                  label="Symptoms Severity"
                  value={value}
                  onValueChange={onChange}
                  minimumValue={0}
                  maximumValue={10}
                  step={1}
                  disabled={isViewing}
                />
              )}
            />

            <Controller
              control={control}
              name="stress"
              render={({ field: { onChange, value } }) => (
                <Slider
                  label="Stress Level"
                  value={value}
                  onValueChange={onChange}
                  minimumValue={0}
                  maximumValue={10}
                  step={1}
                  disabled={isViewing}
                />
              )}
            />

            <Controller
              control={control}
              name="sleepHours"
              render={({ field: { onChange, value } }) => (
                <Slider
                  label="Sleep Hours"
                  value={value}
                  onValueChange={onChange}
                  minimumValue={0}
                  maximumValue={12}
                  step={0.5}
                  unit="h"
                  disabled={isViewing}
                />
              )}
            />

            <Controller
              control={control}
              name="note"
              render={({ field: { onChange, onBlur, value } }) => (
                <Field
                  label="Notes (Optional)"
                  placeholder="Any additional notes..."
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  multiline
                  numberOfLines={4}
                  className="h-24"
                  editable={!isViewing}
                />
              )}
            />

            {!isViewing && (
              <Button
                title="Save Check-in"
                onPress={handleSubmit(onSubmit)}
                loading={isSubmitting}
              />
            )}

            {isViewing && (
              <View className="bg-green-50 rounded-xl p-4 border border-green-200">
                <Text className="text-green-800 font-semibold text-center">
                  ✓ Already completed for today
                </Text>
              </View>
            )}
          </Card>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
