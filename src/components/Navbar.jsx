import { useGSAP } from "@gsap/react";
import { navLinks } from "../../constants";
import gsap from "gsap";

const Navbar = () => {

    useGSAP(() => {
        const navTween = gsap.timeline({
            scrollTrigger: {
                trigger: 'nav',
                start: 'bottom top' // bottom, se refiere a la pocisión de la nav, top a la posición de la ventana
                // En este caso, cunado la parte inferior de la barra de navegación llegue a la parte superior de la ventana.
                // Es cuando empezaremos a aplicar las clases especificas
            }
        });

        navTween.fromTo('nav', {
            backgroundColor: 'transparent',
        }, {
            backgroundColor: '#00000050', // el 50 es opacidad, que en hexadecimal es 30%
            backgroundFilter: 'blur(10px)',
            duration: 1,
            ease: 'power1.inOut'
        });
    }, []);

    return (
        <nav>
            <div>
                <a href="#home" className="flex items-center gap-2">
                    <img src="/images/logo.png" alt="logo" />
                    <p>Velvet Pour</p>
                </a>

                <ul>
                    {navLinks.map((link) => (
                        <li key={link.id}>
                            <a href={`#${link.id}`}>{link.title}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;