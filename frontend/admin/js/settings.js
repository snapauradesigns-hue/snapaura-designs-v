const form = document.getElementById("settingsForm");

async function loadSettings() {
  try {
    const result = await api.get("/settings");

    const s = result.data;

    websiteName.value = s.websiteName || "";

    phone.value = s.phone || "";

    email.value = s.email || "";

    instagram.value = s.instagram || "";

    facebook.value = s.facebook || "";

    linkedin.value = s.linkedin || "";

    whatsapp.value = s.whatsapp || "";

    footerText.value = s.footerText || "";
  } catch (e) {
    showToast(e.message, "error");
  }
}

loadSettings();
form.addEventListener(
  "submit",

  async (e) => {
    e.preventDefault();

    try {
      await api.put(
        "/settings",

        JSON.stringify({
          websiteName: websiteName.value,

          phone: phone.value,

          email: email.value,

          instagram: instagram.value,

          facebook: facebook.value,

          linkedin: linkedin.value,

          whatsapp: whatsapp.value,

          footerText: footerText.value,
        }),
      );

      showToast("Settings Saved");
    } catch (err) {
      showToast(
        err.message,

        "error",
      );
    }
  },
);
