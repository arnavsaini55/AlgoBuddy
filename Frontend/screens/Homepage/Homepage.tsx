import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList, Routes } from '../../navigation/Routes';

type HomeNavProp = StackNavigationProp<RootStackParamList, Routes.Home>;

export default function Homepage() {
  const navigation = useNavigation<HomeNavProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Homepage</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate(Routes.Details, { itemId: 42 })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 18, marginBottom: 12 }
});