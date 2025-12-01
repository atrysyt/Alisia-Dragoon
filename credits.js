/**
 * Helper: Create an element with optional class and text content
 */
function makeEl(tag, className = null, text = null) {
  const el = document.createElement(tag);
  if (className) el.classList.add(className);
  if (text) el.textContent = text;
  return el;
}

/**
 * Creates a single credit block.
 *
 * @param {string} title
 * @param {string} description
 * @param {string} attributionText
 * @param {string} source - URL string for the source link
 *
 * @returns {HTMLDivElement}
 */
function createCredit(title, description, attributionText, source) {
  const wrapper = makeEl("div", "credit-block");

  const titleEl = makeEl("div", "credit-title", title);
  const descEl = makeEl("div", "credit-description", description);
  const attribEl = makeEl("div", "attribution-text", attributionText);

  const sourceEl = document.createElement("a");
  sourceEl.href = source;
  sourceEl.className = "source-text";
  sourceEl.textContent = source;
  sourceEl.target = "_blank";
  sourceEl.rel = "noopener noreferrer";

  wrapper.appendChild(titleEl);
  wrapper.appendChild(descEl);
  wrapper.appendChild(sourceEl);
  wrapper.appendChild(attribEl);

  return wrapper;
}

/**
 * Helper: Append a credit to a target container
 *
 * @param {HTMLElement|string} target - Element or CSS selector
 * @param {object} data - { title, description, attributionText, source }
 */
function addCredit(target, data) {
  const container =
    typeof target === "string" ? document.querySelector(target) : target;

  if (!container) {
    console.error("addCredit: Target container not found:", target);
    return;
  }

  container.appendChild(
    createCredit(
      data.title,
      data.description,
      data.attributionText,
      data.source
    )
  );
}

/**
 * Section helpers
 * Allow targeting either the on-screen credits or information sources section
 */

const SECTION_SELECTORS = {
  "on-screen": "#on-screen-credits-body",
  information: "#information-sources-body",
};

/**
 * Adds a credit to a logical section.
 *
 * @param {"on-screen"|"information"} sectionKey
 * @param {object} data - { title, description, attributionText, source }
 */
function addCreditToSection(sectionKey, data) {
  const selector = SECTION_SELECTORS[sectionKey];
  if (!selector) {
    console.error("addCreditToSection: Unknown section key:", sectionKey);
    return;
  }
  addCredit(selector, data);
}

/**
 * Adds a subheader inside either the on-screen or information sources section.
 *
 * @param {"on-screen"|"information"} sectionKey
 * @param {string} text
 */
function addSubheader(sectionKey, text) {
  const selector = SECTION_SELECTORS[sectionKey];
  if (!selector) {
    console.error("addSubheader: Unknown section key:", sectionKey);
    return;
  }
  const container = document.querySelector(selector);
  if (!container) {
    console.error("addSubheader: Target container not found:", selector);
    return;
  }

  const sub = document.createElement("h3");
  sub.className = "subheader";
  sub.textContent = text;
  container.appendChild(sub);
}

/**
 * Theme Switcher for Credits Page
 *
 * Usage:
 *   switchCreditsTheme("base")
 *   switchCreditsTheme("high-contrast")
 *   switchCreditsTheme("accessible")
 */

const THEME_CLASSES = [
  "credits-theme-base",
  "credits-theme-high-contrast",
  "credits-theme-accessible",
];

/**
 * Switches the theme on a given wrapper element
 * @param {"base"|"high-contrast"|"accessible"} theme
 * @param {string} [wrapperSelector="body"] CSS selector of theme wrapper element
 */
function switchCreditsTheme(theme, wrapperSelector = "body") {
  const wrapper = document.querySelector(wrapperSelector);
  if (!wrapper) {
    console.error("Theme switcher error: wrapper not found:", wrapperSelector);
    return;
  }

  // Remove ALL theme classes first
  THEME_CLASSES.forEach((cls) => wrapper.classList.remove(cls));

  // Apply the selected one
  switch (theme) {
    case "base":
      wrapper.classList.add("credits-theme-base");
      break;
    case "high-contrast":
      wrapper.classList.add("credits-theme-high-contrast");
      break;
    case "accessible":
      wrapper.classList.add("credits-theme-accessible");
      break;
    default:
      console.warn("Unknown theme:", theme);
  }
}

/**
 * Sets the video name in the header (the subheader under ATRYS.YT)
 *
 * @param {string} name - The human-readable video title
 */
function setVideoName(name) {
  const el = document.querySelector(".video-title");
  if (!el) {
    console.error("setVideoName: Could not find .video-title element");
    return;
  }
  el.textContent = name;
}

/**
 * Attach theme buttons automatically
 * Buttons must have data-theme="base", "high-contrast", or "accessible"
 */
document.addEventListener("click", (ev) => {
  const btn = ev.target.closest("[data-theme]");
  if (!btn) return;

  const theme = btn.getAttribute("data-theme");
  switchCreditsTheme(theme);
});
