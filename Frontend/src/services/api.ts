import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Platform, NativeModules } from "react-native";

/**
 * Get the Metro host IP for iOS physical device or simulator
 */
const getIosHost = (): string => {
  try {
    const scriptURL = (NativeModules as any)?.SourceCode?.scriptURL;
    if (!scriptURL) return "localhost";
    const match = scriptURL.match(/^(https?:)\/\/([^/:]+)(?::\d+)?\//);
    return match?.[2] ?? "localhost";
  } catch {
    return "localhost";
  }
};

/**
 * Determine API base URL dynamically based on platform
 */
const API_BASE_URL = (() => {
  if (Platform.OS === "android") {
    // Android emulator loopback
    return "http://10.0.2.2:3000/api";
  }

  if (Platform.OS === "ios") {
    const host = getIosHost();
    return "http://192.168.29.114:3000/api";
  }

  // Fallback for web or other platforms
  return "http://localhost:3000/api";
})();

/**
 * Axios instance with JWT interceptor
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
