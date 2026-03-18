import React from 'react'
import { LayoutGrid, Bell, User } from 'lucide-react'

const Navbar = () => {
  return (
    <nav className='fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-6 py-3 flex justify-between items-center shadow-2xl'>
        <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/30">
                <LayoutGrid size={20} className="text-white" />
            </div>
            <h1 className='text-lg font-bold tracking-tight text-white'>Aro<span className='text-indigo-400'>Task</span></h1>
        </div>
        
        <div className='flex items-center gap-5 text-slate-400'>
            <Bell size={18} className="hover:text-white cursor-pointer transition-colors" />
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 border border-white/20"></div>
        </div>
    </nav>
  )
}

export default Navbar