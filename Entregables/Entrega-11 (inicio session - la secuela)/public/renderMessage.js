const errorMessage = document.getElementById("errorMessage");

function renderErrorMessage(error) {
  errorMessage.innerHTML = error;

  errorMessage.style.top = "100px";

  setTimeout(() => {
    errorMessage.style.top = "-100px";
  }, 2000);
}
