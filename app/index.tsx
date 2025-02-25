import { View} from 'react-native'
import React, { useState } from 'react'
import BottomSheet from './BottomScreen'
import { Button } from '~/components/Button';
import { Text } from '~/components/nativewindui/Text';
import DataList from '~/components/DataList'
export default function Screen() {
  const [sheetContent, setSheetContent] = useState<React.ReactNode>(null);
  const [openSheet, setOpenSheet] = useState<(() => void) | null>(null);

  return (
    <View className='flex-1'>
      <View className="rounded-md p-4">
        <Text>January</Text>
      </View>


      <View className='rounded-md p-4'>
        <Text variant='title3' className='text-center bold'>
          January : $11011
        </Text>
      </View>
      <DataList/>
      {/* Button 1: Open BottomSheet with Content A */}
      <Button
        title="Open A"
        onPress={() => {
          setSheetContent(<Text className="text-lg">Content for A</Text>);
          openSheet?.();
        }}
      />

      {/* Button 2: Open BottomSheet with Content B */}
      <Button
        title="Open B"
        onPress={() => {
          setSheetContent(<Text className="text-lg">Different content for B</Text>);
          openSheet?.();
        }}
      />

      {/* Reusable BottomSheet Component */}
      <BottomSheet setOpenSheet={setOpenSheet}>{sheetContent}</BottomSheet>
    </View>
  );
}
