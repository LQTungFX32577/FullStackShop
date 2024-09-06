import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthRedux";
import cartSlice from "./CartRedux";

export const store = configureStore({
    reducer:{
        authentication: authSlice.reducer,
        cart: cartSlice.reducer,
    }
});