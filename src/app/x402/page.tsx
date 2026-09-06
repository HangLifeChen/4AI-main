"use client";
import { Button } from "@/components/common";
import { GlowingEffect, Variant } from "@/components/ui/glowing-effect";
import Orb from "@/components/ui/orb";
import { cn } from "@/utils";
import { motion } from "framer-motion";

const cards = [
  {
    title: "Agent-to-Agent",
    desc: "Secure, token-based micro-payments between agents using x402 intents and receipts.",
    img: "/x402/bg-one.png",
    color: "bg-[#F15033]",
    variant: "red"
  },
  {
    title: "Unified Discovery & Billing",
    desc: "Agent Hub highlights x402-ready agents, enabling transparent pricing and usage tracking.",
    img: "/x402/bg-two.png",
    color: "bg-[#FCBC19]",
    variant: "primary"
  },
  {
    title: "On-Chain Orchestration",
    desc: "Agent Space uses x402 to coordinate multi-agent workflows and automate value exchange.",
    img: "/x402/bg-three.png",
    color: "bg-[#33EEF1]",
    variant: "blue"
  }
]

const X402Page = () => {
  return (
    <div className="min-h-screen flex flex-col items-center  pt-[100px]">
      <div className="2xl:h-[820px] h-[700px]" style={{ width: '100%', position: 'relative' }}>
        <Orb
          hue={173}
          hoverIntensity={0.03}
          rotateOnHover={true}
          forceHoverState={false}
        />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-[60px]">
          <div className="flex flex-col gap-5 items-center">
            <motion.div
              initial={
                { opacity: 0, y: 50 }
              }
              animate={
                { opacity: 1, y: 0 }
              }
              transition={{ duration: 0.5, delay: 0.2 }}
              className="px-[53px] py-[11px] flex gap-3 items-center text-[26px] text-primary border border-[rgba(255,255,255,0.00)]"
              style={{
                background: 'radial-gradient(61.94% 100% at 50% 0%, rgba(221, 210, 61, 0.20) 0%, rgba(221, 210, 61, 0.00) 60%)'
              }}
            >
              <div className="flex items-center gap-[6px] font-bold">
                <img src="/x402/logo.svg" alt="" className="size-6" />
                4AI
              </div>
              <span className="text-[#FAFAFA]"> & </span>
              <div className="flex items-center gap-[6px]">
                <img src="/x402/x402.svg" alt="" className="size-6" />
                x402
              </div>
            </motion.div>


            <div className="flex flex-col gap-5 items-center">

              <motion.div
                initial={
                  { opacity: 0, y: 50 }
                }
                animate={
                  { opacity: 1, y: 0 }
                }
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col items-center text-[#FAFAFA] text-[clamp(2rem,3vw,52px)] font-semibold">
                <span>Building the Multi-Agent</span>
                <span>Economy</span>
              </motion.div>
              <motion.div
                initial={
                  { opacity: 0, y: 50 }
                }
                animate={
                  { opacity: 1, y: 0 }
                }
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-[rgba(255,255,255,0.40)] text-[16px]">
                Seamless value exchange, on-chain orchestration, x402-ready agents.
              </motion.div>

            </div>
          </div>

          <motion.div
            initial={
              { opacity: 0, y: 50 }
            }
            animate={
              { opacity: 1, y: 0 }
            }
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex gap-10">

            <Button
              href='/x402/create'
              type='hoverPrimary'
              variant='ghost'
              color='primary'
              className='w-[190px] lg:scale-100 scale-85  bg-primary text-[#000]'
            >
              Create Agent
            </Button>

            <Button
              href='/agenthub'
              type='hoverPrimary'
              variant='ghost'
              color='primary'
              className='w-[190px] lg:scale-100 scale-85 border-[rgba(255,255,255,0.20)]  bg-[rgba(255,255,255,0.05)] text-[#fff]'
            >
              View x402 Agents
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="lg:w-[1255px] w-full flex gap-6 mx-auto pb-[112px]">
        {
          cards.map((card, index) => {

            return (
              <motion.div
                initial={
                  { y: 80 }
                }
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                key={index}
                className="flex-1 px-7 pt-[18px] pb-11 flex flex-col gap-[30px] relative rounded-[28px]"
                style={{
                  background: 'radial-gradient(82.11% 100% at 50% 0%, #1C1D1E 0%, #101011 56.76%, #0C0C0D 100%)'
                }}
              >
                <GlowingEffect
                  blur={0}
                  borderWidth={1}
                  spread={80}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  variant={card.variant as Variant}
                />
                <div className="w-full">
                  <img src={card.img} alt="" className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col gap-3">
                  <span className="text-2xl font-bold">{card.title}</span>
                  <div className="flex gap-4 items-center">
                    <div className={
                      cn(
                        "w-1 h-full rounded-[100px]",
                        card.color
                      )
                    }></div>
                    <p className="text-[rgba(255,255,255,0.70)] text-lg leading-[160%]">{card.desc}</p>
                  </div>
                </div>
              </motion.div>
            )

          })

        }
      </div>
    </div>
  )
};

export default X402Page;