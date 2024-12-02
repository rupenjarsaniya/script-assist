import { create } from "zustand";

interface User {
    id: number;
    name: string;
}

interface AppState {
    authState: {
        token: string;
        user: User | null;
    };
    login: (token: string, user: User) => void;
    logout: () => void;
}

const initialAppState = { token: "", user: null };

export const useAppStore = create<AppState>((set) => ({
    authState: JSON.parse(localStorage.getItem("authState") as string) || null,

    login: (token: string, user: User) => {
        const authData = { token, user };
        localStorage.setItem("authState", JSON.stringify(authData));
        set({ authState: authData });
    },

    logout: () => {
        localStorage.removeItem("authState");
        set({ authState: initialAppState });
    },
}));
