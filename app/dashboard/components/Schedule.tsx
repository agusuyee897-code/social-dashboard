'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

const glass = {
  background: 'rgba(255,255,255,0.05)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.1)',
}

const platforms = [
  { id:'x',  label:'X / Twitter', color:'#ffffff', selectedBg:'linear-gradient(135deg,#1a1a1a,#333)',
    svg:<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  { id:'ig', label:'Instagram',   color:'#e1306c', selectedBg:'linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)',
    svg:<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
  { id:'fb', label:'Facebook',    color:'#1877f2', selectedBg:'linear-gradient(135deg,#1877f2,#0d5cbf)',
    svg:<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
  { id:'li', label:'LinkedIn',    color:'#0a66c2', selectedBg:'linear-gradient(135deg,#0a66c2,#064e94)',
    svg:<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { id:'yt', label:'YouTube',     color:'#ff0000', selectedBg:'linear-gradient(135deg,#ff0000,#cc0000)',
    svg:<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
  { id:'tk', label:'TikTok',      color:'#69C9D0', selectedBg:'linear-gradient(135deg,#010101,#2d2d2d)',
    svg:<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/></svg> },
]

interface Schedule {
  id: string
  platform: string
  content: string
  scheduled_at: string
  status: string
  user_id: string
}

export default function Schedule() {
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [loading, setLoading]     = useState(true)
  const [showForm, setShowForm]   = useState(false)
  const [saving, setSaving]       = useState(false)
  const [success, setSuccess]     = useState('')
  const [userId, setUserId]       = useState<string|null>(null)

  // Form state
  const [text, setText]         = useState('')
  const [date, setDate]         = useState('')
  const [time, setTime]         = useState('')
  const [platform, setPlatform] = useState('x')

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        setUserId(session.user.id)
        await fetchSchedules(session.user.id)
      }
      setLoading(false)
    }
    init()
  }, [])

  const fetchSchedules = async (uid: string) => {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .eq('user_id', uid)
      .eq('status', 'scheduled')
      .order('scheduled_at', { ascending: true })
    if (data) setSchedules(data)
  }

  const handleAdd = async () => {
    if (!text.trim() || !date || !time || !userId) return
    setSaving(true)
    const scheduled_at = new Date(`${date}T${time}`).toISOString()
    const { error } = await supabase.from('posts').insert({
      user_id: userId,
      platform,
      content: text,
      media_urls: [],
      status: 'scheduled',
      scheduled_at,
    })
    if (!error) {
      await fetchSchedules(userId)
      setText(''); setDate(''); setTime(''); setPlatform('x')
      setShowForm(false)
      setSuccess('Jadwal berhasil disimpan!')
      setTimeout(() => setSuccess(''), 3000)
    }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    await supabase.from('posts').delete().eq('id', id)
    setSchedules(prev => prev.filter(s => s.id !== id))
  }

  const formatScheduledAt = (iso: string) => {
    const d = new Date(iso)
    return d.toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric' }) +
      ' · ' + d.toLocaleTimeString('id-ID', { hour:'2-digit', minute:'2-digit' })
  }

  const isUpcoming = (iso: string) => new Date(iso) > new Date()

  if (loading) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'200px', color:'rgba(255,255,255,0.4)', fontSize:'14px' }}>
      ⏳ Memuat jadwal...
    </div>
  )

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>

      {success && (
        <div style={{ padding:'12px 16px', borderRadius:'12px', background:'rgba(74,222,128,0.15)', border:'1px solid rgba(74,222,128,0.3)', color:'#4ade80', fontSize:'14px' }}>
          ✓ {success}
        </div>
      )}

      {/* Header stats + tombol */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:'12px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', flex:1 }}>
          <div style={{ ...glass, padding:'1rem 1.25rem', borderRadius:'16px' }}>
            <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)', marginBottom:'4px', textTransform:'uppercase' }}>Terjadwal</div>
            <div style={{ fontSize:'28px', fontWeight:'700', color:'#f59e0b' }}>{schedules.length}</div>
            <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.4)' }}>postingan pending</div>
          </div>
          <div style={{ ...glass, padding:'1rem 1.25rem', borderRadius:'16px' }}>
            <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)', marginBottom:'4px', textTransform:'uppercase' }}>Akan Datang</div>
            <div style={{ fontSize:'28px', fontWeight:'700', color:'#667eea' }}>
              {schedules.filter(s => s.scheduled_at && isUpcoming(s.scheduled_at)).length}
            </div>
            <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.4)' }}>belum terposting</div>
          </div>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{
          padding:'12px 20px', borderRadius:'12px', fontSize:'14px', fontWeight:'600',
          background:'linear-gradient(135deg,#667eea,#764ba2)',
          border:'none', color:'white', cursor:'pointer', whiteSpace:'nowrap'
        }}>+ Jadwalkan</button>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{ ...glass, padding:'1.5rem', borderRadius:'16px' }}>
          <h3 style={{ fontSize:'15px', fontWeight:'600', marginBottom:'1rem', color:'white' }}>📅 Jadwalkan Postingan Baru</h3>

          {/* Platform selector */}
          <div style={{ marginBottom:'14px' }}>
            <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', marginBottom:'8px' }}>Platform</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
              {platforms.map(p => {
                const isSelected = platform === p.id
                return (
                  <div key={p.id} onClick={() => setPlatform(p.id)} style={{
                    display:'flex', alignItems:'center', gap:'6px',
                    padding:'7px 12px', borderRadius:'10px', cursor:'pointer',
                    fontSize:'12px', fontWeight:'500', transition:'all 0.2s',
                    background: isSelected ? p.selectedBg : 'rgba(255,255,255,0.06)',
                    border:`2px solid ${isSelected ? p.color : 'rgba(255,255,255,0.1)'}`,
                    color: isSelected ? 'white' : 'rgba(255,255,255,0.4)',
                    transform: isSelected ? 'scale(1.04)' : 'scale(1)',
                    boxShadow: isSelected ? `0 0 10px ${p.color}44` : 'none',
                  }}>
                    <span style={{ color: isSelected ? 'white' : 'rgba(255,255,255,0.4)', display:'flex' }}>{p.svg}</span>
                    <span>{p.label}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Tanggal & Waktu */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginBottom:'12px' }}>
            <div>
              <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', marginBottom:'6px' }}>Tanggal</div>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{
                width:'100%', padding:'9px 12px', background:'rgba(255,255,255,0.06)',
                border:'1px solid rgba(255,255,255,0.1)', borderRadius:'8px',
                color:'white', fontSize:'13px', boxSizing:'border-box'
              }} />
            </div>
            <div>
              <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', marginBottom:'6px' }}>Waktu</div>
              <input type="time" value={time} onChange={e => setTime(e.target.value)} style={{
                width:'100%', padding:'9px 12px', background:'rgba(255,255,255,0.06)',
                border:'1px solid rgba(255,255,255,0.1)', borderRadius:'8px',
                color:'white', fontSize:'13px', boxSizing:'border-box'
              }} />
            </div>
          </div>

          {/* Konten */}
          <div style={{ marginBottom:'14px' }}>
            <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', marginBottom:'6px' }}>Konten Postingan</div>
            <textarea value={text} onChange={e => setText(e.target.value)}
              placeholder="Tulis konten postingan yang akan dijadwalkan..."
              style={{
                width:'100%', height:'110px', padding:'12px',
                background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)',
                borderRadius:'8px', color:'white', fontSize:'13px',
                resize:'none', fontFamily:'inherit', boxSizing:'border-box'
              }}
            />
            <div style={{ display:'flex', justifyContent:'flex-end', marginTop:'4px' }}>
              <span style={{ fontSize:'11px', color: text.length > 280 ? '#f87171' : 'rgba(255,255,255,0.3)' }}>
                {text.length} / 280
              </span>
            </div>
          </div>

          <div style={{ display:'flex', gap:'8px', justifyContent:'flex-end' }}>
            <button onClick={() => { setShowForm(false); setText(''); setDate(''); setTime('') }} style={{
              padding:'8px 16px', borderRadius:'8px', fontSize:'12px',
              background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.1)',
              color:'white', cursor:'pointer'
            }}>Batal</button>
            <button onClick={handleAdd} disabled={saving || !text.trim() || !date || !time} style={{
              padding:'8px 16px', borderRadius:'8px', fontSize:'12px', fontWeight:'500',
              background:'linear-gradient(135deg,#667eea,#764ba2)',
              border:'none', color:'white', cursor:'pointer',
              opacity: (saving || !text.trim() || !date || !time) ? 0.5 : 1
            }}>
              {saving ? '⏳ Menyimpan...' : '📅 Simpan Jadwal'}
            </button>
          </div>
        </div>
      )}

      {/* Daftar Jadwal */}
      <div style={{ ...glass, padding:'1.5rem', borderRadius:'16px' }}>
        <h3 style={{ fontSize:'15px', fontWeight:'600', marginBottom:'1rem', color:'white' }}>⏰ Daftar Jadwal</h3>

        {schedules.length === 0 ? (
          <div style={{ textAlign:'center', padding:'2.5rem', color:'rgba(255,255,255,0.3)' }}>
            <div style={{ fontSize:'40px', marginBottom:'8px' }}>📅</div>
            <div style={{ fontSize:'14px', marginBottom:'12px' }}>Belum ada postingan terjadwal</div>
            <button onClick={() => setShowForm(true)} style={{
              padding:'8px 18px', borderRadius:'10px', fontSize:'13px',
              background:'linear-gradient(135deg,#667eea,#764ba2)',
              border:'none', color:'white', cursor:'pointer'
            }}>+ Jadwalkan Sekarang</button>
          </div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
            {schedules.map(s => {
              const plat    = platforms.find(p => p.id === s.platform)
              const upcoming = s.scheduled_at && isUpcoming(s.scheduled_at)
              return (
                <div key={s.id} style={{
                  display:'flex', alignItems:'center', gap:'12px',
                  padding:'14px', borderRadius:'12px',
                  background:'rgba(255,255,255,0.04)',
                  border:`1px solid ${upcoming ? 'rgba(251,191,36,0.2)' : 'rgba(255,255,255,0.06)'}`
                }}>
                  {/* Icon */}
                  <div style={{
                    width:'38px', height:'38px', borderRadius:'10px',
                    background: plat?.selectedBg || '#333',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    color:'white', flexShrink:0,
                    boxShadow:`0 0 8px ${plat?.color||'#333'}44`
                  }}>{plat?.svg}</div>

                  {/* Info */}
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:'13px', color:'rgba(255,255,255,0.85)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                      {s.content || '(Tidak ada konten)'}
                    </div>
                    <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.35)', marginTop:'3px', display:'flex', gap:'8px', alignItems:'center' }}>
                      <span>{plat?.label}</span>
                      <span>·</span>
                      <span>📅 {s.scheduled_at ? formatScheduledAt(s.scheduled_at) : '-'}</span>
                    </div>
                  </div>

                  {/* Status */}
                  <span style={{
                    fontSize:'11px', padding:'4px 10px', borderRadius:'99px', fontWeight:'500', flexShrink:0,
                    background: upcoming ? 'rgba(251,191,36,0.15)' : 'rgba(255,255,255,0.08)',
                    color: upcoming ? '#fbbf24' : 'rgba(255,255,255,0.4)',
                    border: upcoming ? '1px solid rgba(251,191,36,0.3)' : '1px solid rgba(255,255,255,0.1)',
                  }}>
                    {upcoming ? '⏰ Akan Datang' : '✓ Sudah Lewat'}
                  </span>

                  {/* Hapus */}
                  <button onClick={() => handleDelete(s.id)} style={{
                    background:'rgba(248,113,113,0.12)', border:'1px solid rgba(248,113,113,0.25)',
                    color:'#f87171', borderRadius:'8px', padding:'6px 12px',
                    cursor:'pointer', fontSize:'12px', flexShrink:0
                  }}>🗑 Hapus</button>
                </div>
              )
            })}
          </div>
        )}
      </div>

    </div>
  )
}