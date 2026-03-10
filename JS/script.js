let home = document.querySelector(".home");
let menu = document.querySelector("#menu-btn");
let menuIcon = document.querySelector("#menu-btn i");
let navbar = document.querySelector(".navbar");
let header = document.querySelector(".header");
let logBtn = document.querySelector("#login-btn");
let logForm = document.querySelector(".login-form-container");
let closeBtn = document.querySelector('#close-login-btn');

menu.onclick = () => {
    menuIcon.classList.toggle("fa-times");
    navbar.classList.toggle("active");

};

window.onscroll = () => {
    if(window.scrollY > 0){
        header.classList.add("active");
    } else {
        header.classList.remove("active");
    }
    menuIcon.classList.remove("fa-times");
};
window.onload = () => {
    if(window.scrollY > 0){
        header.classList.add("active");
    } else {
        header.classList.remove("active");
    }
};

logBtn.onclick = ()=> {
    logForm.classList.add("active");
}
closeBtn.onclick = () => {
    logForm.classList.remove('active');
}

if(home){
    home.onmousemove = (e) => {
        document.querySelectorAll(".home-parallax").forEach(elm => {
            let speed = elm.getAttribute("data-speed");
            let x = (window.innerWidth - e.pageX * speed) / 90;
            let y = (window.innerHeight - e.pageY * speed) / 90;
            elm.style.transform = `translateX(${y}px) translateY(${x}px)`
        });
    }
}   

document.querySelector(".home").onmouseleave = (e) => {
    document.querySelectorAll(".home-parallax").forEach(elm => {
        elm.style.transform = `translateX(0px) translateY(0px)`
    });
}

const themeToggle = document.querySelector('#theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        themeToggle.classList.replace('fa-moon', 'fa-sun');
    }
}

themeToggle.onclick = () => {
    let theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeToggle.classList.replace('fa-sun', 'fa-moon');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.classList.replace('fa-moon', 'fa-sun');
    }
};



const vehicleWrapper = document.getElementById("vehicleWrapper");
    fetch("./Data/vehical.json")
    .then(res => res.json())
    .then(vehicles => {
        vehicles.forEach(vehicle => {
        vehicleWrapper.insertAdjacentHTML("beforeend", 
            `
                <div class="swiper-slide box">
                <img src="${vehicle.image}" alt="${vehicle.name}">
                <div class="content">
                    <h3>${vehicle.name}</h3>
                    <div class="price"><span>Price:</span> ${vehicle.price}</div>
                    <p>
                    <span class="fas fa-circle"></span> ${vehicle.type}
                    <span class="fas fa-circle"></span> ${vehicle.year}
                    <span class="fas fa-circle"></span> ${vehicle.transmission}
                    <span class="fas fa-circle"></span> ${vehicle.drive}
                    <span class="fas fa-circle"></span> ${vehicle.speed}
                    </p>
                    <a href="#" class="btn">View Details</a>
                </div>
                </div>
        `
        );
        
        });

        // Reinitialize Swiper AFTER content loads
        new Swiper(".vehicle-slider", {
        loop: true,
        grabCursor: true,
        spaceBetween: 20,
        centeredSlides: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
        breakpoints: {
            640: { slidesPerView: 1 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 3 }
        }
        });
    });


fetch('./Data/feature-car.json')
    .then(res => res.json())
    .then(data => {
        const performanceSlider = document.querySelector('.performance-slider .swiper-wrapper');
        const luxurySlider = document.querySelector('.luxury-slider .swiper-wrapper');

        data.performance.forEach(vehicle => {
        performanceSlider.insertAdjacentHTML("beforeend", `
            <div class="swiper-slide box">
                <img src="${vehicle.image}" alt="${vehicle.name}">
                <h3>${vehicle.name}</h3>
                <div class="stars"> ${generateStars(vehicle.rating)} </div>
                <div class="price">${vehicle.price}</div>
                <a href="#" class="btn">Check Out</a>
            </div>
            `);
        });

        data.luxury.forEach(vehicle => {
        luxurySlider.insertAdjacentHTML("beforeend", `
            <div class="swiper-slide box">
            <img src="${vehicle.image}" alt="${vehicle.name}">
            <h3>${vehicle.name}</h3>
            <div class="stars"> ${generateStars(vehicle.rating)} </div>
            <div class="price">${vehicle.price}</div>
            <a href="#" class="btn">Check Out</a>
            </div>
            `);
        });

        function initSwiper(selector, breakpoints) {
            return new Swiper(selector, {
                loop: true,
                grabCursor: true,
                slidesPerView: 1,
                spaceBetween: 20,
                pagination: {
                    el: `${selector} .swiper-pagination`,
                    clickable: true
                },
                breakpoints: breakpoints
            });
        }
        initSwiper('.performance-slider', {
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        });
        initSwiper('.luxury-slider', {
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        });
    });

const newsletterForm = document.querySelector(".newsletter form");

newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const emailInput = newsletterForm.querySelector("input[type='email']");
    const emailValue = emailInput.value.trim();

    if (!emailValue) {
        return;
    }

    const successMessage = document.createElement("div");
    successMessage.classList.add("newsletter-success");
    successMessage.innerText = "Thank you for subscribing!";

    const newsletterSection = document.querySelector(".newsletter");
    newsletterSection.appendChild(successMessage);

    emailInput.value = "";

    setTimeout(() => {
        successMessage.remove();
    }, 3000);
});


document.addEventListener("DOMContentLoaded", () => {
    fetch("./Data/reviews.json")
    .then(res => {
        if (!res.ok) throw new Error("Failed to load reviews");
        return res.json();
    })
    .then(reviews => {
        const wrapper = document.getElementById("reviews-wrapper");
        if (!wrapper) return;

        wrapper.innerHTML = "";

        reviews.forEach(review => {
            wrapper.insertAdjacentHTML("beforeend", `
                <div class="swiper-slide">
                    <div class="box">
                        <img src="${review.image}" alt="${review.name}" loading="lazy">
                        <div class="content">
                            <p>${review.comment}</p>
                            <h3>${review.name}</h3>
                            <div class="stars">${generateStars(review.rating)}</div>
                        </div>
                    </div>
                </div>
            `);
        });

        const swiper = new Swiper(".review-slider", {
            loop: true,
            grabCursor: true,
            spaceBetween: 20,
            centeredSlides: true,
            observer: true, 
            observeParents: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            },
        });
    })
    .catch(err => console.error("Error:", err));
});

function generateStars(rating) {
    let stars = "";
    const numRating = parseFloat(rating) || 0; 
    const full = Math.floor(numRating);
    const half = numRating % 1 >= 0.5;

    for (let i = 0; i < full; i++) {
        stars += `<i class="fas fa-star"></i>`;
    }
    if (half) {
        stars += `<i class="fas fa-star-half-alt"></i>`;
    }
    let currentStarsCount = full + (half ? 1 : 0);
    for (let i = currentStarsCount; i < 5; i++) {
        stars += `<i class="far fa-star"></i>`;
    }
    return stars;
}