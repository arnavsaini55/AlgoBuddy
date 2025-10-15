import React, { useEffect, useRef, useState } from "react";
import {
  Pressable,
  Text,
  View,
  Animated,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import LottieView from "lottie-react-native";
import { Routes, RootStackParamList } from "../../navigation/Routes";
import SearchBar from "../../Components/SearchBar/SearchBar";
import { styles } from "./style";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  Routes.Login
>;

const Login = () => {
  const [searchText, setSearchText] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  const handleLogin = () => {
    navigation.replace(Routes.AppTabs);
  };

  // Fade-in + floating ellipse animation
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -15,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f9ff" }}>
      {/* Floating Ellipse Background */}
      <Animated.View
        style={{
          position: "absolute",
          top: 80,
          left: -100,
          width: 300,
          height: 300,
          backgroundColor: "#4C68FF",
          opacity: 0.15,
          borderRadius: 150,
          transform: [{ translateY: floatAnim }],
        }}
      />
      <Animated.View
        style={{
          position: "absolute",
          bottom: -100,
          right: -80,
          width: 250,
          height: 250,
          backgroundColor: "#AAB6FF",
          opacity: 0.15,
          borderRadius: 125,
          transform: [{ translateY: Animated.multiply(floatAnim, -1) }],
        }}
      />

      <KeyboardAvoidingView
        style={{ flex: 1, padding: 16, justifyContent: "center" }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Lottie Animation */}
        <LottieView
          source={require("../../assets/animations/login-animation.json")}
          autoPlay
          loop
          style={{ width: "100%", height: 300, alignSelf: "center" }}
        />

        {/* Fade-in Form */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [
              {
                translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [30, 0],
                }),
              },
            ],
          }}
        >
          <Text style={styles.title}>Log in. Crush it.</Text>

          <SearchBar
            style={styles.container}
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Type your username"
          />

          <SearchBar
            style={{ marginTop: -20 }}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry={true}
          />

          {/* Forgot Password */}
          <TouchableOpacity
            style={{ alignSelf: "flex-end", marginTop: 8 }}
            onPress={() => console.log("Forgot Password pressed")}
          >
            <Text style={{ color: "#4C68FF", fontSize: 14, fontWeight: "500" }}>
              Forgot password?
            </Text>
          </TouchableOpacity>

          {/* Regular Login Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>LOG IN</Text>
          </TouchableOpacity>

          {/* Sign-up Text */}
          <Pressable
            onPress={() => navigation.replace(Routes.Registration)}
            style={{ marginTop: 15 }}
          >
            <Text style={styles.signupText}>
              Don't have an account?{" "}
              <Text style={{ color: "#4C68FF", fontWeight: "600" }}>Sign up</Text>
            </Text>
          </Pressable>
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
