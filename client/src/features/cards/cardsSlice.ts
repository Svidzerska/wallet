import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Card } from "../../interfaces/Card";

import { cardApi } from "../../api/cardApi";

interface InitialState {
  isAddCard: boolean;
  savedCard: Card | null;
  cardsFromServer: Card[];
  addCardInfo: any;
}

const initialState: InitialState = {
  isAddCard: false,
  savedCard: null,
  cardsFromServer: [],
  addCardInfo: null,
};

export const saveCard = createAsyncThunk<any, Card>("card/saveCard", async (card: Card) => {
  return cardApi.saveCard(card)?.then((data: any) => {
    return data; //payload - data
  }) as Promise<any>;
});

export const getCards = createAsyncThunk<any>("cards/getCards", async () => {
  return cardApi
    .getCards()
    ?.then((res: any) => {
      console.log(res.express);
      return res.express; //payload - data
    })
    .catch((err) => console.log(err)) as Promise<any>;
});

export const getAddCardInfo = createAsyncThunk<any, string>("addCardInfo/getAddCardInfo", async (digit: string) => {
  return cardApi.getAddCardInfo(digit)?.then((data: any) => {
    console.log(data);
    return data; //payload - data
  }) as Promise<any>;
});

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setAddCard: (state: InitialState, action: PayloadAction<boolean>) => {
      state.isAddCard = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveCard.fulfilled, (state, action) => {
      state.savedCard = action.payload;
    });
    builder.addCase(saveCard.pending, (state, _action) => {
      state.savedCard = null;
    });
    builder.addCase(saveCard.rejected, (state, _action) => {
      state.savedCard = null;
    });

    builder.addCase(getCards.fulfilled, (state, action) => {
      state.cardsFromServer = action.payload;
    });
    builder.addCase(getCards.pending, (state, _action) => {
      state.cardsFromServer = [];
    });
    builder.addCase(getCards.rejected, (state, _action) => {
      state.cardsFromServer = [];
    });

    builder.addCase(getAddCardInfo.fulfilled, (state, action) => {
      state.addCardInfo = action.payload;
    });
    builder.addCase(getAddCardInfo.pending, (state, _action) => {
      state.addCardInfo = null;
    });
    builder.addCase(getAddCardInfo.rejected, (state, _action) => {
      state.addCardInfo = null;
    });
  },
});

export const { setAddCard } = cardsSlice.actions;

export default cardsSlice.reducer;
