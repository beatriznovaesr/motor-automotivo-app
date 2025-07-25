import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useUser } from "../../contexts/userContext";
import { useRouter } from "expo-router"; 

export const NotificationBell = () => {
  const [hasNew, setHasNew] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        if (!user?.email) return;

        const userRes = await fetch(`http://localhost:5000/api/users/usuarios/${user.email}`);
        const userData = await userRes.json();

        if (!userData?._id) return;

        const notificationsRes = await fetch(`http://localhost:5000/api/comments/notifications/${userData._id}`);
        const notificationsData = await notificationsRes.json();

        setHasNew(notificationsData.some((n: any) => !n.read));
      } catch (error) {
        console.error("Erro ao buscar notificações:", error);
      }
    };

    fetchNotifications();
  }, [user]);

  return (
    <TouchableOpacity
      onPress={() => router.push("notificacao")} 
      //style={{ top: 50, right: 16, zIndex: 10 }}
          >
      <MaterialCommunityIcons
        name="bell-ring"
        size={32}
        color={hasNew ? "#facc15" : "#fff"}
      />
    </TouchableOpacity>
  );
};
