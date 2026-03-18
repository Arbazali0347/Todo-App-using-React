import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Edit3, CheckCircle2, Circle, Search } from 'lucide-react'
import Navbar from './components/Navbar'

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [editIndex, setEditIndex] = useState(null)
  const focuse = useRef()

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("proTodos"))
    if (saved) setTodos(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem("proTodos", JSON.stringify(todos))
  }, [todos])

  const handleAction = () => {
    if (todo.trim() === "") return
    if (editIndex !== null) {
      const updated = [...todos]
      updated[editIndex].text = todo
      setTodos(updated)
      setEditIndex(null)
    } else {
      setTodos([{ id: Date.now(), text: todo, completed: false }, ...todos])
    }
    setTodo("")
  }

  return (
    <div className='min-h-screen bg-[#050505] text-slate-200 selection:bg-indigo-500/30 font-sans pb-20'>
      {/* Dynamic Background Light */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/20 blur-[120px] rounded-full -z-10"></div>
      
      <Navbar />

      <main className="max-w-3xl mx-auto pt-32 px-6">
        {/* Input Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-extrabold text-white mb-2">My Tasks</h2>
          <p className="text-slate-500 mb-8 font-medium">Focus on what matters most today.</p>
          
          <div className="relative flex gap-3 p-2 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm shadow-inner">
            <input 
              ref={focuse}
              type="text" 
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              placeholder="What's your next big move?"
              className="w-full bg-transparent px-4 py-3 outline-none placeholder:text-slate-600 font-medium"
              onKeyDown={(e) => e.key === 'Enter' && handleAction()}
            />
            <button 
              onClick={handleAction}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 rounded-xl flex items-center gap-2 font-bold transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
            >
              {editIndex !== null ? 'Update' : <><Plus size={18}/> Add</>}
            </button>
          </div>
        </motion.div>

        {/* Task Grid */}
        <div className="grid gap-4">
          <AnimatePresence mode='popLayout'>
            {todos.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                className={`group flex items-center justify-between p-5 rounded-2xl border transition-all ${
                  item.completed 
                  ? 'bg-white/[0.02] border-white/5 opacity-50' 
                  : 'bg-white/[0.04] border-white/10 hover:border-indigo-500/50 hover:bg-white/[0.06] shadow-xl shadow-black/40'
                }`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <button 
                    onClick={() => {
                      const newT = [...todos]; newT[index].completed = !newT[index].completed; setTodos(newT)
                    }}
                    className="transition-transform active:scale-90"
                  >
                    {item.completed ? 
                      <CheckCircle2 className="text-indigo-400" size={24} /> : 
                      <Circle className="text-slate-600 group-hover:text-indigo-400 transition-colors" size={24} />
                    }
                  </button>
                  
                  <span className={`text-[17px] font-medium transition-all ${item.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                    {item.text}
                  </span>
                </div>

                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                  <button 
                    onClick={() => { setEditIndex(index); setTodo(item.text); focuse.current.focus() }}
                    className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"
                  >
                    <Edit3 size={18} />
                  </button>
                  <button 
                    onClick={() => setTodos(todos.filter((_, i) => i !== index))}
                    className="p-2 hover:bg-red-500/20 rounded-lg text-slate-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {todos.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center py-20 border-2 border-dashed border-white/5 rounded-3xl"
            >
              <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-slate-600" />
              </div>
              <p className="text-slate-500 font-medium">All caught up! No tasks found.</p>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App