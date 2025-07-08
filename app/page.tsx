import Features from "@/components/features";
import FooterSection from "@/components/footer";
import HeroSection from "@/components/header-section";
import StatsSection from "@/components/stats";
import TeamSection from "@/components/team-section";
import FeaturesSection from "@/components/webFeatures";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Features />
      <StatsSection />
      <FeaturesSection />
      <TeamSection />
      <FooterSection />
    </>
  );
}
