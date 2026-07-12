"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Intro from "@/components/Intro";
import SmoothScroll from "@/components/SmoothScroll";
import WhoAmI from "@/components/chapters/WhoAmI";

const TenThings = dynamic(() => import("@/components/chapters/TenThings"));
const MyStory = dynamic(() => import("@/components/chapters/MyStory"));
const Projects = dynamic(() => import("@/components/chapters/Projects"));
const Experience = dynamic(() => import("@/components/chapters/Experience"));
const SkillsDesk = dynamic(() => import("@/components/chapters/SkillsDesk"));
const Leadership = dynamic(() => import("@/components/chapters/Leadership"));
const Achievements = dynamic(() => import("@/components/chapters/Achievements"));
const PlotTwists = dynamic(() => import("@/components/chapters/PlotTwists"));
const Contact = dynamic(() => import("@/components/chapters/Contact"));
const EasterEggs = dynamic(() => import("@/components/EasterEggs"));

export default function Home() {
  // Main content mounts while the intro page is still unfolding away,
  // so the journal is already there when the paper lifts.
  const [opened, setOpened] = useState(false);
  const [introGone, setIntroGone] = useState(false);

  return (
    <>
      {!introGone && (
        <Intro
          onUnfold={() => setOpened(true)}
          onDone={() => setIntroGone(true)}
        />
      )}
      {opened && (
        <SmoothScroll>
          <div className="grain-overlay" aria-hidden />
          <main>
            <WhoAmI />
            <TenThings />
            <MyStory />
            <Projects />
            <Experience />
            <SkillsDesk />
            <Leadership />
            <Achievements />
            <PlotTwists />
            <Contact />
          </main>
          <EasterEggs />
        </SmoothScroll>
      )}
    </>
  );
}
