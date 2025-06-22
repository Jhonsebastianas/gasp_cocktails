import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const Hero = () => {

    const videoRef = useRef();

    const isMobile = useMediaQuery({ maxWidth: 767 });


    useGSAP(() => {
        // Dividiremos nuestro texto del hero en pedazos más pequeños para animarlo independientemente.
        // Animamos letra por letra
        const heroSplit = new SplitText('.title', { type: 'chars, words' });
        // Animaremos linea a linea que vayan apareciendo
        const paragraphSplit = new SplitText('.subtitle', { type: 'lines' });

        heroSplit.chars.forEach((char) => char.classList.add('text-gradient'));

        // MOJITO, el texto grande.
        gsap.from(heroSplit.chars, {
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.05
        });

        gsap.from(paragraphSplit.lines, {
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.06,
            // Si se elimina el delay todo ocurre al mismo tiempo
            delay: 1, // Significa que empiece justo despues de 1 segundo que finalice la animación del titulo
        });

        gsap.timeline({
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top', // Cuando la parte superior de la pantalla hero llegue a la parte superior de la pantalla
                end: 'bottom top', // cuando la parte inferior de la página de inicio llegue a la parte superior
                scrub: true, // La animación va directamente relacionada con el scroll
            }
        })
        .to('.right-leaf', { y:  200 }, 0)
        .to('.left-leaf', { y:  -200 }, 0);

        // INICIA VIDEO

        // Top es la primera propiedad y se refiere al
        // elementoEstamosAnimando sobreLaPantalla
        // Cuando la parte superior del video llega al 50% de la pantalla, comienza la animación
        // top 50%: Cuando estemos en la parte superior del video
        // center 60% cuando el centro del video llegue al 60% de la pantalla inicia
        const startValue = isMobile ? 'top 50%' : 'center 60%';

        // 120% top: Cuando el video sobrepase el 120% de la parte superior de la pantalla, es decir:
        // se aleje mucho de la pantalla, finalizamos la animación
        // Bottom top cuando la parte inferior del video llegue a la parte superior de la pantalla la animación termina
        const endValue = isMobile ? '120% top' : 'bottom top';

        // tl: timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: 'video',
                start: startValue,
                end: endValue,
                scrub: true,
                pin: true, // Mantener el video en pantalla mientras nos desplazamos
            }
        })

        videoRef.current.onloadedmetadata = () => {
            tl.to(videoRef.current, {
                currentTime: videoRef.current.duration,
            });
        }

        // TERMINA VIDEO

    }, []);

    return (
        <>
            <section id="hero" className="noisy">
                <h1 className="title">MOJITO</h1>
                <img 
                    src="/images/hero-left-leaf.png" 
                    alt="left-leaf" 
                    className="left-leaf"
                />

                <img 
                    src="/images/hero-right-leaf.png" 
                    alt="right-leaf" 
                    className="right-leaf"
                />

                <div className="body">
                    <div className="content">
                        <div className="space-y-5 hidden md:block">
                            <p>Cool. Crips. Classic.</p>
                            <p className="subtitle">
                                Sip the Spirit <br /> of Summer
                            </p>
                        </div>

                        <div className="view-cocktails">
                            <p className="subtitle">
                                Every cocktail on our menu is a blend of premium ingredients, creative flair and timeless recipes - designed to delight your senses.
                            </p>
                            <a href="#cocktails">View Cocktails</a>
                        </div>
                    </div>
                </div>
            </section>

            <div className="video absolute inset-0">
                <video 
                    ref={videoRef}
                    src="/videos/output.mp4"
                    muted
                    playsInline
                    preload="auto"
                />
            </div>
        </>
    );
}

export default Hero;