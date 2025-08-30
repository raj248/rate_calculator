import React from "react";
import { View } from "react-native";
import { Text } from "./nativewindui/Text";
import { useSettingsStore } from "~/store/settingsStore"; // adjust import path

type MonthlyStatsProps = {
  workingDays: number;
  holidays: number;
  avgWorkPerDay: number;
  todayWork: number;
  yesterdayWork: number;
};

const MonthlyStatsCard = ({
  workingDays,
  holidays,
  avgWorkPerDay,
  todayWork,
  yesterdayWork,
}: MonthlyStatsProps) => {
  const textSize = useSettingsStore((s) => s.textSize);

  const StatRow = ({ label, value }: { label: string; value: string | number }) => (
    <View className="flex-row justify-between mb-1 p-1 rounded-md">
      <Text style={{ fontSize: textSize }} >
        {label}
      </Text>
      <Text style={{ fontSize: textSize }} className="font-semibold">
        {value}
      </Text>
    </View>
  );

  return (
    <View className="shadow-sm rounded-md border p-4 my-3">
      <Text
        style={{ fontSize: textSize + 2 }}
        className="font-bold mb-3"
      >
        📊 Monthly Stats
      </Text>

      <StatRow label="Working Days" value={workingDays} />
      <StatRow label="Holidays" value={holidays} />
      <StatRow label="Avg Work/Day" value={`₹${avgWorkPerDay}`} />
      <StatRow label="Today's Total" value={`₹${todayWork}`} />
      <StatRow label="Yesterday's Total" value={`₹${yesterdayWork}`} />
    </View>
  );
};

export default MonthlyStatsCard;
