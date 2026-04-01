import prisma from "../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_EXPIRE, JWT_SECRET } from "../config/env.js";
import throwError from "../config/err.js";

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throwError("Email & Password is required...", 400);

    const userExists = await prisma.user.findUnique({ where: { email } });
    if (!userExists) throwError("Invalid email or password", 400);

    const passValid = await bcrypt.compare(password, userExists.password);
    const { id, role, name } = userExists;
    console.log(userExists);

    if (passValid) {
      const token = jwt.sign({ id, role }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
      res.cookie("token", token, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24,
      });

      return res.json({
        success: true,
        message: "User logged in successfully",
        user: { id, name, role, email, token },
      });
    } else throwError("Password does not match", 401);
  } catch (error) {
    next(error);
  }
};

export const signUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    if (!name || !email || !password)
      throwError("Required fields are not provided. [name, email, password] is required", 400);

    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) throwError("Email already exists", 400);

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = {
      email,
      password: passwordHash,
      name,
    };

    const newUser = await prisma.user.create({ data: user });

    const { id, role } = newUser;
    const token = jwt.sign({ id, role }, JWT_SECRET, { expiresIn: JWT_EXPIRE });

    res.cookie("token", token, {
      secure: true,
      httpOnly: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24,
    });

    return res.json({
      success: true,
      message: "New user created",
      user: {
        token,
        id,
        name,
        email,
        role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) throwError("Not logged in !!", 401);

    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "none", maxAge: 1 });
    return res.json({
      success: true,
      message: "User logged out",
    });
  } catch (error) {
    next(error);
  }
};

export const changePass = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { current, newPassword } = req.body;
    if (!current || !newPassword) throwError("Current & New Password Required.");
    const user = await prisma.user.findUnique({ where: { id: +id } });

    const { password } = user;
    const isValid = await bcrypt.compare(current, password);
    if (!isValid) throwError("Invalid Password !!");

    console.log(req.body);
    const salt = await bcrypt.genSalt(12);
    const passHash = await bcrypt.hash(newPassword, salt);

    const updatedUser = await prisma.user.update({
      where: { id: +id },
      data: { password: passHash },
      select: { id: true, role: true, email: true, name: true },
    });

    return res.json({
      success: true,
      user: updatedUser,
      message: "Password Changed Successfully.",
    });
  } catch (error) {
    next(error);
  }
};
