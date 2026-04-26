'use client';

import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  MessageSquare, 
  BarChart3, 
  Bell, 
  Search,
  MoreHorizontal,
  ChevronLeft,
  Settings,
  Share2,
  Trophy,
  ShoppingBag,
  HelpCircle,
  Filter
} from 'lucide-react';

export default function DashboardMockup() {
  return (
    <div className="w-full bg-[#0a0a0c] rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex font-sans text-gray-200 h-[700px] relative">
      {/* Sidebar */}
      <div className="w-16 md:w-20 bg-[#0a0a0c] border-r border-white/5 flex flex-col items-center py-6 gap-8">
        <div className="w-10 h-10 bg-[#0052cc] rounded-lg flex items-center justify-center text-white font-black text-xl">F</div>
        <div className="flex flex-col gap-6 items-center">
          <LayoutDashboard size={20} className="text-[#0052cc]" />
          <Users size={20} className="text-gray-500 hover:text-white transition-colors" />
          <FileText size={20} className="text-gray-500 hover:text-white transition-colors" />
          <MessageSquare size={20} className="text-gray-500 hover:text-white transition-colors" />
          <BarChart3 size={20} className="text-gray-500 hover:text-white transition-colors" />
          <ShoppingBag size={20} className="text-gray-500 hover:text-white transition-colors" />
        </div>
        <div className="mt-auto flex flex-col gap-6 items-center">
           <HelpCircle size={20} className="text-gray-500 hover:text-white transition-colors" />
           <div className="w-8 h-8 rounded-full bg-gray-800" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[#0a0a0c]">
        {/* Header / Tabs */}
        <header className="h-14 bg-[#0a0a0c] border-b border-white/5 flex items-center justify-between px-6">
          <div className="flex gap-1 h-full items-center">
            {[
              { label: 'Inbound', count: 372 },
              { label: 'Drafts', count: 860 },
              { label: 'Ongoing', count: 383, active: true },
              { label: 'Finished', count: '03' },
              { label: 'All', count: 1246 }
            ].map((tab) => (
              <div 
                key={tab.label} 
                className={`flex items-center px-4 h-full cursor-pointer text-[11px] font-semibold transition-all relative ${tab.active ? 'text-white' : 'text-gray-500'}`}
              >
                {tab.label} 
                <span className={`ml-1.5 px-1.5 py-0.5 rounded-full border text-[9px] ${tab.active ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-white/5 border-white/5 text-gray-500'}`}>
                  {tab.count}
                </span>
                {tab.active && <motion.div layoutId="tab-active" className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-500" />}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-5">
            <HelpCircle size={18} className="text-gray-500" />
            <Settings size={18} className="text-gray-500" />
            <Bell size={18} className="text-gray-500" />
            <div className="h-8 w-px bg-white/5 mx-2" />
            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[11px] font-bold text-gray-300 cursor-pointer">
              <Users size={12} className="mr-1" /> Buyer
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-[10px] font-bold">Admin</div>
                <div className="text-[9px] text-gray-500">FactWise Demo</div>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border border-white/10" />
            </div>
          </div>
        </header>

        {/* Dashboard Area */}
        <div className="flex-1 overflow-auto p-6 flex flex-col gap-6 scrollbar-hide">
          
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2 text-gray-500">
               <ChevronLeft size={16} />
               <span className="text-[11px] font-bold uppercase tracking-wider">Back</span>
            </div>
            <h1 className="text-[15px] font-bold text-white absolute left-1/2 -translate-x-1/2">
              Bid Analytics: K-A RFQ - 25 Apr '26 07:13 pm
            </h1>
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-1 text-[11px] font-bold text-blue-400 cursor-pointer">
                 RFQ details <motion.span animate={{ y: [0, 2, 0] }} transition={{ repeat: Infinity, duration: 2 }}>↓</motion.span>
              </div>
              <div className="flex gap-3 text-blue-400/80">
                <motion.div whileHover={{ scale: 1.1 }}><Share2 size={16} /></motion.div>
                <motion.div whileHover={{ scale: 1.1 }}><Trophy size={16} /></motion.div>
                <motion.div whileHover={{ scale: 1.1 }}><BarChart3 size={16} /></motion.div>
                <motion.div whileHover={{ scale: 1.1 }}><FileText size={16} /></motion.div>
                <motion.div whileHover={{ scale: 1.1 }}><MessageSquare size={16} /></motion.div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
             <div className="bg-white/[0.03] p-5 rounded-xl border border-white/5 flex flex-col items-center justify-center gap-1">
                <div className="text-3xl font-bold text-[#10b981]">0.02 Hours</div>
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Avg vendor response time</div>
             </div>
             <div className="bg-white/[0.03] p-5 rounded-xl border border-white/5 flex flex-col items-center justify-center gap-1">
                <div className="text-3xl font-bold text-[#10b981]">8 %</div>
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Vendor participation</div>
             </div>
             <div className="bg-white/[0.03] p-5 rounded-xl border border-white/5 flex flex-col items-center justify-center gap-1">
                <div className="text-3xl font-bold text-[#10b981]">Thrift Co.</div>
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Most competitive vendor</div>
             </div>
             <div className="bg-white/[0.03] p-5 rounded-xl border border-white/5 flex flex-col items-center justify-center gap-1">
                <div className="text-3xl font-bold text-[#10b981]">0.67</div>
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Avg unique vendors bidding per item</div>
             </div>
          </div>

          <div className="grid grid-cols-12 gap-4 h-64">
            {/* Raw material 1 Chart */}
            <div className="col-span-8 bg-white/[0.02] border border-white/5 rounded-xl p-6 relative">
               <div className="text-[10px] font-bold text-gray-400 mb-6 uppercase">Raw material 1</div>
               <div className="flex h-40 gap-4 items-end px-4 relative">
                  <div className="absolute left-0 inset-y-0 flex flex-col justify-between text-[9px] text-gray-500 font-mono">
                    <span>₹1.00</span>
                    <span>₹0.80</span>
                    <span>₹0.60</span>
                    <span>₹0.40</span>
                    <span>₹0.20</span>
                  </div>
                  <div className="flex-1" />
                  <div className="flex flex-col items-center gap-2">
                     <motion.div 
                       initial={{ height: 0 }}
                       animate={{ height: '90%' }}
                       transition={{ duration: 1.2, ease: "circOut" }}
                       className="w-10 bg-yellow-400 border border-black relative"
                     />
                     <span className="text-[10px] text-gray-400">Thrift Co</span>
                  </div>
                  <div className="flex-1" />
               </div>
               <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 text-[9px] text-gray-500">
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-blue-400" /> Base Rate</div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-purple-400" /> Effective Rate</div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-yellow-400" /> Landed Rate</div>
               </div>
            </div>

            {/* Overall Rank Donut */}
            <div className="col-span-4 bg-white/[0.02] border border-white/5 rounded-xl p-6 flex flex-col items-center justify-center relative">
               <div className="absolute top-6 left-6 text-[10px] font-bold text-gray-400 uppercase">Thrift Co.</div>
               <div className="absolute top-6 right-6 text-[9px] text-gray-500">Invited to: 4/8 items</div>
               
               <div className="relative w-40 h-40 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle 
                      cx="80" cy="80" r="60" 
                      stroke="rgba(255,255,255,0.05)" strokeWidth="20" fill="transparent" 
                    />
                    <motion.circle 
                      initial={{ strokeDasharray: "0 1000" }}
                      animate={{ strokeDasharray: "320 1000" }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                      cx="80" cy="80" r="60" 
                      stroke="#82ca9d" strokeWidth="20" fill="transparent" 
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-[10px] text-gray-400">Overall Rank</div>
                    <div className="text-3xl font-black">1</div>
                  </div>
               </div>

               <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4">
                  {[
                    { label: 'Average bids (0)', color: '#94a3b8' },
                    { label: 'Non-Competitive bids (0)', color: '#ef4444' },
                    { label: 'Competitive bids (4)', color: '#10b981' }
                  ].map(l => (
                    <div key={l.label} className="flex items-center gap-1.5 text-[8px] text-gray-500">
                      <div className="w-2 h-2 rounded-full" style={{ background: l.color }} /> {l.label}
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* Bid Database Table */}
          <div className="bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden mb-20">
             <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
                <div className="flex items-center gap-3">
                   <h2 className="text-xs font-bold uppercase tracking-wider">Bid Database</h2>
                   <div className="flex gap-2">
                     <Search size={14} className="text-gray-500" />
                     <Filter size={14} className="text-gray-500" />
                   </div>
                </div>
                <div className="flex gap-4">
                   <div className="flex items-center gap-1.5 text-[9px] text-gray-400">
                     <div className="w-2.5 h-2.5 bg-blue-500" /> RFQ
                   </div>
                   <div className="flex items-center gap-1.5 text-[9px] text-gray-400">
                     <div className="w-2.5 h-2.5 bg-[#10b981]" /> Vendor Response
                   </div>
                </div>
             </div>
             
             <div className="overflow-x-auto text-[10px]">
               <table className="w-full">
                  <thead>
                    <tr className="text-gray-500 text-left bg-white/[0.02]">
                      <th className="p-3 pl-5 border-r border-white/5">T...</th>
                      <th className="p-3 border-r border-white/5">Item Name</th>
                      <th className="p-3 border-r border-white/5">Target Eff. Rate</th>
                      <th className="p-3 border-r border-white/5">Vendor</th>
                      <th className="p-3 border-r border-white/5">Quantity</th>
                      <th className="p-3 border-r border-white/5">Landed rate</th>
                      <th className="p-3">Total Landed Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: 1, name: 'Raw material 1', target: '₹1.0000 / Inch', vendor: 'Thrift Co.', qty: '1.00 Inch(s)', rate: '₹285.24 / Inch', total: '₹285.24' },
                      { id: 2, name: 'Raw material 1', target: '₹1.0000 / Inch', vendor: 'Thrift Co.', qty: '1.00 Inch(s)', rate: '₹285.24 / Inch', total: '₹285.24' },
                      { id: 3, name: 'Raw material 2', target: '₹100.00 / Pieces', vendor: 'Thrift Co.', qty: '1.00 Pieces(s)', rate: '₹743.85 / Pieces', total: '₹743.85' },
                      { id: 4, name: 'Raw material 2', target: '₹1.0000 / Pieces', vendor: 'Thrift Co.', qty: '1.00 Pieces(s)', rate: '₹285.24 / Pieces', total: '₹285.24' }
                    ].map((row) => (
                      <tr key={row.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="p-3 pl-5 border-r border-white/5 flex items-center gap-2">
                           <span className="text-gray-500">{row.id}</span>
                           <Trophy size={12} className="text-yellow-500" />
                        </td>
                        <td className="p-3 border-r border-white/5 font-medium">{row.name}</td>
                        <td className="p-3 border-r border-white/5 text-gray-400 font-mono">{row.target}</td>
                        <td className="p-3 border-r border-white/5 text-blue-400 font-bold flex items-center gap-1">
                          {row.vendor} <div className="w-2.5 h-2.5 bg-blue-500 rounded-full flex items-center justify-center text-[6px] text-white">✓</div>
                        </td>
                        <td className="p-3 border-r border-white/5 text-gray-400">{row.qty}</td>
                        <td className="p-3 border-r border-white/5 font-bold font-mono">{row.rate}</td>
                        <td className="p-3 font-bold font-mono">{row.total}</td>
                      </tr>
                    ))}
                  </tbody>
               </table>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
