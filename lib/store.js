import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import drawerReducer from './slices/drawerSlice';


const store = configureStore({
    reducer: {
        counter: counterReducer,
        drawer: drawerReducer,
    },
});

export default store;
