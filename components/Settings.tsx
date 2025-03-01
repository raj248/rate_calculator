import { View } from 'react-native';
import { Text } from './nativewindui/Text';
import React from 'react';
import { useSettingsStore } from '~/store/settingsStore';
import { Slider } from './nativewindui/Slider';

export default function SettingsScreen() {
  const textSize = useSettingsStore((state) => state.textSize);
  const setTextSize = useSettingsStore((state) => state.setTextSize);

  return (
    <View className="p-4">
      <Text className="text-lg font-bold mb-2">Text Size</Text>
      <Slider
        minimumValue={10}
        maximumValue={40}
        step={1}
        value={textSize}
        onValueChange={(value) => setTextSize(value)}
      />
      <Text className="mt-2 text-center">{`Current Text Size: ${textSize}px`}</Text>
    </View>
  );
}
