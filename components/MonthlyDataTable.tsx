import { View } from 'react-native';
import { Text } from './nativewindui/Text';
import React from 'react';
import { format, parse } from 'date-fns';
import { useRateStore } from '~/store/rateStore';

interface MonthlyDataTableProps {
  date: string; // Format: MM-YYYY
}

export default function MonthlyDataTable({ date }: MonthlyDataTableProps) {
  const parsedDate = parse(date, 'MM-yyyy', new Date());
  const monthKey = format(parsedDate, 'MM-yyyy');
  const monthData = useRateStore((state) => state.getMonthData(monthKey)) || {};

  // Extract only the days present in the data
  const recordedDays = Object.keys(monthData).sort((a, b) => parseInt(a) - parseInt(b));

  return (
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
      {recordedDays.map((day, index) => {
        const [amt1, amt2] = monthData[day] || [0, 0];
        const formattedDate = day.padStart(2, '0'); // Ensure two-digit format ('01', '02', etc.)
        const dayName = format(new Date(parsedDate.getFullYear(), parsedDate.getMonth(), parseInt(day)), 'EEEE');

        if (amt1 === 0 && amt2 === 0) {
          // Render "Holiday" row
          return (
            <View key={index} className="flex-row border-b border-gray-200 py-1">
              <Text className="w-16 text-center">{formattedDate}</Text>
              <Text className="w-20 text-center">{dayName}</Text>
              <Text className="flex-1 text-center text-red-500 font-bold">Holiday</Text>
            </View>
          );
        }

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
  );
}
