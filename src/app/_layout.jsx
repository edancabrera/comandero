import { Slot } from "expo-router";
import { ComanderoProvider } from "../context/ComanderoContext";
import { UIProvider } from "../context/UIContext";

export default function RootLayout () {
    return (
        <UIProvider>
            <ComanderoProvider>
                <Slot />
            </ComanderoProvider>
        </UIProvider>
    )
}