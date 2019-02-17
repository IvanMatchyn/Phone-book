export const RAGEXP_EMAIL = /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/i;
export const RAGEXP_TEXT = /^[A-Za-z-]{1,50}$/i;
export const RAGEXP_PASS = /^[A-Za-z0-9]{1,50}$/i;
export const RAGEXP_BIRTHDAY = /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/i;
export const RAGEXP_PHONE = /^^((\+3|8)+([0-9]){10})$/i;
export const MAIN = document.querySelector('.main');
export const MAIN_LSIDE_BLOCK = document.querySelector('.ls__content-wrapper');
export const MAIN_RSIDE_BLOCK = document.querySelector('.main__article');