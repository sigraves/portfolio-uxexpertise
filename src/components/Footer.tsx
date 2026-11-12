import { useNavigate } from 'react-router-dom';
import FourQuadrant from './FourQuadrant';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="py-8 px-6 border-t border-teal-900/10 text-center">
      <div className="flex items-center justify-center gap-2 mb-2">
        <span className="text-sm font-bold text-gray-800">UXExpertise</span>
        <a
          href="/my-favorites"
          onClick={(e) => {
            e.preventDefault();
            navigate('/my-favorites');
          }}
          aria-label="Explore My Favorites interactive design system."
          className="inline-flex rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#E9FAF3] transition-transform hover:scale-110"
        >
          <FourQuadrant size={16} />
        </a>
      </div>
      <p className="text-xs text-gray-400">
        Sandra Graves — UX Researcher and Strategist
      </p>
      <p className="text-xs text-gray-400 mt-0.5">
        © UXExpertise.com — Play My Thinking™
      </p>
    </footer>
  );
};

export default Footer;
