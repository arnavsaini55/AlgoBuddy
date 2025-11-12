/**
 *  -----------------------------------------------------------
 *  🧑‍💻  AlgoBuddy | Profile Screen
 *  -----------------------------------------------------------
 *  Author: Arnav Saini
 *  Copyright © 2025 Arnav Saini. All rights reserved.
 *  Description: User profile interface with maintenance placeholder.
 *  -----------------------------------------------------------
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';

export default function ProfileScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}> 
      {/* ---------- Header ---------- */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          {/* Avatar Placeholder */}
        </View>
        <View style={styles.userInfo}>
          <Text style={[styles.name, { color: colors.text }]}>Arnav Saini</Text>
          <Text style={[styles.email, { color: colors.border }]}>arnav@example.com</Text>
        </View>
      </View>

      {/* ---------- Stats Section ---------- */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: colors.text }]}>128</Text>
          <Text style={[styles.statLabel, { color: colors.border }]}>Solved</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: colors.text }]}>14</Text>
          <Text style={[styles.statLabel, { color: colors.border }]}>Streak</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: colors.text }]}>92%</Text>
          <Text style={[styles.statLabel, { color: colors.border }]}>Progress</Text>
        </View>
      </View>

      {/* ---------- Edit Button ---------- */}
      <TouchableOpacity style={[styles.editBtn, { backgroundColor: '#4C68FF' }]}> 
        <Text style={styles.editText}>Edit Profile</Text>
      </TouchableOpacity>

      {/* ---------- Maintenance Animation ---------- */}
      <View style={styles.maintenanceWrapper}>
        <LottieView
          source={require('../../assets/animations/Maintenance web.json')}
          autoPlay
          loop
          style={styles.lottie}
        />
        <Text style={[styles.soonText, { color: colors.text }]}>
          🚧 Hold up, genius at work!  
          This section’s still in heavy dev mode — expect magic soon™ ⚡
        </Text>
      </View>

      {/* ---------- Footer ---------- */}
      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: "#000000" }]}>
          © 2025 Arnav Saini • All Rights Reserved
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  avatarContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    overflow: 'hidden',
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#2c2c2c',
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
  },
  email: {
    marginTop: 6,
    fontSize: 14,
    color: '#9aa0b4',
  },
  statsRow: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#121212',
    marginHorizontal: 6,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '800',
  },
  statLabel: {
    marginTop: 6,
    fontSize: 12,
  },
  editBtn: {
    marginTop: 22,
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 36,
    borderRadius: 10,
    shadowColor: '#4C68FF',
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  editText: {
    color: '#fff',
    fontWeight: '700',
  },
  maintenanceWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  lottie: {
    width: 260,
    height: 260,
  },
  soonText: {
    marginTop: 16,
    fontSize: 15,
    textAlign: 'center',
    opacity: 0.9,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  footerText: {
    fontSize: 12,
    opacity: 0.6,
  },
});
