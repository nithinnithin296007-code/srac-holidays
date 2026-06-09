import { useRef, useEffect, useMemo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ScrollFloat.css'

gsap.registerPlugin(ScrollTrigger)

const ScrollFloat = ({
    children,
    scrollContainerRef,
    containerClassName = '',
    textClassName = '',
    animationDuration = 1,
    ease = 'back.inOut(2)',
    scrollStart = 'center bottom+=50%',
    scrollEnd = 'bottom bottom-=40%',
    stagger = 0.03
}) => {
    const containerRef = useRef(null)

    const splitText = useMemo(() => {
        const text = typeof children === 'string' ? children : ''
        return text.split('').map((char, index) => (
            <span className="char" key={index}>
                {char === ' ' ? '\u00A0' : char}
            </span>
        ))
    }, [children])

    useEffect(() => {
        const el = containerRef.current
        if (!el) return
        const scroller = scrollContainerRef?.current ?? window
        const charElements = el.querySelectorAll('.char')

        const isMobile = window.matchMedia('(max-width: 768px)').matches

        let anim
        if (isMobile) {
            // High performance, one-time fade/slide on mobile instead of character scrub
            anim = gsap.fromTo(
                el,
                { opacity: 0, y: 30 },
                {
                    duration: 0.8,
                    opacity: 1,
                    y: 0,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: el,
                        scroller,
                        start: 'top 90%',
                        once: true
                    }
                }
            )
        } else {
            anim = gsap.fromTo(
                charElements,
                { willChange: 'opacity, transform', opacity: 0, yPercent: 120, scaleY: 2.3, scaleX: 0.7, transformOrigin: '50% 0%' },
                {
                    duration: animationDuration,
                    ease,
                    opacity: 1,
                    yPercent: 0,
                    scaleY: 1,
                    scaleX: 1,
                    stagger,
                    scrollTrigger: { trigger: el, scroller, start: scrollStart, end: scrollEnd, scrub: true }
                }
            )
        }

        return () => {
            if (anim) {
                if (anim.scrollTrigger) {
                    anim.scrollTrigger.kill()
                }
                anim.kill()
            }
        }
    }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger])

    return (
        <h2 ref={containerRef} className={`scroll-float ${containerClassName}`}>
            <span className={`scroll-float-text ${textClassName}`}>{splitText}</span>
        </h2>
    )
}

export default ScrollFloat