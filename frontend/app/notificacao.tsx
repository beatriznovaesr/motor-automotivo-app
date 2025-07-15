import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import { NavigationMenu } from "../src/components/navigationMenu/navigationMenu";
import { NotificationBell } from "../src/components/notificationComponent/notificationBell";

import {
  useFonts,
  RobotoSerif_400Regular,
  RobotoSerif_700Bold,
} from "@expo-google-fonts/roboto-serif";

import { useUser } from "../src/contexts/userContext";

// ✅ Agora notificações são apenas strings
type Notification = string;

const API_URL = process.env.EXPO_PUBLIC_API || "http://localhost:5000";

export default function Notificacao() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { user } = useUser();

  const [fontsLoaded] = useFonts({
    RobotoSerif_400Regular,
    RobotoSerif_700Bold,
  });

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        if (!user?.email) {
          console.warn("Nenhum e-mail de usuário encontrado");
          return;
        }

        console.log("Buscando usuário pelo e-mail:", user.email);

        const userRes = await fetch(`${API_URL}/api/users/usuarios/${user.email}`);
        const userData = await userRes.json();

        console.log("Usuário encontrado:", userData);

        const notificationsRes = await fetch(`${API_URL}/api/comments/notifications/${userData.id}`);
        const notificationsData = await notificationsRes.json();

        console.log("Notificações recebidas:", notificationsData);

        if (Array.isArray(notificationsData)) {
          setNotifications(notificationsData); // array de strings
        } else {
          console.warn("Formato inesperado das notificações");
        }

      } catch (error) {
        console.error("Erro ao buscar notificações:", error);
      }
    };

    fetchNotifications();
  }, [user]);

  if (!fontsLoaded) return null;

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Notificações</Text>
            <NotificationBell />
          </View>

          <View style={styles.notificationList}>
            {notifications.length === 0 ? (
              <Text style={styles.emptyText}>Nenhuma notificação no momento.</Text>
            ) : (
              <FlatList
                scrollEnabled={false}
                data={notifications}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.notificationItem}>
                    <Text style={styles.notificationText}>{item}</Text>
                  </View>
                )}
              />
            )}
          </View>
        </View>
      </ScrollView>

      <NavigationMenu />
    </View>
  );
}


const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#ffffff",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  scrollContent: {
    alignItems: "center",
    width: "100%",
    paddingBottom: 100,
  },
  container: {
    flex: 1,
    width: "100%",
    maxWidth: 480,
    gap: 6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 50,
    backgroundColor: "#155fbf",
    width: "100%",
  },
  headerText: {
    color: "#ffffff",
    fontSize: 22,
    fontFamily: "RobotoSerif_700Bold",
    textAlign: "center",
    flex: 1,
    marginLeft: -70,
    marginTop: 26,
    textShadowColor: "#000000aa",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
  },
  notificationList: {
    width: "100%",
    backgroundColor: "#ffffff",
  },
  notificationItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomColor: "#e5e7eb",
    borderBottomWidth: 1,
  },
  notificationText: {
    color: "#111827",
    fontSize: 14,
    fontFamily: "RobotoSerif_400Regular",
  },
  emptyText: {
    padding: 24,
    color: "#6b7280",
    textAlign: "center",
    fontFamily: "RobotoSerif_400Regular",
  },
});
