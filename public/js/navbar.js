const navLinks = [
    { id: 'about', title: 'About' },
    { id: 'projects', title: 'Projects' },
    { id: 'contact', title: 'Contact' },
];

let active = '';
let toggle = false;

const navContainer = document.querySelector('#nav-links ul');
const menuIcon = document.getElementById('menu-icon');
const navbar = document.getElementById('navbar');

function renderNav() {
    navContainer.innerHTML = navLinks
        .map(
            (nav) => `
      <li class="nav-item">
        <a 
          href="#${nav.id}" 
          class="nav-link ${active === nav.title ? 'active' : ''}" 
          onclick="setActive('${nav.title}')"
        >
          ${nav.title}
        </a>
      </li>
    `
        )
        .join('');
}

function setActive(title) {
    active = title;
    renderNav();

    // Close the mobile menu if open
    const navCollapse = document.querySelector('#nav-links');
    if (toggle) {
        toggleMenu(); // toggle it off
    }
}

function toggleMenu() {
    toggle = !toggle;
    const navCollapse = document.querySelector('#nav-links');
    navCollapse.classList.toggle('show');

    if (toggle) {
        menuIcon.src = '/assets/close.svg';
    } else {
        menuIcon.src = '/assets/menu.svg';
    }
}

// Scroll background effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.remove('bg-transparent');
        navbar.classList.add('bg-white');
    } else {
        navbar.classList.add('bg-transparent');
        navbar.classList.remove('bg-white');
    }
});

// Initial render
renderNav();

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.6, // Adjust to your liking (60% of section is visible)
};

const observer = new IntersectionObserver(
    (entries) => {
        let visibleSection = null;
        let maxRatio = 0;

        entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
                maxRatio = entry.intersectionRatio;
                visibleSection = entry.target;
            }
        });

        if (visibleSection) {
            const id = visibleSection.id;
            const matched = navLinks.find((nav) => nav.id === id);
            if (matched && active !== matched.title) {
                setActive(matched.title);
            }
        } else {
            // 👇 No sections are visible (e.g. you're on the hero)
            if (active !== '') {
                active = '';
                renderNav();
            }
        }
    },
    {
        threshold: 0.4, // You can adjust this to trigger earlier or later
    }
);

// Observe each section
navLinks.forEach((nav) => {
    const section = document.getElementById(nav.id);
    if (section) observer.observe(section);
});
