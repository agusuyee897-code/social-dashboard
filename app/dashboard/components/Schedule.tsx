'use client'
import { useState } from 'react'

const glass = {
  background: 'rgba(255,255,255,0.05)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.1)',
}

const platforms = [
  { id:'x', label:'X / Twitter', color:'#fff', short:'X' },
  { id:'ig', label:'Instagram', color:'#c0307a', short:'IG' },
  { id:'li', label:'LinkedIn', color:'#0a66c2', short:'in' },
  { id:'fb', label:'Facebook', color:'#1877f2', short:'f' },
  { id:'yt', label:'YouTube', color:'#c00', short:'YT' },
]

export default function Schedule() {
  const [schedules, setSchedules] = useState([
    { id:1, platform:'ig', text:'Konten promo akhir bulan 🎉', date:'2026-05-20', time:'09:00', status:'scheduled' },
    { id:2, platform:'li', text:'Tips produktivitas untuk tim remote', date:'2026-05-21', time:'10:00', status:'scheduled' },
    { id:3, platform:'x', text:'Thread tentang AI terbaru 🤖', date:'2026-05-22', time:'14:00', status:'scheduled' },
  ])
  const [showForm, setShowForm] = useState(false)
  const [text, setText] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [platform, setPlatform] = useState('x')

  const handleAdd = () => {
    if (!text || !date || !time) return
    setSchedules(prev => [...prev, {
      id: Date.now(), platform, text, date, time, status:'scheduled'
    }])
    setText(''); setDate(''); setTime('')
    setShowForm(false)
  }

  const handleDelete = (id: number) => {
    setSchedules(prev => prev.filter(s => s.id !== id))
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>

      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div style={{ ...glass, padding:'1rem 1.25rem', borderRadius:'16px', flex:1, marginRight:'12px' }}>
          <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)', marginBottom:'4px' }}>TERJADWAL</div>
          <div style={{ fontSize:'28px', fontWeight:'700', color:'#f59e0b' }}>{schedules.length}</div>
          <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.4)' }}>postingan pending</div>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{
          padding:'12px 20px', borderRadius:'12px', fontSize:'14px', fontWeight:'600',
          background:'linear-gradient(135deg,#667eea,#764ba2)',
          border:'none', color:'white', cursor:'pointer'
        }}>+ Jadwalkan Postingan</button>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{ ...glass, padding:'1.5rem', borderRadius:'16px' }}>
          <h3 style={{ fontSize:'15px', fontWeight:'600', marginBottom:'1rem', color:'white' }}>📅 Jadwalkan Postingan Baru</h3>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'12px', marginBottom:'12px' }}>
            <div>
              <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', marginBottom:'6px' }}>Platform</div>
              <select value={platform} onChange={e => setPlatform(e.target.value)} style={{
                width:'100%', padding:'9px 12px',
                background:'rgba(255,255,255,0.06)',
                border:'1px solid rgba(255,255,255,0.1)',
                borderRadius:'8px', color:'white', fontSize:'13px'
              }}>
                {platforms.map(p => (
                  <option key={p.id} value={p.id} style={{ background:'#1a1a2e' }}>{p.label}</option>
                ))}
              </select>
            </div>
            <div>
              <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', marginBottom:'6px' }}>Tanggal</div>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{
                width:'100%', padding:'9px 12px',
                background:'rgba(255,255,255,0.06)',
                border:'1px solid rgba(255,255,255,0.1)',
                borderRadius:'8px', color:'white', fontSize:'13px'
              }} />
            </div>
            <div>
              <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', marginBottom:'6px' }}>Waktu</div>
              <input type="time" value={time} onChange={e => setTime(e.target.value)} style={{
                width:'100%', padding:'9px 12px',
                background:'rgba(255,255,255,0.06)',
                border:'1px solid rgba(255,255,255,0.1)',
                borderRadius:'8px', color:'white', fontSize:'13px'
              }} />
            </div>
          </div>
          <div style={{ marginBottom:'12px' }}>
            <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', marginBottom:'6px' }}>Konten</div>
            <textarea value={text} onChange={e => setText(e.target.value)}
              placeholder="Tulis konten postingan..."
              style={{
                width:'100%', height:'100px', padding:'12px',
                background:'rgba(255,255,255,0.06)',
                border:'1px solid rgba(255,255,255,0.1)',
                borderRadius:'8px', color:'white', fontSize:'13px',
                resize:'none', fontFamily:'inherit'
              }}
            />
          </div>
          <div style={{ display:'flex', gap:'8px', justifyContent:'flex-end' }}>
            <button onClick={() => setShowForm(false)} style={{
              padding:'8px 16px', borderRadius:'8px', fontSize:'12px',
              background:'rgba(255,255,255,0.08)',
              border:'1px solid rgba(255,255,255,0.1)',
              color:'white', cursor:'pointer'
            }}>Batal</button>
            <button onClick={handleAdd} style={{
              padding:'8px 16px', borderRadius:'8px', fontSize:'12px', fontWeight:'500',
              background:'linear-gradient(135deg,#667eea,#764ba2)',
              border:'none', color:'white', cursor:'pointer'
            }}>Simpan Jadwal</button>
          </div>
        </div>
      )}

      {/* List */}
      <div style={{ ...glass, padding:'1.5rem', borderRadius:'16px' }}>
        <h3 style={{ fontSize:'15px', fontWeight:'600', marginBottom:'1rem', color:'white' }}>⏰ Daftar Jadwal</h3>
        <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
          {schedules.map(s => {
            const plat = platforms.find(p => p.id === s.platform)
            return (
              <div key={s.id} style={{
                display:'flex', alignItems:'center', gap:'12px',
                padding:'14px', borderRadius:'12px',
                background:'rgba(255,255,255,0.04)',
                border:'1px solid rgba(255,255,255,0.06)'
              }}>
                <div style={{
                  width:'36px', height:'36px', borderRadius:'10px',
                  background: plat?.color || '#333',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:'13px', fontWeight:'700',
                  color: plat?.color === '#fff' ? '#000' : 'white', flexShrink:0
                }}>{plat?.short}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:'13px', color:'rgba(255,255,255,0.8)' }}>{s.text}</div>
                  <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.3)', marginTop:'3px' }}>
                    📅 {s.date} ⏰ {s.time}
                  </div>
                </div>
                <span style={{
                  fontSize:'11px', padding:'4px 10px', borderRadius:'99px',
                  background:'rgba(251,191,36,0.15)', color:'#fbbf24', fontWeight:'500'
                }}>⏰ Terjadwal</span>
                <button onClick={() => handleDelete(s.id)} style={{
                  background:'rgba(248,113,113,0.15)',
                  border:'1px solid rgba(248,113,113,0.2)',
                  color:'#f87171', borderRadius:'8px',
                  padding:'5px 10px', cursor:'pointer', fontSize:'12px'
                }}>Hapus</button>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}