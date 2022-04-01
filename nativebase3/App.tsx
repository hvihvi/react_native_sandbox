import AsyncStorage from '@react-native-async-storage/async-storage';
import {StatusBar} from 'expo-status-bar';
import {
  Box,
  Button,
  Center,
  CheckIcon,
  ColorMode,
  extendTheme,
  HStack,
  NativeBaseProvider,
  useColorMode,
  VStack,
} from 'native-base';
import {CustomIcon} from './CustomIcon';
import {ImageBackground, SafeAreaView, StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

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
  const {colorMode, toggleColorMode} = useColorMode();

  return (
    <NativeBaseProvider colorModeManager={colorModeManager} theme={theme}>
      <ImageBackground
        source={{uri: 'https://wallpaperaccess.com/full/317501.jpg'}}
        resizeMode="cover"
        style={styles.image}
        imageStyle={styles.imageStyle}>
        <SafeAreaView>
          <Box height="100%" width="100%">
            <VStack>
              <HStack justifyContent="flex-end">
                <Button onPress={toggleColorMode}>
                  Toggle color {colorMode}
                </Button>
              </HStack>
              <List />
            </VStack>
          </Box>
          <StatusBar style="auto" />
        </SafeAreaView>
      </ImageBackground>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  imageStyle: {
    opacity: 0.5,
  },
});

const List = () => (
  <Center>
    <VStack space={'43'} pl="8">
      <HStack space="2">
        <CheckIcon size="5" mt="0.5" color="emerald.500" />
        <Button
          _pressed={{backgroundColor: 'red.200'}}
          backgroundColor="transparent"
          color="black"
          m={0}
          p={0}>
          I'm a button!
        </Button>
      </HStack>
      <HStack space="2">
        <CustomIcon />
        <Box>I'm a box!</Box>
      </HStack>
      <Box>I'm a box!</Box>
      <Box>I'm a box!</Box>
    </VStack>
  </Center>
);
