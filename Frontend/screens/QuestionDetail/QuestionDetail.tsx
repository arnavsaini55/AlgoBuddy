import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList, Routes } from "../../navigation/Routes";
import { getQuestionById } from "../../src/services/question";

type QuestionDetailRouteProp = RouteProp<RootStackParamList, typeof Routes.QuestionDetail>;

interface Question {
  id?: string;
  _id?: string;
  title: string;
  difficulty: string;
  description?: string;
}

export default function QuestionDetail({ route }: { route: QuestionDetailRouteProp }) {
  const { id } = route.params;
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const data = await getQuestionById(id);
        setQuestion(data);
      } catch (err) {
        console.error("Error fetching question:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [id]);

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#00ffcc" />
        <Text style={styles.loadingText}>Loading question...</Text>
      </View>
    );

  if (!question)
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>No question found.</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{question.title}</Text>
        <Text style={styles.meta}>{question.difficulty}</Text>
        <View style={styles.card}>
          <Text style={styles.description}>{question.description}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0b0b",
  },
  content: {
    padding: 20,
    paddingBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  meta: {
    color: "#A6A6A6",
    marginTop: 8,
    marginBottom: 16,
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#141414",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#1f1f1f",
  },
  description: {
    color: "#EDEDED",
    lineHeight: 22,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0b0b0b",
  },
  loadingText: {
    color: "#D0D0D0",
    marginTop: 10,
  },
  errorText: {
    color: "#FF6B6B",
    fontWeight: "600",
  },
});

