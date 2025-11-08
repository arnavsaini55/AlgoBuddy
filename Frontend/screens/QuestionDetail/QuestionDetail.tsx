import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  Platform,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList, Routes } from "../../navigation/Routes";
import { getQuestionById } from "../../src/services/question";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Picker } from "@react-native-picker/picker"; // install: npm i @react-native-picker/picker

type QuestionDetailRouteProp = RouteProp<RootStackParamList, typeof Routes.QuestionDetail>;

interface Question {
  id?: string;
  _id?: string;
  title: string;
  difficulty: string;
  description?: string;
}

const QuestionDetail: React.FC<{ route: QuestionDetailRouteProp }> = ({ route }) => {
  const { id } = route.params;

  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // Base URL handling for different environments/devices
  // - Android emulator (default) should use 10.0.2.2 to reach host machine
  // - iOS simulator can use localhost
  // - Physical devices should use your machine IP, e.g. http://192.168.x.y:3000
  // You can override by setting global.API_URL (or add a proper env/config)
  const DEFAULT_BASE = Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://localhost:3000";
  const BASE_URL = (global as any).API_URL || DEFAULT_BASE;

  // Fetch question
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

  // Load saved code
  useEffect(() => {
    const loadCode = async () => {
      const savedCode = await AsyncStorage.getItem(`code_${id}_${language}`);
      if (savedCode) setCode(savedCode);
    };
    loadCode();
  }, [id, language]);

  // Auto save
  useEffect(() => {
    if (code) AsyncStorage.setItem(`code_${id}_${language}`, code);
  }, [code, language, id]);

  // Run Code
  const handleRun = async () => {
    setRunning(true);
    setOutput("");
    try {
      const res = await axios.post(`${BASE_URL}/api/compile`, {
        language,
        code,
        input: "", // optional test input
      }, { timeout: 20000 });
      const data = res.data;
      setOutput(data.stdout || data.stderr || data.compileOutput || "No Output");
    } catch (err: any) {
      // Improve error feedback for network vs server errors
      if (err.message === "Network Error" || err.code === "ECONNABORTED") {
        setOutput(`❌ Network Error: unable to reach ${BASE_URL}.\nCheck that the backend is running and reachable from your device.`);
      } else if (err.response) {
        setOutput(`❌ Server error: ${err.response.status} ${err.response.statusText}\n${JSON.stringify(err.response.data)}`);
      } else {
        setOutput(`❌ Unexpected error: ${err.message || err}`);
      }
      console.error("Run error:", err);
    } finally {
      setRunning(false);
      setModalVisible(true);
    }
  };

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
        {/* Question Info */}
        <Text style={styles.title}>{question.title}</Text>
        <Text style={styles.meta}>{question.difficulty}</Text>

        <View style={styles.card}>
          <Text style={styles.description}>{question.description}</Text>
        </View>

        {/* Language Selector */}
        <Text style={styles.sectionTitle}>Select Language</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={language}
            dropdownIconColor="#fff"
            onValueChange={(value) => setLanguage(value)}
            style={styles.picker}
          >
            <Picker.Item label="JavaScript" value="javascript" />
            <Picker.Item label="Python" value="python" />
            <Picker.Item label="C++" value="cpp" />
            <Picker.Item label="Java" value="java" />
          </Picker>
        </View>

        {/* Code Editor */}
        <Text style={styles.sectionTitle}>Your Code</Text>
        <TextInput
          multiline
          value={code}
          onChangeText={setCode}
          placeholder={`Write your ${language} code here...`}
          placeholderTextColor="#666"
          style={styles.editor}
        />

        {/* Run Button */}
        <TouchableOpacity
          onPress={handleRun}
          disabled={running}
          style={[styles.runButton, running && { opacity: 0.7 }]}
        >
          {running ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.runButtonText}>🚀 Run Code</Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      {/* Output Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Execution Result</Text>
            <ScrollView style={styles.outputBox}>
              <Text style={styles.outputText}>{output}</Text>
            </ScrollView>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0b0b0b" },
  content: { padding: 20, paddingBottom: 50 },
  title: { fontSize: 24, fontWeight: "800", color: "#fff" },
  meta: { color: "#A6A6A6", marginTop: 8, marginBottom: 16, fontWeight: "600" },
  card: {
    backgroundColor: "#141414",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#1f1f1f",
  },
  description: { color: "#EDEDED", lineHeight: 22 },
  sectionTitle: { color: "#fff", fontWeight: "700", marginTop: 20 },
  pickerContainer: {
    backgroundColor: "#141414",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#1f1f1f",
    marginVertical: 10,
  },
  picker: { color: "#fff" },
  editor: {
    backgroundColor: "#141414",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#1f1f1f",
    minHeight: 220,
    color: "#fff",
    fontFamily: "monospace",
    textAlignVertical: "top",
    padding: 10,
  },
  runButton: {
    backgroundColor: "#00b894",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  runButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#1c1c1c",
    width: "85%",
    padding: 20,
    borderRadius: 12,
  },
  modalTitle: { color: "#fff", fontSize: 18, fontWeight: "700", marginBottom: 10 },
  outputBox: {
    maxHeight: 250,
    backgroundColor: "#141414",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  outputText: { color: "#dcdcdc", fontFamily: "monospace" },
  closeButton: {
    backgroundColor: "#00b894",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
  },
  closeText: { color: "#fff", fontWeight: "bold" },
  center: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0b0b0b" },
  loadingText: { color: "#D0D0D0", marginTop: 10 },
  errorText: { color: "#FF6B6B", fontWeight: "600" },
});

export default QuestionDetail;
