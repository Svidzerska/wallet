import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  isAddCash: boolean;
}

const initialState: InitialState = {
  isAddCash: false,
};

export const cashSlice = createSlice({
  name: "cash",
  initialState,
  reducers: {
    setAddCash: (state: InitialState, action: PayloadAction<boolean>) => {
      state.isAddCash = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setAddCash } = cashSlice.actions;

export default cashSlice.reducer;
