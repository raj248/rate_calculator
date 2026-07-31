import { TouchableOpacity, View } from 'react-native';
import { Text } from './nativewindui/Text';
import React from 'react';
import { useSettingsStore } from '~/store/settingsStore';
import { Slider } from './nativewindui/Slider';
import { useRateStore } from '~/store/rateStore';

export default function SettingsScreen() {
  const textSize = useSettingsStore((state) => state.textSize);
  const setTextSize = useSettingsStore((state) => state.setTextSize);

  return (
    <View className="p-4">
      <Text className="mb-2 text-lg font-bold">Text Size</Text>
      <Slider
        minimumValue={10}
        maximumValue={40}
        step={1}
        value={textSize}
        onValueChange={(value) => setTextSize(value)}
      />
      <Text className="mt-2 text-center">{`Current Text Size: ${textSize}px`}</Text>
      {/* Clear Data Button */}
      <TouchableOpacity
        className="mt-4 rounded-md bg-red-500 p-2"
        onPress={() => {
          useRateStore.setState({ data: {}, totals: {} });
        }}>
        <Text className="text-center text-white">Clear Data</Text>
      </TouchableOpacity>
    </View>
  );
}
