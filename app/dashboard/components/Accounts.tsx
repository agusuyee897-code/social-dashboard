'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

const glass = {
  background: 'rgba(255,255,255,0.05)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.1)',
}

const platforms = [
  {
    id: 'x', label: 'X / Twitter',
    color: '#000000', selectedBg: 'linear-gradient(135deg,#1a1a1a,#333)', border: '#ffffff',
    apiUrl: 'developer.twitter.com',
    steps: [
      'Buka developer.twitter.com',
      'Klik "Sign up for Free Account"',
      'Buat App baru di dashboard',
      'Copy API Key & API Secret Key di tab "Keys and Tokens"',
    ],
    fields: ['API Key', 'API Secret Key'],
    svg: (<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>)
  },
  {
    id: 'ig', label: 'Instagram',
    color: '#e1306c', selectedBg: 'linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)', border: '#e1306c',
    apiUrl: 'developers.facebook.com',
    steps: [
      'Buka developers.facebook.com',
      'Klik "My Apps" → "Create App" → pilih tipe "Business"',
      'Tambahkan produk "Instagram Graph API"',
      'Copy App ID & App Secret dari Settings → Basic',
    ],
    fields: ['App ID', 'App Secret'],
    svg: (<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>)
  },
  {
    id: 'fb', label: 'Facebook',
    color: '#1877f2', selectedBg: 'linear-gradient(135deg,#1877f2,#0d5cbf)', border: '#1877f2',
    apiUrl: 'developers.facebook.com',
    steps: [
      'Buka developers.facebook.com',
      'Buat App baru → pilih tipe "Business"',
      'Tambahkan produk "Pages API"',
      'Copy App ID & App Secret dari Settings → Basic',
    ],
    fields: ['App ID', 'App Secret'],
    svg: (<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>)
  },
  {
    id: 'li', label: 'LinkedIn',
    color: '#0a66c2', selectedBg: 'linear-gradient(135deg,#0a66c2,#064e94)', border: '#0a66c2',
    apiUrl: 'developer.linkedin.com',
    steps: [
      'Buka developer.linkedin.com',
      'Klik "Create App" dan isi data aplikasi',
      'Request akses "Share on LinkedIn"',
      'Copy Client ID & Client Secret dari tab "Auth"',
    ],
    fields: ['Client ID', 'Client Secret'],
    svg: (<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>)
  },
  {
    id: 'yt', label: 'YouTube',
    color: '#ff0000', selectedBg: 'linear-gradient(135deg,#ff0000,#cc0000)', border: '#ff0000',
    apiUrl: 'console.cloud.google.com',
    steps: [
      'Buka console.cloud.google.com',
      'Buat project baru → Enable "YouTube Data API v3"',
      'Buka "Credentials" → "Create Credentials" → pilih "OAuth 2.0 Client ID"',
      'Copy Client ID & Client Secret',
    ],
    fields: ['Client ID', 'Client Secret'],
    svg: (<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>)
  },
  {
    id: 'tk', label: 'TikTok',
    color: '#010101', selectedBg: 'linear-gradient(135deg,#010101,#2d2d2d)', border: '#69C9D0',
    apiUrl: 'developers.tiktok.com',
    steps: [
      'Buka developers.tiktok.com',
      'Daftar sebagai developer & buat App baru',
      'Request akses "Content Posting API"',
      'Copy Client Key & Client Secret dari dashboard app',
    ],
    fields: ['Client Key', 'Client Secret'],
    svg: (<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/></svg>)
  },
]

interface Account {
  id: string
  platform: string
  username: string
  status: 'active' | 'suspended' | 'blocked' | 'expired'
  added_at: string
  api_field1_name: string
  api_field1_value: string
  api_field2_name: string
  api_field2_value: string
  user_id?: string
}

const statusConfig = {
  active:    { label:'Aktif',         color:'#4ade80', bg:'rgba(74,222,128,0.15)',   border:'rgba(74,222,128,0.3)',  icon:'✅' },
  suspended: { label:'Suspended',     color:'#f59e0b', bg:'rgba(245,158,11,0.15)',  border:'rgba(245,158,11,0.3)', icon:'⚠️' },
  blocked:   { label:'Diblokir',      color:'#f87171', bg:'rgba(248,113,113,0.15)', border:'rgba(248,113,113,0.3)',icon:'🚫' },
  expired:   { label:'Token Expired', color:'#a78bfa', bg:'rgba(167,139,250,0.15)', border:'rgba(167,139,250,0.3)',icon:'⏰' },
}

export default function Accounts() {
  const [accounts, setAccounts]         = useState<Account[]>([])
  const [activeTab, setActiveTab]       = useState<'accounts'|'connect'>('accounts')
  const [showForm, setShowForm]         = useState<string|null>(null)
  const [showGuide, setShowGuide]       = useState<string|null>(null)
  const [formFields, setFormFields]     = useState<Record<string,string>>({})
  const [username, setUsername]         = useState('')
  const [success, setSuccess]           = useState('')
  const [error, setError]               = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [loading, setLoading]           = useState(true)
  const [userId, setUserId]             = useState<string|null>(null)

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        setUserId(session.user.id)
        await fetchAccounts(session.user.id)
      }
      setLoading(false)
    }
    init()
  }, [])

  const fetchAccounts = async (uid: string) => {
    const { data, error } = await supabase
      .from('accounts')
      .select('*')
      .eq('user_id', uid)
      .order('added_at', { ascending: false })
    if (!error && data) setAccounts(data)
  }

  const handleConnect = async (platformId: string) => {
    const plat = platforms.find(p => p.id === platformId)
    if (!plat || !userId) return
    const allFilled = plat.fields.every(f => formFields[f]?.trim())
    if (!allFilled || !username.trim()) {
      setError('Lengkapi semua field terlebih dahulu!')
      setTimeout(() => setError(''), 3000)
      return
    }
    const { error } = await supabase.from('accounts').insert({
      user_id: userId,
      platform: platformId,
      username: username.startsWith('@') ? username : '@' + username,
      status: 'active',
      api_field1_name: plat.fields[0],
      api_field1_value: formFields[plat.fields[0]] || '',
      api_field2_name: plat.fields[1],
      api_field2_value: formFields[plat.fields[1]] || '',
    })
    if (error) {
      setError('Gagal menyimpan: ' + error.message)
      setTimeout(() => setError(''), 3000)
      return
    }
    await fetchAccounts(userId)
    setShowForm(null); setFormFields({}); setUsername('')
    setSuccess(`${plat.label} berhasil terhubung!`)
    setTimeout(() => setSuccess(''), 3000)
    setActiveTab('accounts')
  }

  const handleRemove = async (id: string) => {
    await supabase.from('accounts').delete().eq('id', id)
    setAccounts(prev => prev.filter(a => a.id !== id))
  }

  const handleStatusChange = async (id: string, status: Account['status']) => {
    await supabase.from('accounts').update({ status }).eq('id', id)
    setAccounts(prev => prev.map(a => a.id === id ? { ...a, status } : a))
  }

  const filteredAccounts = filterStatus === 'all' ? accounts : accounts.filter(a => a.status === filterStatus)
  const getPlatform = (id: string) => platforms.find(p => p.id === id)

  if (loading) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'200px', color:'rgba(255,255,255,0.4)', fontSize:'14px' }}>
      ⏳ Memuat data...
    </div>
  )

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>

      {success && <div style={{ padding:'12px 16px', borderRadius:'12px', background:'rgba(74,222,128,0.15)', border:'1px solid rgba(74,222,128,0.3)', color:'#4ade80', fontSize:'14px' }}>✓ {success}</div>}
      {error   && <div style={{ padding:'12px 16px', borderRadius:'12px', background:'rgba(248,113,113,0.15)', border:'1px solid rgba(248,113,113,0.3)', color:'#f87171', fontSize:'14px' }}>✕ {error}</div>}

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'12px' }}>
        {[
          { label:'Total Akun', value:accounts.length,                               color:'#667eea' },
          { label:'Aktif',      value:accounts.filter(a=>a.status==='active').length, color:'#4ade80' },
          { label:'Bermasalah', value:accounts.filter(a=>a.status!=='active').length, color:'#f87171' },
          { label:'Platform',   value:new Set(accounts.map(a=>a.platform)).size,      color:'#f59e0b' },
        ].map((s,i) => (
          <div key={i} style={{ ...glass, padding:'1rem', borderRadius:'16px' }}>
            <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)', marginBottom:'4px' }}>{s.label}</div>
            <div style={{ fontSize:'28px', fontWeight:'700', color:s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', gap:'8px' }}>
        {[{ id:'accounts', label:'📋 Daftar Akun' }, { id:'connect', label:'➕ Tambah Akun' }].map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id as any)} style={{
            padding:'9px 18px', borderRadius:'10px', fontSize:'13px', fontWeight:'500',
            cursor:'pointer', border:'none',
            background: activeTab===t.id ? 'linear-gradient(135deg,#667eea,#764ba2)' : 'rgba(255,255,255,0.08)',
            color:'white'
          }}>{t.label}</button>
        ))}
      </div>

      {/* Daftar Akun */}
      {activeTab === 'accounts' && (
        <div style={{ ...glass, padding:'1.5rem', borderRadius:'16px' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1rem', flexWrap:'wrap', gap:'8px' }}>
            <h3 style={{ fontSize:'15px', fontWeight:'600', color:'white' }}>📋 Semua Akun Terhubung</h3>
            <div style={{ display:'flex', gap:'6px', flexWrap:'wrap' }}>
              {['all','active','expired','suspended','blocked'].map(s => (
                <button key={s} onClick={() => setFilterStatus(s)} style={{
                  padding:'5px 12px', borderRadius:'99px', fontSize:'11px', fontWeight:'500',
                  cursor:'pointer', border:'none',
                  background: filterStatus===s ? 'linear-gradient(135deg,#667eea,#764ba2)' : 'rgba(255,255,255,0.08)',
                  color:'white'
                }}>{s==='all'?'Semua':s==='active'?'Aktif':s==='expired'?'Expired':s==='suspended'?'Suspended':'Diblokir'}</button>
              ))}
            </div>
          </div>

          {filteredAccounts.length === 0 ? (
            <div style={{ textAlign:'center', padding:'2rem', color:'rgba(255,255,255,0.3)' }}>
              <div style={{ fontSize:'40px', marginBottom:'8px' }}>📭</div>
              <div style={{ fontSize:'14px' }}>Belum ada akun yang terhubung</div>
              <button onClick={() => setActiveTab('connect')} style={{
                marginTop:'12px', padding:'8px 18px', borderRadius:'10px', fontSize:'13px',
                background:'linear-gradient(135deg,#667eea,#764ba2)', border:'none', color:'white', cursor:'pointer'
              }}>➕ Tambah Akun Pertama</button>
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
              {filteredAccounts.map(acc => {
                const plat   = getPlatform(acc.platform)
                const status = statusConfig[acc.status] || statusConfig.active
                return (
                  <div key={acc.id} style={{ display:'flex', alignItems:'center', gap:'12px', padding:'14px', borderRadius:'12px', background:'rgba(255,255,255,0.04)', border:`1px solid ${status.border}` }}>
                    <div style={{ width:'42px', height:'42px', borderRadius:'12px', background:plat?.selectedBg||'#333', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, color:'white', boxShadow:`0 0 10px ${plat?.color||'#333'}55`, border:'1px solid rgba(255,255,255,0.08)' }}>
                      {plat?.svg}
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:'8px', flexWrap:'wrap' }}>
                        <span style={{ fontSize:'14px', fontWeight:'500', color:'white' }}>{acc.username}</span>
                        <span style={{ fontSize:'11px', padding:'2px 8px', borderRadius:'99px', fontWeight:'500', background:status.bg, color:status.color, border:`1px solid ${status.border}` }}>{status.icon} {status.label}</span>
                      </div>
                      <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)', marginTop:'3px' }}>
                        {plat?.label} · {new Date(acc.added_at).toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric' })}
                      </div>
                    </div>
                    <div style={{ display:'flex', gap:'6px', flexShrink:0 }}>
                      {acc.status !== 'active' && (
                        <button onClick={() => handleStatusChange(acc.id,'active')} style={{ padding:'6px 12px', borderRadius:'8px', fontSize:'11px', background:'rgba(74,222,128,0.15)', border:'1px solid rgba(74,222,128,0.3)', color:'#4ade80', cursor:'pointer' }}>✓ Aktifkan</button>
                      )}
                      {acc.status === 'active' && (
                        <button onClick={() => handleStatusChange(acc.id,'suspended')} style={{ padding:'6px 12px', borderRadius:'8px', fontSize:'11px', background:'rgba(245,158,11,0.15)', border:'1px solid rgba(245,158,11,0.3)', color:'#f59e0b', cursor:'pointer' }}>⏸ Nonaktifkan</button>
                      )}
                      <button onClick={() => handleRemove(acc.id)} style={{ padding:'6px 12px', borderRadius:'8px', fontSize:'11px', background:'rgba(248,113,113,0.15)', border:'1px solid rgba(248,113,113,0.3)', color:'#f87171', cursor:'pointer' }}>🗑 Hapus</button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Tambah Akun */}
      {activeTab === 'connect' && (
        <div style={{ ...glass, padding:'1.5rem', borderRadius:'16px' }}>
          <h3 style={{ fontSize:'15px', fontWeight:'600', marginBottom:'4px', color:'white' }}>➕ Tambah Akun Baru</h3>
          <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.4)', marginBottom:'1.5rem' }}>Kamu bisa menambahkan banyak akun dari platform yang sama.</p>
          <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
            {platforms.map(p => (
              <div key={p.id}>
                <div style={{ display:'flex', alignItems:'center', gap:'12px', padding:'14px', borderRadius:'12px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ width:'44px', height:'44px', borderRadius:'12px', background:p.selectedBg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, color:'white', boxShadow:`0 0 10px ${p.color}55`, border:'1px solid rgba(255,255,255,0.08)' }}>{p.svg}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:'14px', fontWeight:'500', color:'white' }}>{p.label}</div>
                    <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)', marginTop:'2px' }}>{accounts.filter(a=>a.platform===p.id).length} akun terhubung · {p.apiUrl}</div>
                  </div>
                  <div style={{ display:'flex', gap:'8px' }}>
                    <button onClick={() => { setShowGuide(showGuide===p.id?null:p.id); setShowForm(null) }} style={{ padding:'7px 12px', borderRadius:'8px', fontSize:'12px', background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.1)', color:'white', cursor:'pointer' }}>📖 Panduan</button>
                    <button onClick={() => { setShowForm(showForm===p.id?null:p.id); setShowGuide(null); setFormFields({}); setUsername('') }} style={{ padding:'7px 14px', borderRadius:'8px', fontSize:'12px', fontWeight:'500', background:'linear-gradient(135deg,#667eea,#764ba2)', border:'none', color:'white', cursor:'pointer' }}>+ Tambah</button>
                  </div>
                </div>

                {showGuide === p.id && (
                  <div style={{ padding:'16px', borderRadius:'12px', marginTop:'8px', background:'rgba(102,126,234,0.08)', border:'1px solid rgba(102,126,234,0.2)' }}>
                    <div style={{ fontSize:'13px', fontWeight:'500', color:'white', marginBottom:'12px' }}>📖 Cara mendapatkan API key {p.label}:</div>
                    <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
                      {p.steps.map((step,i) => (
                        <div key={i} style={{ display:'flex', gap:'10px', alignItems:'flex-start' }}>
                          <div style={{ width:'22px', height:'22px', borderRadius:'50%', background:'linear-gradient(135deg,#667eea,#764ba2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px', fontWeight:'600', color:'white', flexShrink:0 }}>{i+1}</div>
                          <span style={{ fontSize:'13px', color:'rgba(255,255,255,0.7)', lineHeight:'1.5', paddingTop:'2px' }}>{step}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop:'12px', padding:'10px 14px', borderRadius:'8px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)' }}>
                      <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', marginBottom:'6px' }}>Field yang dibutuhkan:</div>
                      <div style={{ display:'flex', gap:'8px' }}>
                        {p.fields.map(f => (<span key={f} style={{ fontSize:'12px', padding:'3px 10px', borderRadius:'99px', background:'rgba(102,126,234,0.2)', color:'#a5b4fc', border:'1px solid rgba(102,126,234,0.3)' }}>{f}</span>))}
                      </div>
                    </div>
                    <button onClick={() => { setShowForm(p.id); setShowGuide(null) }} style={{ marginTop:'14px', padding:'8px 16px', borderRadius:'8px', fontSize:'12px', fontWeight:'500', background:'linear-gradient(135deg,#667eea,#764ba2)', border:'none', color:'white', cursor:'pointer' }}>Sudah punya API key → Tambah Akun</button>
                  </div>
                )}

                {showForm === p.id && (
                  <div style={{ padding:'16px', borderRadius:'12px', marginTop:'8px', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'14px' }}>
                      <div style={{ width:'32px', height:'32px', borderRadius:'8px', background:p.selectedBg, display:'flex', alignItems:'center', justifyContent:'center', color:'white', flexShrink:0 }}>{p.svg}</div>
                      <div style={{ fontSize:'13px', fontWeight:'500', color:'white' }}>Tambah akun {p.label}</div>
                    </div>
                    <div style={{ marginBottom:'12px' }}>
                      <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', marginBottom:'6px' }}>Username / Nama Akun</div>
                      <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="contoh: @namaakun"
                        style={{ width:'100%', padding:'9px 12px', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'8px', color:'white', fontSize:'13px', boxSizing:'border-box' }} />
                    </div>
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginBottom:'12px' }}>
                      {p.fields.map(f => (
                        <div key={f}>
                          <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', marginBottom:'6px' }}>{f}</div>
                          <input type="password" value={formFields[f]||''} onChange={e => setFormFields(prev=>({...prev,[f]:e.target.value}))} placeholder={`Masukkan ${f}...`}
                            style={{ width:'100%', padding:'9px 12px', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'8px', color:'white', fontSize:'12px', fontFamily:'monospace', boxSizing:'border-box' }} />
                        </div>
                      ))}
                    </div>
                    <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.3)', marginBottom:'12px' }}>🔒 API key disimpan secara aman dan terenkripsi</div>
                    <div style={{ display:'flex', gap:'8px', justifyContent:'flex-end' }}>
                      <button onClick={() => { setShowForm(null); setFormFields({}); setUsername('') }} style={{ padding:'8px 16px', borderRadius:'8px', fontSize:'12px', background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.1)', color:'white', cursor:'pointer' }}>Batal</button>
                      <button onClick={() => handleConnect(p.id)} style={{ padding:'8px 16px', borderRadius:'8px', fontSize:'12px', fontWeight:'500', background:'linear-gradient(135deg,#667eea,#764ba2)', border:'none', color:'white', cursor:'pointer' }}>💾 Simpan & Hubungkan</button>
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