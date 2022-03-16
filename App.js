/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Text, View, Button} from 'react-native';

const Home = ({navigation}) => {
  return (
    <View>
      <Text>Home</Text>
      <Button
        title="Go to Another Screen"
        onPress={() => navigation.navigate('AnotherPage')}
      />
    </View>
  );
};

const AnotherPage = () => <Text>Another Page...</Text>;

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AnotherPage" component={AnotherPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
