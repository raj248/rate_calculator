import { View} from 'react-native'
import { Text } from '~/components/nativewindui/Text';
import { TouchableOpacity, FlatList, useColorScheme } from "react-native";
import { FC } from "react";

type MonthData = {
  date: string;
  amount: number;
};

const generateMonths = (startYear: number, endYear: number): MonthData[] => {
  const months: MonthData[] = [];
  for (let year = startYear; year <= endYear; year++) {
    for (let month = 1; month <= 12; month++) {
      const formattedMonth = month.toString().padStart(2, "0"); // Ensures MM format
      months.push({ 
        date: `${formattedMonth}-${year}`, 
        amount: Math.floor(Math.random() * 5000) + 5000 
      });
    }
  }
  return months;
};

const months: MonthData[] = generateMonths(2021, 2024);

const monthNames: string[] = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function DataList(){
  const colorScheme = useColorScheme();

  const renderItem = ({ item }: { item: MonthData }) => {
    const [month, year] = item.date.split("-");
    const monthName = monthNames[parseInt(month) - 1];

    return (
      <TouchableOpacity
        className={`rounded-md p-4 mb-2 border ${
          colorScheme === "dark"
            ? "bg-gray-900 border-gray-700 active:bg-gray-800"
            : "bg-white border-gray-400 active:bg-gray-200"
        }`}
        onPress={() => console.log(`Selected: ${monthName} ${year} - $${item.amount}`)}
      >
        <Text className={`text-center font-bold ${colorScheme === "dark" ? "text-white" : "text-black"}`}>
          {monthName} {year} : ${item.amount}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 p-4">
      <FlatList
        data={months}
        keyExtractor={(item) => item.date}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false} // Hides scroll bar for a cleaner UI
      />
    </View>
  );
};
