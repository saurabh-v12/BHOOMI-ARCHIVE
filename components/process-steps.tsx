import type React from "react"
export default function ProcessSteps() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">How Land Dispute Resolution Works</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-saffron to-green mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our streamlined process ensures quick and fair resolution of land disputes through a transparent and
            efficient system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <ProcessCard
            number={1}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            }
            title="Search Records"
            description="Search for land records using owner name, land ID, or interactive map to initiate the dispute resolution process."
          />

          <ProcessCard
            number={2}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <path d="M12 18v-6" />
                <path d="M8 15h8" />
              </svg>
            }
            title="File Claim"
            description="Submit your claim with supporting documentation and evidence of ownership."
          />

          <ProcessCard
            number={3}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            }
            title="Verification"
            description="Our officials verify all submitted documents and land records for authenticity."
          />

          <ProcessCard
            number={4}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            }
            title="Mediation"
            description="Parties involved are invited for mediation to reach an amicable solution."
          />

          <ProcessCard
            number={5}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            }
            title="Resolution"
            description="Official decision is made based on evidence and legal documentation."
          />

          <ProcessCard
            number={6}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
            }
            title="Implementation"
            description="The resolution is documented and implemented in the official land records system."
          />
        </div>
      </div>
    </section>
  )
}

function ProcessCard({
  number,
  icon,
  title,
  description,
}: { number: number; icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 relative transition-all hover:shadow-md">
      <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-gradient-to-r from-saffron to-green text-white flex items-center justify-center font-bold text-sm">
        {number}
      </div>
      <div className="flex items-start">
        <div className="mr-4 text-saffron">{icon}</div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  )
}
