import {Box, Card, Center, HStack} from 'native-base';
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
import {TouchableHighlight} from 'react-native-gesture-handler';

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

  return (
    <ScaleDecorator>
      <Pressable
        onLongPress={drag}
        disabled={isActive}
        delayLongPress={200}
        onPress={() => setPressed(!pressed)}>
        <Card bgColor={'blueGray.900'} flexGrow="1" m="1">
          <HStack alignItems={'center'} space="4">
            <Text style={{color: 'white', fontSize: 32}}>=</Text>
            <Card minW={'1/6'} minH={20} bgColor={'cyan.700'}>
              koob
            </Card>
            <Center>
              <HStack>
                <Box>{item.label}</Box>
                <Box>{pressed && '>'}</Box>
              </HStack>
            </Center>
          </HStack>
        </Card>
      </Pressable>
    </ScaleDecorator>
  );
};
