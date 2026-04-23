import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const js = readFileSync(new URL("../app.js", import.meta.url), "utf8");
const css = readFileSync(new URL("../styles.css", import.meta.url), "utf8");

assert.match(html, /class="flow-steps"/, "renders the setup/play/finish flow steps");
assert.match(html, /id="selection-summary"/, "renders the current selection summary");
assert.match(html, /id="preview-phase"/, "renders a preview phase label");
assert.match(html, /id="next-action-hint"/, "renders next-action guidance after completion");

assert.match(js, /selectionSummary/, "updates the selection summary from app state");
assert.match(js, /startButton\.textContent/, "updates start button copy from app state");
assert.match(js, /nextActionHint/, "updates next-action guidance from app state");

assert.match(css, /--color-60:/, "defines the dominant 60% pastel color token");
assert.match(css, /--color-30:/, "defines the supporting 30% pastel color token");
assert.match(css, /--color-10:/, "defines the accent 10% color token");
assert.match(css, /--shadow-soft:/, "uses a softer visual treatment");
assert.match(css, /max-width: 1180px/, "keeps a Mac-sized content cap");
assert.match(css, /max-width: 820px/, "includes an iPad layout breakpoint");
assert.match(css, /max-width: 430px/, "includes an iPhone layout breakpoint");
