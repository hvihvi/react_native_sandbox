import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Button, Column, Skeleton, Text, useColorMode} from 'native-base';
import * as React from 'react';
import {ParamList} from '../App';
import {DarkModeSwitch} from '../design-system/DarkModeSwitch';

export const Home = () => {
  const navigation = useNavigation<NavigationProp<ParamList>>();

  const {colorMode} = useColorMode();
  return (
    <Column
      alignItems="center"
      justifyContent="center"
      height="100%"
      bgColor={colorMode === 'dark' ? 'dark.50' : ''}>
      <DarkModeSwitch />
      <Text>Home Screen</Text>
      <Skeleton width={100} height={100} borderRadius={100} />

      <Button onPress={() => navigation.navigate('Player')}>
        Player Screen
      </Button>
    </Column>
  );
};
