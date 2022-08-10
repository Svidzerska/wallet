import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  isAddCard: boolean;
}

const initialState: InitialState = {
  isAddCard: false,
};

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setAddCard: (state: InitialState, action: PayloadAction<boolean>) => {
      state.isAddCard = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setAddCard } = cardsSlice.actions;

export default cardsSlice.reducer;
