async function registerUser() {
  const userEmail = document.getElementById("userEmail").value;
  const userAlias = document.getElementById("userAlias").value;
  const password = document.getElementById("password").value;
  const passwordConfirmation = document.getElementById("passConfirm").value;

  if (password != passwordConfirmation) {
  }

  const response = await fetch("http://localhost:3000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userEmail: userEmail,
      userAlias: userAlias,
      userPass: userPass,
    }),
  });
}
