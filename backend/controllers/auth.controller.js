import prisma from "../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_EXPIRE, JWT_SECRET } from "../config/env.js";

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email) throw new Error("Email is required...");
    if (!password) throw new Error("Password is required...");

    const userExists = await prisma.users.findUnique({ where: { email } });
    if (!userExists) throw new Error("User does not exist");

    const passValid = await bcrypt.compare(password, userExists.password);
    const { id, role, name } = userExists;

    if (passValid) {
      const token = jwt.sign({ id, role }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
      res.cookie("token", token, {
        secure: false,
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24,
      });

      res.json({
        success: true,
        message: "User logged in successfully",
        user: { id, name, role, email, token },
      });
    }
  } catch (error) {
    next(error);
  }
};

export const signUp = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    console.log(req.body);
    const roles = ["user", "admin"];
    if (!name || !email || !password)
      throw new Error("Required fields are not provided. [name, email, password] is required");
    if (role) {
      const roleValid = roles.includes(String(role).toLowerCase());
      if (!roleValid) throw new Error("Invalid role :", role);
    }

    const userExists = await prisma.users.findUnique({ where: { email } });
    if (userExists) throw new Error("User with that email already exists");

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = {
      email,
      password: passwordHash,
      name,
      role: "user",
    };
    const newUser = await prisma.users.create({ data: user });

    const id = newUser.id;
    const token = jwt.sign({ id, role: newUser.role }, JWT_SECRET, {
      expiresIn: JWT_EXPIRE,
    });
    res.cookie("token", token, {
      secure: false,
      httpOnly: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24,
    });

    res.json({
      success: true,
      message: "New user created",
      user: {
        token,
        id,
        name,
        email,
        role: newUser.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) throw new Error("Not logged in !!");

    res.cookie("token", token, { httpOnly: true, secure: false, sameSite: true, maxAge: 1 });
    res.json({
      success: true,
      message: "User logged out",
    });
  } catch (error) {
    next(error);
  }
};
