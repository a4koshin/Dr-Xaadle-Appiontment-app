import prisma from "../config/prisma";

type AvailabilityInput = {
  doctorId: string;
  dayOfWeek:
    | "SATURDAY"
    | "SUNDAY"
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY";
  startTime: string;
  endTime: string;
  slotDuration: number;
};

export const availabilityService = {
  createAvailability: async (data: AvailabilityInput) => {
    const existing = await prisma.doctorAvailability.findFirst({
      where: {
        doctorId: data.doctorId,
        dayOfWeek: data.dayOfWeek,
        status: "ACTIVE",
      },
    });

    if (existing) {
      throw new Error("Availability for this day already exists.");
    }

    return prisma.doctorAvailability.create({
      data,
    });
  },

  getAvailabilities: async () => {
    return prisma.doctorAvailability.findMany({
      where: {
        status: "ACTIVE",
        isActive: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  },

  getAvailabilityById: async (id: string) => {
    const availability = await prisma.doctorAvailability.findUnique({
      where: { id },
    });

    if (!availability || availability.status === "DELETED") {
      throw new Error("Availability not found.");
    }

    return availability;
  },

  updateAvailability: async (id: string, data: Partial<AvailabilityInput>) => {
    const availability = await prisma.doctorAvailability.findUnique({
      where: { id },
    });

    if (!availability || availability.status === "DELETED") {
      throw new Error("Availability not found.");
    }

    return prisma.doctorAvailability.update({
      where: { id },
      data,
    });
  },

  softDeleteAvailability: async (id: string) => {
    const availability = await prisma.doctorAvailability.findUnique({
      where: { id },
    });

    if (!availability || availability.status === "DELETED") {
      throw new Error("Availability not found.");
    }

    return prisma.doctorAvailability.update({
      where: { id },
      data: {
        status: "DELETED",
        isActive: false,
      },
    });
  },
};
