"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import IntroSequence from "./IntroSequence";

import ChapterOrigin from "./ChapterOrigin";
import ChapterSkills from "./ChapterSkills";
import ChapterProjects from "./ChapterProjects";
import ChapterContact from "./ChapterContact";
import ChapterTransition from "./ChapterTransition";

export type StoryState =
    | "intro"
    | "transition_origin" | "origin"
    | "transition_skills" | "skills"
    | "transition_projects" | "projects"
    | "transition_contact" | "contact";

export default function StoryContainer() {
    const [currentState, setCurrentState] = useState<StoryState>("intro");

    const nextState = (target: StoryState) => {
        setCurrentState(target);
    };

    return (
        <main className="min-h-screen bg-black text-white overflow-hidden relative selection:bg-white/20 selection:text-white">
            <AnimatePresence mode="wait">
                {/* INTRO */}
                {currentState === "intro" && (
                    <IntroSequence key="intro" onComplete={() => nextState("transition_origin")} />
                )}

                {/* ORIGIN */}
                {currentState === "transition_origin" && (
                    <ChapterTransition
                        key="t_origin"
                        chapterNumber="CHAPTER 1"
                        title="ORIGIN"
                        subtext="Identity & Foundation"
                        onComplete={() => nextState("origin")}
                    />
                )}
                {currentState === "origin" && (
                    <ChapterOrigin key="origin" onNext={() => nextState("transition_skills")} />
                )}

                {/* SKILLS */}
                {currentState === "transition_skills" && (
                    <ChapterTransition
                        key="t_skills"
                        chapterNumber="CHAPTER 2"
                        title="SKILLS UNLOCKED"
                        subtext="Capability & Growth"
                        onComplete={() => nextState("skills")}
                    />
                )}
                {currentState === "skills" && (
                    <ChapterSkills key="skills" onNext={() => nextState("transition_projects")} />
                )}

                {/* PROJECTS */}
                {currentState === "transition_projects" && (
                    <ChapterTransition
                        key="t_projects"
                        chapterNumber="CHAPTER 3"
                        title="PROJECTS THAT SLAP"
                        subtext="Proof of Work"
                        onComplete={() => nextState("projects")}
                    />
                )}
                {currentState === "projects" && (
                    <ChapterProjects key="projects" onNext={() => nextState("transition_contact")} />
                )}

                {/* CONTACT */}
                {currentState === "transition_contact" && (
                    <ChapterTransition
                        key="t_contact"
                        chapterNumber="FINAL BOSS"
                        title="ESTABLISH CONNECTION"
                        subtext="Call to Action"
                        onComplete={() => nextState("contact")}
                    />
                )}
                {currentState === "contact" && (
                    <ChapterContact key="contact" />
                )}
            </AnimatePresence>

            {/* Global Progress Indicator (Optional) */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-40 pointer-events-none">
                {["origin", "skills", "projects", "contact"].map((step, i) => {
                    const isCurrent = currentState.includes(step);
                    const isPast = ["origin", "skills", "projects", "contact"].indexOf(currentState.split("_").pop() || "") > i;

                    return (
                        <div
                            key={step}
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${isCurrent ? 'bg-emerald-500 scale-150' : isPast ? 'bg-zinc-600' : 'bg-zinc-800'}`}
                        />
                    )
                })}
            </div>
        </main>
    );
}
