import prisma from "../config/db.js";
import throwError from "../config/err.js";

export const getUsers = async (req, res, next) => {
  try {
    const { id, role } = req.user;

    if (role !== "admin") throwError("Unauthorized, must be an admin to access this route", 401);
    const users = await prisma.users.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return res.json({
      success: true,
      users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.user;

    if (role !== "admin") throwError("Unauthorized, must be an admin to access this route", 401);

    const user = await prisma.users.findUnique({
      where: { id: +id },
      select: { id: true, name: true, email: true, role: true },
    });
    if (!user) throwError("User not found", 401);

    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await prisma.users.findUnique({
      where: { id: +id },
      select: { id: true, name: true, email: true, role: true },
    });

    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};
