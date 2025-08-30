import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { IconButton } from '~/components/IconButton'
import AddEntryPopup from '~/components/UpsertEntryPopup'
import MonthlyDataTable from '~/components/MonthlyDataTable'
import { Stack, useLocalSearchParams } from 'expo-router'

const formatDateTitle = (dateStr: string) => {
  const [month, year] = dateStr.split("-");
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
};

const Details = () => {
  const { date } = useLocalSearchParams();
  const [showUpsertPopup, setShowUpsertPopup] = useState(false);

  return (
    <SafeAreaView className='flex-1'>
      <Stack.Screen
        options={{
          headerLargeTitle: true,
          title: formatDateTitle(date as string),
          headerRight: () => <IconButton name={'plus'} color={'red'} onPress={() => setShowUpsertPopup(true)} />,
        }}
      />
      <AddEntryPopup
        visible={showUpsertPopup}
        onDismiss={() => setShowUpsertPopup(false)}
      />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        showsVerticalScrollIndicator={true}
      >
        <View className="flex-1 p-1">
          {date ? (
            <MonthlyDataTable date={date as string} />
          ) : (
            <Text className="text-center">No content provided</Text>
          )}

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Details