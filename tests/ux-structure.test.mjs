import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const js = readFileSync(new URL("../app.js", import.meta.url), "utf8");

assert.match(html, /class="flow-steps"/, "renders the setup/play/finish flow steps");
assert.match(html, /id="selection-summary"/, "renders the current selection summary");
assert.match(html, /id="preview-phase"/, "renders a preview phase label");
assert.match(html, /id="next-action-hint"/, "renders next-action guidance after completion");

assert.match(js, /selectionSummary/, "updates the selection summary from app state");
assert.match(js, /startButton\.textContent/, "updates start button copy from app state");
assert.match(js, /nextActionHint/, "updates next-action guidance from app state");
