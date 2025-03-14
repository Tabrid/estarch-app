import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveCartToStorage = async (items, totalQuantity) => {
    try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(items));
        await AsyncStorage.setItem('totalQuantity', JSON.stringify(totalQuantity));
    } catch (error) {
        console.error('Error saving cart data:', error);
    }
};

const loadCartFromStorage = async () => {
    try {
        const storedItems = await AsyncStorage.getItem('cartItems');
        const storedQuantity = await AsyncStorage.getItem('totalQuantity');
        return {
            items: storedItems ? JSON.parse(storedItems) : [],
            totalQuantity: storedQuantity ? JSON.parse(storedQuantity) : 0,
        };
    } catch (error) {
        console.error('Error loading cart data:', error);
        return { items: [], totalQuantity: 0 };
    }
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
    },
    reducers: {
        setInitialState(state, action) {
            state.items = action.payload.items;
            state.totalQuantity = action.payload.totalQuantity;
        },
        addToCart(state, action) {
            const item = action.payload;
            const existingItem = state.items.find(i => i.id === item.id && i.size === item.size);
            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                state.items.push(item);
            }
            state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
            saveCartToStorage(state.items, state.totalQuantity);
        },
        decreaseQuantity(state, action) {
            const itemId = action.payload;
            const item = state.items.find(i => i.id === itemId);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
            state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
            saveCartToStorage(state.items, state.totalQuantity);
        },
        increaseQuantity(state, action) {
            const itemId = action.payload;
            const item = state.items.find(i => i.id === itemId);
            if (item) {
                item.quantity += 1;
            }
            state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
            saveCartToStorage(state.items, state.totalQuantity);
        },
        removeItem(state, action) {
            const items = action.payload;
            state.items = state.items.filter(i => !(i.id === items.id && i.size === items.size));
            state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
            saveCartToStorage(state.items, state.totalQuantity);
        },
        initializeCartFromAsyncStorage: (state, action) => {
            state.items = action.payload.items;
            state.totalQuantity = action.payload.totalQuantity;
        }
    },
});

export const { setInitialState, addToCart, decreaseQuantity, increaseQuantity, removeItem, initializeCartFromAsyncStorage } = cartSlice.actions;

export const fetchCartFromStorage = () => async (dispatch) => {
    const cartData = await loadCartFromStorage();
    dispatch(initializeCartFromAsyncStorage(cartData));
};

export default cartSlice.reducer;
