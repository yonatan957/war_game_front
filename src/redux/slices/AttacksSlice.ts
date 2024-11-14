import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { attacksState, DataStatus } from "../../types/redux";
import { IAttack } from "../../types/attack";

const initialState: attacksState = {
  error: null,
  status: DataStatus.IDLE,
  attacks: [],
};

const attacksSlice = createSlice({
  name: "attacks",
  initialState,
  reducers: {
    addAttack: (state, action: PayloadAction<IAttack>) => {
      console.log(action.payload);
      state.attacks.push(action.payload);
    },
    updateTimeLeft: (
      state,
      action: PayloadAction<{ id: string; timeLeft: number }>
    ) => {
      const attack = state.attacks.find(
        (attack) => attack._id === action.payload.id
      );
      if (attack) {
        attack.tymeToHit = action.payload.timeLeft;
      }
    },
    cancelAttack: (state, action: PayloadAction<IAttack>) => {
      const attack = state.attacks.find(
        (attack) => attack._id === action.payload._id
      );
      if (attack) {
        attack.id_intercepted = action.payload.id_intercepted;
        attack.intercepted = action.payload.intercepted;
        attack.tymeToHit = 0;
      }
    },
  },
});

export default attacksSlice;
