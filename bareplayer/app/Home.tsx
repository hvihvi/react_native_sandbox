import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Button, Column, Image, Skeleton, Text} from 'native-base';
import * as React from 'react';
import {useState} from 'react';
import {ParamList} from '../App';
import {DarkModeSwitch} from '../design-system/DarkModeSwitch';

export const Home = () => {
  const navigation = useNavigation<NavigationProp<ParamList>>();

  return (
    <Column alignItems="center" justifyContent="center" height="100%">
      <DarkModeSwitch />
      <Text>Home Screen</Text>
      <UsplashImage />
      <Button onPress={() => navigation.navigate('Player')}>
        Player Screen
      </Button>
    </Column>
  );
};

const UsplashImage = () => {
  const [unsplash, setUnsplash] = useState(null);
  React.useEffect(() => {
    fetch(
      'https://api.unsplash.com/photos/random?client_id=fNFz6GGt9GLXFQjKD5XOC1zBvCqEevyM3xTlZjGbyDs',
    )
      .then(res => res.json())
      .then(res => setUnsplash(res));
  }, []);

  // @ts-ignore
  return unsplash?.height && unsplash?.width && unsplash?.urls?.small_s3 ? (
    <>
      <Image
        // @ts-ignore
        width={100}
        // @ts-ignore
        height={100}
        resizeMode="center"
        borderRadius={100}
        source={{
          // @ts-ignore
          uri: unsplash?.urls?.small_s3,
        }}
        alt="unsplash"
      />
    </>
  ) : (
    <Skeleton width={100} height={100} borderRadius={100} />
  );
};
