import { embed } from 'ai'
import { voyage } from '@ai-sdk/voyage'
import { pool } from './db'

export async function embedText(text: string): Promise<number[]> {
  const { embedding } = await embed({
    model: voyage.textEmbeddingModel('voyage-3-lite'),
    value: text,
  })
  return embedding
}

export async function ingestJob(job: {
  title: string
  company: string
  description: string
  skills: string[]
}) {
  const embedding = await embedText(
    `${job.title} at ${job.company}: ${job.description}`
  )

  await pool.query(
    `INSERT INTO jobs (title, company, description, skills, embedding)
     VALUES ($1, $2, $3, $4, $5::vector)`,
    [
      job.title,
      job.company,
      job.description,
      job.skills,
      `[${embedding.join(',')}]`,
    ]
  )
}

export async function semanticSearch(query: string, limit = 5) {
  const queryEmbedding = await embedText(query)

  const { rows } = await pool.query(
    `SELECT id, title, company, description, skills,
            1 - (embedding <=> $1::vector) AS similarity
     FROM jobs
     ORDER BY embedding <=> $1::vector
     LIMIT $2`,
    [`[${queryEmbedding.join(',')}]`, limit]
  )

  return rows
}