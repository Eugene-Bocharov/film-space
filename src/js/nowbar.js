const btn = document.querySelector('.burger');
const navMenu = document.querySelector('.menu');
const dimmer = document.querySelector('.dimmer');
const menu_item = document.querySelector('.menu-item');
const button_menu_img = document.querySelector('.button-menu-img');

btn.addEventListener('click', () => {
  navMenu.classList.toggle('menu_open');
  // btn.classList.toggle('nav__toggler_open');
  btn.classList.toggle('burger_open');
  dimmer.classList.toggle('dimmer_active');
  menu_item.classList.toggle('menu-item_open');
  button_menu_img.classList.toggle('button-menu-img_open');
  console.log(true);
});

dimmer.addEventListener('click', () => {
  navMenu.classList.remove('menu_open');
  // btn.classList.remove('nav__toggler_open');
  btn.classList.remove('burger_open');
  dimmer.classList.remove('dimmer_active');
  menu_item.classList.remove('menu-item_open');
  button_menu_img.classList.remove('button-menu-img_open');
});
