'use client'
import { useState } from 'react'

const glass = {
  background: 'rgba(255,255,255,0.05)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.1)',
}

const platforms = [
  { id:'x', label:'X / Twitter', color:'#fff', short:'X', limit:280 },
  { id:'ig', label:'Instagram', color:'#c0307a', short:'IG', limit:2200 },
  { id:'li', label:'LinkedIn', color:'#0a66c2', short:'in', limit:3000 },
  { id:'fb', label:'Facebook', color:'#1877f2', short:'f', limit:63206 },
  { id:'yt', label:'YouTube', color:'#c00', short:'YT', limit:5000 },
]

export default function Post() {
  const [postText, setPostText] = useState('')
  const [selected, setSelected] = useState(['x', 'ig', 'li'])
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')

  const togglePlatform = (p: string) => {
    setSelected(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p])
  }

  const handlePost = () => {
    if (!postText.trim() || selected.length === 0) return
    setLoading(true)
    setTimeout(() => {
      const newPosts = selected.map((p, i) => ({
        id: Date.now() + i,
        platform: p,
        text: postText,
        time: 'Baru saja',
        status: 'sent'
      }))
      setPosts(prev => [...newPosts, ...prev])
      setPostText('')
      setLoading(false)
      setSuccess('Postingan berhasil dikirim ke ' + selected.length + ' platform!')
      setTimeout(() => setSuccess(''), 3000)
    }, 1500)
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>

      {success && (
        <div style={{
          padding:'12px 16px', borderRadius:'12px',
          background:'rgba(74,222,128,0.15)', border:'1px solid rgba(74,222,128,0.3)',
          color:'#4ade80', fontSize:'14px'
        }}>✓ {success}</div>
      )}

      {/* Compose */}
      <div style={{ ...glass, padding:'1.5rem', borderRadius:'16px' }}>
        <h3 style={{ fontSize:'15px', fontWeight:'600', marginBottom:'1.25rem', color:'white' }}>✏️ Buat Postingan Baru</h3>

        {/* Platform selector */}
        <div style={{ marginBottom:'16px' }}>
          <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', marginBottom:'10px' }}>Pilih Platform Target</div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
            {platforms.map(p => (
              <div key={p.id} onClick={() => togglePlatform(p.id)} style={{
                display:'flex', alignItems:'center', gap:'6px',
                padding:'7px 14px', borderRadius:'99px', cursor:'pointer',
                fontSize:'13px', fontWeight:'500', transition:'all 0.15s',
                background: selected.includes(p.id) ? p.color : 'rgba(255,255,255,0.06)',
                border: `1.5px solid ${selected.includes(p.id) ? p.color : 'rgba(255,255,255,0.1)'}`,
                color: 'white'
              }}>
                <span style={{ fontSize:'16px' }}>
                  {p.id==='x'?'𝕏':p.id==='ig'?'📸':p.id==='li'?'💼':p.id==='fb'?'👥':'▶️'}
                </span>
                {p.label}
              </div>
            ))}
          </div>
        </div>

        {/* Text area */}
        <div style={{ marginBottom:'12px' }}>
          <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', marginBottom:'8px' }}>Konten Postingan</div>
          <textarea
            value={postText}
            onChange={e => setPostText(e.target.value)}
            placeholder="Tulis konten postingan kamu di sini... Akan diposting ke semua platform yang dipilih."
            style={{
              width:'100%', height:'140px', padding:'14px',
              background:'rgba(255,255,255,0.05)',
              border:'1px solid rgba(255,255,255,0.1)',
              borderRadius:'12px', color:'white', fontSize:'14px',
              resize:'none', lineHeight:'1.6', fontFamily:'inherit'
            }}
          />
          <div style={{ display:'flex', justifyContent:'space-between', marginTop:'6px' }}>
            <span style={{ fontSize:'12px', color: postText.length > 280 ? '#f87171' : 'rgba(255,255,255,0.3)' }}>
              {postText.length} karakter
            </span>
            <span style={{ fontSize:'12px', color:'rgba(255,255,255,0.3)' }}>
              Batas X/Twitter: 280
            </span>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display:'flex', gap:'10px', justifyContent:'flex-end' }}>
          <button style={{
            padding:'10px 18px', borderRadius:'10px', fontSize:'13px',
            background:'rgba(255,255,255,0.08)',
            border:'1px solid rgba(255,255,255,0.1)',
            color:'white', cursor:'pointer'
          }}>📅 Jadwalkan</button>
          <button onClick={handlePost} disabled={loading} style={{
            padding:'10px 20px', borderRadius:'10px', fontSize:'13px', fontWeight:'600',
            background:'linear-gradient(135deg,#667eea,#764ba2)',
            border:'none', color:'white', cursor:'pointer',
            opacity: loading ? 0.7 : 1
          }}>
            {loading ? '⏳ Memposting...' : '🚀 Posting Sekarang'}
          </button>
        </div>
      </div>

      {/* Riwayat */}
      {posts.length > 0 && (
        <div style={{ ...glass, padding:'1.5rem', borderRadius:'16px' }}>
          <h3 style={{ fontSize:'15px', fontWeight:'600', marginBottom:'1rem', color:'white' }}>📋 Baru Diposting</h3>
          <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
            {posts.map(p => {
              const plat = platforms.find(pl => pl.id === p.platform)
              return (
                <div key={p.id} style={{
                  display:'flex', alignItems:'center', gap:'10px',
                  padding:'10px', borderRadius:'12px',
                  background:'rgba(255,255,255,0.04)',
                  border:'1px solid rgba(255,255,255,0.06)'
                }}>
                  <div style={{
                    width:'32px', height:'32px', borderRadius:'8px',
                    background: plat?.color || '#333',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:'12px', fontWeight:'700', color:'white', flexShrink:0
                  }}>{plat?.short}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:'13px', color:'rgba(255,255,255,0.8)' }}>{p.text.substring(0,60)}...</div>
                    <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.3)', marginTop:'2px' }}>{p.time}</div>
                  </div>
                  <span style={{
                    fontSize:'11px', padding:'3px 10px', borderRadius:'99px',
                    background:'rgba(74,222,128,0.15)', color:'#4ade80', fontWeight:'500'
                  }}>✓ Terkirim</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

    </div>
  )
}