import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './src/navigation/Navigator';
import { Alert, AppRegistry, LogBox } from 'react-native';
import { AuthProvider } from './src/context/AuthContext';
import messaging from '@react-native-firebase/messaging';

// Register background handler
const backgroudSubscriber = messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent('app', () => App);

export default function App() {
  LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
    "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
  ]);
  

  useEffect(() => {
    
    const token = messaging().getToken().then((token) => {
      console.log('Token: ' + token);
    });

    const foregroundSubscriber = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    const topicSubscriber = messaging().subscribeToTopic("Pagos").then( ()=> {
      console.log("Suscrito al Tópico");    
    });


    return () => {
      topicSubscriber;
      foregroundSubscriber();
      backgroudSubscriber;
    };

  }, []);


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