import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }:any) => {
  return (
    <View style={styles.container}>
      
      <Text style={styles.heading}>Welcome to the App!</Text>
      <View style={styles.card}>
        <Text style={styles.paragraph}>
          This is the welcome screen where you can find information about the app. 
          We hope you have a great experience using our app and exploring its features.
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.paragraph}>
          This is the welcome screen where you can find information about the app. 
          We hope you have a great experience using our app and exploring its features.
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.paragraph}>
          This is the welcome screen where you can find information about the app. 
          We hope you have a great experience using our app and exploring its features.
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Product')}
      >
        <Text style={styles.buttonText}>Go to Product</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7b3db6',
  },
 
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "#e5eef1",
  },
  card: {
    backgroundColor: '#ebe3ee',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
    color: "#b589c2",
  },
  button: {
    backgroundColor: '#d79ddf',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#bea6cc',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.8, // Touch opacity
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
