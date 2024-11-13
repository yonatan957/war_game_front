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
        addAttack: (state, action:PayloadAction<IAttack>) => {
            state.attacks.push(action.payload);
        },
    }
});

export default attacksSlice;