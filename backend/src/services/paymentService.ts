import prisma from "../config/prisma";

type PaymentInput = {
  appointmentId: string;
  patientId: string;
  provider: "HORMUUD" | "SOMTEL";
  amount: number;
  phone: string;
  transactionId?: string;
};

export const paymentService = {
  createPayment: async (data: PaymentInput) => {
    const appointment = await prisma.appointment.findUnique({
      where: { id: data.appointmentId },
    });

    if (!appointment || appointment.status === "DELETED") {
      throw new Error("Appointment not found.");
    }

    const existingPayment = await prisma.payment.findUnique({
      where: { appointmentId: data.appointmentId },
    });

    if (existingPayment) {
      throw new Error("Payment already exists for this appointment.");
    }

    return prisma.payment.create({
      data,
    });
  },

  getPayments: async () => {
    return prisma.payment.findMany({
      where: { paymStatus: "ACTIVE" },
      include: {
        appointment: true,
        patient: true,
      },
      orderBy: { createdAt: "desc" },
    });
  },

  getPaymentById: async (id: string) => {
    const payment = await prisma.payment.findUnique({
      where: { id },
      include: {
        appointment: true,
        patient: true,
      },
    });

    if (!payment || payment.paymStatus === "DELETED") {
      throw new Error("Payment not found.");
    }

    return payment;
  },

  updatePaymentStatus: async (
    id: string,
    data: {
      status: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
      transactionId?: string;
    },
  ) => {
    const payment = await prisma.payment.findUnique({
      where: { id },
    });

    if (!payment || payment.paymStatus === "DELETED") {
      throw new Error("Payment not found.");
    }

    return prisma.payment.update({
      where: { id },
      data: {
        status: data.status,
        transactionId: data.transactionId,
      },
    });
  },

  softDeletePayment: async (id: string) => {
    const payment = await prisma.payment.findUnique({
      where: { id },
    });

    if (!payment || payment.paymStatus === "DELETED") {
      throw new Error("Payment not found.");
    }

    return prisma.payment.update({
      where: { id },
      data: { paymStatus: "DELETED" },
    });
  },
};
