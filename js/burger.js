const menuBurger = document.querySelector("#header__burger");
const menu = document.querySelector(".header__navigation");

menuBurger.addEventListener('click', () => {
    menuBurger.classList.toggle("active");
    menu.classList.toggle("menu-active");
});