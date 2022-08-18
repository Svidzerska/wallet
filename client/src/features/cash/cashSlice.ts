import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cashApi } from "../../api/cashApi";

import { Cash } from "../../interfaces/Cash";

interface InitialState {
  isAddCash: boolean;
  currentCash: Cash | null;
  savedCash: Cash | null;
  cashFromServer: Cash[];
  editingPocket: Cash;
  editedCash: string;
}

const initialState: InitialState = {
  isAddCash: false,
  currentCash: null,
  savedCash: null,
  cashFromServer: [],
  editingPocket: {},
  editedCash: "",
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
    setCurrentCash: (state: InitialState, action: PayloadAction<Cash | null>) => {
      state.currentCash = action.payload;
    },
    setEditingPocket: (state: InitialState, action: PayloadAction<Cash>) => {
      state.editingPocket = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveCash.fulfilled, (state, action) => {
      console.log(action.payload);
      state.savedCash = action.payload;
    });
    builder.addCase(saveCash.pending, (state, _action) => {
      state.savedCash = null;
    });
    builder.addCase(saveCash.rejected, (state, _action) => {
      state.savedCash = null;
    });

    builder.addCase(getCash.fulfilled, (state, action) => {
      state.cashFromServer = action.payload;
    });
    builder.addCase(getCash.pending, (state, _action) => {
      state.cashFromServer = [];
    });
    builder.addCase(getCash.rejected, (state, _action) => {
      state.cashFromServer = [];
    });

    builder.addCase(editCash.fulfilled, (state, action) => {
      console.log(action.payload);
      state.editedCash = action.payload;
    });
    builder.addCase(editCash.pending, (state, _action) => {
      state.editedCash = "";
    });
    builder.addCase(editCash.rejected, (state, _action) => {
      state.editedCash = "";
    });
  },
});

export const { setAddCash, setCurrentCash, setEditingPocket } = cashSlice.actions;

export default cashSlice.reducer;
