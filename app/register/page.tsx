'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleRegister = async () => {
    setError('')
    if (!email || !password) { setError('Email dan password wajib diisi!'); return }
    if (password !== confirm) { setError('Password tidak cocok!'); return }
    if (password.length < 6) { setError('Password minimal 6 karakter!'); return }
    setLoading(true)
    const { error } = await supabase.auth.signUp({ email, password })
    setLoading(false)
    if (error) { setError(error.message); return }
    router.push('/dashboard')
  }

  return (
    <div style={{
      display:'flex', justifyContent:'center', alignItems:'center',
      minHeight:'100vh', background:'#0f0c29',
      backgroundImage:'radial-gradient(ellipse at top, #302b63 0%, #0f0c29 70%)',
      fontFamily:'system-ui,sans-serif'
    }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(30px); }
          to { opacity:1; transform:translateY(0); }
        }
        .register-card { animation: fadeUp 0.6s ease forwards; }
        .btn:hover { transform:translateY(-2px); opacity:0.92; }
        .input-field:focus { border-color:#764ba2 !important; box-shadow:0 0 0 3px rgba(118,75,162,0.15); }
      `}</style>

      <div className="register-card" style={{
        background:'rgba(255,255,255,0.05)',
        backdropFilter:'blur(20px)',
        border:'1px solid rgba(255,255,255,0.1)',
        padding:'2.5rem', borderRadius:'20px',
        width:'420px', boxShadow:'0 25px 50px rgba(0,0,0,0.5)'
      }}>
        <div style={{ textAlign:'center', marginBottom:'2rem' }}>
          <div style={{
            width:'64px', height:'64px',
            background:'linear-gradient(135deg,#667eea,#764ba2)',
            borderRadius:'18px', display:'flex', alignItems:'center',
            justifyContent:'center', margin:'0 auto 1rem', fontSize:'28px'
          }}>📱</div>
          <h2 style={{ margin:0, fontSize:'24px', fontWeight:'700', color:'white' }}>Buat Akun Baru</h2>
          <p style={{ margin:'8px 0 0', fontSize:'14px', color:'rgba(255,255,255,0.5)' }}>Gratis selamanya untuk personal</p>
        </div>

        {error && (
          <div style={{
            background:'rgba(255,80,80,0.15)', border:'1px solid rgba(255,80,80,0.3)',
            color:'#ff8080', padding:'10px 14px', borderRadius:'10px',
            fontSize:'13px', marginBottom:'16px', textAlign:'center'
          }}>{error}</div>
        )}

        <div style={{ marginBottom:'14px' }}>
          <label style={{ fontSize:'13px', fontWeight:'500', color:'rgba(255,255,255,0.7)', display:'block', marginBottom:'8px' }}>Email</label>
          <input className="input-field" type="email" placeholder="kamu@email.com"
            value={email} onChange={e => setEmail(e.target.value)}
            style={{
              width:'100%', padding:'12px 14px', borderRadius:'10px',
              border:'1.5px solid rgba(255,255,255,0.1)',
              background:'rgba(255,255,255,0.07)', color:'white',
              fontSize:'14px', boxSizing:'border-box', transition:'all 0.2s'
            }}
          />
        </div>

        <div style={{ marginBottom:'14px' }}>
          <label style={{ fontSize:'13px', fontWeight:'500', color:'rgba(255,255,255,0.7)', display:'block', marginBottom:'8px' }}>Password</label>
          <div style={{ position:'relative' }}>
            <input className="input-field" type={showPass ? 'text' : 'password'} placeholder="Min. 6 karakter"
              value={password} onChange={e => setPassword(e.target.value)}
              style={{
                width:'100%', padding:'12px 44px 12px 14px', borderRadius:'10px',
                border:'1.5px solid rgba(255,255,255,0.1)',
                background:'rgba(255,255,255,0.07)', color:'white',
                fontSize:'14px', boxSizing:'border-box', transition:'all 0.2s'
              }}
            />
            <button onClick={() => setShowPass(!showPass)} style={{
              position:'absolute', right:'12px', top:'50%', transform:'translateY(-50%)',
              background:'none', border:'none', cursor:'pointer', fontSize:'18px',
              color:'rgba(255,255,255,0.4)'
            }}>{showPass ? '🙈' : '👁️'}</button>
          </div>
        </div>

        <div style={{ marginBottom:'24px' }}>
          <label style={{ fontSize:'13px', fontWeight:'500', color:'rgba(255,255,255,0.7)', display:'block', marginBottom:'8px' }}>Konfirmasi Password</label>
          <input className="input-field" type="password" placeholder="Ulangi password"
            value={confirm} onChange={e => setConfirm(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleRegister()}
            style={{
              width:'100%', padding:'12px 14px', borderRadius:'10px',
              border:'1.5px solid rgba(255,255,255,0.1)',
              background:'rgba(255,255,255,0.07)', color:'white',
              fontSize:'14px', boxSizing:'border-box', transition:'all 0.2s'
            }}
          />
        </div>

        <button className="btn" onClick={handleRegister} disabled={loading} style={{
          width:'100%', padding:'13px',
          background:'linear-gradient(135deg,#667eea,#764ba2)',
          color:'white', border:'none', borderRadius:'10px',
          fontSize:'15px', fontWeight:'600', cursor:'pointer',
          opacity: loading ? 0.7 : 1, transition:'all 0.15s'
        }}>
          {loading ? '⏳ Mendaftarkan...' : '🚀 Daftar Sekarang'}
        </button>

        <p style={{ textAlign:'center', fontSize:'13px', color:'rgba(255,255,255,0.4)', marginTop:'1.25rem', marginBottom:0 }}>
          Sudah punya akun?{' '}
          <span onClick={() => router.push('/')} style={{ color:'#a78bfa', cursor:'pointer', fontWeight:'600' }}>Masuk di sini</span>
        </p>
      </div>
    </div>
  )
}