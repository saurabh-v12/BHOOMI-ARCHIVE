import Header from "@/components/header"
import Hero from "@/components/hero"
import SearchSection from "@/components/search-section"
import StatisticsDashboard from "@/components/statistics-dashboard"
import Features from "@/components/features"
import ProcessSteps from "@/components/process-steps"
import Faq from "@/components/faq"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <Hero />
        <SearchSection />
        <StatisticsDashboard />
        <Features />
        <ProcessSteps />
        <Faq />
      </main>
      <Footer />
    </div>
  )
}
