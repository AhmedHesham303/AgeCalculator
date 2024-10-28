let img = document.querySelector("img");
let days = document.querySelector("#days-input");
let months = document.querySelector("#months-input");
let years = document.querySelector("#years-input");
let msg = document.querySelectorAll(".error-msg");
let label = document.querySelectorAll(".input-label");
let dots = document.querySelectorAll(".dots");
let curYear = new Date().getFullYear();

function checkDays(days) {
  if (days.value === "") {
    msg[0].innerText = "This field is required";
    msg[0].style.display = "block";
    msg[0].style.color = "hsl(0, 100%, 67%)";
    label[0].style.color = "hsl(0, 100%, 67%)";
    // input[0].style.border = "solid 1px hsl(0, 100%, 67%)";
  } else if (days.value.length < 2 || days.value < 1 || days.value > 31) {
    msg[0].innerText = "Must be a valid day";
    msg[0].style.display = "block";
    msg[0].style.color = "hsl(0, 100%, 67%)";
    label[0].style.color = "hsl(0, 100%, 67%)";
    // input[0].style.border = "solid 1px hsl(0, 100%, 67%)";
  } else {
    msg[0].style.display = "none";
    label[0].style.color = "hsl(0, 1%, 44%)";
    return true;
  }
}

function checkMonths(months) {
  if (months.value === "") {
    msg[1].innerText = "This field is required";
    msg[1].style.display = "block";
    msg[1].style.color = "hsl(0, 100%, 67%)";
    label[1].style.color = "hsl(0, 100%, 67%)";
    // input[1].style.border = "solid 1px hsl(0, 100%, 67%)";
  } else if (months.value.length < 2 || months.value < 1 || months.value > 12) {
    msg[1].innerText = "Must be a valid month";
    msg[1].style.display = "block";
    msg[1].style.color = "hsl(0, 100%, 67%)";
    label[1].style.color = "hsl(0, 100%, 67%)";
    // input[0].style.border = "solid 1px hsl(0, 100%, 67%)";
  } else {
    msg[1].style.display = "none";
    label[1].style.color = "hsl(0, 1%, 44%)";
    return true;
  }
}

function checkYears(years) {
  if (years.value === "") {
    msg[2].innerText = "This field is required";
    msg[2].style.display = "block";
    msg[2].style.color = "hsl(0, 100%, 67%)";
    label[2].style.color = "hsl(0, 100%, 67%)";
    // input[2].style.border = "solid 1px hsl(0, 100%, 67%)";
  } else if (years.value.length < 4) {
    msg[2].innerText = "Must be a valid year";
    msg[2].style.display = "block";
    msg[2].style.color = "hsl(0, 100%, 67%)";
    label[2].style.color = "hsl(0, 100%, 67%)";
    // input[0].style.border = "solid 1px hsl(0, 100%, 67%)";
  } else if (years.value > curYear) {
    msg[2].innerText = "Must be a in the past";
    msg[2].style.display = "block";
    msg[2].style.color = "hsl(0, 100%, 67%)";
    label[2].style.color = "hsl(0, 100%, 67%)";
    // input[0].style.border = "solid 1px hsl(0, 100%, 67%)";
  } else {
    msg[2].style.display = "none";
    label[2].style.color = "hsl(0, 1%, 44%)";
    return true;
  }
}

function checkDate(year, month, day, curDate) {
  let inputDate = new Date(`${year}-${month}-${day}`);
  let diff = inputDate.getTime() - curDate.getTime();
  console.log(inputDate.getTime());
  console.log(curDate.getTime());
  console.log(diff);
  if (diff > 0) return false;
  if (month === 2) {
    if (
      day >= 30 ||
      (day === 29 && !(year % 400 == 0)) ||
      (year % 4 == 0 && year % 100 != 0)
    )
      return false;
  } else if (
    (month == 4 || month == 6 || month == 9 || month == 12) &&
    day == 31
  ) {
    return false;
  }

  return true;
}

function checkDateDisplay(validDate) {
  if (!validDate) {
    msg[0].innerText = "Enter a valid date";
    msg[0].style.color = "hsl(0, 100%, 67%)";
    msg[0].style.display = "block";
    label[0].style.color = "hsl(0, 100%, 67%)";
  } else {
    msg[0].style.display = "none";
    msg[0].style.color = "hsl(0, 1%, 44%)";
    label[0].style.color = "hsl(0, 1%, 44%)";
  }
}

function finalDisplay() {
  let now = new Date();
  let givenDate = new Date(`${years.value}-${months.value}-${days.value}`);
  let diff = now.getTime() - givenDate.getTime();
  let y = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  diff -= y * 1000 * 60 * 60 * 24 * 365;
  let m = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
  diff -= m * 1000 * 60 * 60 * 24 * 30;
  let d = Math.floor(diff / (1000 * 60 * 60 * 24));
  dots[0].innerText = y;
  dots[1].innerText = m;
  dots[2].innerText = d;
}
img.addEventListener("click", function () {
  let validDay = false;
  let validMonth = false;
  let validYear = false;
  let validDate = false;
  validDay = checkDays(days);
  validMonth = checkMonths(months);
  validYear = checkYears(years);

  if (validYear && validMonth && validDay) {
    validDate = checkDate(years.value, months.value, days.value, new Date());
    checkDateDisplay(validDate);
  }

  if (validDay && validMonth && validYear && validDate) finalDisplay();
});
