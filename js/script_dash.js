const container = document.querySelector(".cont");
const globe = document.querySelector(".globe");
const linkItems = document.querySelectorAll(".l-item");
const contItems = document.querySelectorAll(".men");
const darkMode = document.querySelector(".dark-mode");
const logo = document.querySelector(".cont .log_title");
const logo_span = document.querySelector(".cont .log_title span");
const icon_fill_gp = document.querySelectorAll('[class*="fill"]');
const icon_fill = document.querySelector('[class*="fill"]');

// const logo_sp2 = document.querySelector(".logo .sp2");

//Container Hover - Leave
logo.addEventListener("click", () => {
  logo.classList.toggle("active");
  container.classList.toggle("active");
  globe.classList.toggle("active");
})

//Container Hover
// container.addEventListener("mouseenter", () => {
//   if (!logo.classList.contains("active")){
//     container.classList.add("active");
//     globe.classList.add("active");
//   }
// });

//Container Hover Leave
// container.addEventListener("mouseleave", () => {
//   if (!logo.classList.contains("active")){
//     container.classList.remove("active");
//     globe.classList.remove("active");
//   }
// });

//Link-items Clicked
for (let i = 0; i < linkItems.length-1; i++) {
  if (!linkItems[i].classList.contains("dark-mode")) {
    linkItems[i].addEventListener("click", (e) => {
      linkItems.forEach((linkItem) => {
        linkItem.classList.remove("active");
      });
      contItems.forEach((c) => {
        c.classList.remove("active");
      })
      // console.log(contItems[1])
      linkItems[i].classList.add("active");
      contItems[i].classList.add("active");
    });
  }
}

// Dark Mode Functionality
darkMode.addEventListener("click", function () {
  if (document.body.classList.contains("dark-mode")) {
    darkMode.querySelector("span").textContent = "mode sombre";
    darkMode.querySelector(".sp_hide").textContent = "mode sombre";
    darkMode.querySelector("i").setAttribute("class", "bi bi-moon");
    // logo.style.fill = "#363b46";
  } else {
    darkMode.querySelector("span").textContent = "mode clair";
    darkMode.querySelector(".sp_hide").textContent = "mode clair";
    darkMode.querySelector("i").setAttribute("class", "bi bi-sun");
    // logo.style.fill = "#fff";
  }
  document.body.classList.toggle("dark-mode");
});
