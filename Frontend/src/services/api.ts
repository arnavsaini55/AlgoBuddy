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
    // Check for custom IP first (highest priority)
    const customIp = (global as any).API_IP;
    if (customIp) {
      return `http://${customIp}:3000/api`;
    }
    
    // For Expo Go on iOS physical device, always use your machine's IP
    // This is the IP address shown when you run 'expo start'
    // Replace with your actual IP address
    const expoGoIp = "192.168.29.114";
    return `http://${expoGoIp}:3000/api`;
  }

  // Fallback for web or other platforms
  return "http://localhost:3000/api";
})();

/**
 * Axios instance with JWT interceptor
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // Increased timeout for mobile networks (30 seconds)
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
