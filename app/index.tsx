import { View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import BottomSheet from './BottomScreen';
import DataList from '~/app/DataList';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from 'react-native-paper';
import AddEntryPopup from '~/components/UpsertEntryPopup';


export default function Screen() {
  const [date, setDate] = useState<string>("");
  const [openSheet, setOpenSheet] = useState<(() => void) | null>(null);
  const insets = useSafeAreaInsets(); // Get safe area padding
  const [showUpsertPopup, setShowUpsertPopup] = useState(false);

  return (
    <View className="flex-1">
      <DataList openSheet={openSheet} setDate={setDate} />
      <BottomSheet setOpenSheet={setOpenSheet} date={date} />

      <TouchableOpacity
        onPress={() => setShowUpsertPopup(true)} className="absolute right-6 bg-blue-600 w-14 h-14 rounded-full items-center justify-center shadow-lg"
        style={{ bottom: insets.bottom + 20 }} // Adjust for navigation bar
      >
        <Icon source={'plus'} color="white" size={28} />
      </TouchableOpacity>

      <AddEntryPopup
        visible={showUpsertPopup}
        onDismiss={() => setShowUpsertPopup(false)}
      />
    </View>
  );
}
