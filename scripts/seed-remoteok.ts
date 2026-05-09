import { ingestJob } from '../src/lib/embeddings'

const REMOTEOK_API = 'https://remoteok.com/api'
const MAX_JOBS = 100
const BATCH_SIZE = 3
const BATCH_DELAY_MS = 65_000

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

interface RemoteOKJob {
  id: string
  position: string
  company: string
  description: string
  tags: string[]
  date: string
}

async function fetchJobs(): Promise<RemoteOKJob[]> {
  const res = await fetch(REMOTEOK_API, {
    headers: { 'User-Agent': 'skill-radar-seeder/1.0' },
  })

  if (!res.ok) throw new Error(`RemoteOK API error: ${res.status}`)

  const data = await res.json()
  // First element is a legal notice object, skip it
  const jobs: RemoteOKJob[] = data.slice(1).filter(
    (item: unknown) =>
      item && typeof item === 'object' && 'position' in (item as object)
  )

  const SWE_KEYWORDS = ['software engineer', 'software developer', 'backend engineer', 'frontend engineer', 'fullstack engineer', 'full-stack engineer', 'full stack engineer']
  const swJobs = jobs.filter((job) => {
    const pos = (job.position || '').toLowerCase()
    return SWE_KEYWORDS.some((kw) => pos.includes(kw))
  })

  return swJobs.slice(0, MAX_JOBS)
}

async function seed() {
  console.log('Fetching jobs from RemoteOK...')
  const jobs = await fetchJobs()
  console.log(`Fetched ${jobs.length} jobs. Seeding in batches of ${BATCH_SIZE} (rate limit: 3/min)...`)

  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i]
    const batchIndex = Math.floor(i / BATCH_SIZE)
    const positionInBatch = i % BATCH_SIZE

    if (positionInBatch === 0 && batchIndex > 0) {
      console.log(`  Waiting ${BATCH_DELAY_MS / 1000}s before next batch...`)
      await sleep(BATCH_DELAY_MS)
    }

    const title = job.position || 'Unknown Role'
    const company = job.company || 'Unknown Company'
    const description = stripHtml(job.description || '')
    const skills = (job.tags || []).map((t: string) => t.toLowerCase().replace(/\s+/g, '-'))

    console.log(`  [${i + 1}/${jobs.length}] Embedding: ${title} at ${company}`)
    await ingestJob({ title, company, description, skills })
  }

  console.log('Done!')
  process.exit(0)
}

seed().catch(console.error)
