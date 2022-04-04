import {
  Box,
  Button,
  Center,
  CheckIcon,
  HStack,
  Text,
  VStack,
} from 'native-base';
import {CustomIcon} from './CustomIcon';
import Player from './Player';

export const FirstList = () => (
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
        <Box>I'm a box!</Box>
      </HStack>
      <Box
        bg={{
          linearGradient: {
            colors: ['lightBlue.300', 'violet.800'],
            start: [0, 0],
            end: [1, 0],
          },
        }}
        p="12"
        rounded="xl"
        _text={{
          fontSize: 'md',
          fontWeight: 'medium',
          color: 'warmGray.50',
          textAlign: 'center',
        }}>
        I'm a box with linearGradient!!!
      </Box>
    </VStack>
    <Player />
  </Center>
);
