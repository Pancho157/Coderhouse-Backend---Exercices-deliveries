async function registerUser() {
  const userEmail = document.getElementById("userEmail").value;
  const userAlias = document.getElementById("userAlias").value;
  const password = document.getElementById("password").value;
  const passwordConfirmation = document.getElementById("passConfirm").value;

  const registerButton = document.getElementById("register-button");

  if (!password != passwordConfirmation || password.length < 6) {
    registerButton.disabled = true;
    return renderErrorMessage(
      "La contraseña debe coincidir y tener por lo menos 6 caracteres"
    );
  }

  registerButton.disabled = false;

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

  if (response.errorMessage) {
    return renderErrorMessage("La contraseña debe coincidir");
  }
}
