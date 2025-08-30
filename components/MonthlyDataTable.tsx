import { View } from 'react-native';
import { Text } from './nativewindui/Text';
import React from 'react';
import { format, parse } from 'date-fns';
import { useRateStore } from '~/store/rateStore';
import { useSettingsStore } from '~/store/settingsStore'; // Import the store

interface MonthlyDataTableProps {
  date: string; // Format: MM-YYYY
}

export default function MonthlyDataTable({ date }: MonthlyDataTableProps) {
  const parsedDate = parse(date, 'MM-yyyy', new Date());
  const monthKey = format(parsedDate, 'MM-yyyy');
  const monthData = useRateStore((state) => state.getMonthData(monthKey)) || {};
  const total = useRateStore((state) => state.totals[monthKey]) || 0;

  const textSize = useSettingsStore((state) => state.textSize); // Get text size from settings

  const recordedDays = Object.keys(monthData).sort((a, b) => parseInt(a) - parseInt(b));

  return (
    <View className="p-2">
      {/* Table Header */}
      <View className="flex-row border-b border-gray-400 pb-1 mb-1 justify-between">
        <Text style={{ fontSize: textSize, width: 56 }} className="font-bold text-center">Date</Text>
        <Text style={{ fontSize: textSize, width: 72 }} className="font-bold text-center">Day</Text>
        <Text style={{ fontSize: textSize, width: 80 }} className="font-bold text-center">₹ 2.5</Text>
        <Text style={{ fontSize: textSize, width: 56 }} className="font-bold text-center">₹ 2</Text>
        <Text style={{ fontSize: textSize }} className="flex-1 font-bold text-center">Total</Text>
      </View>

      {/* Table Rows */}
      {recordedDays.map((day, index) => {
        // Handle holidays

        const [amt1, amt2] = monthData[day] || [0, 0];
        const formattedDate = day.padStart(2, '0');
        const dayName = format(new Date(parsedDate.getFullYear(), parsedDate.getMonth(), parseInt(day)), 'EEE');

        if (amt1 === 0 && amt2 === 0) {
          return (
            <View key={index} className="flex-row border-b border-gray-200 py-1">
              <Text style={{ fontSize: textSize }} className="w-14 text-center">{formattedDate}</Text>
              <Text style={{ fontSize: textSize }} className="w-18 text-center">{dayName}</Text>
              <Text style={{ fontSize: textSize }} className="flex-1 text-center text-red-500 font-bold">Holiday</Text>
            </View>
          );
        }

        const dayTotal = amt1 * 2.5 + amt2 * 2;

        return (
          <View key={index} className="flex-row border-b border-gray-200 py-1 justify-between">
            <Text style={{ fontSize: textSize, width: 56 }} className="w-14 text-center">{formattedDate}</Text>
            <Text style={{ fontSize: textSize, width: 56 }} className="w-18 text-center">{dayName}</Text>
            <Text style={{ fontSize: textSize, width: 56 }} className="w-14 text-center">{amt1}</Text>
            <Text style={{ fontSize: textSize, width: 56 }} className="w-14 text-center">{amt2}</Text>
            <Text style={{ fontSize: textSize, width: 56 }} className="flex-1 text-center">{dayTotal}</Text>
          </View>
        );
      })}

      {/* Summary Row for Total */}
      <View className="flex-row border-b-2 border-gray-500 mt-2 pt-2">
        <Text className="w-14"></Text>
        <Text style={{ fontSize: textSize }} className="w-18 font-bold text-center">Total</Text>
        <Text className="w-14"></Text>
        <Text className="w-14"></Text>
        <Text style={{ fontSize: textSize }} className="flex-1 font-bold text-green-600 text-center">{total}</Text>
      </View>

    </View>
  );
}
