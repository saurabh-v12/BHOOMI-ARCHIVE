"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Pie, PieChart, Cell } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"

// Property type distribution data
const propertyTypeData = [
  { name: "Residential", value: 65 },
  { name: "Commercial", value: 20 },
  { name: "Agricultural", value: 10 },
  { name: "Industrial", value: 5 },
]

// Registration by year data
const registrationData = [
  { year: 2017, count: 120 },
  { year: 2018, count: 150 },
  { year: 2019, count: 180 },
  { year: 2020, count: 160 },
  { year: 2021, count: 210 },
  { year: 2022, count: 230 },
  { year: 2023, count: 250 },
]

// Dispute resolution data
const disputeData = [
  { month: "Jan", resolved: 45, pending: 12 },
  { month: "Feb", resolved: 52, pending: 10 },
  { month: "Mar", resolved: 48, pending: 15 },
  { month: "Apr", resolved: 60, pending: 8 },
  { month: "May", resolved: 55, pending: 11 },
  { month: "Jun", resolved: 65, pending: 7 },
]

// Colors for pie chart
const COLORS = ["#FF9933", "#138808", "#0000FF", "#800080"]

export default function StatisticsDashboard() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Land Records Statistics</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-saffron to-green mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive analytics and statistics of property records, registrations, and dispute resolutions.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Card className="border-2 border-gray-200">
            <CardHeader className="bg-gray-50 border-b border-gray-200">
              <CardTitle className="flex items-center text-xl">
                <FileText className="h-5 w-5 text-saffron mr-2" />
                Property Statistics Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="property-types" className="w-full">
                <TabsList className="w-full border-b border-gray-200 rounded-none p-0">
                  <TabsTrigger
                    value="property-types"
                    className="rounded-none data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-saffron"
                  >
                    Property Types
                  </TabsTrigger>
                  <TabsTrigger
                    value="registrations"
                    className="rounded-none data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-saffron"
                  >
                    Yearly Registrations
                  </TabsTrigger>
                  <TabsTrigger
                    value="disputes"
                    className="rounded-none data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-saffron"
                  >
                    Dispute Resolution
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="property-types" className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Property Type Distribution</h3>
                      <p className="text-gray-600 mb-4">
                        Breakdown of registered properties by type across all regions. Residential properties make up
                        the majority of registrations.
                      </p>
                      <div className="space-y-3 mt-6">
                        {propertyTypeData.map((entry, index) => (
                          <div key={`stat-${index}`} className="flex items-center">
                            <div
                              className="w-4 h-4 rounded-full mr-3"
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            ></div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <span className="font-medium">{entry.name}</span>
                                <span>{entry.value}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                <div
                                  className="h-2 rounded-full"
                                  style={{
                                    width: `${entry.value}%`,
                                    backgroundColor: COLORS[index % COLORS.length],
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="h-64 flex items-center justify-center">
                      <ChartContainer
                        config={{
                          property: {
                            label: "Property Types",
                            colors: ["#FF9933", "#138808", "#0000FF", "#800080"],
                          },
                        }}
                        className="h-full w-full"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={propertyTypeData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {propertyTypeData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <ChartTooltip content={<ChartTooltipContent />} />
                          </PieChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="registrations" className="p-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Property Registrations by Year</h3>
                    <p className="text-gray-600 mb-6">
                      Annual property registration trends show consistent growth over the past 7 years, with a slight
                      dip in 2020 due to the pandemic.
                    </p>
                    <div className="h-64">
                      <ChartContainer
                        config={{
                          count: {
                            label: "Registrations",
                            color: "#FF9933",
                          },
                        }}
                        className="h-full"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={registrationData}
                            margin={{
                              top: 10,
                              right: 30,
                              left: 20,
                              bottom: 10,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="year" tickLine={false} axisLine={false} />
                            <YAxis tickLine={false} axisLine={false} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="count" fill="#FF9933" radius={4} />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="disputes" className="p-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Dispute Resolution Statistics (Last 6 Months)</h3>
                    <p className="text-gray-600 mb-6">
                      Monthly breakdown of resolved vs pending land dispute cases. Our resolution rate has been
                      improving consistently.
                    </p>
                    <div className="h-64">
                      <ChartContainer
                        config={{
                          resolved: {
                            label: "Resolved Cases",
                            color: "#138808",
                          },
                          pending: {
                            label: "Pending Cases",
                            color: "#FF9933",
                          },
                        }}
                        className="h-full"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={disputeData}
                            margin={{
                              top: 10,
                              right: 30,
                              left: 20,
                              bottom: 10,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="month" tickLine={false} axisLine={false} />
                            <YAxis tickLine={false} axisLine={false} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="resolved" fill="#138808" radius={4} />
                            <Bar dataKey="pending" fill="#FF9933" radius={4} />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
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
