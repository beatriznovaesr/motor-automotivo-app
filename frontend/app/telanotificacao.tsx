import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { NavigationMenu } from "../src/components/navigationMenu/navigationMenu";

interface Notification {
  id: number;
  message: string;
}

const Notifications: React.FC = () => {
  const notifications: Notification[] = []; // Os dados virão do backend futuramente

  return (
    <div className="max-w-sm mx-auto mt-5 border rounded shadow">
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center rounded-t">
        <h2 className="text-lg font-semibold">Notificações</h2>
        <MaterialCommunityIcons name="bell-ring" size={45} color="white" />
      </div>
      <div className="bg-white divide-y divide-gray-200">
        {notifications.length === 0 ? (
          <div className="p-3 text-sm text-gray-500">Nenhuma notificação no momento.</div>
        ) : (
          notifications.map((notification) => (
            <div key={notification.id} className="p-3 text-sm text-gray-800">
              {notification.message}
            </div>
          ))
        )}
      </div>
      <NavigationMenu/>
    </div>
  );
};
