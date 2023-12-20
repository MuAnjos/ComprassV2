import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MainNavigator } from './src/routes/MainStack';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { StatusBar } from 'react-native';

function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
      <StatusBar
        backgroundColor="black"
        barStyle="light-content"
      />
    </AuthProvider>
  );
}

export default App;
