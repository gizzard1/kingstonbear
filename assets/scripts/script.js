document.addEventListener('DOMContentLoaded', () => {
    // Configuración del observador
    const observerOptions = {
        root: null, // Usa el viewport del navegador
        rootMargin: '0px',
        threshold: 0.15 // El elemento debe ser visible en un 15% para activarse
    };

    // Callback que se ejecuta cuando un elemento intersecta
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Añadir la clase que dispara la animación CSS
                entry.target.classList.add('is-visible');
                // Dejar de observar el elemento una vez animado
                // para que la animación no se repita al hacer scroll hacia arriba[reference:2]
                observer.unobserve(entry.target);
            }
        });
    };

    // Crear el observador
    const observer = new IntersectionObserver(revealCallback, observerOptions);

    // Seleccionar todos los elementos que queremos animar y empezar a observarlos
    const elementsToReveal = document.querySelectorAll('[data-reveal]');
    elementsToReveal.forEach(el => observer.observe(el));

    // Opcional: También se puede aplicar a los hijos de grids para un efecto escalonado
    // const gridItems = document.querySelectorAll('.services-grid > *, .fleet-grid > *, .steps-container > *');
    // gridItems.forEach(el => {
    //     el.setAttribute('data-reveal', '');
    //     observer.observe(el);
    // });

    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mainNav = document.querySelector('.main-nav');
    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', () => {
            const isOpen = mainNav.classList.toggle('open');
            mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        // Close menu when a nav link is clicked
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('open');
                mobileToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

});

function scrollToSection(sectionId, topOffset = 0) {
    const section = document.getElementById(sectionId);
    if (section) {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
            top: sectionTop - topOffset,
            behavior: 'smooth'
        });
    }
}