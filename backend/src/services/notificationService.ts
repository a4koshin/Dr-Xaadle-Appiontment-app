import prisma from "../config/prisma";

type NotificationInput = {
  userId: string;
  title: string;
  message: string;
  type: "BOOKING" | "PAYMENT" | "REMINDER" | "SYSTEM";
};

export const notificationService = {
  createNotification: async (data: NotificationInput) => {
    return prisma.notification.create({
      data,
    });
  },

  getNotifications: async (userId: string) => {
    return prisma.notification.findMany({
      where: {
        userId,
        status: "ACTIVE",
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  markAsRead: async (id: string) => {
    const notification = await prisma.notification.findUnique({
      where: { id },
    });

    if (!notification || notification.status === "DELETED") {
      throw new Error("Notification not found.");
    }

    return prisma.notification.update({
      where: { id },
      data: {
        isRead: true,
      },
    });
  },

  softDeleteNotification: async (id: string) => {
    const notification = await prisma.notification.findUnique({
      where: { id },
    });

    if (!notification || notification.status === "DELETED") {
      throw new Error("Notification not found.");
    }

    return prisma.notification.update({
      where: { id },
      data: {
        status: "DELETED",
      },
    });
  },
};