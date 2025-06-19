
  const navLinks = [
    { id: "about", title: "About" },
    { id: "projects", title: "Projects" },
    { id: "contact", title: "Contact" }
  ];

  let active = "";
  let toggle = false;

  const navContainer = document.querySelector("#nav-links ul");
  const menuIcon = document.getElementById("menu-icon");
  const navbar = document.getElementById("navbar");

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
    .join("");
}


  function setActive(title) {
  active = title;
  renderNav();
  window.scrollTo(0, 0);

  // Close the mobile menu if open
  const navCollapse = document.querySelector("#nav-links");
  if (toggle) {
    toggleMenu(); // toggle it off
  }
}


  function toggleMenu() {
    toggle = !toggle;
    const navCollapse = document.querySelector("#nav-links");
    navCollapse.classList.toggle("show");

    if (toggle) {
      menuIcon.src = "/assets/close.svg";
    } else {
      menuIcon.src = "/assets/menu.svg";
    }
  }

  // Scroll background effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.remove("bg-transparent");
      navbar.classList.add("bg-white");
    } else {
      navbar.classList.add("bg-transparent");
      navbar.classList.remove("bg-white");
    }
  });

  // Initial render
  renderNav();

