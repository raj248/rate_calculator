import { View } from 'react-native';
import { Text } from './nativewindui/Text';
import React from 'react';
import { eachDayOfInterval, format, parse } from 'date-fns';

interface MonthlyDataTableProps {
  date: string; // Format: MM-YYYY
}

export default function MonthlyDataTable({ date }: MonthlyDataTableProps) {
  // Convert MM-YYYY to Date object
  const parsedDate = parse(date, 'MM-yyyy', new Date());

  // Get all days in the month
  const daysInMonth = eachDayOfInterval({
    start: new Date(parsedDate.getFullYear(), parsedDate.getMonth(), 1),
    end: new Date(parsedDate.getFullYear(), parsedDate.getMonth() + 1, 0),
  });

  return (
    // <ScrollView>

    <View className="p-4">
      {/* Table Header */}
      <View className="flex-row border-b border-gray-400 pb-2 mb-2">
        <Text className="w-16 font-bold text-center">Date</Text>
        <Text className="w-20 font-bold text-center">Day</Text>
        <Text className="w-16 font-bold text-center">Amt1</Text>
        <Text className="w-16 font-bold text-center">Amt2</Text>
        <Text className="w-20 font-bold text-center">Total</Text>
      </View>

      {/* Table Rows */}
      {daysInMonth.map((day, index) => {
        const formattedDate = format(day, 'dd'); // Day of month (01, 02, etc.)
        const dayName = format(day, 'EEEE'); // Full day name (Monday, Tuesday, etc.)
        const amt1 = Math.floor(Math.random() * 5); // Replace with actual data logic
        const amt2 = Math.floor(Math.random() * 5);
        const total = amt1 * 2.5 + amt2 * 2;

        return (
          <View key={index} className="flex-row border-b border-gray-200 py-1">
            <Text className="w-16 text-center">{formattedDate}</Text>
            <Text className="w-20 text-center">{dayName}</Text>
            <Text className="w-16 text-center">{amt1}</Text>
            <Text className="w-16 text-center">{amt2}</Text>
            <Text className="w-20 text-center">{total}</Text>
          </View>
        );
      })}
    </View>
    // {/* </ScrollView> */ }
  );
}
