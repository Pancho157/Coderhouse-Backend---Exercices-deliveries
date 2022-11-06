async function login() {
  const userName = document.getElementById("name").value;
  const userPass = document.getElementById("userPass").value;
  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: userName, userPass: userPass }),
  });

  window.location.replace("/");
}
