import { useEffect, useRef } from 'react'

export default function CarCanvas() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        let animId
        let mouse = { x: 0, y: 0 }
        let rotY = 0.3
        let rotX = 0.08
        let floatT = 0

        const resize = () => {
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight
        }
        resize()
        window.addEventListener('resize', resize)

        const onMouse = e => {
            const rect = canvas.getBoundingClientRect()
            mouse.x = ((e.clientX - rect.left) / canvas.width - 0.5) * 2
            mouse.y = ((e.clientY - rect.top) / canvas.height - 0.5) * 2
        }
        window.addEventListener('mousemove', onMouse)

        // ── Car geometry (vertices + edges) ──────────────────────────
        // Scaled to roughly -1..1 on each axis
        const V = [
            // Body bottom
            [-1.6, -0.3, -0.5], [1.6, -0.3, -0.5],  // 0 1  front-bottom-left/right
            [1.6, -0.3, 0.5], [-1.6, -0.3, 0.5],  // 2 3  rear-bottom-left/right
            // Body top (hood + trunk)
            [-1.6, 0.1, -0.5], [0.6, 0.1, -0.5],  // 4 5  front-top
            [0.6, 0.1, 0.5], [-1.6, 0.1, 0.5],  // 6 7
            [1.6, 0.1, -0.5], [1.6, 0.1, 0.5],  // 8 9  rear-top
            // Cabin bottom
            [-0.7, 0.1, -0.42], [0.55, 0.1, -0.42], // 10 11
            [0.55, 0.1, 0.42], [-0.7, 0.1, 0.42], // 12 13
            // Cabin top
            [-0.55, 0.65, -0.38], [0.4, 0.65, -0.38], // 14 15
            [0.4, 0.65, 0.38], [-0.55, 0.65, 0.38], // 16 17
            // Wheels (centres)
            [-1.0, -0.3, -0.5], [1.0, -0.3, -0.5],   // 18 19  front axle L/R
            [-1.0, -0.3, 0.5], [1.0, -0.3, 0.5],   // 20 21  rear  axle L/R
        ]

        const EDGES = [
            // Body bottom rectangle
            [0, 1], [1, 2], [2, 3], [3, 0],
            // Body top
            [4, 5], [5, 8], [8, 9], [9, 6], [6, 7], [7, 4],
            // Body sides (front/rear pillars)
            [0, 4], [1, 8], [2, 9], [3, 7],
            // Hood slope
            [5, 11], [6, 12],
            // Cabin bottom
            [10, 11], [11, 12], [12, 13], [13, 10],
            // Cabin top
            [14, 15], [15, 16], [16, 17], [17, 14],
            // Cabin pillars
            [10, 14], [11, 15], [12, 16], [13, 17],
            // Windscreen / rear glass
            [14, 15], [16, 17],
        ]

        // Wheel drawing helper — 8-sided polygon at a centre vertex
        const wheelEdges = (ci, r) => {
            const segs = []
            for (let i = 0; i < 8; i++) {
                const a0 = (i / 8) * Math.PI * 2
                const a1 = ((i + 1) / 8) * Math.PI * 2
                segs.push([ci, a0, a1, r])
            }
            return segs
        }

        // ── Project 3-D → 2-D ────────────────────────────────────────
        const project = (vx, vy, vz, cx, cy, fov) => {
            const z = vz + 4
            const s = fov / z
            return [cx + vx * s, cy - vy * s]
        }

        const rotateY = (v, a) => [
            v[0] * Math.cos(a) + v[2] * Math.sin(a),
            v[1],
            -v[0] * Math.sin(a) + v[2] * Math.cos(a),
        ]
        const rotateX = (v, a) => [
            v[0],
            v[1] * Math.cos(a) - v[2] * Math.sin(a),
            v[1] * Math.sin(a) + v[2] * Math.cos(a),
        ]

        const PRIMARY = '#C8410B'
        const DIM = 'rgba(200,65,11,0.25)'
        const GLOW = 'rgba(200,65,11,0.08)'

        const drawWheel = (ctx, cx, cy, rx, ry) => {
            ctx.save()
            ctx.beginPath()
            ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2)
            ctx.strokeStyle = PRIMARY
            ctx.lineWidth = 1.5
            ctx.stroke()
            // spokes
            for (let i = 0; i < 4; i++) {
                const a = (i / 4) * Math.PI
                ctx.beginPath()
                ctx.moveTo(cx + Math.cos(a) * rx, cy + Math.sin(a) * ry)
                ctx.lineTo(cx - Math.cos(a) * rx, cy - Math.sin(a) * ry)
                ctx.stroke()
            }
            ctx.restore()
        }

        const draw = () => {
            const W = canvas.width
            const H = canvas.height
            ctx.clearRect(0, 0, W, H)

            floatT += 0.012
            const floatY = Math.sin(floatT) * 0.04

            // Smooth mouse tracking
            rotY += (mouse.x * 0.6 - rotY) * 0.04
            rotX += (mouse.y * -0.12 - rotX) * 0.04

            const cx = W * 0.5
            const cy = H * 0.5 + H * 0.04
            const fov = Math.min(W, H) * 1.1
            const scale = Math.min(W, H) * 0.28

            // Transform all vertices
            const tv = V.map(v => {
                let p = [v[0], v[1] + floatY, v[2]]
                p = rotateY(p, rotY)
                p = rotateX(p, rotX)
                return p
            })

            // Glow blob behind car
            const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, fov * 0.45)
            grad.addColorStop(0, GLOW)
            grad.addColorStop(1, 'transparent')
            ctx.fillStyle = grad
            ctx.fillRect(0, 0, W, H)

            // Shadow on ground
            ctx.save()
            ctx.beginPath()
            ctx.ellipse(cx, cy + scale * 0.42, scale * 1.4, scale * 0.08, 0, 0, Math.PI * 2)
            ctx.fillStyle = 'rgba(200,65,11,0.10)'
            ctx.fill()
            ctx.restore()

            const pt = (i) => {
                const p = project(tv[i][0] * scale / 1.6, tv[i][1] * scale / 1.6, tv[i][2] * scale / 1.6, cx, cy, fov * 0.6)
                return p
            }

            // Draw edges
            ctx.lineJoin = 'round'
            ctx.lineCap = 'round'

            EDGES.forEach(([a, b]) => {
                const pa = pt(a), pb = pt(b)
                // Depth-based opacity
                const avgZ = (tv[a][2] + tv[b][2]) / 2
                const alpha = Math.max(0.15, Math.min(1, 0.5 + avgZ * 0.4))
                ctx.beginPath()
                ctx.moveTo(pa[0], pa[1])
                ctx.lineTo(pb[0], pb[1])
                ctx.strokeStyle = `rgba(200,65,11,${alpha})`
                ctx.lineWidth = avgZ > 0 ? 1.8 : 0.8
                ctx.stroke()
            })

            // Wheels — project centre points and draw ellipses
            const wheelCentres = [18, 19, 20, 21]
            wheelCentres.forEach(wi => {
                const wc = pt(wi)
                const wz = tv[wi][2]
                const alpha = Math.max(0.2, Math.min(1, 0.5 + wz * 0.35))
                const rx = scale * 0.175
                const ry = rx * Math.abs(Math.cos(rotX)) * 0.45
                ctx.globalAlpha = alpha
                drawWheel(ctx, wc[0], wc[1], rx, ry)
                ctx.globalAlpha = 1
            })

                // Vertex dots at key points
                ;[0, 1, 2, 3, 4, 8, 9, 7, 14, 15, 16, 17].forEach(i => {
                    const p = pt(i)
                    const z = tv[i][2]
                    const alpha = Math.max(0.1, Math.min(0.9, 0.4 + z * 0.35))
                    ctx.beginPath()
                    ctx.arc(p[0], p[1], 2.5, 0, Math.PI * 2)
                    ctx.fillStyle = `rgba(200,65,11,${alpha})`
                    ctx.fill()
                })

            animId = requestAnimationFrame(draw)
        }

        draw()

        return () => {
            cancelAnimationFrame(animId)
            window.removeEventListener('resize', resize)
            window.removeEventListener('mousemove', onMouse)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{
                width: '100%',
                height: '100%',
                display: 'block',
            }}
        />
    )
}