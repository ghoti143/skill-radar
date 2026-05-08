import { ingestJob } from '../src/lib/embeddings'

const jobs = [
  {
    title: 'Senior Full Stack Engineer',
    company: 'FinCo',
    description:
      'Build scalable financial APIs and React dashboards. We use TypeScript, Next.js, PostgreSQL, and deploy on AWS with Docker and Kubernetes.',
    skills: ['typescript', 'react', 'nextjs', 'postgresql', 'docker', 'kubernetes', 'aws'],
  },
  {
    title: 'ML Platform Engineer',
    company: 'AI Startup',
    description:
      'Build and maintain our ML infrastructure. Experience with Python, PyTorch, vector databases, and embedding pipelines required.',
    skills: ['python', 'pytorch', 'vector-databases', 'embeddings', 'kubernetes', 'mlops'],
  },
  {
    title: 'Frontend Engineer',
    company: 'SaaS Co',
    description:
      'Build beautiful, performant UIs with React and TypeScript. Experience with Tailwind, testing, and accessibility required.',
    skills: ['react', 'typescript', 'tailwind', 'testing', 'accessibility'],
  },
  {
    title: 'DevOps Engineer',
    company: 'Enterprise Corp',
    description:
      'Manage cloud infrastructure on AWS and GCP. Heavy Kubernetes, Terraform, CI/CD pipelines, and monitoring with Datadog.',
    skills: ['kubernetes', 'docker', 'terraform', 'aws', 'gcp', 'cicd', 'datadog'],
  },
  {
    title: 'Backend Engineer',
    company: 'Marketplace App',
    description:
      'Design and build REST and GraphQL APIs in Node.js and TypeScript. PostgreSQL, Redis, and microservices architecture.',
    skills: ['nodejs', 'typescript', 'graphql', 'postgresql', 'redis', 'microservices'],
  },
]

async function seed() {
  console.log('Seeding jobs...')
  for (const job of jobs) {
    console.log(`  Embedding: ${job.title} at ${job.company}`)
    await ingestJob(job)
  }
  console.log('Done!')
  process.exit(0)
}

seed().catch(console.error)