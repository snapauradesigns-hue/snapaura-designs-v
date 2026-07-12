const API = window.API;
const form = document.getElementById("contact-form");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

   

    const submitBtn = form.querySelector("button[type='submit']");
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    const formValues = new FormData(form);

    const formData = {
      name: formValues.get("name"),
      email: formValues.get("email"),
      phone: formValues.get("phone"),
      service: formValues.get("service"),
      budget: formValues.get("budget"),
      message: formValues.get("message"),
    };

    console.log("📦 Sending:", formData);
    console.log("FORM DATA:", formData);
    try {
      const response = await fetch(`${API}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();

      console.log("Response:", result);
      if (result.success) {
        showToast("✅ Inquiry Sent");

        submitBtn.style.background = "#22c55e";
        submitBtn.textContent = "✓ Inquiry Sent";

        form.reset();

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = "Send Inquiry";
          submitBtn.style.background = "";
        }, 2000);
      } else {
        console.log("❌ API returned success = false");

        submitBtn.disabled = false;
        submitBtn.textContent = "Send Inquiry";

        showToast(result.message, "error");
      }
    } catch (error) {
      console.error(error);

      showToast("Server connection failed.", "error");

      submitBtn.disabled = false;
      submitBtn.textContent = "Send Inquiry";
      submitBtn.style.background = "";
    }
  });
}
