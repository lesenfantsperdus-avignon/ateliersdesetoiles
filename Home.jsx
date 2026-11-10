import { Hero } from "@/components/home/Hero";
import { Intro, Approach } from "@/components/home/IntroApproach";
import { Programme, ProjectsTeaser } from "@/components/home/ProgrammeProjects";
import { Founders, Location, FinalCta } from "@/components/home/FoundersLocation";
import { Marquee } from "@/components/site/Marquee";
import { useContent } from "@/context/ContentContext";
import { useTitle } from "@/hooks/useTitle";

export default function Home() {
  useTitle(null);
  const { t } = useContent();
  return (
    <div data-testid="page-home">
      <Hero />
      <Marquee items={t("home.marquee").split("\n").map((s) => s.trim()).filter(Boolean)} />
      <Intro />
      <Approach />
      <Programme />
      <ProjectsTeaser />
      <Founders />
      <Location />
      <FinalCta />
    </div>
  );
}
