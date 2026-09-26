document.getElementById("year").textContent = new Date().getFullYear();

const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const status = document.getElementById("form-status");
    const submitBtn = contactForm.querySelector("button[type=submit]");
    status.textContent = "Sending…";
    submitBtn.disabled = true;
    const data = Object.fromEntries(new FormData(contactForm));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      status.textContent = "Thank you — your message has been sent.";
      contactForm.reset();
    } catch (err) {
      status.textContent = "Something went wrong. Please try again in a moment.";
    } finally {
      submitBtn.disabled = false;
    }
  });
}
document.querySelector(".menu-btn").addEventListener("click", () => {
  const nav = document.querySelector(".site-header nav");
  const open = nav.style.display === "flex";
  nav.style.display = open ? "none" : "flex";
  if (!open) {
    nav.style.position = "absolute";
    nav.style.top = "78px";
    nav.style.left = "0";
    nav.style.right = "0";
    nav.style.padding = "20px 6vw";
    nav.style.background = "#f7f5ef";
    nav.style.flexDirection = "column";
    nav.style.alignItems = "flex-start";
    nav.style.borderBottom = "1px solid #dedbd1";
  }
});