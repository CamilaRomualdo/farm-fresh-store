import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductsState } from "../../types";

const initialState: ProductsState = {
  products: {}
}

const productsSlice = createSlice({
  initialState,
  name: "products",
  reducers: {
    receivedProducts(state, action: PayloadAction<Product[]>) {
      const products = action.payload;
      products.forEach(product => {
        state.products[product.id] = product;
      })
    }
  },
});

export const { receivedProducts } = productsSlice.actions;
export default productsSlice.reducer;