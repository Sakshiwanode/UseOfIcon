import React, { useState } from 'react';
import { View, Text, TextInput, Alert, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen = ({ navigation }:any) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password');

  // Handle the login process
  const handleLogin = () => {
    // Simulate login logic
    if (username === 'admin' && password === 'password') {
      Alert.alert('Success', 'Login successful!', [
        { text: 'OK', onPress: () => navigation.replace('Splash') },
      ]);
    } else {
      Alert.alert('Error', 'Invalid username or password');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={require('../assets/account.png')} style={styles.image} />
        <Text style={styles.title}>Login</Text>

        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          value={username}
          onChangeText={setUsername}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20, 
    backgroundColor: '#7b3db6',
  },
  card: {
    backgroundColor: '#ebe3ee', 
    padding: 20,
    borderRadius: 10, 
    shadowColor: '#363434', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 10, 
    elevation: 15, 
    alignItems: 'center', 
  },
  image: {
    width: 100, 
    height: 100, 
    marginBottom: 20, 
    resizeMode: 'contain', 
  },
  title: { 
    fontSize: 28, 
    marginBottom: 20, 
    textAlign: 'center', 
    color: '#000', 
  },
  label: {
    fontSize: 16,
    alignSelf: 'flex-start', 
    marginBottom: 5,
    color: '#000',
  },
  input: { 
    height: 40, 
    width: '100%',
    borderColor: '#bea6cc', 
    borderWidth: 2, 
    marginBottom: 12, 
    padding: 8, 
    borderRadius: 8, 
    color: 'black',
  },
  button: {
    backgroundColor: '#ca82aa', 
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#bea6cc',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20, 
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
