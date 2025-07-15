import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
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

interface Notification {
  _id: string;
  message: string;
  read?: boolean;
  createdAt?: string;
}

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
        if (!user?.email) return;

        const userRes = await fetch(`http://localhost:5000/api/users/usuarios/${user.email}`);
        const userData = await userRes.json();

        if (!userData?._id) {
          console.warn("Usuário não encontrado");
          return;
        }

        const notificationsRes = await fetch(`http://localhost:5000/api/comments/notifications/${userData._id}`);
        const notificationsData = await notificationsRes.json();

        setNotifications(notificationsData);
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
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.notificationItem}>
                    <Text style={styles.notificationText}>{item.message}</Text>
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
