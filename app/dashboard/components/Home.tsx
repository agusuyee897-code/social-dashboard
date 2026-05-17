'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const glass = {
  background: 'rgba(255,255,255,0.05)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.1)',
}

const platforms = [
  { id:'x',  label:'X / Twitter', color:'#ffffff', selectedBg:'linear-gradient(135deg,#1a1a1a,#333)',
    svg:<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  { id:'ig', label:'Instagram',   color:'#e1306c', selectedBg:'linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)',
    svg:<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
  { id:'fb', label:'Facebook',    color:'#1877f2', selectedBg:'linear-gradient(135deg,#1877f2,#0d5cbf)',
    svg:<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
  { id:'li', label:'LinkedIn',    color:'#0a66c2', selectedBg:'linear-gradient(135deg,#0a66c2,#064e94)',
    svg:<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { id:'yt', label:'YouTube',     color:'#ff0000', selectedBg:'linear-gradient(135deg,#ff0000,#cc0000)',
    svg:<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
  { id:'tk', label:'TikTok',      color:'#69C9D0', selectedBg:'linear-gradient(135deg,#010101,#2d2d2d)',
    svg:<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/></svg> },
]

interface Post {
  id: string
  platform: string
  content: string
  media_urls: string[]
  status: string
  created_at: string
}

interface Stats {
  totalPosts: number
  totalPostsThisWeek: number
  scheduled: number
  activeAccounts: number
}

interface PlatformStat {
  id: string
  count: number
}

export default function Home() {
  const [posts, setPosts]               = useState<Post[]>([])
  const [stats, setStats]               = useState<Stats>({ totalPosts:0, totalPostsThisWeek:0, scheduled:0, activeAccounts:0 })
  const [platformStats, setPlatformStats] = useState<PlatformStat[]>([])
  const [loading, setLoading]           = useState(true)

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) return
      const uid = session.user.id

      // Ambil semua posts
      const { data: allPosts } = await supabase
        .from('posts')
        .select('*')
        .eq('user_id', uid)
        .order('created_at', { ascending: false })

      // Ambil jumlah akun aktif
      const { count: activeAccounts } = await supabase
        .from('accounts')
        .select('*', { count:'exact', head:true })
        .eq('user_id', uid)
        .eq('status', 'active')

      if (allPosts) {
        setPosts(allPosts.slice(0, 6))

        // Hitung stats
        const now = new Date()
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        const thisWeek = allPosts.filter(p => new Date(p.created_at) >= weekAgo)
        const scheduled = allPosts.filter(p => p.status === 'scheduled')

        setStats({
          totalPosts: allPosts.length,
          totalPostsThisWeek: thisWeek.length,
          scheduled: scheduled.length,
          activeAccounts: activeAccounts || 0,
        })

        // Hitung per platform
        const platCount: Record<string, number> = {}
        allPosts.forEach(p => { platCount[p.platform] = (platCount[p.platform] || 0) + 1 })
        setPlatformStats(Object.entries(platCount).map(([id, count]) => ({ id, count })))
      }

      setLoading(false)
    }
    init()
  }, [])

  const formatTime = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime()
    const mins  = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days  = Math.floor(diff / 86400000)
    if (mins < 60)  return `${mins} menit lalu`
    if (hours < 24) return `${hours} jam lalu`
    if (days === 1) return 'Kemarin'
    return `${days} hari lalu`
  }

  if (loading) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'200px', color:'rgba(255,255,255,0.4)', fontSize:'14px' }}>
      ⏳ Memuat dashboard...
    </div>
  )

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'12px' }}>
        {[
          { label:'Total Posting',   value: stats.totalPosts.toString(),        sub: `+${stats.totalPostsThisWeek} minggu ini`, icon:'📝', color:'#667eea' },
          { label:'Akun Aktif',      value: stats.activeAccounts.toString(),     sub: 'platform terhubung',                      icon:'🔗', color:'#06b6d4' },
          { label:'Platform Dipakai',value: platformStats.length.toString(),     sub: 'dari 6 platform',                         icon:'📡', color:'#f43f5e' },
          { label:'Terjadwal',       value: stats.scheduled.toString(),          sub: 'postingan pending',                       icon:'⏰', color:'#f59e0b' },
        ].map((s, i) => (
          <div key={i} style={{ ...glass, padding:'1.25rem', borderRadius:'16px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'12px' }}>
              <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.5)', textTransform:'uppercase' }}>{s.label}</div>
              <span style={{ fontSize:'20px' }}>{s.icon}</span>
            </div>
            <div style={{ fontSize:'26px', fontWeight:'700', color:s.color }}>{s.value}</div>
            <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)', marginTop:'4px' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Riwayat Posting */}
      <div style={{ ...glass, padding:'1.5rem', borderRadius:'16px' }}>
        <h3 style={{ fontSize:'15px', fontWeight:'600', marginBottom:'1rem', color:'white' }}>📋 Riwayat Posting Terbaru</h3>
        {posts.length === 0 ? (
          <div style={{ textAlign:'center', padding:'2rem', color:'rgba(255,255,255,0.3)' }}>
            <div style={{ fontSize:'36px', marginBottom:'8px' }}>📭</div>
            <div style={{ fontSize:'14px' }}>Belum ada postingan</div>
          </div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
            {posts.map(p => {
              const plat = platforms.find(pl => pl.id === p.platform)
              return (
                <div key={p.id} style={{
                  display:'flex', alignItems:'center', gap:'10px',
                  padding:'10px 12px', borderRadius:'12px',
                  background:'rgba(255,255,255,0.04)',
                  border:'1px solid rgba(255,255,255,0.06)'
                }}>
                  <div style={{
                    width:'32px', height:'32px', borderRadius:'8px',
                    background: plat?.selectedBg || '#333',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    color:'white', flexShrink:0,
                    boxShadow:`0 0 8px ${plat?.color || '#333'}55`
                  }}>{plat?.svg}</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:'13px', color:'rgba(255,255,255,0.8)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                      {p.content || '(Media saja)'}
                    </div>
                    <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.3)', marginTop:'2px' }}>
                      {plat?.label} · {formatTime(p.created_at)}
                    </div>
                  </div>
                  <span style={{
                    fontSize:'11px', padding:'3px 10px', borderRadius:'99px', fontWeight:'500', flexShrink:0,
                    background: p.status==='sent' ? 'rgba(74,222,128,0.15)' : p.status==='scheduled' ? 'rgba(251,191,36,0.15)' : 'rgba(248,113,113,0.15)',
                    color: p.status==='sent' ? '#4ade80' : p.status==='scheduled' ? '#fbbf24' : '#f87171',
                  }}>
                    {p.status==='sent' ? '✓ Terkirim' : p.status==='scheduled' ? '⏰ Terjadwal' : '✗ Gagal'}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Performa Per Platform */}
      <div style={{ ...glass, padding:'1.5rem', borderRadius:'16px' }}>
        <h3 style={{ fontSize:'15px', fontWeight:'600', marginBottom:'1rem', color:'white' }}>📊 Performa Per Platform</h3>
        {platformStats.length === 0 ? (
          <div style={{ textAlign:'center', padding:'2rem', color:'rgba(255,255,255,0.3)' }}>
            <div style={{ fontSize:'36px', marginBottom:'8px' }}>📊</div>
            <div style={{ fontSize:'14px' }}>Belum ada data posting</div>
          </div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(160px, 1fr))', gap:'12px' }}>
            {platformStats.map(ps => {
              const plat = platforms.find(p => p.id === ps.id)
              if (!plat) return null
              const pct = stats.totalPosts > 0 ? Math.round((ps.count / stats.totalPosts) * 100) : 0
              return (
                <div key={ps.id} style={{
                  padding:'1rem', borderRadius:'12px',
                  background:'rgba(255,255,255,0.04)',
                  border:`1px solid ${plat.color}30`
                }}>
                  {/* Icon + nama */}
                  <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'12px' }}>
                    <div style={{ width:'28px', height:'28px', borderRadius:'7px', background:plat.selectedBg, display:'flex', alignItems:'center', justifyContent:'center', color:'white', flexShrink:0 }}>
                      {plat.svg}
                    </div>
                    <div style={{ fontSize:'12px', fontWeight:'600', color:'white' }}>{plat.label}</div>
                  </div>

                  {/* Stats */}
                  {[['Posting', ps.count], ['Porsi', `${pct}%`]].map(([k, v]) => (
                    <div key={k as string} style={{ display:'flex', justifyContent:'space-between', fontSize:'12px', marginBottom:'4px' }}>
                      <span style={{ color:'rgba(255,255,255,0.4)' }}>{k}</span>
                      <span style={{ color:'white', fontWeight:'500' }}>{v}</span>
                    </div>
                  ))}

                  {/* Progress bar */}
                  <div style={{ marginTop:'10px', height:'4px', borderRadius:'99px', background:'rgba(255,255,255,0.08)' }}>
                    <div style={{ height:'100%', borderRadius:'99px', background:plat.selectedBg, width:`${pct}%`, transition:'width 0.5s' }} />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

    </div>
  )
}