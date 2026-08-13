import React from 'react';
import { ArrowRight } from 'lucide-react';

const ContactCTA = () => {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-3xl text-center">

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Let's Solve Something Meaningful
        </h2>

        <p className="text-lg text-gray-600 leading-relaxed mb-10 max-w-2xl mx-auto">
          Whether you're improving an employee experience, modernizing internal services,
          exploring Human-Centered AI, or trying to better understand your users, I'd welcome
          the opportunity to connect.
        </p>

        <a
          href="mailto:sigraves@hotmail.com"
          className="group inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-10 py-4 rounded-lg font-semibold text-base transition-colors duration-200"
        >
          Contact Me
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
        </a>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-6 text-sm text-gray-500">
          <a
            href="https://www.linkedin.com/in/sandragraves/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-600 transition-colors duration-200 font-medium"
          >
            linkedin.com/in/sandragraves
          </a>
          <span className="hidden sm:block text-gray-300">|</span>
          <a
            href="tel:2103430851"
            className="hover:text-orange-600 transition-colors duration-200 font-medium"
          >
            210-343-0851
          </a>
          <span className="hidden sm:block text-gray-300">|</span>
          <span>Living in San Antonio, TX</span>
        </div>

      </div>
    </section>
  );
};

export default ContactCTA;
