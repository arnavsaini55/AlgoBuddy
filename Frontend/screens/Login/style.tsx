import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // Android shadow
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1A1A1A",
    textAlign: "center",
    marginBottom: 20,
    textShadowColor: "rgba(0,0,0,0.1)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 6,
    fontWeight: "500",
  },
  input: {
    fontSize: 16,
    color: "#333",
    backgroundColor: "#F5F6FA",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 15,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#4C68FF",
    paddingVertical: 14,
    borderRadius: 25,
    marginTop: 20,
    alignItems: "center",
    shadowColor: "#4C68FF",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  signupText: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
  animation: {
    width: "100%",
    height: 300,
    alignSelf: "center",
  },
  formContainer: {
    marginTop: 20,
  },
});
