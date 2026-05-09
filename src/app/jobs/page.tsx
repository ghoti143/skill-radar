import { getAllJobs } from '@/lib/db'
import type { Job } from '@/lib/db'

export default async function JobsPage() {
  const jobs = await getAllJobs()

  return (
    <div className="max-w-4xl mx-auto px-5 py-8">
      <h1 className="text-2xl font-bold mb-1">Job Listings</h1>
      <p className="text-gray-500 mb-6">{jobs.length} jobs in the database</p>

      <div className="flex flex-col gap-4">
        {jobs.map((job: Job) => (
          <div key={job.id} className="border border-gray-200 rounded-lg p-5 bg-white">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h2 className="text-[17px] font-semibold">{job.title}</h2>
                {job.company && (
                  <p className="text-gray-500 text-sm mt-1">{job.company}</p>
                )}
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap ml-4 shrink-0">
                {new Date(job.created_at).toLocaleDateString()}
              </span>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed mt-3 line-clamp-3">
              {job.description}
            </p>

            {job.skills && job.skills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {job.skills.map((skill: string) => (
                  <span
                    key={skill}
                    className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
