import React from 'react';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';  
import store from './src/redux/store';  
import AppNavigator from './src/navigation/AppNavigator'; 
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';

const App: React.FC = () => {
 
  
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>  
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>

  );
};

export default App;
