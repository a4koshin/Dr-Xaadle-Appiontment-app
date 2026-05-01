import prisma from "../config/prisma";

type BlockedSlotInput = {
  doctorId: string;
  date: string;
  startTime: string;
  endTime: string;
  reason?: string;
};

export const blockedSlotService = {
  createBlockedSlot: async (data: BlockedSlotInput) => {
    return prisma.blockedSlot.create({
      data: {
        ...data,
        date: new Date(data.date),
      },
    });
  },

  getBlockedSlots: async () => {
    return prisma.blockedSlot.findMany({
      where: {
        status: "ACTIVE",
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  getBlockedSlotById: async (id: string) => {
    const blockedSlot = await prisma.blockedSlot.findUnique({
      where: { id },
    });

    if (!blockedSlot || blockedSlot.status === "DELETED") {
      throw new Error("Blocked slot not found.");
    }

    return blockedSlot;
  },

  updateBlockedSlot: async (id: string, data: Partial<BlockedSlotInput>) => {
    const blockedSlot = await prisma.blockedSlot.findUnique({
      where: { id },
    });

    if (!blockedSlot || blockedSlot.status === "DELETED") {
      throw new Error("Blocked slot not found.");
    }

    return prisma.blockedSlot.update({
      where: { id },
      data: {
        ...data,
        ...(data.date && { date: new Date(data.date) }),
      },
    });
  },

  softDeleteBlockedSlot: async (id: string) => {
    const blockedSlot = await prisma.blockedSlot.findUnique({
      where: { id },
    });

    if (!blockedSlot || blockedSlot.status === "DELETED") {
      throw new Error("Blocked slot not found.");
    }

    return prisma.blockedSlot.update({
      where: { id },
      data: {
        status: "DELETED",
      },
    });
  },
};