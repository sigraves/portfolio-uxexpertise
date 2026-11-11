import FourQuadrant from './FourQuadrant';

const Footer = () => {
  return (
    <footer className="py-8 px-6 border-t border-teal-900/10 text-center">
      <div className="flex items-center justify-center gap-2 mb-2">
        <span className="text-sm font-bold text-gray-800">UXExpertise</span>
        <FourQuadrant size={16} />
      </div>
      <p className="text-xs text-gray-400">
        Sandra Graves — UX Researcher and Strategist
      </p>
      <p className="text-xs text-gray-400 mt-0.5">
        © Sandra Graves — UXExpertise.com — Play My Thinking™
      </p>
    </footer>
  );
};

export default Footer;
