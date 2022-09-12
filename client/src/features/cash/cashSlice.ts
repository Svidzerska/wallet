import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cashApi } from "../../api/cashApi";

import { Cash } from "../../interfaces/Cash";

interface InitialState {
  isAddCash: boolean;
  cashFromServer: { result: Cash[]; message: string | null };
  editingPocket: Cash;
}

const initialState: InitialState = {
  isAddCash: false,
  cashFromServer: { result: [], message: null },
  editingPocket: {},
};

export const saveCash = createAsyncThunk<any, Cash>("cash/saveCash", async (cash: Cash) => {
  return cashApi.saveCash(cash)?.then((data: any) => {
    return data; //payload - data
  }) as Promise<any>;
});

export const getCash = createAsyncThunk<any>("cash/getCash", async () => {
  return cashApi
    .getCash()
    ?.then((res: any) => {
      return res.express; //payload - data
    })
    .catch((err) => console.log(err)) as Promise<any>;
});

export const editCash = createAsyncThunk<any, Cash>("card/editCard", async (cashPocket: Cash) => {
  return cashApi.editCash(cashPocket)?.then((data: any) => {
    console.log(data);
    return data; //payload - data
  }) as Promise<any>;
});

export const cashSlice = createSlice({
  name: "cash",
  initialState,
  reducers: {
    setAddCash: (state: InitialState, action: PayloadAction<boolean>) => {
      state.isAddCash = action.payload;
    },
    setEditingPocket: (state: InitialState, action: PayloadAction<Cash>) => {
      state.editingPocket = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCash.fulfilled, (state, action) => {
      console.log(action.payload);
      state.cashFromServer = {
        result: action.payload,
        message: action.payload.length !== 0 ? null : "Не додано жодної інформації про готівку",
      };
    });
    builder.addCase(getCash.pending, (state, _action) => {
      state.cashFromServer = { result: [], message: "Loarding..." };
    });
    builder.addCase(getCash.rejected, (state, _action) => {
      state.cashFromServer = { result: [], message: "Something was wrong" };
    });
  },
});

export const { setAddCash, setEditingPocket } = cashSlice.actions;

export default cashSlice.reducer;
