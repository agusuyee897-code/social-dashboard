'use client'
import { useState } from 'react'

const glass = {
  background: 'rgba(255,255,255,0.05)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.1)',
}

export default function Settings() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [notif, setNotif] = useState(true)
  const [autoPost, setAutoPost] = useState(false)
  const [success, setSuccess] = useState('')

  const handleSave = () => {
    setSuccess('Pengaturan berhasil disimpan!')
    setTimeout(() => setSuccess(''), 3000)
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

      {/* Profil */}
      <div style={{ ...glass, padding:'1.5rem', borderRadius:'16px' }}>
        <h3 style={{ fontSize:'15px', fontWeight:'600', marginBottom:'1.25rem', color:'white' }}>👤 Profil</h3>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginBottom:'12px' }}>
          <div>
            <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', marginBottom:'6px' }}>Nama</div>
            <input type="text" value={name} onChange={e => setName(e.target.value)}
              placeholder="Nama kamu"
              style={{
                width:'100%', padding:'10px 12px',
                background:'rgba(255,255,255,0.06)',
                border:'1px solid rgba(255,255,255,0.1)',
                borderRadius:'8px', color:'white', fontSize:'13px'
              }}
            />
          </div>
          <div>
            <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', marginBottom:'6px' }}>Email</div>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="email@kamu.com"
              style={{
                width:'100%', padding:'10px 12px',
                background:'rgba(255,255,255,0.06)',
                border:'1px solid rgba(255,255,255,0.1)',
                borderRadius:'8px', color:'white', fontSize:'13px'
              }}
            />
          </div>
        </div>
      </div>

      {/* Notifikasi */}
      <div style={{ ...glass, padding:'1.5rem', borderRadius:'16px' }}>
        <h3 style={{ fontSize:'15px', fontWeight:'600', marginBottom:'1.25rem', color:'white' }}>🔔 Notifikasi & Preferensi</h3>
        <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
          {[
            { label:'Notifikasi email', sub:'Terima email saat postingan berhasil dikirim', val:notif, set:setNotif },
            { label:'Auto posting', sub:'Posting otomatis sesuai jadwal yang ditentukan', val:autoPost, set:setAutoPost },
          ].map((item, i) => (
            <div key={i} style={{
              display:'flex', alignItems:'center', justifyContent:'space-between',
              padding:'12px', borderRadius:'12px',
              background:'rgba(255,255,255,0.04)',
              border:'1px solid rgba(255,255,255,0.06)'
            }}>
              <div>
                <div style={{ fontSize:'13px', color:'white', fontWeight:'500' }}>{item.label}</div>
                <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)', marginTop:'2px' }}>{item.sub}</div>
              </div>
              <div onClick={() => item.set(!item.val)} style={{
                width:'44px', height:'24px', borderRadius:'99px', cursor:'pointer',
                background: item.val ? 'linear-gradient(135deg,#667eea,#764ba2)' : 'rgba(255,255,255,0.1)',
                position:'relative', transition:'all 0.2s'
              }}>
                <div style={{
                  width:'18px', height:'18px', borderRadius:'50%', background:'white',
                  position:'absolute', top:'3px',
                  left: item.val ? '23px' : '3px',
                  transition:'all 0.2s'
                }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Danger zone */}
      <div style={{ ...glass, padding:'1.5rem', borderRadius:'16px', border:'1px solid rgba(248,113,113,0.2)' }}>
        <h3 style={{ fontSize:'15px', fontWeight:'600', marginBottom:'4px', color:'#f87171' }}>⚠️ Danger Zone</h3>
        <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.4)', marginBottom:'1rem' }}>Tindakan ini tidak dapat dibatalkan.</p>
        <button style={{
          padding:'9px 18px', borderRadius:'8px', fontSize:'13px',
          background:'rgba(248,113,113,0.15)',
          border:'1px solid rgba(248,113,113,0.3)',
          color:'#f87171', cursor:'pointer'
        }}>🗑️ Hapus Semua Data</button>
      </div>

      <button onClick={handleSave} style={{
        padding:'12px', borderRadius:'12px', fontSize:'14px', fontWeight:'600',
        background:'linear-gradient(135deg,#667eea,#764ba2)',
        border:'none', color:'white', cursor:'pointer'
      }}>💾 Simpan Pengaturan</button>

    </div>
  )
}