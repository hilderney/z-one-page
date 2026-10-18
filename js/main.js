(function () {
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");
  const ruler = document.querySelector(".header-ruler");
  const rulerLeft = document.querySelector("[data-ruler-left]");
  const rulerRight = document.querySelector("[data-ruler-right]");
  const sectionOrder = [
    ["sobre", "01"],
    ["servicos", "02"],
    ["projetos", "03"],
    ["contato", "04"],
  ];

  function setCurrentSection(id) {
    if (nav) {
      nav.querySelectorAll("a").forEach((link) => {
        if (id && link.getAttribute("href") === "#" + id) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    }
    const match = sectionOrder.find(([sectionId]) => sectionId === id);
    if (!match) {
      if (ruler) ruler.removeAttribute("data-section");
      if (rulerLeft) rulerLeft.textContent = "00";
      if (rulerRight) rulerRight.textContent = "";
      return;
    }
    const index = sectionOrder.indexOf(match);
    if (ruler) ruler.setAttribute("data-section", String(index + 1));
    if (rulerLeft) rulerLeft.textContent = "00";
    if (rulerRight) rulerRight.textContent = "SYS " + match[1];
  }

  function updateCurrentSection() {
    const stack = Number.parseFloat(
      getComputedStyle(document.documentElement).scrollPaddingTop
    );
    const line = (Number.isFinite(stack) ? stack : 0) + 8;
    let current = null;
    sectionOrder.forEach(([sectionId]) => {
      const section = document.getElementById(sectionId);
      if (!section) return;
      if (section.getBoundingClientRect().top <= line) current = sectionId;
    });
    setCurrentSection(current);
  }

  updateCurrentSection();
  window.addEventListener("scroll", updateCurrentSection, { passive: true });
  window.addEventListener("resize", updateCurrentSection);

  if (toggle && nav) {
    const label = toggle.querySelector(".nav-toggle-label");
    const menuLinks = () => [...nav.querySelectorAll("a")];

    function menuIsOverlay() {
      return getComputedStyle(toggle).display !== "none";
    }

    function closeMenu(restoreFocus) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      if (label) label.textContent = "Menu";
      if (restoreFocus) toggle.focus();
    }

    function openMenu() {
      nav.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      if (label) label.textContent = "Fechar";
      const first = menuLinks()[0];
      if (first) first.focus();
    }

    toggle.addEventListener("click", () => {
      if (nav.classList.contains("is-open")) closeMenu(false);
      else openMenu();
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu(false);
      });
    });

    document.addEventListener("keydown", (event) => {
      if (!nav.classList.contains("is-open") || !menuIsOverlay()) return;
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu(true);
        return;
      }
      if (event.key !== "Tab") return;
      const links = menuLinks();
      if (!links.length) return;
      const first = links[0];
      const last = links[links.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      } else if (!nav.contains(document.activeElement) && document.activeElement !== toggle) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      }
    });
  }

  const form = document.querySelector("[data-contact-form]");
  if (form) {
    const emailError = form.querySelector('[data-error="email"]');
    const phoneError = form.querySelector('[data-error="phone"]');
    const status = form.querySelector("[data-form-status]");
    const success = form.parentElement.querySelector("[data-form-success]");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (status) status.hidden = true;

      const data = new FormData(form);
      const email = String(data.get("email") || "").trim();
      const phone = String(data.get("phone") || "").trim();
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      const digits = phone.replace(/\D/g, "");
      const phoneOk = phone === "" || (digits.length >= 10 && digits.length <= 11);

      if (emailError) emailError.hidden = emailOk;
      if (phoneError) phoneError.hidden = phoneOk;
      if (!emailOk || !phoneOk) return;

      try {
        const response = await fetch(
          "https://formsubmit.co/ajax/zee.dash.one@gmail.com",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              name: String(data.get("name") || "").trim(),
              email,
              phone,
              message: String(data.get("message") || "").trim(),
            }),
          }
        );
        if (!response.ok) throw new Error("formsubmit");
        form.hidden = true;
        if (success) success.hidden = false;
      } catch (error) {
        if (status) status.hidden = false;
      }
    });
  }
})();
