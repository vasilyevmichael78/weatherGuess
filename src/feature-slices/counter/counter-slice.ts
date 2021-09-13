import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toNormalDegree } from "../../utils/util-fuctions";


interface CounterState {
  _try: "win" | "lose" | null;
  counts: ("win" | "lose" | null)[];
  status: 'You win!'|'You lose!'|''
}


const initialState: CounterState = {
  _try: null,
  counts: [],
  status:''
};

export const counterSlice = createSlice({
  name: "counter-tries",
  initialState,
  reducers: {
    incrementTries: (state) => {
      if (state.counts.length === 5) {

        state.status = state.counts.filter(c => c==='win').length>2?
            "You win!": "You lose!"
        state.counts = []
      }
      state.counts.push(state._try);
    },
    compare: (
      state,
      action: PayloadAction<{ temp: number; tempServer: number }>
    ) => {
      const diff = Math.abs(
        action.payload.temp - toNormalDegree(action.payload.tempServer)
      );

      if (diff < 2) {
        state._try = "win";
      } else state._try = "lose";
    },
  },
});

export const { incrementTries, compare } = counterSlice.actions;

export default counterSlice.reducer;
