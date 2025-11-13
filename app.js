      const steps = [
  {
    title: "Stopp. Atmen.",
    text: "Halte inne. Nimm drei tiefe Atemzüge. Spüre, wie sich dein Körper entspannt.",
  },
  {
    title: "Realität statt Geschichte.",
    text: "Was ist wirklich passiert? Trenne Fakten von deiner Interpretation.",
  },
  {
    title: "Kontrolle prüfen.",
    text: "Was kann ich beeinflussen? Was liegt außerhalb meiner Kontrolle?",
  },
  {
    title: "Nächster kleiner Schritt.",
    text: "Was ist die kleinste Handlung, die ich jetzt tun kann?",
  },
  {
    title: "Fremdlast abgeben.",
    text: "Trage ich etwas, das nicht meine Verantwortung ist?",
  },
  {
    title: "Jetzt vs alter Film.",
    text: "Ist das eine neue Situation oder spiele ich ein altes Muster ab?",
  },
  {
    title: "Klarer Abschluss.",
    text: "Was habe ich gelernt? Wie gehe ich weiter?",
  },
];

let screen = "home";
let currentStep = 0;

function render() {
  const app = document.getElementById("app");

  if (screen === "home") {
    app.innerHTML = `
      <div class="app">

        <div class="header">Kompass der Eigenverantwortung</div>

        <div class="main">

          <div class="title-center">30 Sekunden Klarheit</div>

          <div class="headline">
            In sieben kurzen Schritten zu mehr Selbstverantwortung und Klarheit.
          </div>

          <div class="card">
            <div class="card-title">Wie es funktioniert</div>
            <div class="card-text">
              Dieser Kompass führt dich durch sieben Fragen, die dir helfen, in herausfordernden Momenten Klarheit zu gewinnen und eigenverantwortlich zu handeln.
            </div>
          </div>

          <button class="button" onclick="start()">Klarheit jetzt</button>

          <a class="link" href="#">Mehr über den Kompass</a>

        </div>
      </div>
    `;
  }

  if (screen === "step") {
    const step = steps[currentStep];

    app.innerHTML = `
      <div class="app">

        <div class="header">Schritt ${currentStep + 1} von 7</div>

        <div class="main">

          <div class="progress">
            ${steps
              .map(
                (_, i) =>
                  `<div class="progress-dot ${
                    i <= currentStep ? "active" : ""
                  }"></div>`
              )
              .join("")}
          </div>

          <div class="step-card">

            <div class="step-title">${step.title}</div>

            <div class="step-text">${step.text}</div>

            <textarea
              class="textarea"
              placeholder="Deine Gedanken dazu… (optional)"
            ></textarea>

          </div>

          <button class="button" onclick="nextStep()">
            ${currentStep === 6 ? "Fertig" : "Weiter"}
          </button>

          <a class="link" onclick="goHome()">Zurück zum Start</a>

        </div>
      </div>
    `;
  }
}

/* ===== LOGIC ===== */

function start() {
  currentStep = 0;
  screen = "step";
  render();
}

function nextStep() {
  if (currentStep === steps.length - 1) {
    goHome();
  } else {
    currentStep++;
    render();
  }
}

function goHome() {
  screen = "home";
  currentStep = 0;
  render();
}

document.addEventListener("DOMContentLoaded", render);
