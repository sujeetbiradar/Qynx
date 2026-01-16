async function send() {
  const input = document.getElementById("input");
  const messages = document.getElementById("messages");
  if (!input.value) return;

  messages.innerHTML += `<div class="msg user">You: ${input.value}</div>`;
  const msg = input.value;
  input.value = "";

  const res = await fetch("http://localhost:3000/chat", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ message: msg })
  });

  const data = await res.json();
  messages.innerHTML += `<div class="msg ai">Qynx: ${data.reply}</div>`;
  messages.scrollTop = messages.scrollHeight;
}
