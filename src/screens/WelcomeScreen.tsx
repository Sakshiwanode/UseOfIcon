import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FAB } from 'react-native-paper';

const WelcomeScreen = ({ navigation }: any) => {
  const [open, setOpen] = useState(false);

  const onStateChange = ({ open }: any) => setOpen(open);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to the App!</Text>
      <Text style={styles.paragraph}>
        This is the welcome screen where you can find information about the app. 
        We hope you have a great experience using our app and exploring its features.
      </Text>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>See Features</Text>
      </TouchableOpacity>

      <FAB.Group
        open={open}
        visible
        icon={open ? 'calendar-today' : 'plus'}
        actions={[
          { icon: 'plus', onPress: () => console.log('Pressed add') },
          { icon: 'star', label: 'Star', onPress: () => console.log('Pressed star') },
          { icon: 'email', label: 'Email', onPress: () => console.log('Pressed email') },
          { icon: 'bell', label: 'Remind', onPress: () => console.log('Pressed notifications') },
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // Do something if the speed dial is open
            console.log('FAB is open');
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7b3db6',
    padding: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "#144052",
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 20,
    color: "#171e20",
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default WelcomeScreen;
