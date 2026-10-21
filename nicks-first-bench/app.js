(function () {
  const Q = QUIZ.questions;
  const $ = (id) => document.getElementById(id);
  const view = $("view");
  const LETTERS = "ABCDEFGH";

  const state = { i: 0, answers: {}, submitted: {} };

  // ---------- header ----------
  document.title = QUIZ.title;
  $("quizTitle").textContent = QUIZ.title;
  $("crumbBold").textContent = QUIZ.breadcrumb.bold;
  $("crumbRest").textContent = QUIZ.breadcrumb.rest;

  // ---------- helpers ----------
  const strip = (html) => {
    const d = document.createElement("div");
    d.innerHTML = html;
    return d.textContent;
  };
  const isCorrect = (n) => state.answers[n] === Q[n].answer;

  function toast(msg) {
    const t = $("toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => t.classList.remove("show"), 2200);
  }

  function go(n) {
    state.i = Math.max(0, Math.min(n, Q.length)); // Q.length = overview/results page
    if (window.speechSynthesis) speechSynthesis.cancel();
    render();
    window.scrollTo(0, 0);
  }

  // ---------- question view ----------
  function renderQuestion() {
    const i = state.i;
    const q = Q[i];
    const sub = !!state.submitted[i];
    const sel = state.answers[i];
    const fb = sub && QUIZ.showFeedback;

    view.innerHTML = "";
    view.className = "question";

    const label = document.createElement("p");
    label.className = "qlabel";
    label.textContent = `Question ${i + 1} of ${Q.length}`;

    const prompt = document.createElement("p");
    prompt.className = "prompt";
    prompt.innerHTML = q.prompt;

    const hr = document.createElement("hr");
    hr.className = "divider";

    const fs = document.createElement("fieldset");
    fs.className = "options";

    const submit = document.createElement("button");
    submit.className = "submit";

    q.options.forEach((text, k) => {
      const lab = document.createElement("label");
      lab.className = "option" + (sub ? " locked" : "");
      if (fb && k === q.answer) lab.classList.add("correct");
      else if (fb && k === sel) lab.classList.add("incorrect");

      const input = document.createElement("input");
      input.type = "radio";
      input.name = "q" + i;
      input.value = k;
      input.checked = sel === k;
      input.disabled = sub;
      input.addEventListener("change", () => {
        state.answers[i] = k;
        submit.disabled = false;
      });

      const letter = document.createElement("span");
      letter.className = "letter";
      letter.textContent = LETTERS[k] + ".";

      const span = document.createElement("span");
      span.className = "text";
      span.innerHTML = text;

      lab.append(input, letter, span);
      fs.append(lab);
    });

    const last = i === Q.length - 1;
    if (!sub) {
      submit.textContent = "SUBMIT";
      submit.disabled = sel === undefined;
    } else {
      submit.textContent = last ? "FINISH" : "NEXT";
    }
    submit.addEventListener("click", () => {
      if (!state.submitted[i]) {
        state.submitted[i] = true;
        if (QUIZ.showFeedback) render();
        else go(i + 1);
      } else {
        go(i + 1);
      }
    });

    const actions = document.createElement("div");
    actions.className = "actions";
    actions.append(submit);

    view.append(label, prompt, hr, fs, actions);

    if (fb) {
      const box = document.createElement("div");
      const ok = isCorrect(i);
      box.className = "feedback " + (ok ? "good" : "bad");
      box.innerHTML = ok
        ? "<strong>Correct!</strong>"
        : `<strong>Not quite.</strong> The answer is ${LETTERS[q.answer]}.`;
      if (q.explanation) {
        const p = document.createElement("p");
        p.textContent = q.explanation;
        box.append(p);
      }
      view.append(box);
    }
  }

  // ---------- overview / results ----------
  function renderResults() {
    const done = Object.keys(state.submitted).length;
    const score = Q.filter((_, n) => state.submitted[n] && isCorrect(n)).length;

    view.innerHTML = "";
    view.className = "question results";

    const h = document.createElement("h2");
    h.textContent = done === Q.length ? "Results" : "Overview";
    const s = document.createElement("p");
    s.className = "score";
    s.textContent =
      done === Q.length
        ? `You scored ${score} out of ${Q.length}.`
        : `${done} of ${Q.length} questions submitted.`;

    const ol = document.createElement("ol");
    Q.forEach((_, n) => {
      const li = document.createElement("li");
      const b = document.createElement("button");
      let tag;
      if (!state.submitted[n]) tag = '<span class="tag-none">Not answered</span>';
      else if (!QUIZ.showFeedback && done < Q.length) tag = '<span class="tag-none">Submitted</span>';
      else tag = isCorrect(n) ? '<span class="tag-correct">Correct</span>' : '<span class="tag-wrong">Incorrect</span>';
      b.innerHTML = `<span>Question ${n + 1}</span>${tag}`;
      b.addEventListener("click", () => go(n));
      li.append(b);
      ol.append(li);
    });

    const actions = document.createElement("div");
    actions.className = "actions";
    const retake = document.createElement("button");
    retake.className = "submit";
    retake.textContent = "RETAKE";
    retake.addEventListener("click", () => {
      state.answers = {};
      state.submitted = {};
      go(0);
    });
    actions.append(retake);

    view.append(h, s, ol, actions);
  }

  // ---------- drawer ----------
  function renderDrawer() {
    const list = $("drawerList");
    list.innerHTML = "";
    Q.forEach((_, n) => {
      const li = document.createElement("li");
      const b = document.createElement("button");
      if (n === state.i) b.className = "current";
      b.innerHTML = `<span>Question ${n + 1}</span><span class="dot${state.submitted[n] ? " done" : ""}"></span>`;
      b.addEventListener("click", () => {
        closeDrawer();
        go(n);
      });
      li.append(b);
      list.append(li);
    });
  }
  function openDrawer() {
    renderDrawer();
    $("drawer").classList.add("open");
    $("scrim").hidden = false;
  }
  function closeDrawer() {
    $("drawer").classList.remove("open");
    $("scrim").hidden = true;
  }

  // ---------- main render ----------
  function render() {
    if (state.i >= Q.length) renderResults();
    else renderQuestion();
    $("prevBtn").classList.toggle("hide", state.i === 0);
    $("nextBtn").classList.toggle("hide", state.i >= Q.length - 1);
  }

  // ---------- toolbar wiring ----------
  $("menuBtn").addEventListener("click", openDrawer);
  $("scrim").addEventListener("click", closeDrawer);
  $("homeBtn").addEventListener("click", () => go(0));
  $("overviewBtn").addEventListener("click", () => go(Q.length));
  $("crumbBtn").addEventListener("click", () => go(Q.length));
  $("prevBtn").addEventListener("click", () => go(state.i - 1));
  $("nextBtn").addEventListener("click", () => go(state.i + 1));
  $("printBtn").addEventListener("click", () => window.print());
  $("helpBtn").addEventListener("click", () => $("helpDialog").showModal());
  $("translateBtn").addEventListener("click", () => toast("Translation isn't set up for this quiz yet."));

  $("speakBtn").addEventListener("click", () => {
    if (!window.speechSynthesis) return toast("Read-aloud isn't supported in this browser.");
    if (speechSynthesis.speaking) return speechSynthesis.cancel();
    if (state.i >= Q.length) return;
    const q = Q[state.i];
    const text =
      strip(q.prompt) + ". " + q.options.map((o, k) => `${LETTERS[k]}. ${strip(o)}`).join(". ");
    speechSynthesis.speak(new SpeechSynthesisUtterance(text));
  });

  // ---------- keyboard ----------
  document.addEventListener("keydown", (e) => {
    if (e.target.closest && e.target.closest("dialog")) return;
    if (e.key === "Escape") return closeDrawer();
    if (e.key === "ArrowRight" && state.i < Q.length - 1) return go(state.i + 1);
    if (e.key === "ArrowLeft" && state.i > 0) return go(state.i - 1);
    if (state.i >= Q.length) return;
    const k = LETTERS.indexOf(e.key.toUpperCase());
    if (k > -1 && k < Q[state.i].options.length && !state.submitted[state.i]) {
      const input = view.querySelectorAll("input")[k];
      input.checked = true;
      input.dispatchEvent(new Event("change"));
    }
    if (e.key === "Enter" && e.target.tagName !== "BUTTON") {
      const btn = view.querySelector(".actions .submit");
      if (btn && !btn.disabled) btn.click();
    }
  });

  render();
})();
