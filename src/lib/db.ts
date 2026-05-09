import { Pool } from 'pg'

declare global {
  var __pgPool: Pool | undefined
}

export const pool =
  global.__pgPool ??
  (global.__pgPool = new Pool({
    connectionString: process.env.DATABASE_URL,
  }))

export interface Job {
  id: number
  title: string
  company: string
  description: string
  skills: string[]
  created_at: Date
}

export async function getJobCount(): Promise<number> {
  const { rows } = await pool.query('SELECT COUNT(*) FROM jobs')
  return parseInt(rows[0].count)
}

export async function getAllJobs(): Promise<Job[]> {
  const { rows } = await pool.query(
    'SELECT id, title, company, description, skills, created_at FROM jobs ORDER BY created_at DESC'
  )
  return rows
}