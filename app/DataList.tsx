import { View } from 'react-native';
import { Text } from '~/components/nativewindui/Text';
import { TouchableOpacity, FlatList, useColorScheme } from 'react-native';
import { useRateStore } from '~/store/rateStore';
import { useState } from 'react';
import loadFromGitHub from '~/utils/loadFromGitHub';
import { router } from 'expo-router';

const monthNames: string[] = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

interface DataListProps {
  openSheet?: (() => void) | null;
  setDate: (fn: React.SetStateAction<string>) => void;
}

export default function DataList({ openSheet, setDate }: DataListProps) {
  const colorScheme = useColorScheme();
  const { data, totals } = useRateStore();
  const [refreshing, setRefreshing] = useState(false);

  // Convert store data into a usable array format
  const months = Object.keys(data)
    .map((key) => {
      const [month, year] = key.split("-");
      return {
        date: key,
        monthName: monthNames[parseInt(month) - 1],
        year,
        amount: totals[key] || 0,
      };
    })
    .sort((a, b) => {
      const [monthA, yearA] = a.date.split("-").map(Number);
      const [monthB, yearB] = b.date.split("-").map(Number);
      return yearB - yearA || monthB - monthA;
    });

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadFromGitHub();
    setRefreshing(false);
  };

  const renderItem = ({ item }: { item: { date: string; monthName: string; year: string; amount: number } }) => (
    <TouchableOpacity
      className={`rounded-md p-4 mb-2 border ${colorScheme === "dark"
        ? "bg-gray-900 border-gray-700 active:bg-gray-800"
        : "bg-white border-gray-400 active:bg-gray-200"
        }`}
      onPress={() => {
        setDate(item.date);
        // openSheet?.();
        // router.push(`/details?date=${item.date}`);
        router.push({
          pathname: "/details",
          params: {
            date: item.date
          }
        })
      }}
    >
      <Text className={`text-center font-bold ${colorScheme === "dark" ? "text-white" : "text-black"}`}>
        {item.monthName} {item.year} : ₹{item.amount}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 p-4">
      <FlatList
        data={months}
        keyExtractor={(item) => item.date}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={handleRefresh} // Pull-to-refresh functionality
      />
    </View>
  );
}
