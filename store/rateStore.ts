import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import backupToGitHub from '~/utils/backupToGitHub';

const tempData: Record<string, Record<string, [number, number]>> = {
  "02-2025": {
    "01": [96, 60],
    "02": [162, 0],
    "03": [108, 72],
    "04": [147, 18],
    "05": [138, 30],
    "06": [102, 60],
    "07": [66, 114],
    "08": [126, 36],
    "09": [87, 57],
    "10": [144, 0],
    "11": [150, 0],
    "12": [162, 0],
    "13": [150, 0],
    "14": [138, 24],
    "15": [48, 138],
    "16": [132, 36],
    "17": [120, 39],
    "18": [123, 0],
    "19": [162, 0],
    "20": [162, 0],
    "21": [123, 48],
    "22": [126, 48],
    "23": [144, 0],
    "24": [162, 0],
    "25": [162, 0],
    "26": [144, 0],
  }
};

interface RateStore {
  data: Record<string, Record<string, [number, number]>>; // {'mm-yyyy': {'dd': [amt1, amt2]}}
  totals: Record<string, number>; // {'mm-yyyy': totalAmount}
  upsertEntry: (date: string, amt1: number, amt2: number) => void;
  getMonthData: (month: string) => Record<string, [number, number]> | null;
}

export const useRateStore = create(
  persist<RateStore>(
    (set, get) => ({
      data: tempData,
      totals: {},

      upsertEntry: (date, amt1, amt2) => {
        set((state) => {
          const [day, month, year] = date.split('-');
          const key = `${month}-${year}`;
          const newData: Record<string, Record<string, [number, number]>> = {
            ...state.data,
            [key]: {
              ...state.data[key],
              [day]: [amt1, amt2], // Updates if exists, inserts if new
            },
          };

          // Compute total asynchronously
          setTimeout(() => {
            const monthTotal = Object.values(newData[key] || {}).reduce(
              (sum, [a1, a2]) => sum + a1 * 2.5 + a2 * 2,
              0
            );
            set((state) => ({
              totals: { ...state.totals, [key]: monthTotal },
            }));
          }, 0);

          // Backup to GitHub after update
          setTimeout(async () => {
            await backupToGitHub();
          }, 2000); // Delay to avoid excessive API calls

          return { data: newData };
        });
      },

      getMonthData: (month) => get().data[month] || null,
    }),
    {
      name: 'rate-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
