import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import attacksSlice from "./slices/AttacksSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    attacks: attacksSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const {addAttack, updateTimeLeft, cancelAttack} = attacksSlice.actions;
export const { decrese } = userSlice.actions;