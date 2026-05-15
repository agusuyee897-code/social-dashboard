'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async () => {
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) { setError('Email atau password salah!'); return }
    router.push('/dashboard')
  }

  return (
    <div style={{
      display:'flex', justifyContent:'center', alignItems:'center',
      minHeight:'100vh', background:'#0f0c29',
      backgroundImage:'radial-gradient(ellipse at top, #302b63 0%, #0f0c29 70%)',
      fontFamily:'system-ui, sans-serif'
    }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(30px); }
          to { opacity:1; transform:translateY(0); }
        }
        @keyframes float {
          0%,100% { transform:translateY(0px); }
          50% { transform:translateY(-8px); }
        }
        @keyframes pulse {
          0%,100% { box-shadow:0 0 0 0 rgba(118,75,162,0.4); }
          50% { box-shadow:0 0 0 12px rgba(118,75,162,0); }
        }
        .login-card {
          animation: fadeUp 0.6s ease forwards;
        }
        .logo-wrap {
          animation: float 3s ease-in-out infinite;
        }
        .btn-login {
          transition: transform 0.15s, opacity 0.15s;
        }
        .btn-login:hover {
          transform: translateY(-2px);
          opacity: 0.92;
        }
        .btn-login:active {
          transform: translateY(0px);
        }
        .input-field {
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .input-field:focus {
          border-color: #764ba2 !important;
          box-shadow: 0 0 0 3px rgba(118,75,162,0.15);
          outline: none;
        }
        .show-pass-btn {
          transition: color 0.2s;
        }
        .show-pass-btn:hover {
          color: #764ba2 !important;
        }
      `}</style>

      <div className="login-card" style={{
        background:'rgba(255,255,255,0.05)',
        backdropFilter:'blur(20px)',
        border:'1px solid rgba(255,255,255,0.1)',
        padding:'2.5rem',
        borderRadius:'20px',
        width:'400px',
        boxShadow:'0 25px 50px rgba(0,0,0,0.5)'
      }}>
        <div className="logo-wrap" style={{ textAlign:'center', marginBottom:'2rem' }}>
          <div style={{
            width:'64px', height:'64px',
            background:'linear-gradient(135deg, #667eea, #764ba2)',
            borderRadius:'18px', display:'flex', alignItems:'center',
            justifyContent:'center', margin:'0 auto 1rem',
            animation:'pulse 2s infinite'
          }}>
            <span style={{ fontSize:'28px' }}>📱</span>
          </div>
          <h2 style={{ margin:0, fontSize:'24px', fontWeight:'700', color:'white' }}>Social Dashboard</h2>
          <p style={{ margin:'8px 0 0', fontSize:'14px', color:'rgba(255,255,255,0.5)' }}>Kelola semua akun sosial media kamu</p>
        </div>

        {error && (
          <div style={{
            background:'rgba(255,80,80,0.15)', border:'1px solid rgba(255,80,80,0.3)',
            color:'#ff8080', padding:'10px 14px', borderRadius:'10px',
            fontSize:'13px', marginBottom:'16px', textAlign:'center'
          }}>{error}</div>
        )}

        <div style={{ marginBottom:'16px' }}>
          <label style={{ fontSize:'13px', fontWeight:'500', color:'rgba(255,255,255,0.7)', display:'block', marginBottom:'8px' }}>Email</label>
          <input
            className="input-field"
            type="email"
            placeholder="kamu@email.com"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            style={{
              width:'100%', padding:'12px 14px', borderRadius:'10px',
              border:'1.5px solid rgba(255,255,255,0.1)',
              background:'rgba(255,255,255,0.07)', color:'white',
              fontSize:'14px', boxSizing:'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom:'24px' }}>
          <label style={{ fontSize:'13px', fontWeight:'500', color:'rgba(255,255,255,0.7)', display:'block', marginBottom:'8px' }}>Password</label>
          <div style={{ position:'relative' }}>
            <input
              className="input-field"
              type={showPass ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              style={{
                width:'100%', padding:'12px 44px 12px 14px', borderRadius:'10px',
                border:'1.5px solid rgba(255,255,255,0.1)',
                background:'rgba(255,255,255,0.07)', color:'white',
                fontSize:'14px', boxSizing:'border-box'
              }}
            />
            <button
              className="show-pass-btn"
              onClick={() => setShowPass(!showPass)}
              style={{
                position:'absolute', right:'12px', top:'50%',
                transform:'translateY(-50%)', background:'none',
                border:'none', cursor:'pointer', fontSize:'18px',
                color:'rgba(255,255,255,0.4)', padding:'0'
              }}
            >
              {showPass ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        <button
          className="btn-login"
          onClick={handleLogin}
          disabled={loading}
          style={{
            width:'100%', padding:'13px',
            background:'linear-gradient(135deg, #667eea, #764ba2)',
            color:'white', border:'none', borderRadius:'10px',
            fontSize:'15px', fontWeight:'600', cursor:'pointer',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? '⏳ Memverifikasi...' : '🚀 Masuk Sekarang'}
        </button>

        <div style={{ display:'flex', alignItems:'center', gap:'10px', margin:'20px 0' }}>
          <div style={{ flex:1, height:'1px', background:'rgba(255,255,255,0.1)' }}></div>
          <span style={{ fontSize:'12px', color:'rgba(255,255,255,0.3)' }}>atau</span>
          <div style={{ flex:1, height:'1px', background:'rgba(255,255,255,0.1)' }}></div>
        </div>

        <p style={{ textAlign:'center', fontSize:'13px', color:'rgba(255,255,255,0.4)', margin:0 }}>
          Belum punya akun?{' '}
          <span onClick={() => router.push('/register')} style={{ color:'#a78bfa', cursor:'pointer', fontWeight:'600' }}>Daftar gratis</span>
        </p>
      </div>
    </div>
  )
}