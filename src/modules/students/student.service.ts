import { pool } from "../../config/database";

export const get_all_students = async () => {
  const result = await pool.query(
    `SELECT
      s.id,
      u.name,
      u.email,
      s.roll,
      s.department,
      s.semester,
      s.admission_year,
      s.created_at
    FROM students AS s
    JOIN users AS u
      ON s.user_id = u.id
    WHERE u.role = 'student'
    ORDER BY s.id ASC`,
  );
  
  return result.rows
};


export const get_student_by_id = async(id:number) => {
    const result = await  pool.query(
        `
    SELECT
      s.id,
      u.name,
      u.email,
      s.roll,
      s.department,
      s.semester,
      s.admission_year,
      s.created_at
    FROM students AS s
    JOIN users AS u
      ON s.user_id = u.id
    WHERE s.id = $1
    `,
    [id]
    )

    return result.rows[0] || null ;
}
