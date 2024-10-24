import { Stack } from "expo-router";
import { Provider } from 'react-redux'
import store from '../lib/store.js';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </Provider>

  );
}
