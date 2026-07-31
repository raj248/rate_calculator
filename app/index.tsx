import { View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import DataList from '~/app/DataList';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from 'react-native-paper';
import AddEntryPopup from '~/components/UpsertEntryPopup';

export default function Screen() {
  const insets = useSafeAreaInsets(); // Get safe area padding
  const [showUpsertPopup, setShowUpsertPopup] = useState(false);

  return (
    <View className="flex-1">
      <DataList />

      <TouchableOpacity
        onPress={() => setShowUpsertPopup(true)}
        className="absolute right-6 h-14 w-14 items-center justify-center rounded-full bg-blue-600 shadow-lg"
        style={{ bottom: insets.bottom + 20 }} // Adjust for navigation bar
      >
        <Icon source={'plus'} color="white" size={28} />
      </TouchableOpacity>

      <AddEntryPopup visible={showUpsertPopup} onDismiss={() => setShowUpsertPopup(false)} />
    </View>
  );
}
