import React, {useEffect, useState} from 'react';
import {NativeBaseProvider, Text, Column, Button} from 'native-base';
import {
  NavigationContainer,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TrackPlayer from 'react-native-track-player';

export type ParamList = {
  Home: undefined;
  Player: undefined;
};
const Stack = createNativeStackNavigator<ParamList>();

const track = {
  url: require('./tracks/A-Guide-to-the-Good-Life-The-Ancient-Art-of-Stoic-Joy.mp3'),
  title: 'Coelacanth I',
  artist: 'deadmau5',
  artwork:
    'https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/09/attachment_67377515.jpg?auto=format&q=60&fit=max&w=930',
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
