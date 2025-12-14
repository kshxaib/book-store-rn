import { View, Text } from 'react-native'
import React from 'react'
import { useAuthStore } from '../store/authStore';
import { TouchableOpacity } from 'react-native';
import styles from "../assets/styles/profile.style"
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../constants/colors';

export default function LogoutButton() {
    const {logout} = useAuthStore();
    const confirmLogout = () => {
        Alert.alert("Logout", "Are you sure you want to logout?", [
                {text: "Cancel", style: "cancel"},
                {text: "Logout", onPress: () => logout(), style: "destructive"},
            ]);
    };

  return (
    <TouchableOpacity onPress={confirmLogout} style={styles.logoutButton}>
      <Ionicons name='log-out-outline' size={24} color={COLORS.white}/>
    </TouchableOpacity>
  )
}