import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Toast from "react-native-toast-message";
import { Card } from "../../src/components/Card";
import { Button } from "../../src/components/Button";
import { selectPlanProgress, usePlan } from "../../src/store/usePlan";
import type { Task } from "../../src/types";

export default function PlanScreen() {
  const tasks = usePlan((state) => state.tasks);
  const toggleTask = usePlan((state) => state.toggleTask);
  const resetDailyPlan = usePlan((state) => state.resetDailyPlan);
  const progress = usePlan(selectPlanProgress);

  const handleToggle = (id: string) => {
    toggleTask(id);
    Toast.show({
      type: "info",
      text1: "Task updated",
      visibilityTime: 1500,
    });
  };

  const handleReset = () => {
    resetDailyPlan();
    Toast.show({
      type: "success",
      text1: "Plan reset!",
      text2: "Your daily plan has been reset.",
    });
  };

  const renderTask = ({ item }: { item: Task }) => (
    <TouchableOpacity
      onPress={() => handleToggle(item.id)}
      activeOpacity={0.7}
      className="mb-3"
    >
      <Card>
        <View className="flex-row items-center">
          <View
            className={`w-6 h-6 rounded border-2 mr-3 items-center justify-center ${
              item.done
                ? "bg-blue-600 border-blue-600"
                : "border-gray-300 bg-white"
            }`}
          >
            {item.done && <Text className="text-white text-sm">✓</Text>}
          </View>
          <Text
            className={`flex-1 text-base ${
              item.done ? "text-gray-500 line-through" : "text-gray-900"
            }`}
          >
            {item.title}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <View className="p-6 pb-4 bg-white border-b border-gray-100">
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text className="text-2xl font-bold text-gray-900">Daily Plan</Text>
            <Text className="text-gray-600 mt-1">
              {tasks.filter((t) => t.done).length} of {tasks.length} completed
            </Text>
          </View>
          <View className="w-20 h-20 rounded-full items-center justify-center bg-blue-100">
            <Text className="text-2xl font-bold text-blue-600">
              {progress}%
            </Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <View
            className="h-full bg-blue-600"
            style={{ width: `${progress}%` }}
          />
        </View>
      </View>

      <ScrollView className="flex-1 p-6">
        {tasks.map((task) => (
          <View key={task.id}>{renderTask({ item: task })}</View>
        ))}
      </ScrollView>

      <View className="p-6 pt-4 bg-white border-t border-gray-100">
        <Button
          title="Reset Daily Plan"
          variant="secondary"
          onPress={handleReset}
        />
      </View>
    </View>
  );
}
