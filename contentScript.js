const overlayButton = document.createElement("button");
overlayButton.innerText = "Save Article";
overlayButton.style.position = "fixed";
overlayButton.style.bottom = "10px";
overlayButton.style.right = "10px";
overlayButton.style.zIndex = "9999";
overlayButton.style.backgroundColor = "white";
overlayButton.style.border = "1px solid black";
overlayButton.style.padding = "5px";
overlayButton.style.borderRadius = "5px";

document.body.appendChild(overlayButton);

overlayButton.addEventListener("click", () => {
  const title = document.title;
  const url = window.location.href;

  chrome.runtime.sendMessage({ title, url });
});
