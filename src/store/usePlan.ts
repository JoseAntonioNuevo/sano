import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { storage } from "../lib/storage";
import { getTodayISO, uuid } from "../lib/format";
import type { Task } from "../types";

export type PlanState = {
  tasks: Task[];
  lastResetDate: string;
  toggleTask: (id: string) => void;
  resetDailyPlan: () => void;
  checkAndResetIfNewDay: () => void;
};

const DEFAULT_TASKS: Omit<Task, "id">[] = [
  { title: "Take morning medication", done: false },
  { title: "Log symptoms", done: false },
  { title: "Drink 8 glasses of water", done: false },
  { title: "30 min light exercise", done: false },
  { title: "Evening meditation", done: false },
];

function createDefaultTasks(): Task[] {
  return DEFAULT_TASKS.map((task) => ({
    ...task,
    id: uuid(),
    done: false,
  }));
}

export function calculateProgress(tasks: Task[]): number {
  if (tasks.length === 0) {
    return 0;
  }
  const completed = tasks.filter((task) => task.done).length;
  return Math.round((completed / tasks.length) * 100);
}

export const selectPlanProgress = (state: PlanState): number =>
  calculateProgress(state.tasks);

export const usePlan = create<PlanState>()(
  persist(
    (set, get) => ({
      tasks: createDefaultTasks(),
      lastResetDate: getTodayISO(),
      toggleTask: (id: string) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, done: !task.done } : task
          ),
        }));
      },
      resetDailyPlan: () => {
        set({
          tasks: createDefaultTasks(),
          lastResetDate: getTodayISO(),
        });
      },
      checkAndResetIfNewDay: () => {
        const today = getTodayISO();
        const { lastResetDate } = get();
        if (lastResetDate !== today) {
          set({
            tasks: createDefaultTasks(),
            lastResetDate: today,
          });
        }
      },
    }),
    {
      name: "plan-storage",
      storage: createJSONStorage(() => storage),
    }
  )
);
