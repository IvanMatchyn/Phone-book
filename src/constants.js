const RAGEXP_EMAIL = /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/i;
const RAGEXP_TEXT = /^[A-Za-z-]/i;
const RAGEXP_PASS = /^[A-Za-z0-9]/i;
const MAIN_LSIDE_BLOCK = document.querySelector('.ls__content-wrapper');
const MAIN_RSIDE_BLOCK = document.querySelector('.main__article');
const ONLOAD_PAGE = 'login';