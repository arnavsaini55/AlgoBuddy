import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import { CompositeNavigationProp } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { StackNavigationProp } from "@react-navigation/stack";
import { getAllQuestions } from "../../src/services/question";
import { TabParamList, RootStackParamList, Routes } from "../../navigation/Routes";
import QuestionDetail from "../QuestionDetail/QuestionDetail";

interface Question {
  id: string;
  _id?: string;
  title: string;
  difficulty: string;
  description?: string;
  createdAt?: string;
  answers?: string;
}

type ProblemsScreenProps = {
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<TabParamList, typeof Routes.Problems>,
    StackNavigationProp<RootStackParamList>
  >;
};

export default function ProblemsScreen({ navigation }: ProblemsScreenProps) {
  const { colors } = useTheme();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    const fetchQuestions = async () => {
      try {
        const data = await getAllQuestions(); 
        setQuestions(data);
      } catch (err) {
        console.error("Error fetching questions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions(); 
  }, []); 
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#00ffcc" />
        <Text style={{ color: "white", marginTop: 10 }}>Loading questions...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={styles.heading}>Select a Question</Text>

      <FlatList
  data={questions}
  keyExtractor={(item) => item._id?.toString() || item.id?.toString()} 
  renderItem={({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate(Routes.QuestionDetail, { id: item._id || item.id })}
      style={styles.card}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.diff}>{item.difficulty}</Text>
    </TouchableOpacity>
  )}
/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#1a1a1a",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  title: { color: "white", fontSize: 18, fontWeight: "600" },
  diff: { color: "#bbb", marginTop: 5 },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0d0d0d",
  },
});
