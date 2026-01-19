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

        // Dynamically generate cards with quotes in between
        function generateCardsWithQuotes(items, quotes, containerId) {
            const container = document.getElementById(containerId);

            items.forEach((item, index) => {
                const card = document.createElement('div');
                card.classList.add('card');

                let content = '';

                const highlights = item.highlights?.map((highlight) => `<li>${highlight}</li>`).join('');
                content = `
                ${item.year ? `<div>${item.year}</div>` : ''}
                <div>
                    <h4>
                        ${item.link ? `<a href="${item.link}" target="_blank"> ${item.title} <img src="external-link.svg" alt="GitHub Icon" width="16" height="16"></a>` : `${item.title}`}
                    </h4>
                    <p>${item.description}</p>
                    ${highlights ? `<ul>${highlights}</ul>` : ''}
                    <div class="tags">
                        ${item.tags.map((tag) => `<div class="tag">${tag}</div>`).join('')}
                    </div>
                </div>
            `;

                card.innerHTML = content;
                container.appendChild(card);

                const quote = quotes.find((q) => q.index === index);
                if (quote) {
                    const quoteDiv = document.createElement('div');
                    quoteDiv.classList.add('quote');

                    const quoteContent = `
                <blockquote>"${quote.text}"</blockquote>
                <p>${quote.author}</p>
            `;

                    quoteDiv.innerHTML = quoteContent;
                    container.appendChild(quoteDiv);
                }
            });
        }

        // Generate experience section with quotes
        const experienceQuotes = data.quotes.filter((quote) => quote.section === 'experience');
        generateCardsWithQuotes(data.experience, experienceQuotes, 'experience-container');

        // Generate projects section with quotes
        const projectQuotes = data.quotes.filter((quote) => quote.section === 'projects');
        generateCardsWithQuotes(data.projects, projectQuotes, 'projects-container');

    })
    .catch((error) => console.error('Error loading project data:', error));


