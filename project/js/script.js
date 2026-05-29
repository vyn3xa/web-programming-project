document.addEventListener("mousemove", (e) => {
    const star = document.createElement("div");
    star.className = "star-trail";
    star.style.left = e.clientX + "px";
    star.style.top = e.clientY + "px";
    document.body.appendChild(star);

    setTimeout(() => {
        star.remove();
    }, 600);
});

const themeToggle = document.getElementById("themeToggle");
const body = document.body;

function updateTheme() {
    const isLight = body.classList.contains("light-mode");
    themeToggle.innerText = isLight ? "☾" : "☀";
    localStorage.setItem("theme", isLight ? "light" : "dark");
}

if (localStorage.getItem("theme") === "light") {
    body.classList.add("light-mode");
} else {

    body.classList.remove("light-mode");
}
updateTheme();

themeToggle.addEventListener("click", () => {
    body.classList.toggle("light-mode");
    updateTheme();
});

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger) {
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("nav-active");

        const isExpanded = navLinks.classList.contains("nav-active");
        if (isExpanded) {
            hamburger.children[0].style.transform = "rotate(45deg) translate(5px, 5px)";
            hamburger.children[1].style.opacity = "0";
            hamburger.children[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
        } else {
            hamburger.children[0].style.transform = "none";
            hamburger.children[1].style.opacity = "1";
            hamburger.children[2].style.transform = "none";
        }
    });
}

const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");

            projectCards.forEach(card => {
                card.style.opacity = "0";
                card.style.transform = "translateY(10px) scale(0.95)";
            });

            setTimeout(() => {
                projectCards.forEach(card => {
                    const matches = filterValue === "all" || card.getAttribute("data-category") === filterValue;

                    if (matches) {
                        card.style.display = "block";
                    } else {
                        card.style.display = "none";
                    }
                });

                projectCards.forEach((card, index) => {
                    const matches = filterValue === "all" || card.getAttribute("data-category") === filterValue;
                    if (matches) {
                        setTimeout(() => {
                            card.style.opacity = "1";
                            card.style.transform = "translateY(0) scale(1)";
                        }, index * 50);
                    }
                });
            }, 300);
        });
    });
}

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.classList.add('is-visible');
            }, parseInt(delay));
            scrollObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

setTimeout(() => {
    document.querySelectorAll('.scroll-reveal').forEach(el => scrollObserver.observe(el));
}, 100);


const heroImage = document.querySelector('.hero-image');
let lastSpawn = 0;

function spawnDigit(x, y, isAuto = false) {
    if (!heroImage) return;

    const digit = document.createElement('span');
    digit.className = 'binary-digit';
    digit.innerText = Math.random() > 0.5 ? '1' : '0';

    const scatterRange = isAuto ? 100 : 180;
    const tx = (Math.random() - 0.5) * scatterRange;
    const ty = (Math.random() - 0.5) * scatterRange;

    digit.style.left = `${x}px`;
    digit.style.top = `${y}px`;
    digit.style.setProperty('--tx', `${tx}px`);
    digit.style.setProperty('--ty', `${ty}px`);

    if (isAuto) {
        digit.style.opacity = '0.4';
        digit.style.fontSize = '12px';
    }

    heroImage.appendChild(digit);

    setTimeout(() => {
        digit.remove();
    }, 1500);
}

if (heroImage) {

    setInterval(() => {
        const x = Math.random() * heroImage.offsetWidth;
        const y = Math.random() * heroImage.offsetHeight;
        spawnDigit(x, y, true);
    }, 400);

    heroImage.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastSpawn < 50) return;
        lastSpawn = now;

        const rect = heroImage.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        spawnDigit(x, y);
    });
}

document.querySelectorAll('a[href]').forEach(link => {
    if (link.hostname === window.location.hostname && link.target !== "_blank" && !link.hasAttribute('download')) {
        link.addEventListener('click', (e) => {
            if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
            e.preventDefault();
            const target = link.href;
            document.body.style.opacity = '0';
            setTimeout(() => {
                window.location.href = target;
            }, 300);
        });
    }
});

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


