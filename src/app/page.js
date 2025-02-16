"use client"

import { Home, User, Briefcase, FileText } from "lucide-react"
import { NavBar } from "@/components/ui/tubelight-navbar"
import { HeroSection } from "@/components/sections/hero-section"
import { CryptoCharts } from '@/components/sections/crypto-charts'

export default function Page() {
  const navItems = [
    { name: 'ראשי', url: '/', icon: Home },
    { name: 'מידע', url: '#about', icon: User },
    { name: 'חוות דעת', url: '#projects', icon: Briefcase },
    { name: 'צור קשר', url: '#resume', icon: FileText }
  ]

  return (
    <main className="min-h-screen">
      <NavBar items={navItems} />
      <HeroSection />
      <CryptoCharts />
      {/* Other sections */}
    </main>
  )
}
