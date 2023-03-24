import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from 'react-redux';
// auth screens
import { RegistrationScreen } from './src/screens/auth/RegistrationScreen';
import { LoginScreen } from './src/screens/auth/LoginScreen';
// main screens
import { Home } from './src/screens/main/Home';
import { store } from './src/redux/store';

const AuthStack = createStackNavigator();

// import { Text } from 'react-native';

export default function App() {

  return (
    // <Text>ASd</Text>
    <Provider store={store}>
      <NavigationContainer>
        <AuthStack.Navigator>
          <AuthStack.Screen 
            options={{
                headerShown: false,
            }} 
            name='Login' 
            component={LoginScreen}/>
          <AuthStack.Screen 
            options={{
                headerShown: false,
            }} 
            name='Register' 
            component={RegistrationScreen}/>
          <AuthStack.Screen 
            options={{
                headerShown: false,
            }} 
            name='Home' 
            component={Home}/>
          </AuthStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
