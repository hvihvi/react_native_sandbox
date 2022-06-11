import {Switch, useColorModeValue} from 'native-base';
import * as React from 'react';

export const DarkModeSwitch = () => {
  const {colorMode} = useColorModeValue() === 'dark';
  return <Switch />;
};
