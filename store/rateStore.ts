import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface RateStore {
  data: Record<string, Record<string, [number, number]>>; // {'mm-yyyy': {'dd': [amt1, amt2]}}
  addEntry: (date: string, amt1: number, amt2: number) => void;
  editEntry: (date: string, amt1: number, amt2: number) => void;
  getMonthData: (month: string) => Record<string, [number, number]> | null;
}

export const useRateStore = create(
  persist<RateStore>(
    (set, get) => ({
      data: {},

      addEntry: (date, amt1, amt2) => {
        set((state) => {
          const [day, month, year] = date.split('-');
          const key = `${month}-${year}`;

          return {
            data: {
              ...state.data,
              [key]: {
                ...state.data[key],
                [day]: [amt1, amt2],
              },
            },
          };
        });
      },

      editEntry: (date, amt1, amt2) => {
        set((state) => {
          const [day, month, year] = date.split('-');
          const key = `${month}-${year}`;

          if (!state.data[key] || !state.data[key][day]) return state;

          return {
            data: {
              ...state.data,
              [key]: {
                ...state.data[key],
                [day]: [amt1, amt2],
              },
            },
          };
        });
      },

      getMonthData: (month) => {
        return get().data[month] || null;
      },
    }),
    {
      name: 'rate-store', // Storage key
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
