import React, { useRef } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

interface AnimatedButtonProps {
  onPress: () => void;
  animationSource?: any;
  style?: any;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ onPress, animationSource, style }) => {
  const animationRef = useRef<LottieView>(null);

  const handlePress = () => {
    animationRef.current?.play();
    setTimeout(() => {
      onPress();
    }, 1000); // adjust to match animation length
  };


  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8} style={[styles.buttonContainer, style]}>
      <LottieView
        ref={animationRef}
        source={animationSource || require("../../assets/animations/button-animation.json")}
        loop={false}
        autoPlay={false}
        style={styles.animation}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: 180,
    height: 60,
    alignSelf: "center",
  },
  animation: {
    width: "100%",
    height: "100%",
  },
});

export default AnimatedButton;
