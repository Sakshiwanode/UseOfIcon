import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }:any) => {
  
  useEffect(() => {
   
    const timer = setTimeout(() => {
      navigation.replace('Onboard');  
    }, 500);

    return () => clearTimeout(timer); 
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/splash_screen.jpg')}  
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#7b3db6',
  },
  image: {
    width: 400,
    height: 781,
  },
});

export default SplashScreen;
