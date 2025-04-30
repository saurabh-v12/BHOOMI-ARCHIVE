"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function Faq() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-saffron to-green mx-auto mb-4"></div>
            <p className="text-gray-600">Find answers to common questions about the land dispute resolution process.</p>
          </div>

          <div className="space-y-4">
            <FaqItem
              question="What types of land disputes can be resolved through this portal?"
              answer="Our portal can help resolve various types of land disputes including boundary disputes, ownership conflicts, inheritance issues, encroachment claims, title disputes, and registration errors. The system is designed to handle both urban and rural property disputes."
            />

            <FaqItem
              question="How long does the dispute resolution process take?"
              answer="The average resolution time is 7 days, but it can vary depending on the complexity of the case, the availability of documentation, and the cooperation of all parties involved. Simple cases may be resolved in as little as 3 days, while more complex disputes might take up to 14 days."
            />

            <FaqItem
              question="What documents do I need to submit for verification?"
              answer="You'll need to submit proof of identity (Aadhaar card, PAN card, or voter ID), proof of ownership (sale deed, title deed, or inheritance documents), property tax receipts, land survey documents, and any previous legal documents related to the property. All documents should be submitted in digital format through our portal."
            />

            <FaqItem
              question="Is there a fee for using the land dispute resolution service?"
              answer="Basic services like searching land records and viewing property details are free of charge. However, there is a nominal processing fee for filing a dispute claim, which varies based on the property value and type of dispute. Government subsidies are available for economically disadvantaged citizens."
            />

            <FaqItem
              question="Can I appeal a resolution decision if I disagree with the outcome?"
              answer="Yes, you can appeal a resolution decision within 30 days of receiving the official notification. The appeal process requires you to submit additional evidence or documentation to support your case. An independent review committee will evaluate the appeal and provide a final decision."
            />

            <FaqItem
              question="How do I track the status of my dispute case?"
              answer="You can track your case status by logging into your account on our portal and navigating to the 'My Cases' section. Each case is assigned a unique tracking number, and you'll receive email and SMS notifications at every stage of the resolution process."
            />
          </div>

          <div className="mt-10 text-center">
            <p className="text-gray-600 mb-4">Still have questions? Our support team is here to help.</p>
            <Button className="bg-green hover:bg-green-dark text-white">Contact Support</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        className="flex items-center justify-between w-full p-4 text-left bg-white hover:bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-gray-900">{question}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <p className="text-gray-600">{answer}</p>
        </div>
      )}
    </div>
  )
}
