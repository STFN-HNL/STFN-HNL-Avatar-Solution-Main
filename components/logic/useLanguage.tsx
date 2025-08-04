"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type SupportedLanguage = 'en' | 'nl' | 'tr' | 'pt' | 'es';

interface LanguageContextType {
  selectedLanguage: SupportedLanguage;
  setSelectedLanguage: (language: SupportedLanguage) => void;
  t: (key: keyof typeof translations['en']) => string;
}

const translations = {
  en: {
    // Language Selector
    selectLanguage: "Select Training Language",
    languageLabel: "Training Language",
    
    // Welcome Card
    welcomeTitle: "Welcome to Sales Training",
    welcomeSubtitle: "Master Real-World Sales Conversations",
    transformSkills: "Transform Your Sales Skills Through Immersive Practice",
    transformDescription: "Experience the most advanced sales training available - practice authentic conversations with AI-powered prospects who respond just like real clients, complete with objections, concerns, and buying signals.",
    
    // Training Features
    whatMakesSpecial: "What Makes This Training Special:",
    realisticInteractions: "Realistic Interactions:",
    realisticDescription: "AI prospects with authentic personalities and genuine business challenges",
    instantFeedback: "Instant Feedback:",
    feedbackDescription: "Detailed performance analysis with specific improvement recommendations",
    safeEnvironment: "Safe Environment:",
    safeDescription: "Practice difficult conversations without real-world consequences",
    skillBuilding: "Skill Building:",
    skillDescription: "Master discovery, objection handling, and closing techniques",
    
    // Call to Action
    readyToBuild: "Ready to build confidence, sharpen your skills, and become a sales professional who consistently closes deals?",
    
    // Meet Jacob Card
    meetPartner: "Meet Your Practice Partner",
    readyToMaster: "Ready to Master Sales Conversations?",
    meetJacob: "Meet Jacob Fischer, owner of Fischer Accounting & Tax Consulting. He's analytical, cost-conscious, and protective of sensitive client data.",
    practiceConversations: "Practice authentic sales conversations that build your confidence and sharpen your objection-handling skills with a realistic business prospect.",
    startJourney: "Start your journey to sales excellence with personalized training scenarios.",
    
    // Objections Card
    expectUnexpected: "Expect the Unexpected",
    masterObjections: "Master the Art of Objection Handling",
    jacobChallenge: "Jacob runs a successful accounting firm, so he'll challenge you just like real prospects do. Here are the types of concerns you can expect:",
    costConcerns: "Cost Concerns:",
    costExample: "\"Your competitors quoted 30% less. Why should I pay more?\"",
    timingObjections: "Timing Objections:",
    timingExample: "\"We just renewed our current contract. Can we revisit this next year?\"",
    trustIssues: "Trust & Authority:",
    trustExample: "\"How do I know your company will still be around in 5 years?\"",
    featureChallenges: "Feature Challenges:",
    featureExample: "\"Your solution seems overly complex for what we need.\"",
    
    // Avatar
    jacobName: "Jacob Fischer",
    jacobCompany: "Fischer Accounting & Tax Consulting",
    aiPartner: "AI Sales Training Partner",
    readyToHelp: "Ready to help you practice your telecom sales pitch",
    startTraining: "Start Training",
    startingAvatar: "Starting Avatar...",
    
    // Continue Button
    continue: "Continue",
    
    // Card 2: Persona Selection
    challengeLevel: "Choose Your Challenge Level",
    whichJacob: "Which Jacob Will You Face Today?",
    jacobAdapts: "Jacob adapts his personality to match the conversations you need to master:",
    cautiousJacob: "• Cautious Jacob - Risk-Averse & Security-Focused",
    cautiousDescription: "Perfect for practicing with compliance-conscious prospects.",
    dominantJacob: "• Dominant Jacob - Hard Negotiator & Price-Focused",
    dominantDescription: "Ideal for building confidence with demanding, price-sensitive prospects.",
    analyticalJacob: "• Analytical Jacob - Data-Driven Decision Maker",
    analyticalDescription: "Great for learning to present compelling ROI and detailed comparisons.",
    chooseStyle: "Choose the style that matches your current learning goals.",
    
    // Card 3: Conversation Flow
    navigatePro: "Navigate Like a Pro",
    roadmapSuccess: "Your Roadmap to Sales Success",
    followProgression: "Follow this natural progression with Jacob:",
    discoveryPhase: "Discovery Phase",
    discoveryDescription: "Ask about his current setup, pain points, and security concerns.",
    solutionPresentation: "Solution Presentation",
    solutionDescription: "Connect your features directly to the problems he described.",
    objectionMastery: "Objection Mastery",
    objectionDescription: "Handle his concerns about cost, security, and reliability authentically.",
    commitmentClose: "Commitment Close",
    commitmentDescription: "Guide the conversation toward next steps and ask for commitment.",
    masterPhases: "Master each phase to become a confident sales professional.",
    
    // Card 4: Common Objections  
    expectUnexpectedTitle: "Expect the Unexpected",
    masterObjectionsTitle: "Master the Art of Objection Handling",
    jacobChallenges: "Jacob runs a successful accounting firm, so he'll challenge you just like real prospects do. Here are the types of concerns you can expect:",
    costConcernsTitle: "Cost Concerns:",
    costExample2: "\"Your competitors quoted 30% less. Why should I pay more?\"",
    securityWorries: "Security Worries:",
    securityExample: "\"One data breach could destroy my firm. How do you guarantee protection?\"",
    reliabilityQuestions: "Reliability Questions:",
    reliabilityExample: "\"What happens if your service goes down during tax season?\"",
    statusQuoBias: "Status Quo Bias:",
    statusQuoExample: "\"My current provider works fine. Why should I switch?\"",
    objectionsAreSignals: "Remember: Objections aren't rejections – they're buying signals. Jacob is telling you exactly what he needs to hear to move forward.",
    
    // Card 5: Best Practices
    conversationExcellence: "Conversation Excellence",
    makeWordsCount: "Make Every Word Count",
    salesNatural: "Great salespeople make conversations feel natural and consultative. Here's how to shine with Jacob:",
    listenActively: "Listen Actively:",
    listenDescription: "When Jacob shares concerns, acknowledge them before responding. Use phrases like \"I understand that's important to you...\"",
    askSmartQuestions: "Ask Smart Questions:",
    questionsDescription: "Go beyond surface-level features. Explore the emotional impact: \"How do you feel when your current system has issues during busy season?\"",
    paintPicture: "Paint the Picture:",
    pictureDescription: "Don't just sell telecom services – sell peace of mind, operational efficiency, and competitive advantage.",
    buildTrust: "Build Trust:",
    trustDescription: "Share relevant examples and demonstrate expertise without overwhelming Jacob with technical jargon.",
    stayProfessional: "Stay professional and confident - help Jacob solve his real business problems.",
    
    // Best Practices Card Details
    listenActivelyTitle: "Listen Actively:",
    listenActivelyDesc: "When Jacob shares concerns, acknowledge them before responding. Use phrases like \"I understand that's important to you...\"",
    askSmartQuestionsTitle: "Ask Smart Questions:",
    askSmartQuestionsDesc: "Go beyond surface-level features. Explore the emotional impact: \"How do you feel when your current system has issues during busy season?\"",
    paintPictureTitle: "Paint the Picture:",
    paintPictureDesc: "Don't just sell telecom services – sell peace of mind, operational efficiency, and competitive advantage.",
    buildTrustTitle: "Build Trust:",
    buildTrustDesc: "Share relevant examples and demonstrate expertise without overwhelming Jacob with technical jargon.",
    
    // Session Management Card Details
    optimalLengthTitle: "Optimal Length:",
    optimalLengthDesc: "Aim for 7-10 meaningful exchanges. This gives you enough time to practice discovery, handle objections, and attempt a close.",
    stayFocusedTitle: "Stay Focused:",
    stayFocusedDesc: "Jacob will stay in character as your prospect. If you need coaching or have questions about sales techniques, save those for after the session.",
    naturalRhythmTitle: "Natural Rhythm:",
    naturalRhythmDesc: "Let the conversation flow naturally. Jacob will pause between responses to give you time to think and respond thoughtfully.",
    takeNotesTitle: "Take Notes:",
    takeNotesDesc: "Keep track of key points and objections during the conversation for better post-session analysis.",
    
    // Feedback Card Details
    specificExamplesDesc: "Each score comes with specific examples from your conversation, plus actionable suggestions for improvement.",
    jacobNoticesDesc: "Jacob notices everything from your questioning technique to how you handle price objections.",
    
    // Troubleshooting Card Details
    unexpectedTurnsDesc: "Sometimes conversations take unexpected turns. Here's how to get back on track:",
    jacobConfusedTitle: "If Jacob seems confused:",
    jacobConfusedDesc: "He might say \"I'm here to evaluate your services, where were we?\" This means you might have slipped into training mode instead of selling mode.",
    needResetTitle: "If you need a reset:",
    needResetDesc: "Simply restart by saying \"START TRAINING\" again. Jacob will begin fresh, ready for another practice round.",
    technicalIssuesTitle: "If technical issues occur:",
    technicalIssuesDesc: "Jacob will acknowledge connection problems and guide you back to where you left off.",
    conversationStallsTitle: "If conversation stalls:",
    conversationStallsDesc: "Ask open-ended questions about Jacob's business challenges to restart meaningful dialogue.",
    realisticProspectDesc: "Remember: Jacob is designed to be a realistic prospect, so some pushback and skepticism is normal and beneficial for your learning.",
    
    // Success Metrics Card Details
    discoveryQuestionsDesc: "You asked discovery questions that uncovered Jacob's specific business challenges",
    handledObjectionsDesc: "You handled his objections with relevant proof points and genuine empathy",
    connectedFeaturesDesc: "You connected features to benefits that mattered to his accounting firm",
    builtRapportDesc: "You built rapport while maintaining professional credibility",
    guidedCommitmentDesc: "You guided toward commitment with natural, non-pushy closing techniques",
    
    // Card 6: Session Management
    keepFlowing: "Keep It Flowing",
    technicalTips: "Technical Tips for Smooth Practice",
    getMostFrom: "To get the most from your practice session:",
    optimalLength: "Optimal Length:",
    lengthDescription: "Aim for 7-10 meaningful exchanges. This gives you enough time to practice discovery, handle objections, and attempt a close.",
    stayFocused: "Stay Focused:",
    focusDescription: "Jacob will stay in character as your prospect. If you need coaching or have questions about sales techniques, save those for after the session.",
    naturalRhythm: "Natural Rhythm:",
    rhythmDescription: "Let the conversation flow naturally. Jacob will pause between responses to give you time to think and respond thoughtfully.",
    takeNotes: "Take Notes:",
    notesDescription: "Keep track of key points and objections during the conversation for better post-session analysis.",
    takeNotesReminder: "Take notes during the conversation - you'll get detailed feedback afterward.",
    
    // Card 7: Feedback
    transformProgress: "Transform Practice into Progress",
    turnGrowth: "Turn Every Session into Growth",
    endTraining: "When you're ready to receive feedback, simply say \"END TRAINING\" and Jacob switches from prospect to sales coach.",
    detailedScoring: "You'll receive detailed scoring across five crucial areas:",
    discoveryAssessment: "Discovery & Needs Assessment",
    objectionHandling: "Objection Handling",
    valueCommunication: "Value Communication",
    relationshipBuilding: "Relationship Building",
    closingTechnique: "Closing Technique",
    specificExamples: "Each score comes with specific examples from your conversation, plus actionable suggestions for improvement.",
    jacobNotices: "Jacob notices everything from your questioning technique to how you handle price objections.",
    
    // Card 8: Troubleshooting
    thingsOffTrack: "When Things Go Off Track",
    keepOnCourse: "Keep Your Practice Session on Course",
    unexpectedTurns: "Sometimes conversations take unexpected turns. Here's how to get back on track:",
    jacobConfused: "If Jacob seems confused:",
    confusedDescription: "He might say \"I'm here to evaluate your services, where were we?\" This means you might have slipped into training mode instead of selling mode.",
    needReset: "If you need a reset:",
    resetDescription: "Simply restart by saying \"START TRAINING\" again. Jacob will begin fresh, ready for another practice round.",
    technicalIssues: "If technical issues occur:",
    technicalDescription: "Jacob will acknowledge connection problems and guide you back to where you left off.",
    conversationStalls: "If conversation stalls:",
    stallsDescription: "Ask open-ended questions about Jacob's business challenges to restart meaningful dialogue.",
    realisticProspect: "Remember: Jacob is designed to be a realistic prospect, so some pushback and skepticism is normal and beneficial for your learning.",
    
    // Card 9: Success Metrics
    measureGrowth: "Measure Your Growth",
    knowWinning: "Know When You're Winning",
    measurableQualities: "Great sales conversations have measurable qualities. Here's what success looks like with Jacob:",
    discoveryQuestions: "You asked discovery questions that uncovered Jacob's specific business challenges",
    handledObjections: "You handled his objections with relevant proof points and genuine empathy",
    connectedFeatures: "You connected features to benefits that mattered to his accounting firm",
    builtRapport: "You built rapport while maintaining professional credibility",
    guidedCommitment: "You guided toward commitment with natural, non-pushy closing techniques",
    masterSkills: "Master these skills here, and you'll excel in the field.",
    
    // Navigation and Setup
    setupSuccess: "Set Yourself Up for Success",
    bestExperience: "For the best training experience, use headphones and ensure you have a stable internet connection. You'll need to allow microphone access when prompted.",
    jacobProcesses: "Jacob processes your responses naturally - just give him 10-15 seconds to reply, just like a real prospect would.",
    conversationData: "Your conversation data is processed securely and not stored permanently. Now you're ready to say \"START TRAINING\" and begin!",
    useMouseWheel: "Use mouse wheel, arrow keys, or click dots to navigate",
    readyToStart: "Ready to start your sales training?",
    
    // Card 2: Meet Your Practice Partner
    meetPracticePartner: "Meet Your Practice Partner",
    readyToMasterSales: "Ready to Master Sales Conversations?",
    meetJacobFischer: "Meet Jacob Fischer, owner of Fischer Accounting & Tax Consulting. He's analytical, cost-conscious, and protective of sensitive client data.",
    practiceAuthentic: "Practice authentic sales conversations that build your confidence and sharpen your objection-handling skills with a realistic business prospect.",
    startJourneyExcellence: "Start your journey to sales excellence with personalized training scenarios.",
    
    // Card 3: Before You Start
    beforeYouStart: "Before You Start",
  },
  
  nl: {
    // Language Selector
    selectLanguage: "Selecteer Trainingstaal",
    languageLabel: "Trainingstaal",
    
    // Welcome Card
    welcomeTitle: "Welkom bij Verkooptraining",
    welcomeSubtitle: "Beheers Echte Verkoopgesprekken",
    transformSkills: "Transformeer Je Verkoopvaardigheden Door Onderdompelende Oefening",
    transformDescription: "Ervaar de meest geavanceerde verkooptraining beschikbaar - oefen authentieke gesprekken met AI-aangedreven prospects die reageren net als echte klanten, compleet met bezwaren, zorgen en koopsignalen.",
    
    // Training Features
    whatMakesSpecial: "Wat Maakt Deze Training Speciaal:",
    realisticInteractions: "Realistische Interacties:",
    realisticDescription: "AI-prospects met authentieke persoonlijkheden en echte zakelijke uitdagingen",
    instantFeedback: "Directe Feedback:",
    feedbackDescription: "Gedetailleerde prestatie-analyse met specifieke verbeteraanbevelingen",
    safeEnvironment: "Veilige Omgeving:",
    safeDescription: "Oefen moeilijke gesprekken zonder gevolgen in de echte wereld",
    skillBuilding: "Vaardigheidsopbouw:",
    skillDescription: "Beheers ontdekking, bezwaarhantering en afsluitingstechnieken",
    
    // Call to Action
    readyToBuild: "Klaar om vertrouwen op te bouwen, je vaardigheden aan te scherpen en een verkoopprofessional te worden die consistent deals sluit?",
    
    // Meet Jacob Card
    meetPartner: "Ontmoet Je Oefenpartner",
    readyToMaster: "Klaar om Verkoopgesprekken te Beheersen?",
    meetJacob: "Ontmoet Jacob Fischer, eigenaar van Fischer Administratie & Belastingadvies. Hij is analytisch, kostenbewust en beschermend over gevoelige klantgegevens.",
    practiceConversations: "Oefen authentieke verkoopgesprekken die je vertrouwen opbouwen en je bezwaarhanteringsvaardigheden aanscherpen met een realistische zakelijke prospect.",
    startJourney: "Begin je reis naar verkoopuitmuntendheid met gepersonaliseerde trainingsscenario's.",
    
    // Objections Card
    expectUnexpected: "Verwacht het Onverwachte",
    masterObjections: "Beheers de Kunst van Bezwaarhantering",
    jacobChallenge: "Jacob runt een succesvol accountantskantoor, dus hij zal je uitdagen net zoals echte prospects doen. Hier zijn de soorten zorgen die je kunt verwachten:",
    costConcerns: "Kostenzorgen:",
    costExample: "\"Je concurrenten boden 30% minder. Waarom zou ik meer betalen?\"",
    timingObjections: "Timing Bezwaren:",
    timingExample: "\"We hebben net ons huidige contract verlengd. Kunnen we dit volgend jaar herbekijken?\"",
    trustIssues: "Vertrouwen & Autoriteit:",
    trustExample: "\"Hoe weet ik dat jouw bedrijf er over 5 jaar nog zal zijn?\"",
    featureChallenges: "Functie Uitdagingen:",
    featureExample: "\"Je oplossing lijkt te complex voor wat we nodig hebben.\"",
    
    // Avatar
    jacobName: "Jacob Fischer",
    jacobCompany: "Fischer Administratie & Belastingadvies",
    aiPartner: "AI Verkooptraining Partner",
    readyToHelp: "Klaar om je te helpen met je telecom verkooppitch oefenen",
    startTraining: "Start Training",
    startingAvatar: "Avatar Starten...",
    
    // Continue Button
    continue: "Doorgaan",
    
    // Card 2: Persona Selection
    challengeLevel: "Kies Je Uitdagingsniveau",
    whichJacob: "Welke Jacob Ga Je Vandaag Tegemoet?",
    jacobAdapts: "Jacob past zijn persoonlijkheid aan om te matchen met de gesprekken die je moet beheersen:",
    cautiousJacob: "• Voorzichtige Jacob - Risicomijdend & Beveiligingsgericht",
    cautiousDescription: "Perfect om te oefenen met compliance-bewuste prospects.",
    dominantJacob: "• Dominante Jacob - Harde Onderhandelaar & Prijsgericht",
    dominantDescription: "Ideaal voor het opbouwen van vertrouwen bij veeleisende, prijsgevoelige prospects.",
    analyticalJacob: "• Analytische Jacob - Data-Gedreven Beslissingsnemer",
    analyticalDescription: "Geweldig voor het leren presenteren van overtuigende ROI en gedetailleerde vergelijkingen.",
    chooseStyle: "Kies de stijl die past bij je huidige leerdoelen.",
    
    // Card 3: Conversation Flow
    navigatePro: "Navigeer Als Een Pro",
    roadmapSuccess: "Je Routekaart naar Verkoopsucces",
    followProgression: "Volg deze natuurlijke progressie met Jacob:",
    discoveryPhase: "Ontdekkingsfase",
    discoveryDescription: "Vraag naar zijn huidige setup, pijnpunten en beveiligingszorgen.",
    solutionPresentation: "Oplossingspresentatie",
    solutionDescription: "Verbind je functies direct met de problemen die hij beschreef.",
    objectionMastery: "Bezwaarhantering Beheersing",
    objectionDescription: "Behandel zijn zorgen over kosten, beveiliging en betrouwbaarheid authentiek.",
    commitmentClose: "Commitment Afsluiting",
    commitmentDescription: "Leid het gesprek naar volgende stappen en vraag om commitment.",
    masterPhases: "Beheers elke fase om een zelfverzekerde verkoopprofessional te worden.",
    
    // Card 4: Common Objections  
    expectUnexpectedTitle: "Verwacht het Onverwachte",
    masterObjectionsTitle: "Beheers de Kunst van Bezwaarhantering",
    jacobChallenges: "Jacob runt een succesvol accountantskantoor, dus hij zal je uitdagen net zoals echte prospects doen. Hier zijn de soorten zorgen die je kunt verwachten:",
    costConcernsTitle: "Kostenzorgen:",
    costExample2: "\"Je concurrenten boden 30% minder. Waarom zou ik meer betalen?\"",
    securityWorries: "Beveiligingszorgen:",
    securityExample: "\"Eén datalek kan mijn firma vernietigen. Hoe garandeer je bescherming?\"",
    reliabilityQuestions: "Betrouwbaarheidsvragen:",
    reliabilityExample: "\"Wat gebeurt er als je service uitvalt tijdens het belastingseizoen?\"",
    statusQuoBias: "Status Quo Bias:",
    statusQuoExample: "\"Mijn huidige provider werkt prima. Waarom zou ik switchen?\"",
    objectionsAreSignals: "Onthoud: Bezwaren zijn geen afwijzingen – het zijn koopsignalen. Jacob vertelt je precies wat hij moet horen om vooruit te gaan.",
    
    // Card 5: Best Practices
    conversationExcellence: "Gesprek Excellentie",
    makeWordsCount: "Laat Elk Woord Tellen",
    salesNatural: "Geweldige verkopers laten gesprekken natuurlijk en consultatief aanvoelen. Zo schitter je met Jacob:",
    listenActively: "Luister Actief:",
    listenDescription: "Wanneer Jacob zorgen deelt, erken ze voordat je reageert. Gebruik zinnen zoals \"Ik begrijp dat dat belangrijk voor je is...\"",
    askSmartQuestions: "Stel Slimme Vragen:",
    questionsDescription: "Ga verder dan oppervlakkige functies. Verken de emotionele impact: \"Hoe voel je je als je huidige systeem problemen heeft tijdens het drukke seizoen?\"",
    paintPicture: "Schilder het Plaatje:",
    pictureDescription: "Verkoop niet alleen telecomdiensten – verkoop gemoedsrust, operationele efficiëntie en concurrentievoordeel.",
    buildTrust: "Bouw Vertrouwen:",
    trustDescription: "Deel relevante voorbeelden en toon expertise zonder Jacob te overweldigen met technisch jargon.",
    stayProfessional: "Blijf professioneel en zelfverzekerd - help Jacob zijn echte zakelijke problemen op te lossen.",
    
    // Best Practices Card Details
    listenActivelyTitle: "Luister Actief:",
    listenActivelyDesc: "Wanneer Jacob zorgen deelt, erken ze voordat je reageert. Gebruik zinnen zoals \"Ik begrijp dat dat belangrijk voor je is...\"",
    askSmartQuestionsTitle: "Stel Slimme Vragen:",
    askSmartQuestionsDesc: "Ga verder dan oppervlakkige functies. Verken de emotionele impact: \"Hoe voel je je als je huidige systeem problemen heeft tijdens het drukke seizoen?\"",
    paintPictureTitle: "Schilder het Plaatje:",
    paintPictureDesc: "Verkoop niet alleen telecomdiensten – verkoop gemoedsrust, operationele efficiëntie en concurrentievoordeel.",
    buildTrustTitle: "Bouw Vertrouwen:",
    buildTrustDesc: "Deel relevante voorbeelden en toon expertise zonder Jacob te overweldigen met technisch jargon.",
    
    // Session Management Card Details
    optimalLengthTitle: "Optimale Lengte:",
    optimalLengthDesc: "Streef naar 7-10 betekenisvolle uitwisselingen. Dit geeft je genoeg tijd om ontdekking te oefenen, bezwaren te behandelen en een afsluiting te proberen.",
    stayFocusedTitle: "Blijf Gefocust:",
    stayFocusedDesc: "Jacob blijft in karakter als je prospect. Als je coaching nodig hebt of vragen hebt over verkooptechnieken, bewaar die voor na de sessie.",
    naturalRhythmTitle: "Natuurlijk Ritme:",
    naturalRhythmDesc: "Laat het gesprek natuurlijk stromen. Jacob zal pauzeren tussen reacties om je tijd te geven om na te denken en doordacht te reageren.",
    takeNotesTitle: "Maak Notities:",
    takeNotesDesc: "Houd belangrijke punten en bezwaren bij tijdens het gesprek voor betere analyse na de sessie.",
    
    // Feedback Card Details
    specificExamplesDesc: "Elke score komt met specifieke voorbeelden uit je gesprek, plus uitvoerbare suggesties voor verbetering.",
    jacobNoticesDesc: "Jacob merkt alles op van je vraagtechniek tot hoe je prijsbezwaren behandelt.",
    
    // Troubleshooting Card Details
    unexpectedTurnsDesc: "Soms nemen gesprekken onverwachte wendingen. Zo kom je terug op het goede spoor:",
    jacobConfusedTitle: "Als Jacob verward lijkt:",
    jacobConfusedDesc: "Hij zou kunnen zeggen \"Ik ben hier om je diensten te evalueren, waar waren we?\" Dit betekent dat je misschien in trainingsmodus bent geglipt in plaats van verkoopmodus.",
    needResetTitle: "Als je een reset nodig hebt:",
    needResetDesc: "Herstart gewoon door opnieuw \"START TRAINING\" te zeggen. Jacob begint opnieuw, klaar voor een nieuwe oefenronde.",
    technicalIssuesTitle: "Bij technische problemen:",
    technicalIssuesDesc: "Jacob erkent verbindingsproblemen en gidst je terug naar waar je gebleven was.",
    conversationStallsTitle: "Als het gesprek stokt:",
    conversationStallsDesc: "Stel open vragen over Jacob's zakelijke uitdagingen om een betekenisvolle dialoog te hervatten.",
    realisticProspectDesc: "Onthoud: Jacob is ontworpen als een realistische prospect, dus wat terugslag en scepsis is normaal en gunstig voor je leren.",
    
    // Success Metrics Card Details
    discoveryQuestionsDesc: "Je stelde ontdekkingsvragen die Jacob's specifieke zakelijke uitdagingen blootlegden",
    handledObjectionsDesc: "Je behandelde zijn bezwaren met relevante bewijspunten en oprechte empathie",
    connectedFeaturesDesc: "Je verbond functies met voordelen die belangrijk waren voor zijn accountantskantoor",
    builtRapportDesc: "Je bouwde rapport op terwijl je professionele geloofwaardigheid behield",
    guidedCommitmentDesc: "Je leidde naar commitment met natuurlijke, niet-opdringerige afsluitingstechnieken",
    
    // Card 6: Session Management
    keepFlowing: "Houd Het Vloeiend",
    technicalTips: "Technische Tips voor Soepele Oefening",
    getMostFrom: "Om het meeste uit je oefensessie te halen:",
    optimalLength: "Optimale Lengte:",
    lengthDescription: "Streef naar 7-10 betekenisvolle uitwisselingen. Dit geeft je genoeg tijd om ontdekking te oefenen, bezwaren te behandelen en een afsluiting te proberen.",
    stayFocused: "Blijf Gefocust:",
    focusDescription: "Jacob blijft in karakter als je prospect. Als je coaching nodig hebt of vragen hebt over verkooptechnieken, bewaar die voor na de sessie.",
    naturalRhythm: "Natuurlijk Ritme:",
    rhythmDescription: "Laat het gesprek natuurlijk stromen. Jacob zal pauzeren tussen reacties om je tijd te geven om na te denken en doordacht te reageren.",
    takeNotes: "Maak Notities:",
    notesDescription: "Houd belangrijke punten en bezwaren bij tijdens het gesprek voor betere analyse na de sessie.",
    takeNotesReminder: "Maak notities tijdens het gesprek - je krijgt achteraf gedetailleerde feedback.",
    
    // Card 7: Feedback
    transformProgress: "Transformeer Oefening naar Vooruitgang",
    turnGrowth: "Maak Elke Sessie tot Groei",
    endTraining: "Wanneer je klaar bent voor feedback, zeg gewoon \"END TRAINING\" en Jacob schakelt over van prospect naar verkoopcoach.",
    detailedScoring: "Je ontvangt gedetailleerde scores in vijf cruciale gebieden:",
    discoveryAssessment: "Ontdekking & Behoeftebeoordeling",
    objectionHandling: "Bezwaarhantering",
    valueCommunication: "Waardecommunicatie",
    relationshipBuilding: "Relatieopbouw",
    closingTechnique: "Afsluitingstechniek",
    specificExamples: "Elke score komt met specifieke voorbeelden uit je gesprek, plus uitvoerbare suggesties voor verbetering.",
    jacobNotices: "Jacob merkt alles op van je vraagtechniek tot hoe je prijsbezwaren behandelt.",
    
    // Card 8: Troubleshooting
    thingsOffTrack: "Wanneer Dingen Ontsporen",
    keepOnCourse: "Houd Je Oefensessie Op Koers",
    unexpectedTurns: "Soms nemen gesprekken onverwachte wendingen. Zo kom je terug op het goede spoor:",
    jacobConfused: "Als Jacob verward lijkt:",
    confusedDescription: "Hij zou kunnen zeggen \"Ik ben hier om je diensten te evalueren, waar waren we?\" Dit betekent dat je misschien in trainingsmodus bent geglipt in plaats van verkoopmodus.",
    needReset: "Als je een reset nodig hebt:",
    resetDescription: "Herstart gewoon door opnieuw \"START TRAINING\" te zeggen. Jacob begint opnieuw, klaar voor een nieuwe oefenronde.",
    technicalIssues: "Bij technische problemen:",
    technicalDescription: "Jacob erkent verbindingsproblemen en gidst je terug naar waar je gebleven was.",
    conversationStalls: "Als het gesprek stokt:",
    stallsDescription: "Stel open vragen over Jacob's zakelijke uitdagingen om een betekenisvolle dialoog te hervatten.",
    realisticProspect: "Onthoud: Jacob is ontworpen als een realistische prospect, dus wat terugslag en scepsis is normaal en gunstig voor je leren.",
    
    // Card 9: Success Metrics
    measureGrowth: "Meet Je Groei",
    knowWinning: "Weet Wanneer Je Wint",
    measurableQualities: "Geweldige verkoopgesprekken hebben meetbare kwaliteiten. Zo ziet succes eruit met Jacob:",
    discoveryQuestions: "Je stelde ontdekkingsvragen die Jacob's specifieke zakelijke uitdagingen blootlegden",
    handledObjections: "Je behandelde zijn bezwaren met relevante bewijspunten en oprechte empathie",
    connectedFeatures: "Je verbond functies met voordelen die belangrijk waren voor zijn accountantskantoor",
    builtRapport: "Je bouwde rapport op terwijl je professionele geloofwaardigheid behield",
    guidedCommitment: "Je leidde naar commitment met natuurlijke, niet-opdringerige afsluitingstechnieken",
    masterSkills: "Beheers deze vaardigheden hier, en je zult uitblinken in het veld.",
    
    // Navigation and Setup
    setupSuccess: "Stel Je In Voor Succes",
    bestExperience: "Voor de beste trainingservaring, gebruik koptelefoon en zorg voor een stabiele internetverbinding. Je moet microfoon toegang toestaan wanneer gevraagd.",
    jacobProcesses: "Jacob verwerkt je reacties natuurlijk - geef hem gewoon 10-15 seconden om te antwoorden, net zoals een echte prospect zou doen.",
    conversationData: "Je gespreksgegevens worden veilig verwerkt en niet permanent opgeslagen. Nu ben je klaar om \"START TRAINING\" te zeggen en te beginnen!",
    useMouseWheel: "Gebruik muiswiel, pijltoetsen, of klik op stippen om te navigeren",
    readyToStart: "Klaar om je verkooptraining te starten?",
    
    // Card 2: Meet Your Practice Partner
    meetPracticePartner: "Ontmoet Je Oefenpartner",
    readyToMasterSales: "Klaar om Verkoopgesprekken te Beheersen?",
    meetJacobFischer: "Ontmoet Jacob Fischer, eigenaar van Fischer Boekhouding & Belastingadvies. Hij is analytisch, kostenbewust en beschermt gevoelige klantgegevens.",
    practiceAuthentic: "Oefen authentieke verkoopgesprekken die je zelfvertrouwen opbouwen en je vaardigheden in bezwaarhantering aanscherpen met een realistische zakelijke prospect.",
    startJourneyExcellence: "Begin je reis naar verkoopexcellentie met gepersonaliseerde trainingsscenario's.",
    
    // Card 3: Before You Start
    beforeYouStart: "Voordat Je Begint",
  },
  
  tr: {
    // Language Selector
    selectLanguage: "Eğitim Dili Seçin",
    languageLabel: "Eğitim Dili",
    
    // Welcome Card
    welcomeTitle: "Satış Eğitimine Hoş Geldiniz",
    welcomeSubtitle: "Gerçek Satış Konuşmalarında Ustalaşın",
    transformSkills: "Sürükleyici Uygulama ile Satış Becerilerinizi Dönüştürün",
    transformDescription: "Mevcut en gelişmiş satış eğitimini deneyimleyin - gerçek müşteriler gibi tepki veren, itirazlar, endişeler ve satın alma sinyalleri ile tamamlanmış AI destekli potansiyel müşterilerle otantik konuşmalar yapın.",
    
    // Training Features
    whatMakesSpecial: "Bu Eğitimi Özel Kılan Nedir:",
    realisticInteractions: "Gerçekçi Etkileşimler:",
    realisticDescription: "Otantik kişilikler ve gerçek iş zorluklarına sahip AI potansiyel müşteriler",
    instantFeedback: "Anında Geri Bildirim:",
    feedbackDescription: "Belirli iyileştirme önerileri ile detaylı performans analizi",
    safeEnvironment: "Güvenli Ortam:",
    safeDescription: "Gerçek dünya sonuçları olmadan zor konuşmalarda pratik yapın",
    skillBuilding: "Beceri Geliştirme:",
    skillDescription: "Keşif, itiraz yönetimi ve kapanış tekniklerinde ustalaşın",
    
    // Call to Action
    readyToBuild: "Güven oluşturmaya, becerilerinizi geliştirmeye ve sürekli anlaşma kapatan bir satış profesyoneli olmaya hazır mısınız?",
    
    // Meet Jacob Card
    meetPartner: "Pratik Partnerinizle Tanışın",
    readyToMaster: "Satış Konuşmalarında Ustalaşmaya Hazır mısınız?",
    meetJacob: "Fischer Muhasebe ve Vergi Danışmanlığı sahibi Jacob Fischer ile tanışın. Analitik, maliyet bilincine sahip ve hassas müşteri verilerini koruyucu.",
    practiceConversations: "Gerçekçi bir iş potansiyeli ile güveninizi artıran ve itiraz yönetimi becerilerinizi geliştiren otantik satış konuşmaları yapın.",
    startJourney: "Kişiselleştirilmiş eğitim senaryoları ile satış mükemmelliği yolculuğunuza başlayın.",
    
    // Objections Card
    expectUnexpected: "Beklenmedik Olanı Bekleyin",
    masterObjections: "İtiraz Yönetimi Sanatında Ustalaşın",
    jacobChallenge: "Jacob başarılı bir muhasebe firması işletiyor, bu nedenle gerçek potansiyel müşteriler gibi sizi zorlayacak. Beklememiz gereken endişe türleri şunlardır:",
    costConcerns: "Maliyet Endişeleri:",
    costExample: "\"Rakipleriniz %30 daha az teklif verdi. Neden daha fazla ödeyeyim?\"",
    timingObjections: "Zamanlama İtirazları:",
    timingExample: "\"Mevcut sözleşmemizi yeni yeniledik. Bunu gelecek yıl tekrar gözden geçirebilir miyiz?\"",
    trustIssues: "Güven ve Otorite:",
    trustExample: "\"Şirketinizin 5 yıl sonra hala var olacağını nasıl bilebilirim?\"",
    featureChallenges: "Özellik Zorlukları:",
    featureExample: "\"Çözümünüz ihtiyacımız olandan çok karmaşık görünüyor.\"",
    
    // Avatar
    jacobName: "Jacob Fischer",
    jacobCompany: "Fischer Muhasebe ve Vergi Danışmanlığı",
    aiPartner: "AI Satış Eğitimi Partneri",
    readyToHelp: "Telecom satış sunumunuzda pratik yapmanıza yardım etmeye hazır",
    startTraining: "Eğitimi Başlat",
    startingAvatar: "Avatar Başlatılıyor...",
    
    // Continue Button
    continue: "Devam Et",
    
    // Card 2: Persona Selection
    challengeLevel: "Zorluk Seviyenizi Seçin",
    whichJacob: "Bugün Hangi Jacob ile Karşılaşacaksınız?",
    jacobAdapts: "Jacob, ustalaşmanız gereken konuşmalara uyum sağlamak için kişiliğini adapte eder:",
    cautiousJacob: "• Temkinli Jacob - Risk Almayan & Güvenlik Odaklı",
    cautiousDescription: "Uyumluluk bilincine sahip potansiyel müşterilerle pratik yapmak için mükemmel.",
    dominantJacob: "• Baskın Jacob - Sert Pazarlıkçı & Fiyat Odaklı",
    dominantDescription: "Zorlu, fiyat hassasiyeti olan potansiyel müşterilerle güven oluşturmak için ideal.",
    analyticalJacob: "• Analitik Jacob - Veri Odaklı Karar Verici",
    analyticalDescription: "Etkileyici ROI ve detaylı karşılaştırmalar sunmayı öğrenmek için harika.",
    chooseStyle: "Mevcut öğrenme hedeflerinize uygun stili seçin.",
    
    // Card 3: Conversation Flow
    navigatePro: "Profesyonel Gibi Gezinin",
    roadmapSuccess: "Satış Başarısına Yol Haritanız",
    followProgression: "Jacob ile bu doğal ilerlemeyi takip edin:",
    discoveryPhase: "Keşif Aşaması",
    discoveryDescription: "Mevcut kurulumu, sorun noktaları ve güvenlik endişeleri hakkında soru sorun.",
    solutionPresentation: "Çözüm Sunumu",
    solutionDescription: "Özelliklerinizi tarif ettiği problemlerle doğrudan bağlayın.",
    objectionMastery: "İtiraz Ustalığı",
    objectionDescription: "Maliyet, güvenlik ve güvenilirlik konusundaki endişelerini otantik şekilde ele alın.",
    commitmentClose: "Bağlılık Kapanışı",
    commitmentDescription: "Konuşmayı sonraki adımlara yönlendirin ve bağlılık isteyin.",
    masterPhases: "Özgüvenli bir satış profesyoneli olmak için her aşamayı ustalaşın.",
    
    // Card 4: Common Objections  
    expectUnexpectedTitle: "Beklenmedik Olanı Bekleyin",
    masterObjectionsTitle: "İtiraz Yönetimi Sanatında Ustalaşın",
    jacobChallenges: "Jacob başarılı bir muhasebe firması işletiyor, bu nedenle gerçek potansiyel müşteriler gibi sizi zorlayacak. Beklememiz gereken endişe türleri şunlardır:",
    costConcernsTitle: "Maliyet Endişeleri:",
    costExample2: "\"Rakipleriniz %30 daha az teklif verdi. Neden daha fazla ödeyeyim?\"",
    securityWorries: "Güvenlik Endişeleri:",
    securityExample: "\"Bir veri ihlali firmamı yok edebilir. Korumayı nasıl garanti ediyorsunuz?\"",
    reliabilityQuestions: "Güvenilirlik Soruları:",
    reliabilityExample: "\"Vergi sezonu sırasında hizmetiniz çökerse ne olur?\"",
    statusQuoBias: "Statüko Önyargısı:",
    statusQuoExample: "\"Mevcut sağlayıcım gayet iyi çalışıyor. Neden değiştireyim?\"",
    objectionsAreSignals: "Unutmayın: İtirazlar ret değildir - satın alma sinyalleridir. Jacob size ilerlemek için tam olarak neyi duyması gerektiğini söylüyor.",
    
    // Card 5: Best Practices
    conversationExcellence: "Konuşma Mükemmelliği",
    makeWordsCount: "Her Kelimenizi Değerli Kılın",
    salesNatural: "Harika satış elemanları konuşmaları doğal ve danışmanlık odaklı hissettirir. Jacob ile nasıl parlayacağınız:",
    listenActively: "Aktif Dinleyin:",
    listenDescription: "Jacob endişelerini paylaştığında, yanıtlamadan önce onları kabul edin. \"Bunun sizin için önemli olduğunu anlıyorum...\" gibi ifadeler kullanın",
    askSmartQuestions: "Akıllı Sorular Sorun:",
    questionsDescription: "Yüzeysel özelliklerden öteye gidin. Duygusal etkiyi keşfedin: \"Mevcut sisteminiz yoğun sezonda sorun yaşadığında nasıl hissediyorsunuz?\"",
    paintPicture: "Resmi Çizin:",
    pictureDescription: "Sadece telecom hizmetleri satmayın - huzur, operasyonel verimlilik ve rekabet avantajı satın.",
    buildTrust: "Güven Oluşturun:",
    trustDescription: "Jacob'u teknik jargonla bunaltmadan ilgili örnekleri paylaşın ve uzmanlığı gösterin.",
    stayProfessional: "Profesyonel ve özgüvenli kalın - Jacob'un gerçek iş problemlerini çözmesine yardım edin.",
    
    // Best Practices Card Details
    listenActivelyTitle: "Aktif Dinleyin:",
    listenActivelyDesc: "Jacob endişelerini paylaştığında, yanıtlamadan önce onları kabul edin. \"Bunun sizin için önemli olduğunu anlıyorum...\" gibi ifadeler kullanın",
    askSmartQuestionsTitle: "Akıllı Sorular Sorun:",
    askSmartQuestionsDesc: "Yüzeysel özelliklerden öteye gidin. Duygusal etkiyi keşfedin: \"Mevcut sisteminiz yoğun sezonda sorun yaşadığında nasıl hissediyorsunuz?\"",
    paintPictureTitle: "Resmi Çizin:",
    paintPictureDesc: "Sadece telecom hizmetleri satmayın - huzur, operasyonel verimlilik ve rekabet avantajı satın.",
    buildTrustTitle: "Güven Oluşturun:",
    buildTrustDesc: "Jacob'u teknik jargonla bunaltmadan ilgili örnekleri paylaşın ve uzmanlığı gösterin.",
    
    // Session Management Card Details
    optimalLengthTitle: "Optimal Uzunluk:",
    optimalLengthDesc: "7-10 anlamlı değişim hedefleyin. Bu size keşif yapmak, itirazları ele almak ve kapanış denemek için yeterli zaman verir.",
    stayFocusedTitle: "Odaklanın:",
    stayFocusedDesc: "Jacob potansiyel müşteri karakterinde kalacak. Koçluk ihtiyacınız varsa veya satış teknikleri hakkında sorularınız varsa, bunları seans sonrasına saklayın.",
    naturalRhythmTitle: "Doğal Ritim:",
    naturalRhythmDesc: "Konuşmanın doğal akmasına izin verin. Jacob yanıtlar arasında duraklayacak ve size düşünme ve dikkatlice yanıtlama zamanı verecek.",
    takeNotesTitle: "Not Alın:",
    takeNotesDesc: "Daha iyi seans sonrası analiz için konuşma sırasında önemli noktaları ve itirazları takip edin.",
    
    // Feedback Card Details
    specificExamplesDesc: "Her puan konuşmanızdan spesifik örneklerle birlikte, artı uygulanabilir iyileştirme önerileri gelir.",
    jacobNoticesDesc: "Jacob soru tekniğinizden fiyat itirazlarını nasıl ele aldığınıza kadar her şeyi fark eder.",
    
    // Troubleshooting Card Details
    unexpectedTurnsDesc: "Bazen konuşmalar beklenmedik yönler alır. Nasıl geri döneriz:",
    jacobConfusedTitle: "Jacob kafası karışmış görünüyorsa:",
    jacobConfusedDesc: "\"Hizmetlerinizi değerlendirmek için buradayım, neredeydi?\" diyebilir. Bu, satış modu yerine eğitim moduna geçmiş olabileceğiniz anlamına gelir.",
    needResetTitle: "Sıfırlama ihtiyacınız varsa:",
    needResetDesc: "Sadece tekrar \"START TRAINING\" diyerek yeniden başlayın. Jacob taze başlayacak, başka bir uygulama turu için hazır.",
    technicalIssuesTitle: "Teknik sorunlar oluşursa:",
    technicalIssuesDesc: "Jacob bağlantı problemlerini kabul edecek ve sizi kaldığınız yerden yönlendirecek.",
    conversationStallsTitle: "Konuşma durgunlaşırsa:",
    conversationStallsDesc: "Anlamlı diyalogu yeniden başlatmak için Jacob'un iş zorluklarıyla ilgili açık uçlu sorular sorun.",
    realisticProspectDesc: "Unutmayın: Jacob gerçekçi bir potansiyel müşteri olarak tasarlandı, bu nedenle bazı tereddüt ve şüphecilik normaldir ve öğreniminiz için faydalıdır.",
    
    // Success Metrics Card Details
    discoveryQuestionsDesc: "Jacob'un spesifik iş zorluklarını ortaya çıkaran keşif soruları sordunuz",
    handledObjectionsDesc: "İtirazlarını ilgili kanıt noktaları ve gerçek empatiyle ele aldınız",
    connectedFeaturesDesc: "Özellikleri muhasebe firması için önemli olan faydalarla bağladınız",
    builtRapportDesc: "Profesyonel güvenilirliği korurken rapport kurdunuz",
    guidedCommitmentDesc: "Doğal, zorlamayan kapanış teknikleriyle bağlılığa yönlendirdiniz",
    
    // Card 6: Session Management
    keepFlowing: "Akışı Koruyun",
    technicalTips: "Düzgün Uygulama için Teknik İpuçları",
    getMostFrom: "Uygulama seansınızdan en iyi verimi almak için:",
    optimalLength: "Optimal Uzunluk:",
    lengthDescription: "7-10 anlamlı değişim hedefleyin. Bu size keşif yapmak, itirazları ele almak ve kapanış denemek için yeterli zaman verir.",
    stayFocused: "Odaklanın:",
    focusDescription: "Jacob potansiyel müşteri karakterinde kalacak. Koçluk ihtiyacınız varsa veya satış teknikleri hakkında sorularınız varsa, bunları seans sonrasına saklayın.",
    naturalRhythm: "Doğal Ritim:",
    rhythmDescription: "Konuşmanın doğal akmasına izin verin. Jacob yanıtlar arasında duraklayacak ve size düşünme ve dikkatlice yanıtlama zamanı verecek.",
    takeNotes: "Not Alın:",
    notesDescription: "Daha iyi seans sonrası analiz için konuşma sırasında önemli noktaları ve itirazları takip edin.",
    takeNotesReminder: "Konuşma sırasında not alın - sonrasında detaylı geri bildirim alacaksınız.",
    
    // Card 7: Feedback
    transformProgress: "Uygulamayı İlerlemeye Dönüştürün",
    turnGrowth: "Her Seansı Büyümeye Çevirin",
    endTraining: "Geri bildirim almaya hazır olduğunuzda, sadece \"END TRAINING\" deyin ve Jacob potansiyel müşteriden satış koçuna geçer.",
    detailedScoring: "Beş kritik alanda detaylı puanlama alacaksınız:",
    discoveryAssessment: "Keşif & İhtiyaç Değerlendirmesi",
    objectionHandling: "İtiraz Yönetimi",
    valueCommunication: "Değer İletişimi",
    relationshipBuilding: "İlişki Kurma",
    closingTechnique: "Kapanış Tekniği",
    specificExamples: "Her puan konuşmanızdan spesifik örneklerle birlikte, artı uygulanabilir iyileştirme önerileri gelir.",
    jacobNotices: "Jacob soru tekniğinizden fiyat itirazlarını nasıl ele aldığınıza kadar her şeyi fark eder.",
    
    // Card 8: Troubleshooting
    thingsOffTrack: "İşler Raydan Çıktığında",
    keepOnCourse: "Uygulama Seansınızı Rotada Tutun",
    unexpectedTurns: "Bazen konuşmalar beklenmedik yönler alır. Nasıl geri döneriz:",
    jacobConfused: "Jacob kafası karışmış görünüyorsa:",
    confusedDescription: "\"Hizmetlerinizi değerlendirmek için buradayım, neredeydi?\" diyebilir. Bu, satış modu yerine eğitim moduna geçmiş olabileceğiniz anlamına gelir.",
    needReset: "Sıfırlama ihtiyacınız varsa:",
    resetDescription: "Sadece tekrar \"START TRAINING\" diyerek yeniden başlayın. Jacob taze başlayacak, başka bir uygulama turu için hazır.",
    technicalIssues: "Teknik sorunlar oluşursa:",
    technicalDescription: "Jacob bağlantı problemlerini kabul edecek ve sizi kaldığınız yerden yönlendirecek.",
    conversationStalls: "Konuşma durgunlaşırsa:",
    stallsDescription: "Anlamlı diyalogu yeniden başlatmak için Jacob'un iş zorluklarıyla ilgili açık uçlu sorular sorun.",
    realisticProspect: "Unutmayın: Jacob gerçekçi bir potansiyel müşteri olarak tasarlandı, bu nedenle bazı tereddüt ve şüphecilik normaldir ve öğreniminiz için faydalıdır.",
    
    // Card 9: Success Metrics
    measureGrowth: "Büyümenizi Ölçün",
    knowWinning: "Ne Zaman Kazandığınızı Bilin",
    measurableQualities: "Harika satış konuşmaları ölçülebilir niteliklere sahiptir. Jacob ile başarının görünümü:",
    discoveryQuestions: "Jacob'un spesifik iş zorluklarını ortaya çıkaran keşif soruları sordunuz",
    handledObjections: "İtirazlarını ilgili kanıt noktaları ve gerçek empatiyle ele aldınız",
    connectedFeatures: "Özellikleri muhasebe firması için önemli olan faydalarla bağladınız",
    builtRapport: "Profesyonel güvenilirliği korurken rapport kurdunuz",
    guidedCommitment: "Doğal, zorlamayan kapanış teknikleriyle bağlılığa yönlendirdiniz",
    masterSkills: "Bu becerilerde burada ustalaşın, sahada mükemmel olun.",
    
    // Navigation and Setup
    setupSuccess: "Kendinizi Başarıya Hazırlayın",
    bestExperience: "En iyi eğitim deneyimi için kulaklık kullanın ve kararlı internet bağlantınız olduğundan emin olun. İstendiğinde mikrofon erişimine izin vermeniz gerekecek.",
    jacobProcesses: "Jacob yanıtlarınızı doğal olarak işler - sadece ona 10-15 saniye yanıt vermesi için zaman verin, tıpkı gerçek bir potansiyel müşterinin yapacağı gibi.",
    conversationData: "Konuşma verileriniz güvenli şekilde işlenir ve kalıcı olarak saklanmaz. Artık \"START TRAINING\" demeye ve başlamaya hazırsınız!",
    useMouseWheel: "Gezinmek için fare tekerleği, ok tuşları veya noktalara tıklama kullanın",
    readyToStart: "Satış eğitiminizi başlatmaya hazır mısınız?",
    
    // Card 2: Meet Your Practice Partner
    meetPracticePartner: "Uygulama Ortağınızla Tanışın",
    readyToMasterSales: "Satış Konuşmalarında Ustalaşmaya Hazır mısınız?",
    meetJacobFischer: "Fischer Muhasebe ve Vergi Danışmanlığı'nın sahibi Jacob Fischer ile tanışın. Analitik, maliyet bilincine sahip ve hassas müşteri verilerini korumaya odaklı.",
    practiceAuthentic: "Gerçekçi bir iş potansiyeli ile güveninizi artıran ve itiraz yönetimi becerilerinizi geliştiren otantik satış konuşmaları yapın.",
    startJourneyExcellence: "Kişiselleştirilmiş eğitim senaryolarıyla satış mükemmelliği yolculuğunuza başlayın.",
    
    // Card 3: Before You Start
    beforeYouStart: "Başlamadan Önce",
  },
  
  pt: {
    // Language Selector
    selectLanguage: "Selecionar Idioma de Treinamento",
    languageLabel: "Idioma de Treinamento",
    
    // Welcome Card
    welcomeTitle: "Bem-vindo ao Treinamento de Vendas",
    welcomeSubtitle: "Domine Conversas de Vendas do Mundo Real",
    transformSkills: "Transforme Suas Habilidades de Vendas Através da Prática Imersiva",
    transformDescription: "Experimente o treinamento de vendas mais avançado disponível - pratique conversas autênticas com prospects alimentados por IA que respondem como clientes reais, completas com objeções, preocupações e sinais de compra.",
    
    // Training Features
    whatMakesSpecial: "O Que Torna Este Treinamento Especial:",
    realisticInteractions: "Interações Realistas:",
    realisticDescription: "Prospects de IA com personalidades autênticas e desafios empresariais genuínos",
    instantFeedback: "Feedback Instantâneo:",
    feedbackDescription: "Análise detalhada de desempenho com recomendações específicas de melhoria",
    safeEnvironment: "Ambiente Seguro:",
    safeDescription: "Pratique conversas difíceis sem consequências do mundo real",
    skillBuilding: "Desenvolvimento de Habilidades:",
    skillDescription: "Domine descoberta, tratamento de objeções e técnicas de fechamento",
    
    // Call to Action
    readyToBuild: "Pronto para construir confiança, aprimorar suas habilidades e se tornar um profissional de vendas que fecha negócios consistentemente?",
    
    // Meet Jacob Card
    meetPartner: "Conheça Seu Parceiro de Prática",
    readyToMaster: "Pronto para Dominar Conversas de Vendas?",
    meetJacob: "Conheça Jacob Fischer, proprietário da Fischer Contabilidade e Consultoria Tributária. Ele é analítico, consciente de custos e protetor de dados sensíveis de clientes.",
    practiceConversations: "Pratique conversas autênticas de vendas que constroem sua confiança e aprimoram suas habilidades de tratamento de objeções com um prospect empresarial realista.",
    startJourney: "Inicie sua jornada para a excelência em vendas com cenários de treinamento personalizados.",
    
    // Objections Card
    expectUnexpected: "Espere o Inesperado",
    masterObjections: "Domine a Arte do Tratamento de Objeções",
    jacobChallenge: "Jacob administra uma empresa de contabilidade bem-sucedida, então ele vai desafiá-lo assim como prospects reais fazem. Aqui estão os tipos de preocupações que você pode esperar:",
    costConcerns: "Preocupações com Custo:",
    costExample: "\"Seus concorrentes cotaram 30% menos. Por que eu deveria pagar mais?\"",
    timingObjections: "Objeções de Timing:",
    timingExample: "\"Acabamos de renovar nosso contrato atual. Podemos revisar isso no próximo ano?\"",
    trustIssues: "Confiança e Autoridade:",
    trustExample: "\"Como sei que sua empresa ainda existirá em 5 anos?\"",
    featureChallenges: "Desafíos de Recursos:",
    featureExample: "\"Sua solução parece excessivamente complexa para o que precisamos.\"",
    
    // Avatar
    jacobName: "Jacob Fischer",
    jacobCompany: "Fischer Contabilidade e Consultoria Tributária",
    aiPartner: "Parceiro de Treinamento de Vendas IA",
    readyToHelp: "Pronto para ajudá-lo a praticar seu pitch de vendas de telecom",
    startTraining: "Iniciar Treinamento",
    startingAvatar: "Iniciando Avatar...",
    
    // Continue Button
    continue: "Continuar",
    
    // Card 2: Persona Selection
    challengeLevel: "Escolha Seu Nível de Desafio",
    whichJacob: "Qual Jacob Você Enfrentará Hoje?",
    jacobAdapts: "Jacob adapta sua personalidade para combinar com as conversas que você precisa dominar:",
    cautiousJacob: "• Jacob Cauteloso - Avesso ao Risco & Focado em Segurança",
    cautiousDescription: "Perfeito para praticar com prospects conscientes de conformidade.",
    dominantJacob: "• Jacob Dominante - Negociador Rigoroso & Focado em Preço",
    dominantDescription: "Ideal para construir confiança com prospects exigentes e sensíveis ao preço.",
    analyticalJacob: "• Jacob Analítico - Tomador de Decisão Orientado por Dados",
    analyticalDescription: "Ótimo para aprender a apresentar ROI convincente e comparações detalhadas.",
    chooseStyle: "Escolha o estilo que combina com seus objetivos de aprendizado atuais.",
    
    // Card 3: Conversation Flow
    navigatePro: "Navegue Como um Profissional",
    roadmapSuccess: "Seu Roteiro para o Sucesso em Vendas",
    followProgression: "Siga esta progressão natural com Jacob:",
    discoveryPhase: "Fase de Descoberta",
    discoveryDescription: "Pergunte sobre sua configuração atual, pontos de dor e preocupações de segurança.",
    solutionPresentation: "Apresentação da Solução",
    solutionDescription: "Conecte suas funcionalidades diretamente aos problemas que ele descreveu.",
    objectionMastery: "Maestria em Objeções",
    objectionDescription: "Lide com suas preocupações sobre custo, segurança e confiabilidade de forma autêntica.",
    commitmentClose: "Fechamento de Compromisso",
    commitmentDescription: "Guie a conversa em direção aos próximos passos e peça compromisso.",
    masterPhases: "Domine cada fase para se tornar um profissional de vendas confiante.",
    
    // Card 4: Common Objections  
    expectUnexpectedTitle: "Espere o Inesperado",
    masterObjectionsTitle: "Domine a Arte do Tratamento de Objeções",
    jacobChallenges: "Jacob administra uma empresa de contabilidade bem-sucedida, então ele vai desafiá-lo assim como prospects reais fazem. Aqui estão os tipos de preocupações que você pode esperar:",
    costConcernsTitle: "Preocupações com Custo:",
    costExample2: "\"Seus concorrentes cotaram 30% menos. Por que eu deveria pagar mais?\"",
    securityWorries: "Preocupações de Segurança:",
    securityExample: "\"Uma violação de dados poderia destruir minha empresa. Como você garante proteção?\"",
    reliabilityQuestions: "Questões de Confiabilidade:",
    reliabilityExample: "\"O que acontece se seu serviço cair durante a temporada de impostos?\"",
    statusQuoBias: "Viés do Status Quo:",
    statusQuoExample: "\"Meu provedor atual funciona bem. Por que eu deveria mudar?\"",
    objectionsAreSignals: "Lembre-se: Objeções não são rejeições – são sinais de compra. Jacob está te dizendo exatamente o que ele precisa ouvir para seguir em frente.",
    
    // Card 5: Best Practices
    conversationExcellence: "Excelência em Conversação",
    makeWordsCount: "Faça Cada Palavra Contar",
    salesNatural: "Grandes vendedores fazem conversas parecerem naturais e consultivas. Aqui está como brilhar com Jacob:",
    listenActively: "Ouça Ativamente:",
    listenDescription: "Quando Jacob compartilha preocupações, reconheça-as antes de responder. Use frases como \"Entendo que isso é importante para você...\"",
    askSmartQuestions: "Faça Perguntas Inteligentes:",
    questionsDescription: "Vá além de funcionalidades superficiais. Explore o impacto emocional: \"Como você se sente quando seu sistema atual tem problemas durante a temporada movimentada?\"",
    paintPicture: "Pinte o Quadro:",
    pictureDescription: "Não venda apenas serviços de telecom – venda tranquilidade, eficiência operacional e vantagem competitiva.",
    buildTrust: "Construa Confiança:",
    trustDescription: "Compartilhe exemplos relevantes e demonstre expertise sem sobrecarregar Jacob com jargão técnico.",
    stayProfessional: "Mantenha-se profissional e confiante - ajude Jacob a resolver seus problemas empresariais reais.",
    
    // Best Practices Card Details
    listenActivelyTitle: "Ouça Ativamente:",
    listenActivelyDesc: "Quando Jacob compartilha preocupações, reconheça-as antes de responder. Use frases como \"Entendo que isso é importante para você...\"",
    askSmartQuestionsTitle: "Faça Perguntas Inteligentes:",
    askSmartQuestionsDesc: "Vá além de funcionalidades superficiais. Explore o impacto emocional: \"Como você se sente quando seu sistema atual tem problemas durante a temporada movimentada?\"",
    paintPictureTitle: "Pinte o Quadro:",
    paintPictureDesc: "Não venda apenas serviços de telecom – venda tranquilidade, eficiência operacional e vantagem competitiva.",
    buildTrustTitle: "Construa Confiança:",
    buildTrustDesc: "Compartilhe exemplos relevantes e demonstre expertise sem sobrecarregar Jacob com jargão técnico.",
    
    // Session Management Card Details
    optimalLengthTitle: "Duração Ideal:",
    optimalLengthDesc: "Mire em 7-10 trocas significativas. Isso te dá tempo suficiente para praticar descoberta, lidar com objeções e tentar um fechamento.",
    stayFocusedTitle: "Mantenha o Foco:",
    stayFocusedDesc: "Jacob permanecerá no personagem como seu prospect. Se você precisar de coaching ou tiver perguntas sobre técnicas de vendas, guarde-as para depois da sessão.",
    naturalRhythmTitle: "Ritmo Natural:",
    naturalRhythmDesc: "Deixe a conversa fluir naturalmente. Jacob pausará entre respostas para te dar tempo de pensar e responder cuidadosamente.",
    takeNotesTitle: "Faça Anotações:",
    takeNotesDesc: "Acompanhe pontos-chave e objeções durante a conversa para melhor análise pós-sessão.",
    
    // Feedback Card Details
    specificExamplesDesc: "Cada pontuação vem com exemplos específicos de sua conversa, além de sugestões acionáveis para melhoria.",
    jacobNoticesDesc: "Jacob percebe tudo, desde sua técnica de questionamento até como você lida com objeções de preço.",
    
    // Troubleshooting Card Details
    unexpectedTurnsDesc: "Às vezes conversas tomam rumos inesperados. Aqui está como voltar aos trilhos:",
    jacobConfusedTitle: "Se Jacob parecer confuso:",
    jacobConfusedDesc: "Ele pode dizer \"Estou aqui para avaliar seus serviços, onde estávamos?\" Isso significa que você pode ter escorregado para o modo treino em vez do modo venda.",
    needResetTitle: "Se você precisar de um reset:",
    needResetDesc: "Simplesmente reinicie dizendo \"START TRAINING\" novamente. Jacob começará fresco, pronto para outra rodada de prática.",
    technicalIssuesTitle: "Se problemas técnicos ocorrerem:",
    technicalIssuesDesc: "Jacob reconhecerá problemas de conexão e te guiará de volta para onde parou.",
    conversationStallsTitle: "Se a conversa emperrar:",
    conversationStallsDesc: "Faça perguntas abertas sobre os desafios empresariais de Jacob para reiniciar diálogo significativo.",
    realisticProspectDesc: "Lembre-se: Jacob é projetado para ser um prospecto realista, então alguma resistência e ceticismo é normal e benéfico para seu aprendizado.",
    
    // Success Metrics Card Details
    discoveryQuestionsDesc: "Você fez perguntas de descoberta que revelaram os desafios empresariais específicos de Jacob",
    handledObjectionsDesc: "Você lidou com suas objeções com pontos de prova relevantes e empatia genuína",
    connectedFeaturesDesc: "Você conectou funcionalidades a benefícios que importavam para sua empresa de contabilidade",
    builtRapportDesc: "Você construiu rapport mantendo credibilidade profissional",
    guidedCommitmentDesc: "Você guiou em direção ao compromisso com técnicas de fechamento naturais e não forçadas",
    
    // Card 6: Session Management
    keepFlowing: "Mantenha o Fluxo",
    technicalTips: "Dicas Técnicas para Prática Suave",
    getMostFrom: "Para obter o máximo de sua sessão de prática:",
    optimalLength: "Duração Ideal:",
    lengthDescription: "Mire em 7-10 trocas significativas. Isso te dá tempo suficiente para praticar descoberta, lidar com objeções e tentar um fechamento.",
    stayFocused: "Mantenha o Foco:",
    focusDescription: "Jacob permanecerá no personagem como seu prospect. Se você precisar de coaching ou tiver perguntas sobre técnicas de vendas, guarde-as para depois da sessão.",
    naturalRhythm: "Ritmo Natural:",
    rhythmDescription: "Deixe a conversa fluir naturalmente. Jacob pausará entre respostas para te dar tempo de pensar e responder cuidadosamente.",
    takeNotes: "Faça Anotações:",
    notesDescription: "Acompanhe pontos-chave e objeções durante a conversa para melhor análise pós-sessão.",
    takeNotesReminder: "Faça anotações durante a conversa - você receberá feedback detalhado depois.",
    
    // Card 7: Feedback
    transformProgress: "Transforme Prática em Progresso",
    turnGrowth: "Transforme Cada Sessão em Crescimento",
    endTraining: "Quando estiver pronto para receber feedback, simplesmente diga \"END TRAINING\" e Jacob muda de prospecto para coach de vendas.",
    detailedScoring: "Você receberá pontuação detalhada em cinco áreas cruciais:",
    discoveryAssessment: "Descoberta & Avaliação de Necessidades",
    objectionHandling: "Tratamento de Objeções",
    valueCommunication: "Comunicação de Valor",
    relationshipBuilding: "Construção de Relacionamento",
    closingTechnique: "Técnica de Fechamento",
    specificExamples: "Cada pontuação vem com exemplos específicos de sua conversa, além de sugestões acionáveis para melhoria.",
    jacobNotices: "Jacob percebe tudo, desde sua técnica de questionamento até como você lida com objeções de preço.",
    
    // Card 8: Troubleshooting
    thingsOffTrack: "Quando as Coisas Saem dos Trilhos",
    keepOnCourse: "Mantenha Sua Sessão de Prática no Curso",
    unexpectedTurns: "Às vezes conversas tomam rumos inesperados. Aqui está como voltar aos trilhos:",
    jacobConfused: "Se Jacob parecer confuso:",
    confusedDescription: "Ele pode dizer \"Estou aqui para avaliar seus serviços, onde estávamos?\" Isso significa que você pode ter escorregado para o modo treino em vez do modo venda.",
    needReset: "Se você precisar de um reset:",
    resetDescription: "Simplesmente reinicie dizendo \"START TRAINING\" novamente. Jacob começará fresco, pronto para outra rodada de prática.",
    technicalIssues: "Se problemas técnicos ocorrerem:",
    technicalDescription: "Jacob reconhecerá problemas de conexão e te guiará de volta para onde parou.",
    conversationStalls: "Se a conversa emperrar:",
    stallsDescription: "Faça perguntas abertas sobre os desafios empresariais de Jacob para reiniciar diálogo significativo.",
    realisticProspect: "Lembre-se: Jacob é projetado para ser um prospecto realista, então alguma resistência e ceticismo é normal e benéfico para seu aprendizado.",
    
    // Card 9: Success Metrics
    measureGrowth: "Meça Seu Crescimento",
    knowWinning: "Saiba Quando Está Ganhando",
    measurableQualities: "Grandes conversas de vendas têm qualidades mensuráveis. Aqui está como o sucesso se parece com Jacob:",
    discoveryQuestions: "Você fez perguntas de descoberta que revelaram os desafios empresariais específicos de Jacob",
    handledObjections: "Você lidou com suas objeções com pontos de prova relevantes e empatia genuína",
    connectedFeatures: "Você conectou funcionalidades a benefícios que importavam para sua empresa de contabilidade",
    builtRapport: "Você construiu rapport mantendo credibilidade profissional",
    guidedCommitment: "Você guiou em direção ao compromisso com técnicas de fechamento naturais e não forçadas",
    masterSkills: "Domine essas habilidades aquí, e você se destacará no campo.",
    
    // Navigation and Setup
    setupSuccess: "Prepare-se para o Sucesso",
    bestExperience: "Para a melhor experiência de treinamento, use fones de ouvido e garanta que tenha uma conexão estável de internet. Você precisará permitir acesso ao microfone quando solicitado.",
    jacobProcesses: "Jacob processa suas respostas naturalmente - apenas dê a ele 10-15 segundos para responder, como um prospect real faria.",
    conversationData: "Seus dados de conversa são processados com segurança e não armazenados permanentemente. Agora você está pronto para dizer \"START TRAINING\" e começar!",
    useMouseWheel: "Use a roda do mouse, teclas de seta, ou clique nos pontos para navegar",
    readyToStart: "Pronto para começar seu treinamento de vendas?",
    
    // Card 2: Meet Your Practice Partner
    meetPracticePartner: "Conheça Seu Parceiro de Prática",
    readyToMasterSales: "Pronto para Dominar Conversas de Vendas?",
    meetJacobFischer: "Conheça Jacob Fischer, proprietário da Fischer Contabilidade e Consultoria Tributária. Ele é analítico, consciente dos custos e protetor de dados sensíveis de clientes.",
    practiceAuthentic: "Pratique conversas de vendas autênticas que constroem sua confiança e aprimoram suas habilidades de tratamento de objeções com um prospect empresarial realista.",
    startJourneyExcellence: "Inicie sua jornada para a excelência em vendas com cenários de treinamento personalizados.",
    
    // Card 3: Before You Start
    beforeYouStart: "Antes de Começar",
  },
  
  es: {
    // Language Selector
    selectLanguage: "Seleccionar Idioma de Entrenamiento",
    languageLabel: "Idioma de Entrenamiento",
    
    // Welcome Card
    welcomeTitle: "Bienvenido al Entrenamiento de Ventas",
    welcomeSubtitle: "Domina Conversaciones de Ventas del Mundo Real",
    transformSkills: "Transforma Tus Habilidades de Ventas a Través de la Práctica Inmersiva",
    transformDescription: "Experimenta el entrenamiento de ventas más avanzado disponible - practica conversaciones auténticas con prospectos impulsados por IA que responden como clientes reales, completas con objeciones, preocupaciones y señales de compra.",
    
    // Training Features
    whatMakesSpecial: "Lo Que Hace Especial Este Entrenamiento:",
    realisticInteractions: "Interacciones Realistas:",
    realisticDescription: "Prospectos de IA con personalidades auténticas y desafíos empresariales genuinos",
    instantFeedback: "Retroalimentación Instantánea:",
    feedbackDescription: "Análisis detallado de rendimiento con recomendaciones específicas de mejora",
    safeEnvironment: "Ambiente Seguro:",
    safeDescription: "Practica conversaciones difíciles sin consecuencias del mundo real",
    skillBuilding: "Desarrollo de Habilidades:",
    skillDescription: "Domina el descubrimiento, manejo de objeciones y técnicas de cierre",
    
    // Call to Action
    readyToBuild: "¿Listo para construir confianza, afinar tus habilidades y convertirte en un profesional de ventas que cierra tratos consistentemente?",
    
    // Meet Jacob Card
    meetPartner: "Conoce a Tu Compañero de Práctica",
    readyToMaster: "¿Listo para Dominar Conversaciones de Ventas?",
    meetJacob: "Conoce a Jacob Fischer, propietario de Fischer Contabilidad y Consultoría Fiscal. Es analítico, consciente de los costos y protector de datos sensibles de clientes.",
    practiceConversations: "Practica conversaciones auténticas de ventas que construyen tu confianza y agudizan tus habilidades de manejo de objeciones con un prospecto empresarial realista.",
    startJourney: "Comienza tu viaje hacia la excelencia en ventas con escenarios de entrenamiento personalizados.",
    
    // Objections Card
    expectUnexpected: "Espera lo Inesperado",
    masterObjections: "Domina el Arte del Manejo de Objeciones",
    jacobChallenge: "Jacob maneja una firma de contabilidad exitosa, así que te desafiará tal como lo hacen los prospectos reales. Aquí están los tipos de preocupaciones que puedes esperar:",
    costConcerns: "Preocupaciones de Costo:",
    costExample: "\"Tus competidores cotizaron 30% menos. ¿Por qué debería pagar más?\"",
    timingObjections: "Objeciones de Tiempo:",
    timingExample: "\"Acabamos de renovar nuestro contrato actual. ¿Podemos revisar esto el próximo año?\"",
    trustIssues: "Confianza y Autoridad:",
    trustExample: "\"¿Cómo sé que tu empresa seguirá existiendo en 5 años?\"",
    featureChallenges: "Desafíos de Características:",
    featureExample: "\"Tu solución parece excesivamente compleja para lo que necesitamos.\"",
    
    // Avatar
    jacobName: "Jacob Fischer",
    jacobCompany: "Fischer Contabilidad y Consultoría Fiscal",
    aiPartner: "Compañero de Entrenamiento de Ventas IA",
    readyToHelp: "Listo para ayudarte a practicar tu presentación de ventas de telecom",
    startTraining: "Iniciar Entrenamiento",
    startingAvatar: "Iniciando Avatar...",
    
    // Continue Button
    continue: "Continuar",
    
    // Card 2: Persona Selection
    challengeLevel: "Elige Tu Nivel de Desafío",
    whichJacob: "¿Qué Jacob Enfrentarás Hoy?",
    jacobAdapts: "Jacob adapta su personalidad para coincidir con las conversaciones que necesitas dominar:",
    cautiousJacob: "• Jacob Cauteloso - Reacio al Riesgo & Enfocado en Seguridad",
    cautiousDescription: "Perfecto para practicar con prospectos conscientes del cumplimiento.",
    dominantJacob: "• Jacob Dominante - Negociador Duro & Enfocado en Precio",
    dominantDescription: "Ideal para construir confianza con prospectos exigentes y sensibles al precio.",
    analyticalJacob: "• Jacob Analítico - Tomador de Decisiones Basado en Datos",
    analyticalDescription: "Excelente para aprender a presentar ROI convincente y comparaciones detalladas.",
    chooseStyle: "Elige el estilo que coincida con tus objetivos de aprendizaje actuales.",
    
    // Card 3: Conversation Flow
    navigatePro: "Navega Como un Profesional",
    roadmapSuccess: "Tu Hoja de Ruta hacia el Éxito en Ventas",
    followProgression: "Sigue esta progresión natural con Jacob:",
    discoveryPhase: "Fase de Descubrimiento",
    discoveryDescription: "Pregunta sobre su configuración actual, puntos de dolor y preocupaciones de seguridad.",
    solutionPresentation: "Presentación de Solución",
    solutionDescription: "Conecta tus características directamente con los problemas que describió.",
    objectionMastery: "Maestría en Objeciones",
    objectionDescription: "Maneja sus preocupaciones sobre costo, seguridad y confiabilidad de manera auténtica.",
    commitmentClose: "Cierre de Compromiso",
    commitmentDescription: "Guía la conversación hacia los próximos pasos y pide compromiso.",
    masterPhases: "Domina cada fase para convertirte en un profesional de ventas confiado.",
    
    // Card 4: Common Objections  
    expectUnexpectedTitle: "Espera lo Inesperado",
    masterObjectionsTitle: "Domina el Arte del Manejo de Objeciones",
    jacobChallenges: "Jacob maneja una firma de contabilidad exitosa, así que te desafiará tal como lo hacen los prospectos reales. Aquí están los tipos de preocupaciones que puedes esperar:",
    costConcernsTitle: "Preocupaciones de Costo:",
    costExample2: "\"Tus competidores cotizaron 30% menos. ¿Por qué debería pagar más?\"",
    securityWorries: "Preocupaciones de Seguridad:",
    securityExample: "\"Una violación de datos podría destruir mi empresa. ¿Cómo garantizas protección?\"",
    reliabilityQuestions: "Preguntas de Confiabilidad:",
    reliabilityExample: "\"¿Qué pasa si tu servicio se cae durante la temporada de impuestos?\"",
    statusQuoBias: "Sesgo del Status Quo:",
    statusQuoExample: "\"Mi proveedor actual funciona bien. ¿Por qué debería cambiar?\"",
    objectionsAreSignals: "Recuerda: Las objeciones no son rechazos – son señales de compra. Jacob te está diciendo exactamente lo que necesita escuchar para seguir adelante.",
    
    // Card 5: Best Practices
    conversationExcellence: "Excelencia en Conversación",
    makeWordsCount: "Haz que Cada Palabra Cuente",
    salesNatural: "Los grandes vendedores hacen que las conversaciones se sientan naturales y consultivas. Así es como brillar con Jacob:",
    listenActively: "Escucha Activamente:",
    listenDescription: "Cuando Jacob comparte preocupaciones, reconócelas antes de responder. Usa frases como \"Entiendo que eso es importante para ti...\"",
    askSmartQuestions: "Haz Preguntas Inteligentes:",
    questionsDescription: "Ve más allá de las características superficiales. Explora el impacto emocional: \"¿Cómo te sientes cuando tu sistema actual tiene problemas durante la temporada ocupada?\"",
    paintPicture: "Pinta el Cuadro:",
    pictureDescription: "No solo vendas servicios de telecom – vende tranquilidad, eficiencia operacional y ventaja competitiva.",
    buildTrust: "Construye Confianza:",
    trustDescription: "Comparte ejemplos relevantes y demuestra experiencia sin abrumar a Jacob con jerga técnica.",
    stayProfessional: "Mantente profesional y confiado - ayuda a Jacob a resolver sus problemas empresariales reales.",
    
    // Best Practices Card Details
    listenActivelyTitle: "Escucha Activamente:",
    listenActivelyDesc: "Cuando Jacob comparte preocupaciones, reconócelas antes de responder. Usa frases como \"Entiendo que eso es importante para ti...\"",
    askSmartQuestionsTitle: "Haz Preguntas Inteligentes:",
    askSmartQuestionsDesc: "Ve más allá de las características superficiales. Explora el impacto emocional: \"¿Cómo te sientes cuando tu sistema actual tiene problemas durante la temporada ocupada?\"",
    paintPictureTitle: "Pinta el Cuadro:",
    paintPictureDesc: "No solo vendas servicios de telecom – vende tranquilidad, eficiencia operacional y ventaja competitiva.",
    buildTrustTitle: "Construye Confianza:",
    buildTrustDesc: "Comparte ejemplos relevantes y demuestra experiencia sin abrumar a Jacob con jerga técnica.",
    
    // Session Management Card Details
    optimalLengthTitle: "Duración Óptima:",
    optimalLengthDesc: "Apunta a 7-10 intercambios significativos. Esto te da tiempo suficiente para practicar descubrimiento, manejar objeciones e intentar un cierre.",
    stayFocusedTitle: "Mantente Enfocado:",
    stayFocusedDesc: "Jacob se mantendrá en personaje como tu prospecto. Si necesitas coaching o tienes preguntas sobre técnicas de ventas, guárdalas para después de la sesión.",
    naturalRhythmTitle: "Ritmo Natural:",
    naturalRhythmDesc: "Deja que la conversación fluya naturalmente. Jacob pausará entre respuestas para darte tiempo de pensar y responder cuidadosamente.",
    takeNotesTitle: "Toma Notas:",
    takeNotesDesc: "Mantén un registro de puntos clave y objeciones durante la conversación para mejor análisis post-sesión.",
    
    // Feedback Card Details
    specificExamplesDesc: "Cada puntuación viene con ejemplos específicos de tu conversación, más sugerencias accionables para mejora.",
    jacobNoticesDesc: "Jacob nota todo desde tu técnica de preguntas hasta cómo manejas objeciones de precio.",
    
    // Troubleshooting Card Details
    unexpectedTurnsDesc: "A veces las conversaciones toman giros inesperados. Aquí está cómo volver al rumbo:",
    jacobConfusedTitle: "Si Jacob parece confundido:",
    jacobConfusedDesc: "Podría decir \"Estoy aquí para evaluar tus servicios, ¿dónde estábamos?\" Esto significa que podrías haber resbalado al modo entrenamiento en lugar del modo ventas.",
    needResetTitle: "Si necesitas un reinicio:",
    needResetDesc: "Simplemente reinicia diciendo \"START TRAINING\" de nuevo. Jacob comenzará fresco, listo para otra ronda de práctica.",
    technicalIssuesTitle: "Si ocurren problemas técnicos:",
    technicalIssuesDesc: "Jacob reconocerá problemas de conexión y te guiará de vuelta a donde te quedaste.",
    conversationStallsTitle: "Si la conversación se atasca:",
    conversationStallsDesc: "Haz preguntas abiertas sobre los desafíos empresariales de Jacob para reiniciar diálogo significativo.",
    realisticProspectDesc: "Recuerda: Jacob está diseñado para ser un prospecto realista, así que algo de resistencia y escepticismo es normal y beneficioso para tu aprendizaje.",
    
    // Success Metrics Card Details
    discoveryQuestionsDesc: "Hiciste preguntas de descubrimiento que descubrieron los desafíos empresariales específicos de Jacob",
    handledObjectionsDesc: "Manejaste sus objeciones con puntos de prueba relevantes y empatía genuina",
    connectedFeaturesDesc: "Conectaste características con beneficios que importaban a su firma de contabilidad",
    builtRapportDesc: "Construiste rapport mientras mantenías credibilidad profesional",
    guidedCommitmentDesc: "Guiaste hacia el compromiso con técnicas de cierre naturales y no agresivas",
    
    // Card 6: Session Management
    keepFlowing: "Mantén el Flujo",
    technicalTips: "Consejos Técnicos para Práctica Fluida",
    getMostFrom: "Para sacar el máximo provecho de tu sesión de práctica:",
    optimalLength: "Duración Óptima:",
    lengthDescription: "Apunta a 7-10 intercambios significativos. Esto te da tiempo suficiente para practicar descubrimiento, manejar objeciones e intentar un cierre.",
    stayFocused: "Mantente Enfocado:",
    focusDescription: "Jacob se mantendrá en personaje como tu prospecto. Si necesitas coaching o tienes preguntas sobre técnicas de ventas, guárdalas para después de la sesión.",
    naturalRhythm: "Ritmo Natural:",
    rhythmDescription: "Deja que la conversación fluya naturalmente. Jacob pausará entre respuestas para darte tiempo de pensar y responder cuidadosamente.",
    takeNotes: "Toma Notas:",
    notesDescription: "Mantén un registro de puntos clave y objeciones durante la conversación para mejor análisis post-sesión.",
    takeNotesReminder: "Toma notas durante la conversación - recibirás retroalimentación detallada después.",
    
    // Card 7: Feedback
    transformProgress: "Transforma Práctica en Progreso",
    turnGrowth: "Convierte Cada Sesión en Crecimiento",
    endTraining: "Cuando estés listo para recibir retroalimentación, simplemente di \"END TRAINING\" y Jacob cambia de prospecto a coach de ventas.",
    detailedScoring: "Recibirás puntuación detallada en cinco áreas cruciales:",
    discoveryAssessment: "Descubrimiento & Evaluación de Necesidades",
    objectionHandling: "Manejo de Objeciones",
    valueCommunication: "Comunicación de Valor",
    relationshipBuilding: "Construcción de Relaciones",
    closingTechnique: "Técnica de Cierre",
    specificExamples: "Cada puntuación viene con ejemplos específicos de tu conversación, más sugerencias accionables para mejora.",
    jacobNotices: "Jacob nota todo desde tu técnica de preguntas hasta cómo manejas objeciones de precio.",
    
    // Card 8: Troubleshooting
    thingsOffTrack: "Cuando las Cosas se Desvían",
    keepOnCourse: "Mantén Tu Sesión de Práctica en Curso",
    unexpectedTurns: "A veces las conversaciones toman giros inesperados. Aquí está cómo volver al rumbo:",
    jacobConfused: "Si Jacob parece confundido:",
    confusedDescription: "Podría decir \"Estoy aquí para evaluar tus servicios, ¿dónde estábamos?\" Esto significa que podrías haber resbalado al modo entrenamiento en lugar del modo ventas.",
    needReset: "Si necesitas un reinicio:",
    resetDescription: "Simplemente reinicie diciendo \"START TRAINING\" de nuevo. Jacob comenzará fresco, listo para otra ronda de práctica.",
    technicalIssues: "Si ocurren problemas técnicos:",
    technicalDescription: "Jacob reconocerá problemas de conexión y te guiará de vuelta a donde te quedaste.",
    conversationStalls: "Si la conversación se atasca:",
    stallsDescription: "Haz preguntas abiertas sobre los desafíos empresariales de Jacob para reiniciar diálogo significativo.",
    realisticProspect: "Recuerda: Jacob está diseñado para ser un prospecto realista, así que algo de resistencia y escepticismo es normal y beneficioso para tu aprendizaje.",
    
    // Card 9: Success Metrics
    measureGrowth: "Mide Tu Crecimiento",
    knowWinning: "Sabe Cuándo Estás Ganando",
    measurableQualities: "Las grandes conversaciones de ventas tienen cualidades medibles. Así es como se ve el éxito con Jacob:",
    discoveryQuestions: "Hiciste preguntas de descubrimiento que descubrieron los desafíos empresariales específicos de Jacob",
    handledObjections: "Manejaste sus objeciones con puntos de prueba relevantes y empatía genuina",
    connectedFeatures: "Conectaste características con beneficios que importaban a su firma de contabilidad",
    builtRapport: "Construiste rapport mientras mantenías credibilidad profesional",
    guidedCommitment: "Guiaste hacia el compromiso con técnicas de cierre naturales y no agresivas",
    masterSkills: "Domina estas habilidades aquí, y destacarás en el campo.",
    
    // Navigation and Setup
    setupSuccess: "Prepárate para el Éxito",
    bestExperience: "Para la mejor experiencia de entrenamiento, usa auriculares y asegúrate de tener una conexión estable de internet. Necesitarás permitir acceso al micrófono cuando se solicite.",
    jacobProcesses: "Jacob procesa tus respuestas naturalmente - solo dale 10-15 segundos para responder, tal como lo haría un prospecto real.",
    conversationData: "Tus datos de conversación se procesan de forma segura y no se almacenan permanentemente. ¡Ahora estás listo para decir \"START TRAINING\" y comenzar!",
    useMouseWheel: "Usa la rueda del ratón, teclas de flecha, o haz clic en los puntos para navegar",
    readyToStart: "¿Listo para comenzar tu entrenamiento de ventas?",
    
    // Card 2: Meet Your Practice Partner
    meetPracticePartner: "Conoce a Tu Compañero de Práctica",
    readyToMasterSales: "¿Listo para Dominar las Conversaciones de Ventas?",
    meetJacobFischer: "Conoce a Jacob Fischer, propietario de Fischer Contabilidad y Consultoría Fiscal. Es analítico, consciente de los costos y protector de datos sensibles de clientes.",
    practiceAuthentic: "Practica conversaciones de ventas auténticas que construyen tu confianza y agudizan tus habilidades de manejo de objeciones con un prospecto empresarial realista.",
    startJourneyExcellence: "Comienza tu viaje hacia la excelencia en ventas con escenarios de entrenamiento personalizados.",
    
    // Card 3: Before You Start
    beforeYouStart: "Antes de Comenzar",
  },
};

// Avatar intro messages
export const INTRO_MESSAGES = {
  en: "Hi, I'm Jacob Fischer from Fischer Accounting & Tax Consulting. In the next 5 minutes, we'll roleplay a sales call—your job is to sell me your telecom services while handling my objections on price and value. What is your name?",
  nl: "Hallo, ik ben Jacob Fischer van Fischer Accounting & Tax Consulting. In de komende 5 minuten gaan we een verkoopgesprek rollenspelen—jouw taak is om mij je telecomdiensten te verkopen terwijl je mijn bezwaren over prijs en waarde afhandelt. Wat is je naam?",
  tr: "Merhaba, ben Jacob Fischer. Muhasebe sirketinden. Simdi satis egitimi yapacagiz. Bana telecom hizmetlerinizi satin. Adınız nedir?",
  pt: "Olá, sou Jacob Fischer da Fischer Contabilidade. Vamos fazer um treinamento de vendas de cinco minutos. Sua tarefa é me vender serviços de telecomunicações. Qual é o seu nome?",
  es: "Hola, soy Jacob Fischer de Fischer Contabilidad y Consultoría Fiscal. En los próximos 5 minutos, haremos un juego de rol de una llamada de ventas—tu trabajo es venderme tus servicios de telecomunicaciones mientras manejas mis objeciones sobre precio y valor. ¿Cuál es tu nombre?"
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>('en');

  const t = (key: keyof typeof translations['en']): string => {
    return translations[selectedLanguage][key] || translations.en[key];
  };

  return (
    <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 