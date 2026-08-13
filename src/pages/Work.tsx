import React from 'react';
import { ArrowLeft, ExternalLink, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

type ProjectLink = { label: string; href: string; style: 'primary' | 'secondary'; internal?: boolean };

type Project = {
  title: string;
  category: string;
  year: string;
  impact: string;
  role: string;
  description: string;
  tools: string[];
  thumbnail: string;
  links: ProjectLink[];
};

const projects: Project[] = [
  {
    title: "WarU — Defense Learning Platform",
    category: "Government / Defense",
    year: "2022–Present",
    impact: "Design cycle time cut 30%+",
    role: "Lead UX Researcher & Designer",
    description:
      "Dozens of teams kept solving the same problems. I started by listening. One stakeholder told us: \"We've been circling the same problems for years. Now we finally have a path forward.\" A learner said: \"This course is hard to get through — I struggle to stay focused.\" We built a design system, then a new platform that the director mandated for daily use. Design time dropped 30%+. The team won awards.",
    tools: ["Adobe XD", "Visio", "SharePoint", "Qlik", "Lectora", "Storyline", "MS Teams"],
    thumbnail: "https://images.pexels.com/photos/7376/startup-photos.jpg",
    links: [
      { label: "View Case Study", href: "/waru", style: "primary", internal: true },
    ],
  },
  {
    title: "Energy Company — Customer Engagement Research",
    category: "Utility",
    year: "2024–2025",
    impact: "Mixed-methods research delivered to guide a strategic portal overhaul.",
    role: "UX Research Consultant",
    description:
      "Customers tried to save energy — unplugging appliances, turning things off — but their bills didn't change. They didn't understand why, so they paid with frustration and called to complain. We ran a Gap Analysis, then interviews, then multiple test rounds. We discovered a daily reward spinner changed behaviour. After implementation, customers stopped calling about bills and started checking the app for fun. Stakeholder satisfaction followed.",
    tools: ["GA4", "Hotjar", "Miro", "User Interviews", "Competitive Analysis"],
    thumbnail: "https://images.pexels.com/photos/8853507/pexels-photo-8853507.jpeg",
    links: [
      { label: "View Case Study", href: "/energy", style: "primary", internal: true },
    ],
  },
  {
    title: "Patient Care Platform",
    category: "Healthcare",
    year: "2024",
    impact: "18% reduction in 30-day readmissions. Post-discharge engagement up 48%.",
    role: "Lead UX Researcher & Designer",
    description:
      "Medicare patients were cycling back through hospitals because the handoff to home failed — not treatment. User interviews with discharge nurses and patients revealed that post-discharge confusion, not clinical failure, drove most readmissions. Designed a unified monitoring and outreach platform spanning three user roles — patients, clinicians, and administrators — with real-time monitoring, smart alerts, and automated workflows.",
    tools: ["Figma", "Miro", "Optimal Workshop", "Dovetail", "Zoom", "Zeplin"],
    thumbnail: "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg",
    links: [
      { label: "View Case Study", href: "https://drive.google.com/file/d/1Q_rA9tI4LfhsK_IWzFV4tKBZq9TLGHkg/view?usp=sharing", style: "primary" },
    ],
  },
  {
    title: "Banking Now — Military Financial Platform",
    category: "Fintech",
    year: "2024",
    impact: "Unified banking, insurance & advisory into one mission-focused experience.",
    role: "Lead UX Designer & Researcher",
    description:
      "Service members navigate deployments, relocations, and unique benefits with tools built for civilians. Remote testing with 50+ active-duty personnel surfaced the core finding: existing tools required the user to adapt to civilian norms, not the reverse. Built a unified command center — banking, insurance, and financial advisory — designed around deployment cycles, not civilian assumptions.",
    tools: ["Figma", "Adobe CC", "Miro", "GA4", "UserZoom", "EnjoyHQ", "Mixpanel"],
    thumbnail: "https://images.pexels.com/photos/4482900/pexels-photo-4482900.jpeg",
    links: [
      { label: "View Prototype", href: "https://bankingnow.netlify.app/", style: "primary" },
      { label: "View Figma", href: "https://www.figma.com/proto/WXUkaV4aTarA4njNGCjsac/BankingNow?node-id=3-2&t=Gp73UWFhWXX8jJj0-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=3%3A2", style: "secondary" },
    ],
  },
  {
    title: "EdCare — Online Learning Platform",
    category: "EdTech",
    year: "2023",
    impact: "+35% course completion. Credibility and enrollment restored.",
    role: "Lead UX Designer & Researcher",
    description:
      "Broken course data, inconsistent descriptions, and a misaligned visual system made users distrust the platform before enrolling. Tree testing and moderated usability sessions with prospective learners confirmed that trust collapsed before checkout — not during it. Overhauled the information architecture, rewrote course content with transparent learning outcomes, and rebuilt the visual system to restore credibility at every touchpoint.",
    tools: ["Figma", "Miro", "Optimal Workshop", "Dovetail", "UserTesting.com", "Visio"],
    thumbnail: "https://images.pexels.com/photos/4145194/pexels-photo-4145194.jpeg",
    links: [
      { label: "View Prototype", href: "https://edcare-uxuipros.netlify.app/", style: "primary" },
    ],
  },
  {
    title: "Cozymeal — Culinary Booking Experience",
    category: "Consumer UX",
    year: "2020",
    impact: "Booking hesitation removed. Premium brand positioning reinforced.",
    role: "Lead UX Designer & Researcher",
    description:
      "Incorrect ratings, low-quality imagery, and a visually inconsistent booking flow undercut a premium brand at the exact moment users decided whether to convert. Heuristic evaluation and task-based usability testing with culinary enthusiasts identified the precise drop-off moments in the booking flow. Rebuilt class discovery around a clean grid system, resolved content integrity issues, and aligned the interface with the brand's premium positioning.",
    tools: ["Figma", "Adobe CC", "Miro", "Bootstrap", "Google Analytics"],
    thumbnail: "https://images.pexels.com/photos/9986235/pexels-photo-9986235.jpeg",
    links: [
      { label: "View Prototype", href: "https://cozymealsite.netlify.app/", style: "primary" },
      { label: "View Figma", href: "https://www.figma.com/proto/x5jb3NeleHVcg0CW00At8v/Cozymeal-Classes?node-id=1-535&t=7LkxCES7QTJuO9uV-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1", style: "secondary" },
    ],
  },
];

const linkClass = {
  primary:
    "inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-200 shadow-md",
  secondary:
    "inline-flex items-center gap-2 border border-blue-300 text-blue-600 px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200",
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const isEven = index % 2 === 0;

  return (
    <article className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className={`grid lg:grid-cols-5 gap-0`}>

        {/* Thumbnail — 2 of 5 columns */}
        <div className={`lg:col-span-2 relative ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
          <div className="h-[300px] lg:h-[300px] relative overflow-hidden group">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            <div className="absolute top-4 left-4">
              <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-bold px-3 py-1 rounded-full">
                {project.year}
              </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="text-white/80 text-xs font-medium tracking-wide uppercase mb-1">{project.category}</p>
              <h3 className="text-white text-xl font-bold leading-tight">{project.title}</h3>
            </div>
          </div>
        </div>

        {/* Content — 3 of 5 columns */}
        <div className={`lg:col-span-3 p-8 flex flex-col gap-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>

          {/* Role + Impact */}
          <div className="flex flex-wrap items-start gap-3">
            <span className="text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100 rounded-full px-3 py-1">
              {project.role}
            </span>
            <span className="text-xs font-semibold bg-green-50 text-green-700 border border-green-100 rounded-full px-3 py-1">
              {project.impact}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-700 text-base leading-relaxed">{project.description}</p>

          {/* Tools */}
          <div className="flex flex-wrap gap-1.5">
            {project.tools.map((t) => (
              <span key={t} className="text-xs bg-gray-100 text-gray-600 rounded-full px-2.5 py-1 font-medium">
                {t}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-2 pt-2 mt-auto border-t border-gray-100">
            {project.links.map((l) =>
              l.internal ? (
                <Link key={l.href} to={l.href} className={linkClass[l.style]}>
                  <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                  {l.label}
                </Link>
              ) : (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass[l.style]}
                >
                  {l.label}
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

const Work = () => (
  <div className="min-h-screen bg-gray-50">
    <a
      href="#work-main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-orange-500 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold focus:shadow-lg"
    >
      Skip to main content
    </a>
    <Header />

    <div className="bg-white shadow-sm pt-20">
      <div className="container mx-auto px-6 py-4">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors duration-200 font-medium text-sm"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Back to Portfolio
        </a>
      </div>
    </div>

    {/* Page hero */}
    <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 text-white" id="work-main" tabIndex={-1}>
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <p className="text-orange-400 text-sm font-semibold uppercase tracking-widest mb-4">Selected Work</p>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Research that moves.<br />
          <span className="text-orange-400">Design that delivers.</span>
        </h1>
        <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
          Six end-to-end engagements — each anchored in research, shaped by constraints, measured against outcomes.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-8 text-sm">
          {[
            { value: "20+", label: "Years in UX" },
            { value: "6", label: "Industries" },
            { value: "18%", label: "Readmission Reduction" },
            { value: "35%", label: "Course Completion Lift" },
            { value: "30%+", label: "Design Cycle Reduction" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-bold text-orange-400">{s.value}</div>
              <div className="text-gray-300 text-xs mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Project list */}
    <section className="py-20">
      <div className="container mx-auto px-6 max-w-6xl space-y-10">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-6 text-center max-w-2xl">
        <h2 className="text-4xl font-bold mb-4">
          Ready to <span className="text-orange-500">Collaborate?</span>
        </h2>
        <p className="text-gray-300 text-lg mb-8">
          Open to senior UX research and design strategy roles — federal, enterprise, and remote contracts.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="mailto:sigraves@hotmail.com"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Email Sandra
          </a>
          <a
            href="https://www.linkedin.com/in/sandragraves/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-gray-500 text-gray-300 px-8 py-4 rounded-full font-bold text-lg hover:border-white hover:text-white transition-all duration-200"
          >
            Connect on LinkedIn
            <ExternalLink className="w-5 h-5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>

    <Footer showResearchLink />
  </div>
);

export default Work;
