import { FileText, MapPin, Download, Check, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function RecordDetails() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Comprehensive Property Records</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-saffron to-green mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our system maintains detailed records of all properties with complete ownership history, documentation, and
            dispute status.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Card className="border-2 border-gray-200">
            <CardHeader className="bg-gray-50 border-b border-gray-200">
              <CardTitle className="flex items-center text-xl">
                <FileText className="h-5 w-5 text-saffron mr-2" />
                Sample Property Record
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="w-full border-b border-gray-200 rounded-none p-0">
                  <TabsTrigger
                    value="details"
                    className="rounded-none data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-saffron"
                  >
                    Property Details
                  </TabsTrigger>
                  <TabsTrigger
                    value="history"
                    className="rounded-none data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-saffron"
                  >
                    Ownership History
                  </TabsTrigger>
                  <TabsTrigger
                    value="documents"
                    className="rounded-none data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-saffron"
                  >
                    Documents
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Registration Number</h4>
                          <p className="text-gray-900 font-medium">GJ-GNR-12345-2018</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Owner Name</h4>
                          <p className="text-gray-900">Rajesh Kumar</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Property Type</h4>
                          <p className="text-gray-900">Residential</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Survey Number</h4>
                          <p className="text-gray-900">123/A/456</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Address</h4>
                          <p className="text-gray-900">Plot No. 45, Sector 7, Gandhinagar, Gujarat - 382007</p>
                        </div>
                      </div>

                      <div className="mt-6 flex space-x-3">
                        <Button variant="outline" size="sm" className="border-saffron text-saffron hover:bg-saffron/10">
                          <MapPin className="mr-1 h-4 w-4" />
                          View on Map
                        </Button>
                        <Button variant="outline" size="sm" className="border-green text-green hover:bg-green/10">
                          <Download className="mr-1 h-4 w-4" />
                          Download Record
                        </Button>
                      </div>
                    </div>

                    <div className="border-l border-gray-200 pl-6">
                      <h4 className="text-sm font-medium text-gray-500 mb-3">Verification Status</h4>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-green/10 text-green flex items-center justify-center mr-3">
                            <Check className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-gray-900 font-medium">Ownership Verified</p>
                            <p className="text-xs text-gray-500">Verified on 15 Mar 2023</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-green/10 text-green flex items-center justify-center mr-3">
                            <Check className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-gray-900 font-medium">Survey Verified</p>
                            <p className="text-xs text-gray-500">Verified on 10 Mar 2023</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-green/10 text-green flex items-center justify-center mr-3">
                            <Check className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-gray-900 font-medium">No Disputes Found</p>
                            <p className="text-xs text-gray-500">Last checked on 20 Apr 2023</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="history" className="p-6">
                  <div className="space-y-6">
                    <div className="flex">
                      <div className="w-10 h-10 rounded-full bg-green/10 text-green flex items-center justify-center mr-4 flex-shrink-0">
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h4 className="font-medium text-gray-900">Rajesh Kumar</h4>
                          <span className="ml-3 text-xs bg-green/10 text-green px-2 py-0.5 rounded-full">
                            Current Owner
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Ownership transferred on 15 Jun 2018</p>
                        <p className="text-sm text-gray-600">Registration: GJ-GNR-12345-2018</p>
                      </div>
                    </div>

                    <div className="border-l-2 border-dashed border-gray-300 ml-5 pl-8 pb-2">
                      <div className="relative">
                        <div className="absolute -left-10 top-0 w-4 h-4 rounded-full bg-gray-300"></div>
                      </div>
                      <div className="flex">
                        <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center mr-4 flex-shrink-0">
                          <User className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Mohan Singh</h4>
                          <p className="text-sm text-gray-600 mt-1">Owned from 10 Mar 2010 to 15 Jun 2018</p>
                          <p className="text-sm text-gray-600">Registration: GJ-GNR-78901-2010</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-l-2 border-dashed border-gray-300 ml-5 pl-8">
                      <div className="relative">
                        <div className="absolute -left-10 top-0 w-4 h-4 rounded-full bg-gray-300"></div>
                      </div>
                      <div className="flex">
                        <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center mr-4 flex-shrink-0">
                          <User className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Suresh Patel</h4>
                          <p className="text-sm text-gray-600 mt-1">Owned from 05 Jan 2000 to 10 Mar 2010</p>
                          <p className="text-sm text-gray-600">Registration: GJ-GNR-45678-2000</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="documents" className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-saffron mr-3" />
                        <div>
                          <p className="font-medium text-gray-900">Sale Deed</p>
                          <p className="text-xs text-gray-500">Uploaded on 15 Jun 2018</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="border-green text-green hover:bg-green/10">
                        <Download className="mr-1 h-4 w-4" />
                        Download
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-saffron mr-3" />
                        <div>
                          <p className="font-medium text-gray-900">Property Tax Receipt</p>
                          <p className="text-xs text-gray-500">Uploaded on 05 Apr 2023</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="border-green text-green hover:bg-green/10">
                        <Download className="mr-1 h-4 w-4" />
                        Download
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-saffron mr-3" />
                        <div>
                          <p className="font-medium text-gray-900">Survey Certificate</p>
                          <p className="text-xs text-gray-500">Uploaded on 10 Mar 2023</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="border-green text-green hover:bg-green/10">
                        <Download className="mr-1 h-4 w-4" />
                        Download
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-saffron mr-3" />
                        <div>
                          <p className="font-medium text-gray-900">NOC from Municipal Corporation</p>
                          <p className="text-xs text-gray-500">Uploaded on 20 Jun 2018</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="border-green text-green hover:bg-green/10">
                        <Download className="mr-1 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
