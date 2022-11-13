async function registerUser() {
  const newUserEmail = document.getElementById("register-email").value;
  const newUserAlias = document.getElementById("register-alias").value;
  const newUserPassword = document.getElementById("register-password").value;
  const passwordConfirmation = document.getElementById("passConfirm").value;

  const registerButton = document.getElementById("register-button");

  // if (!newUserPassword != passwordConfirmation || newUserPassword.length < 6) {
  //   registerButton.disabled = true;
  //   return renderErrorMessage(
  //     "La contraseña debe coincidir y tener por lo menos 6 caracteres"
  //   );
  // } else {
  //   registerButton.disabled = false;
  // }

  registerButton.disabled = false;

  const response = await fetch("http://localhost:3000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userEmail: newUserEmail,
      userAlias: newUserAlias,
      userPass: newUserPassword,
    }),
  });

  window.location.replace("/");
}
