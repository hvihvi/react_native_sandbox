import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Box,
  Button,
  Center,
  CheckIcon,
  ColorMode,
  extendTheme,
  HStack,
  NativeBaseProvider,
  Switch,
  Text,
  useColorMode,
  VStack,
} from 'native-base';
import {FC} from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import {CustomIcon} from './CustomIcon';
import DragList from './DragList';
import Player from './Player';

const colorModeManager = {
  get: async () => {
    try {
      let val = await AsyncStorage.getItem('@my-app-color-mode');
      return val === 'dark' ? 'dark' : 'light';
    } catch (e) {
      console.log(e);
      return 'light';
    }
  },
  set: async (value: ColorMode) => {
    try {
      if (!value) return;
      await AsyncStorage.setItem('@my-app-color-mode', value);
    } catch (e) {
      console.log(e);
    }
  },
};

// Define the config
const config = {
  useSystemColorMode: true,
  initialColorMode: 'dark',
};

// extend the theme
const theme = extendTheme({config});

export default function App() {
  return (
    <NativeBaseProvider colorModeManager={colorModeManager} theme={theme}>
      <BgImage>
        <Box safeArea height="100%" width="100%">
          <VStack space={8}>
            <TopBar />
            <List />
            <DragList />
          </VStack>
        </Box>
      </BgImage>
    </NativeBaseProvider>
  );
}

const BgImage: FC = ({children}) => {
  const {colorMode} = useColorMode();
  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3388&q=80',
      }}
      resizeMode="cover"
      blurRadius={3}
      style={StyleSheet.compose(
        styles.image,
        // @ts-ignore
        colorMode === 'dark' ? darkStyles.image : lightStyles.image,
      )}
      imageStyle={{opacity: colorMode === 'dark' ? 0.4 : 0.9}}>
      {children}
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

const darkStyles = StyleSheet.create({
  image: {
    backgroundColor: 'black',
  },
});

const lightStyles = StyleSheet.create({
  image: {
    backgroundColor: 'transparent',
  },
});

const TopBar = () => {
  const {colorMode, toggleColorMode} = useColorMode();

  return (
    <HStack alignItems="baseline" mx="4" my="2">
      <Text alignSelf={'center'}>Some content here</Text>
      <Switch ml="auto" onChange={toggleColorMode} mr="3.5" />
    </HStack>
  );
};

const List = () => (
  <Center>
    <VStack space="43">
      <Button
        _pressed={{backgroundColor: 'red.200'}}
        backgroundColor="transparent"
        color="black"
        m={0}
        p={0}>
        <HStack space="2">
          <CheckIcon size="5" mt="0.5" color="emerald.200" />
          <Text>😀 I'm a button!</Text>
        </HStack>
      </Button>
      <HStack space="2">
        <CustomIcon />
        <Box>I'm a box!!!</Box>
      </HStack>
      <Box>I'm a box!</Box>
    </VStack>
    <Player />
  </Center>
);
