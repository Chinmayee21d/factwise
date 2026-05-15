'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight, ExternalLink } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All', count: 6 },
  { id: 'engineering', label: 'Engineering', count: 1 },
  { id: 'design', label: 'Design', count: 1 },
  { id: 'product', label: 'Product', count: 1 },
  { id: 'business', label: 'Business', count: 2 },
  { id: 'people', label: 'People', count: 1 },
];

const JOBS = [
  {
    id: 1,
    title: "UI / UX Design",
    team: "Design",
    category: "design",
    location: "Remote / Mumbai",
    desc: "Driven by a passion to create a product that simplifies our customers' lives and makes it a great experience while doing so."
  },
  {
    id: 2,
    title: "People & Culture",
    team: "People",
    category: "people",
    location: "Mumbai",
    desc: "Build a great team and enable each person to impact culture — facilitating growth, recruiting talent, and translating ethos into practice."
  },
  {
    id: 3,
    title: "Software Development",
    team: "Engineering",
    category: "engineering",
    location: "Remote / Mumbai",
    desc: "Problem solvers, thinkers, creators. We convert concept to reality with a passion for software, distributed systems, and good API design."
  },
  {
    id: 4,
    title: "Business Analyst",
    team: "Business",
    category: "business",
    location: "Mumbai",
    desc: "Power the day-to-day at FactWise. Use your love for data to solve problems and strategize across critical areas of the business."
  },
  {
    id: 5,
    title: "Product Management",
    team: "Product",
    category: "product",
    location: "Remote / Mumbai",
    desc: "Interface rhythmically between developers, designers, and data scientists — adapting and iterating to translate client objectives into a powerful product."
  },
  {
    id: 6,
    title: "Marketing",
    team: "Business",
    category: "business",
    location: "Remote",
    desc: "Bring the FactWise platform to all B2B businesses — build product awareness, analyse market trends, and creatively strategize on expanding the user base."
  }
];

export const CareersOpenings = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredJobs = activeCategory === 'all' 
    ? JOBS 
    : JOBS.filter(job => job.category === activeCategory);

  return (
    <section id="openings" className="py-32 px-6 md:px-14 bg-slate-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-4 py-1.5 rounded-full bg-white border border-blue-100 text-[#3666ff] text-[10px] font-bold uppercase tracking-[0.2em] mb-6 shadow-sm"
            >
              Open Roles
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tighter"
            >
              Find <span className="text-[#3666ff] font-instrument italic font-medium">your place</span> at FactWise.
            </motion.h2>
          </div>
        </div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeCategory === cat.id 
                ? 'bg-slate-900 border-slate-900 text-white shadow-lg' 
                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-400'
              }`}
            >
              {cat.label}
              <span className={`ml-2 text-[10px] opacity-60 ${activeCategory === cat.id ? 'text-white' : ''}`}>
                {cat.count}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Job List */}
        <div className="border-t border-slate-200">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {filteredJobs.map((job) => (
                <motion.a
                  key={job.id}
                  href={`#`}
                  className="group relative flex flex-col md:flex-row items-start md:items-center justify-between py-10 border-b border-slate-200 hover:px-6 transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#3666ff] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />
                  
                  <div className="max-w-2xl mb-4 md:mb-0">
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 group-hover:text-[#3666ff] transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-slate-500 text-lg leading-relaxed max-w-xl">
                      {job.desc}
                    </p>
                  </div>

                  <div className="flex flex-col md:items-end gap-2 text-right">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#3666ff] bg-blue-50 px-3 py-1 rounded-full">
                      {job.team}
                    </span>
                    <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                      <MapPin className="size-4" />
                      {job.location}
                    </div>
                  </div>

                  <div className="hidden md:flex size-14 rounded-full border border-slate-200 items-center justify-center group-hover:bg-[#3666ff] group-hover:border-[#3666ff] group-hover:text-white group-hover:-rotate-45 transition-all duration-500">
                    <ArrowRight className="size-6" />
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA Footer */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-10 md:p-16 rounded-[40px] bg-slate-950 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10"
        >
          <div className="relative z-10 max-w-xl text-center md:text-left">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Don't see your <span className="text-[#3666ff] font-instrument italic font-medium">perfect role?</span>
            </h3>
            <p className="text-slate-400 text-lg">
              Write to us anyway — we'd love to explore if there's a fit for your unique skills.
            </p>
          </div>
          
          <a 
            href="mailto:recruiting@factwise.io"
            className="relative z-10 px-8 py-4 bg-white text-slate-950 rounded-full font-bold hover:bg-[#3666ff] hover:text-white transition-all duration-300 flex items-center gap-3 group"
          >
            recruiting@factwise.io
            <ExternalLink className="size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>

          {/* Decorative Glow */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4" />
        </motion.div>
      </div>
    </section>
  );
};
