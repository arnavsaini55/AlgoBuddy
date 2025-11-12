import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList, Routes } from '../../navigation/Routes';
import LottieView from 'lottie-react-native';
import Icon from "react-native-vector-icons/Feather";

type HomeNavProp = StackNavigationProp<RootStackParamList, Routes.Home>;

export default function Homepage() {
  const navigation = useNavigation<HomeNavProp>();

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/animations/Work space.json')}
        autoPlay
        loop
        style={{ width: 300, height: 300 }}
      />

      <Text style={styles.title}>Welcome to the AlgoBuddy!</Text>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Icon name="code" size={26} color="white" />
          <Text style={styles.statNumber}>25</Text>
          <Text style={styles.statLabel}>Solved</Text>
        </View>

        <View style={styles.statBox}>
          <Icon name="zap" size={26} color="white" />
          <Text style={styles.statNumber}>7</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>

        <View style={styles.statBox}>
          <Icon name="cpu" size={26} color="white" />
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Projects</Text>
        </View>

        <View style={styles.statBox}>
          <Icon name="trending-up" size={26} color="white" />
          <Text style={styles.statNumber}>90%</Text>
          <Text style={styles.statLabel}>Progress</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() => navigation.navigate(Routes.Login)}>
        <Text style={styles.logoutText}>LOG OUT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 20,
  },
  statBox: {
    width: 140,
    height: 120,
    backgroundColor: '#1e1e1e',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
    shadowColor: '#fff',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 6,
  },
  statLabel: {
    fontSize: 14,
    color: '#ccc',
  },
  logoutBtn: {
    backgroundColor: '#ff5555',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 20,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
