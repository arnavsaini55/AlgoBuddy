import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 20,
    textAlign: "center",
  },

  container: {
    borderWidth: 1,
    borderColor: "#d0d0d0",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#4C68FF",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#4C68FF",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  signupText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#6b6b6b",
    textAlign: "center",
  },
  messageContainer: {
    marginTop: 12,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 28,
  },
  messageText: {
    color: "#1A1A1A",
    fontSize: 16,
    fontWeight: "600",
  },
  rocketRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 6,
  },
  greetContainer: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 28,
  },
  greetText: {
    color: "#2c3e50",
    fontSize: 15,
    fontWeight: "600",
  },
});
