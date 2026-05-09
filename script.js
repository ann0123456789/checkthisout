"use strict";

/* =========================
   Dynamic Data
========================= */

const familyMembers = [
    {
        name: "老可爱",
        image: "pic/laokeai.jpeg"
    },
    {
        name: "可爱妈",
        image: "pic/keaima.jpeg"
    },
    {
        name: "大可爱",
        image: "pic/dakeai.jpeg"
    },
    {
        name: "小可爱",
        image: "pic/xiaokeai.jpeg"
    },
    {
        name: "可爱虎",
        image: "pic/keaihu.jpeg"
    }
];

const memories = [
    {
        year: "1998",
        title: " ",
        image: "pic/1998.jpg"
    },
    {
        year: "2005",
        title: "23-06-2005",
        image: "pic/23-06-2005.jpg"
    },
    {
        year: "2009",
        title: "21-9-2009",
        image: "pic/21-9-2009.jpg"
    },
    {
        year: "2009",
        title: "03-10-2009",
        image: "pic/3-10-2009.jpg"
    },
    {
        year: "2010",
        title: "24-12-2010",
        image: "pic/24-12-2010.jpg"
    },
    {
        year: "2011",
        title: "02-10-2011",
        image: "pic/2011.jpg"
    },
    {
        year: "2012",
        title: "18-09-2012",
        image: "pic/2012.jpg"
    },
    {
        year: "2013",
        title: "01-05-2013",
        image: "pic/2013.jpg"
    },
    {
        year: "2014",
        title: "28-09-2014",
        image: "pic/2014.jpg"
    },
    {
        year: "2015",
        title: "18-12-2015",
        image: "pic/2015.jpg"
    },
    {
        year: "2016",
        title: "06-11-2016",
        image: "pic/2016.jpg"
    },
    {
        year: "2017",
        title: " ",
        image: "pic/2017.jpg"
    },
    {
        year: "2018",
        title: "27-05-2018",
        image: "pic/2018.jpg"
    },
    {
        year: "2019",
        title: "20-01-2019",
        image: "pic/2019.jpg"
    },
    {
        year: "2020",
        title: "09-06-2020",
        image: "pic/2020.jpg"
    },
    {
        year: "2021",
        title: "12-02-2021",
        image: "pic/2021.jpg"
    },
    {
        year: "2022",
        title: "08-05-2022",
        image: "pic/2022.jpg"
    },
    {
        year: "2023",
        title: "21-04-2023",
        image: "pic/2023.jpg"
    },
    {
        year: "2024",
        title: "21-07-2024",
        image: "pic/2024.jpg"
    },
    {
        year: "2025",
        title: "08-01-2025",
        image: "pic/2025.jpg"
    },
    {
        year: "2026",
        title: "24-01-2026",
        image: "pic/2026.jpg"
    }
];

/* =========================
   Family Carousel
========================= */

const carouselTrack = document.getElementById("familyCarousel");
const carouselDots = document.getElementById("carouselDots");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

let activeIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

function createFamilyCards() {
    familyMembers.forEach((member, index) => {
        const card = document.createElement("article");
        card.className = "family-card";
        card.setAttribute("data-index", index);

        card.innerHTML = `
      <div class="family-photo">
        <img src="${member.image}" alt="${member.name}" />
      </div>
      <div class="name-tag">${member.name}</div>
    `;

        carouselTrack.appendChild(card);

        const dot = document.createElement("button");
        dot.className = "carousel-dot";
        dot.setAttribute("aria-label", `Go to ${member.name}`);
        dot.addEventListener("click", () => {
            activeIndex = index;
            updateCarousel();
        });

        carouselDots.appendChild(dot);
    });
}

function updateCarousel() {
    const cards = document.querySelectorAll(".family-card");
    const dots = document.querySelectorAll(".carousel-dot");

    cards.forEach((card, index) => {
        const offset = index - activeIndex;
        const absoluteOffset = Math.abs(offset);

        card.classList.toggle("active", index === activeIndex);

        let translateX = offset * 285;
        let scale = 1;
        let opacity = 1;
        let zIndex = 5 - absoluteOffset;
        let translateY = -50;

        if (absoluteOffset === 0) {
            scale = 1.05;
            opacity = 1;
            translateY = -50;
        } else if (absoluteOffset === 1) {
            scale = 0.86;
            opacity = 0.58;
            translateY = -45;
        } else if (absoluteOffset === 2) {
            scale = 0.72;
            opacity = 0.22;
            translateY = -40;
        } else {
            scale = 0.62;
            opacity = 0;
            translateY = -40;
        }

        card.style.transform = `
      translate(calc(-50% + ${translateX}px), ${translateY}%)
      scale(${scale})
    `;

        card.style.opacity = opacity;
        card.style.zIndex = zIndex;
        card.style.pointerEvents = absoluteOffset <= 1 ? "auto" : "none";
    });

    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === activeIndex);
    });
}

function showPreviousCard() {
    activeIndex =
        activeIndex === 0 ? familyMembers.length - 1 : activeIndex - 1;

    updateCarousel();
}

function showNextCard() {
    activeIndex =
        activeIndex === familyMembers.length - 1 ? 0 : activeIndex + 1;

    updateCarousel();
}

prevBtn.addEventListener("click", showPreviousCard);
nextBtn.addEventListener("click", showNextCard);

carouselTrack.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].screenX;
});

carouselTrack.addEventListener("touchend", (event) => {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) < 50) return;

    if (swipeDistance > 0) {
        showPreviousCard();
    } else {
        showNextCard();
    }
}

/* =========================
   Memory Timeline
========================= */

const memoryTimeline = document.getElementById("memoryTimeline");

function createTimelineItems() {
    memories.forEach((memory) => {
        const item = document.createElement("article");
        item.className = "timeline-item";

        item.innerHTML = `
      <span class="timeline-dot"></span>

      <div class="timeline-card">
        <div class="timeline-image">
          <img src="${memory.image}" alt="${memory.title}" />
        </div>

        <h3 class="timeline-year">${memory.year}</h3>
        <p class="timeline-title">${memory.title}</p>
      </div>
    `;

        memoryTimeline.appendChild(item);
    });
}

/* =========================
   Back to Top
========================= */

const backToTopBtn = document.getElementById("backToTop");

function toggleBackToTopButton() {
    if (window.scrollY > 450) {
        backToTopBtn.classList.add("show");
    } else {
        backToTopBtn.classList.remove("show");
    }
}

backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

window.addEventListener("scroll", toggleBackToTopButton);

/* =========================
   Init
========================= */

function init() {
    createFamilyCards();
    updateCarousel();
    createTimelineItems();
    toggleBackToTopButton();
}

document.addEventListener("DOMContentLoaded", init);