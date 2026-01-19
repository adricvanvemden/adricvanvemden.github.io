
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

// dynamically generate cards
fetch('./data.json')
    .then((response) => response.json())
    .then((data) => {

        // Experience Section
        const experienceContainer = document.getElementById('experience-container');

        data.experience.forEach((job) => {
            const card = document.createElement('div');
            card.classList.add('card');

            const highlights = job.highlights.map((highlight) => `<li>${highlight}</li>`).join('');

            const content = `
        <div>${job.year}</div>
        <div>
            <h4>
                ${job.link ? `
                <a href="${job.link}" target="_blank"> ${job.title} <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                    class="lucide lucide-external-link-icon lucide-external-link"><path d="M15 3h6v6"/><path d="M10 14 21 3"/>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                </a>` :
                `${job.title}`}
            </h4>
            <p>${job.description}</p>
            ${highlights ? `<ul>${highlights}</ul>` : ''}
            <div class="tags">
                ${job.tags.map((tag) => `<div class="tag">${tag}</div>`).join('')}
            </div>
        </div>
      `;

            card.innerHTML = content;
            experienceContainer.appendChild(card);
        });

        // Projects Section
        const projectsContainer = document.getElementById('projects-container');

        data.projects.forEach((project) => {
            const card = document.createElement('div');
            card.classList.add('card');

            const content = `
        <div>
            <h4>
                ${project.link ? `
                <a href="${project.link}" target="_blank"> ${project.title} <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                    class="lucide lucide-external-link-icon lucide-external-link"><path d="M15 3h6v6"/><path d="M10 14 21 3"/>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                </a>` :
                `${project.title}`}
            </h4>
            <p> ${project.description} </p>
            <div class="tags">
                ${project.tags.map((tag) => `<div class="tag">${tag}</div>`).join('')}
            </div>
        </div>
      `;


            card.innerHTML = content;
            projectsContainer.appendChild(card);
        });

    })
    .catch((error) => console.error('Error loading project data:', error));


