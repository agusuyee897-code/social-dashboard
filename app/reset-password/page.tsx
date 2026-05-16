'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleReset = async () => {
    if (!password) { setError('Password wajib diisi!'); return }
    if (password !== confirm) { setError('Password tidak cocok!'); return }
    if (password.length < 6) { setError('Password minimal 6 karakter!'); return }
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.updateUser({ password })
    setLoading(false)
    if (error) { setError(error.message); return }
    setSuccess(true)
    setTimeout(() => router.push('/'), 3000)
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
        .card { animation: fadeUp 0.6s ease forwards; }
        .btn:hover { transform:translateY(-2px); opacity:0.9; }
        .input-field:focus { border-color:#764ba2 !important; box-shadow:0 0 0 3px rgba(118,75,162,0.15); }
      `}</style>

      <div className="card" style={{
        background:'rgba(255,255,255,0.05)',
        backdropFilter:'blur(20px)',
        border:'1px solid rgba(255,255,255,0.1)',
        padding:'2.5rem', borderRadius:'20px',
        width:'400px', boxShadow:'0 25px 50px rgba(0,0,0,0.5)'
      }}>
        {!success ? (
          <>
            <div style={{ textAlign:'center', marginBottom:'2rem' }}>
              <div style={{
                width:'64px', height:'64px',
                background:'linear-gradient(135deg,#667eea,#764ba2)',
                borderRadius:'18px', display:'flex', alignItems:'center',
                justifyContent:'center', margin:'0 auto 1rem', fontSize:'28px'
              }}>🔑</div>
              <h2 style={{ margin:0, fontSize:'22px', fontWeight:'700', color:'white' }}>Reset Password</h2>
              <p style={{ margin:'8px 0 0', fontSize:'14px', color:'rgba(255,255,255,0.5)' }}>Masukkan password baru kamu</p>
            </div>

            {error && (
              <div style={{
                background:'rgba(255,80,80,0.15)', border:'1px solid rgba(255,80,80,0.3)',
                color:'#ff8080', padding:'10px 14px', borderRadius:'10px',
                fontSize:'13px', marginBottom:'16px', textAlign:'center'
              }}>{error}</div>
            )}

            <div style={{ marginBottom:'14px' }}>
              <label style={{ fontSize:'13px', fontWeight:'500', color:'rgba(255,255,255,0.7)', display:'block', marginBottom:'8px' }}>Password Baru</label>
              <div style={{ position:'relative' }}>
                <input className="input-field" type={showPass ? 'text' : 'password'}
                  placeholder="Min. 6 karakter" value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{
                    width:'100%', padding:'12px 44px 12px 14px', borderRadius:'10px',
                    border:'1.5px solid rgba(255,255,255,0.1)',
                    background:'rgba(255,255,255,0.07)', color:'white',
                    fontSize:'14px', boxSizing:'border-box', transition:'all 0.2s'
                  }}
                />
                <button onClick={() => setShowPass(!showPass)} style={{
                  position:'absolute', right:'12px', top:'50%', transform:'translateY(-50%)',
                  background:'none', border:'none', cursor:'pointer',
                  fontSize:'18px', color:'rgba(255,255,255,0.4)'
                }}>{showPass ? '🙈' : '👁️'}</button>
              </div>
            </div>

            <div style={{ marginBottom:'24px' }}>
              <label style={{ fontSize:'13px', fontWeight:'500', color:'rgba(255,255,255,0.7)', display:'block', marginBottom:'8px' }}>Konfirmasi Password</label>
              <input className="input-field" type="password"
                placeholder="Ulangi password baru" value={confirm}
                onChange={e => setConfirm(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleReset()}
                style={{
                  width:'100%', padding:'12px 14px', borderRadius:'10px',
                  border:'1.5px solid rgba(255,255,255,0.1)',
                  background:'rgba(255,255,255,0.07)', color:'white',
                  fontSize:'14px', boxSizing:'border-box', transition:'all 0.2s'
                }}
              />
            </div>

            <button className="btn" onClick={handleReset} disabled={loading} style={{
              width:'100%', padding:'13px',
              background:'linear-gradient(135deg,#667eea,#764ba2)',
              color:'white', border:'none', borderRadius:'10px',
              fontSize:'15px', fontWeight:'600', cursor:'pointer',
              opacity: loading ? 0.7 : 1, transition:'all 0.15s'
            }}>
              {loading ? '⏳ Menyimpan...' : '🔐 Simpan Password Baru'}
            </button>
          </>
        ) : (
          <div style={{ textAlign:'center' }}>
            <div style={{ fontSize:'60px', marginBottom:'1rem' }}>✅</div>
            <h2 style={{ fontSize:'22px', fontWeight:'700', color:'white', marginBottom:'8px' }}>Password Berhasil Diubah!</h2>
            <p style={{ fontSize:'14px', color:'rgba(255,255,255,0.5)', marginBottom:'1.5rem' }}>
              Kamu akan diarahkan ke halaman login dalam 3 detik...
            </p>
          </div>
        )}
      </div>
    </div>
  )
}