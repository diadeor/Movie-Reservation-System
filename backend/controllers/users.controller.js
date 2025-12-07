import prisma from "../config/db.js";

export const getUsers = async (req, res, next) => {
  try {
    const { id, role } = req.user;

    if (String(role).toLowerCase() !== "admin") {
      const error = new Error("Unauthorized, must be an admin to access this route");
      error.statusCode = 401;
      throw error;
    }
    const users = await prisma.users.findMany({});

    res.json({
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

    if (String(role).toLowerCase() !== "admin") {
      const error = new Error("Unauthorized, must be an admin to access this route");
      error.statusCode = 401;
      throw error;
    }

    const user = await prisma.users.findUnique({ where: { id: +id } });
    if (!user) {
      const error = new Error("User not found !!");
      error.statusCode = 404;
      throw error;
    }

    res.json({
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

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};
