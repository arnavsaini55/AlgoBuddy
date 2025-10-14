import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList, Routes } from '../../navigation/Routes';

type DetailsRouteProp = RouteProp<RootStackParamList, Routes.Details>;

export default function DetailsScreen() {
  const route = useRoute<DetailsRouteProp>();
  const { itemId } = route.params;

  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
      <Text>Item ID: {itemId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});