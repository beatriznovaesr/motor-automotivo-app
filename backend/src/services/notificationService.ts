import NotificationModel from "../models/Notification";



export const getNotificationsByUser = async (userId: string) => {
  console.log("user id no service", userId);
  return await NotificationModel.find({ userId }).exec();
};

export const createNotification = async (userId: string, message: string) => {


  const novaNotificacao = await NotificationModel.create({
    userId,
    message,
    read: false,
  });

  return novaNotificacao;
};


export const markNotificationAsRead = async (notificationId: string) => {
  const notification = await NotificationModel.findById(notificationId);
  if (!notification) return null;

  notification.read = true;
  await notification.save();
  return notification;
};
