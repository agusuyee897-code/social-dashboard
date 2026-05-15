'use client'
import { useState } from 'react'

const glass = {
  background: 'rgba(255,255,255,0.05)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.1)',
}

const platforms = [
  { id:'x', label:'X / Twitter', color:'#000', short:'X', icon:'𝕏', apiUrl:'developer.twitter.com' },
  { id:'ig', label:'Instagram', color:'#c0307a', short:'IG', icon:'📸', apiUrl:'developers.facebook.com' },
  { id:'li', label:'LinkedIn', color:'#0a66c2', short:'in', icon:'💼', apiUrl:'developer.linkedin.com' },
  { id:'fb', label:'Facebook', color:'#1877f2', short:'f', icon:'👥', apiUrl:'developers.facebook.com' },
  { id:'yt', label:'YouTube', color:'#c00', short:'YT', icon:'▶️', apiUrl:'console.cloud.google.com' },
  { id:'tk', label:'TikTok', color:'#010101', short:'TK', icon:'🎵', apiUrl:'developers.tiktok.com' },
]

export default function Accounts() {
  const [connected, setConnected] = useState<string[]>([])
  const [showForm, setShowForm] = useState<string|null>(null)
  const [apiKey, setApiKey] = useState('')
  const [apiSecret, setApiSecret] = useState('')
  const [success, setSuccess] = useState('')

  const handleConnect = (id: string) => {
    if (!apiKey || !apiSecret) return
    setConnected(prev => [...prev, id])
    setShowForm(null)
    setApiKey('')
    setApiSecret('')
    setSuccess(`${platforms.find(p=>p.id===id)?.label} berhasil terhubung!`)
    setTimeout(() => setSuccess(''), 3000)
  }

  const handleDisconnect = (id: string) => {
    setConnected(prev => prev.filter(p => p !== id))
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>

      {success && (
        <div style={{
          padding:'12px 16px', borderRadius:'12px',
          background:'rgba(74,222,128,0.15)',
          border:'1px solid rgba(74,222,128,0.3)',
          color:'#4ade80', fontSize:'14px'
        }}>✓ {success}</div>
      )}

      <div style={{ ...glass, padding:'1.5rem', borderRadius:'16px' }}>
        <h3 style={{ fontSize:'15px', fontWeight:'600', marginBottom:'4px', color:'white' }}>👤 Manajemen Akun & API</h3>
        <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.4)', marginBottom:'1.5rem' }}>Hubungkan akun sosial media kamu dengan memasukkan API key dari masing-masing platform.</p>

        <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
          {platforms.map(p => (
            <div key={p.id}>
              <div style={{
                display:'flex', alignItems:'center', gap:'12px',
                padding:'14px', borderRadius:'12px',
                background:'rgba(255,255,255,0.04)',
                border: connected.includes(p.id)
                  ? `1px solid ${p.color}50`
                  : '1px solid rgba(255,255,255,0.08)'
              }}>
                <div style={{
                  width:'40px', height:'40px', borderRadius:'10px',
                  background: p.color, display:'flex', alignItems:'center',
                  justifyContent:'center', fontSize:'18px', flexShrink:0
                }}>{p.icon}</div>

                <div style={{ flex:1 }}>
                  <div style={{ fontSize:'14px', fontWeight:'500', color:'white' }}>{p.label}</div>
                  <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)', marginTop:'2px' }}>
                    {connected.includes(p.id) ? '✓ Terhubung' : `API: ${p.apiUrl}`}
                  </div>
                </div>

                <div style={{ display:'flex', gap:'8px' }}>
                  {connected.includes(p.id) ? (
                    <button onClick={() => handleDisconnect(p.id)} style={{
                      padding:'7px 14px', borderRadius:'8px', fontSize:'12px',
                      background:'rgba(248,113,113,0.15)',
                      border:'1px solid rgba(248,113,113,0.3)',
                      color:'#f87171', cursor:'pointer'
                    }}>Putuskan</button>
                  ) : (
                    <button onClick={() => setShowForm(showForm === p.id ? null : p.id)} style={{
                      padding:'7px 14px', borderRadius:'8px', fontSize:'12px', fontWeight:'500',
                      background:'linear-gradient(135deg,#667eea,#764ba2)',
                      border:'none', color:'white', cursor:'pointer'
                    }}>+ Hubungkan</button>
                  )}
                </div>
              </div>

              {/* Form API Key */}
              {showForm === p.id && (
                <div style={{
                  padding:'16px', borderRadius:'12px', marginTop:'8px',
                  background:'rgba(255,255,255,0.03)',
                  border:'1px solid rgba(255,255,255,0.08)'
                }}>
                  <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', marginBottom:'12px' }}>
                    Dapatkan API key di <span style={{ color:'#667eea' }}>{p.apiUrl}</span>
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginBottom:'12px' }}>
                    <div>
                      <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', marginBottom:'6px' }}>API Key</div>
                      <input
                        type="text"
                        value={apiKey}
                        onChange={e => setApiKey(e.target.value)}
                        placeholder="Masukkan API Key..."
                        style={{
                          width:'100%', padding:'9px 12px',
                          background:'rgba(255,255,255,0.06)',
                          border:'1px solid rgba(255,255,255,0.1)',
                          borderRadius:'8px', color:'white',
                          fontSize:'13px', fontFamily:'monospace'
                        }}
                      />
                    </div>
                    <div>
                      <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', marginBottom:'6px' }}>API Secret</div>
                      <input
                        type="password"
                        value={apiSecret}
                        onChange={e => setApiSecret(e.target.value)}
                        placeholder="Masukkan API Secret..."
                        style={{
                          width:'100%', padding:'9px 12px',
                          background:'rgba(255,255,255,0.06)',
                          border:'1px solid rgba(255,255,255,0.1)',
                          borderRadius:'8px', color:'white',
                          fontSize:'13px', fontFamily:'monospace'
                        }}
                      />
                    </div>
                  </div>
                  <div style={{ display:'flex', gap:'8px', justifyContent:'flex-end' }}>
                    <button onClick={() => setShowForm(null)} style={{
                      padding:'8px 16px', borderRadius:'8px', fontSize:'12px',
                      background:'rgba(255,255,255,0.08)',
                      border:'1px solid rgba(255,255,255,0.1)',
                      color:'white', cursor:'pointer'
                    }}>Batal</button>
                    <button onClick={() => handleConnect(p.id)} style={{
                      padding:'8px 16px', borderRadius:'8px', fontSize:'12px', fontWeight:'500',
                      background:'linear-gradient(135deg,#667eea,#764ba2)',
                      border:'none', color:'white', cursor:'pointer'
                    }}>Simpan & Hubungkan</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}