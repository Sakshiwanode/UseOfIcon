import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';  

const data = [
  {
    id: '1',
    image: require('../assets/b3.jpg'),
    heading: 'Welcome to App',
    paragraph: 'This is the first slide of our onboarding screen.',
  },
  {
    id: '2',
    image: require('../assets/b2.jpg'),
    heading: 'Explore Features',
    paragraph: 'Discover various features we offer in our app.',
  },
  {
    id: '3',
    image: require('../assets/b4.jpg'),
    heading: 'Stay Connected',
    paragraph: 'Stay updated with the latest trends.',
  },
  {
    id: '4',
    image: require('../assets/shopping1.jpg'),
    heading: 'Get Started',
    paragraph: 'Let’s begin the journey!',
  },
];

const OnboardingScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true); // To manage loading state while checking AsyncStorage
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
      if (hasSeenOnboarding) {
        // If onboarding is already completed, navigate to the Main screen
        navigation.replace('Main');
      } else {
        // Show onboarding screen if not completed
        setLoading(false); // Stop loading once check is done
      }
    };
    checkOnboardingStatus();
  }, [navigation]);

  const handleNextSlide = async () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      // Mark onboarding as complete in AsyncStorage and navigate to Home screen
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
      navigation.replace('Main');
    }
  };

  const handlePrevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      flatListRef.current?.scrollToIndex({ index: currentIndex - 1 });
    }
  };

  // Render loading screen until onboarding status is checked
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: typeof data[0] }) => (
    <SafeAreaView style={styles.container}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.heading}>{item.heading}</Text>
      <Text style={styles.paragraph}>{item.paragraph}</Text>

      {/* Double Left Arrow (shown if not on the first slide) */}
      {currentIndex > 0 && (
        <TouchableOpacity style={styles.arrowLeftContainer} onPress={handlePrevSlide}>
          <Icon name="angle-double-left" size={50} color="#dfd9eb" />
        </TouchableOpacity>
      )}

      {/* Double Right Arrow */}
      <TouchableOpacity style={styles.arrowRightContainer} onPress={handleNextSlide}>
        <Icon name="angle-double-right" size={50} color="#e3cae9" />
      </TouchableOpacity>
    </SafeAreaView>
  );

  return (
    <FlatList
      ref={flatListRef}
      data={data}
      horizontal
      // pagingEnabled
      scrollEnabled={false} // Disable scrolling to control it manually with the arrow
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      extraData={currentIndex}
      onScrollToIndexFailed={() => {}}
      initialScrollIndex={currentIndex}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7b3db6',
  },
  loadingText: {
    fontSize: 24,
    color: '#fff',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#7b3db6',
  },
  image: {
    width: 350,
    height: 400,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  paragraph: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
  },
  arrowRightContainer: {
    position: 'absolute',
    bottom: 50,
    right: 30,
  },
  arrowLeftContainer: {
    position: 'absolute',
    bottom: 50,
    left: 30,
  },
});

export default OnboardingScreen;
