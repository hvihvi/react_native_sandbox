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
import {Text, View, Button, Linking} from 'react-native';
import {useEffect, useState} from 'react';

Linking.addEventListener('url', ({url}) => {
  console.log(url);
});

const InitialScreen = () => {
  const [initialUrl, setInitialUrl] = useState();
  useEffect(() => {
    Linking.getInitialURL().then(it => setInitialUrl(it));
  }, []);
  return <Text>initial url was {initialUrl}</Text>;
};

const Home = ({navigation}) => {
  return (
    <View>
      <Text>Home</Text>
      <InitialScreen />
      <Button
        title="Go to Another Screen"
        onPress={() => navigation.navigate('AnotherPage')}
      />
    </View>
  );
};

const AnotherPage = () => (
  <View>
    <Text>Another Page...</Text>
    <InitialScreen />
  </View>
);

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: ['rnsandbox://'],
  config: {
    screens: {
      AnotherPage: 'anotherscreen',
    },
  },
};

const App = () => {
  return (
    <NavigationContainer linking={linking} fallback={<Text>Fallback...</Text>}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AnotherPage" component={AnotherPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
