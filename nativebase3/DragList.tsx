import {
  Box,
  Card,
  Center,
  CheckIcon,
  HStack,
  useColorMode,
  useColorModeValue,
} from 'native-base';
import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Touchable,
  Pressable,
} from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';

const NUM_ITEMS = 10;
function getColor(i: number) {
  const multiplier = 255 / (NUM_ITEMS - 1);
  const colorVal = i * multiplier;
  return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
}

type Item = {
  key: string;
  label: string;
};

const initialData: Item[] = [...Array(NUM_ITEMS)].map((d, index) => {
  const backgroundColor = getColor(index);
  return {
    key: `item-${index}`,
    label: String(index) + '',
    backgroundColor,
  };
});

export default function DragList() {
  const [data, setData] = useState(initialData);

  return (
    <Box>
      {JSON.stringify(data.map(i => i.label))}
      <DraggableFlatList
        data={data}
        onDragEnd={({data}) => setData(data)}
        keyExtractor={item => item.key}
        renderItem={Item}
      />
    </Box>
  );
}

const Item = ({item, drag, isActive}: RenderItemParams<Item>) => {
  const [pressed, setPressed] = useState(false);
  const isDark = useColorMode().colorMode === 'dark';

  return (
    <ScaleDecorator>
      <Pressable
        onLongPress={drag}
        disabled={isActive}
        delayLongPress={300}
        onPress={() => setPressed(!pressed)}>
        <Card
          //bgColor={'blueGray.900'}
          style={{
            backgroundColor: isDark
              ? `hsla(222, 47%, 11%, 0.9)`
              : 'hsla(222, 47%, 100%, 0.8)',
            borderColor: isDark ? undefined : 'hsla(222, 47%, 47%, 0.9)',
            borderWidth: '1',
            borderBottomWidth: '3',
          }}
          flexGrow="1"
          m="1">
          <HStack alignItems={'center'} space="4">
            <Text style={{color: isDark ? 'white' : 'black', fontSize: 32}}>
              =
            </Text>
            <Card w={'20'} h={'32'} bgColor={isDark ? 'cyan.700' : 'cyan.200'}>
              <Box>koob title</Box>
            </Card>
            <Center flexGrow={1}>
              <HStack space="6">
                <Box flexGrow={1}>{item.label}</Box>
                {pressed && (
                  <CheckIcon
                    size="5"
                    mt="0.5"
                    color={isDark ? 'emerald.600' : 'emerald.400'}
                  />
                )}
              </HStack>
            </Center>
          </HStack>
        </Card>
      </Pressable>
    </ScaleDecorator>
  );
};
