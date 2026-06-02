import { useEffect, useRef } from 'react'

export default function CarCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const cvs = canvasRef.current
    const ctx = cvs.getContext('2d')
    let raf, W = 0, H = 0, mx = 0, my = 0
    let ry = 0.4, rx = -0.12, ft = 0

    const resize = () => {
      W = cvs.offsetWidth; H = cvs.offsetHeight
      const d = window.devicePixelRatio || 1
      cvs.width = W * d; cvs.height = H * d
    }
    resize()
    window.addEventListener('resize', resize)
    const onMouse = e => {
      const r = cvs.getBoundingClientRect()
      mx = ((e.clientX - r.left) / r.width - 0.5) * 2
      my = ((e.clientY - r.top) / r.height - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouse)

    // 3D math
    const DIST = 5.5
    const rYm = ([x,y,z],a) => { const c=Math.cos(a),s=Math.sin(a); return [x*c+z*s,y,-x*s+z*c] }
    const rXm = ([x,y,z],a) => { const c=Math.cos(a),s=Math.sin(a); return [x,y*c-z*s,y*s+z*c] }
    const proj = (v,cx,cy,sc) => { const z=v[2]+DIST; const f=sc/Math.max(z,0.01); return [cx+v[0]*f,cy-v[1]*f,z] }
    const v3s = (a,b) => [a[0]-b[0],a[1]-b[1],a[2]-b[2]]
    const v3c = (a,b) => [a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]]
    const v3d = (a,b) => a[0]*b[0]+a[1]*b[1]+a[2]*b[2]
    const v3n = a => { const l=Math.sqrt(v3d(a,a))||1; return [a[0]/l,a[1]/l,a[2]/l] }

    const LIGHT = v3n([0.5, 0.7, -0.5])

    // SUV Geometry — Fortuner-style boxy SUV
    // X=forward Y=up Z=right
    const V = [
      [1.55,-.08,-.62],[1.55,-.08,.62],[1.55,.40,.62],[1.55,.40,-.62],       // 0-3 front
      [-1.55,-.08,-.62],[-1.55,-.08,.62],[-1.55,.40,.62],[-1.55,.40,-.62],   // 4-7 rear
      [1.50,.41,-.60],[1.50,.41,.60],[.55,.41,-.60],[.55,.41,.60],            // 8-11 hood
      [.32,.92,-.54],[.32,.92,.54],                                           // 12-13 ws top
      [.28,.95,-.53],[.28,.95,.53],[-1.22,.95,-.53],[-1.22,.95,.53],          // 14-17 roof
      [-1.38,.85,-.54],[-1.38,.85,.54],                                       // 18-19 rw top
      [.50,.40,-.63],[.50,.40,.63],[-1.28,.40,-.63],[-1.28,.40,.63],          // 20-23 A/C base
      [-.30,.40,-.63],[-.30,.40,.63],[-.30,.90,-.55],[-.30,.90,.55],           // 24-27 B pillar
      [1.56,.04,-.40],[1.56,.04,.40],[1.56,.32,.40],[1.56,.32,-.40],          // 28-31 grille
      [1.56,.18,-.60],[1.56,.18,-.44],[1.56,.34,-.44],[1.56,.34,-.60],        // 32-35 HL L
      [1.56,.18,.44],[1.56,.18,.60],[1.56,.34,.60],[1.56,.34,.44],            // 36-39 HL R
      [-1.56,.18,.60],[-1.56,.18,.44],[-1.56,.34,.44],[-1.56,.34,.60],        // 40-43 TL R
      [-1.56,.18,-.44],[-1.56,.18,-.60],[-1.56,.34,-.60],[-1.56,.34,-.44],   // 44-47 TL L
      [1.565,.05,-.14],[1.565,.05,.14],[1.565,.15,.14],[1.565,.15,-.14],      // 48-51 plate F
      [-1.565,.05,.14],[-1.565,.05,-.14],[-1.565,.15,-.14],[-1.565,.15,.14],  // 52-55 plate R
      [1.50,-.10,-.58],[1.50,-.10,.58],[-1.50,-.10,.58],[-1.50,-.10,-.58],   // 56-59 bottom
      [1.56,-.08,-.58],[1.56,-.08,.58],[1.56,.02,.58],[1.56,.02,-.58],        // 60-63 bumper F
      [-1.56,-.08,.58],[-1.56,-.08,-.58],[-1.56,.02,-.58],[-1.56,.02,.58],   // 64-67 bumper R
    ]

    const F = [
      {v:[0,3,2,1],c:[240,240,240]},{v:[5,6,7,4],c:[240,240,240]},            // front/rear
      {v:[4,7,3,0],c:[245,245,245]},{v:[1,2,6,5],c:[245,245,245]},            // sides
      {v:[57,58,59,56],c:[25,25,25]},                                          // bottom
      {v:[8,10,11,9],c:[250,250,250]},{v:[14,16,17,15],c:[248,248,248]},       // hood/roof
      {v:[10,12,13,11],c:[15,25,45],a:.90},                                    // windshield
      {v:[6,19,18,7],c:[15,25,45],a:.87},                                      // rear window
      {v:[24,26,12,20],c:[15,25,45],a:.87},{v:[22,18,26,24],c:[15,25,45],a:.87}, // L windows
      {v:[25,21,13,27],c:[15,25,45],a:.87},{v:[23,25,27,19],c:[15,25,45],a:.87}, // R windows
      {v:[18,19,17,16],c:[238,238,238]},                                       // roof-rw panel
      {v:[22,7,18],c:[242,242,242]},{v:[23,19,6],c:[242,242,242]},             // quarter panels
      {v:[28,31,30,29],c:[20,20,20]},                                         // grille
      {v:[60,63,62,61],c:[45,45,45]},{v:[64,67,66,65],c:[45,45,45]},           // bumpers
      {v:[32,35,34,33],c:[255,250,215]},{v:[36,39,38,37],c:[255,250,215]},     // headlights
      {v:[40,43,42,41],c:[220,30,30]},{v:[44,47,46,45],c:[220,30,30]},         // taillights
      {v:[48,51,50,49],c:[251,191,36],t:1},{v:[52,55,54,53],c:[251,191,36],t:1}, // plates
    ]

    const WH = [[1,-.10,-.68,.28],[1,-.10,.68,.28],[-1,-.10,-.68,.28],[-1,-.10,.68,.28]]

    const draw = () => {
      if (!W||!H) { raf=requestAnimationFrame(draw); return }
      const dpr = window.devicePixelRatio||1
      ctx.setTransform(dpr,0,0,dpr,0,0)
      ctx.clearRect(0,0,W,H)

      ft += .008
      const fy = Math.sin(ft)*.015
      ry += (.4+mx*.5-ry)*.035
      rx += (-.12+my*.12-rx)*.035
      const cx=W*.5, cy=H*.52, sc=Math.min(W*1.4,H*2.5)

      const xf = v => { let p=[v[0],v[1]+fy,v[2]]; p=rYm(p,ry); return rXm(p,rx) }
      const rN = n => rXm(rYm(n,ry),rx)
      const tv = V.map(v=>xf(v))
      const pv = tv.map(v=>proj(v,cx,cy,sc))

      // Ground
      const gy=cy+sc*.06
      const gg=ctx.createRadialGradient(cx,gy,0,cx,gy,sc*.45)
      gg.addColorStop(0,'rgba(200,65,11,.05)')
      gg.addColorStop(.6,'rgba(200,65,11,.015)')
      gg.addColorStop(1,'transparent')
      ctx.fillStyle=gg; ctx.fillRect(0,0,W,H)
      ctx.beginPath(); ctx.moveTo(cx-sc*.5,gy); ctx.lineTo(cx+sc*.5,gy)
      ctx.strokeStyle='rgba(200,65,11,.06)'; ctx.lineWidth=1; ctx.stroke()

      // Build items
      const items = []

      F.forEach(face => {
        const v3=face.v.map(i=>tv[i]), v2=face.v.map(i=>pv[i])
        const n=v3n(v3c(v3s(v3[1],v3[0]),v3s(v3[2],v3[0])))
        if (n[2]>=0) return
        const depth=v3.reduce((s,v)=>s+v[2],0)/v3.length
        const diff=Math.max(0,v3d(n,LIGHT))
        const sh=Math.min(1,.60+diff*.40)
        items.push({k:'f',d:depth,v2,c:face.c,a:face.a||1,sh,t:face.t,n})
      })

      WH.forEach(([wx,wy,wz,wr])=>{
        const wn=rN([0,0,wz>0?1:-1])
        if (wn[2]>=0) return
        const c3=xf([wx,wy,wz])
        const N=24, tire=[], rim=[], hub=[], spk=[]
        for (let i=0;i<N;i++){
          const a=(i/N)*Math.PI*2, ca=Math.cos(a), sa=Math.sin(a)
          tire.push(proj(xf([wx+ca*wr,wy+sa*wr,wz]),cx,cy,sc))
          rim.push(proj(xf([wx+ca*wr*.72,wy+sa*wr*.72,wz]),cx,cy,sc))
          hub.push(proj(xf([wx+ca*wr*.18,wy+sa*wr*.18,wz]),cx,cy,sc))
        }
        for (let i=0;i<5;i++){
          const a=(i/5)*Math.PI*2+ft*.3, ca=Math.cos(a), sa=Math.sin(a)
          spk.push([
            proj(xf([wx+ca*wr*.22,wy+sa*wr*.22,wz]),cx,cy,sc),
            proj(xf([wx+ca*wr*.68,wy+sa*wr*.68,wz]),cx,cy,sc)
          ])
        }
        items.push({k:'w',d:c3[2],tire,rim,hub,spk})
      })

      items.sort((a,b)=>b.d-a.d)

      // Render
      items.forEach(it=>{
        if (it.k==='f'){
          ctx.save(); ctx.beginPath()
          it.v2.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]))
          ctx.closePath()
          if (it.a<1){
            ctx.fillStyle=`rgba(${it.c[0]},${it.c[1]},${it.c[2]},${it.a})`
          } else {
            const r=Math.round(it.c[0]*it.sh),g=Math.round(it.c[1]*it.sh),b=Math.round(it.c[2]*it.sh)
            ctx.fillStyle=`rgb(${r},${g},${b})`
          }
          ctx.fill()
          ctx.strokeStyle=it.a<1?'rgba(100,120,140,.3)':'rgba(0,0,0,.06)'
          ctx.lineWidth=it.a<1?1:.5; ctx.stroke()
          if (it.t){
            const pcx=it.v2.reduce((s,p)=>s+p[0],0)/it.v2.length
            const pcy=it.v2.reduce((s,p)=>s+p[1],0)/it.v2.length
            const dx=it.v2[1][0]-it.v2[0][0], dy=it.v2[1][1]-it.v2[0][1]
            const pw=Math.sqrt(dx*dx+dy*dy), fs=Math.max(4,pw*.25)
            ctx.translate(pcx,pcy); ctx.rotate(Math.atan2(dy,dx))
            ctx.font=`bold ${fs}px sans-serif`
            ctx.fillStyle='#1a1a1a'; ctx.textAlign='center'; ctx.textBaseline='middle'
            ctx.fillText('SRAC',0,0)
          }
          ctx.restore()
        } else {
          ctx.beginPath()
          it.tire.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]))
          ctx.closePath(); ctx.fillStyle='#1a1a1a'; ctx.fill()
          ctx.strokeStyle='#2a2a2a'; ctx.lineWidth=1; ctx.stroke()
          ctx.beginPath()
          it.rim.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]))
          ctx.closePath(); ctx.fillStyle='#777'; ctx.fill()
          ctx.strokeStyle='#999'; ctx.lineWidth=.5; ctx.stroke()
          it.spk.forEach(([a,b])=>{
            ctx.beginPath(); ctx.moveTo(a[0],a[1]); ctx.lineTo(b[0],b[1])
            ctx.strokeStyle='#aaa'; ctx.lineWidth=2; ctx.stroke()
          })
          ctx.beginPath()
          it.hub.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]))
          ctx.closePath(); ctx.fillStyle='#bbb'; ctx.fill()
        }
      })

      // Side details
      const dl = (a,b,col,w) => {
        const pa=proj(xf(a),cx,cy,sc), pb=proj(xf(b),cx,cy,sc)
        ctx.beginPath(); ctx.moveTo(pa[0],pa[1]); ctx.lineTo(pb[0],pb[1])
        ctx.strokeStyle=col; ctx.lineWidth=w; ctx.stroke()
      }
      const sideText = (z,flip) => {
        const a=flip?[-.8,.20,z]:[.5,.20,z], b=flip?[.5,.20,z]:[-.8,.20,z]
        const pa=proj(xf(a),cx,cy,sc), pb=proj(xf(b),cx,cy,sc)
        const dx=pb[0]-pa[0], dy=pb[1]-pa[1], l=Math.sqrt(dx*dx+dy*dy)
        const fs=Math.max(6,l*.10)
        ctx.save()
        ctx.translate((pa[0]+pb[0])/2,(pa[1]+pb[1])/2)
        ctx.rotate(Math.atan2(dy,dx))
        ctx.font=`600 ${fs}px sans-serif`
        ctx.fillStyle='rgba(200,65,11,.5)'
        ctx.textAlign='center'; ctx.textBaseline='middle'
        ctx.fillText('SMART RENT A CAR',0,0)
        ctx.restore()
      }

      const ln=rN([0,0,-1])
      if (ln[2]<-.1){
        dl([.50,.40,-.635],[.32,.92,-.55],'rgba(50,50,50,.4)',2)
        dl([-.30,.40,-.635],[-.30,.90,-.55],'rgba(50,50,50,.5)',2.5)
        dl([-1.28,.40,-.635],[-1.38,.85,-.55],'rgba(50,50,50,.4)',2)
        dl([.30,.94,-.535],[-1.22,.94,-.535],'rgba(150,150,150,.25)',1.5)
        dl([.50,.40,-.635],[-1.28,.40,-.635],'rgba(50,50,50,.15)',.8)
        sideText(-.625,false)
      }
      const rn2=rN([0,0,1])
      if (rn2[2]<-.1){
        dl([.50,.40,.635],[.32,.92,.55],'rgba(50,50,50,.4)',2)
        dl([-.30,.40,.635],[-.30,.90,.55],'rgba(50,50,50,.5)',2.5)
        dl([-1.28,.40,.635],[-1.38,.85,.55],'rgba(50,50,50,.4)',2)
        dl([.30,.94,.535],[-1.22,.94,.535],'rgba(150,150,150,.25)',1.5)
        dl([.50,.40,.635],[-1.28,.40,.635],'rgba(50,50,50,.15)',.8)
        sideText(.625,true)
      }

      // Light glows
      const fn=rN([1,0,0])
      if (fn[2]<-.05){
        ;[[1.56,.26,-.52],[1.56,.26,.52]].forEach(pos=>{
          const p=proj(xf(pos),cx,cy,sc), gr=sc*.025
          const g=ctx.createRadialGradient(p[0],p[1],0,p[0],p[1],gr)
          g.addColorStop(0,'rgba(255,250,200,.35)'); g.addColorStop(1,'transparent')
          ctx.fillStyle=g; ctx.fillRect(p[0]-gr,p[1]-gr,gr*2,gr*2)
        })
      }
      const bn=rN([-1,0,0])
      if (bn[2]<-.05){
        ;[[-1.56,.26,-.52],[-1.56,.26,.52]].forEach(pos=>{
          const p=proj(xf(pos),cx,cy,sc), gr=sc*.02
          const g=ctx.createRadialGradient(p[0],p[1],0,p[0],p[1],gr)
          g.addColorStop(0,'rgba(220,30,30,.3)'); g.addColorStop(1,'transparent')
          ctx.fillStyle=g; ctx.fillRect(p[0]-gr,p[1]-gr,gr*2,gr*2)
        })
      }

      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  return <canvas ref={canvasRef} style={{ width:'100%', height:'100%', display:'block' }} />
}