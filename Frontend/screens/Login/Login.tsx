import React, { useState } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import SearchBar from '../../Components/SearchBar/SearchBar';
import { Routes, RootStackParamList } from '../../navigation/Routes';
import LottieView from 'lottie-react-native';
import { styles } from './style';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, Routes.Login>;

const Login = () => {
  const [searchText, setSearchText] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<LoginScreenNavigationProp>();
  
  const handleLogin = () => {
    navigation.replace(Routes.AppTabs);
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 16, gap: 16 }}>
      <LottieView
        source={require('../../assets/animations/login-animation.json')}
        autoPlay
        loop
        style={{ width: '100%', height: 350 }}
      />
        <Text style={styles.title}>Log in. Crush it.</Text>
      <SearchBar
        style={styles.container}
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Type your username"
      />
       <SearchBar
        style={{marginTop: -20}}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your credentials"
        secureTextEntry={true}
      />
      <Button title="Login" onPress={handleLogin} />
    </SafeAreaView>
  );
};

export default Login;
