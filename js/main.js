(function () {
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
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
