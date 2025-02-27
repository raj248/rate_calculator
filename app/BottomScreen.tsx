import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Sheet, useSheetRef } from '~/components/nativewindui/Sheet';
import MonthlyDataTable from '~/components/MonthlyDataTable';
import { ScrollView } from 'react-native-gesture-handler';
import { IconButton } from '~/components/IconButton';
import AddEntryPopup from '~/components/UpsertEntryPopup';

interface BottomSheetProps {
  date?: string;
  setOpenSheet?: (fn: () => void) => void;
}

export default function BottomSheet({ date, setOpenSheet }: BottomSheetProps) {
  const bottomSheetModalRef = useSheetRef();
  const [showUpsertPopup, setShowUpsertPopup] = useState(false);


  useEffect(() => {
    if (setOpenSheet) setOpenSheet(() => () => bottomSheetModalRef.current?.present());
  }, [setOpenSheet]);

  return (
    <Sheet ref={bottomSheetModalRef} snapPoints={['90%']} >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        showsVerticalScrollIndicator={true}
      >
        <View className='flex-row'>

          <IconButton name={'close'} color={'white'}
            onPress={() => bottomSheetModalRef.current?.close()}
            className="mt-3 p-2 bg-red-500 rounded-lg mx-auto"
          />

          <IconButton name={'plus'} color={'white'}
            onPress={() => setShowUpsertPopup(true)}
            className="mt-3 p-2 bg-green-500 rounded-lg mx-auto"
          />
        </View>

        <AddEntryPopup
          visible={showUpsertPopup}
          onDismiss={() => setShowUpsertPopup(false)}
        />

        <View className="flex-1 p-4">
          {date ? (
            <MonthlyDataTable date={date} />
          ) : (
            <Text className="text-center">No content provided</Text>
          )}

        </View>
      </ScrollView>
    </Sheet>
  );
}
