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
  // --- 50 additional jobs ---
  {
    title: 'iOS Engineer',
    company: 'Mobile Co',
    description:
      'Build native iOS apps in Swift and SwiftUI. Work with CoreData, REST APIs, and push notifications. Ship to millions of users on the App Store.',
    skills: ['swift', 'swiftui', 'ios', 'xcode', 'coredata', 'rest-apis'],
  },
  {
    title: 'Android Engineer',
    company: 'App Studio',
    description:
      'Develop high-quality Android apps using Kotlin and Jetpack Compose. Experience with MVVM architecture, Coroutines, and Firebase required.',
    skills: ['kotlin', 'android', 'jetpack-compose', 'coroutines', 'firebase', 'mvvm'],
  },
  {
    title: 'Data Engineer',
    company: 'DataCo',
    description:
      'Build and maintain large-scale data pipelines using Apache Spark, Airflow, and dbt. Snowflake and Python expertise expected.',
    skills: ['python', 'apache-spark', 'airflow', 'dbt', 'snowflake', 'sql'],
  },
  {
    title: 'Data Scientist',
    company: 'Analytics Inc',
    description:
      'Apply statistical modeling and machine learning to drive product decisions. Python, scikit-learn, SQL, and strong A/B testing knowledge required.',
    skills: ['python', 'scikit-learn', 'sql', 'statistics', 'ab-testing', 'pandas'],
  },
  {
    title: 'Security Engineer',
    company: 'CyberSec',
    description:
      'Secure cloud infrastructure and applications. Experience with penetration testing, SIEM tools, IAM policies, and security frameworks like SOC2.',
    skills: ['penetration-testing', 'aws-iam', 'siem', 'soc2', 'python', 'linux'],
  },
  {
    title: 'Platform Engineer',
    company: 'CloudCo',
    description:
      'Build internal developer platforms on top of Kubernetes. Helm, ArgoCD, Crossplane, and Go experience strongly preferred.',
    skills: ['kubernetes', 'helm', 'argocd', 'crossplane', 'go', 'terraform'],
  },
  {
    title: 'Site Reliability Engineer',
    company: 'Scale Inc',
    description:
      'Own reliability across our distributed systems. On-call rotations, SLO definition, and tooling with Prometheus, Grafana, and PagerDuty.',
    skills: ['sre', 'prometheus', 'grafana', 'pagerduty', 'linux', 'go', 'kubernetes'],
  },
  {
    title: 'Technical Lead',
    company: 'Growth Startup',
    description:
      'Lead a cross-functional team building our core product. Strong TypeScript, system design, mentorship, and project delivery skills required.',
    skills: ['typescript', 'system-design', 'leadership', 'nodejs', 'postgresql', 'react'],
  },
  {
    title: 'React Native Engineer',
    company: 'Cross Platform Co',
    description:
      'Build and maintain our cross-platform mobile app in React Native. Experience with Expo, native modules, and app store deployments required.',
    skills: ['react-native', 'typescript', 'expo', 'ios', 'android', 'rest-apis'],
  },
  {
    title: 'Blockchain Engineer',
    company: 'Web3 Inc',
    description:
      'Write and audit smart contracts in Solidity. Build dApps with ethers.js, integrate with IPFS, and deploy on Ethereum and L2 networks.',
    skills: ['solidity', 'ethereum', 'ethers.js', 'ipfs', 'hardhat', 'typescript'],
  },
  {
    title: 'Java Backend Engineer',
    company: 'Finance Corp',
    description:
      'Build high-throughput financial services in Java and Spring Boot. Experience with Kafka, Oracle DB, and JVM performance tuning required.',
    skills: ['java', 'spring-boot', 'kafka', 'oracle', 'microservices', 'jvm'],
  },
  {
    title: 'Ruby on Rails Engineer',
    company: 'Legacy Startup',
    description:
      'Maintain and modernize our Rails monolith while incrementally extracting services. Strong Ruby, PostgreSQL, and RSpec skills needed.',
    skills: ['ruby', 'rails', 'postgresql', 'rspec', 'sidekiq', 'redis'],
  },
  {
    title: 'Go Engineer',
    company: 'Infra Co',
    description:
      'Build high-performance infrastructure tooling and APIs in Go. gRPC, Protocol Buffers, and distributed systems experience required.',
    skills: ['go', 'grpc', 'protobuf', 'distributed-systems', 'kubernetes', 'linux'],
  },
  {
    title: 'Rust Engineer',
    company: 'Systems Co',
    description:
      'Build low-latency systems software in Rust. Experience with async Rust, memory management, and performance profiling strongly preferred.',
    skills: ['rust', 'async', 'systems-programming', 'linux', 'performance', 'webassembly'],
  },
  {
    title: 'Embedded Systems Engineer',
    company: 'IoT Co',
    description:
      'Write firmware in C and C++ for embedded Linux and RTOS platforms. Experience with UART, SPI, I2C, and hardware debugging required.',
    skills: ['c', 'c++', 'embedded-linux', 'rtos', 'firmware', 'iot'],
  },
  {
    title: 'Game Developer',
    company: 'Game Studio',
    description:
      'Build gameplay systems and tools in Unity using C#. Experience with physics engines, shader programming, and multiplayer networking a plus.',
    skills: ['unity', 'c#', 'game-development', 'shaders', 'multiplayer', 'physics'],
  },
  {
    title: 'Machine Learning Engineer',
    company: 'Research Lab',
    description:
      'Train and productionize large language models. Strong Python, PyTorch, CUDA, and distributed training experience required.',
    skills: ['python', 'pytorch', 'cuda', 'distributed-training', 'llm', 'mlops'],
  },
  {
    title: 'NLP Engineer',
    company: 'Language AI',
    description:
      'Build natural language processing pipelines using transformers and LLMs. Fine-tuning, RAG architectures, and Hugging Face expertise needed.',
    skills: ['python', 'nlp', 'transformers', 'huggingface', 'rag', 'pytorch'],
  },
  {
    title: 'Computer Vision Engineer',
    company: 'Vision Co',
    description:
      'Develop real-time object detection and segmentation models. OpenCV, TensorFlow, ONNX, and edge deployment experience required.',
    skills: ['python', 'opencv', 'tensorflow', 'onnx', 'computer-vision', 'cuda'],
  },
  {
    title: 'Cloud Architect',
    company: 'Enterprise Tech',
    description:
      'Design multi-region cloud architectures on AWS. Well-Architected Framework, cost optimization, IAM, and IaC with Terraform required.',
    skills: ['aws', 'terraform', 'cloud-architecture', 'iam', 'networking', 'cost-optimization'],
  },
  {
    title: 'Database Administrator',
    company: 'Data Corp',
    description:
      'Manage PostgreSQL and MySQL clusters at scale. Query optimization, replication, backup strategies, and high-availability setups required.',
    skills: ['postgresql', 'mysql', 'database-administration', 'sql', 'replication', 'performance-tuning'],
  },
  {
    title: 'QA Engineer',
    company: 'Quality Co',
    description:
      'Own end-to-end test automation using Playwright and Cypress. CI integration, flakiness reduction, and observability tooling experience valued.',
    skills: ['playwright', 'cypress', 'testing', 'typescript', 'cicd', 'accessibility'],
  },
  {
    title: 'Solutions Architect',
    company: 'Consulting Firm',
    description:
      'Design and present cloud solutions to enterprise clients. Deep AWS or Azure knowledge, strong communication, and pre-sales experience required.',
    skills: ['aws', 'azure', 'solutions-architecture', 'cloud', 'terraform', 'enterprise'],
  },
  {
    title: 'Staff Engineer',
    company: 'Platform Team',
    description:
      'Drive technical direction across multiple teams. Architecture reviews, RFC authoring, mentorship, and hands-on TypeScript and Go coding.',
    skills: ['typescript', 'go', 'system-design', 'mentorship', 'architecture', 'leadership'],
  },
  {
    title: 'Principal Engineer',
    company: 'Big Tech',
    description:
      'Own org-wide technical strategy. Produce foundational libraries, lead design reviews, and partner with product and exec leadership.',
    skills: ['system-design', 'distributed-systems', 'leadership', 'java', 'architecture', 'mentorship'],
  },
  {
    title: 'Engineering Manager',
    company: 'Scale Up',
    description:
      'Lead a team of 6–8 engineers shipping a B2B SaaS platform. Hiring, performance management, roadmap planning, and technical oversight.',
    skills: ['engineering-management', 'leadership', 'agile', 'typescript', 'system-design', 'hiring'],
  },
  {
    title: 'Vue.js Frontend Engineer',
    company: 'Digital Agency',
    description:
      'Build rich client-side applications with Vue 3 and Nuxt. TypeScript, Pinia, and Vite experience required. Figma-to-code workflow a plus.',
    skills: ['vue', 'nuxt', 'typescript', 'pinia', 'vite', 'tailwind'],
  },
  {
    title: 'Angular Developer',
    company: 'Corp Solutions',
    description:
      'Develop enterprise Angular applications integrated with .NET backends. RxJS, NgRx, and Material Design experience required.',
    skills: ['angular', 'typescript', 'rxjs', 'ngrx', 'material-design', 'rest-apis'],
  },
  {
    title: 'Salesforce Developer',
    company: 'CRM Co',
    description:
      'Customize Salesforce using Apex, Lightning Web Components, and Flow. Integration experience with REST APIs and MuleSoft preferred.',
    skills: ['salesforce', 'apex', 'lwc', 'salesforce-flow', 'mulesoft', 'soql'],
  },
  {
    title: 'Python Django Developer',
    company: 'Web Agency',
    description:
      'Build content-heavy web applications with Django and Django REST Framework. PostgreSQL, Celery, and Redis experience preferred.',
    skills: ['python', 'django', 'drf', 'postgresql', 'celery', 'redis'],
  },
  {
    title: 'PHP Laravel Developer',
    company: 'E-commerce Co',
    description:
      'Maintain and extend our Laravel e-commerce platform. MySQL, Eloquent ORM, queue workers, and Blade templating experience required.',
    skills: ['php', 'laravel', 'mysql', 'eloquent', 'redis', 'rest-apis'],
  },
  {
    title: '.NET Developer',
    company: 'Enterprise Software',
    description:
      'Build internal enterprise tooling with C# and ASP.NET Core. Entity Framework, SQL Server, and Azure DevOps pipeline experience required.',
    skills: ['c#', 'dotnet', 'aspnet-core', 'entity-framework', 'sql-server', 'azure'],
  },
  {
    title: 'Scala Engineer',
    company: 'Streaming Co',
    description:
      'Build real-time data streaming pipelines with Scala, Apache Kafka, and Flink. Functional programming and distributed systems expertise needed.',
    skills: ['scala', 'kafka', 'flink', 'spark', 'functional-programming', 'distributed-systems'],
  },
  {
    title: 'Elixir Engineer',
    company: 'Real-time Co',
    description:
      'Build fault-tolerant real-time systems with Elixir and Phoenix LiveView. OTP, WebSockets, and PostgreSQL experience required.',
    skills: ['elixir', 'phoenix', 'otp', 'liveview', 'postgresql', 'websockets'],
  },
  {
    title: 'macOS Developer',
    company: 'Mac App Co',
    description:
      'Build native macOS applications in Swift using AppKit and SwiftUI. Experience with Apple APIs, notarization, and Mac App Store distribution.',
    skills: ['swift', 'macos', 'appkit', 'swiftui', 'xcode', 'apple-apis'],
  },
  {
    title: 'Flutter Developer',
    company: 'Cross Platform',
    description:
      'Build cross-platform mobile apps with Flutter and Dart. Firebase integration, state management with Riverpod, and native plugins required.',
    skills: ['flutter', 'dart', 'firebase', 'riverpod', 'ios', 'android'],
  },
  {
    title: 'WebGL Developer',
    company: '3D Graphics Co',
    description:
      'Build interactive 3D web experiences with Three.js and WebGL. GLSL shader writing, performance optimization, and GLTF asset pipelines.',
    skills: ['webgl', 'threejs', 'glsl', 'javascript', 'typescript', '3d-graphics'],
  },
  {
    title: 'AR/VR Engineer',
    company: 'Immersive Tech',
    description:
      'Develop immersive experiences for Meta Quest and Apple Vision Pro. Unity or Unreal Engine, spatial audio, and hand-tracking APIs required.',
    skills: ['unity', 'unreal-engine', 'ar', 'vr', 'c#', 'spatial-computing'],
  },
  {
    title: 'Distributed Systems Engineer',
    company: 'Infra Giant',
    description:
      'Design consensus protocols and fault-tolerant storage systems in Go. Strong background in Raft, CRDTs, and network partitions required.',
    skills: ['go', 'distributed-systems', 'raft', 'consensus', 'linux', 'performance'],
  },
  {
    title: 'Search Engineer',
    company: 'Search Co',
    description:
      'Build and tune search experiences using Elasticsearch and vector search. Relevance modeling, query analysis, and ranking expertise needed.',
    skills: ['elasticsearch', 'vector-search', 'python', 'relevance', 'lucene', 'nlp'],
  },
  {
    title: 'Payments Engineer',
    company: 'Fintech',
    description:
      'Integrate and extend payment rails including Stripe, ACH, and card networks. Strong TypeScript, idempotency patterns, and compliance awareness.',
    skills: ['typescript', 'nodejs', 'stripe', 'payments', 'postgresql', 'compliance'],
  },
  {
    title: 'Observability Engineer',
    company: 'Monitoring Co',
    description:
      'Build and operate observability infrastructure. OpenTelemetry, Jaeger, Prometheus, and log aggregation pipelines with Loki or Splunk.',
    skills: ['opentelemetry', 'prometheus', 'grafana', 'jaeger', 'go', 'kubernetes'],
  },
  {
    title: 'API Platform Engineer',
    company: 'Platform Co',
    description:
      'Build the API gateway, rate limiting, and developer portal powering our external platform. Kong, OAuth2, and TypeScript expertise required.',
    skills: ['typescript', 'nodejs', 'kong', 'oauth2', 'openapi', 'postgresql'],
  },
  {
    title: 'Full Stack Engineer',
    company: 'Growth Co',
    description:
      'Ship product features across a Python/FastAPI backend and React frontend. PostgreSQL, Redis, and AWS deployment experience expected.',
    skills: ['python', 'fastapi', 'react', 'typescript', 'postgresql', 'aws'],
  },
  {
    title: 'ETL/Pipeline Engineer',
    company: 'Data Platform',
    description:
      'Design and operate batch and streaming data pipelines. Airflow, dbt, Kafka, and BigQuery experience required. Strong SQL and Python skills.',
    skills: ['python', 'airflow', 'dbt', 'kafka', 'bigquery', 'sql'],
  },
  {
    title: 'Infrastructure Security Engineer',
    company: 'SecOps Co',
    description:
      'Harden cloud infrastructure and build detective controls. AWS Security Hub, GuardDuty, Terraform, and incident response experience needed.',
    skills: ['aws', 'terraform', 'security', 'guardduty', 'python', 'siem'],
  },
  {
    title: 'Staff Frontend Engineer',
    company: 'Design System Co',
    description:
      'Lead the design system powering a suite of products. React, TypeScript, Storybook, accessibility (WCAG 2.1 AA), and Figma token pipelines.',
    skills: ['react', 'typescript', 'storybook', 'accessibility', 'design-systems', 'css'],
  },
  {
    title: 'Principal Data Engineer',
    company: 'Analytics Platform',
    description:
      'Define data architecture strategy across the organization. Lakehouse design, dbt governance, Spark optimization, and cross-team alignment.',
    skills: ['python', 'spark', 'dbt', 'snowflake', 'data-architecture', 'sql'],
  },
]

const BATCH_SIZE = 3
const BATCH_DELAY_MS = 65_000 // 65s gives a small buffer over the 60s/3-req limit

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function seed() {
  console.log(`Seeding ${jobs.length} jobs in batches of ${BATCH_SIZE} (rate limit: 3/min)...`)

  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i]
    const batchIndex = Math.floor(i / BATCH_SIZE)
    const positionInBatch = i % BATCH_SIZE

    if (positionInBatch === 0 && batchIndex > 0) {
      console.log(`  Waiting ${BATCH_DELAY_MS / 1000}s before next batch...`)
      await sleep(BATCH_DELAY_MS)
    }

    console.log(`  [${i + 1}/${jobs.length}] Embedding: ${job.title} at ${job.company}`)
    await ingestJob(job)
  }

  console.log('Done!')
  process.exit(0)
}

seed().catch(console.error)
