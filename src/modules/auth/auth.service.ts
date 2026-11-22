import e from "express";
import { pool } from "../../config/database";
import bcrypt from "bcrypt";

interface RegisterStudent {
  name: string;
  email: string;
  password: string;
  roll: string;
  department: string;
  semester: number;
  admission_year: number;
}

export const register_student = async (data: RegisterStudent) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 1. Hash password
    const hashed_password = await bcrypt.hash(data.password, 12);

    // 2. create user
    const user_result = await client.query(
      `INSERT INTO users(name,email,password)
            VALUES($1,$2,$3)
            RETURNING id, name, email, role
            `,
      [data.name, data.email, hashed_password],
    );

    const user = user_result.rows[0];

    // 3. Create students profile
    await client.query(
      `INSERT INTO students
       (user_id, roll, department, semester, admission_year)
       VALUES ($1, $2, $3, $4, $5)`,
      [user.id, data.roll, data.department, data.semester, data.admission_year],
    );

    // 4. Save transaction
    await client.query("COMMIT");
    return user;
  } catch (error) {
    // Undo database change if anything fails
    await client.query("ROLLBACK");

    throw error;
  }



};


export const login_user = async (
    email:string,
    password:string
) => {
    //1. Find user by email 
    const result = await pool.query(
        `SELECT id ,name,email,password,role
        FROM  users
        WHERE email = $1`,
        [email]
    );

    //2. Check if user exists 
    if(result.rows.length === 0){
        return null;
    }

    const user = result.rows[0];

    // 3. Compare password 
    const is_password_matched = await bcrypt.compare(
        password,
        user.password
    );

    if(!is_password_matched){
        return null;
    }

    // 4. Remove password before returning user 
    const {password:hashed_password,...safeUser} = user;

    return safeUser;
}