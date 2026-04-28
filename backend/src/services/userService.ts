import prisma from "../config/prisma";
import { hashPassword, comparePassword } from "../lib/password";
import { generateToken } from "../lib/jwt";
import { sendResetCodeEmail } from "../lib/email";

type RegisterInput = {
  fullName: string;
  phone: string;
  email?: string;
  password: string;
};

type LoginInput = {
  phone: string;
  password: string;
};

export const userService = {
  register: async (data: RegisterInput) => {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { phone: data.phone },
          ...(data.email ? [{ email: data.email }] : []),
        ],
      },
    });

    if (existingUser) {
      throw new Error("User already exists.");
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await prisma.user.create({
      data: {
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        password: hashedPassword,
        role: "PATIENT",
      },
      select: {
        id: true,
        fullName: true,
        phone: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });

    const token = generateToken({
      id: user.id,
      role: user.role,
    });

    return { user, token };
  },

  login: async (data: LoginInput) => {
    const user = await prisma.user.findUnique({
      where: {
        phone: data.phone,
      },
    });

    if (!user) {
      throw new Error("Invalid phone or password.");
    }

    const isMatch = await comparePassword(data.password, user.password);

    if (!isMatch) {
      throw new Error("Invalid phone or password.");
    }

    if (user.status !== "ACTIVE") {
      throw new Error("Your account is disabled.");
    }

    const token = generateToken({
      id: user.id,
      role: user.role,
    });

    const { password, ...safeUser } = user;

    return {
      user: safeUser,
      token,
    };
  },
  logout: async () => {
    return null;
  },
  getProfile: async (userId: string) => {
    return prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        fullName: true,
        phone: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },

  getAllUsers: async () => {
    return prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        fullName: true,
        phone: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });
  },

  forgotPassword: async (email: string) => {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("User with this email does not exist.");
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.passwordResetCode.create({
      data: {
        email,
        code,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
    });

    await sendResetCodeEmail(email, code);

    return {
      message: "Reset code sent to your email.",
    };
  },

  resetPassword: async (data: {
    email: string;
    code: string;
    newPassword: string;
  }) => {
    const resetCode = await prisma.passwordResetCode.findFirst({
      where: {
        email: data.email,
        code: data.code,
        used: false,
        expiresAt: {
          gt: new Date(),
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!resetCode) {
      throw new Error("Invalid or expired reset code.");
    }

    const hashedPassword = await hashPassword(data.newPassword);

    await prisma.user.update({
      where: {
        email: data.email,
      },
      data: {
        password: hashedPassword,
      },
    });

    await prisma.passwordResetCode.update({
      where: {
        id: resetCode.id,
      },
      data: {
        used: true,
      },
    });

    return {
      message: "Password reset successfully.",
    };
  },
};
