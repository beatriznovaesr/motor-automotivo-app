import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { NavigationMenu } from "../navigationMenu/navigationMenu";
import replyComment from "../replyComment/replyComment";

import {
  useFonts,
  RobotoSerif_400Regular,
  RobotoSerif_700Bold,
} from "@expo-google-fonts/roboto-serif";

import { useUser } from "../../contexts/userContext";

interface Notification {
  _id: string;
  message: string;
  read?: boolean;
  createdAt?: string;
}

const ReplyComment = replyComment;

export const NotificationComponent: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [hasNew, setHasNew] = useState(false);

  const { user } = useUser();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  const [fontsLoaded] = useFonts({
    RobotoSerif_400Regular,
    RobotoSerif_700Bold,
  });

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        if (!user?.email) return;

        const userRes = await fetch(`http://localhost:5000/users/email/${user.email}`);
        const userData = await userRes.json();

        if (!userData?._id) {
          console.warn("Usuário não encontrado");
          return;
        }

        const notificationsRes = await fetch(`http://localhost:5000/api/comments/notificacoes/${userData._id}`);
        const notificationsData = await notificationsRes.json();

        setNotifications(notificationsData);
        setHasNew(notificationsData.some((n: Notification) => !n.read));
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
            <MaterialCommunityIcons
              name="bell-ring"
              size={32}
              color={hasNew ? "#facc15" : "#fff"}
            />
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
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedNotification(item);
                      setModalVisible(true);
                    }}
                    style={styles.notificationItem}
                  >
                    <Text style={styles.notificationText}>{item.message}</Text>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>

          <ReplyComment
            visible={modalVisible}
            message={selectedNotification?.message || ""}
            onCancel={() => setModalVisible(false)}
            onSave={async (replyText) => {
              try {
                const res = await fetch(`http://localhost:5000/api/comments/reply/${selectedNotification?._id}`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ userId: user?._id, text: replyText })
                });
                if (!res.ok) throw new Error("Erro ao salvar resposta");
                setModalVisible(false);
              } catch (e) {
                console.error(e);
              }
            }}
          />
        </View>
      </ScrollView>

      <NavigationMenu />
    </View>
  );
};

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
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 50,
    backgroundColor: "#155fbf",
    width: "100%",
    position: "relative",
  },
  headerText: {
    color: "#ffffff",
    fontSize: 22,
    fontFamily: "RobotoSerif_700Bold",
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    textShadowColor: "#000000aa",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
    zIndex: -1,
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
