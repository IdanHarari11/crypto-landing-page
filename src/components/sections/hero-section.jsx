"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const CRYPTO_COINS = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    image: "https://cryptologos.cc/logos/bitcoin-btc-logo.svg",
    position: { x: "2%", y: "27%" }
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    image: "https://cryptologos.cc/logos/ethereum-eth-logo.svg",
    position: { x: "80%", y: "30%" }
  },
  {
    name: "USDT",
    symbol: "USDT",
    image: "https://cryptologos.cc/logos/tether-usdt-logo.svg",
    position: { x: "20%", y: "70%" }
  },
  {
    name: "Solana",
    symbol: "SOL",
    image: "/xrp-crypto-coin.webp",
    position: { x: "70%", y: "60%" }
  }
]

const handleScrollToContactForm = () => {
  const contactFormElement = document.getElementById('contact-us');
  if (contactFormElement) {
    contactFormElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden top-[-4rem] sm:top-[-4rem] -mt-16 sm:mt-0">
      {/* Animated Background Blobs */}
      <div className="blob top-0 left-0" />
      <div className="blob bottom-0 right-0" style={{ opacity: 0.3 }} />
      
      {/* Main Content Container */}
      <div className="relative container mx-auto px-4 h-screen flex items-center">
        <div className="glass max-w-4xl mx-auto p-8 md:p-12 rounded-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6"
          >
            {/* Main Headline */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-glow leading-tight">
              המרת כסף לקריפטו במהירות, באמינות, וללא עמלות שקל-דולר.
            </h1>

            {/* Subtitle with Success Color */}
            <h2 className="text-xl md:text-2xl font-medium">
              <span className="text-primary-green">עמלה קבועה של 5% בלבד</span>
              <span className="text-primary-green"> – המסלול הבטוח שלך </span>
              <span className="text-black marker-line">לעולם הקריפטו.</span>
            </h2>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary mt-8 px-8 py-4 text-lg font-medium rounded-full"
              onClick={handleScrollToContactForm}
            >
              התחל עכשיו
            </motion.button>
          </motion.div>
        </div>

        {/* Floating Crypto Coins */}
        <div className="absolute inset-0 pointer-events-none">
          {CRYPTO_COINS.map((coin) => (
            <motion.div
              key={coin.symbol}
              className="absolute w-16 md:w-24 aspect-square float"
              style={{
                left: coin.position.x,
                top: coin.position.y
              }}
            >
              <Image
                src={coin.image}
                alt={coin.name}
                width={96}
                height={96}
                className="w-full h-full object-contain hover-glow"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 