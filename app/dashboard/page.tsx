'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'
import Sidebar from './components/Sidebar'
import Home from './components/Home'
import Post from './components/Post'
import Schedule from './components/Schedule'
import Analytics from './components/Analytics'
import Accounts from './components/Accounts'
import Settings from './components/Settings'

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [activeMenu, setActiveMenu] = useState('home')
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { router.push('/'); return }
      setUser(data.user)
    })
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const menuTitles: Record<string, string> = {
    home: 'Dashboard',
    post: 'Buat Posting',
    schedule: 'Jadwal',
    analytics: 'Analitik',
    accounts: 'Manajemen Akun',
    settings: 'Pengaturan',
  }

  return (
    <div style={{
      display:'grid', gridTemplateColumns:'240px 1fr',
      minHeight:'100vh', fontFamily:'system-ui,sans-serif',
      background:'#0a0a1a',
      backgroundImage:'radial-gradient(ellipse at 20% 20%, #1a1040 0%, #0a0a1a 60%), radial-gradient(ellipse at 80% 80%, #0d1f3c 0%, transparent 60%)',
      color:'white'
    }}>
      <style>{`
        * { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.2); border-radius:2px; }
        input, select, textarea { outline:none; }
        input[type="date"]::-webkit-calendar-picker-indicator,
        input[type="time"]::-webkit-calendar-picker-indicator { filter:invert(1); }
      `}</style>

      <Sidebar
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        user={user}
        onLogout={handleLogout}
      />

      <div style={{ padding:'16px', overflowY:'auto' }}>
        {/* Topbar */}
        <div style={{
          display:'flex', alignItems:'center', justifyContent:'space-between',
          marginBottom:'20px'
        }}>
          <div>
            <h1 style={{ fontSize:'22px', fontWeight:'600' }}>{menuTitles[activeMenu]}</h1>
            <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.4)', marginTop:'2px' }}>
              Selamat datang, {user?.email}
            </p>
          </div>
          <div style={{
            display:'flex', gap:'8px', alignItems:'center',
            background:'rgba(255,255,255,0.05)',
            border:'1px solid rgba(255,255,255,0.1)',
            padding:'6px 14px', borderRadius:'99px', fontSize:'12px', color:'#4ade80'
          }}>● 4 akun aktif</div>
        </div>

        {/* Konten */}
        {activeMenu === 'home' && <Home />}
        {activeMenu === 'post' && <Post />}
        {activeMenu === 'schedule' && <Schedule />}
        {activeMenu === 'analytics' && <Analytics />}
        {activeMenu === 'accounts' && <Accounts />}
        {activeMenu === 'settings' && <Settings />}
      </div>
    </div>
  )
}