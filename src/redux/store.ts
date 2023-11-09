import { combineReducers, configureStore } from "@reduxjs/toolkit";

import cartSlice from "./features/cartSlice";
import productsSlice from "./features/productsSlice";

const rootReducer = combineReducers({
  cart: cartSlice,
  products: productsSlice
});

export const store = configureStore({
  reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;