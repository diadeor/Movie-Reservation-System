import prisma from "../config/db.js";
import throwError from "../config/err.js";

export const getUsers = async (req, res, next) => {
  try {
    const { id, role } = req.user;

    if (role !== "admin") throwError("Unauthorized, must be an admin to access this route", 401);
    const users = await prisma.user.findMany({
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

    const user = await prisma.user.findUnique({
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
    const user = await prisma.user.findUnique({
      where: { id: id },
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

export const editUser = async (req, res, next) => {
  try {
    const { id, role } = req.user;
    const { name, email } = req.body;
    if (!name && !email) throwError("Either name or email address is required", 400);

    const user = await prisma.user.findUnique({ where: { id: +id } });
    const { name: userName, email: userMail } = user;
    const updates = { name: false, email: false };

    if (name && email) {
      updates["name"] = name === userName ? false : true;
      updates["email"] = email === userMail ? false : true;
    } else if (name) {
      updates["name"] = name === userName ? false : true;
    } else {
      updates["email"] = email === userMail ? false : true;
    }
    const bothChanges = updates["name"] && updates["email"];

    if (!updates["name"] && !updates["email"]) throwError("No changes made", 400);
    const updatedUser = await prisma.user.update({
      where: { id: +id },
      data: bothChanges ? { email, name } : updates["name"] ? { name } : { email },
      select: { id: true, name: true, email: true, role: true },
    });

    res.json({
      success: true,
      user: updatedUser,
      message: bothChanges
        ? "User data updated."
        : updates["name"]
          ? "Name change successful."
          : "Email change successful",
    });
  } catch (error) {
    next(error);
  }
};
