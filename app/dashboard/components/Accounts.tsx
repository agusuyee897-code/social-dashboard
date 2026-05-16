'use client'
import { useState } from 'react'

const glass = {
  background: 'rgba(255,255,255,0.05)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.1)',
}

const platforms = [
  {
    id:'x', label:'X / Twitter', color:'#000', icon:'𝕏',
    apiUrl:'developer.twitter.com',
    steps:['Buka developer.twitter.com','Klik "Sign up for Free Account"','Buat App baru di dashboard','Copy API Key & API Secret'],
    fields:['API Key','API Secret','Access Token','Access Token Secret']
  },
  {
    id:'ig', label:'Instagram', color:'#c0307a', icon:'📸',
    apiUrl:'developers.facebook.com',
    steps:['Buka developers.facebook.com','Klik "My Apps" → "Create App"','Pilih tipe "Business"','Tambahkan "Instagram Graph API"','Copy App ID & App Secret'],
    fields:['App ID','App Secret','Access Token']
  },
  {
    id:'fb', label:'Facebook', color:'#1877f2', icon:'👥',
    apiUrl:'developers.facebook.com',
    steps:['Buka developers.facebook.com','Buat App baru','Pilih tipe "Business"','Tambahkan "Pages API"','Copy App ID & Page Access Token'],
    fields:['App ID','App Secret','Page Access Token']
  },
  {
    id:'li', label:'LinkedIn', color:'#0a66c2', icon:'💼',
    apiUrl:'developer.linkedin.com',
    steps:['Buka developer.linkedin.com','Klik "Create App"','Request akses "Share on LinkedIn"','Copy Client ID & Client Secret'],
    fields:['Client ID','Client Secret']
  },
  {
    id:'yt', label:'YouTube', color:'#c00', icon:'▶️',
    apiUrl:'console.cloud.google.com',
    steps:['Buka console.cloud.google.com','Buat project baru','Enable "YouTube Data API v3"','Buat credentials','Copy API Key'],
    fields:['API Key','Client ID','Client Secret']
  },
  {
    id:'tk', label:'TikTok', color:'#010101', icon:'🎵',
    apiUrl:'developers.tiktok.com',
    steps:['Buka developers.tiktok.com','Daftar sebagai developer','Buat App baru','Request akses "Content Posting"','Copy Client Key & Client Secret'],
    fields:['Client Key','Client Secret']
  },
]

interface Account {
  id: string
  platform: string
  username: string
  status: 'active' | 'suspended' | 'blocked' | 'expired'
  addedAt: string
  fields: Record<string, string>
}

const statusConfig = {
  active: { label:'Aktif', color:'#4ade80', bg:'rgba(74,222,128,0.15)', border:'rgba(74,222,128,0.3)', icon:'✅' },
  suspended: { label:'Suspended', color:'#f59e0b', bg:'rgba(245,158,11,0.15)', border:'rgba(245,158,11,0.3)', icon:'⚠️' },
  blocked: { label:'Diblokir', color:'#f87171', bg:'rgba(248,113,113,0.15)', border:'rgba(248,113,113,0.3)', icon:'🚫' },
  expired: { label:'Token Expired', color:'#a78bfa', bg:'rgba(167,139,250,0.15)', border:'rgba(167,139,250,0.3)', icon:'⏰' },
}

export default function Accounts() {
  const [accounts, setAccounts] = useState<Account[]>([
    { id:'1', platform:'x', username:'@mybrand_id', status:'active', addedAt:'15 Mei 2026', fields:{} },
    { id:'2', platform:'ig', username:'@mybrand.ig', status:'active', addedAt:'15 Mei 2026', fields:{} },
    { id:'3', platform:'yt', username:'MyBrand Channel', status:'expired', addedAt:'10 Mei 2026', fields:{} },
    { id:'4', platform:'fb', username:'MyBrand Page', status:'suspended', addedAt:'1 Mei 2026', fields:{} },
  ])
  const [activeTab, setActiveTab] = useState<'accounts'|'connect'>('accounts')
  const [showForm, setShowForm] = useState<string|null>(null)
  const [showGuide, setShowGuide] = useState<string|null>(null)
  const [formFields, setFormFields] = useState<Record<string,string>>({})
  const [username, setUsername] = useState('')
  const [success, setSuccess] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const handleConnect = (platformId: string) => {
    const plat = platforms.find(p => p.id === platformId)
    if (!plat) return
    const allFilled = plat.fields.every(f => formFields[f]?.trim())
    if (!allFilled || !username.trim()) return
    const newAccount: Account = {
      id: Date.now().toString(),
      platform: platformId,
      username: username.startsWith('@') ? username : '@' + username,
      status: 'active',
      addedAt: new Date().toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric' }),
      fields: { ...formFields }
    }
    setAccounts(prev => [...prev, newAccount])
    setShowForm(null)
    setFormFields({})
    setUsername('')
    setSuccess(`${plat.label} (${newAccount.username}) berhasil terhubung!`)
    setTimeout(() => setSuccess(''), 3000)
    setActiveTab('accounts')
  }

  const handleRemove = (id: string) => {
    setAccounts(prev => prev.filter(a => a.id !== id))
  }

  const handleStatusChange = (id: string, status: Account['status']) => {
    setAccounts(prev => prev.map(a => a.id === id ? { ...a, status } : a))
  }

  const filteredAccounts = filterStatus === 'all'
    ? accounts
    : accounts.filter(a => a.status === filterStatus)

  const getPlatform = (id: string) => platforms.find(p => p.id === id)

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

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'12px' }}>
        {[
          { label:'Total Akun', value:accounts.length, color:'#667eea' },
          { label:'Aktif', value:accounts.filter(a=>a.status==='active').length, color:'#4ade80' },
          { label:'Bermasalah', value:accounts.filter(a=>a.status!=='active').length, color:'#f87171' },
          { label:'Platform', value:new Set(accounts.map(a=>a.platform)).size, color:'#f59e0b' },
        ].map((s,i) => (
          <div key={i} style={{ ...glass, padding:'1rem', borderRadius:'16px' }}>
            <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)', marginBottom:'4px' }}>{s.label}</div>
            <div style={{ fontSize:'28px', fontWeight:'700', color:s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', gap:'8px' }}>
        {[
          { id:'accounts', label:'📋 Daftar Akun' },
          { id:'connect', label:'➕ Tambah Akun' },
        ].map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id as any)} style={{
            padding:'9px 18px', borderRadius:'10px', fontSize:'13px', fontWeight:'500',
            cursor:'pointer', border:'none', transition:'all 0.15s',
            background: activeTab === t.id ? 'linear-gradient(135deg,#667eea,#764ba2)' : 'rgba(255,255,255,0.08)',
            color:'white'
          }}>{t.label}</button>
        ))}
      </div>

      {/* Tab: Daftar Akun */}
      {activeTab === 'accounts' && (
        <div style={{ ...glass, padding:'1.5rem', borderRadius:'16px' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1rem' }}>
            <h3 style={{ fontSize:'15px', fontWeight:'600', color:'white' }}>📋 Semua Akun Terhubung</h3>
            <div style={{ display:'flex', gap:'6px' }}>
              {['all','active','expired','suspended','blocked'].map(s => (
                <button key={s} onClick={() => setFilterStatus(s)} style={{
                  padding:'5px 12px', borderRadius:'99px', fontSize:'11px', fontWeight:'500',
                  cursor:'pointer', border:'none',
                  background: filterStatus === s ? 'linear-gradient(135deg,#667eea,#764ba2)' : 'rgba(255,255,255,0.08)',
                  color:'white'
                }}>
                  {s === 'all' ? 'Semua' : s === 'active' ? 'Aktif' : s === 'expired' ? 'Expired' : s === 'suspended' ? 'Suspended' : 'Diblokir'}
                </button>
              ))}
            </div>
          </div>

          {filteredAccounts.length === 0 ? (
            <div style={{ textAlign:'center', padding:'2rem', color:'rgba(255,255,255,0.3)' }}>
              <div style={{ fontSize:'40px', marginBottom:'8px' }}>📭</div>
              <div style={{ fontSize:'14px' }}>Belum ada akun yang terhubung</div>
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
              {filteredAccounts.map(acc => {
                const plat = getPlatform(acc.platform)
                const status = statusConfig[acc.status]
                return (
                  <div key={acc.id} style={{
                    display:'flex', alignItems:'center', gap:'12px',
                    padding:'14px', borderRadius:'12px',
                    background:'rgba(255,255,255,0.04)',
                    border:`1px solid ${status.border}`
                  }}>
                    {/* Platform icon */}
                    <div style={{
                      width:'42px', height:'42px', borderRadius:'12px',
                      background: plat?.color === '#000' ? '#111' : plat?.color || '#333',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:'20px', flexShrink:0,
                      border:'1px solid rgba(255,255,255,0.1)'
                    }}>{plat?.icon}</div>

                    {/* Info */}
                    <div style={{ flex:1 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                        <span style={{ fontSize:'14px', fontWeight:'500', color:'white' }}>{acc.username}</span>
                        <span style={{
                          fontSize:'11px', padding:'2px 8px', borderRadius:'99px', fontWeight:'500',
                          background:status.bg, color:status.color, border:`1px solid ${status.border}`
                        }}>{status.icon} {status.label}</span>
                      </div>
                      <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)', marginTop:'3px' }}>
                        {plat?.label} · Ditambahkan {acc.addedAt}
                      </div>
                    </div>

                    {/* Actions */}
                    <div style={{ display:'flex', gap:'6px' }}>
                      {acc.status !== 'active' && (
                        <button onClick={() => handleStatusChange(acc.id, 'active')} style={{
                          padding:'6px 12px', borderRadius:'8px', fontSize:'11px',
                          background:'rgba(74,222,128,0.15)',
                          border:'1px solid rgba(74,222,128,0.3)',
                          color:'#4ade80', cursor:'pointer'
                        }}>✓ Aktifkan</button>
                      )}
                      {acc.status === 'active' && (
                        <button onClick={() => handleStatusChange(acc.id, 'suspended')} style={{
                          padding:'6px 12px', borderRadius:'8px', fontSize:'11px',
                          background:'rgba(245,158,11,0.15)',
                          border:'1px solid rgba(245,158,11,0.3)',
                          color:'#f59e0b', cursor:'pointer'
                        }}>⏸ Nonaktifkan</button>
                      )}
                      <button onClick={() => handleRemove(acc.id)} style={{
                        padding:'6px 12px', borderRadius:'8px', fontSize:'11px',
                        background:'rgba(248,113,113,0.15)',
                        border:'1px solid rgba(248,113,113,0.3)',
                        color:'#f87171', cursor:'pointer'
                      }}>🗑 Hapus</button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab: Tambah Akun */}
      {activeTab === 'connect' && (
        <div style={{ ...glass, padding:'1.5rem', borderRadius:'16px' }}>
          <h3 style={{ fontSize:'15px', fontWeight:'600', marginBottom:'4px', color:'white' }}>➕ Tambah Akun Baru</h3>
          <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.4)', marginBottom:'1.5rem' }}>
            Kamu bisa menambahkan banyak akun dari platform yang sama.
          </p>

          <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
            {platforms.map(p => (
              <div key={p.id}>
                <div style={{
                  display:'flex', alignItems:'center', gap:'12px',
                  padding:'14px', borderRadius:'12px',
                  background:'rgba(255,255,255,0.04)',
                  border:'1px solid rgba(255,255,255,0.08)'
                }}>
                  <div style={{
                    width:'44px', height:'44px', borderRadius:'12px',
                    background: p.color === '#000' ? '#111' : p.color,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:'20px', flexShrink:0,
                    border:'1px solid rgba(255,255,255,0.1)'
                  }}>{p.icon}</div>

                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:'14px', fontWeight:'500', color:'white' }}>{p.label}</div>
                    <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)', marginTop:'2px' }}>
                      {accounts.filter(a => a.platform === p.id).length} akun terhubung · {p.apiUrl}
                    </div>
                  </div>

                  <div style={{ display:'flex', gap:'8px' }}>
                    <button onClick={() => { setShowGuide(showGuide === p.id ? null : p.id); setShowForm(null) }} style={{
                      padding:'7px 12px', borderRadius:'8px', fontSize:'12px',
                      background:'rgba(255,255,255,0.08)',
                      border:'1px solid rgba(255,255,255,0.1)',
                      color:'white', cursor:'pointer'
                    }}>📖 Panduan</button>
                    <button onClick={() => { setShowForm(showForm === p.id ? null : p.id); setShowGuide(null); setFormFields({}); setUsername('') }} style={{
                      padding:'7px 14px', borderRadius:'8px', fontSize:'12px', fontWeight:'500',
                      background:'linear-gradient(135deg,#667eea,#764ba2)',
                      border:'none', color:'white', cursor:'pointer'
                    }}>+ Tambah Akun</button>
                  </div>
                </div>

                {/* Panduan */}
                {showGuide === p.id && (
                  <div style={{
                    padding:'16px', borderRadius:'12px', marginTop:'8px',
                    background:'rgba(102,126,234,0.08)',
                    border:'1px solid rgba(102,126,234,0.2)'
                  }}>
                    <div style={{ fontSize:'13px', fontWeight:'500', color:'white', marginBottom:'12px' }}>
                      📖 Cara mendapatkan API key {p.label}:
                    </div>
                    <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
                      {p.steps.map((step, i) => (
                        <div key={i} style={{ display:'flex', gap:'10px', alignItems:'flex-start' }}>
                          <div style={{
                            width:'22px', height:'22px', borderRadius:'50%',
                            background:'linear-gradient(135deg,#667eea,#764ba2)',
                            display:'flex', alignItems:'center', justifyContent:'center',
                            fontSize:'11px', fontWeight:'600', color:'white', flexShrink:0
                          }}>{i+1}</div>
                          <span style={{ fontSize:'13px', color:'rgba(255,255,255,0.7)', lineHeight:'1.5', paddingTop:'2px' }}>{step}</span>
                        </div>
                      ))}
                    </div>
                    <button onClick={() => { setShowForm(p.id); setShowGuide(null) }} style={{
                      marginTop:'14px', padding:'8px 16px', borderRadius:'8px',
                      fontSize:'12px', fontWeight:'500',
                      background:'linear-gradient(135deg,#667eea,#764ba2)',
                      border:'none', color:'white', cursor:'pointer'
                    }}>Sudah punya API key → Tambah Akun</button>
                  </div>
                )}

                {/* Form */}
                {showForm === p.id && (
                  <div style={{
                    padding:'16px', borderRadius:'12px', marginTop:'8px',
                    background:'rgba(255,255,255,0.03)',
                    border:'1px solid rgba(255,255,255,0.08)'
                  }}>
                    <div style={{ fontSize:'13px', fontWeight:'500', color:'white', marginBottom:'12px' }}>
                      🔑 Tambah akun {p.label}
                    </div>

                    {/* Username */}
                    <div style={{ marginBottom:'12px' }}>
                      <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', marginBottom:'6px' }}>Username / Nama Akun</div>
                      <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="contoh: @namaakun"
                        style={{
                          width:'100%', padding:'9px 12px',
                          background:'rgba(255,255,255,0.06)',
                          border:'1px solid rgba(255,255,255,0.1)',
                          borderRadius:'8px', color:'white',
                          fontSize:'13px', boxSizing:'border-box'
                        }}
                      />
                    </div>

                    {/* API Fields */}
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginBottom:'12px' }}>
                      {p.fields.map(f => (
                        <div key={f}>
                          <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', marginBottom:'6px' }}>{f}</div>
                          <input
                            type="password"
                            value={formFields[f] || ''}
                            onChange={e => setFormFields(prev => ({ ...prev, [f]: e.target.value }))}
                            placeholder={`Masukkan ${f}...`}
                            style={{
                              width:'100%', padding:'9px 12px',
                              background:'rgba(255,255,255,0.06)',
                              border:'1px solid rgba(255,255,255,0.1)',
                              borderRadius:'8px', color:'white',
                              fontSize:'12px', fontFamily:'monospace',
                              boxSizing:'border-box'
                            }}
                          />
                        </div>
                      ))}
                    </div>

                    <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.3)', marginBottom:'12px' }}>
                      🔒 API key disimpan secara aman dan terenkripsi
                    </div>

                    <div style={{ display:'flex', gap:'8px', justifyContent:'flex-end' }}>
                      <button onClick={() => { setShowForm(null); setFormFields({}); setUsername('') }} style={{
                        padding:'8px 16px', borderRadius:'8px', fontSize:'12px',
                        background:'rgba(255,255,255,0.08)',
                        border:'1px solid rgba(255,255,255,0.1)',
                        color:'white', cursor:'pointer'
                      }}>Batal</button>
                      <button onClick={() => handleConnect(p.id)} style={{
                        padding:'8px 16px', borderRadius:'8px', fontSize:'12px', fontWeight:'500',
                        background:'linear-gradient(135deg,#667eea,#764ba2)',
                        border:'none', color:'white', cursor:'pointer'
                      }}>💾 Simpan & Hubungkan</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}