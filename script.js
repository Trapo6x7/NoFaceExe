const DOWNLOAD_URLS = {
  setup: "https://github.com/Trapo6x7/NoFaceExe/releases/download/v1.1.0/NOFACE.EXE-Setup-1.1.0-x64.exe",
  portable: "https://github.com/Trapo6x7/NoFaceExe/releases/download/v1.1.0/NOFACE.EXE-Portable-1.1.0-x64.exe",
};

const TRANSLATIONS = {
  fr: {
    description: "NOFACE.EXE anonymise localement les visages dans vos photos et vidéos.",
    aboutLabel: "À propos",
    closeLabel: "Fermer",
    switchLabel: "Passer le site en anglais",
    install: "Installer NOFACE.EXE",
    portable: "Version portable",
    desktopDownloadNotice:
      "NOFACE.EXE est disponible sur Windows. Ouvrez cette page depuis un ordinateur pour le télécharger.",
    tagline: "LOCAL - ANONYME - GRATUIT",
    gestureTitle: "Le geste",
    gestureBody:
      "Un logiciel qui rend les visages illisibles. Une application autonome dont l’unique but est l’anonymisation.",
    conceptTitle: "Le concept : l’opacité comme droit",
    conceptBody:
      "NOFACE.EXE détourne les outils de reconnaissance faciale pour soustraire plutôt qu’identifier. " +
      "Le projet prolonge, dans le champ numérique, le « droit à l’opacité » formulé par Édouard Glissant : " +
      "le droit de ne pas être entièrement identifiable, explicable ou réductible aux catégories d’un système. " +
      "Il affirme le droit de ne pas être réduit à une donnée. Une foule devient ainsi sujet anonymisé, " +
      "hors des logiques d’entraînement.",
    pixelTitle: "Le pixel comme signe",
    pixelBody:
      "La pixellisation ne cherche pas à effacer complètement les visages : elle maintient visible la trace " +
      "de leur présence tout en retirant ce qui permettrait de les identifier. Le pixel devient ainsi un signe " +
      "d’anonymisation, indiquant qu’une identité a volontairement été soustraite au regard. Répété sur une foule, " +
      "ce traitement transforme chaque visage en abstraction graphique et fait basculer la photographie documentaire vers le motif.",
    escapeTitle: "Ce qui échappe",
    escapeBody:
      "La détection automatique reste imparfaite : certains visages échappent au modèle en raison de l’angle, " +
      "de la lumière, du mouvement, de la résolution ou des biais contenus dans ses données d’entraînement. " +
      "NOFACE.EXE ne dissimule pas ces erreurs, mais les rend visibles et permet à l’utilisateur de compléter " +
      "manuellement le traitement. Ce geste réintroduit une décision humaine dans le processus automatisé et " +
      "rappelle qu’aucun système de vision n’est neutre, exhaustif ou infaillible.",
    politicsTitle: "La position politique du fichier",
    politicsBody:
      "Tout le traitement s’effectue localement, sans envoi vers un serveur ni stockage distant : les images " +
      "restent sur l’appareil de l’utilisateur. Ce choix technique devient une position politique, puisque " +
      "l’anonymat repose sur l’absence même de collecte. L’esthétique Windows datée prolonge cette idée en " +
      "évoquant une époque où le logiciel restait un objet local, autonome, que l’on installait et possédait, " +
      "loin des plateformes, du cloud et de la surveillance permanente.",
  },
  en: {
    description: "NOFACE.EXE anonymizes faces locally in your photos and videos.",
    aboutLabel: "About",
    closeLabel: "Close",
    switchLabel: "Switch the site to French",
    install: "Install NOFACE.EXE",
    portable: "Portable version",
    desktopDownloadNotice:
      "NOFACE.EXE is available for Windows. Open this page on a computer to download it.",
    tagline: "LOCAL - ANONYMOUS - FREE",
    gestureTitle: "The gesture",
    gestureBody:
      "Software that renders faces unreadable. A standalone application whose sole purpose is anonymization.",
    conceptTitle: "The concept: opacity as a right",
    conceptBody:
      "NOFACE.EXE repurposes facial recognition tools to subtract rather than identify. " +
      "The project extends Édouard Glissant’s “right to opacity” into the digital realm: the right not to be fully " +
      "identifiable, explainable, or reducible to a system’s categories. It asserts the right not to be reduced to data. " +
      "A crowd thus becomes an anonymized subject, beyond the logic of model training.",
    pixelTitle: "The pixel as a sign",
    pixelBody:
      "Pixelation does not seek to erase faces completely: it preserves a visible trace of their presence while " +
      "removing what could make them identifiable. The pixel thus becomes a sign of anonymization, indicating that " +
      "an identity has deliberately been withheld from view. Repeated across a crowd, this treatment turns each face " +
      "into a graphic abstraction and shifts documentary photography toward pattern.",
    escapeTitle: "What escapes",
    escapeBody:
      "Automatic detection remains imperfect: some faces escape the model because of angle, lighting, motion, " +
      "resolution, or biases in its training data. NOFACE.EXE does not hide these errors. It makes them visible and " +
      "allows the user to complete the process manually. This gesture reintroduces human judgment into the automated " +
      "process and reminds us that no vision system is neutral, exhaustive, or infallible.",
    politicsTitle: "The file as a political stance",
    politicsBody:
      "All processing happens locally, with nothing sent to a server or stored remotely: images remain on the user’s device. " +
      "This technical choice becomes a political stance, because anonymity rests on the very absence of data collection. " +
      "The dated Windows aesthetic extends this idea by evoking an era when software was a local, standalone object that " +
      "one installed and owned, far from platforms, the cloud, and permanent surveillance.",
  },
};

function applyLanguage(language) {
  const normalizedLanguage = language in TRANSLATIONS ? language : "en";
  const translations = TRANSLATIONS[normalizedLanguage];

  document.documentElement.lang = normalizedLanguage;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = translations[element.dataset.i18n];
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", translations[element.dataset.i18nAriaLabel]);
  });

  document.querySelectorAll("[data-i18n-content]").forEach((element) => {
    element.setAttribute("content", translations[element.dataset.i18nContent]);
  });

  const languageToggle = document.querySelector("[data-language-toggle]");

  if (languageToggle) {
    languageToggle.textContent = normalizedLanguage === "fr" ? "EN" : "FR";
    languageToggle.lang = normalizedLanguage === "fr" ? "en" : "fr";
    languageToggle.setAttribute("aria-label", translations.switchLabel);
  }

  return normalizedLanguage;
}

document.querySelectorAll("[data-download]").forEach((link) => {
  link.href = DOWNLOAD_URLS[link.dataset.download];
});

function renderPixelatedLabels() {
  document.querySelectorAll(".download").forEach((element) => {
    element.dataset.pixelLabel = element.textContent.trim();
    element.querySelector(".pixelated-label")?.remove();

    const bounds = element.getBoundingClientRect();
    const styles = window.getComputedStyle(element);
    const pixelSize = 4;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) return;

    canvas.width = Math.max(1, Math.round(bounds.width / pixelSize));
    canvas.height = Math.max(1, Math.round(bounds.height / pixelSize));
    canvas.className = "pixelated-label";
    canvas.setAttribute("aria-hidden", "true");

    context.setTransform(1 / pixelSize, 0, 0, 1 / pixelSize, 0, 0);
    context.fillStyle = styles.color;
    context.font = `${styles.fontWeight} ${styles.fontSize} ${styles.fontFamily}`;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(element.dataset.pixelLabel, bounds.width / 2, bounds.height / 2);

    element.append(canvas);
    element.classList.add("has-pixelated-label");
  });
}

let currentLanguage = "en";
renderPixelatedLabels();

document.querySelector("[data-language-toggle]")?.addEventListener("click", () => {
  currentLanguage = applyLanguage(currentLanguage === "fr" ? "en" : "fr");
  renderPixelatedLabels();
});

const year = document.querySelector("[data-year]");

if (year) {
  year.textContent = new Date().getFullYear();
}

const modal = document.querySelector("[data-modal]");
const modalOpen = document.querySelector("[data-modal-open]");
const modalCloseButtons = document.querySelectorAll("[data-modal-close]");
let previousFocus;

function openModal() {
  previousFocus = document.activeElement;
  modal.hidden = false;
  document.body.classList.add("modal-open");
  modal.querySelector("[data-modal-close]").focus();
}

function closeModal() {
  modal.hidden = true;
  document.body.classList.remove("modal-open");
  previousFocus?.focus();
}

modalOpen?.addEventListener("click", openModal);
modalCloseButtons.forEach((button) => button.addEventListener("click", closeModal));

modal?.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal && !modal.hidden) closeModal();
});

const appWindow = document.querySelector("[data-window]");
const dragHandle = document.querySelector("[data-drag-handle]");
let dragState;

function moveWindow(clientX, clientY) {
  const maxLeft = Math.max(0, window.innerWidth - appWindow.offsetWidth);
  const maxTop = Math.max(0, window.innerHeight - appWindow.offsetHeight);
  const left = Math.min(Math.max(0, clientX - dragState.offsetX), maxLeft);
  const top = Math.min(Math.max(0, clientY - dragState.offsetY), maxTop);

  appWindow.style.left = `${left}px`;
  appWindow.style.top = `${top}px`;
}

dragHandle?.addEventListener("pointerdown", (event) => {
  if (event.pointerType === "mouse" && event.button !== 0) return;
  if (event.target.closest("button")) return;

  const bounds = appWindow.getBoundingClientRect();
  dragState = {
    pointerId: event.pointerId,
    offsetX: event.clientX - bounds.left,
    offsetY: event.clientY - bounds.top,
  };

  appWindow.style.position = "fixed";
  appWindow.style.width = `${bounds.width}px`;
  appWindow.style.left = `${bounds.left}px`;
  appWindow.style.top = `${bounds.top}px`;
  appWindow.style.margin = "0";
  dragHandle.classList.add("dragging");
  dragHandle.setPointerCapture(event.pointerId);
});

dragHandle?.addEventListener("pointermove", (event) => {
  if (!dragState || event.pointerId !== dragState.pointerId) return;
  moveWindow(event.clientX, event.clientY);
});

function stopDragging(event) {
  if (!dragState || event.pointerId !== dragState.pointerId) return;
  dragHandle.classList.remove("dragging");
  dragState = undefined;
}

dragHandle?.addEventListener("pointerup", stopDragging);
dragHandle?.addEventListener("pointercancel", stopDragging);

window.addEventListener("resize", () => {
  renderPixelatedLabels();

  if (appWindow?.style.position !== "fixed") return;

  const bounds = appWindow.getBoundingClientRect();
  const maxLeft = Math.max(0, window.innerWidth - bounds.width);
  const maxTop = Math.max(0, window.innerHeight - bounds.height);
  appWindow.style.left = `${Math.min(Math.max(0, bounds.left), maxLeft)}px`;
  appWindow.style.top = `${Math.min(Math.max(0, bounds.top), maxTop)}px`;
});
