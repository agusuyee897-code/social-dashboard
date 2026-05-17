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
    svg:<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
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

interface DayData {
  day: string
  date: string
  counts: Record<string, number>
}

export default function Analytics() {
  const [posts, setPosts]           = useState<Post[]>([])
  const [weekData, setWeekData]     = useState<DayData[]>([])
  const [platStats, setPlatStats]   = useState<{id:string, count:number}[]>([])
  const [totalPosts, setTotalPosts] = useState(0)
  const [thisWeek, setThisWeek]     = useState(0)
  const [loading, setLoading]       = useState(true)

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) return
      const uid = session.user.id

      const { data: allPosts } = await supabase
        .from('posts')
        .select('*')
        .eq('user_id', uid)
        .order('created_at', { ascending: false })

      if (allPosts) {
        setPosts(allPosts)
        setTotalPosts(allPosts.length)

        // Hitung posting minggu ini
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        setThisWeek(allPosts.filter(p => new Date(p.created_at) >= weekAgo).length)

        // Hitung per platform
        const platCount: Record<string, number> = {}
        allPosts.forEach(p => { platCount[p.platform] = (platCount[p.platform] || 0) + 1 })
        setPlatStats(Object.entries(platCount).map(([id, count]) => ({ id, count })).sort((a,b) => b.count - a.count))

        // Buat data chart 7 hari terakhir
        const days = []
        const dayNames = ['Min','Sen','Sel','Rab','Kam','Jum','Sab']
        for (let i = 6; i >= 0; i--) {
          const d = new Date()
          d.setDate(d.getDate() - i)
          d.setHours(0,0,0,0)
          const next = new Date(d); next.setDate(next.getDate() + 1)
          const counts: Record<string, number> = {}
          allPosts.forEach(p => {
            const pd = new Date(p.created_at)
            if (pd >= d && pd < next) counts[p.platform] = (counts[p.platform] || 0) + 1
          })
          days.push({ day: dayNames[d.getDay()], date: d.toISOString(), counts })
        }
        setWeekData(days)
      }
      setLoading(false)
    }
    init()
  }, [])

  const maxBarVal = Math.max(1, ...weekData.map(d => Object.values(d.counts).reduce((a,b) => a+b, 0)))

  if (loading) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'200px', color:'rgba(255,255,255,0.4)', fontSize:'14px' }}>
      ⏳ Memuat analitik...
    </div>
  )

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'12px' }}>
        {[
          { label:'Total Posting',    value: totalPosts.toString(),   sub:'semua waktu',          color:'#667eea' },
          { label:'Minggu Ini',       value: thisWeek.toString(),     sub:'7 hari terakhir',       color:'#06b6d4' },
          { label:'Platform Aktif',   value: platStats.length.toString(), sub:'dari 6 platform',  color:'#f43f5e' },
          { label:'Rata-rata/Hari',   value: weekData.length > 0 ? (thisWeek / 7).toFixed(1) : '0', sub:'posting per hari', color:'#f59e0b' },
        ].map((s, i) => (
          <div key={i} style={{ ...glass, padding:'1.25rem', borderRadius:'16px' }}>
            <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.5)', textTransform:'uppercase', marginBottom:'10px' }}>{s.label}</div>
            <div style={{ fontSize:'26px', fontWeight:'700', color:s.color }}>{s.value}</div>
            <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.4)', marginTop:'4px' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Bar Chart — posting per hari */}
      <div style={{ ...glass, padding:'1.5rem', borderRadius:'16px' }}>
        <h3 style={{ fontSize:'15px', fontWeight:'600', marginBottom:'4px', color:'white' }}>📈 Posting 7 Hari Terakhir</h3>
        <p style={{ fontSize:'12px', color:'rgba(255,255,255,0.3)', marginBottom:'1.5rem' }}>Jumlah postingan per platform per hari</p>

        {weekData.every(d => Object.values(d.counts).reduce((a,b)=>a+b,0) === 0) ? (
          <div style={{ textAlign:'center', padding:'2rem', color:'rgba(255,255,255,0.3)' }}>
            <div style={{ fontSize:'36px', marginBottom:'8px' }}>📊</div>
            <div style={{ fontSize:'14px' }}>Belum ada data posting minggu ini</div>
          </div>
        ) : (
          <>
            <div style={{ display:'flex', alignItems:'flex-end', gap:'8px', height:'160px' }}>
              {weekData.map((d, i) => {
                const total = Object.values(d.counts).reduce((a,b) => a+b, 0)
                return (
                  <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:'6px', height:'100%' }}>
                    <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'flex-end', gap:'2px', width:'100%' }}>
                      {platforms.filter(p => d.counts[p.id] > 0).map(p => (
                        <div key={p.id} title={`${p.label}: ${d.counts[p.id]}`} style={{
                          width:'100%',
                          height:`${(d.counts[p.id] / maxBarVal) * 130}px`,
                          background: p.selectedBg,
                          borderRadius:'4px 4px 0 0',
                          minHeight:'4px',
                          transition:'height 0.5s'
                        }} />
                      ))}
                      {total === 0 && <div style={{ width:'100%', height:'4px', background:'rgba(255,255,255,0.06)', borderRadius:'4px' }} />}
                    </div>
                    <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)' }}>{d.day}</div>
                    {total > 0 && <div style={{ fontSize:'10px', color:'rgba(255,255,255,0.3)' }}>{total}</div>}
                  </div>
                )
              })}
            </div>

            {/* Legend */}
            <div style={{ display:'flex', gap:'12px', marginTop:'16px', flexWrap:'wrap', justifyContent:'center' }}>
              {platforms.filter(p => platStats.find(ps => ps.id === p.id)).map(p => (
                <div key={p.id} style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                  <div style={{ width:'10px', height:'10px', borderRadius:'2px', background:p.selectedBg }} />
                  <span style={{ fontSize:'11px', color:'rgba(255,255,255,0.5)' }}>{p.label}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Performa Per Platform */}
      <div style={{ ...glass, padding:'1.5rem', borderRadius:'16px' }}>
        <h3 style={{ fontSize:'15px', fontWeight:'600', marginBottom:'1rem', color:'white' }}>📊 Performa Per Platform</h3>
        {platStats.length === 0 ? (
          <div style={{ textAlign:'center', padding:'2rem', color:'rgba(255,255,255,0.3)' }}>
            <div style={{ fontSize:'36px', marginBottom:'8px' }}>📊</div>
            <div style={{ fontSize:'14px' }}>Belum ada data</div>
          </div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
            {platStats.map((ps, i) => {
              const plat = platforms.find(p => p.id === ps.id)
              if (!plat) return null
              const pct = totalPosts > 0 ? Math.round((ps.count / totalPosts) * 100) : 0
              return (
                <div key={ps.id} style={{ display:'flex', alignItems:'center', gap:'12px', padding:'12px', borderRadius:'12px', background:'rgba(255,255,255,0.04)', border:`1px solid ${plat.color}25` }}>
                  <div style={{ fontSize:'14px', fontWeight:'700', color:'rgba(255,255,255,0.2)', width:'20px' }}>#{i+1}</div>
                  <div style={{ width:'34px', height:'34px', borderRadius:'9px', background:plat.selectedBg, display:'flex', alignItems:'center', justifyContent:'center', color:'white', flexShrink:0 }}>
                    {plat.svg}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'6px' }}>
                      <span style={{ fontSize:'13px', fontWeight:'500', color:'white' }}>{plat.label}</span>
                      <span style={{ fontSize:'13px', fontWeight:'600', color:plat.color }}>{ps.count} posting ({pct}%)</span>
                    </div>
                    <div style={{ height:'6px', borderRadius:'99px', background:'rgba(255,255,255,0.08)' }}>
                      <div style={{ height:'100%', borderRadius:'99px', background:plat.selectedBg, width:`${pct}%`, transition:'width 0.6s' }} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Postingan Terbaru */}
      <div style={{ ...glass, padding:'1.5rem', borderRadius:'16px' }}>
        <h3 style={{ fontSize:'15px', fontWeight:'600', marginBottom:'1rem', color:'white' }}>🏆 Postingan Terbaru</h3>
        {posts.length === 0 ? (
          <div style={{ textAlign:'center', padding:'2rem', color:'rgba(255,255,255,0.3)' }}>
            <div style={{ fontSize:'36px', marginBottom:'8px' }}>📭</div>
            <div style={{ fontSize:'14px' }}>Belum ada postingan</div>
          </div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
            {posts.slice(0, 5).map((p, i) => {
              const plat = platforms.find(pl => pl.id === p.platform)
              return (
                <div key={p.id} style={{ display:'flex', alignItems:'center', gap:'12px', padding:'12px', borderRadius:'12px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ fontSize:'14px', fontWeight:'700', color:'rgba(255,255,255,0.2)', width:'20px' }}>#{i+1}</div>
                  <div style={{ width:'34px', height:'34px', borderRadius:'9px', background:plat?.selectedBg||'#333', display:'flex', alignItems:'center', justifyContent:'center', color:'white', flexShrink:0, boxShadow:`0 0 8px ${plat?.color||'#333'}55` }}>
                    {plat?.svg}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:'13px', color:'rgba(255,255,255,0.8)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                      {p.content || '(Media saja)'}
                    </div>
                    <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.3)', marginTop:'2px' }}>
                      {plat?.label} · {new Date(p.created_at).toLocaleDateString('id-ID', { day:'numeric', month:'short', year:'numeric' })}
                    </div>
                  </div>
                  <span style={{
                    fontSize:'11px', padding:'3px 10px', borderRadius:'99px', fontWeight:'500', flexShrink:0,
                    background: p.status==='sent' ? 'rgba(74,222,128,0.15)' : 'rgba(251,191,36,0.15)',
                    color: p.status==='sent' ? '#4ade80' : '#fbbf24',
                  }}>
                    {p.status==='sent' ? '✓ Terkirim' : '⏰ Terjadwal'}
                  </span>
                </div>
              )
            })}
          </div>
        )}

        {/* Catatan */}
        <div style={{ marginTop:'16px', padding:'12px 14px', borderRadius:'10px', background:'rgba(102,126,234,0.08)', border:'1px solid rgba(102,126,234,0.2)' }}>
          <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)' }}>
            ℹ️ Data reach, impressions & engagement akan tersedia setelah API platform sosial media terhubung.
          </div>
        </div>
      </div>

    </div>
  )
}