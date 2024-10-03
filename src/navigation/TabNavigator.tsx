import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons

const Tab = createBottomTabNavigator();

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: string;

          // Determine the icon name based on the route
          if (route.name === 'HomeTab') {
            iconName = 'home'; // FontAwesome icon for home
          } else if (route.name === 'ProfileTab') {
            iconName = 'user'; // FontAwesome icon for profile
          } else {
            iconName = 'question'; // Default icon if route name is not found
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarLabel: () => null, // Hide tab labels
        tabBarActiveTintColor: '#7b3db6', // Customize the color for active tab icon
        tabBarInactiveTintColor: 'gray', // Customize the color for inactive tab icon
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
