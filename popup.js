const gistIdInput = document.getElementById("gistId");
const tokenInput = document.getElementById("token");

chrome.storage.local.get(["gistId", "token"], (result) => {
  gistIdInput.value = result.gistId || "";
  tokenInput.value = result.token || "";
});

gistIdInput.addEventListener("blur", () => {
  chrome.storage.local.set({ gistId: gistIdInput.value });
});

tokenInput.addEventListener("blur", () => {
  chrome.storage.local.set({ token: tokenInput.value });
});
