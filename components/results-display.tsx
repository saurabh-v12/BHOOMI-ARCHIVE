"use client"

import { motion } from "framer-motion"
import { Download, ChevronDown, ChevronUp, FileText, Eye } from "lucide-react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import type { Property } from "@/types/property"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import PropertyValueChart from "@/components/property-value-chart"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

interface ResultsDisplayProps {
  results: Property[]
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  const [expandedView, setExpandedView] = useState(false)
  const [showPdfPreview, setShowPdfPreview] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const pdfContentRef = useRef<HTMLDivElement>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  }

  const handleViewPdf = (property?: Property) => {
    setSelectedProperty(property || results[0])
    setShowPdfPreview(true)
  }

  const handleDownload = async (property?: Property) => {
    // First make sure we have the property data and show the preview
    const propertyToUse = property || results[0]
    setSelectedProperty(propertyToUse)
    setShowPdfPreview(true)

    // Wait for the dialog to render
    setTimeout(async () => {
      if (pdfContentRef.current) {
        try {
          // Create a canvas from the PDF content
          const canvas = await html2canvas(pdfContentRef.current, {
            scale: 2, // Higher scale for better quality
            logging: false,
            useCORS: true,
            allowTaint: true,
          })

          // Create PDF with proper dimensions
          const imgData = canvas.toDataURL("image/png")
          const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4",
          })

          // Calculate the width and height to maintain aspect ratio
          const imgWidth = 210 // A4 width in mm
          const imgHeight = (canvas.height * imgWidth) / canvas.width

          pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)

          // Download the PDF
          pdf.save(`property-statistics-${propertyToUse.registrationNumber}.pdf`)
        } catch (error) {
          console.error("Error generating PDF:", error)
          alert("There was an error generating the PDF. Please try again.")
        }
      }
    }, 500) // Give time for the dialog to render
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Search Results</h3>
          <p className="text-gray-600">
            Found {results.length} record{results.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setExpandedView(!expandedView)}
            className="border-saffron text-saffron hover:bg-saffron/10"
          >
            {expandedView ? (
              <>
                <ChevronUp className="mr-1 h-4 w-4" />
                Compact View
              </>
            ) : (
              <>
                <ChevronDown className="mr-1 h-4 w-4" />
                Expanded View
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleViewPdf()}
            className="border-green text-green hover:bg-green/10"
          >
            <Eye className="mr-1 h-4 w-4" />
            View PDF
          </Button>
        </div>
      </div>

      {expandedView ? (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
          {results.map((property, index) => (
            <motion.div
              key={property.registrationNumber}
              variants={itemVariants}
              className="border-2 border-gray-200 rounded-lg overflow-hidden shadow-sm"
            >
              <div className="bg-gray-50 p-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-gray-900">{property.ownerName}</h4>
                    <p className="text-sm text-gray-600">
                      Registration: {property.registrationNumber} ({property.yearOfRegistration})
                    </p>
                  </div>
                  <div className="flex items-center bg-green/10 text-green text-xs font-medium px-2 py-1 rounded">
                    <FileText className="h-3 w-3 mr-1" />
                    Verified
                  </div>
                </div>
              </div>
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Property Type</p>
                  <p className="text-gray-900">{property.propertyType}</p>
                </div>
                {property.surveyNumber && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Survey Number</p>
                    <p className="text-gray-900">{property.surveyNumber}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-gray-500">Address</p>
                  <p className="text-gray-900">{property.address}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Location</p>
                  <p className="text-gray-900">
                    {property.villageCity}, {property.district}, {property.state} - {property.pinCode}
                  </p>
                </div>
                {property.companyName && (
                  <div className="md:col-span-2">
                    <p className="text-sm font-medium text-gray-500">Company Name</p>
                    <p className="text-gray-900">{property.companyName}</p>
                  </div>
                )}
              </div>
              <div className="bg-gray-50 p-3 border-t border-gray-200 flex justify-end">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleViewPdf(property)}
                  className="text-green border-green hover:bg-green/10"
                >
                  <Eye className="mr-1 h-4 w-4" />
                  View Record
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="font-semibold">Owner Name</TableHead>
                <TableHead className="font-semibold">Registration No.</TableHead>
                <TableHead className="hidden md:table-cell font-semibold">Property Type</TableHead>
                <TableHead className="hidden lg:table-cell font-semibold">Location</TableHead>
                <TableHead className="font-semibold">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((property, index) => (
                <TableRow key={property.registrationNumber}>
                  <TableCell className="font-medium">{property.ownerName}</TableCell>
                  <TableCell>{property.registrationNumber}</TableCell>
                  <TableCell className="hidden md:table-cell">{property.propertyType}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {property.villageCity}, {property.district}
                  </TableCell>
                  <TableCell>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value={`item-${index}`} className="border-none">
                        <AccordionTrigger className="py-2 hover:no-underline">
                          <span className="text-saffron text-sm">View Details</span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm py-2">
                            {property.surveyNumber && (
                              <div>
                                <span className="font-medium text-gray-500">Survey Number: </span>
                                {property.surveyNumber}
                              </div>
                            )}
                            <div>
                              <span className="font-medium text-gray-500">Address: </span>
                              {property.address}
                            </div>
                            <div>
                              <span className="font-medium text-gray-500">State: </span>
                              {property.state}
                            </div>
                            <div>
                              <span className="font-medium text-gray-500">PIN: </span>
                              {property.pinCode}
                            </div>
                            <div>
                              <span className="font-medium text-gray-500">Year: </span>
                              {property.yearOfRegistration}
                            </div>
                            {property.companyName && (
                              <div>
                                <span className="font-medium text-gray-500">Company: </span>
                                {property.companyName}
                              </div>
                            )}
                            <div className="sm:col-span-2 mt-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleViewPdf(property)}
                                className="text-green border-green hover:bg-green/10"
                              >
                                <Eye className="mr-1 h-4 w-4" />
                                View Record
                              </Button>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Statistics Dashboard Dialog */}
      <Dialog open={showPdfPreview} onOpenChange={setShowPdfPreview}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Property Statistics: {selectedProperty?.registrationNumber}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <div ref={pdfContentRef} className="bg-white p-6 border border-gray-200 rounded-md">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold">PROPERTY STATISTICS DASHBOARD</h2>
                <p className="text-gray-500">Government of India</p>
                <div className="w-24 h-1 bg-gradient-to-r from-saffron to-green mx-auto my-2"></div>
              </div>

              {selectedProperty ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Property Details</h3>
                      <table className="w-full text-sm">
                        <tbody>
                          <tr>
                            <td className="py-2 font-medium text-gray-600">Registration Number:</td>
                            <td className="py-2">{selectedProperty.registrationNumber}</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-medium text-gray-600">Survey Number:</td>
                            <td className="py-2">{selectedProperty.surveyNumber || "N/A"}</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-medium text-gray-600">Property Type:</td>
                            <td className="py-2">{selectedProperty.propertyType}</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-medium text-gray-600">Year of Registration:</td>
                            <td className="py-2">{selectedProperty.yearOfRegistration}</td>
                          </tr>
                          {selectedProperty.companyName && (
                            <tr>
                              <td className="py-2 font-medium text-gray-600">Company Name:</td>
                              <td className="py-2">{selectedProperty.companyName}</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Owner Information</h3>
                      <table className="w-full text-sm">
                        <tbody>
                          <tr>
                            <td className="py-2 font-medium text-gray-600">Owner Name:</td>
                            <td className="py-2">{selectedProperty.ownerName}</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-medium text-gray-600">Address:</td>
                            <td className="py-2">{selectedProperty.address}</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-medium text-gray-600">Village/City:</td>
                            <td className="py-2">{selectedProperty.villageCity}</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-medium text-gray-600">District:</td>
                            <td className="py-2">{selectedProperty.district}</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-medium text-gray-600">State:</td>
                            <td className="py-2">{selectedProperty.state}</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-medium text-gray-600">PIN Code:</td>
                            <td className="py-2">{selectedProperty.pinCode}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-lg font-semibold mb-3">Property Value Trends</h3>
                    <div className="h-64">
                      <PropertyValueChart />
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">
                          Document generated on: {new Date().toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-500">
                          Reference ID: DOC-{Math.random().toString(36).substr(2, 9).toUpperCase()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">OFFICIAL SEAL</p>
                        <p className="text-sm text-gray-500">Land Records Department</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center text-gray-500">No property data available</div>
              )}
            </div>
            <div className="flex justify-end mt-4">
              <Button
                onClick={() => handleDownload(selectedProperty)}
                className="bg-green hover:bg-green-dark text-white"
              >
                <Download className="mr-1 h-4 w-4" />
                Download Statistics
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
