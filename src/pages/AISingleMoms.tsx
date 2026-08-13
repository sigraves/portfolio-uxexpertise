import React, { useState } from 'react';
import {
  ArrowLeft, Brain, Users, Heart, FileText,
  Lightbulb, ExternalLink, CheckCircle, XCircle,
  ChevronDown,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const FIGMA_URL =
  'https://www.figma.com/design/5dtX0wL4HRCIFyLVoBtrGw/AI-Assisted-Empathy-Research-Process?node-id=12-1899&t=r8zLonxtXJdmfBbj-1';

const quickStats = [
  { label: 'Study Period', value: 'July 2024 – Ongoing' },
  { label: 'Mothers Contacted', value: '30' },
  { label: 'Responses Received', value: '6' },
  { label: 'Analyzed in Depth', value: '6' },
  { label: 'Age Range', value: '26–41' },
  { label: 'Children per Participant', value: '1–3' },
  { label: 'AI Tools Tested', value: 'DeepSeek · ChatGPT · Google Gemini (free tiers)' },
  { label: 'Key Finding', value: 'Single mothers carry invisible emotional burdens that support systems often fail to see' },
];

export const AISingleMoms = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const toggle = (id: string) => setOpenSection((prev) => (prev === id ? null : id));

  const AccordionSection = ({
    id, title, subtitle, children,
  }: {
    id: string; title: string; subtitle: string; children: React.ReactNode;
  }) => {
    const isOpen = openSection === id;
    return (
      <section className="py-4 bg-gray-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <button
            onClick={() => toggle(id)}
            aria-expanded={isOpen}
            className="w-full flex items-center justify-between gap-4 text-left group rounded-2xl px-6 py-5 border-2 border-orange-300 bg-white hover:border-orange-500 shadow-md hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-center gap-4">
              <div className="w-1 h-10 rounded-full bg-orange-400 shrink-0" aria-hidden="true" />
              <div>
                <h2 className="text-xl font-bold leading-snug text-gray-900">{title}</h2>
                <p className="text-sm mt-0.5 text-gray-500 font-medium">{subtitle}</p>
              </div>
            </div>
            <ChevronDown
              className={`w-5 h-5 shrink-0 text-orange-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </button>
          {isOpen && <div className="mt-3">{children}</div>}
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <a
        href="#singlemoms-main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-orange-500 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold"
      >
        Skip to main content
      </a>
      <Header />

      <div className="bg-white shadow-sm pt-20">
        <div className="container mx-auto px-6 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors duration-200 font-medium text-sm">
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section id="singlemoms-main" className="py-20 bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 text-white" tabIndex={-1}>
        <div className="container mx-auto px-6 max-w-5xl">
          <p className="text-orange-400 text-sm font-semibold uppercase tracking-widest mb-4">Case Study — July 2024 – Ongoing</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight max-w-3xl">
            Invisible Weight: Understanding the Hidden Emotional Burdens of Single Mothers
          </h1>
          <blockquote className="border-l-4 border-orange-400 pl-5 mb-8 max-w-2xl">
            <p className="text-orange-200 italic text-lg leading-relaxed">"Sometimes I just sit in my car and cry for ten minutes before going inside."</p>
            <footer className="text-gray-400 text-sm mt-1">— Participant, Instagram DM survey</footer>
          </blockquote>
          <div className="flex flex-wrap gap-3 mb-5">
            <a
              href={FIGMA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 shadow-md"
            >
              <ExternalLink className="w-4 h-4" />
              View Figma Process Flow
            </a>
          </div>
          <div className="flex flex-wrap gap-2">
            {['AI-Assisted Analysis', 'Qualitative Research', 'DeepSeek', 'ChatGPT', 'Google Gemini', 'Single Mothers', 'Empathy Research', 'Motivational Speaking'].map((tag) => (
              <span key={tag} className="bg-white/10 border border-white/20 text-white/80 text-xs font-medium px-3 py-1.5 rounded-full">{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-10 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickStats.map((s) => (
              <div key={s.label} className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col gap-1 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-widest text-orange-500">{s.label}</div>
                <div className="text-gray-900 font-semibold text-sm leading-snug">{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex items-start gap-4 mb-8">
            <div className="bg-orange-500 text-white p-3 rounded-xl shrink-0" aria-hidden="true">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-1">Executive Summary</h2>
              <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest">What this study set out to do and what it found</p>
            </div>
          </div>

          <div className="space-y-5">
            {[
              {
                label: 'Purpose',
                content: 'Understand the hidden emotional challenges of single mothers and identify actionable ways churches, educators, and community organizations can provide better support.',
              },
              {
                label: 'Method',
                content: '30 single mothers contacted via Instagram with 10 survey questions (5 direct, 5 open-ended). 6 responded. 6 deeply analyzed. Human thematic analysis + AI-assisted pattern detection + independent review.',
              },
              {
                label: 'Impact',
                content: 'Audio resource created, workshops delivered, findings adopted by support organizations.',
              },
              {
                label: 'Recommendation',
                content: 'Support systems should prioritize emotional validation, practical relief, and identity restoration — rather than focusing exclusively on encouragement.',
              },
            ].map(({ label, content }) => (
              <div key={label} className="bg-orange-50 border border-orange-100 rounded-2xl p-6">
                <p className="text-orange-600 text-xs font-bold uppercase tracking-widest mb-2">{label}</p>
                <p className="text-gray-800 leading-relaxed">{content}</p>
              </div>
            ))}

            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6">
              <p className="text-orange-600 text-xs font-bold uppercase tracking-widest mb-4">Key Findings</p>
              <ul className="space-y-3">
                {[
                  'Single mothers often experience private grief that remains invisible to others.',
                  'Hyper-responsibility drives burnout.',
                  "Children's empathy can intensify parental guilt.",
                  'Hope and shame frequently coexist.',
                  'Isolation is often trauma-related rather than voluntary.',
                ].map((finding) => (
                  <li key={finding} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0 mt-2" aria-hidden="true" />
                    <span className="text-gray-800 leading-relaxed">{finding}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Accordion 1 — Participant Recruitment */}
      <AccordionSection
        id="recruitment"
        title="Participant Recruitment & Survey Process"
        subtitle="How participants were reached and what they were asked."
      >
        <div className="space-y-4">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-3">How Participants Were Reached</h3>
            <p className="text-gray-700 text-sm leading-relaxed mb-5">
              I reached out to 30 single mothers via Instagram private messages through the <span className="font-semibold text-gray-900">@singlemomtoday</span> community. The message invited them to participate in a brief, anonymous study about their experiences as single mothers. No payments or incentives were offered.
            </p>

            <h3 className="font-bold text-gray-900 mb-3">Survey Questions Asked</h3>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              The following 10 questions were sent via Instagram DM — 5 direct and 5 open-ended:
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-5">
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Direct Questions</p>
                <ol className="space-y-2">
                  {[
                    'How old are you?',
                    'How many children do you have, and what are their ages?',
                    'What is your current employment status? (Full-time, Part-time, Unemployed, Other)',
                    'Do you live independently or with family?',
                    'What is your current relationship status?',
                  ].map((q, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-700">
                      <span className="text-blue-500 font-bold shrink-0">{i + 1}.</span>
                      {q}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
                <p className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-3">Open-Ended Questions</p>
                <ol className="space-y-2" start={6}>
                  {[
                    'What does a typical day look like for you?',
                    'What has been your biggest challenge as a single mother?',
                    'What support would you most like to receive?',
                    'How has your identity changed since becoming a single mother?',
                    'What is one moment from the past month that captures both your hardest challenge and your deepest hope as a single mother?',
                  ].map((q, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-700">
                      <span className="text-orange-500 font-bold shrink-0">{i + 6}.</span>
                      {q}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
              <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-2">Participant Responses</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                Of the 30 messages sent, 6 mothers responded with detailed, emotionally rich responses that were selected for in-depth analysis.
              </p>
            </div>
          </div>
        </div>
      </AccordionSection>

      {/* Accordion 2 — Demographics */}
      <AccordionSection
        id="demographics"
        title="Demographics"
        subtitle="Participant characteristics at a glance."
      >
        <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
          <div className="grid grid-cols-2 bg-gray-800 text-white">
            <div className="px-6 py-3 text-xs font-bold uppercase tracking-widest">Characteristic</div>
            <div className="px-6 py-3 text-xs font-bold uppercase tracking-widest border-l border-gray-700">Details</div>
          </div>
          {[
            { char: 'Total Participants Analyzed', detail: '6' },
            { char: 'Age Range', detail: '26–41' },
            { char: 'Children per Participant', detail: '1–3' },
            { char: 'Employment Status', detail: 'Full-time, Part-time, Unemployed' },
            { char: 'Living Situation', detail: 'Independent, With Family' },
          ].map((row, i) => (
            <div key={row.char} className={`grid grid-cols-2 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
              <div className="px-6 py-4 text-sm font-medium text-gray-700 border-r border-gray-100">{row.char}</div>
              <div className="px-6 py-4 text-sm text-gray-800">{row.detail}</div>
            </div>
          ))}
        </div>
      </AccordionSection>

      {/* Accordion 3 — Research Ethics */}
      <AccordionSection
        id="ethics"
        title="Research Ethics"
        subtitle="How participant data was handled with care."
      >
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <ul className="space-y-3">
            {[
              'Participation was voluntary.',
              'Responses were anonymized.',
              'No identifying information was included.',
              'Quotes were used only with consent.',
              'Findings are presented at a theme level rather than individual level.',
              'No payments or incentives were offered to participants.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </AccordionSection>

      {/* Accordion 4 — Voices from the Study (featured) */}
      <section className="py-4 bg-gray-900">
        <div className="container mx-auto px-6 max-w-4xl">
          <button
            onClick={() => toggle('voices')}
            aria-expanded={openSection === 'voices'}
            className="w-full flex items-center justify-between gap-4 text-left group rounded-2xl px-6 py-5 border-2 border-orange-500 bg-gray-800 hover:bg-gray-750 hover:border-orange-400 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <div className="flex items-center gap-4">
              <div className="bg-orange-500 text-white p-2.5 rounded-xl shrink-0" aria-hidden="true">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-orange-400 text-xs font-bold uppercase tracking-widest mb-0.5">Their Words</p>
                <h2 className="text-xl font-bold leading-snug text-white">Voices from the Study</h2>
                <p className="text-sm mt-0.5 text-gray-400 font-medium">Direct quotes and what they reveal.</p>
              </div>
            </div>
            <ChevronDown
              className={`w-5 h-5 shrink-0 text-orange-400 transition-transform duration-300 ${openSection === 'voices' ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </button>
          {openSection === 'voices' && (
            <div className="mt-3 space-y-4">
              {[
                {
                  quote: '"I wake up at 5am, get the kids ready, work eight hours, then come home to homework, dinner, baths. By 10pm I collapse. I can\'t remember the last time I did something for myself."',
                  meaning: 'The mother exists primarily as a caregiver. Not woman. Not friend. Not dreamer. Only provider, protector, caretaker.',
                },
                {
                  quote: '"Sometimes I just sit in my car and cry for ten minutes before going inside."',
                  meaning: 'The car functions as a temporary emotional refuge when no private recovery space exists. Even grief is scheduled and rationed.',
                },
                {
                  quote: '"He said \'it\'s okay, mom\' — but I saw his face. I feel like I\'m failing him every single day."',
                  meaning: "A child's empathy can intensify parental guilt. Encouragement alone may not reduce guilt — it can highlight perceived failure.",
                },
                {
                  quote: '"I had to choose between buying groceries or paying the electric bill. I chose groceries and we sat in the dark for three days. My daughter asked if we were poor. I didn\'t know what to say."',
                  meaning: "Children's direct questions force impossible conversations. The mother carries the weight of both poverty and shame.",
                },
                {
                  quote: '"I\'m so lonely, but I can\'t even imagine trusting someone again. My ex did a number on me."',
                  meaning: 'Isolation is not a preference — it is trauma-enforced. The support need here is trust reconstruction, not just social connection.',
                },
                {
                  quote: '"I feel like a failure living with my parents at 26. But I\'m saving for a down payment. I want my kids to see me succeed, not just struggle."',
                  meaning: 'Aspiration and shame coexist in the same breath. Single mothers need permission to receive help without moral judgment.',
                },
              ].map((item, i) => (
                <div key={i} className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-sm">
                  <blockquote className="border-l-4 border-orange-500 pl-4 mb-4">
                    <p className="text-white italic leading-relaxed">{item.quote}</p>
                  </blockquote>
                  <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
                    <p className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-1">What this means</p>
                    <p className="text-gray-300 text-sm leading-relaxed">{item.meaning}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Accordion 5 — The Emotional Journey */}
      <AccordionSection
        id="emotional-journey"
        title="The Emotional Journey"
        subtitle="What a single mother's day actually looks like beneath the surface."
      >
        <div className="space-y-4">
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <div className="grid grid-cols-3 bg-gray-800 text-white">
              <div className="px-5 py-3 text-xs font-bold uppercase tracking-widest">Stage</div>
              <div className="px-5 py-3 text-xs font-bold uppercase tracking-widest border-l border-gray-700">Experience</div>
              <div className="px-5 py-3 text-xs font-bold uppercase tracking-widest border-l border-gray-700">Hidden Emotion</div>
            </div>
            {[
              { stage: 'Morning', exp: 'Get children ready', emotion: 'Pressure' },
              { stage: 'Work', exp: 'Perform professionally', emotion: 'Exhaustion' },
              { stage: 'Evening', exp: 'Parenting responsibilities', emotion: 'Overwhelm' },
              { stage: 'Night', exp: 'Private reflection', emotion: 'Guilt' },
              { stage: 'Car', exp: 'Emotional release', emotion: 'Grief' },
              { stage: 'Next Morning', exp: 'Start again', emotion: 'Determination' },
            ].map((row, i) => (
              <div key={row.stage} className={`grid grid-cols-3 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <div className="px-5 py-4 text-sm font-semibold text-gray-800 border-r border-gray-100">{row.stage}</div>
                <div className="px-5 py-4 text-sm text-gray-700 border-r border-gray-100">{row.exp}</div>
                <div className="px-5 py-4 text-sm text-orange-600 font-medium">{row.emotion}</div>
              </div>
            ))}
          </div>
          <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
            <p className="text-gray-700 text-sm leading-relaxed">
              Single mothers cycle through this journey daily — often without anyone seeing the full picture.
            </p>
          </div>
        </div>
      </AccordionSection>

      {/* Accordion 6 — What Surprised Me Most */}
      <AccordionSection
        id="surprised"
        title="What Surprised Me Most"
        subtitle="What the data revealed that I didn't expect."
      >
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <ul className="space-y-4">
            {[
              'I expected financial hardship to dominate the findings.',
              'Instead, the strongest themes were emotional: guilt, identity loss, invisible grief, hyper-responsibility.',
              'The practical challenges were real, but the emotional burden often carried equal or greater weight.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0 mt-2" aria-hidden="true" />
                <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </AccordionSection>

      {/* Accordion 7 — Mixed Method Exploratory Approach */}
      <AccordionSection
        id="methodology"
        title="Mixed Method Exploratory Approach"
        subtitle="How qualitative, quantitative, and AI-assisted methods combined."
      >
        <div className="space-y-4">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <p className="text-gray-700 text-sm leading-relaxed mb-5">
              This was a mixed method exploratory study designed to surface hidden emotional patterns in single mother narratives, generate actionable insights for support organizations, and test whether free AI tools could assist in pattern detection.
            </p>

            <h3 className="font-bold text-gray-900 text-sm mb-3">The mixed methods approach combined:</h3>
            <div className="rounded-xl overflow-hidden border border-gray-200 mb-5">
              <div className="grid grid-cols-3 bg-gray-800 text-white">
                <div className="px-4 py-3 text-xs font-bold uppercase tracking-widest">Method Type</div>
                <div className="px-4 py-3 text-xs font-bold uppercase tracking-widest border-l border-gray-700">What Was Used</div>
                <div className="px-4 py-3 text-xs font-bold uppercase tracking-widest border-l border-gray-700">Purpose</div>
              </div>
              {[
                { type: 'Qualitative', used: 'Open-ended survey questions, thematic analysis, participant voices', purpose: 'Surface rich emotional narratives and hidden patterns' },
                { type: 'Quantitative', used: 'Demographic data (age, children, employment, living situation)', purpose: 'Provide context and structure to the qualitative findings' },
                { type: 'AI-Assisted', used: 'Pattern detection using DeepSeek, ChatGPT, Google Gemini', purpose: 'Test whether AI could complement human analysis' },
              ].map((row, i) => (
                <div key={row.type} className={`grid grid-cols-3 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  <div className="px-4 py-3 text-sm font-semibold text-gray-800 border-r border-gray-100">{row.type}</div>
                  <div className="px-4 py-3 text-sm text-gray-700 border-r border-gray-100">{row.used}</div>
                  <div className="px-4 py-3 text-sm text-gray-700">{row.purpose}</div>
                </div>
              ))}
            </div>

            <h3 className="font-bold text-gray-900 text-sm mb-3">Research Process:</h3>
            <div className="rounded-xl overflow-hidden border border-gray-200">
              <div className="grid grid-cols-3 bg-gray-800 text-white">
                <div className="px-4 py-3 text-xs font-bold uppercase tracking-widest">Step</div>
                <div className="px-4 py-3 text-xs font-bold uppercase tracking-widest border-l border-gray-700">Activity</div>
                <div className="px-4 py-3 text-xs font-bold uppercase tracking-widest border-l border-gray-700">Method Type</div>
              </div>
              {[
                { step: '1', activity: 'Data Collection — 6 participant responses', method: 'Qualitative' },
                { step: '2', activity: 'Human Thematic Analysis — line-by-line coding', method: 'Qualitative' },
                { step: '3', activity: 'AI-Assisted Pattern Detection — 3 tools, same prompt', method: 'AI-Assisted' },
                { step: '4', activity: 'Independent Review — blind spot identification', method: 'Qualitative' },
                { step: '5', activity: 'Demographics — age, children, employment, living situation', method: 'Quantitative' },
              ].map((row, i) => (
                <div key={row.step} className={`grid grid-cols-3 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  <div className="px-4 py-3 text-sm font-bold text-orange-500 border-r border-gray-100">{row.step}</div>
                  <div className="px-4 py-3 text-sm text-gray-700 border-r border-gray-100">{row.activity}</div>
                  <div className="px-4 py-3 text-sm text-gray-700">{row.method}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AccordionSection>

      {/* Accordion 8 — Sampling Limitation */}
      <AccordionSection
        id="sampling"
        title="Sampling Limitation"
        subtitle="An honest assessment of what this study can and cannot claim."
      >
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
            <p className="text-gray-700 text-sm leading-relaxed">
              To maximize learning in this exploratory phase, I selected the six richest responses rather than a random sample. This introduces <span className="font-semibold text-gray-900">selection bias</span> and likely amplifies emotional themes. Future studies should include all responses and compare findings across varying levels of emotional intensity.
            </p>
          </div>
        </div>
      </AccordionSection>

      {/* Accordion 9 — What I Found */}
      <AccordionSection
        id="findings"
        title="What I Found"
        subtitle="Six hidden patterns and what they mean."
      >
        <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
          <div className="grid grid-cols-2 bg-gray-800 text-white">
            <div className="px-6 py-3 text-xs font-bold uppercase tracking-widest">Hidden Pattern</div>
            <div className="px-6 py-3 text-xs font-bold uppercase tracking-widest border-l border-gray-700">What It Means</div>
          </div>
          {[
            { pattern: 'Hyper-responsibility', meaning: '"If I stop, everything collapses." — The belief that failure is not an option. Burnout is a result; hyper-responsibility is the psychological driver.' },
            { pattern: 'Absence of Self', meaning: 'The mother exists primarily as a caregiver. Not woman. Not friend. Not dreamer. Only provider, protector, caretaker.' },
            { pattern: 'Private Grief', meaning: 'Single mothers often delay emotional release until they are alone. Silence does not mean coping.' },
            { pattern: "Children's Empathy Intensifies Guilt", meaning: "When children comfort their mothers, many mothers feel increased guilt rather than relief." },
            { pattern: 'Hope and Shame Coexist', meaning: 'Many mothers simultaneously believe things will improve while feeling ashamed of needing help.' },
            { pattern: 'Trauma-Enforced Isolation', meaning: 'Past relationship trauma actively blocks future connection. Social support alone is not enough — trust reconstruction is needed.' },
          ].map((row, i) => (
            <div key={row.pattern} className={`grid grid-cols-2 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
              <div className="px-6 py-4 text-sm font-semibold text-orange-600 border-r border-gray-100">{row.pattern}</div>
              <div className="px-6 py-4 text-sm text-gray-700 leading-relaxed">{row.meaning}</div>
            </div>
          ))}
        </div>
      </AccordionSection>

      {/* Accordion 10 — What These Findings Mean for Support Organizations */}
      <AccordionSection
        id="implications"
        title="What These Findings Mean for Support Organizations"
        subtitle="From insight to action."
      >
        <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
          <div className="grid grid-cols-3 bg-gray-800 text-white">
            <div className="px-4 py-3 text-xs font-bold uppercase tracking-widest">Finding</div>
            <div className="px-4 py-3 text-xs font-bold uppercase tracking-widest border-l border-gray-700">Implication</div>
            <div className="px-4 py-3 text-xs font-bold uppercase tracking-widest border-l border-gray-700">Support Action</div>
          </div>
          {[
            { finding: 'Private Grief', implication: 'Do not assume silence means coping.', action: 'Create low-pressure emotional check-ins rather than waiting for requests for help.' },
            { finding: "Children's Empathy Intensifies Guilt", implication: 'Encouragement alone may not reduce guilt.', action: 'Help mothers separate circumstances from personal worth.' },
            { finding: 'Hope and Shame Coexist', implication: 'Positivity-focused programs may miss underlying shame.', action: 'Normalize receiving support without attaching moral judgment.' },
            { finding: 'Hyper-responsibility', implication: "Mothers may not ask for help because they believe they can't stop.", action: 'Offer support without requiring a crisis.' },
            { finding: 'Absence of Self', implication: 'Mental health and long-term resilience are at risk.', action: 'Create opportunities for mothers to reconnect with their identity outside of caregiving.' },
            { finding: 'Trauma-Enforced Isolation', implication: "Social events won't fix trust issues.", action: 'Offer trauma-informed community spaces that rebuild trust slowly.' },
          ].map((row, i) => (
            <div key={row.finding} className={`grid grid-cols-3 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
              <div className="px-4 py-4 text-sm font-semibold text-orange-600 border-r border-gray-100">{row.finding}</div>
              <div className="px-4 py-4 text-sm text-gray-700 border-r border-gray-100 leading-relaxed">{row.implication}</div>
              <div className="px-4 py-4 text-sm text-gray-700 leading-relaxed">{row.action}</div>
            </div>
          ))}
        </div>
      </AccordionSection>

      {/* Accordion 11 — What Single Mothers May Need Most */}
      <AccordionSection
        id="needs"
        title="What Single Mothers May Need Most"
        subtitle="Based on the findings."
      >
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <ul className="space-y-3">
            {[
              'Emotional validation before problem-solving.',
              'Practical relief — childcare, transportation, meals.',
              'Permission to receive help without shame.',
              'Opportunities to reconnect with their own identity.',
              'Consistent support rather than crisis support.',
              'Safe spaces for private grief and honest conversation.',
              'Communities that see strength and struggle simultaneously.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Heart className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </AccordionSection>

      {/* Accordion 12 — A Framework for Supporting Single Mothers */}
      <AccordionSection
        id="framework"
        title="A Framework for Supporting Single Mothers"
        subtitle="A repeatable model for churches, schools, nonprofits, and community groups."
      >
        <div className="space-y-4">
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <div className="grid grid-cols-2 bg-gray-800 text-white">
              <div className="px-6 py-3 text-xs font-bold uppercase tracking-widest">Step</div>
              <div className="px-6 py-3 text-xs font-bold uppercase tracking-widest border-l border-gray-700">Action</div>
            </div>
            {[
              { step: 'See', action: 'Notice signs of invisible burden before crisis occurs.' },
              { step: 'Validate', action: 'Acknowledge emotions before offering solutions.' },
              { step: 'Relieve', action: 'Provide practical support where possible.' },
              { step: 'Restore', action: 'Help mothers reconnect with identity beyond caregiving.' },
              { step: 'Sustain', action: 'Offer consistent support rather than emergency intervention.' },
            ].map((row, i) => (
              <div key={row.step} className={`grid grid-cols-2 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <div className="px-6 py-4 text-sm font-bold text-blue-600 border-r border-gray-100">{row.step}</div>
                <div className="px-6 py-4 text-sm text-gray-700 leading-relaxed">{row.action}</div>
              </div>
            ))}
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
            <p className="text-gray-700 text-sm leading-relaxed">
              This framework transforms research into a repeatable model that churches, schools, nonprofits, and community groups can immediately use.
            </p>
          </div>
        </div>
      </AccordionSection>

      {/* Accordion 13 — Impact */}
      <AccordionSection
        id="impact"
        title="Impact"
        subtitle="How the findings were put to use."
      >
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <ul className="space-y-3">
            {[
              'Findings presented to a support group of 12 single mothers.',
              'Car Cry Validation audio created in response to participant feedback.',
              'Workshops delivered to church leaders supporting single mothers.',
              'Framework currently being expanded for broader community use.',
              'Document shared with institutions supporting single mothers — they reported the data was valuable and insightful.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </AccordionSection>

      {/* Accordion 14 — Next Steps */}
      <AccordionSection
        id="next-steps"
        title="Next Steps"
        subtitle="What comes next for this research."
      >
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <ul className="space-y-4">
            {[
              'Share the data with the single moms who responded — understand their thoughts regarding the usefulness of the data and what we can do to improve it.',
              'Formalise the framework — decision tree, prompt templates, bias checklist, consent addendum for AI use.',
              'Run a larger study — include all responses and compare findings across varying levels of emotional intensity.',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</div>
                <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </AccordionSection>

      {/* Accordion 15 — Reflections */}
      <AccordionSection
        id="reflections"
        title="Reflections"
        subtitle="What went well, what was hard, and what I'd do differently."
      >
        <div className="space-y-4">
          {[
            { label: 'What went well', color: 'bg-green-50 border-green-100 text-green-700', text: 'The "crying in the car" insight became a symbol of invisible grief. The findings were used by church leaders and support groups to shape their approach.' },
            { label: 'What was harder than expected', color: 'bg-amber-50 border-amber-100 text-amber-700', text: 'AI missed several emotional dynamics that emerged during manual analysis and independent review. The terror of sitting in the dark, the weight of a child\'s "it\'s okay" — these remained human territory.' },
            { label: "What I'd do differently", color: 'bg-blue-50 border-blue-100 text-blue-700', text: "I'd bring in a second researcher earlier for inter-rater reliability. I'd also expand the study to include more participants." },
          ].map((item) => (
            <div key={item.label} className={`${item.color} border rounded-2xl p-5`}>
              <p className="text-xs font-bold uppercase tracking-widest mb-2">{item.label}</p>
              <p className="text-gray-700 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </AccordionSection>

      {/* Accordion 16 — What I Assumed vs. What I Learned */}
      <AccordionSection
        id="assumptions"
        title="What I Assumed vs. What I Learned"
        subtitle="Where the evidence surprised me."
      >
        <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
          <div className="grid grid-cols-2 bg-gray-800 text-white">
            <div className="px-6 py-3 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-400" aria-hidden="true" />
              I assumed...
            </div>
            <div className="px-6 py-3 text-xs font-bold uppercase tracking-widest flex items-center gap-2 border-l border-gray-700">
              <CheckCircle className="w-4 h-4 text-green-400" aria-hidden="true" />
              I learned...
            </div>
          </div>
          {[
            { assumed: 'Financial hardship would dominate the findings.', learned: 'Emotional burdens — guilt, identity loss, invisible grief — were equally or more significant.' },
            { assumed: 'AI would be more capable of detecting hidden feelings.', learned: 'AI surfaces surface patterns but cannot feel the weight behind the words.' },
            { assumed: 'The study would produce a report.', learned: 'It produced real, actionable outcomes — the audio, workshops, and a framework.' },
            { assumed: 'The biggest challenge would be the AI.', learned: 'The biggest challenge was translating insights into action that support organizations could use.' },
          ].map((row, i) => (
            <div key={i} className={`grid grid-cols-2 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
              <div className="px-6 py-4 text-sm text-gray-500 leading-relaxed border-r border-gray-100">{row.assumed}</div>
              <div className="px-6 py-4 text-sm text-gray-800 font-medium leading-relaxed">{row.learned}</div>
            </div>
          ))}
        </div>
      </AccordionSection>

      {/* The One Thing — always visible */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex items-start gap-4 mb-8">
            <div className="bg-orange-500 text-white p-3 rounded-xl shrink-0" aria-hidden="true">
              <Lightbulb className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-1">The One Thing I'd Tell Another Researcher</h2>
              <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest">Where the lasting value really lies.</p>
            </div>
          </div>
          <div className="bg-gray-900 text-white rounded-2xl p-8 space-y-4">
            <p className="text-gray-300 leading-relaxed">
              This study taught me something important: <span className="text-white font-semibold">The most valuable insight isn't which AI model performed best.</span>
            </p>
            <p className="text-gray-300 leading-relaxed">
              It's that single mothers are carrying grief, guilt, exhaustion, and identity loss in ways that remain largely invisible to the people trying to help them.
            </p>
            <p className="text-gray-300 leading-relaxed">
              AI helped surface those patterns. But the real work was translating them into something churches, community leaders, and support organizations could actually use.
            </p>
            <p className="text-orange-400 font-semibold leading-relaxed">
              That insight is where the lasting value lies.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-900 text-white border-t border-gray-800">
        <div className="container mx-auto px-6 text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">
            Access & <span className="text-orange-500">Sharing</span>
          </h2>
          <p className="text-gray-300 mb-8">
            For a walkthrough of the framework or to discuss how this approach applies to your research team, reach out directly.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={FIGMA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-7 py-3.5 rounded-full font-bold hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <ExternalLink className="w-4 h-4" />
              View Figma Process Flow
            </a>
            <a
              href="mailto:sigraves@hotmail.com"
              className="inline-flex items-center gap-2 border-2 border-gray-500 text-gray-300 px-7 py-3.5 rounded-full font-bold hover:border-white hover:text-white transition-all duration-200"
            >
              Email Sandra
            </a>
            <Link
              to="/"
              className="inline-flex items-center gap-2 border-2 border-gray-700 text-gray-400 px-7 py-3.5 rounded-full font-bold hover:border-gray-500 hover:text-gray-300 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
