import { View } from 'react-native';
import { Text } from './nativewindui/Text';
import React from 'react';
import { format, parse, isAfter, startOfMonth } from 'date-fns';
import { useRateStore } from '~/store/rateStore';
import { useSettingsStore } from '~/store/settingsStore';

interface MonthlyDataTableProps {
  date: string; // Format: MM-YYYY
}

export default function MonthlyDataTable({ date }: MonthlyDataTableProps) {
  const parsedDate = parse(date, 'MM-yyyy', new Date());
  const monthKey = format(parsedDate, 'MM-yyyy');
  const monthData = useRateStore((state) => state.getMonthData(monthKey)) || {};
  const total = useRateStore((state) => state.totals[monthKey]) || 0;
  const textSize = useSettingsStore((state) => state.textSize);

  // Determine rate: 2.75 from June 2026 onward, 2.5 before
  const june2026 = new Date(2026, 5, 1); // June 1, 2026
  const rate1 = isAfter(startOfMonth(parsedDate), new Date(2026, 4, 31)) ? 2.75 : 2.5;
  const rate1Label = rate1 === 2.75 ? '₹ 2.75' : '₹ 2.5';

  const recordedDays = Object.keys(monthData).sort((a, b) => parseInt(a) - parseInt(b));

  return (
    <View className="p-2">
      {/* Table Header */}
      <View className="mb-1 flex-row justify-between border-b border-gray-400 pb-1">
        <Text style={{ fontSize: textSize, width: 56 }} className="text-center font-bold">
          Date
        </Text>
        <Text style={{ fontSize: textSize, width: 72 }} className="text-center font-bold">
          Day
        </Text>
        <Text style={{ fontSize: textSize, width: 80 }} className="text-center font-bold">
          {rate1Label}
        </Text>
        <Text style={{ fontSize: textSize, width: 56 }} className="text-center font-bold">
          ₹ 2
        </Text>
        <Text style={{ fontSize: textSize }} className="flex-1 text-center font-bold">
          Total
        </Text>
      </View>

      {/* Table Rows */}
      {recordedDays.map((day, index) => {
        const [amt1, amt2] = monthData[day] || [0, 0];
        const formattedDate = day.padStart(2, '0');
        const dayName = format(
          new Date(parsedDate.getFullYear(), parsedDate.getMonth(), parseInt(day)),
          'EEE'
        );

        if (amt1 === 0 && amt2 === 0) {
          return (
            <View key={index} className="flex-row border-b border-gray-200 py-1">
              <Text style={{ fontSize: textSize }} className="w-14 text-center">
                {formattedDate}
              </Text>
              <Text style={{ fontSize: textSize }} className="w-18 text-center">
                {dayName}
              </Text>
              <Text
                style={{ fontSize: textSize }}
                className="flex-1 text-center font-bold text-red-500">
                Holiday
              </Text>
            </View>
          );
        }

        const dayTotal = amt1 * rate1 + amt2 * 2;

        return (
          <View key={index} className="flex-row justify-between border-b border-gray-200 py-1">
            <Text style={{ fontSize: textSize, width: 56 }} className="w-14 text-center">
              {formattedDate}
            </Text>
            <Text style={{ fontSize: textSize, width: 56 }} className="w-18 text-center">
              {dayName}
            </Text>
            <Text style={{ fontSize: textSize, width: 56 }} className="w-14 text-center">
              {amt1}
            </Text>
            <Text style={{ fontSize: textSize, width: 56 }} className="w-14 text-center">
              {amt2}
            </Text>
            <Text style={{ fontSize: textSize, width: 56 }} className="flex-1 text-center">
              {dayTotal}
            </Text>
          </View>
        );
      })}

      {/* Summary Row for Total */}
      <View className="mt-2 flex-row border-b-2 border-gray-500 pt-2">
        <Text className="w-14"></Text>
        <Text style={{ fontSize: textSize }} className="w-18 text-center font-bold">
          Total
        </Text>
        <Text className="w-14"></Text>
        <Text className="w-14"></Text>
        <Text
          style={{ fontSize: textSize }}
          className="flex-1 text-center font-bold text-green-600">
          {total}
        </Text>
      </View>
    </View>
  );
}
