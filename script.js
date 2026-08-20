const DOWNLOAD_URLS = {
  setup: "https://github.com/Trapo6x7/nofaceexe/releases/download/v1.2.2/noface.exe-Setup-1.2.2-x64.exe",
  portable: "https://github.com/Trapo6x7/nofaceexe/releases/download/v1.2.2/noface.exe-Portable-1.2.2-x64.exe",
};

const TRANSLATIONS = {
  fr: {
    description: "noface.exe",
    aboutLabel: "À propos",
    closeLabel: "Fermer",
    switchLabel: "Passer le site en anglais",
    install: "Installer noface.exe",
    portable: "Version portable",
    desktopDownloadNotice:
      "noface.exe est disponible sur Windows. \n Ouvrez cette page depuis un ordinateur pour le télécharger.",
    tagline: "LOCAL - ANONYME - GRATUIT",
    gestureTitle: "Le geste",
    gestureBody:
      "Un logiciel qui rend les visages illisibles. Une application autonome dont l’unique but est l’anonymisation.",
    conceptTitle: "Le concept : l’opacité comme droit",
    conceptBody:
      "noface.exe détourne les outils de reconnaissance faciale pour soustraire plutôt qu’identifier. " +
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
      "noface.exe ne dissimule pas ces erreurs, mais les rend visibles et permet à l’utilisateur de compléter " +
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
    description: "noface.exe",
    aboutLabel: "About",
    closeLabel: "Close",
    switchLabel: "Switch the site to French",
    install: "Install noface.exe",
    portable: "Portable version",
    desktopDownloadNotice:
      "noface.exe is available for Windows. \n Open this page on a computer to download it.",
    tagline: "LOCAL - ANONYMOUS - FREE",
    gestureTitle: "The gesture",
    gestureBody:
      "Software that renders faces unreadable. A standalone application whose sole purpose is anonymization.",
    conceptTitle: "The concept: opacity as a right",
    conceptBody:
      "noface.exe repurposes facial recognition tools to subtract rather than identify. " +
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
      "resolution, or biases in its training data. noface.exe does not hide these errors. It makes them visible and " +
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
    const lines = translations[element.dataset.i18n].split("\n");

    element.replaceChildren();
    lines.forEach((line, index) => {
      if (index > 0) element.append(document.createElement("br"));
      element.append(line.trimStart());
    });
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

const downloadModal = document.querySelector("[data-download-modal]");
const downloadModalCloseButtons = document.querySelectorAll("[data-download-modal-close]");
let downloadModalPreviousFocus;

function isMobileOrTabletDevice() {
  const userAgent = navigator.userAgent;
  const isIPadOS = navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;

  return (
    navigator.userAgentData?.mobile === true ||
    /Android|iPhone|iPad|iPod|Mobile|Tablet|Silk|Kindle/i.test(userAgent) ||
    isIPadOS
  );
}

function openDownloadModal(event) {
  if (!isMobileOrTabletDevice() || !downloadModal) return;

  event.preventDefault();
  downloadModalPreviousFocus = event.currentTarget;
  downloadModal.hidden = false;
  document.body.classList.add("modal-open");
  renderPixelatedLabels();
  downloadModal.querySelector("[data-download-modal-close]").focus();
}

function closeDownloadModal() {
  if (!downloadModal) return;

  downloadModal.hidden = true;
  document.body.classList.remove("modal-open");
  downloadModalPreviousFocus?.focus();
}

document.querySelectorAll("[data-download]").forEach((link) => {
  link.addEventListener("click", openDownloadModal);
});

downloadModalCloseButtons.forEach((button) => {
  button.addEventListener("click", closeDownloadModal);
});

downloadModal?.addEventListener("click", (event) => {
  if (event.target === downloadModal) closeDownloadModal();
});

function renderPixelatedLabels() {
  document.querySelectorAll(".download, .modal-ok-button").forEach((element) => {
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
const modalBody = modal?.querySelector(".intent-modal-body");
let previousFocus;
let modalPixelRenderId = 0;

function renderModalPixelation() {
  if (!modalBody || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  const bounds = modalBody.getBoundingClientRect();
  if (!bounds.width || !bounds.height) return;

  const renderId = ++modalPixelRenderId;
  const pixelSize = 6;
  const source = modalBody.cloneNode(true);
  source.querySelector(".modal-pixel-layer")?.remove();
  source.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");

  const sourceMarkup = new XMLSerializer().serializeToString(source);
  const sourceStyles = `
    * { box-sizing: border-box; }
    .intent-modal-body {
      width: ${bounds.width}px;
      height: ${bounds.height}px;
      overflow: hidden;
      padding: 20px 24px 12px;
      background: #f4f1e8ff;
      color: #000000;
      font-family: Tahoma, "MS Sans Serif", Arial, sans-serif;
    }
    section {
      margin: 0 0 18px;
    }
    h2 {
      margin: 0 0 5px;
      color: #000000;
      font-size: 13px;
    }
    p {
      margin: 0;
      color: #000000;
      font-size: 12px;
      line-height: 1.55;
    }
  `;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${bounds.width}" height="${bounds.height}">
      <style>${sourceStyles}</style>
      <foreignObject width="100%" height="100%">${sourceMarkup}</foreignObject>
    </svg>
  `;
  const image = new Image();

  image.addEventListener("load", () => {
    if (renderId !== modalPixelRenderId) return;

    let canvas = modalBody.querySelector(".modal-pixel-layer");
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.className = "modal-pixel-layer";
      canvas.setAttribute("aria-hidden", "true");
      modalBody.append(canvas);
    }

    canvas.width = Math.max(1, Math.ceil(bounds.width / pixelSize));
    canvas.height = Math.max(1, Math.ceil(bounds.height / pixelSize));

    const context = canvas.getContext("2d");
    if (!context) return;

    context.imageSmoothingEnabled = false;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
  });

  image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function openModal() {
  previousFocus = document.activeElement;
  modal.hidden = false;
  document.body.classList.add("modal-open");
  renderPixelatedLabels();
  modal.querySelector("[data-modal-close]").focus();
  requestAnimationFrame(renderModalPixelation);
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

modalBody?.addEventListener("pointermove", (event) => {
  const canvas = modalBody.querySelector(".modal-pixel-layer");
  if (!canvas) return;

  const bounds = modalBody.getBoundingClientRect();
  canvas.style.setProperty("--pixel-y", `${event.clientY - bounds.top}px`);
  canvas.style.opacity = "1";
});

modalBody?.addEventListener("pointerleave", () => {
  const canvas = modalBody.querySelector(".modal-pixel-layer");
  if (canvas) canvas.style.opacity = "0";
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  if (modal && !modal.hidden) closeModal();
  if (downloadModal && !downloadModal.hidden) closeDownloadModal();
});

const appWindow = document.querySelector("[data-window]");
const dragHandle = document.querySelector("[data-drag-handle]");
const intentModal = modal?.querySelector(".intent-modal");
const intentModalDragHandle = intentModal?.querySelector(".intent-modal-header");

function makeDraggableWindow(windowElement, handle) {
  let dragState;

  if (!windowElement || !handle) return () => {};

  function clampToViewport() {
    if (windowElement.style.position !== "fixed") return;

    const bounds = windowElement.getBoundingClientRect();
    const maxLeft = Math.max(0, window.innerWidth - bounds.width);
    const maxTop = Math.max(0, window.innerHeight - bounds.height);
    windowElement.style.left = `${Math.min(Math.max(0, bounds.left), maxLeft)}px`;
    windowElement.style.top = `${Math.min(Math.max(0, bounds.top), maxTop)}px`;
  }

  handle.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if (event.target.closest("button")) return;

    const bounds = windowElement.getBoundingClientRect();
    dragState = {
      pointerId: event.pointerId,
      offsetX: event.clientX - bounds.left,
      offsetY: event.clientY - bounds.top,
    };

    windowElement.style.position = "fixed";
    windowElement.style.width = `${bounds.width}px`;
    windowElement.style.left = `${bounds.left}px`;
    windowElement.style.top = `${bounds.top}px`;
    windowElement.style.margin = "0";
    handle.classList.add("dragging");
    handle.setPointerCapture(event.pointerId);
  });

  handle.addEventListener("pointermove", (event) => {
    if (!dragState || event.pointerId !== dragState.pointerId) return;

    const maxLeft = Math.max(0, window.innerWidth - windowElement.offsetWidth);
    const maxTop = Math.max(0, window.innerHeight - windowElement.offsetHeight);
    const left = Math.min(Math.max(0, event.clientX - dragState.offsetX), maxLeft);
    const top = Math.min(Math.max(0, event.clientY - dragState.offsetY), maxTop);
    windowElement.style.left = `${left}px`;
    windowElement.style.top = `${top}px`;
  });

  function stopDragging(event) {
    if (!dragState || event.pointerId !== dragState.pointerId) return;
    handle.classList.remove("dragging");
    dragState = undefined;
  }

  handle.addEventListener("pointerup", stopDragging);
  handle.addEventListener("pointercancel", stopDragging);

  return clampToViewport;
}

const clampAppWindow = makeDraggableWindow(appWindow, dragHandle);
const clampIntentModal = makeDraggableWindow(intentModal, intentModalDragHandle);

window.addEventListener("resize", () => {
  renderPixelatedLabels();
  if (modal && !modal.hidden) renderModalPixelation();
  clampAppWindow();
  clampIntentModal();
});
