export type Task = {
  id: string;
  title: string;
  done: boolean;
};

export type CheckIn = {
  id: string;
  date: string; // YYYY-MM-DD
  symptoms: number; // 0–10
  stress: number; // 0–10
  sleepHours: number; // 0–12
  note?: string;
  tasksSnapshot?: Task[];
};

export type QuestionnaireAnswer = {
  id: string;
  question: string;
  answer: string | number | boolean;
};

export type QuestionnaireData = {
  completed: boolean;
  answers: QuestionnaireAnswer[];
  completedDate?: string;
};
