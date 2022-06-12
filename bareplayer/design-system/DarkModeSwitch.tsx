import {Switch, useColorMode} from 'native-base';
import * as React from 'react';

export const DarkModeSwitch = () => {
  const {colorMode, toggleColorMode} = useColorMode();
  console.log(colorMode);
  return <Switch onChange={toggleColorMode} />;
};
