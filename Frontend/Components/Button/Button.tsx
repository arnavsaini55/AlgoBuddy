import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { styles } from "./style";

interface ButtonProps {
  title: string;
  onPress: () => void;
  color?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  color = "#007BFF",
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color, opacity: disabled ? 0.6 : 1 }]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
