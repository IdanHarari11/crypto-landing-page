"use client"

import { Home, User, Briefcase, FileText } from "lucide-react"
import { NavBar } from "@/components/ui/tubelight-navbar"
import { HeroSection } from "@/components/sections/hero-section"
import { CryptoCharts } from '@/components/sections/crypto-charts'
import { ChecklistFeatures } from '@/components/sections/checklist-features'

export default function Page() {
  const navItems = [
    { name: 'ראשי', url: '/', icon: Home },
    { name: 'מידע', url: '#about', icon: User },
    { name: 'חוות דעת', url: '#projects', icon: Briefcase },
    { name: 'צור קשר', url: '#resume', icon: FileText }
  ]

  return (
    <main className="min-h-screen">
      <div className="whatsapp-icon-container fixed top-0 left-0 m-2">
        <img src="/whatsapp-image.png" alt="WhatsApp" className="whatsapp-icon" />
      </div>
      <NavBar items={navItems} />
      <HeroSection />
      <CryptoCharts />
      <ChecklistFeatures />
    </main>
  )
}
