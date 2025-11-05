import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { storage } from "../lib/storage";
import { getTodayISO, uuid } from "../lib/format";
import type { CheckIn, QuestionnaireAnswer, QuestionnaireData } from "../types";

interface EntriesState {
  checkIns: CheckIn[];
  questionnaire: QuestionnaireData;
  createCheckIn: (
    payload: Omit<CheckIn, "id" | "date"> & { date?: string }
  ) => void;
  setQuestionnaire: (answers: QuestionnaireAnswer[]) => void;
}

const MAX_CHECK_INS = 30;

export const useEntries = create<EntriesState>()(
  persist(
    (set, get) => ({
      checkIns: [],
      questionnaire: {
        completed: false,
        answers: [],
      },
      createCheckIn: (payload) => {
        const newCheckIn: CheckIn = {
          id: uuid(),
          date: payload.date || getTodayISO(),
          symptoms: payload.symptoms,
          stress: payload.stress,
          sleepHours: payload.sleepHours,
          note: payload.note,
          tasksSnapshot: payload.tasksSnapshot,
        };

        set((state) => {
          const filtered = state.checkIns.filter(
            (entry) => entry.date !== newCheckIn.date
          );
          const updated = [newCheckIn, ...filtered]
            .sort((a, b) => b.date.localeCompare(a.date))
            .slice(0, MAX_CHECK_INS);

          return { checkIns: updated };
        });
      },
      setQuestionnaire: (answers) => {
        set({
          questionnaire: {
            completed: true,
            answers,
            completedDate: getTodayISO(),
          },
        });
      },
    }),
    {
      name: "entries-storage",
      storage: createJSONStorage(() => storage),
    }
  )
);
