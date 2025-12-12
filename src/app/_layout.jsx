import { Slot } from "expo-router";
import { ComanderoProvider } from "../context/ComanderoContext";

export default function RootLayout () {
    return (
        <ComanderoProvider>
            <Slot />
        </ComanderoProvider>
    )
}