import { View, Text, TouchableOpacity, Modal, ScrollView } from "react-native";
import { useState, useMemo } from "react";
import { Card } from "../../src/components/Card";
import { Button } from "../../src/components/Button";
import { EmptyState } from "../../src/components/EmptyState";
import { useEntries } from "../../src/store/useEntries";
import { formatDate } from "../../src/lib/format";
import type { CheckIn } from "../../src/types";

export default function HistoryScreen() {
  const checkIns = useEntries((state) => state.checkIns);
  const recentCheckIns = useMemo(() => checkIns.slice(0, 7), [checkIns]);
  const [selectedEntry, setSelectedEntry] = useState<CheckIn | null>(null);

  const renderCheckIn = (checkIn: CheckIn) => (
    <TouchableOpacity
      key={checkIn.id}
      onPress={() => setSelectedEntry(checkIn)}
      activeOpacity={0.7}
      className="mb-3"
    >
      <Card>
        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-lg font-semibold text-gray-900">
            {formatDate(checkIn.date)}
          </Text>
          <Text className="text-gray-500 text-sm">Tap to view</Text>
        </View>
        <View className="flex-row justify-between mt-2">
          <View className="flex-1">
            <Text className="text-xs text-gray-500 mb-1">Symptoms</Text>
            <Text className="text-base font-semibold text-blue-600">
              {checkIn.symptoms}/10
            </Text>
          </View>
          <View className="flex-1">
            <Text className="text-xs text-gray-500 mb-1">Stress</Text>
            <Text className="text-base font-semibold text-orange-600">
              {checkIn.stress}/10
            </Text>
          </View>
          <View className="flex-1">
            <Text className="text-xs text-gray-500 mb-1">Sleep</Text>
            <Text className="text-base font-semibold text-purple-600">
              {checkIn.sleepHours}h
            </Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <View className="p-6 pb-4 bg-white border-b border-gray-100">
        <Text className="text-2xl font-bold text-gray-900">Check-in History</Text>
        <Text className="text-gray-600 mt-1">Last 7 entries</Text>
      </View>

      {recentCheckIns.length === 0 ? (
        <EmptyState
          icon="📊"
          message="No check-ins yet. Start by completing your first daily check-in!"
        />
      ) : (
        <ScrollView className="flex-1 p-6">
          {recentCheckIns.map(renderCheckIn)}
        </ScrollView>
      )}

      {/* Detail Modal */}
      <Modal
        visible={selectedEntry !== null}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setSelectedEntry(null)}
      >
        {selectedEntry && (
          <View className="flex-1 bg-gray-50">
            <View className="p-6 pb-4 bg-white border-b border-gray-100">
              <Text className="text-2xl font-bold text-gray-900">
                {formatDate(selectedEntry.date)}
              </Text>
            </View>

            <ScrollView className="flex-1 p-6">
              <Card className="mb-4">
                <Text className="text-lg font-semibold mb-4">Metrics</Text>

                <View className="mb-4">
                  <Text className="text-sm text-gray-600 mb-1">
                    Symptoms Severity
                  </Text>
                  <View className="flex-row items-center">
                    <View className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <View
                        className="h-full bg-blue-600"
                        style={{ width: `${(selectedEntry.symptoms / 10) * 100}%` }}
                      />
                    </View>
                    <Text className="ml-3 font-semibold text-blue-600">
                      {selectedEntry.symptoms}/10
                    </Text>
                  </View>
                </View>

                <View className="mb-4">
                  <Text className="text-sm text-gray-600 mb-1">Stress Level</Text>
                  <View className="flex-row items-center">
                    <View className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <View
                        className="h-full bg-orange-600"
                        style={{ width: `${(selectedEntry.stress / 10) * 100}%` }}
                      />
                    </View>
                    <Text className="ml-3 font-semibold text-orange-600">
                      {selectedEntry.stress}/10
                    </Text>
                  </View>
                </View>

                <View>
                  <Text className="text-sm text-gray-600 mb-1">Sleep Hours</Text>
                  <View className="flex-row items-center">
                    <View className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <View
                        className="h-full bg-purple-600"
                        style={{ width: `${(selectedEntry.sleepHours / 12) * 100}%` }}
                      />
                    </View>
                    <Text className="ml-3 font-semibold text-purple-600">
                      {selectedEntry.sleepHours}h
                    </Text>
                  </View>
                </View>
              </Card>

              {selectedEntry.note && (
                <Card className="mb-4">
                  <Text className="text-lg font-semibold mb-2">Notes</Text>
                  <Text className="text-gray-700">{selectedEntry.note}</Text>
                </Card>
              )}

              {selectedEntry.tasksSnapshot && selectedEntry.tasksSnapshot.length > 0 && (
                <Card className="mb-4">
                  <Text className="text-lg font-semibold mb-3">Daily Plan Snapshot</Text>
                  {selectedEntry.tasksSnapshot.map((task) => (
                    <View key={task.id} className="flex-row items-center mb-2">
                      <Text className="mr-2">{task.done ? "✓" : "○"}</Text>
                      <Text
                        className={task.done ? "text-gray-500 line-through" : "text-gray-900"}
                      >
                        {task.title}
                      </Text>
                    </View>
                  ))}
                </Card>
              )}
            </ScrollView>

            <View className="p-6 pt-4 bg-white border-t border-gray-100">
              <Button
                title="Close"
                variant="secondary"
                onPress={() => setSelectedEntry(null)}
              />
            </View>
          </View>
        )}
      </Modal>
    </View>
  );
}
