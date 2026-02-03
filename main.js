const weddingDate = new Date("2026-06-20 16:00");
const timerWrapper = document.querySelector(".timer");

const timer = setInterval(() => {
  const now = new Date();

  const difference = weddingDate - now; // it is a ms

  const magic = 1000 * 60;
  const magic60 = magic * 60;

  const daysTime = Math.floor(difference / (magic60 * 24));
  const hours = Math.floor((difference % (magic60 * 24)) / magic60);
  const minutes = Math.floor((difference % magic60) / magic);
  const seconds = Math.floor((difference % magic) / 1000);

  const arr = [daysTime, hours, minutes, seconds];
  const titleArray = ["дней", "час", "минут", "секунд"];

  timerWrapper.innerHTML = "";

  arr.forEach((item, index) =>
    timerWrapper.append(createTimeElement(item, titleArray[index]))
  );
}, 1000);

// 1 - день, 2,3,4 - дня, 5-0 - дней (с 10 по 20  тоже дней)
const countDays = (str, num) => {
  const remainder = num % 10;
  const handerRemainder = num % 100;
  if (handerRemainder > 10 && handerRemainder < 21) return str;
  if (remainder === 1) return `день`;
  if (remainder > 1 && remainder < 5) return `дня`;
  return str;
};

// 1 - час, 2,3,4 - часа, 5-0 - часов (с 10 по 20  тоже часов)
const countHrs = (str, num) => {
  const remainder = num % 10;
  const handerRemainder = num % 100;
  if (handerRemainder > 10 && handerRemainder < 21) return `${str}ов`;
  if (remainder === 1) return str;
  if (remainder > 1 && remainder < 5) return `${str}а`;
  return `${str}ов`;
};

// 1 - минутe, 2,3,4 - минуты, 5-0 - минут (с 10 по 20  тоже минут)
// 1 - секунда, 2,3,4 - секунды, 5-0 - секунд (с 10 по 20  тоже секунд)
const countSec = (str, num) => {
  const remainder = num % 10;
  const handerRemainder = num % 100;
  if (handerRemainder > 10 && handerRemainder < 21) return str;
  if (remainder === 1) return `${str}у`;
  if (remainder > 1 && remainder < 5) return `${str}ы`;
  return str;
};

const getCorrectTitle = (title, time) => {
  switch (title) {
    case "дней":
      return countDays(title, time);
    case "час":
      return countHrs(title, time);
    case "минут":
    case "секунд":
      return countSec(title, time);
  }
};

function createTimeElement(time, title) {
  const el = document.createElement("li");
  const timeEl = document.createElement("span");
  const titleEl = document.createElement("h4");
  timeEl.innerHTML = time;
  titleEl.innerHTML = getCorrectTitle(title, time);
  el.append(timeEl, titleEl);
  el.classList.add("item");
  return el;
}