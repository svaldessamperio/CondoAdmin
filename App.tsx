import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './src/navigation/Navigator';
import { LogBox } from 'react-native';
import { AuthProvider } from './src/context/AuthContext';

export default function App() {
  LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
    "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
  ]);
  
  return (
    <NavigationContainer>{/* Rest of your app code */}
      <AppState>
        <Navigator/>        
      </AppState>
    </NavigationContainer>
  );
}

const AppState = ({children}:{children:any}) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}