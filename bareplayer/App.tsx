import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Column, NativeBaseProvider, Text} from 'native-base';
import React, {useEffect, useState} from 'react';
import TrackPlayer from 'react-native-track-player';
import {Home} from './app/Home';

export type ParamList = {
  Home: undefined;
  Player: undefined;
};
const Stack = createNativeStackNavigator<ParamList>();

const track = {
  url: require('./tracks/A-Guide-to-the-Good-Life-The-Ancient-Art-of-Stoic-Joy.mp3'),
  title: 'Coelacanth I',
  artist: 'deadmau5',
  artwork: '',
  duration: 166,
};

const App = () => {
  const [, setRntpReady] = useState(false);
  useEffect(() => {
    TrackPlayer.setupPlayer()
      .then(() => TrackPlayer.add([track]))
      .then(() => setRntpReady(true));
  }, []);

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

const Player = () => {
  useEffect(() => {
    TrackPlayer.play();
  }, []);

  return (
    <Column alignItems="center" justifyContent="center" height="100%">
      <Text>Player Screen</Text>
    </Column>
  );
};

export default App;
