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
  const total = useRateStore((state) => state.totals[monthKey]) || 0;

  // Extract only the days present in the data
  const recordedDays = Object.keys(monthData).sort((a, b) => parseInt(a) - parseInt(b));

  return (
    <View className="p-2">
      {/* Table Header */}
      <View className="flex-row border-b border-gray-400 pb-1 mb-1">
        <Text className="w-14 text-xs font-bold text-center">Date</Text>
        <Text className="w-18 text-xs font-bold text-center">Day</Text>
        <Text className="w-14 text-xs font-bold text-center">A1</Text>
        <Text className="w-14 text-xs font-bold text-center">A2</Text>
        <Text className="flex-1 text-xs font-bold text-center">Total</Text>
      </View>

      {/* Table Rows */}
      {recordedDays.map((day, index) => {
        const [amt1, amt2] = monthData[day] || [0, 0];
        const formattedDate = day.padStart(2, '0'); // Ensure two-digit format ('01', '02', etc.)
        const dayName = format(new Date(parsedDate.getFullYear(), parsedDate.getMonth(), parseInt(day)), 'EEE'); // Short day name

        if (amt1 === 0 && amt2 === 0) {
          // Render "Holiday" row
          return (
            <View key={index} className="flex-row border-b border-gray-200 py-1">
              <Text className="w-14 text-xs text-center">{formattedDate}</Text>
              <Text className="w-18 text-xs text-center">{dayName}</Text>
              <Text className="flex-1 text-xs text-center text-red-500 font-bold">Holiday</Text>
            </View>
          );
        }

        const dayTotal = amt1 * 2.5 + amt2 * 2;

        return (
          <View key={index} className="flex-row border-b border-gray-200 py-1">
            <Text className="w-14 text-xs text-center">{formattedDate}</Text>
            <Text className="w-18 text-xs text-center">{dayName}</Text>
            <Text className="w-14 text-xs text-center">{amt1}</Text>
            <Text className="w-14 text-xs text-center">{amt2}</Text>
            <Text className="flex-1 text-xs text-center">{dayTotal}</Text>
          </View>
        );
      })}

      {/* Summary Row for Total */}
      <View className="flex-row border-t-2 border-gray-500 mt-2 pt-2">
        <Text className="w-14"></Text>
        <Text className="w-18 text-xs font-bold text-center">Total</Text>
        <Text className="w-14"></Text>
        <Text className="w-14"></Text>
        <Text className="flex-1 text-xs font-bold text-green-600 text-center">{total}</Text>
      </View>
    </View>
  );
}
