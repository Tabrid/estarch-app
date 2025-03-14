import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import drawerReducer from './slices/drawerSlice';
import cartReducer from './slices/cartSlice.js';
import alertReducer from './slices/alertSlice.js';

const store = configureStore({
    reducer: {
        counter: counterReducer,
        drawer: drawerReducer,
        cart: cartReducer,
        alert: alertReducer
    },
});

export default store;
