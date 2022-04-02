import {Audio} from 'expo-av';
import {useEffect, useState} from 'react';
import {Button, View} from 'react-native';

export default function Player() {
  const [sound, setSound] = useState<Audio.Sound>();

  async function playSound() {
    console.log('Loading Sound');
    const {sound} = await Audio.Sound.createAsync(
      require('./assets/sample_MP3_700KB.mp3'),
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View>
      <Button title="Play Sound" onPress={playSound} />
    </View>
  );
}
