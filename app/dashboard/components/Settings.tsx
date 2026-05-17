'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase'

const glass = {
  background: 'rgba(255,255,255,0.05)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.1)',
}

export default function Settings() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [notif, setNotif] = useState(true)
  const [autoPost, setAutoPost] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [passLoading, setPassLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  useEffect(() => {
    const loadUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setEmail(user.email || '')
        setName(user.user_metadata?.name || '')
        setNotif(user.user_metadata?.notif ?? true)
        setAutoPost(user.user_metadata?.autoPost ?? false)
      }
    }
    loadUser()
  }, [])

  const showMsg = (msg: string, isError = false) => {
    if (isError) { setError(msg); setTimeout(() => setError(''), 4000) }
    else { setSuccess(msg); setTimeout(() => setSuccess(''), 4000) }
  }

  const handleSaveProfile = async () => {
    setLoading(true)
    const { error } = await supabase.auth.updateUser({
      data: { name, notif, autoPost }
    })
    setLoading(false)
    if (error) { showMsg(error.message, true); return }
    showMsg('Profil berhasil disimpan!')
  }

  const handleChangePassword = async () => {
    if (!newPassword) { showMsg('Password baru wajib diisi!', true); return }
    if (newPassword.length < 6) { showMsg('Password minimal 6 karakter!', true); return }
    if (newPassword !== confirmPassword) { showMsg('Konfirmasi password tidak cocok!', true); return }
    setPassLoading(true)
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    setPassLoading(false)
    if (error) { showMsg(error.message, true); return }
    setNewPassword('')
    setConfirmPassword('')
    showMsg('Password berhasil diubah!')
  }

  const handleResetPassword = async () => {
    setPassLoading(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    })
    setPassLoading(false)
    if (error) { showMsg(error.message, true); return }
    showMsg('Link reset password sudah dikirim ke email kamu!')
  }

  const handleDeleteData = async () => {
    if (!confirm('Yakin ingin mereset semua data pengaturan? Tindakan ini tidak dapat dibatalkan!')) return
    setDeleteLoading(true)
    const { error } = await supabase.auth.updateUser({
      data: { name:'', notif:true, autoPost:false }
    })
    setDeleteLoading(false)
    if (error) { showMsg(error.message, true); return }
    setName('')
    setNotif(true)
    setAutoPost(false)
    showMsg('Semua data pengaturan berhasil direset!')
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

      {error && (
        <div style={{
          padding:'12px 16px', borderRadius:'12px',
          background:'rgba(248,113,113,0.15)',
          border:'1px solid rgba(248,113,113,0.3)',
          color:'#f87171', fontSize:'14px'
        }}>✗ {error}</div>
      )}

      {/* Profil */}
      <div style={{ ...glass, padding:'1.5rem', borderRadius:'16px' }}>
        <h3 style={{ fontSize:'15px', fontWeight:'600', marginBottom:'1.25rem', color:'white' }}>👤 Profil</h3>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginBottom:'16px' }}>
          <div>
            <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', marginBottom:'6px' }}>Nama</div>
            <input type="text" value={name} onChange={e => setName(e.target.value)}
              placeholder="Nama kamu"
              style={{
                width:'100%', padding:'10px 12px',
                background:'rgba(255,255,255,0.06)',
                border:'1px solid rgba(255,255,255,0.1)',
                borderRadius:'8px', color:'white', fontSize:'13px',
                boxSizing:'border-box'
              }}
            />
          </div>
          <div>
            <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', marginBottom:'6px' }}>Email</div>
            <input type="email" value={email} disabled
              style={{
                width:'100%', padding:'10px 12px',
                background:'rgba(255,255,255,0.03)',
                border:'1px solid rgba(255,255,255,0.06)',
                borderRadius:'8px', color:'rgba(255,255,255,0.4)',
                fontSize:'13px', boxSizing:'border-box', cursor:'not-allowed'
              }}
            />
            <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.3)', marginTop:'4px' }}>Email tidak bisa diubah langsung</div>
          </div>
        </div>
        <button onClick={handleSaveProfile} disabled={loading} style={{
          padding:'10px 20px', borderRadius:'10px', fontSize:'13px', fontWeight:'600',
          background:'linear-gradient(135deg,#667eea,#764ba2)',
          border:'none', color:'white', cursor:'pointer',
          opacity: loading ? 0.7 : 1
        }}>
          {loading ? '⏳ Menyimpan...' : '💾 Simpan Profil'}
        </button>
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
                position:'relative', transition:'all 0.2s', flexShrink:0
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

      {/* Ubah Password */}
      <div style={{ ...glass, padding:'1.5rem', borderRadius:'16px' }}>
        <h3 style={{ fontSize:'15px', fontWeight:'600', marginBottom:'4px', color:'white' }}>🔐 Ubah Password</h3>
        <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.4)', marginBottom:'1.25rem' }}>
          Masukkan password baru atau kirim link reset ke email kamu.
        </p>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginBottom:'12px' }}>
          <div>
            <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', marginBottom:'6px' }}>Password Baru</div>
            <div style={{ position:'relative' }}>
              <input
                type={showPass ? 'text' : 'password'}
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="Min. 6 karakter"
                style={{
                  width:'100%', padding:'10px 40px 10px 12px',
                  background:'rgba(255,255,255,0.06)',
                  border:'1px solid rgba(255,255,255,0.1)',
                  borderRadius:'8px', color:'white', fontSize:'13px',
                  boxSizing:'border-box'
                }}
              />
              <button onClick={() => setShowPass(!showPass)} style={{
                position:'absolute', right:'10px', top:'50%', transform:'translateY(-50%)',
                background:'none', border:'none', cursor:'pointer',
                fontSize:'16px', color:'rgba(255,255,255,0.4)'
              }}>{showPass ? '🙈' : '👁️'}</button>
            </div>
          </div>
          <div>
            <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', marginBottom:'6px' }}>Konfirmasi Password</div>
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Ulangi password baru"
              style={{
                width:'100%', padding:'10px 12px',
                background:'rgba(255,255,255,0.06)',
                border:'1px solid rgba(255,255,255,0.1)',
                borderRadius:'8px', color:'white', fontSize:'13px',
                boxSizing:'border-box'
              }}
            />
          </div>
        </div>
        <div style={{ display:'flex', gap:'10px' }}>
          <button onClick={handleChangePassword} disabled={passLoading} style={{
            padding:'9px 18px', borderRadius:'8px', fontSize:'13px', fontWeight:'500',
            background:'linear-gradient(135deg,#667eea,#764ba2)',
            border:'none', color:'white', cursor:'pointer',
            opacity: passLoading ? 0.7 : 1
          }}>
            {passLoading ? '⏳...' : '🔐 Ubah Password'}
          </button>
          <button onClick={handleResetPassword} disabled={passLoading} style={{
            padding:'9px 18px', borderRadius:'8px', fontSize:'13px',
            background:'rgba(255,255,255,0.08)',
            border:'1px solid rgba(255,255,255,0.1)',
            color:'white', cursor:'pointer',
            opacity: passLoading ? 0.7 : 1
          }}>
            📧 Kirim Link Reset ke Email
          </button>
        </div>
      </div>

      {/* Danger zone */}
      <div style={{ ...glass, padding:'1.5rem', borderRadius:'16px', border:'1px solid rgba(248,113,113,0.2)' }}>
        <h3 style={{ fontSize:'15px', fontWeight:'600', marginBottom:'4px', color:'#f87171' }}>⚠️ Danger Zone</h3>
        <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.4)', marginBottom:'1rem' }}>Tindakan ini tidak dapat dibatalkan.</p>
        <button onClick={handleDeleteData} disabled={deleteLoading} style={{
          padding:'9px 18px', borderRadius:'8px', fontSize:'13px',
          background:'rgba(248,113,113,0.15)',
          border:'1px solid rgba(248,113,113,0.3)',
          color:'#f87171', cursor:'pointer',
          opacity: deleteLoading ? 0.7 : 1
        }}>
          {deleteLoading ? '⏳ Mereset...' : '🗑️ Reset Semua Data Pengaturan'}
        </button>
      </div>

    </div>
  )
}