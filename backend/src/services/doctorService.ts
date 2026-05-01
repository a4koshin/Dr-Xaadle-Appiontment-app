import prisma from "../config/prisma";

type DoctorInput = {
  fullName: string;
  specialization: string;
  bio: string;
  experience: number;
  consultationFee: number;
  phone: string;
  image?: string;
};

export const doctorService = {
  createDoctor: async (data: DoctorInput) => {
    const existingDoctor = await prisma.doctorProfile.findFirst();

    if (existingDoctor) {
      throw new Error("Doctor profile already exists.");
    }

    return prisma.doctorProfile.create({
      data,
    });
  },

  getDoctor: async () => {
    return prisma.doctorProfile.findFirst();
  },

  updateDoctor: async (id: string, data: Partial<DoctorInput>) => {
    return prisma.doctorProfile.update({
      where: { id },
      data,
    });
  },
};