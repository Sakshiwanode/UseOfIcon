import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProfileScreen from '../screens/ProfileScreen';
import CartScreen from '../screens/CartScreen'; 
import SettingsScreen from '../screens/SettingsScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import TabNavigator from './TabNavigator'; 
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { TouchableOpacity } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

// Define the DrawerParamList to include all screens
export type DrawerParamList = {
  Home: undefined;
  Product: undefined;
  Cart: undefined;
  Settings: undefined;
  Welcome: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

// Explicitly type the navigation prop
type DrawerNavProp = DrawerNavigationProp<DrawerParamList>;

const DrawerNavigator: React.FC = () => {
  // Correctly type the navigation object
  const navigation = useNavigation<DrawerNavProp>();

  return (
    <Drawer.Navigator
      screenOptions={({ route }) => ({
        // Default drawer icon or back arrow logic based on the screen
        headerLeft: () => {
          if (route.name === 'Home') {
            // Show drawer icon for Home
            return (
              <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                <Icon name="bars" size={24} color="black" style={{ marginLeft: 15 }} />
              </TouchableOpacity>
            );
          } else if (route.name === 'Cart') {
            // Show back arrow for CartScreen, and navigate to ProfileScreen
            return (
              <TouchableOpacity onPress={() => navigation.navigate('Product')}>
                <Icon name="arrow-left" size={24} color="black" style={{ marginLeft: 15 }} />
              </TouchableOpacity>
            );
          } else {
            // Show back arrow for other screens, go back to previous screen in the stack
            return (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-left" size={24} color="black" style={{ marginLeft: 15 }} />
              </TouchableOpacity>
            );
          }
        },
        drawerIcon: ({ color, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'Welcome':
              iconName = 'times';
              break;
            case 'Home':
              iconName = 'home';
              break;
            case 'Product':
              iconName = 'user';
              break;
            case 'Cart':
              iconName = 'shopping-cart';
              break;
            case 'Settings':
              iconName = 'cog';
              break;
            default:
              iconName = 'question';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        drawerActiveTintColor: '#7b3db6', // Customize the color for active tab icon
        drawerInactiveTintColor: 'gray', // Customize the color for inactive tab icon
      })}
    >
      <Drawer.Screen name="Home" component={TabNavigator} />
      <Drawer.Screen name="Product" component={ProfileScreen}  />
      <Drawer.Screen name="Cart" component={CartScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Welcome" component={WelcomeScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
