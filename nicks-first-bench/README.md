# nicks first bench

A small, dependency-free quiz page laid out like a classic online benchmark/assessment screen: teal title bar, grey toolbar, "Question X of Y", A–D radio answers, a Submit button that unlocks once you pick an answer, and Previous/Next tabs along the bottom.

## Run it

No build step. Either:

- double-click `index.html`, or
- serve the folder: `npx serve .` (or `python3 -m http.server`) and open the URL it prints.

## Change the questions

Everything lives in `questions.js`:

```js
{
  prompt: "Question text (simple HTML like <em> is OK)",
  options: ["A text", "B text", "C text", "D text"],
  answer: 2,              // 0 = A, 1 = B, 2 = C, 3 = D
  explanation: "Shown after Submit when showFeedback is true"
}
```

Set `showFeedback: false` for test mode (no right/wrong shown until the results page).

## Features

| Control | What it does |
| --- | --- |
| ☰ menu | Question list with answered/unanswered dots |
| Home | Back to question 1 |
| Briefcase / breadcrumb | Overview and score page |
| Translate | Placeholder (shows a notice) |
| Speaker | Reads the question and choices aloud (Web Speech API) |
| Printer | Prints just the question |
| ? | Help dialog |

Keyboard: **A–D** select, **Enter** submits, **← / →** move between questions.

## Files

```
index.html     page structure + icons
style.css      look and layout
questions.js   quiz content
app.js         behavior
```

## Deploy on GitHub Pages

1. Push this folder to a new GitHub repo.
2. Repo **Settings → Pages → Deploy from a branch → main / root**.
3. Your quiz will be live at `https://<you>.github.io/<repo>/`.
