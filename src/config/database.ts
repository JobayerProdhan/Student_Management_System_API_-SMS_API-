import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

if(!process.env.DATABASE_URL){
  throw new Error('DATABASE_URL is missing from .env');
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,

  // ssl:
  //   process.env.DATABASE_SSL === "true"
  //     ? { rejectUnauthorized: false }
  //     : undefined,
});

pool.on('connect',() => {
    console.log('Database connected successfully');
});

pool.on("error",(error) =>{
  console.log('Unexpected database error: ',error);
})