import React from 'react';
import {NativeBaseProvider, Text, Column, Button} from 'native-base';
import {
  NavigationContainer,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export type ParamList = {
  Home: undefined;
  Player: undefined;
};
const Stack = createNativeStackNavigator<ParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Group screenOptions={{presentation: 'modal'}}>
            <Stack.Screen name="Player" component={Player} />
          </Stack.Group>
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

const Player = () => (
  <Column alignItems="center" justifyContent="center" height="100%">
    <Text>Player Screen</Text>
  </Column>
);
const Home = () => {
  const navigation = useNavigation<NavigationProp<ParamList>>();

  return (
    <Column alignItems="center" justifyContent="center" height="100%">
      <Text>Home Screen</Text>
      <Button onPress={() => navigation.navigate('Player')}>
        Player Screen
      </Button>
    </Column>
  );
};

export default App;
