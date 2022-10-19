async function login() {
  const userName = document.getElementById("name").value;
  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userName: userName }),
  });

  window.location.replace('/')
}
