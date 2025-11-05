import { Tabs } from "expo-router";
import { Text } from "react-native";
import React, { useMemo } from "react";

function TabBarIcon({ label }: { label: string }) {
  return <Text className="text-xs">{label}</Text>;
}

const HomeIcon = () => <TabBarIcon label="🏠" />;
const CheckInIcon = () => <TabBarIcon label="📝" />;
const PlanIcon = () => <TabBarIcon label="✓" />;
const QuestionnaireIcon = () => <TabBarIcon label="📋" />;
const HistoryIcon = () => <TabBarIcon label="📊" />;

const tabScreenOptions = {
  headerShown: true,
  headerStyle: {
    backgroundColor: "#2563EB",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "600",
  },
  tabBarActiveTintColor: "#2563EB",
  tabBarInactiveTintColor: "#6B7280",
} as const;

export default function TabsLayout() {
  const homeOptions = useMemo(() => ({
    title: "Home",
    tabBarIcon: HomeIcon,
  }), []);

  const checkinOptions = useMemo(() => ({
    title: "Check-in",
    tabBarIcon: CheckInIcon,
  }), []);

  const planOptions = useMemo(() => ({
    title: "Plan",
    tabBarIcon: PlanIcon,
  }), []);

  const questionnaireOptions = useMemo(() => ({
    title: "Questionnaire",
    tabBarIcon: QuestionnaireIcon,
  }), []);

  const historyOptions = useMemo(() => ({
    title: "History",
    tabBarIcon: HistoryIcon,
  }), []);

  return (
    <Tabs screenOptions={tabScreenOptions}>
      <Tabs.Screen name="index" options={homeOptions} />
      <Tabs.Screen name="checkin" options={checkinOptions} />
      <Tabs.Screen name="plan" options={planOptions} />
      <Tabs.Screen name="questionnaire" options={questionnaireOptions} />
      <Tabs.Screen name="history" options={historyOptions} />
    </Tabs>
  );
}
