import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
  SafeAreaViewComponent,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList, Routes } from "../../navigation/Routes";
import { getQuestionById } from "../../src/services/question";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

type QuestionDetailRouteProp = RouteProp<
  RootStackParamList,
  typeof Routes.QuestionDetail
>;

interface Question {
  id?: string;
  _id?: string;
  title: string;
  difficulty: string;
  description?: string;
  expectedOutput?: string;
  sampleTestcases?: Array<{ input: string; output: string }>;
  sample_testcases?: Array<{ input: string; output: string }>;
  expectedFunctionName?: string;
}

const QuestionDetail: React.FC<{ route: QuestionDetailRouteProp }> = ({
  route,
}) => {
  const { id } = route.params;

  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [running, setRunning] = useState(false);

  // temporary user id — replace with redux later
  const userId = "temp_user_id";


  const LOCAL_IP = "192.168.29.114"; 
  const DEFAULT_BASE =
    Platform.OS === "android" ? `http://${LOCAL_IP}:3000` : `http://${LOCAL_IP}:3000`;
  const BASE_URL = (global as any).API_URL || DEFAULT_BASE;

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

  useEffect(() => {
    const loadCode = async () => {
      const savedCode = await AsyncStorage.getItem(
        `code_${userId}_${id}_${language}`
      );
      if (savedCode) setCode(savedCode);
    };
    loadCode();
  }, [id, language, userId]);

  useEffect(() => {
    const saveCode = async () => {
      if (!code) return;
      await AsyncStorage.setItem(`code_${userId}_${id}_${language}`, code);
    };
    const debounce = setTimeout(saveCode, 800);
    return () => clearTimeout(debounce);
  }, [code, language, id, userId]);

  // Helper function to parse input string like "nums = [2,7,11,15], target = 9"
  const parseInputString = (inputStr: string): any => {
    try {
      const result: any = {};
      
      // Use regex to match "key = value" patterns, handling arrays and objects
      // This regex matches: key = value where value can be arrays, objects, strings, numbers, booleans
      const pattern = /(\w+)\s*=\s*(\[[^\]]*\]|{[^}]*}|[^,]+)/g;
      let match;
      
      while ((match = pattern.exec(inputStr)) !== null) {
        const key = match[1].trim();
        let valueStr = match[2].trim();
        
        try {
          // Try to parse as JSON (for arrays, objects, numbers, booleans)
          result[key] = JSON.parse(valueStr);
        } catch {
          // If not valid JSON, try to clean and parse again
          // Remove surrounding quotes if present
          valueStr = valueStr.replace(/^['"`]|['"`]$/g, '');
          try {
            result[key] = JSON.parse(valueStr);
          } catch {
            // If still not JSON, check if it's a boolean or number
            if (valueStr === 'true') {
              result[key] = true;
            } else if (valueStr === 'false') {
              result[key] = false;
            } else if (!isNaN(Number(valueStr)) && valueStr !== '') {
              result[key] = Number(valueStr);
            } else {
              // Keep as string
              result[key] = valueStr;
            }
          }
        }
      }
      
      return result;
    } catch (error) {
      console.error('Error parsing input string:', error, inputStr);
      return {};
    }
  };

  // Helper function to extract function name from user code
  const extractFunctionName = (code: string, expectedName: string, language: string): string => {
    if (language === 'javascript') {
      // Try to find function declaration: function name(...) or const name = (...) =>
      const functionMatch = code.match(/(?:function\s+(\w+)|const\s+(\w+)\s*=\s*(?:\([^)]*\)\s*=>|function)|let\s+(\w+)\s*=\s*(?:\([^)]*\)\s*=>|function)|var\s+(\w+)\s*=\s*(?:\([^)]*\)\s*=>|function))/);
      if (functionMatch) {
        return functionMatch[1] || functionMatch[2] || functionMatch[3] || functionMatch[4] || expectedName;
      }
    } else if (language === 'python') {
      // Try to find def name(...)
      const defMatch = code.match(/def\s+(\w+)\s*\(/);
      if (defMatch) {
        return defMatch[1];
      }
    }
    return expectedName;
  };

  // Helper function to wrap user code and call the function
  const wrapCodeForExecution = (userCode: string, expectedFunctionName: string, testInput: any, language: string): string => {
    // Try to extract actual function name from user code
    const functionName = extractFunctionName(userCode, expectedFunctionName, language);
    
    if (language === 'javascript') {
      const inputKeys = Object.keys(testInput);
      
      // Build function call arguments in the order they appear in the input
      const args = inputKeys.map(key => {
        const value = testInput[key];
        if (Array.isArray(value)) {
          return JSON.stringify(value);
        } else if (typeof value === 'string') {
          return `"${value.replace(/"/g, '\\"')}"`;
        } else if (typeof value === 'boolean') {
          return String(value);
        } else {
          return String(value);
        }
      }).join(', ');

      // Wrap the code and call the function
      return `${userCode}\n\n// Test execution\nconst result = ${functionName}(${args});\nconsole.log(JSON.stringify(result));`;
    } else if (language === 'python') {
      const inputKeys = Object.keys(testInput);
      const args = inputKeys.map(key => {
        const value = testInput[key];
        if (Array.isArray(value)) {
          return JSON.stringify(value).replace(/"/g, "'");
        } else if (typeof value === 'string') {
          return `"${value.replace(/"/g, '\\"')}"`;
        } else {
          return String(value);
        }
      }).join(', ');
      
      return `${userCode}\n\n# Test execution\nresult = ${functionName}(${args})\nprint(result)`;
    }
    
    return userCode;
  };

  const compareOutputs = (userOutput: string, expectedOutput: string): boolean => {
    if (!userOutput || !expectedOutput) return false;

    // Clean and normalize the strings first
    const cleanString = (s: string) => {
      return s.toString()
        .replace(/^['"`]|['"`]$/g, '')  // Remove quotes
        .trim();
    };

    // Clean both outputs
    let cleanUser = cleanString(userOutput);
    let cleanExpected = cleanString(expectedOutput);

    try {
      // Try parsing both as JSON
      const parsedUser = JSON.parse(cleanUser);
      const parsedExpected = JSON.parse(cleanExpected);

      // Deep comparison for objects and arrays
      return JSON.stringify(parsedUser) === JSON.stringify(parsedExpected);
    } catch {
      // If not valid JSON, compare as normalized strings
      const normalizeString = (s: string) => {
        return s.toLowerCase()
          .replace(/\s+/g, ' ')
          .trim();
      };

      const normUser = normalizeString(cleanUser);
      const normExpected = normalizeString(cleanExpected);

      return normUser === normExpected;
    }
  };

  const handleRun = async () => {
    if (!code.trim()) {
      Alert.alert("Error", "Please write some code first!");
      return;
    }

    if (!question) {
      Alert.alert("Error", "Question not loaded!");
      return;
    }

    // Get test case from sampleTestcases (handle both camelCase and snake_case)
    const testCases = question.sampleTestcases || question.sample_testcases || [];
    if (testCases.length === 0) {
      Alert.alert("Error", "No test cases available for this question!");
      return;
    }

    const firstTestCase = testCases[0];
    const expectedOutput = firstTestCase.output || "";
    const inputString = firstTestCase.input || "";
    
    // Get function name (handle both camelCase and snake_case)
    const functionName = question.expectedFunctionName || (question as any).expected_function_name || "solution";
    
    // Parse input string to extract actual values
    const testInput = parseInputString(inputString);
    
    // Wrap code to call the function with test input
    const wrappedCode = wrapCodeForExecution(code, functionName, testInput, language);

    setRunning(true);

    try {
      const res = await axios.post(
        `${BASE_URL}/api/compile`,
        { 
          language, 
          code: wrappedCode, 
          input: "",
          expectedOutput: expectedOutput
        },
        { timeout: 20000 }
      );

      const data = res.data;
      
      // Check if there's a compilation error
      if (data.compileOutput) {
        Alert.alert("Compilation Error", data.compileOutput);
        setRunning(false);
        return;
      }

      // Check if there's a runtime error
      if (data.stderr) {
        Alert.alert("Runtime Error", data.stderr);
        setRunning(false);
        return;
      }

      const result = data.stdout?.trim() || "No Output";
      
      // Use backend comparison if available, otherwise compare on frontend
      const isMatch = data.isCorrect !== undefined ? data.isCorrect : compareOutputs(result, expectedOutput);

      if (isMatch) {
        Alert.alert("✅ Success", "Your output matches the expected output!");
      } else {
        Alert.alert(
          "❌ Failure",
          `Expected:\n${expectedOutput}\n\nGot:\n${result}`
        );
      }
    } catch (err: any) {
      console.error("Run error:", err);
      const errorMessage = err.response?.data?.error || err.message || "Something went wrong while running the code.";
      Alert.alert("Error", errorMessage);
    } finally {
      setRunning(false);
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
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{question.title}</Text>
        <Text style={styles.meta}>{question.difficulty}</Text>

        <View style={styles.card}>
          <Text style={styles.description}>{question.description}</Text>
        </View>

        <Text style={styles.sectionTitle}>Select Language</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={language}
            dropdownIconColor="#fff"
            onValueChange={(value) => setLanguage(value)}
            style={styles.picker}
            itemStyle={{ color: "#fff" }}
          >
            <Picker.Item label="JavaScript" value="javascript" />
            <Picker.Item label="Python" value="python" />
            <Picker.Item label="C++" value="cpp" />
            <Picker.Item label="Java" value="java" />
          </Picker>
        </View>

        <Text style={styles.sectionTitle}>Your Code</Text>
        <TextInput
          multiline
          value={code}
          onChangeText={setCode}
          placeholder={`Write your ${language} code here...`}
          placeholderTextColor="#666"
          style={styles.editor}
        />

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
    </SafeAreaView>
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
    backgroundColor: "#1e1e1e",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#2c2c2c",
    marginVertical: 10,
  },
  picker: { color: "#fff" },
  editor: {
    backgroundColor: "#1a1a1a",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#333",
    minHeight: 220,
    color: "#fff",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
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
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0b0b0b",
  },
  loadingText: { color: "#D0D0D0", marginTop: 10 },
  errorText: { color: "#FF6B6B", fontWeight: "600" },
});

export default QuestionDetail;