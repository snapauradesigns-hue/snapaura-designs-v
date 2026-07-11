const form = document.getElementById("contact-form");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    console.log("✅ Form Submitted");

    const submitBtn = form.querySelector("button[type='submit']");
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    const formData = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      service: form.service.value,
      budget: form.budget.value,
      message: form.message.value,
    };

    console.log("📦 Sending:", formData);

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("Response Status:", response.status);

      const result = await response.json();

      console.log("Response:", result);

      if (result.success) {
        alert("✅ Thank you! Your inquiry has been sent successfully.");
        form.reset();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error(error);
      alert("❌ Server connection failed.");
    }

    submitBtn.disabled = false;
    submitBtn.textContent = "Send Inquiry";
  });
}
