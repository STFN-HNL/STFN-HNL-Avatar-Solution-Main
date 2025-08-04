"use client";

import React, { useEffect, useState } from "react";

import { Button } from "./Button";
import { Select } from "./Select";
import { useLanguage } from "./logic";
import { STT_LANGUAGE_LIST } from "@/app/lib/constants";

interface ScrollOnboardingProps {
  onComplete: () => void;
}

interface StackedCardProps {
  children: React.ReactNode;
  index: number;
  isActive: boolean;
  isPassed: boolean;
  progress: number;
}

const StackedCard: React.FC<StackedCardProps> = ({
  children,
  index,
  isActive,
  isPassed,
  progress,
}) => {
  // Calculate transforms for proper stacking effect with Heinrich Co. sophistication
  let transform = "";
  let opacity = 1;
  let zIndex = 50 - index;
  let pointerEvents: "none" | "auto" = "none";

  if (isPassed) {
    // Cards that have been passed - elegant fade with upward movement
    transform = `translateY(-200vh) scale(0.95)`;
    opacity = 0;
    zIndex = 1;
  } else if (isActive) {
    // Active card - center, full size, with subtle elevation
    transform = `translateY(0px) scale(1)`;
    opacity = 1;
    zIndex = 100;
    pointerEvents = "auto";
  } else {
    // Future cards - sophisticated stacking with premium feel
    const offset = index * 25;

    transform = `translateY(${offset + 30}px) scale(${0.96 - index * 0.015})`;
    opacity = Math.max(0.4, 0.85 - index * 0.12);
    zIndex = 50 - index;
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-6"
      style={{
        zIndex: zIndex,
        transform: transform,
        opacity: opacity,
        transition: "all 1200ms cubic-bezier(0.4, 0.0, 0.2, 1)", // Heinrich Co. sophisticated timing - cinematic, luxurious
        pointerEvents: pointerEvents,
      }}
    >
      <div className="max-w-5xl w-full">{children}</div>
    </div>
  );
};

export const ScrollOnboarding: React.FC<ScrollOnboardingProps> = ({
  onComplete,
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const { selectedLanguage, setSelectedLanguage, t } = useLanguage();

  // Supported languages filtered to match avatar capabilities
  const SUPPORTED_LANGUAGES = STT_LANGUAGE_LIST.filter(lang => 
    ['en', 'nl', 'tr', 'pt', 'es'].includes(lang.value)
  );

  const cards = [
    {
      id: "training-welcome",
      gradient: "from-primary-dark/25 to-accent/25",
      content: (
        <div className="bg-neutral rounded-2xl shadow-heinrich overflow-hidden min-h-[600px] max-h-[700px] overflow-y-auto border border-primary-light/20">
          {/* Welcome header */}
          <div className="bg-gradient-to-r from-primary-dark/15 to-accent/10 p-8 border-b border-primary-light/30">
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center space-x-4 min-w-0 flex-1">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/80 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-paper flex-shrink-0">
                  🎯
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-3xl font-light text-primary-dark tracking-wide break-words">
                    {t('welcomeTitle')}
                  </h2>
                  <p className="text-primary-dark/70 text-lg mt-1 break-words">
                    {t('welcomeSubtitle')}
                  </p>
                </div>
              </div>
              
              {/* Language Selector */}
              <div className="w-64 flex-shrink-0">
                <label className="block text-sm font-medium text-primary-dark mb-2">
                  {t('languageLabel')}
                </label>
                <Select
                  options={SUPPORTED_LANGUAGES}
                  renderOption={(option) => option.label}
                  value={
                    SUPPORTED_LANGUAGES.find((option) => option.value === selectedLanguage)
                      ?.label
                  }
                  onSelect={(option) => setSelectedLanguage(option.value as any)}
                  isSelected={(option) => option.value === selectedLanguage}
                  placeholder={t('selectLanguage')}
                />
              </div>
            </div>
          </div>
          <div className="p-8 flex-1">
            <div className="space-y-6 h-full flex flex-col">
              <div className="bg-gradient-to-br from-accent/15 to-primary-light/10 p-6 rounded-xl border border-accent/30">
                <h3 className="text-2xl font-semibold text-primary-dark mb-3">
                  {t('transformSkills')}
                </h3>
                <p className="text-primary-dark/80 leading-relaxed">
                  {t('transformDescription')}
                </p>
              </div>
              
              <div className="flex-1 space-y-4">
                <h4 className="text-xl font-medium text-primary-dark">
                  {t('whatMakesSpecial')}
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      </div>
                      <p className="text-primary-dark/80">
                        <strong>{t('realisticInteractions')}</strong> {t('realisticDescription')}
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      </div>
                      <p className="text-primary-dark/80">
                        <strong>{t('instantFeedback')}</strong> {t('feedbackDescription')}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      </div>
                      <p className="text-primary-dark/80">
                        <strong>{t('safeEnvironment')}</strong> {t('safeDescription')}
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      </div>
                      <p className="text-primary-dark/80">
                        <strong>{t('skillBuilding')}</strong> {t('skillDescription')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary-light/15 to-accent/10 p-6 rounded-xl border border-primary-light/20">
                <p className="text-primary-dark font-medium text-center leading-relaxed break-words hyphens-auto">
                  {t('readyToBuild')}
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "welcome",
      gradient: "from-accent/20 to-primary-light/30",
      content: (
        <div className="bg-neutral rounded-2xl shadow-heinrich overflow-hidden h-[600px] border border-primary-light/20">
          {/* Heinrich Co. inspired header */}
          <div className="bg-gradient-to-r from-primary-light/10 to-accent/5 p-8 border-b border-primary-light/30">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-primary-dark font-bold text-xl shadow-paper">
                2
              </div>
              <h2 className="text-3xl font-light text-primary-dark tracking-wide">
                {t('meetPracticePartner')}
              </h2>
            </div>
          </div>
          <div className="p-8 flex-1">
            <div className="space-y-6 h-full flex flex-col">
              <h3 className="text-2xl font-medium text-primary-dark">
                {t('readyToMasterSales')}
              </h3>
              <div className="flex-1">
                <p className="text-primary-dark/80 mb-4 leading-relaxed">
                  {t('meetJacobFischer')}
                </p>
                <p className="text-primary-dark/70 leading-relaxed">
                  {t('practiceAuthentic')}
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary-light/15 to-accent/10 p-6 rounded-xl border border-primary-light/20">
                <p className="text-primary-dark font-medium">
                  {t('startJourneyExcellence')}
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "getting-started",
      gradient: "from-primary-dark/20 to-accent/20",
      content: (
        <div className="bg-neutral rounded-2xl shadow-heinrich overflow-hidden h-[600px] border border-primary-light/20">
          <div className="bg-gradient-to-r from-primary-light/10 to-accent/5 p-8 border-b border-primary-light/30">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-primary-dark font-bold text-xl shadow-paper">
                3
              </div>
              <h2 className="text-3xl font-light text-primary-dark tracking-wide">
                {t('beforeYouStart')}
              </h2>
            </div>
          </div>
          <div className="p-8 flex-1">
            <div className="space-y-6 h-full flex flex-col">
              <h3 className="text-2xl font-medium text-primary-dark">
                {t('setupSuccess')}
              </h3>
              <div className="flex-1 space-y-4">
                <p className="text-primary-dark/80 leading-relaxed">
                  {t('bestExperience')}
                </p>
                <p className="text-primary-dark/80 leading-relaxed">
                  {t('jacobProcesses')}
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary-light/15 to-accent/10 p-6 rounded-xl border border-primary-light/20">
                <p className="text-primary-dark font-medium">
                  {t('conversationData')}
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "persona-selection",
      gradient: "from-accent/20 to-primary-dark/20",
      content: (
        <div className="bg-neutral rounded-2xl shadow-heinrich overflow-hidden h-[600px] border border-primary-light/20">
          <div className="bg-gradient-to-r from-primary-light/10 to-accent/5 p-8 border-b border-primary-light/30">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-primary-dark font-bold text-xl shadow-paper">
                4
              </div>
              <h2 className="text-3xl font-light text-primary-dark tracking-wide">
                {t('challengeLevel')}
              </h2>
            </div>
          </div>
          <div className="p-6 flex-1">
            <div className="space-y-4 h-full flex flex-col">
              <h3 className="text-2xl font-medium text-primary-dark">
                {t('whichJacob')}
              </h3>
              <div className="flex-1">
                <p className="text-primary-dark/80 mb-3 leading-relaxed">
                  {t('jacobAdapts')}
                </p>
                <div className="space-y-2">
                  <div className="bg-gradient-to-br from-primary-light/15 to-accent/8 p-3 rounded-xl border border-primary-light/20 hover:shadow-paper transition-all duration-400">
                    <h4 className="font-medium text-primary-dark mb-1">
                      {t('cautiousJacob')}
                    </h4>
                    <p className="text-primary-dark/70 text-sm">
                      {t('cautiousDescription')}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-primary-light/15 to-accent/8 p-3 rounded-xl border border-primary-light/20 hover:shadow-paper transition-all duration-400">
                    <h4 className="font-medium text-primary-dark mb-1">
                      {t('dominantJacob')}
                    </h4>
                    <p className="text-primary-dark/70 text-sm">
                      {t('dominantDescription')}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-primary-light/15 to-accent/8 p-3 rounded-xl border border-primary-light/20 hover:shadow-paper transition-all duration-400">
                    <h4 className="font-medium text-primary-dark mb-1">
                      {t('analyticalJacob')}
                    </h4>
                    <p className="text-primary-dark/70 text-sm">
                      {t('analyticalDescription')}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary-light/15 to-accent/10 p-4 rounded-xl border border-primary-light/20">
                <p className="text-primary-dark font-medium">
                  {t('chooseStyle')}
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "conversation-flow",
      gradient: "from-primary-light/20 to-accent/20",
      content: (
        <div className="bg-neutral rounded-2xl shadow-heinrich overflow-hidden h-[600px] border border-primary-light/20">
          <div className="bg-gradient-to-r from-primary-light/10 to-accent/5 p-8 border-b border-primary-light/30">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-primary-dark font-bold text-xl shadow-paper">
                5
              </div>
              <h2 className="text-3xl font-light text-primary-dark tracking-wide">
                {t('navigatePro')}
              </h2>
            </div>
          </div>
          <div className="p-8 flex-1">
            <div className="space-y-6 h-full flex flex-col">
              <h3 className="text-2xl font-medium text-primary-dark">
                {t('roadmapSuccess')}
              </h3>
              <div className="flex-1">
                <p className="text-primary-dark/80 mb-4 leading-relaxed">
                  {t('followProgression')}
                </p>
                <div className="space-y-3">
                  {[
                    {
                      phase: t('discoveryPhase'),
                      description: t('discoveryDescription'),
                    },
                    {
                      phase: t('solutionPresentation'),
                      description: t('solutionDescription'),
                    },
                    {
                      phase: t('objectionMastery'),
                      description: t('objectionDescription'),
                    },
                    {
                      phase: t('commitmentClose'),
                      description: t('commitmentDescription'),
                    },
                  ].map((step, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <span className="bg-accent text-primary-dark text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center">
                        {index + 1}
                      </span>
                      <div>
                        <span className="text-primary-dark font-medium">
                          {step.phase}
                        </span>
                        <p className="text-primary-dark/70">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary-light/15 to-accent/10 p-6 rounded-xl border border-primary-light/20">
                <p className="text-primary-dark font-medium">
                  {t('masterPhases')}
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "common-objections",
      gradient: "from-primary-light/20 to-accent/20",
      content: (
        <div className="bg-neutral rounded-2xl shadow-heinrich overflow-hidden h-[600px] border border-primary-light/20">
          <div className="bg-gradient-to-r from-primary-light/10 to-accent/5 p-8 border-b border-primary-light/30">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-primary-dark font-bold text-xl shadow-paper">
                6
              </div>
              <h2 className="text-3xl font-light text-primary-dark tracking-wide">
                {t('expectUnexpectedTitle')}
              </h2>
            </div>
          </div>
          <div className="p-6 flex-1 h-full flex flex-col">
            <h3 className="text-2xl font-medium text-primary-dark mb-4">
              {t('masterObjectionsTitle')}
            </h3>
            <p className="text-primary-dark/80 mb-4 leading-relaxed">
              {t('jacobChallenges')}
            </p>
            <div className="mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="bg-gradient-to-br from-primary-light/15 to-accent/8 p-4 rounded-xl h-fit border border-primary-light/20 hover:shadow-paper transition-all duration-400">
                    <h4 className="font-medium text-primary-dark mb-2">
                      {t('costConcernsTitle')}
                    </h4>
                    <p className="text-primary-dark/70 italic">
                      {t('costExample2')}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-primary-light/15 to-accent/8 p-4 rounded-xl h-fit border border-primary-light/20 hover:shadow-paper transition-all duration-400">
                    <h4 className="font-medium text-primary-dark mb-2">
                      {t('securityWorries')}
                    </h4>
                    <p className="text-primary-dark/70 italic">
                      {t('securityExample')}
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-gradient-to-br from-primary-light/15 to-accent/8 p-4 rounded-xl h-fit border border-primary-light/20 hover:shadow-paper transition-all duration-400">
                    <h4 className="font-medium text-primary-dark mb-2">
                      {t('reliabilityQuestions')}
                    </h4>
                    <p className="text-primary-dark/70 italic">
                      {t('reliabilityExample')}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-primary-light/15 to-accent/8 p-4 rounded-xl h-fit border border-primary-light/20 hover:shadow-paper transition-all duration-400">
                    <h4 className="font-medium text-primary-dark mb-2">
                      {t('statusQuoBias')}
                    </h4>
                    <p className="text-primary-dark/70 italic">
                      {t('statusQuoExample')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-primary-dark font-medium">
              {t('objectionsAreSignals')}
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "best-practices",
      gradient: "from-primary-dark/20 to-accent/20",
      content: (
        <div className="bg-neutral rounded-2xl shadow-heinrich overflow-hidden h-[600px] border border-primary-light/20">
          <div className="bg-gradient-to-r from-primary-light/10 to-accent/5 p-8 border-b border-primary-light/30">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-primary-dark font-bold text-xl shadow-paper">
                7
              </div>
              <h2 className="text-3xl font-light text-primary-dark tracking-wide">
                {t('conversationExcellence')}
              </h2>
            </div>
          </div>
          <div className="p-6 flex-1 h-full flex flex-col">
            <h3 className="text-2xl font-medium text-primary-dark mb-4">
              {t('makeWordsCount')}
            </h3>
            <p className="text-primary-dark/80 mb-4 leading-relaxed">
              {t('salesNatural')}
            </p>
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-primary-light/15 to-accent/8 p-4 rounded-xl border border-primary-light/20 hover:shadow-paper transition-all duration-400">
                    <h4 className="font-medium text-primary-dark mb-2">
                      {t('listenActivelyTitle')}
                    </h4>
                    <p className="text-primary-dark/70">
                      {t('listenActivelyDesc')}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-primary-light/15 to-accent/8 p-4 rounded-xl border border-primary-light/20 hover:shadow-paper transition-all duration-400">
                    <h4 className="font-medium text-primary-dark mb-2">
                      {t('askSmartQuestionsTitle')}
                    </h4>
                    <p className="text-primary-dark/70">
                      {t('askSmartQuestionsDesc')}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-primary-light/15 to-accent/8 p-4 rounded-xl border border-primary-light/20 hover:shadow-paper transition-all duration-400">
                    <h4 className="font-medium text-primary-dark mb-2">
                      {t('paintPictureTitle')}
                    </h4>
                    <p className="text-primary-dark/70">
                      {t('paintPictureDesc')}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-primary-light/15 to-accent/8 p-4 rounded-xl border border-primary-light/20 hover:shadow-paper transition-all duration-400">
                    <h4 className="font-medium text-primary-dark mb-2">
                      {t('buildTrustTitle')}
                    </h4>
                    <p className="text-primary-dark/70">
                      {t('buildTrustDesc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-light/15 to-accent/10 p-4 rounded-xl mt-4 border border-primary-light/20">
              <p className="text-primary-dark font-medium">
                {t('stayProfessional')}
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "session-management",
      gradient: "from-accent/20 to-primary-dark/20",
      content: (
        <div className="bg-neutral rounded-2xl shadow-heinrich overflow-hidden h-[600px] border border-primary-light/20">
          <div className="bg-gradient-to-r from-primary-light/10 to-accent/5 p-8 border-b border-primary-light/30">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-primary-dark font-bold text-xl shadow-paper">
                8
              </div>
              <h2 className="text-3xl font-light text-primary-dark tracking-wide">
                {t('keepFlowing')}
              </h2>
            </div>
          </div>
          <div className="p-6 flex-1 h-full flex flex-col">
            <h3 className="text-2xl font-medium text-primary-dark mb-4">
              {t('technicalTips')}
            </h3>
            <p className="text-primary-dark/80 mb-4 leading-relaxed">
              {t('getMostFrom')}
            </p>
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-primary-light/15 to-accent/8 p-4 rounded-xl border border-primary-light/20 hover:shadow-paper transition-all duration-400">
                    <h4 className="font-medium text-primary-dark mb-2">
                      {t('optimalLengthTitle')}
                    </h4>
                    <p className="text-primary-dark/70">
                      {t('optimalLengthDesc')}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-primary-light/15 to-accent/8 p-4 rounded-xl border border-primary-light/20 hover:shadow-paper transition-all duration-400">
                    <h4 className="font-medium text-primary-dark mb-2">
                      {t('stayFocusedTitle')}
                    </h4>
                    <p className="text-primary-dark/70">
                      {t('stayFocusedDesc')}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-primary-light/15 to-accent/8 p-4 rounded-xl border border-primary-light/20 hover:shadow-paper transition-all duration-400">
                    <h4 className="font-medium text-primary-dark mb-2">
                      {t('naturalRhythmTitle')}
                    </h4>
                    <p className="text-primary-dark/70">
                      {t('naturalRhythmDesc')}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-primary-light/15 to-accent/8 p-4 rounded-xl border border-primary-light/20 hover:shadow-paper transition-all duration-400">
                    <h4 className="font-medium text-primary-dark mb-2">
                      {t('takeNotesTitle')}
                    </h4>
                    <p className="text-primary-dark/70">
                      {t('takeNotesDesc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-light/15 to-accent/10 p-4 rounded-xl mt-4 border border-primary-light/20">
              <p className="text-primary-dark font-medium">
                {t('takeNotesReminder')}
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "feedback",
      gradient: "from-primary-light/20 to-accent/20",
      content: (
        <div className="bg-neutral rounded-2xl shadow-heinrich overflow-hidden h-[600px] border border-primary-light/20">
          <div className="bg-gradient-to-r from-primary-light/10 to-accent/5 p-8 border-b border-primary-light/30">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-primary-dark font-bold text-xl shadow-paper">
                9
              </div>
              <h2 className="text-3xl font-light text-primary-dark tracking-wide">
                {t('transformProgress')}
              </h2>
            </div>
          </div>
          <div className="p-8 flex-1">
            <div className="space-y-6 h-full flex flex-col">
              <h3 className="text-2xl font-medium text-primary-dark">
                {t('turnGrowth')}
              </h3>
              <div className="flex-1">
                <p className="text-primary-dark/80 mb-4 leading-relaxed">
                  {t('endTraining')}
                </p>
                <div className="bg-gradient-to-br from-primary-light/15 to-accent/8 p-4 rounded-xl mb-4 border border-primary-light/20">
                  <h4 className="font-medium text-primary-dark mb-3 text-sm">
                    {t('detailedScoring')}
                  </h4>
                  <div className="space-y-1">
                    {[
                      t('discoveryAssessment'),
                      t('objectionHandling'),
                      t('valueCommunication'),
                      t('relationshipBuilding'),
                      t('closingTechnique'),
                    ].map((area, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                        <span className="text-primary-dark text-sm">
                          {area}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-primary-dark/80 leading-relaxed">
                  {t('specificExamplesDesc')}
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary-light/15 to-accent/10 p-6 rounded-xl border border-primary-light/20">
                <p className="text-primary-dark font-medium">
                  {t('jacobNoticesDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "troubleshooting",
      gradient: "from-accent/20 to-primary-light/20",
      content: (
        <div className="bg-neutral rounded-2xl shadow-heinrich overflow-hidden h-[600px] border border-primary-light/20">
          <div className="bg-gradient-to-r from-primary-light/10 to-accent/5 p-8 border-b border-primary-light/30">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-primary-dark font-bold text-xl shadow-paper">
                10
              </div>
              <h2 className="text-3xl font-light text-primary-dark tracking-wide">
                {t('thingsOffTrack')}
              </h2>
            </div>
          </div>
          <div className="p-6 flex-1 h-full flex flex-col">
            <h3 className="text-2xl font-medium text-primary-dark mb-4">
              {t('keepOnCourse')}
            </h3>
            <p className="text-primary-dark/80 mb-4 leading-relaxed">
              {t('unexpectedTurnsDesc')}
            </p>
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-primary-light/15 to-accent/8 p-4 rounded-xl border border-primary-light/20 hover:shadow-paper transition-all duration-400">
                    <h4 className="font-medium text-primary-dark mb-2">
                      {t('jacobConfusedTitle')}
                    </h4>
                    <p className="text-primary-dark/70">
                      {t('jacobConfusedDesc')}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-primary-light/15 to-accent/8 p-4 rounded-xl border border-primary-light/20 hover:shadow-paper transition-all duration-400">
                    <h4 className="font-medium text-primary-dark mb-2">
                      {t('needResetTitle')}
                    </h4>
                    <p className="text-primary-dark/70">
                      {t('needResetDesc')}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-primary-light/15 to-accent/8 p-4 rounded-xl border border-primary-light/20 hover:shadow-paper transition-all duration-400">
                    <h4 className="font-medium text-primary-dark mb-2">
                      {t('technicalIssuesTitle')}
                    </h4>
                    <p className="text-primary-dark/70">
                      {t('technicalIssuesDesc')}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-primary-light/15 to-accent/8 p-4 rounded-xl border border-primary-light/20 hover:shadow-paper transition-all duration-400">
                    <h4 className="font-medium text-primary-dark mb-2">
                      {t('conversationStallsTitle')}
                    </h4>
                    <p className="text-primary-dark/70">
                      {t('conversationStallsDesc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-light/15 to-accent/10 p-4 rounded-xl mt-4 border border-primary-light/20">
              <p className="text-primary-dark font-medium">
                {t('realisticProspectDesc')}
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "success-metrics",
      gradient: "from-primary-dark/20 to-accent/20",
      content: (
        <div className="bg-neutral rounded-2xl shadow-heinrich overflow-hidden h-[600px] border border-primary-light/20">
          <div className="bg-gradient-to-r from-primary-light/10 to-accent/5 p-6 border-b border-primary-light/30">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-primary-dark font-bold text-xl shadow-paper">
                11
              </div>
              <h2 className="text-3xl font-light text-primary-dark tracking-wide">
                {t('measureGrowth')}
              </h2>
            </div>
          </div>
          <div className="p-6 flex-1 h-full flex flex-col">
            <h3 className="text-2xl font-medium text-primary-dark mb-4">
              {t('knowWinning')}
            </h3>
            <p className="text-primary-dark/80 mb-4 leading-relaxed">
              {t('measurableQualities')}
            </p>
            <div className="flex-1 min-h-0">
              <div className="grid grid-cols-2 gap-4 h-full">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3 text-primary-dark"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M5 13l4 4L19 7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                        />
                      </svg>
                    </div>
                    <p className="text-primary-dark/80">
                      {t('discoveryQuestionsDesc')}
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3 text-primary-dark"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M5 13l4 4L19 7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                        />
                      </svg>
                    </div>
                    <p className="text-primary-dark/80">
                      {t('handledObjectionsDesc')}
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3 text-primary-dark"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M5 13l4 4L19 7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                        />
                      </svg>
                    </div>
                    <p className="text-primary-dark/80">
                      {t('connectedFeaturesDesc')}
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3 text-primary-dark"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M5 13l4 4L19 7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                        />
                      </svg>
                    </div>
                    <p className="text-primary-dark/80">
                      {t('builtRapportDesc')}
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3 text-primary-dark"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M5 13l4 4L19 7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                        />
                      </svg>
                    </div>
                    <p className="text-primary-dark/80">
                      {t('guidedCommitmentDesc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-light/15 to-accent/10 p-4 rounded-xl mt-2 border border-primary-light/20">
                              <p className="text-primary-dark font-medium text-center">
                  {t('masterSkills')}
                </p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  // Simple wheel scroll handler
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (e.deltaY > 0 && activeCard < cards.length - 1) {
          // Scroll down - next card
          setActiveCard((prev) => Math.min(prev + 1, cards.length - 1));
        } else if (e.deltaY < 0 && activeCard > 0) {
          // Scroll up - previous card
          setActiveCard((prev) => Math.max(prev - 1, 0));
        }
      }, 150);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
        case " ":
          e.preventDefault();
          setActiveCard((prev) => Math.min(prev + 1, cards.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveCard((prev) => Math.max(prev - 1, 0));
          break;
      }
    };

    document.addEventListener("wheel", handleWheel, { passive: false });
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(scrollTimeout);
      document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeCard, cards.length]);

  return (
    <div className="fixed inset-0 w-full h-screen overflow-hidden">
      {/* Heinrich Co. inspired progress indicator */}
      <div className="fixed top-8 right-8 z-50 flex space-x-3">
        {cards.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-400 cursor-pointer ${
              index === activeCard
                ? "bg-primary-dark scale-125 shadow-heinrich"
                : index < activeCard
                  ? "bg-accent shadow-paper"
                  : "bg-primary-light/50"
            }`}
            onClick={() => setActiveCard(index)}
          />
        ))}
      </div>

      {/* Sophisticated background gradient */}
      <div
        className={`fixed inset-0 bg-gradient-to-br ${cards[activeCard]?.gradient || "from-accent/20 to-primary-light/30"} transition-all duration-700`}
      />

      {/* Heinrich Co. navigation hint */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 text-primary-dark text-center z-40">
        {activeCard < cards.length - 1 ? (
          <p className="text-sm opacity-75 font-light">
            {t('useMouseWheel')}
          </p>
        ) : (
          <p className="text-sm opacity-75 font-light">
            {t('readyToStart')}
          </p>
        )}
      </div>

      {/* Stacked cards */}
      {cards.map((card, index) => (
        <StackedCard
          key={card.id}
          index={index}
          isActive={activeCard === index}
          isPassed={index < activeCard}
          progress={0}
        >
          {card.content}
        </StackedCard>
      ))}

      {/* Heinrich Co. inspired CTA button */}
      {activeCard === cards.length - 1 && (
        <div className="fixed bottom-32 left-1/2 transform -translate-x-1/2 z-[110]">
          <Button
            className="bg-primary-dark hover:bg-primary-dark/90 text-white px-12 py-6 text-xl font-medium rounded-xl transition-all duration-400 transform hover:scale-105 hover:shadow-heinrich-hover border border-primary-light/20"
            onClick={onComplete}
          >
            {t('startTraining')}
          </Button>
        </div>
      )}

      {/* Debug info with Heinrich Co. styling */}
      <div className="fixed bottom-4 left-4 text-primary-dark bg-neutral/80 backdrop-blur-sm border border-primary-light/30 p-3 rounded-xl text-sm font-light">
        Card: {activeCard + 1}/{cards.length}
      </div>
    </div>
  );
};
