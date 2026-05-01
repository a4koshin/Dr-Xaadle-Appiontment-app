import prisma from "../config/prisma";

export const dashboardService = {
  getDashboardStats: async () => {
    const totalUsers = await prisma.user.count({
      where: {
        status: "ACTIVE",
      },
    });

    const totalPatients = await prisma.user.count({
      where: {
        role: "PATIENT",
        status: "ACTIVE",
      },
    });

    const totalDoctors = await prisma.user.count({
      where: {
        role: "DOCTOR",
        status: "ACTIVE",
      },
    });

    const totalAppointments = await prisma.appointment.count({
      where: {
        status: "ACTIVE",
      },
    });

    const totalPendingAppointments = await prisma.appointment.count({
      where: {
        status: "ACTIVE",
        appointmentStatus: "PENDING",
      },
    });

    const totalConfirmedAppointments = await prisma.appointment.count({
      where: {
        status: "ACTIVE",
        appointmentStatus: "CONFIRMED",
      },
    });

    const totalCompletedAppointments = await prisma.appointment.count({
      where: {
        status: "ACTIVE",
        appointmentStatus: "COMPLETED",
      },
    });

    const totalPayments = await prisma.payment.count({
      where: {
        paymStatus: "ACTIVE",
      },
    });

    const totalPaidPayments = await prisma.payment.count({
      where: {
        paymStatus: "ACTIVE",
        status: "PAID",
      },
    });

    const revenue = await prisma.payment.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        paymStatus: "ACTIVE",
        status: "PAID",
      },
    });

    const totalNotifications = await prisma.notification.count({
      where: {
        status: "ACTIVE",
      },
    });

    return {
      totalUsers,
      totalPatients,
      totalDoctors,
      totalAppointments,
      totalPendingAppointments,
      totalConfirmedAppointments,
      totalCompletedAppointments,
      totalPayments,
      totalPaidPayments,
      totalRevenue: revenue._sum.amount || 0,
      totalNotifications,
    };
  },
};
