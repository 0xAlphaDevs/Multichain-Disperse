
import { ArrowRight, Zap, Shield, Circle } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-700">Multichain Disperse</h1>
          <Link href="/disperse" className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-2 py-1 flex items-center">
            Launch App
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </header>

      <main className="flex-grow">
        <section className="bg-gradient-to-b from-purple-50 to-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-purple-800 mb-4">Chain Abstracted Token Transfers</h2>
            <p className="text-xl text-gray-600">Instant multi-chain token transfer in a single zap</p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center text-purple-800 mb-12">Key Features</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Zap className="h-10 w-10 text-purple-600" />}
                title="Multi-chain Transfers"
                description="Transfer tokens across multiple chains effortlessly in a single transaction."
              />
              <FeatureCard
                icon={<Circle className="h-10 w-10 text-purple-600" />}
                title="Klaster Integration"
                description="Leverage Klaster for seamless account abstraction and improved user experience."
              />
              <FeatureCard
                icon={<Shield className="h-10 w-10 text-purple-600" />}
                title="Particle Network"
                description="Easy onboarding with Particle Connect for enhanced security and convenience."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-purple-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy;<a href="https://www.alphadevs.dev/" target="_blank"> alphahdevs</a></p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h4 className="text-xl font-semibold text-purple-700 mb-2">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}