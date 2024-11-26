import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { attacksState, DataStatus } from "../../types/redux";
import { IAttack } from "../../types/attack";

const initialState: attacksState = {
  error: null,
  status: DataStatus.IDLE,
  attacks: [],
};

export const fetchAttacks = createAsyncThunk('attack/load',
  async (Data: { token: string, url: string, }, thunkApi) => {
      try {
          const res = await fetch(`${import.meta.env.VITE_BASE_URL}/attacks/` + Data.url, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': Data.token
              },
          });
          if (!res.ok) {
              thunkApi.rejectWithValue("can't login, please try again");
              return
          }
          const data = await res.json();
          thunkApi.fulfillWithValue(data);
          return data
      } catch (error) {
          thunkApi.rejectWithValue(error instanceof Error ? error.message : "Unknown error occurred");
      }
  }
);

const attacksSlice = createSlice({
  name: "attacks",
  initialState,
  reducers: {
    addAttack: (state, action: PayloadAction<IAttack>) => {
      state.attacks.push(action.payload);
    },
    updateTimeLeft: (state, action: PayloadAction<{ id: string; timeLeft: number }>) => {
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
    initAttack: (state) => {
      state.attacks = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAttacks.pending, (state) => {
      state.status = DataStatus.LOADING;
      state.error = null;
      state.attacks = [];
  })
  .addCase(fetchAttacks.fulfilled, (state, action) => {
      state.status = DataStatus.SUCCESS;
      state.error = null;
      state.attacks = action.payload as IAttack[] || [];
  })
  .addCase(fetchAttacks.rejected, (state, action) => {
      state.status = DataStatus.FAILED;
      state.error = action.payload as string;
      state.attacks = [];
  })
  },
});

export default attacksSlice;
