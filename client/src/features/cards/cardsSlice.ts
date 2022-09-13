import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Card } from "../../interfaces/Card";

import { cardApi } from "../../api/cardApi";

interface InitialState {
  isAddCard: boolean;
  editingCard: Card | null;
  currentCard: Card | null;
  savedCard: Card | null;
  cardsFromServer: { result: Card[]; message: string | null };
  addCardInfo: { scheme: string; type: string } | null;
  deletedCard: string;
  editedCard: string;
}

const initialState: InitialState = {
  isAddCard: false,
  editingCard: null,
  currentCard: null,
  savedCard: null,
  cardsFromServer: { result: [], message: "Send request..." },
  addCardInfo: null,
  deletedCard: "",
  editedCard: "",
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
      return res.express; //payload - data
    })
    .catch((err) => console.log(err)) as Promise<any>;
});

export const getAddCardInfo = createAsyncThunk<{ scheme: string; type: string }, string>(
  "addCardInfo/getAddCardInfo",
  async (digit: string) => {
    return cardApi.getAddCardInfo(digit)?.then((data: any) => {
      return data; //payload - data
    }) as Promise<{ scheme: string; type: string }>;
  }
);

export const deleteCard = createAsyncThunk<any, string>("card/deleteCard", async (id: string) => {
  return cardApi.deleteCard(id)?.then((data: any) => {
    return data; //payload - data
  }) as Promise<any>;
});

export const editCard = createAsyncThunk<any, Card>("card/editCard", async (card: Card) => {
  return cardApi.editCard(card)?.then((data: any) => {
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
    setEditingCard: (state: InitialState, action: PayloadAction<Card | null>) => {
      state.editingCard = action.payload;
    },
    setCurrentCard: (state: InitialState, action: PayloadAction<Card | null>) => {
      state.currentCard = action.payload;
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
      state.cardsFromServer = { result: action.payload, message: null };
    });
    builder.addCase(getCards.pending, (state, _action) => {
      state.cardsFromServer = { result: [], message: "Loarding..." };
    });
    builder.addCase(getCards.rejected, (state, _action) => {
      state.cardsFromServer = { result: [], message: "Something was wrong!" };
    });

    builder.addCase(getAddCardInfo.fulfilled, (state, action) => {
      state.addCardInfo = action.payload;
    });
    //when pending
    builder.addCase(getAddCardInfo.pending, (state, _action) => {
      state.addCardInfo = null;
    });
    builder.addCase(getAddCardInfo.rejected, (state, _action) => {
      state.addCardInfo = null;
    });

    builder.addCase(deleteCard.fulfilled, (state, action) => {
      state.deletedCard = action.payload;
    });
    builder.addCase(deleteCard.pending, (state, _action) => {
      state.deletedCard = "";
    });
    builder.addCase(deleteCard.rejected, (state, _action) => {
      state.deletedCard = "";
    });
  },
});

export const { setAddCard, setEditingCard, setCurrentCard } = cardsSlice.actions;

export default cardsSlice.reducer;
