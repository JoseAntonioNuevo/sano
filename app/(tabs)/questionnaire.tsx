import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
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
import { useEntries } from "../../src/store/useEntries";
import { uuid } from "../../src/lib/format";
import type { QuestionnaireAnswer } from "../../src/types";

const questionnaireSchema = z.object({
  healthGoal: z.string().min(3, "Please enter your primary health goal"),
  activityLevel: z.number().min(1).max(5),
  diet: z.string().min(1, "Please select a diet type"),
  medications: z.string(),
  additionalNotes: z.string(),
});

type QuestionnaireForm = z.infer<typeof questionnaireSchema>;

const DIET_OPTIONS = [
  "Balanced",
  "Vegetarian",
  "Vegan",
  "Low-carb",
  "Mediterranean",
  "Other",
];

export default function QuestionnaireScreen() {
  const setQuestionnaire = useEntries((state) => state.setQuestionnaire);
  const questionnaireData = useEntries((state) => state.questionnaire);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuestionnaireForm>({
    resolver: zodResolver(questionnaireSchema),
    defaultValues: {
      healthGoal: "",
      activityLevel: 3,
      diet: "",
      medications: "",
      additionalNotes: "",
    },
  });

  const onSubmit = async (data: QuestionnaireForm) => {
    const answers: QuestionnaireAnswer[] = [
      {
        id: uuid(),
        question: "What is your primary health goal?",
        answer: data.healthGoal,
      },
      {
        id: uuid(),
        question: "Activity level (1-5)",
        answer: data.activityLevel,
      },
      {
        id: uuid(),
        question: "Diet type",
        answer: data.diet,
      },
      {
        id: uuid(),
        question: "Current medications",
        answer: data.medications || "None",
      },
      {
        id: uuid(),
        question: "Additional notes",
        answer: data.additionalNotes || "None",
      },
    ];

    setQuestionnaire(answers);

    Toast.show({
      type: "success",
      text1: "Questionnaire saved!",
      text2: "Thank you for providing this information.",
    });
  };

  if (questionnaireData.completed) {
    return (
      <ScrollView className="flex-1 bg-gray-50">
        <View className="p-6">
          <Card>
            <Text className="text-2xl font-bold text-gray-900 mb-4">
              Questionnaire Completed
            </Text>
            <View className="bg-green-50 rounded-xl p-6 border border-green-200">
              <Text className="text-6xl text-center mb-4">✓</Text>
              <Text className="text-green-800 font-semibold text-center text-lg">
                Thank you for completing the questionnaire!
              </Text>
              <Text className="text-green-700 text-center mt-2">
                Completed on{" "}
                {questionnaireData.completedDate
                  ? new Date(
                      questionnaireData.completedDate + "T00:00:00"
                    ).toLocaleDateString()
                  : "today"}
              </Text>
            </View>

            <View className="mt-6">
              <Text className="text-lg font-semibold mb-3">Your Answers:</Text>
              {questionnaireData.answers.map((answer, index) => (
                <View key={answer.id} className="mb-3 pb-3 border-b border-gray-200">
                  <Text className="text-sm text-gray-600 mb-1">
                    {answer.question}
                  </Text>
                  <Text className="text-base text-gray-900">
                    {String(answer.answer)}
                  </Text>
                </View>
              ))}
            </View>
          </Card>
        </View>
      </ScrollView>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView className="flex-1 bg-gray-50">
        <View className="p-6">
          <Card>
            <Text className="text-2xl font-bold text-gray-900 mb-2">
              Health Questionnaire
            </Text>
            <Text className="text-gray-600 mb-6">
              Help us understand your health journey
            </Text>

            {/* Question 1 */}
            <Controller
              control={control}
              name="healthGoal"
              render={({ field: { onChange, onBlur, value } }) => (
                <Field
                  label="1. What is your primary health goal?"
                  placeholder="e.g., Reduce stress, improve sleep, manage pain..."
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.healthGoal?.message}
                />
              )}
            />

            {/* Question 2 */}
            <Controller
              control={control}
              name="activityLevel"
              render={({ field: { onChange, value } }) => (
                <View className="mb-4">
                  <Text className="text-sm font-medium text-gray-700 mb-2">
                    2. Activity level (1 = Sedentary, 5 = Very Active)
                  </Text>
                  <View className="flex-row justify-between mb-2">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <TouchableOpacity
                        key={level}
                        onPress={() => onChange(level)}
                        className={`w-12 h-12 rounded-full items-center justify-center border-2 ${
                          value === level
                            ? "bg-blue-600 border-blue-600"
                            : "border-gray-300 bg-white"
                        }`}
                      >
                        <Text
                          className={`font-semibold ${
                            value === level ? "text-white" : "text-gray-700"
                          }`}
                        >
                          {level}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            />

            {/* Question 3 */}
            <Controller
              control={control}
              name="diet"
              render={({ field: { onChange, value } }) => (
                <View className="mb-4">
                  <Text className="text-sm font-medium text-gray-700 mb-2">
                    3. What type of diet do you follow?
                  </Text>
                  <View className="flex-row flex-wrap gap-2">
                    {DIET_OPTIONS.map((dietOption) => (
                      <TouchableOpacity
                        key={dietOption}
                        onPress={() => onChange(dietOption)}
                        className={`px-4 py-2 rounded-full border ${
                          value === dietOption
                            ? "bg-blue-600 border-blue-600"
                            : "border-gray-300 bg-white"
                        }`}
                      >
                        <Text
                          className={
                            value === dietOption ? "text-white" : "text-gray-700"
                          }
                        >
                          {dietOption}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  {errors.diet && (
                    <Text className="text-red-500 text-sm mt-1">
                      {errors.diet.message}
                    </Text>
                  )}
                </View>
              )}
            />

            {/* Question 4 */}
            <Controller
              control={control}
              name="medications"
              render={({ field: { onChange, onBlur, value } }) => (
                <Field
                  label="4. Current medications (optional)"
                  placeholder="List any medications you're taking..."
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  multiline
                  numberOfLines={3}
                  className="h-20"
                />
              )}
            />

            {/* Question 5 */}
            <Controller
              control={control}
              name="additionalNotes"
              render={({ field: { onChange, onBlur, value } }) => (
                <Field
                  label="5. Additional notes (optional)"
                  placeholder="Anything else you'd like to share..."
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  multiline
                  numberOfLines={4}
                  className="h-24"
                />
              )}
            />

            <Button
              title="Submit Questionnaire"
              onPress={handleSubmit(onSubmit)}
              loading={isSubmitting}
            />
          </Card>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
