import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import VisionMission from '@/components/VisionMission';
import Services from '@/components/Services';
import Values from '@/components/Values';
import WorkPreview from '@/components/WorkPreview';
import TeamStrip from '@/components/TeamStrip';

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <VisionMission />
      <Services />
      <Values />
      <WorkPreview />
      <TeamStrip />
    </>
  );
}
