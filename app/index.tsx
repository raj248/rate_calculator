import { View } from 'react-native'
import React, { useState } from 'react'
import BottomSheet from './BottomScreen'
import DataList from '~/components/DataList'
export default function Screen() {
  const [date, setDate] = useState<string>("");
  const [openSheet, setOpenSheet] = useState<(() => void) | null>(null);

  return (
    <View className='flex-1'>
      <DataList openSheet={openSheet} setDate={setDate} />
      <BottomSheet setOpenSheet={setOpenSheet} date={date} />
    </View>
  );
}
