import { db } from "../db/index.js";
import { usersTable } from "../db/schema.js";
import crypto from "crypto";
import { eq } from "drizzle-orm";

// Utility: hash password with salt
function hashPassword(password, salt) {
  return crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
}

// CREATE USER
export const createUser = async (req, res) => {
  try {
    const { email, age, name, password } = req.body;

    if (!email || !name || !password || !age) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const salt = crypto.randomBytes(16).toString("hex");
    const hashedPassword = hashPassword(password, salt);

    const result = await db
      .insert(usersTable)
      .values({
        name,
        age,
        email,
        salt,
        password: hashedPassword,
      })
      .returning();

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: result[0].id,
        name: result[0].name,
        age: result[0].age,
        email: result[0].email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL USERS
export const getUsers = async (req, res) => {
  try {
    const users = await db.select().from(usersTable);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET USER BY ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id));

    if (user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
