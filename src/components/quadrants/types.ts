import type { LucideIcon } from 'lucide-react';
import { Search, Lightbulb, Scale, Share2 } from 'lucide-react';

export interface Quadrant {
  id: 'discover' | 'interpret' | 'decide' | 'influence';
  number: string;
  name: string;
  color: string;
  colorRgb: string;
  tagline: string;
  question: string;
  description: string;
  icon: LucideIcon;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export const quadrants: Quadrant[] = [
  {
    id: 'discover',
    number: '01',
    name: 'DISCOVER',
    color: '#06b6d4',
    colorRgb: '6, 182, 212',
    tagline: 'How I uncover the real problem',
    question: "What's the problem behind the problem?",
    description:
      'Stakeholder interviews, contextual inquiry, and data analysis to find root causes — not just symptoms.',
    icon: Search,
    position: 'top-left',
  },
  {
    id: 'interpret',
    number: '02',
    name: 'INTERPRET',
    color: '#f59e0b',
    colorRgb: '245, 158, 11',
    tagline: 'How I transform evidence into meaningful insights',
    question: 'What patterns are hiding in the noise?',
    description:
      'Synthesizing raw research into themes, insights, and frameworks that make complex evidence actionable.',
    icon: Lightbulb,
    position: 'top-right',
  },
  {
    id: 'decide',
    number: '03',
    name: 'DECIDE',
    color: '#3b82f6',
    colorRgb: '59, 130, 246',
    tagline: 'How I evaluate alternatives and strategic trade-offs',
    question: 'What matters most when everything matters?',
    description:
      'Prioritization frameworks and trade-off analysis to turn competing priorities into clear strategic direction.',
    icon: Scale,
    position: 'bottom-left',
  },
  {
    id: 'influence',
    number: '04',
    name: 'INFLUENCE',
    color: '#f97316',
    colorRgb: '249, 115, 22',
    tagline: 'How I help stakeholders turn insights into action',
    question: 'How does an insight become a movement?',
    description:
      'Storytelling, workshops, and executive communication that move stakeholders from awareness to ownership.',
    icon: Share2,
    position: 'bottom-right',
  },
];
