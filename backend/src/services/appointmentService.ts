import prisma from "../config/prisma";

type AppointmentInput = {
  patientId: string;
  doctorId: string;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  reason?: string;
};

export const appointmentService = {
  createAppointment: async (data: AppointmentInput) => {
    const appointmentDate = new Date(data.appointmentDate);

    const doctor = await prisma.doctorProfile.findUnique({
      where: { id: data.doctorId },
    });

    if (!doctor) {
      throw new Error("Doctor not found.");
    }

    const dayOfWeek = appointmentDate
      .toLocaleDateString("en-US", { weekday: "long" })
      .toUpperCase();

    const availability = await prisma.doctorAvailability.findFirst({
      where: {
        doctorId: data.doctorId,
        dayOfWeek: dayOfWeek as any,
        status: "ACTIVE",
        isActive: true,
      },
    });

    if (!availability) {
      throw new Error("Doctor is not available on this day.");
    }

    const blockedSlot = await prisma.blockedSlot.findFirst({
      where: {
        doctorId: data.doctorId,
        date: appointmentDate,
        startTime: data.startTime,
        endTime: data.endTime,
        status: "ACTIVE",
      },
    });

    if (blockedSlot) {
      throw new Error("This time slot is blocked.");
    }

    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        doctorId: data.doctorId,
        appointmentDate,
        startTime: data.startTime,
        endTime: data.endTime,
        status: "ACTIVE",
      },
    });

    if (existingAppointment) {
      throw new Error("This appointment slot is already booked.");
    }

    return prisma.appointment.create({
      data: {
        ...data,
        appointmentDate,
      },
    });
  },

  getAppointments: async () => {
    return prisma.appointment.findMany({
      where: {
        status: "ACTIVE",
      },
      include: {
        patient: true,
        doctor: true,
        payment: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  getAppointmentById: async (id: string) => {
    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: {
        patient: true,
        doctor: true,
        payment: true,
      },
    });

    if (!appointment || appointment.status === "DELETED") {
      throw new Error("Appointment not found.");
    }

    return appointment;
  },

  updateAppointmentStatus: async (
    id: string,
    appointmentStatus: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED"
  ) => {
    const appointment = await prisma.appointment.findUnique({
      where: { id },
    });

    if (!appointment || appointment.status === "DELETED") {
      throw new Error("Appointment not found.");
    }

    return prisma.appointment.update({
      where: { id },
      data: {
        appointmentStatus,
      },
    });
  },

  softDeleteAppointment: async (id: string) => {
    const appointment = await prisma.appointment.findUnique({
      where: { id },
    });

    if (!appointment || appointment.status === "DELETED") {
      throw new Error("Appointment not found.");
    }

    return prisma.appointment.update({
      where: { id },
      data: {
        status: "DELETED",
      },
    });
  },
};