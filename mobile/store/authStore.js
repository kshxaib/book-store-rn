import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAuthStore = create((set) => ({
    user: null,
    token: null,
    isLoading: false,
    isCheckingAuth: true,

    register: async (username, email, password) => {
        set({ isLoading: true })
        try {
            const response = await fetch("https://book-store-rn.onrender.com/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, email, password })
            })

            const data = await response.json()

            if (!response.ok) throw new Error(data.message || "Something went wrong");

            await AsyncStorage.setItem("user", JSON.stringify(data.user))
            await AsyncStorage.setItem("token", data.token)

            set({ user: data.user, token: data.token })
            return { success: true }
        } catch (error) {
            return { success: false, error: error.message || "Something went wrong" }
        } finally {
            set({ isLoading: false })
        }
    },

    login: async (email, password) => {
        set({ isLoading: true })
        try {
            const response = await fetch("https://book-store-rn.onrender.com/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })

            const data = await response.json()

            if (!response.ok) throw new Error(data.message || "Something went wrong");

            await AsyncStorage.setItem("user", JSON.stringify(data.user))
            await AsyncStorage.setItem("token", data.token)

            set({ user: data.user, token: data.token })
            return { success: true }
        } catch (error) {
            return { success: false, error: error.message || "Something went wrong" }
        } finally {
            set({ isLoading: false })
        }
    },

    checkAuth: async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            const user = await AsyncStorage.getItem("user")

            const userInJson = user ? JSON.parse(user) : null

            set({ user: userInJson, token: token })
            return { success: true }
        } catch (error) {
            return { success: false, error: error.message || "Something went wrong" }
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    logout: async () => {
        try {
            await AsyncStorage.removeItem("user")
            await AsyncStorage.removeItem("token")
            set({ user: null, token: null })
            return { success: true }
        } catch (error) {
            return { success: false, error: error.message || "Something went wrong" }
        }
    }
}))