const cursor = document.querySelector(".cursor");
mouseX = 0, mouseY = 0, posX = 0, posY = 0

document.addEventListener("mousemove", (e) => {
    cursor.style.cssText = "left: " + e.clientX + "px; top: " + e.clientY + "px;";

})

const button = document.querySelector(".slider__button");
const line = document.querySelector(".slider__live-line");

button.addEventListener("mouseover", (e) => {
    line.stop();
})
button.addEventListener("mouseout", (e) => {
    line.start();
})


const wrapper = document.querySelector(".wrapper");
const slider = document.querySelector(".main__slider");
const sliderHidden = document.querySelector(".slider-hidden");

let arrow1 = document.getElementById("arrow1");
let arrow2 = document.getElementById("arrow2");
let arrowsPanel = document.querySelector(".slider__arrows");

function onEntry(entry) {
    entry.forEach(change => {
        if (change.isIntersecting) {
            slider.classList.add("fixed");
            arrowsPanel.classList.remove("opacity");
            if(slider.classList.contains("fixed")) {
                sliderHidden.classList.add("none");
            }

            let activeSlide = document.querySelector('.swiper-slide-active');
            let background = activeSlide.getAttribute('data-background');
            slider.style.cssText = "background-color: " + background + ";"
            
            let active = document.querySelector('.swiper-slide-active');
            let slides = [...document.querySelectorAll('.slider__image')];
            let index = slides.indexOf(active);

            let list = document.querySelectorAll('.list__el');
            for (let i = 0; i < list.length; i++) {
                const el = list[i];
                el.classList.remove("active-el");
            }
            list[index].classList.add("active-el");

            let hash = document.getElementById('firstSlide');
            let lastEl = slides.length;
            let firstEl = slides.indexOf(hash);

            if(firstEl === index) {
                arrow1.classList.add("arrow-active");
            } else {
                arrow1.classList.remove("arrow-active");
            }

            if(lastEl === index + 1) {
                arrow2.classList.add("arrow-active");
            } else {
                arrow2.classList.remove("arrow-active");
            }
        } else {
            arrowsPanel.classList.add("opacity");
        }
    });
}

let options = { threshold: [0.9] };
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll('.slider__image');
for (let elm of elements) {
    observer.observe(elm);
}

let prev = slider.previousElementSibling;
let next = slider.nextElementSibling;
prev.id = 'prev';
next.id = 'next';

window.addEventListener('click', (e) => {
    if(e.target.dataset.action === 'slider-exit'){
        slider.classList.remove("fixed");
        sliderHidden.classList.remove("none");
    }
});