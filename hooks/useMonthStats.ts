import { format } from "date-fns";
import { useRateStore } from "~/store/rateStore";

function useMonthStats(monthKey: string) {
  const monthData = useRateStore((state) => state.getMonthData(monthKey)) || {};
  const totals = useRateStore((state) => state.totals) || {};

  const recordedDays = Object.keys(monthData).sort((a, b) => parseInt(a) - parseInt(b));

  let workingDays = 0;
  let holidays = 0;
  let totalAmt = 0;

  for (const day of recordedDays) {
    const [amt25, amt2] = monthData[day];
    const dayTotal = amt25 * 2.5 + amt2 * 2;
    totalAmt += dayTotal;

    if (amt25 === 0 && amt2 === 0) {
      holidays++;
    } else {
      workingDays++;
    }
  }

  const avgPerDay = workingDays > 0 ? totalAmt / workingDays : 0;

  // Today's and Yesterday's
  const todayStr = format(new Date(), "d"); // e.g., "24"
  const yesterdayStr = String(parseInt(todayStr) - 1);

  const todayData = monthData[todayStr] || [0, 0];
  const yesterdayData = monthData[yesterdayStr] || [0, 0];

  const todayTotal = todayData[0] * 2.5 + todayData[1] * 2;
  const yesterdayTotal = yesterdayData[0] * 2.5 + yesterdayData[1] * 2;

  return {
    workingDays,
    holidays,
    avgPerDay,
    totalAmt,
    todayTotal,
    yesterdayTotal,
    recordedDays,
  };
}
