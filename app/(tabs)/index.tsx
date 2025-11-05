import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useMemo } from "react";
import { useRouter } from "expo-router";
import { Card } from "../../src/components/Card";
import { Button } from "../../src/components/Button";
import { useSession } from "../../src/store/useSession";
import { selectPlanProgress, usePlan } from "../../src/store/usePlan";
import { useEntries } from "../../src/store/useEntries";
import { getTodayISO } from "../../src/lib/format";

export default function HomeScreen() {
  const router = useRouter();
  const email = useSession((state) => state.email);
  const logout = useSession((state) => state.logout);
  const progress = usePlan(selectPlanProgress);
  const checkIns = useEntries((state) => state.checkIns);
  const todayCheckIn = useMemo(() => {
    const today = getTodayISO();
    return checkIns.find((entry) => entry.date === today);
  }, [checkIns]);
  const questionnaireCompleted = useEntries((state) => state.questionnaire.completed);

  const todaysCheckInLabel = "Today's Check-in";

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        {/* Welcome Section */}
        <View className="mb-6">
          <Text className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back!
          </Text>
          <Text className="text-gray-600">{email}</Text>
        </View>

        {/* Today's Check-in Card */}
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/checkin")}
          activeOpacity={0.7}
        >
          <Card className="mb-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-lg font-semibold text-gray-900 mb-1">
                  {todaysCheckInLabel}
                </Text>
                <Text className="text-gray-600">
                  {todayCheckIn
                    ? "Completed - Tap to view"
                    : "Pending - Tap to complete"}
                </Text>
              </View>
              <View
                className={`w-12 h-12 rounded-full items-center justify-center ${
                  todayCheckIn ? "bg-green-100" : "bg-yellow-100"
                }`}
              >
                <Text className="text-2xl">
                  {todayCheckIn ? "✓" : "📝"}
                </Text>
              </View>
            </View>
          </Card>
        </TouchableOpacity>

        {/* Daily Plan Card */}
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/plan")}
          activeOpacity={0.7}
        >
          <Card className="mb-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-lg font-semibold text-gray-900 mb-1">
                  Daily Plan
                </Text>
                <Text className="text-gray-600">{progress}% complete</Text>
              </View>
              <View className="w-16 h-16 rounded-full items-center justify-center bg-blue-100">
                <Text className="text-xl font-bold text-blue-600">
                  {progress}%
                </Text>
              </View>
            </View>
          </Card>
        </TouchableOpacity>

        {/* Questionnaire Card */}
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/questionnaire")}
          activeOpacity={0.7}
        >
          <Card className="mb-6">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-lg font-semibold text-gray-900 mb-1">
                  Questionnaire
                </Text>
                <Text className="text-gray-600">
                  {questionnaireCompleted
                    ? "Completed"
                    : "Pending - Help us understand you"}
                </Text>
              </View>
              <View
                className={`w-12 h-12 rounded-full items-center justify-center ${
                  questionnaireCompleted ? "bg-green-100" : "bg-purple-100"
                }`}
              >
                <Text className="text-2xl">
                  {questionnaireCompleted ? "✓" : "📋"}
                </Text>
              </View>
            </View>
          </Card>
        </TouchableOpacity>

        {/* Logout Button */}
        <Button
          title="Logout"
          variant="secondary"
          onPress={() => {
            logout();
            router.replace("/(auth)/login");
          }}
        />
      </View>
    </ScrollView>
  );
}
