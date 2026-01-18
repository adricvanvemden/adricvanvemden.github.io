// Select all section elements and navigation links
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

function handleScrollSpy() {
    let currentSection = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop - sectionHeight / 3) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", handleScrollSpy);

function handleClick(event) {
    navLinks.forEach((link) => link.classList.remove("active"));
    event.target.classList.add("active");
}

navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        handleClick(event);
    });
});
