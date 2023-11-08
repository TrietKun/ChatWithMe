import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Dimensions } from 'react-native';

import ChatBox from './Screens/chatBox'
import Login from './Screens/loginScreen'

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function App() {
  return (
    <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="a" component={Login} options={{headerShown : false}} />
              <Stack.Screen name="b" component={ChatBox} options={{headerTitle : "HI"}} />
          </Stack.Navigator>
    </NavigationContainer>
  );
}
