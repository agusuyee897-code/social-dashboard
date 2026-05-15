'use client'

const glass = {
  background: 'rgba(255,255,255,0.05)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.1)',
}

const weekData = [
  { day:'Sen', x:12, ig:18, li:8, fb:5 },
  { day:'Sel', x:8, ig:22, li:6, fb:8 },
  { day:'Rab', x:15, ig:14, li:12, fb:3 },
  { day:'Kam', x:20, ig:25, li:9, fb:11 },
  { day:'Jum', x:18, ig:30, li:15, fb:7 },
  { day:'Sab', x:25, ig:35, li:5, fb:14 },
  { day:'Min', x:10, ig:20, li:3, fb:9 },
]

export default function Analytics() {
  const maxVal = 40

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'12px' }}>
        {[
          { label:'Total Reach', value:'48.2K', change:'+23%', color:'#06b6d4' },
          { label:'Impressions', value:'124K', change:'+18%', color:'#667eea' },
          { label:'Engagement Rate', value:'3.8%', change:'+5%', color:'#f43f5e' },
          { label:'Klik Link', value:'2.1K', change:'+12%', color:'#f59e0b' },
        ].map((s, i) => (
          <div key={i} style={{ ...glass, padding:'1.25rem', borderRadius:'16px' }}>
            <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.5)', textTransform:'uppercase', marginBottom:'10px' }}>{s.label}</div>
            <div style={{ fontSize:'26px', fontWeight:'700', color:s.color }}>{s.value}</div>
            <div style={{ fontSize:'12px', color:'#4ade80', marginTop:'4px' }}>↑ {s.change} bulan ini</div>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div style={{ ...glass, padding:'1.5rem', borderRadius:'16px' }}>
        <h3 style={{ fontSize:'15px', fontWeight:'600', marginBottom:'1.5rem', color:'white' }}>📈 Engagement Minggu Ini</h3>
        <div style={{ display:'flex', alignItems:'flex-end', gap:'12px', height:'180px' }}>
          {weekData.map((d, i) => (
            <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:'6px', height:'100%' }}>
              <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'flex-end', gap:'2px', width:'100%' }}>
                {[
                  { val:d.x, color:'#fff' },
                  { val:d.ig, color:'#c0307a' },
                  { val:d.li, color:'#0a66c2' },
                  { val:d.fb, color:'#1877f2' },
                ].map((bar, j) => (
                  <div key={j} style={{
                    width:'100%',
                    height:`${(bar.val/maxVal)*120}px`,
                    background:bar.color,
                    borderRadius:'4px 4px 0 0',
                    opacity:0.8,
                    minHeight:'4px'
                  }}></div>
                ))}
              </div>
              <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)' }}>{d.day}</div>
            </div>
          ))}
        </div>
        <div style={{ display:'flex', gap:'16px', marginTop:'16px', justifyContent:'center' }}>
          {[['X/Twitter','#fff'],['Instagram','#c0307a'],['LinkedIn','#0a66c2'],['Facebook','#1877f2']].map(([name,color]) => (
            <div key={name} style={{ display:'flex', alignItems:'center', gap:'6px' }}>
              <div style={{ width:'10px', height:'10px', borderRadius:'2px', background:color as string }}></div>
              <span style={{ fontSize:'11px', color:'rgba(255,255,255,0.5)' }}>{name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Posts */}
      <div style={{ ...glass, padding:'1.5rem', borderRadius:'16px' }}>
        <h3 style={{ fontSize:'15px', fontWeight:'600', marginBottom:'1rem', color:'white' }}>🏆 Postingan Terbaik</h3>
        <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
          {[
            { platform:'Instagram', color:'#c0307a', short:'IG', text:'Behind the scenes tim kami ✨', reach:'8.2K', eng:'542', rate:'6.6%' },
            { platform:'X/Twitter', color:'#fff', short:'X', text:'Produk baru kami sudah tersedia!', reach:'6.4K', eng:'398', rate:'6.2%' },
            { platform:'LinkedIn', color:'#0a66c2', short:'in', text:'Tips produktivitas untuk remote worker', reach:'4.8K', eng:'287', rate:'5.9%' },
          ].map((p, i) => (
            <div key={i} style={{
              display:'flex', alignItems:'center', gap:'12px',
              padding:'12px', borderRadius:'12px',
              background:'rgba(255,255,255,0.04)',
              border:'1px solid rgba(255,255,255,0.06)'
            }}>
              <div style={{ fontSize:'16px', fontWeight:'700', color:'rgba(255,255,255,0.2)', width:'20px' }}>#{i+1}</div>
              <div style={{
                width:'32px', height:'32px', borderRadius:'8px',
                background:p.color, display:'flex', alignItems:'center',
                justifyContent:'center', fontSize:'12px', fontWeight:'700',
                color: p.color === '#fff' ? '#000' : 'white', flexShrink:0
              }}>{p.short}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:'13px', color:'rgba(255,255,255,0.8)' }}>{p.text}</div>
                <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.3)', marginTop:'2px' }}>{p.platform}</div>
              </div>
              <div style={{ display:'flex', gap:'16px', textAlign:'right' }}>
                <div>
                  <div style={{ fontSize:'13px', fontWeight:'600', color:'#06b6d4' }}>{p.reach}</div>
                  <div style={{ fontSize:'10px', color:'rgba(255,255,255,0.3)' }}>Reach</div>
                </div>
                <div>
                  <div style={{ fontSize:'13px', fontWeight:'600', color:'#f43f5e' }}>{p.eng}</div>
                  <div style={{ fontSize:'10px', color:'rgba(255,255,255,0.3)' }}>Engagement</div>
                </div>
                <div>
                  <div style={{ fontSize:'13px', fontWeight:'600', color:'#4ade80' }}>{p.rate}</div>
                  <div style={{ fontSize:'10px', color:'rgba(255,255,255,0.3)' }}>Rate</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}