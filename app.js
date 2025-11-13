// 30 Sekunden Klarheit – Vanilla JS App

(function () {
  const steps = [
    {
      id: 1,
      title: "Stopp. Atmen.",
      description:
        "Halte kurz inne. Atme dreimal tief ein und aus. Spüre, wie sich dein Körper beruhigt.",
    },
    {
      id: 2,
      title: "Realität statt Geschichte.",
      description:
        "Was ist wirklich passiert? Trenne die reinen Fakten von deiner Gedankenstory.",
    },
    {
      id: 3,
      title: "Kontrolle prüfen.",
      description:
        "Was kannst du beeinflussen? Und was liegt außerhalb deiner Kontrolle?",
    },
    {
      id: 4,
      title: "Nächster kleiner Schritt.",
      description:
        "Was ist der kleinste, einfache Schritt, den du jetzt tun kannst?",
    },
    {
      id: 5,
      title: "Fremdlast abgeben.",
      description:
        "Trägst du gerade Gedanken oder Verantwortung, die eigentlich nicht deine sind?",
    },
    {
      id: 6,
      title: "Jetzt oder alter Film?",
      description:
        "Ist das eine neue Situation – oder reagierst du mit einem alten Muster?",
    },
    {
      id: 7,
      title: "Klarer Abschluss.",
      description:
        "Was nimmst du heute mit? Wie willst du jetzt weitergehen?",
    },
  ];

  /** @type {"home" | number} */
  let currentScreen = "home";

  function render() {
    const app = document.getElementById("app");
    if (!app) return;

    if (currentScreen === "home") {
      renderHome(app);
    } else {
      renderStep(app, currentScreen);
    }
  }

  function renderHome(app) {
    app.innerHTML = `
      <div class="app">
        <header class="app-header">
          <h1 class="app-header__title">30 Sekunden Klarheit</h1>
        </header>

        <main class="app-main app-main--home">
          <section class="home-intro">
            <p class="subtitle">Guter Morgen.</p>
            <h2 class="headline">Nimm dir einen Moment nur für dich.</h2>
            <p class="subtitle">
              Sieben ruhige Schritte helfen dir, klarer zu sehen und bewusster in den Tag zu gehen.
            </p>
          </section>

          <section class="card">
            <h3 class="card-title">Wie es funktioniert</h3>
            <p class="section-text">
              Du gehst Frage für Frage durch und gibst dir selbst klare Antworten.
              Kein Druck, kein Muss – nur ein kurzer Check-in mit dir.
            </p>
          </section>

          <button class="primary-btn" type="button" data-action="start">
            Los geht’s
          </button>
        </main>
      </div>
    `;

    const startBtn = app.querySelector('[data-action="start"]');
    if (startBtn) {
      startBtn.addEventListener("click", () => {
        currentScreen = 1;
        render();
      });
    }
  }

  function renderStep(app, stepNumber) {
    const stepIndex = stepNumber - 1;
    const step = steps[stepIndex];
    const isLast = stepNumber === steps.length;

    const progressBars = steps
      .map((_, index) => {
        const activeClass = index < stepNumber ? "progress-bar--active" : "";
        return `<div class="progress-bar ${activeClass}"></div>`;
      })
      .join("");

    app.innerHTML = `
      <div class="app">
        <header class="app-header">
          <h1 class="app-header__title">Schritt ${stepNumber} von ${steps.length}</h1>
        </header>

        <main class="app-main app-main--steps">
          <div class="progress">
            ${progressBars}
          </div>

          <section class="card card--step">
            <h2 class="headline">${step.title}</h2>
            <p class="step-text">${step.description}</p>

            <div style="margin-top: 1.4rem;">
              <label class="textarea-label" for="reflection">
                Deine Gedanken (optional)
              </label>
              <textarea
                id="reflection"
                class="textarea"
                spellcheck="false"
                placeholder="Wenn du magst, schreib hier etwas auf …"
              ></textarea>
            </div>
          </section>

          <div class="nav-buttons">
            <button class="primary-btn" type="button" data-action="next">
              ${isLast ? "Fertig" : "Weiter"}
            </button>

            <button class="link-btn" type="button" data-action="home">
              Zurück zum Start
            </button>
          </div>
        </main>
      </div>
    `;

    const nextBtn = app.querySelector('[data-action="next"]');
    const homeBtn = app.querySelector('[data-action="home"]');

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        currentScreen = isLast ? "home" : stepNumber + 1;
        render();
      });
    }

    if (homeBtn) {
      homeBtn.addEventListener("click", () => {
        currentScreen = "home";
        render();
      });
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    render();

    // Service Worker Registrierung
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("service-worker.js")
        .catch((err) => {
          console.warn("Service Worker konnte nicht registriert werden:", err);
        });
    }
  });
})();/* truncated for brevity; full JS included earlier */
