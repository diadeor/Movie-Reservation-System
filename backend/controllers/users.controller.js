import prisma from "../config/db.js";

export const getUsers = async (req, res, next) => {
  try {
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
    const user = await prisma.users.findUnique({ where: { id: Number(id) } });

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};
