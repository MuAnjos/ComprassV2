import React from 'react';
import { create } from 'zustand';

type State = {
  amount: number | null;
  setAmount: (value: number | null) => void;
};
export const useAmountStore = create<State>((set) => ({
  amount: null,
  setAmount: (value) => set({ amount: value }),
}));
