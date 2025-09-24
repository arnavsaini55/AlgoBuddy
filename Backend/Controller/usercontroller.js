
import { db } from "../db/index.js"
import { usersTable } from "../db/schema.js"

export const createUser = async(req, res) => {  //promises 
    try{
        const { email , age, name, salt} = req.body;
        const result = await db.insert(usersTable).values({
            name,
            age,
            email,
            salt
        }).returning()
        res.status(201).json(result);
    }
    catch(err){
    //
    res.status(500).json({ error: err.message });
    }
}

export const getUsers = async (req, res) => {
  try {
    // Fetch users. If you need related submissions/streaks, add explicit joins or separate queries.
    const users = await db.select().from(usersTable);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getuserbyId = async(req,res) =>{
    try{
        const { id } = req.params;
        const users = await db.select().from(usersTable).where(usersTable.id, id);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
    }

