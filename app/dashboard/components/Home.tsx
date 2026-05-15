'use client'

const glass = {
  background: 'rgba(255,255,255,0.05)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.1)',
}

const platforms = [
  { id:'x', label:'X / Twitter', color:'#fff', short:'X' },
  { id:'ig', label:'Instagram', color:'#c0307a', short:'IG' },
  { id:'li', label:'LinkedIn', color:'#0a66c2', short:'in' },
  { id:'fb', label:'Facebook', color:'#1877f2', short:'f' },
]

const posts = [
  { id:1, platform:'x', text:'Produk baru kami sudah tersedia!', time:'5 menit lalu', status:'sent' },
  { id:2, platform:'ig', text:'Behind the scenes tim kami ✨', time:'2 jam lalu', status:'sent' },
  { id:3, platform:'li', text:'Kami membuka lowongan posisi...', time:'Besok 09.00', status:'scheduled' },
  { id:4, platform:'fb', text:'Flash sale hari ini diskon 50%!', time:'Kemarin', status:'failed' },
]

export default function Home() {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'12px' }}>
        {[
          { label:'Total Posting', value:'124', sub:'+12 minggu ini', icon:'📝', color:'#667eea' },
          { label:'Total Reach', value:'48.2K', sub:'+23% bulan ini', icon:'👁️', color:'#06b6d4' },
          { label:'Engagement', value:'3.8K', sub:'+8% minggu ini', icon:'❤️', color:'#f43f5e' },
          { label:'Terjadwal', value:'9', sub:'postingan pending', icon:'⏰', color:'#f59e0b' },
        ].map((s, i) => (
          <div key={i} style={{ ...glass, padding:'1.25rem', borderRadius:'16px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'12px' }}>
              <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.5)', textTransform:'uppercase' }}>{s.label}</div>
              <span style={{ fontSize:'20px' }}>{s.icon}</span>
            </div>
            <div style={{ fontSize:'26px', fontWeight:'700', color:s.color }}>{s.value}</div>
            <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)', marginTop:'4px' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Recent Posts */}
      <div style={{ ...glass, padding:'1.5rem', borderRadius:'16px' }}>
        <h3 style={{ fontSize:'15px', fontWeight:'600', marginBottom:'1rem', color:'white' }}>📋 Riwayat Posting</h3>
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
                  <div style={{ fontSize:'13px', color:'rgba(255,255,255,0.8)' }}>{p.text}</div>
                  <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.3)', marginTop:'2px' }}>{p.time}</div>
                </div>
                <span style={{
                  fontSize:'11px', padding:'3px 10px', borderRadius:'99px', fontWeight:'500',
                  background: p.status==='sent' ? 'rgba(74,222,128,0.15)' : p.status==='scheduled' ? 'rgba(251,191,36,0.15)' : 'rgba(248,113,113,0.15)',
                  color: p.status==='sent' ? '#4ade80' : p.status==='scheduled' ? '#fbbf24' : '#f87171',
                }}>
                  {p.status==='sent' ? '✓ Terkirim' : p.status==='scheduled' ? '⏰ Terjadwal' : '✗ Gagal'}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Platform Stats */}
      <div style={{ ...glass, padding:'1.5rem', borderRadius:'16px' }}>
        <h3 style={{ fontSize:'15px', fontWeight:'600', marginBottom:'1rem', color:'white' }}>📊 Performa Per Platform</h3>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'12px' }}>
          {[
            { name:'X / Twitter', color:'#fff', posts:42, reach:'18.2K', eng:'1.2K' },
            { name:'Instagram', color:'#c0307a', posts:38, reach:'15.4K', eng:'2.1K' },
            { name:'LinkedIn', color:'#0a66c2', posts:28, reach:'9.8K', eng:'432' },
            { name:'Facebook', color:'#1877f2', posts:16, reach:'4.8K', eng:'198' },
          ].map((p, i) => (
            <div key={i} style={{
              padding:'1rem', borderRadius:'12px',
              background:'rgba(255,255,255,0.04)',
              border:`1px solid ${p.color}30`
            }}>
              <div style={{ fontSize:'13px', fontWeight:'600', color:p.color, marginBottom:'10px' }}>{p.name}</div>
              {[['Posting', p.posts], ['Reach', p.reach], ['Engagement', p.eng]].map(([k, v]) => (
                <div key={k as string} style={{ display:'flex', justifyContent:'space-between', fontSize:'12px', marginBottom:'4px' }}>
                  <span style={{ color:'rgba(255,255,255,0.4)' }}>{k}</span>
                  <span style={{ color:'white', fontWeight:'500' }}>{v}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}