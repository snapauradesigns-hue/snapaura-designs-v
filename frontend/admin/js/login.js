const API = window.API;
exports.login = async (req, res) => {
  try {
    console.log("LOGIN BODY:", req.body);

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    console.log("USER FOUND:", !!user);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials"
      });
    }

    const match = await bcrypt.compare(password, user.password);

    console.log("PASSWORD MATCH:", match);

    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials"
      });
    }

    // ...rest of your code
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  console.log("Submitting login...");
  console.log(API);

  try {
    const response = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    console.log("HTTP Status:", response.status);

    const result = await response.json();

    console.log(result);
  } catch (err) {
    console.error("FETCH ERROR:", err);
  }
});
