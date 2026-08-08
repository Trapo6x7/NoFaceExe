const DOWNLOAD_URLS = {
  setup: "https://github.com/Trapo6x7/NoFaceExe/releases/download/v1.1.0/NOFACE.EXE-Setup-1.1.0-x64.exe",
  portable: "https://github.com/Trapo6x7/NoFaceExe/releases/download/v1.1.0/NOFACE.EXE-Portable-1.1.0-x64.exe",
};

document.querySelectorAll("[data-download]").forEach((link) => {
  link.href = DOWNLOAD_URLS[link.dataset.download];
});

function renderPixelatedLabels() {
  document.querySelectorAll(".download").forEach((element) => {
    element.dataset.pixelLabel ||= element.textContent.trim();
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

renderPixelatedLabels();

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
