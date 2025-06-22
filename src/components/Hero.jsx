import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

const Hero = () => {

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
        </>
    );
}

export default Hero;