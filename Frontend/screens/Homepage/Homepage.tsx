import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList, Routes } from '../../navigation/Routes';
import LottieView from 'lottie-react-native';
import styles from './style';



type HomeNavProp = StackNavigationProp<RootStackParamList, Routes.Home>;

export default function Homepage() {
  const navigation = useNavigation<HomeNavProp>();

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/animations/login-animation.json')}
        autoPlay
        loop
        style={{ width: 300, height: 300 }}
      />
      <Text style={styles.title}>Welcome to the Homepage!</Text>
      <Button title="LOG OUT" onPress={() => navigation.navigate(Routes.Login)} />
    </View>
  );
}

