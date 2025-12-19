document.addEventListener("DOMContentLoaded", () => {
  // ================================
  // AOS INIT
  // ================================
  if (typeof AOS !== "undefined") {
    AOS.init({ duration: 1000, once: true });
  }

  // ================================
  // PROGRESS BAR
  // ================================
  const progressBar = document.getElementById("progress-bar");
  if (progressBar) {
    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      progressBar.style.width = progress + "%";
    });
  }

  // ================================
  // TOOLTIP GLOSSÁRIO
  // ================================
  document.querySelectorAll("[data-glossario]").forEach((term) => {
    const tooltip = document.createElement("span");
    tooltip.className = "tooltip";
    tooltip.textContent = term.getAttribute("title") || "";
    term.appendChild(tooltip);
    term.removeAttribute("title");

    term.addEventListener("click", (e) => {
      e.stopPropagation();
      term.classList.toggle("aberto");
    });
  });

  document.addEventListener("click", () => {
    document
      .querySelectorAll(".glossario.aberto")
      .forEach((t) => t.classList.remove("aberto"));
  });

  // ================================
  // CHART.JS INIT
  // ================================
  const vermelhoVinho = getComputedStyle(document.documentElement)
    .getPropertyValue("--vermelho-vinho")
    .trim();
  const cinzaClaro = getComputedStyle(document.documentElement)
    .getPropertyValue("--cinza-claro")
    .trim();
  const verdePalestina = getComputedStyle(document.documentElement)
    .getPropertyValue("--verde-palestina")
    .trim();

  fetch("data/dados.json")
    .then((response) => response.json())
    .then((dados) => {
      new Chart(document.getElementById("chart1"), {
        type: "doughnut",
        data: {
          labels: ["Estereotipados", "Não estereotipados"],
          datasets: [
            {
              data: dados.chart1,
              backgroundColor: [vermelhoVinho, cinzaClaro],
            },
          ],
        },
        options: { responsive: true },
      });

      new Chart(document.getElementById("chart2"), {
        type: "line",
        data: {
          labels: ["2018", "2019", "2020", "2021"],
          datasets: [
            {
              label: "Estudos sobre colonialismo epistêmico",
              data: dados.chart2,
              backgroundColor: verdePalestina,
            },
          ],
        },
        options: { responsive: true },
      });

      new Chart(document.getElementById("chart3"), {
        type: "pie",
        data: {
          labels: ["Distorção Midiática", "Representação Correta"],
          datasets: [
            {
              data: dados.chart3,
              backgroundColor: [vermelhoVinho, cinzaClaro],
            },
          ],
        },
        options: { responsive: true },
      });
    })
    .catch((err) => console.error("Erro ao carregar os dados do JSON:", err));

  // ================================
  // CARROSSEL DE CITAÇÕES
  // ================================
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");
  let current = 0;

  const showSlide = (index) => {
    slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
  };

  if (slides.length > 0 && prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      current = (current - 1 + slides.length) % slides.length;
      showSlide(current);
    });

    nextBtn.addEventListener("click", () => {
      current = (current + 1) % slides.length;
      showSlide(current);
    });

    showSlide(current);
  }
});
