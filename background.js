chrome.runtime.onMessage.addListener((message) => {
  chrome.storage.local.get(["gistId", "token"], (result) => {
    const gistId = result.gistId;
    const token = result.token;
    if (gistId && token) {
      updateGist(message.title, message.url, gistId, token);
    }
  });
});

async function updateGist(title, url, gistId, token) {
  const headers = new Headers();
  headers.append("Authorization", `token ${token}`);
  headers.append("Content-Type", "application/json");

  const response = await fetch(`https://api.github.com/gists/${gistId}`, {
    method: "GET",
    headers: headers,
  });

  const gist = await response.json();
  const content = gist.files["articles-ive-read.md"].content;

  const updatedContent = `- [${title}](${url})\n` + content;

  const body = JSON.stringify({
    files: {
      "articles-ive-read.md": {
        content: updatedContent,
      },
    },
  });

  await fetch(`https://api.github.com/gists/${gistId}`, {
    method: "PATCH",
    headers: headers,
    body: body,
  });
}
