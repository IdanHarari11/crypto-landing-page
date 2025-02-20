"use client"

import { Home, ChartLine, ListChecks, ReceiptText } from "lucide-react"
import { NavBar } from "@/components/ui/tubelight-navbar"
import { HeroSection } from "@/components/sections/hero-section"
import { CryptoCharts } from '@/components/sections/crypto-charts'
import { ChecklistFeatures } from '@/components/sections/checklist-features'
import ContactForm from '@/components/sections/contact-form'
import Image from "next/image"
import { CryptoChart } from '@/components/ui/crypto-chart'

export default function Page() {
  const navItems = [
    { name: 'ראשי', url: '#home', icon: Home },
    { name: 'תשואות', url: '#charts', icon: ChartLine },
    { name: 'שירותים', url: '#services', icon: ListChecks },
    { name: 'צור קשר', url: '#contact-us', icon: ReceiptText }
  ]

  return (
    <main id="home" className="min-h-screen">
      <div className="whatsapp-icon-container fixed top-0 left-0 m-2 text-center cursor-pointer">
        <span className="block text-black pl-2 font-bold">דברו איתנו כאן!</span>
        <Image width={90} height={70} src="/whatsapp-image.png" alt="WhatsApp" className="whatsapp-icon" />
      </div>
      <div className="fixed top-0 right-0 m-2 text-black font-bold company-number">
        <span className="underline">מספר עוסק:</span>
        <span> 206626855</span>
      </div>
      <NavBar items={navItems} />
      <HeroSection />
      {/* <CryptoCharts /> */}
        <div id="charts" className="flex flex-wrap gap-4 items-center justify-center mt-[-8rem]">
          <CryptoChart coinId="bitcoin" name="Bitcoin" />
          <CryptoChart coinId="ripple" name="XRP" />
          <CryptoChart coinId="ethereum" name="Ethereum" />
          {/* <CryptoChart coinId="ethereum" name="Ethereum" /> */}
        </div>
      <ChecklistFeatures />
      <ContactForm />
    </main>
  )
}
