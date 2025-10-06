import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { db } from "../db/index.js"
import { usersTable } from "../db/schema.js";
import { eq } from "drizzle-orm";

// Check for required environment variables
if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET environment variable is not set!");
    throw new Error("JWT_SECRET must be set in environment variables");
}

// Validate JWT_SECRET length
if (process.env.JWT_SECRET.length < 2) {
    console.error("JWT_SECRET is too short! It should be at least 32 characters long.");
    throw new Error("JWT_SECRET is too weak");
}

export const register = async (req, res) =>{
    try {
        const { name, email, password, age } = req.body;
        
        if (!name || !email || !password || !age) {
            return res.status(400).json({ message: "Name, email, password, and age are required" });
        }

        const existingUser = await db.select().from(usersTable).where(eq(usersTable.email, email));
        if (existingUser.length ) {
            return res.status(400).json({ message: "User already exists" });
        }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    const [user] = await db
      .insert(usersTable)
      .values({ name, email, password: hashedPassword, salt, age })
      .returning({ id: usersTable.id, email: usersTable.email });

const token = jwt.sign(
    {id: user.id, email: user.email},
    process.env.JWT_SECRET,
    { expiresIn: process.env.TOKEN_EXPIRY || "1h" }
);
    res.status(201).json({message: "User created successfully", token});
}
catch(error){
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
}
};

// Login function
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email));
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.TOKEN_EXPIRY || "1d" }
        );

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal server error", error: process.env.NODE_ENV === 'development' ? error.message : undefined });
    }
};
