import type { Deck, PlayCard } from './types';

/* ── DISCOVER (♦ Diamonds) — UX Research & Problem Discovery ── */

const discoverCards: PlayCard[] = [
  {
    id: 'disc-1',
    suit: 'diamonds',
    rank: 'A',
    kind: 'choose',
    title: 'Choose Your Method',
    scenario:
      'A product team wants to understand why users abandon a multi-step form. They have 2 weeks and no budget for recruiting.',
    question: 'Which research method gives the most actionable insight in this situation?',
    options: [
      { letter: 'A', text: 'Send a survey to all users who abandoned the form', correct: false },
      { letter: 'B', text: 'Run a remote unmoderated usability test with 5 users', correct: true },
      { letter: 'C', text: 'Analyze server logs to find where users drop off', correct: false },
      { letter: 'D', text: 'Interview the sales team about customer complaints', correct: false },
    ],
    reasoning:
      'Server logs show WHERE users drop off, but not WHY. Surveys tell you what users say, not what they do. Sales hears from the loudest voices, not the most representative. A remote unmoderated test with just 5 users reveals the actual friction points — confusion, error messages, unexpected steps — and it is fast and affordable.',
    principle: 'Observe behavior before asking opinion. The smallest real test beats the largest secondhand report.',
    projectRef: 'Case Study: WarU — Organizational Transformation',
  },
  {
    id: 'disc-2',
    suit: 'diamonds',
    rank: 'K',
    kind: 'challenge',
    title: 'The Surface Complaint',
    scenario:
      'Stakeholders say: "The app is too slow." Analytics show load times are under 2 seconds — well within acceptable range.',
    question: 'What do you investigate next?',
    reasoning:
      'When users say "slow," they often mean "confusing." The perception of speed is tied to clarity, not just load time. I would run a task-based usability test to find where users hesitate, re-read, or backtrack. The "slowness" is likely cognitive load — too many decisions, unclear next steps, or information overload — not a performance issue.',
    principle: 'The words users choose are symptoms, not diagnoses. Always look for the problem behind the problem.',
    projectRef: 'Case Study: WarU — Organizational Transformation',
  },
  {
    id: 'disc-3',
    suit: 'diamonds',
    rank: 'Q',
    kind: 'choose',
    title: 'Stakeholder vs. User',
    scenario:
      'A department director insists the new dashboard needs 14 widgets on the home screen. Users in testing consistently ignore 11 of them.',
    question: 'How do you handle the conflict between stakeholder preference and user behavior?',
    options: [
      { letter: 'A', text: 'Follow the director — they sign the checks', correct: false },
      { letter: 'B', text: 'Remove all 14 widgets — users know best', correct: false },
      { letter: 'C', text: 'Present the usage data and propose a phased approach: core widgets first, optional ones in a secondary view', correct: true },
      { letter: 'D', text: 'Run a survey asking users which widgets they want', correct: false },
    ],
    reasoning:
      'Neither stakeholders nor users have the full picture alone. The director has business context users do not see. Users have behavioral reality the director has not observed. The solution is not to pick a side — it is to bridge them with evidence. A phased approach respects the director\u2019s vision while letting user data guide prioritization.',
    principle: 'Your job is not to advocate for users or stakeholders. It is to bring evidence that helps both make better decisions.',
    projectRef: 'Case Study: Energy Provider — Product Strategy',
  },
];

/* ── INTERPRET (♥ Hearts) — Research Synthesis & Insights ── */

const interpretCards: PlayCard[] = [
  {
    id: 'int-1',
    suit: 'hearts',
    rank: 'A',
    kind: 'challenge',
    title: 'The Conflicting Findings',
    scenario:
      'Interviews say users want more features. Usage data shows they only use 3 out of 12 existing features. Analytics reveal high drop-off after step 2.',
    question: 'What is the real insight here?',
    reasoning:
      'This is one of the most common patterns in UX research: users say one thing and do another. The interviews reveal aspirations — users want to feel capable. The usage data reveals reality — they are overwhelmed. The real insight is not "add more features" or "remove features." It is: "users want to feel successful, but the current experience makes them feel inadequate." The fix is simplification with progressive disclosure — not feature accumulation.',
    principle: 'When findings conflict, the conflict itself is the insight. Look for the deeper need that explains both data points.',
    projectRef: 'Case Study: Energy Provider — Product Strategy',
  },
  {
    id: 'int-2',
    suit: 'hearts',
    rank: 'K',
    kind: 'choose',
    title: 'Pattern or Anomaly?',
    scenario:
      'In a set of 20 user interviews, 2 participants mention a specific frustration that no one else raises. It is a vivid, emotional complaint.',
    question: 'How do you treat this finding?',
    options: [
      { letter: 'A', text: 'Dismiss it — 2 out of 20 is not a pattern', correct: false },
      { letter: 'B', text: 'Make it a top priority — the emotion signals deep pain', correct: false },
      { letter: 'C', text: 'Flag it as a signal worth investigating further, but do not over-weight it until you understand why only 2 users hit this path', correct: true },
      { letter: 'D', text: 'Ask all 20 users about it in a follow-up survey', correct: false },
    ],
    reasoning:
      'Anomalies are not noise — they are edges of the data that reveal something about your sample, your product, or your assumptions. Two users feeling strongly about something means either: (1) a specific segment hits a path most users avoid, or (2) a problem is building that will affect more people over time. The right move is curiosity, not dismissal or overreaction.',
    principle: 'Outliers are questions, not answers. They tell you where to look next, not what to build.',
    projectRef: 'Case Study: AI Single Moms — Empathy Research',
  },
  {
    id: 'int-3',
    suit: 'hearts',
    rank: 'Q',
    kind: 'challenge',
    title: 'The Insight That Changed Direction',
    scenario:
      'During an energy provider project, research revealed that customers were not disengaged because they did not care about energy — they were disengaged because the experience made them feel incompetent.',
    question: 'How does this insight reshape the strategy?',
    reasoning:
      'The original assumption was behavioral: "people need motivation to save energy." The research revealed an emotional barrier: "people feel stupid when they cannot understand their bill." This shifts the solution from gamification and reminders to clarity and empowerment. The strategy becomes: simplify the language, show progress in human terms, and remove the shame barrier. The insight moved the entire project from "push harder" to "remove the wall."',
    principle: 'The most valuable insights do not add information — they replace an assumption that was steering the project wrong.',
    projectRef: 'Case Study: Energy Provider — Product Strategy',
  },
];

/* ── DECIDE (♣ Clubs) — Strategic Thinking & Trade-offs ── */

const decideCards: PlayCard[] = [
  {
    id: 'dec-1',
    suit: 'clubs',
    rank: 'A',
    kind: 'choose',
    title: 'The Roadmap Dilemma',
    scenario:
      'You have 3 candidate features. Feature A has high user value but high effort. Feature B has moderate user value and low effort. Feature C has high business value but unknown user impact.',
    question: 'Which do you prioritize first?',
    options: [
      { letter: 'A', text: 'Feature A — highest user value wins', correct: false },
      { letter: 'B', text: 'Feature B — quick win builds momentum and trust', correct: true },
      { letter: 'C', text: 'Feature C — business value drives the roadmap', correct: false },
      { letter: 'D', text: 'All three in parallel — everything matters', correct: false },
    ],
    reasoning:
      'In a resource-constrained environment, quick wins are not about cutting corners — they are about building credibility. Feature B ships fast, delivers measurable value, and creates evidence that the team can execute. That evidence becomes the trust you need to justify the larger investment in Feature A. Feature C needs research before it earns a roadmap slot. Sequence matters as much as priority.',
    principle: 'Prioritization is not about what is most important. It is about what unlocks the next decision.',
    projectRef: 'Case Study: WarU — Organizational Transformation',
  },
  {
    id: 'dec-2',
    suit: 'clubs',
    rank: 'K',
    kind: 'challenge',
    title: 'The 80% Solution',
    scenario:
      'A stakeholder asks: "Should we launch at 80% or wait until it is perfect?" The team has been working for 4 months. Competitors are moving fast.',
    question: 'How do you frame the decision?',
    reasoning:
      'This is rarely a binary choice. The real question is: 80% of what? I would break the experience into core paths and secondary paths. If the core paths — the 3-4 things users do 80% of the time — are solid, launch. The secondary paths can iterate post-launch with real user data. Waiting for perfection means building assumptions, not solutions. But shipping broken core paths damages trust faster than a late launch.',
    principle: 'Do not ask "is it ready?" Ask "are the paths that matter most ready — and can we learn from the rest?"',
    projectRef: 'Case Study: WarU — Organizational Transformation',
  },
  {
    id: 'dec-3',
    suit: 'clubs',
    rank: 'Q',
    kind: 'choose',
    title: 'When Everything Matters',
    scenario:
      'Leadership says every feature is a priority. Engineering has capacity for 2 out of 7. There is no clear business metric to rank them.',
    question: 'How do you bring clarity to the trade-off conversation?',
    options: [
      { letter: 'A', text: 'Ask leadership to rank them by gut feel', correct: false },
      { letter: 'B', text: 'Map each feature to user value and business value, then facilitate a trade-off workshop where leadership makes the call with evidence on the table', correct: true },
      { letter: 'C', text: 'Pick the 2 easiest to build and inform leadership', correct: false },
      { letter: 'D', text: 'Push back and say nothing can be done until priorities are clarified', correct: false },
    ],
    reasoning:
      'When everything is a priority, nothing is. But saying that to leadership feels like obstruction. Instead, bring structure: a simple 2x2 matrix of user value vs. business value, populated with whatever evidence exists. Then facilitate the conversation. The goal is not to make the decision for them — it is to make the trade-offs visible so the decision is informed, not political.',
    principle: 'You cannot make trade-off decisions for leaders. You can make the trade-offs visible enough that they make them well.',
    projectRef: 'Case Study: UTSA — UX Education & Mentorship',
  },
];

/* ── INFLUENCE (♠ Spades) — Stakeholder Collaboration & Organizational Decisions ── */

const influenceCards: PlayCard[] = [
  {
    id: 'inf-1',
    suit: 'spades',
    rank: 'A',
    kind: 'challenge',
    title: 'The Skeptical Executive',
    scenario:
      'You are presenting research findings to a VP who interrupts: "I do not need research to tell me what I already know."',
    question: 'How do you respond in the moment?',
    reasoning:
      'The worst response is defensiveness. The VP is not attacking research — they are asserting their own expertise. I would acknowledge their experience, then reframe: "You are right that you know this organization better than anyone. What the research adds is not replacing your judgment — it is showing you what your customers see that you cannot." Then I would share one finding that contradicts the VP\u2019s assumption. Not to prove them wrong, but to demonstrate that research reveals blind spots, not obvious truths.',
    principle: 'Influence is not about being right. It is about making the other person curious enough to look again.',
    projectRef: 'Case Study: WarU — Organizational Transformation',
  },
  {
    id: 'inf-2',
    suit: 'spades',
    rank: 'K',
    kind: 'choose',
    title: 'The Report Nobody Reads',
    scenario:
      'You delivered a 40-page research report. Two weeks later, no one has referenced it. The team is making decisions without it.',
    question: 'What do you do differently next time?',
    options: [
      { letter: 'A', text: 'Make the report shorter — a 1-page summary', correct: false },
      { letter: 'B', text: 'Run a findings workshop instead of delivering a document — bring stakeholders into the synthesis process', correct: true },
      { letter: 'C', text: 'Send the report to more people so someone reads it', correct: false },
      { letter: 'D', text: 'Add an executive summary at the top', correct: false },
    ],
    reasoning:
      'The problem is not length — it is format. Reports are monologues. Decisions are conversations. A workshop turns findings from a document into a shared experience. When stakeholders participate in sorting evidence and drawing conclusions, they own the insights. A report they read is information. A workshop they participate in is commitment. The format of delivery matters as much as the quality of the content.',
    principle: 'If you want findings to drive decisions, deliver them in the format decisions are made — a conversation, not a document.',
    projectRef: 'Case Study: WarU — Organizational Transformation',
  },
  {
    id: 'inf-3',
    suit: 'spades',
    rank: 'Q',
    kind: 'challenge',
    title: 'From Insight to Movement',
    scenario:
      'Research uncovered a critical user need. The product team agrees it matters. But three months later, nothing has changed. No one took action.',
    question: 'Where did the influence break down?',
    reasoning:
      'Agreement is not ownership. The team agreed the insight mattered, but no one felt responsible for acting on it. Influence breaks down when insights are shared but not assigned. I would trace the gap: Was there a clear recommendation tied to the insight? Was there a decision-maker identified? Was there a next step with a deadline? Insights without ownership die in agreement. The fix is not better research — it is a clearer handoff: who decides, what they decide, and by when.',
    principle: 'An insight that everyone agrees with and no one acts on has zero value. Ownership is the last mile of research.',
    projectRef: 'Case Study: UTSA — UX Education & Mentorship',
  },
];

export const decks: Deck[] = [
  {
    suit: 'diamonds',
    name: 'DISCOVER',
    subtitle: 'UX Research',
    color: '#dc2626',
    colorRgb: '220, 38, 38',
    symbol: '♦',
    accentClass: 'text-red-600',
    description: 'How I uncover the real problem — methods, mindset, and the discipline to look beneath surface complaints.',
    cards: discoverCards,
  },
  {
    suit: 'hearts',
    name: 'INTERPRET',
    subtitle: 'Research Insights',
    color: '#ea580c',
    colorRgb: '234, 88, 12',
    symbol: '♥',
    accentClass: 'text-orange-600',
    description: 'How I transform raw evidence into meaningful insights — finding patterns, resolving conflicts, and seeing what the data really means.',
    cards: interpretCards,
  },
  {
    suit: 'clubs',
    name: 'DECIDE',
    subtitle: 'Strategic Thinking',
    color: '#0f766e',
    colorRgb: '15, 118, 110',
    symbol: '♣',
    accentClass: 'text-teal-600',
    description: 'How I evaluate alternatives and make trade-offs — prioritization frameworks, roadmap decisions, and the courage to sequence.',
    cards: decideCards,
  },
  {
    suit: 'spades',
    name: 'INFLUENCE',
    subtitle: 'Stakeholder Leadership',
    color: '#334155',
    colorRgb: '51, 65, 85',
    symbol: '♠',
    accentClass: 'text-slate-600',
    description: 'How I help stakeholders turn insights into action — storytelling, workshops, and the last mile from agreement to ownership.',
    cards: influenceCards,
  },
];
