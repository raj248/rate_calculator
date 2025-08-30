import { View, Text } from "react-native";
import React from "react";
import { parse, format } from "date-fns";
import { useRateStore } from "~/store/rateStore";
import MonthlyStatsCard from "./MonthlyStatsCard";

type Props = {
  date: string; // format: MM-yyyy
};

const MonthlyStats = ({ date }: Props) => {
  const parsedDate = parse(date, "MM-yyyy", new Date());
  const monthKey = format(parsedDate, "MM-yyyy");
  const monthData = useRateStore((state) => state.getMonthData(monthKey)) || {};

  const recordedDays = Object.keys(monthData).sort(
    (a, b) => parseInt(a) - parseInt(b)
  );

  const totalDays = recordedDays.length;
  let workingDays = 0;
  let holidays = 0;
  let totalWork = 0;

  recordedDays.forEach((day) => {
    const [val25, val20] = monthData[day];
    const sum = val25 * 2.5 + val20 * 2;
    if (sum === 0) {
      holidays++;
    } else {
      workingDays++;
      totalWork += sum;
    }
  });

  const avgWorkPerDay = workingDays > 0 ? (totalWork / workingDays).toFixed(2) : "0";
  const todayKey = format(new Date(), "d");
  const yesterdayKey = (parseInt(todayKey) - 1).toString();

  const todayWork =
    monthData[todayKey]?.[0] * 2.5 + monthData[todayKey]?.[1] * 2 || 0;
  const yesterdayWork =
    monthData[yesterdayKey]?.[0] * 2.5 + monthData[yesterdayKey]?.[1] * 2 || 0;

  return (
    // <View className="bg-white rounded-2xl shadow p-3 my-2">
    //   <Text className="text-lg font-bold mb-2">📊 Monthly Stats</Text>
    //   <Text>Working Days: {workingDays}</Text>
    //   <Text>Holidays: {holidays}</Text>
    //   <Text>Average Work/Day: ₹{avgWorkPerDay}</Text>
    //   <Text>Today's Total: ₹{todayWork}</Text>
    //   <Text>Yesterday's Total: ₹{yesterdayWork}</Text>
    // </View>
    <MonthlyStatsCard
      workingDays={workingDays}
      holidays={holidays}
      avgWorkPerDay={Number(avgWorkPerDay)}
      todayWork={todayWork}
      yesterdayWork={yesterdayWork} />
  );
};

export default MonthlyStats;
