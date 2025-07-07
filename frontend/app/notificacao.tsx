import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { NavigationMenu } from "../src/components/navigationMenu/navigationMenu";
import replyComment from "../src/components/replyComment/replyComment";

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

const ReplyComment = replyComment;

const Notifications: React.FC = () => {
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
      
      const notificationsRes = await fetch(`http://localhost:5000/api/notifications/${userData._id}`);
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
    <View style={styles.container}>
      <View style={styles.box}>
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
            <Text style={styles.emptyText}>
              Nenhuma notificação no momento.
            </Text>
          ) : (
            <FlatList
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
      </View>

      <ReplyComment
        visible={modalVisible}
        message={selectedNotification?.message || ""}
        onCancel={() => setModalVisible(false)}
        onSave={(replyText) => {
          console.log("Resposta enviada:", replyText);
          setModalVisible(false);
        }}
      />


      <NavigationMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "space-between",
    alignItems: "center",
  },
  box: {
    width: "100%",
    backgroundColor: "#ffffff",
    flex: 1,
  },
  header: {
    backgroundColor: "#155fbf",
    paddingVertical: 40,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    color: "#ffffff",
    fontSize: 20,
    fontFamily: "RobotoSerif_700Bold",
  },
  notificationList: {
    backgroundColor: "#ffffff",
    flex: 1,
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
    padding: 16,
    color: "#6b7280",
    textAlign: "center",
    fontFamily: "RobotoSerif_400Regular",
  },
});

export default Notifications;
