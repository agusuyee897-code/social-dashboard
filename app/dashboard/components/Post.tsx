'use client'
import { useState, useRef } from 'react'

const glass = {
  background: 'rgba(255,255,255,0.05)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.1)',
}

const platforms = [
  {
    id: 'x', label: 'X / Twitter', color: '#000000', border: '#ffffff',
    selectedBg: 'linear-gradient(135deg,#1a1a1a,#333)',
    svg: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    )
  },
  {
    id: 'ig', label: 'Instagram', color: '#e1306c', border: '#e1306c',
    selectedBg: 'linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)',
    svg: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    )
  },
  {
    id: 'fb', label: 'Facebook', color: '#1877f2', border: '#1877f2',
    selectedBg: 'linear-gradient(135deg,#1877f2,#0d5cbf)',
    svg: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    )
  },
  {
    id: 'li', label: 'LinkedIn', color: '#0a66c2', border: '#0a66c2',
    selectedBg: 'linear-gradient(135deg,#0a66c2,#064e94)',
    svg: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    )
  },
  {
    id: 'yt', label: 'YouTube', color: '#ff0000', border: '#ff0000',
    selectedBg: 'linear-gradient(135deg,#ff0000,#cc0000)',
    svg: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    )
  },
  {
    id: 'tk', label: 'TikTok', color: '#010101', border: '#69C9D0',
    selectedBg: 'linear-gradient(135deg,#010101,#2d2d2d)',
    svg: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/>
      </svg>
    )
  },
]

type MediaItem = { url: string; type: string; name: string }

export default function Post() {
  const [postText, setPostText] = useState('')
  const [selected, setSelected] = useState(['x', 'ig', 'li'])
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [media, setMedia] = useState<MediaItem[]>([])
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    files.forEach(file => {
      const url = URL.createObjectURL(file)
      setMedia(prev => [...prev, { url, type: file.type, name: file.name }])
    })
    // reset input so same file can be re-added
    e.target.value = ''
  }

  const removeMedia = (i: number) => {
    setMedia(prev => {
      URL.revokeObjectURL(prev[i].url)
      return prev.filter((_, idx) => idx !== i)
    })
  }

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
        media: media,
        time: 'Baru saja',
        status: 'sent'
      }))
      setPosts(prev => [...newPosts, ...prev])
      setPostText('')
      setMedia([])
      setLoading(false)
      setSuccess('Postingan berhasil dikirim ke ' + selected.length + ' platform!')
      setTimeout(() => setSuccess(''), 3000)
    }, 1500)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {success && (
        <div style={{
          padding: '12px 16px', borderRadius: '12px',
          background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.3)',
          color: '#4ade80', fontSize: '14px'
        }}>✓ {success}</div>
      )}

      {/* Compose */}
      <div style={{ ...glass, padding: '1.5rem', borderRadius: '16px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '1.25rem', color: 'white' }}>
          ✏️ Buat Postingan Baru
        </h3>

        {/* Platform selector */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '10px' }}>
            Pilih Platform Target
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {platforms.map(p => {
              const isSelected = selected.includes(p.id)
              return (
                <div
                  key={p.id}
                  onClick={() => togglePlatform(p.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '7px',
                    padding: '8px 14px', borderRadius: '10px', cursor: 'pointer',
                    fontSize: '13px', fontWeight: '500',
                    transition: 'all 0.2s ease',
                    background: isSelected ? p.selectedBg : 'rgba(255,255,255,0.06)',
                    border: `2px solid ${isSelected ? p.border : 'rgba(255,255,255,0.1)'}`,
                    color: isSelected ? 'white' : 'rgba(255,255,255,0.4)',
                    transform: isSelected ? 'scale(1.04)' : 'scale(1)',
                    boxShadow: isSelected ? `0 0 12px ${p.color}55` : 'none',
                  }}
                >
                  <span style={{ color: isSelected ? 'white' : 'rgba(255,255,255,0.4)', display: 'flex' }}>
                    {p.svg}
                  </span>
                  <span>{p.label}</span>
                  {isSelected && (
                    <span style={{
                      fontSize: '10px', background: 'rgba(255,255,255,0.25)',
                      borderRadius: '99px', padding: '1px 6px', lineHeight: '1.6'
                    }}>✓</span>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Text area */}
        <div style={{ marginBottom: '12px' }}>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>
            Konten Postingan
          </div>
          <textarea
            value={postText}
            onChange={e => setPostText(e.target.value)}
            placeholder="Tulis konten postingan kamu di sini... Akan diposting ke semua platform yang dipilih."
            style={{
              width: '100%', height: '140px', padding: '14px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px', color: 'white', fontSize: '14px',
              resize: 'none', lineHeight: '1.6', fontFamily: 'inherit',
              boxSizing: 'border-box'
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
            <span style={{ fontSize: '12px', color: postText.length > 280 ? '#f87171' : 'rgba(255,255,255,0.3)' }}>
              {postText.length} karakter
            </span>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>
              Batas X/Twitter: 280
            </span>
          </div>
        </div>

        {/* Media Upload Area */}
        <div style={{ marginBottom: '14px' }}>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>
            Foto / Video
          </div>

          {/* Hidden file input */}
          <input
            ref={fileRef}
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />

          {/* Upload button */}
          <div
            onClick={() => fileRef.current?.click()}
            style={{
              border: '2px dashed rgba(255,255,255,0.15)',
              borderRadius: '12px', padding: '18px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
              cursor: 'pointer', transition: 'all 0.2s',
              background: 'rgba(255,255,255,0.03)',
              color: 'rgba(255,255,255,0.4)', fontSize: '13px',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(102,126,234,0.6)'
              ;(e.currentTarget as HTMLDivElement).style.background = 'rgba(102,126,234,0.08)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.15)'
              ;(e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.03)'
            }}
          >
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5">
              <path d="M12 16V8m0 0-3 3m3-3 3 3"/>
              <rect x="3" y="3" width="18" height="18" rx="4"/>
              <path d="M3 15l4-4 3 3 4-5 4 6"/>
            </svg>
            <span>Klik untuk upload foto atau video</span>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)' }}>
              JPG, PNG, GIF, MP4, MOV — Bisa pilih banyak file
            </span>
          </div>

          {/* Media Preview */}
          {media.length > 0 && (
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '12px'
            }}>
              {media.map((m, i) => (
                <div key={i} style={{
                  position: 'relative', borderRadius: '10px', overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.15)',
                  width: '90px', height: '90px', flexShrink: 0,
                  background: 'rgba(255,255,255,0.05)'
                }}>
                  {m.type.startsWith('video/') ? (
                    <video
                      src={m.url}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      muted
                    />
                  ) : (
                    <img
                      src={m.url}
                      alt={m.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  )}
                  {/* overlay label video */}
                  {m.type.startsWith('video/') && (
                    <div style={{
                      position: 'absolute', bottom: '4px', left: '4px',
                      background: 'rgba(0,0,0,0.7)', borderRadius: '4px',
                      padding: '1px 5px', fontSize: '9px', color: 'white'
                    }}>VIDEO</div>
                  )}
                  {/* Remove button */}
                  <button
                    onClick={() => removeMedia(i)}
                    style={{
                      position: 'absolute', top: '4px', right: '4px',
                      width: '20px', height: '20px', borderRadius: '50%',
                      background: 'rgba(0,0,0,0.75)', border: 'none',
                      color: 'white', cursor: 'pointer', fontSize: '11px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      lineHeight: 1
                    }}
                  >✕</button>
                </div>
              ))}
              {/* Add more */}
              <div
                onClick={() => fileRef.current?.click()}
                style={{
                  width: '90px', height: '90px', borderRadius: '10px',
                  border: '2px dashed rgba(255,255,255,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: 'rgba(255,255,255,0.3)', fontSize: '24px',
                  background: 'rgba(255,255,255,0.03)', flexShrink: 0
                }}
              >+</div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button style={{
            padding: '10px 18px', borderRadius: '10px', fontSize: '13px',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'white', cursor: 'pointer'
          }}>📅 Jadwalkan</button>

          <button
            onClick={handlePost}
            disabled={loading || (!postText.trim() && media.length === 0) || selected.length === 0}
            style={{
              padding: '10px 20px', borderRadius: '10px', fontSize: '13px', fontWeight: '600',
              background: 'linear-gradient(135deg,#667eea,#764ba2)',
              border: 'none', color: 'white', cursor: 'pointer',
              opacity: (loading || (!postText.trim() && media.length === 0) || selected.length === 0) ? 0.5 : 1,
              transition: 'opacity 0.2s'
            }}
          >
            {loading ? '⏳ Memposting...' : '🚀 Posting Sekarang'}
          </button>
        </div>
      </div>

      {/* Riwayat */}
      {posts.length > 0 && (
        <div style={{ ...glass, padding: '1.5rem', borderRadius: '16px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '1rem', color: 'white' }}>
            📋 Baru Diposting
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {posts.map(p => {
              const plat = platforms.find(pl => pl.id === p.platform)
              return (
                <div key={p.id} style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '10px 12px', borderRadius: '12px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)'
                }}>
                  {/* Platform icon badge */}
                  <div style={{
                    width: '34px', height: '34px', borderRadius: '9px',
                    background: plat?.selectedBg || '#333',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: `0 0 8px ${plat?.color || '#333'}55`
                  }}>
                    <span style={{ color: 'white', display: 'flex' }}>{plat?.svg}</span>
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: '13px', color: 'rgba(255,255,255,0.8)',
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                    }}>
                      {p.text ? p.text.substring(0, 60) + (p.text.length > 60 ? '...' : '') : '(Media saja)'}
                    </div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '2px', display: 'flex', gap: '8px' }}>
                      <span>{plat?.label}</span>
                      {p.media?.length > 0 && <span>📎 {p.media.length} file</span>}
                      <span>{p.time}</span>
                    </div>
                  </div>

                  <span style={{
                    fontSize: '11px', padding: '3px 10px', borderRadius: '99px',
                    background: 'rgba(74,222,128,0.15)', color: '#4ade80',
                    fontWeight: '500', flexShrink: 0
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