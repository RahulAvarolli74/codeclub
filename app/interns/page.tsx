"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";
import { HeroHeader } from "@/components/header";
import FooterSection from "@/components/footer";
import { Bricolage_Grotesque } from "next/font/google";
import { cn } from "@/lib/utils";


const fontHeading = Bricolage_Grotesque({
  subsets: ["latin"],
});

const internsData = {
  QFAT: [
    "Sritej N Vaidya",
    "Siya Shekhawat",
    "Srushtishree Gouda",
    "Abhishek M",
    "Prince Jain",
    "Pruthviraj S Gourakkanavar",
    "Atharv Adake",
    "Aviral Tripathi",
    "Darshan R Athani",
    "Divya Yaligar",
    "Garima Patel",
    "Prajwal Baddi",
    "Prajwal Patil",
    "Hrishikesh Patil",
    "Kartik Hegde",
    "Khushal Tambe",
    "Kolli Sai Siddu",
    "Medhini Kulkarni",
    "Riya R Hiremath",
    "Rohan Chivate",
    "Sanskruti Agasgekar",
    "MS Priya",
    "Vedant Rajendra Khot",
    "Navya Sastry T H M",
  ],
  PR: [
    "Adithi B",
    "Ayesha Siddiqa V",
    "Soham M Ghatge",
    "Tanu Patil",
    "Akshat Purohit",
    "Hadiya",
    "J Anupama",
    "Zuneriya Afnan",
    "Diya Shetraddi",
    "Zaid Momin",
    "Pooja Patil",
    "Harsha Kampli",
    "Sadaf",
    "Sahna G Belgaumkar",
    "Shifa H Attar",
    "Sneha Nadagadalli",
    "Soniya C Policepatil",
    "Saanvi",
    "Akshata K",
    "Manjunath Hugar",
    "Sanjana Hulli",
    "Sumita Pagi",
    "Surabhi Mukre",
  ],
  "Media & Design": [
    "Ankush KT",
    "Akshata Pawar",
    "Darshankumar Pujari",
    "Mabel Kalebar",
    "Shravani Ashok Naravade",
    "Subiya Suha",
    "Anandita Agnihotri",
    "Tina A Bakale",
    "Vaibhav Kubasad",
    "Shivani Laxmappa Dasar",
    "K Sree Vaishnavi",
  ],
};

export default function InternsPage() {
  useEffect(() => {
    // Auto-trigger confetti on page load
    const timer = setTimeout(() => {
      triggerConfetti();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  return (
    <>
      <div className="min-h-screen w-full relative bg-black">
        {/* Ocean Abyss Background with Top Glow */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(6, 182, 212, 0.25), transparent 70%), #000000",
          }}
        />
      
      {/* Header */}
      <div className="relative">
        <div className="container mx-auto px-4 py-20 sm:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-300"></span>
              </span>
              CodeClub 2025
            </div>
            <h1 className={cn("text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70", fontHeading.className)}>
              Selected Interns
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Congratulations to all those joining us this year
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 pb-20">
        <div className="max-w-5xl mx-auto space-y-16">
          {Object.entries(internsData).map(([wing, interns], wingIndex) => (
            <div
              key={wing}
              className="group"
              style={{
                animation: `fadeIn 0.6s ease-out ${wingIndex * 0.1}s both`,
              }}
            >
              {/* Wing Header */}
              <div className="mb-8 text-center">
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-card border border-border/50 backdrop-blur-sm">
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                    {wing}
                  </h2>
                  <div className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    {interns.length}
                  </div>
                </div>
              </div>

              {/* Names Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {interns.map((name, index) => (
                  <div
                    key={index}
                    className="group/card relative"
                    style={{
                      animation: `slideUp 0.4s ease-out ${index * 0.02}s both`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-lg opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex items-center gap-3 px-4 py-3.5 rounded-lg border border-border/40 bg-card/50 backdrop-blur-sm hover:border-border/60 hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-sm font-semibold text-primary border border-primary/10">
                        {name.charAt(0)}
                      </div>
                      <p className="font-medium text-sm sm:text-base flex-1">
                        {name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
      <FooterSection />
    </>
  );
}
