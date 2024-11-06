// app/_layout.jsx
import { Stack } from 'expo-router';

export default function RootLayout() {
    return (
        <Stack screenOptions={{ headerShown: true }}>
            <Stack.Screen name="index" />
        </Stack>

    );
}