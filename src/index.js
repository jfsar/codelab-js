import "./css/style.css";
import { PROJECTS } from "./constant/projects";

(function () {
  const savedTheme = localStorage.getItem("theme") || "dark";
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme =
    savedTheme === "system" ? (prefersDark ? "dark" : "light") : savedTheme;

  if (initialTheme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
})();

const THEMES = ["light", "dark"];
const DEFAULT_THEME = "light";

document.addEventListener("DOMContentLoaded", init);

function init() {
  initTheme();
  loadProjects();
}

function loadProjects() {
  const container = document.getElementById("projects-list");
  const fragment = document.createDocumentFragment();
  if (!container) return;

  PROJECTS.forEach((project) => {
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", project.liverUrl);
    linkElement.setAttribute("target", "_blank");
    linkElement.className =
      "relative flex flex-col items-stretch duration-300 ease-out p-7 sm:p-3 group rounded-2xl";
    linkElement.setAttribute("data-astro-cid-aid3sr62", "");
    linkElement.innerHTML = `
      <span
      class="absolute inset-0 z-20 block w-full h-full duration-300 ease-out bg-transparent border border-transparent border-dashed group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:border group-hover:border-neutral-300 dark:group-hover:border-neutral-600 group-hover:border-dashed rounded-2xl group-hover:bg-white dark:group-hover:bg-neutral-950"
      data-astro-cid-aid3sr62
    ></span>
    <span
      class="absolute inset-0 z-10 block w-full h-full duration-300 ease-out border border-dashed rounded-2xl border-neutral-300 dark:border-neutral-600 group-hover:translate-x-1 group-hover:translate-y-1"
      data-astro-cid-aid3sr62
    ></span>
    <span
      class="relative z-30 block duration-300 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1"
      data-astro-cid-aid3sr62
    >
      <span class="block w-full" data-astro-cid-aid3sr62>
        <img
          src="${project.imgUrl}"
          alt="Project One"
          class="w-full h-auto rounded-lg aspect-[16/9] object-cover"
          data-astro-cid-aid3sr62
        />
      </span>
      <span class="block w-full px-1 mt-5 mb-1 sm:mt-3" data-astro-cid-aid3sr62>
        <span
          class="flex items-center mb-0 text-base font-semibold tracking-tight text-neutral-900 dark:text-neutral-100"
          data-astro-cid-aid3sr62
        >
          <span data-astro-cid-aid3sr62>${project.title}</span>
          <svg
            class="group-hover:translate-x-0 group-hover:translate-y-0 -rotate-45 translate-y-1 -translate-x-1 w-2.5 h-2.5 stroke-current ml-1 transition-all ease-in-out duration-200 transform"
            viewBox="0 0 13 15"
            data-astro-cid-aid3sr62
          >
            <g
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
              stroke-linecap="round"
              stroke-linejoin="round"
              data-astro-cid-aid3sr62
            >
              <g
                transform="translate(0.666667, 2.333333)"
                stroke="currentColor"
                stroke-width="2.4"
                data-astro-cid-aid3sr62
              >
                <g data-astro-cid-aid3sr62>
                  <polyline
                    class="transition-all duration-200 ease-out opacity-0 delay-0 group-hover:opacity-100"
                    points="5.33333333 0 10.8333333 5.5 5.33333333 11"
                    data-astro-cid-aid3sr62
                  ></polyline>
                  <line
                    class="transition-all duration-200 ease-out transform -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-hover:ml-0"
                    x1="10.8333333"
                    y1="5.5"
                    x2="0.833333333"
                    y2="5.16666667"
                    data-astro-cid-aid3sr62
                  ></line>
                </g>
              </g>
            </g>
          </svg>
        </span>
        <span
          class="text-sm text-neutral-600 dark:text-neutral-400 block truncate"
          data-astro-cid-aid3sr62
        >
          ${project.description}
        </span>
      </span>
    </span>
    `;
    fragment.appendChild(linkElement);
  });

  container.appendChild(fragment);
}

function getStoredTheme() {
  try {
    const value = localStorage.getItem("theme");
    return THEMES.includes(value) ? value : null;
  } catch {
    return null;
  }
}

function setStoredTheme(value) {
  if (!THEMES.includes(value)) return;
  try {
    localStorage.setItem("theme", value);
  } catch {
    console.warn("Error in getting theme");
  }
}

function getSystemTheme() {
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : DEFAULT_THEME;
}

function applyTheme(theme, root = document.documentElement) {
  if (!THEMES.includes(theme)) return;
  THEMES.forEach((t) =>
    t === theme ? root.classList.add(t) : root.classList.remove(t),
  );
  syncIcon(theme);
}

function syncIcon(theme) {
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  const isDark = theme === "dark";
  const light = toggle.querySelector(".theme-icon-light");
  const dark = toggle.querySelector(".theme-icon-dark");

  if (light)
    isDark ? light.classList.add("hidden") : light.classList.remove("hidden");
  if (dark)
    isDark ? dark.classList.remove("hidden") : dark.classList.add("hidden");
}

function initTheme() {
  const theme = getStoredTheme() ?? getSystemTheme();
  applyTheme(theme);
  bindToggle();
  return watchSystemTheme();
}

function bindToggle() {
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    const current = getStoredTheme() ?? getSystemTheme();
    const next = current === "dark" ? "light" : "dark";
    setStoredTheme(next);
    applyTheme(next);
  });
}

function watchSystemTheme() {
  const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
  if (!mq) return () => {};

  const handler = (e) => {
    if (!getStoredTheme()) applyTheme(e.matches ? "dark" : DEFAULT_THEME);
  };

  mq.addEventListener("change", handler);
  return () => mq.removeEventListener("change", handler);
}
