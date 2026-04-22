const HISTORY_KEY = "mini-app-playground-history";
const AUDIO_CONTEXT_CLASS = window.AudioContext || window.webkitAudioContext;

const ageProfiles = {
  preschool: {
    label: "유아",
    design: [
      "한 번에 한 가지 행동만 보이게 하기",
      "큰 버튼과 큰 그림 중심 조작",
      "짧은 성공 경험을 빠르게 반복하기"
    ],
    tapTarget: 3,
    soundTarget: 4,
    stickerTarget: 5,
    patternTarget: 4,
    tapTileCount: 4
  },
  early: {
    label: "초등 저학년",
    design: [
      "규칙을 두 줄 안에서 설명하기",
      "반복할수록 조금씩 달라지는 구조",
      "점수보다 놀이 흐름을 먼저 보여주기"
    ],
    tapTarget: 5,
    soundTarget: 6,
    stickerTarget: 7,
    patternTarget: 6,
    tapTileCount: 5
  },
  upper: {
    label: "초등 고학년",
    design: [
      "직접 고르고 시도하는 선택지 주기",
      "조금 더 긴 목표와 기록 남기기",
      "만들기와 놀이를 함께 느끼게 하기"
    ],
    tapTarget: 7,
    soundTarget: 8,
    stickerTarget: 9,
    patternTarget: 8,
    tapTileCount: 6
  }
};

const topicProfiles = {
  dinosaur: {
    label: "공룡",
    color: "#7dbb67",
    accentStrong: "#d5efba",
    tapEmoji: ["🥚", "🦕", "🦴", "🌿", "🪨", "🦖"],
    soundEmoji: ["🦕", "🦴", "🌋", "🌿"],
    stickerBg: "linear-gradient(180deg, #d5efba, #8bbf67)",
    moods: [["탐험", "알과 화석 찾기"], ["숲", "초록빛 배경"], ["발견", "하나씩 열어보기"]],
    missions: {
      tap: "숨은 공룡 알을 찾아 탐험을 끝내기",
      sound: "공룡 퍼레이드 리듬 만들기",
      sticker: "공룡 정원을 완성하기",
      pattern: "공룡 발자국 포스터 채우기"
    }
  },
  space: {
    label: "우주",
    color: "#6fa8ff",
    accentStrong: "#bfd8ff",
    tapEmoji: ["⭐", "🚀", "🪐", "☄️", "🌙", "🌍"],
    soundEmoji: ["🚀", "⭐", "🪐", "🌙"],
    stickerBg: "linear-gradient(180deg, #17213e, #3b5ea8)",
    moods: [["별빛", "짙은 밤 배경"], ["발사", "빠른 반응 놀이"], ["행성", "큰 모양 중심"]],
    missions: {
      tap: "반짝이는 별을 찾아 비행 시작하기",
      sound: "우주 발사 신호 만들기",
      sticker: "행성 장면 꾸미기",
      pattern: "별자리 패턴 포스터 만들기"
    }
  },
  art: {
    label: "그림",
    color: "#f29f61",
    accentStrong: "#ffe0b2",
    tapEmoji: ["🎨", "🖍️", "🖌️", "🌈", "⭐", "🫧"],
    soundEmoji: ["🎨", "🖍️", "🌈", "✨"],
    stickerBg: "linear-gradient(180deg, #fff1d8, #f6c46d)",
    moods: [["색감", "따뜻한 팔레트"], ["재료", "붓과 크레용"], ["장식", "자유롭게 붙이기"]],
    missions: {
      tap: "반짝 색을 찾아 그림 시작하기",
      sound: "색깔 리듬 보드 만들기",
      sticker: "작은 전시장 장면 꾸미기",
      pattern: "컬러 패턴 카드 만들기"
    }
  },
  music: {
    label: "음악",
    color: "#b07cff",
    accentStrong: "#d6b6ff",
    tapEmoji: ["🎵", "🥁", "🎹", "🎶", "🎤", "🪇"],
    soundEmoji: ["🎵", "🥁", "🎹", "🎤"],
    stickerBg: "linear-gradient(180deg, #f2d7ff, #b07cff)",
    moods: [["리듬", "두드리고 반복하기"], ["무대", "보랏빛 조명"], ["합주", "패드 조합하기"]],
    missions: {
      tap: "같은 박자를 찾아 무대 열기",
      sound: "짧은 공연 한 곡 완성하기",
      sticker: "콘서트 무대 꾸미기",
      pattern: "리듬 패턴 보드 만들기"
    }
  },
  ocean: {
    label: "바다",
    color: "#41b9c7",
    accentStrong: "#94f1fb",
    tapEmoji: ["🐠", "🐬", "🪸", "🐚", "🌊", "🫧"],
    soundEmoji: ["🐬", "🌊", "🐠", "🫧"],
    stickerBg: "linear-gradient(180deg, #b9f4f7, #41b9c7)",
    moods: [["물결", "차분하게 흐르기"], ["탐험", "바닷속 발견"], ["거품", "동그란 반응"]],
    missions: {
      tap: "바닷속 친구를 찾아 구조하기",
      sound: "물결 소리 합주 만들기",
      sticker: "산호 장면 완성하기",
      pattern: "거품 패턴 포스터 만들기"
    }
  }
};

const appProfiles = {
  tap: {
    label: "색깔 탭",
    summary: "정답 타일 하나를 찾고 빠르게 누르는 짧은 반응형 미니 앱입니다.",
    features: [
      "정답 타일 한 개와 헷갈리는 타일 여러 개",
      "빠르게 반응하면 점수가 올라감",
      "주제에 따라 타일 그림이 바뀜"
    ],
    completion: {
      title: "탐험 배지 획득",
      badge: "탐험 완료",
      description: "숨은 목표를 모두 찾아 짧은 탐험을 끝냈습니다."
    }
  },
  sound: {
    label: "사운드 패드",
    summary: "여러 패드를 눌러 짧은 소리와 이모지 반응을 만드는 리듬형 미니 앱입니다.",
    features: [
      "패드를 누를 때마다 다른 소리 재생",
      "주제별 이모지 패드 구성",
      "짧은 반복으로 바로 즐길 수 있음"
    ],
    completion: {
      title: "리듬 배지 획득",
      badge: "연주 완성",
      description: "패드를 이어 눌러 짧은 공연 한 곡을 완성했습니다."
    }
  },
  sticker: {
    label: "스티커 씬",
    summary: "배경 위에 스티커를 하나씩 붙여 장면을 꾸미는 만들기형 미니 앱입니다.",
    features: [
      "주제 배경 위에 스티커 배치",
      "누를 때마다 다른 위치에 붙음",
      "완성 장면이 바로 눈에 보임"
    ],
    completion: {
      title: "꾸미기 배지 획득",
      badge: "장면 완성",
      description: "스티커를 모아 하나의 장면을 끝까지 꾸몄습니다."
    }
  },
  pattern: {
    label: "패턴 메이커",
    summary: "칸을 누를 때마다 모양과 색이 바뀌며 작은 패턴 화면을 만드는 앱입니다.",
    features: [
      "3x3 패턴 보드 즉시 생성",
      "누를 때마다 모양과 색이 순환",
      "주제 분위기에 맞는 기호 사용"
    ],
    completion: {
      title: "패턴 배지 획득",
      badge: "포스터 완성",
      description: "반복 무늬를 채워 작은 패턴 포스터를 완성했습니다."
    }
  }
};

const elements = {
  appTitle: document.getElementById("app-title"),
  appSummary: document.getElementById("app-summary"),
  featureList: document.getElementById("feature-list"),
  goalList: document.getElementById("goal-list"),
  ageList: document.getElementById("age-list"),
  moodBoard: document.getElementById("mood-board"),
  previewTitle: document.getElementById("preview-title"),
  previewInstruction: document.getElementById("preview-instruction"),
  previewBoard: document.getElementById("preview-board"),
  completionCard: document.getElementById("completion-card"),
  previewScore: document.getElementById("preview-score"),
  previewStatusBadge: document.getElementById("preview-status-badge"),
  previewStatus: document.getElementById("preview-status"),
  celebrationLayer: document.getElementById("celebration-layer"),
  startButton: document.getElementById("start-button"),
  resetButton: document.getElementById("reset-button"),
  difficultySlider: document.getElementById("difficulty-slider"),
  difficultyValue: document.getElementById("difficulty-value"),
  ageButtons: Array.from(document.querySelectorAll("[data-age]")),
  topicButtons: Array.from(document.querySelectorAll("[data-topic]")),
  appButtons: Array.from(document.querySelectorAll("[data-app]")),
  gateQuestion: document.getElementById("gate-question"),
  gateInput: document.getElementById("gate-input"),
  gateButton: document.getElementById("gate-button"),
  gateStatus: document.getElementById("gate-status"),
  parentSummaryPanel: document.getElementById("parent-summary-panel"),
  parentSummary: document.getElementById("parent-summary"),
  parentInsight: document.getElementById("parent-insight"),
  historyList: document.getElementById("history-list")
};

const state = {
  age: "preschool",
  topic: "dinosaur",
  app: "tap",
  difficulty: 1,
  score: 0,
  started: false,
  targetIndex: 0,
  placedCount: 0
};

let audioContext = null;
let parentGate = { left: 0, right: 0 };

function getAudioContext() {
  if (!AUDIO_CONTEXT_CLASS) {
    return null;
  }
  if (!audioContext) {
    audioContext = new AUDIO_CONTEXT_CLASS();
  }
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
  return audioContext;
}

function playTone({ frequency, duration, type = "sine", gain = 0.04, delay = 0 }) {
  const context = getAudioContext();
  if (!context) {
    return;
  }
  const oscillator = context.createOscillator();
  const gainNode = context.createGain();
  const startAt = context.currentTime + delay;
  const endAt = startAt + duration;

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startAt);
  gainNode.gain.setValueAtTime(0.0001, startAt);
  gainNode.gain.exponentialRampToValueAtTime(gain, startAt + 0.02);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, endAt);
  oscillator.connect(gainNode);
  gainNode.connect(context.destination);
  oscillator.start(startAt);
  oscillator.stop(endAt);
}

function playSuccess() {
  playTone({ frequency: 523.25, duration: 0.14, type: "triangle" });
  playTone({ frequency: 659.25, duration: 0.18, type: "triangle", delay: 0.07 });
}

function playSoftError() {
  playTone({ frequency: 220, duration: 0.14, type: "sawtooth", gain: 0.025 });
}

function playPadSound(index) {
  const notes = [261.63, 329.63, 392, 523.25];
  playTone({ frequency: notes[index % notes.length], duration: 0.18, type: "square", gain: 0.03 });
}

function renderList(container, items) {
  container.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    container.appendChild(li);
  });
}

function triggerCelebration() {
  elements.celebrationLayer.innerHTML = "";
  for (let index = 0; index < 10; index += 1) {
    const spark = document.createElement("span");
    spark.className = "spark";
    spark.style.setProperty("--spark-angle", `${index * 36}deg`);
    spark.style.background = index % 2 === 0 ? "#dd5f31" : "#f1c75b";
    elements.celebrationLayer.appendChild(spark);
  }
  window.setTimeout(() => {
    elements.celebrationLayer.innerHTML = "";
  }, 720);
}

function loadHistory() {
  try {
    const raw = window.localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveHistory() {
  if (!state.started && state.score === 0) {
    return;
  }
  const history = loadHistory();
  history.unshift({
    age: ageProfiles[state.age].label,
    topic: topicProfiles[state.topic].label,
    app: appProfiles[state.app].label,
    score: state.score
  });
  window.localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 5)));
}

function getTargetForCurrentApp() {
  const profile = ageProfiles[state.age];
  return {
    tap: profile.tapTarget,
    sound: profile.soundTarget,
    sticker: profile.stickerTarget,
    pattern: profile.patternTarget
  }[state.app];
}

function hasMeaningfulProgress() {
  return state.score > 0 || state.started;
}

function confirmStateChange(nextAction) {
  if (!hasMeaningfulProgress()) {
    nextAction();
    return;
  }

  const shouldProceed = window.confirm("지금 설정을 바꾸면 현재 놀이 진행 상태가 초기화됩니다. 계속할까요?");
  if (shouldProceed) {
    nextAction();
  }
}

function renderParentSummary() {
  const target = getTargetForCurrentApp();
  const ratio = target ? state.score / target : 0;
  elements.parentSummary.textContent =
    `${ageProfiles[state.age].label} · ${topicProfiles[state.topic].label} · ${appProfiles[state.app].label} 조합입니다. 최근 놀이 점수는 ${state.score}점이며 권장 목표는 ${target}점입니다.`;
  elements.parentInsight.textContent =
    ratio >= 1
      ? "현재 활동을 충분히 따라갔습니다. 다음에는 난이도를 올리거나 다른 미니 앱으로 넓혀도 됩니다."
      : ratio >= 0.6
        ? "현재 활동을 무리 없이 진행 중입니다. 같은 주제로 한 번 더 반복하면 성취감이 커질 수 있습니다."
        : "아직 탐색 단계입니다. 난이도를 낮추거나 스티커/사운드처럼 부담이 적은 앱으로 이어가는 편이 좋습니다.";

  const history = loadHistory();
  elements.historyList.innerHTML = "";
  if (!history.length) {
    renderList(elements.historyList, ["아직 저장된 놀이 기록이 없습니다."]);
    return;
  }

  history.forEach((entry, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${entry.age} · ${entry.topic} · ${entry.app} · ${entry.score}점`;
    elements.historyList.appendChild(li);
  });
}

function showCompletionCard() {
  const appProfile = appProfiles[state.app];
  const topicLabel = topicProfiles[state.topic].label;
  const ageLabel = ageProfiles[state.age].label;
  elements.completionCard.hidden = false;
  elements.completionCard.innerHTML = `
    <strong>${appProfile.completion.title}</strong>
    <span>${topicLabel} 주제에서 ${appProfile.completion.description}</span>
    <div class="badge-row">
      <span class="badge-pill">${appProfile.completion.badge}</span>
      <span class="badge-pill">${ageLabel}</span>
      <span class="badge-pill">${state.score}점 달성</span>
    </div>
  `;
}

function hideCompletionCard() {
  elements.completionCard.hidden = true;
  elements.completionCard.innerHTML = "";
}

function createParentGate() {
  parentGate = {
    left: Math.floor(Math.random() * 6) + 3,
    right: Math.floor(Math.random() * 4) + 2
  };
  elements.gateQuestion.textContent = `보호자 확인: ${parentGate.left} + ${parentGate.right} = ?`;
  elements.gateInput.value = "";
  elements.gateStatus.textContent = "보호자만 결과를 열 수 있습니다.";
  elements.parentSummaryPanel.hidden = true;
}

function unlockParentSummary() {
  const answer = Number(elements.gateInput.value.trim());
  if (answer !== parentGate.left + parentGate.right) {
    elements.gateStatus.textContent = "정답이 아닙니다. 보호자만 다시 시도해 주세요.";
    elements.parentSummaryPanel.hidden = true;
    return;
  }
  elements.gateStatus.textContent = "보호자 확인 완료.";
  elements.parentSummaryPanel.hidden = false;
  renderParentSummary();
}

function updateHeader() {
  const appProfile = appProfiles[state.app];
  const topicProfile = topicProfiles[state.topic];
  const ageProfile = ageProfiles[state.age];
  const targets = {
    tap: ageProfile.tapTarget,
    sound: ageProfile.soundTarget,
    sticker: ageProfile.stickerTarget,
    pattern: ageProfile.patternTarget
  };
  document.documentElement.style.setProperty("--accent", topicProfile.color);
  document.documentElement.style.setProperty("--accent-strong", topicProfile.accentStrong);
  document.documentElement.style.setProperty("--theme-glow", `${topicProfile.color}33`);
  document.documentElement.style.setProperty("--theme-glow-soft", `${topicProfile.accentStrong}66`);
  elements.appTitle.textContent = `${ageProfiles[state.age].label}용 ${topicProfile.label} ${appProfile.label}`;
  elements.appSummary.textContent = appProfile.summary;
  elements.previewTitle.textContent = `${topicProfile.label} 주제로 만든 ${appProfile.label}`;
  elements.previewScore.textContent = `점수 ${state.score}`;
  elements.previewStatusBadge.textContent = `난이도 ${state.difficulty}`;
  renderList(elements.featureList, [
    ...appProfile.features,
    `${topicProfile.label} 주제 색감과 이모지 적용`,
    `${state.difficulty}단계 기준의 반응 수 조절`
  ]);
  renderList(elements.goalList, [
    `${topicProfile.missions[state.app]}`,
    `이번 세션 목표: ${targets[state.app]}점 또는 ${targets[state.app]}회 반응`,
    state.age === "preschool"
      ? "짧게 끝내고 바로 다시 시작할 수 있게 설계"
      : state.age === "early"
        ? "한 번 더 해보며 패턴을 익히는 흐름"
        : "직접 선택하고 기록을 남기는 흐름"
  ]);
  renderList(elements.ageList, ageProfiles[state.age].design);
  elements.moodBoard.innerHTML = "";
  topicProfile.moods.forEach(([title, detail]) => {
    const chip = document.createElement("div");
    chip.className = "mood-chip";
    chip.innerHTML = `<strong>${title}</strong><span>${detail}</span>`;
    elements.moodBoard.appendChild(chip);
  });
}

function getTapTiles() {
  const items = [...topicProfiles[state.topic].tapEmoji];
  const count = Math.min(ageProfiles[state.age].tapTileCount + state.difficulty - 1, 6);
  const tiles = items.slice(0, Math.min(count, items.length));
  if (tiles.length < 4) {
    tiles.push(...items.slice(0, 4 - tiles.length));
  }
  return tiles.slice(0, 6);
}

function renderTapPreview() {
  const tiles = getTapTiles();
  const targetScore = ageProfiles[state.age].tapTarget;
  hideCompletionCard();
  state.targetIndex = Math.floor(Math.random() * tiles.length);
  elements.previewInstruction.textContent = `${topicProfiles[state.topic].missions.tap}. ${tiles[state.targetIndex]} 타일을 찾으면 점수가 올라갑니다.`;
  elements.previewBoard.innerHTML = "";

  tiles.forEach((item, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "preview-tile";
    button.textContent = item;
    if (index === state.targetIndex) {
      button.classList.add("is-target");
    }
    button.addEventListener("click", () => {
      if (!state.started) {
        return;
      }
      const isTarget = index === state.targetIndex;
      button.classList.add("is-hit");
      window.setTimeout(() => button.classList.remove("is-hit"), 220);
      if (isTarget) {
        state.score += 1;
        elements.previewStatus.textContent =
          state.score >= targetScore
            ? "목표 달성입니다. 탐험을 완성했어요."
            : "정답입니다. 다음 타일을 찾으세요.";
        playSuccess();
        triggerCelebration();
        elements.previewScore.textContent = `점수 ${state.score}`;
        if (state.score < targetScore) {
          renderTapPreview();
        } else {
          showCompletionCard();
        }
      } else {
        elements.previewStatus.textContent = "이번에는 다른 타일입니다.";
        playSoftError();
      }
    });
    elements.previewBoard.appendChild(button);
  });
}

function renderSoundPreview() {
  const items = topicProfiles[state.topic].soundEmoji;
  const targetScore = ageProfiles[state.age].soundTarget;
  hideCompletionCard();
  elements.previewInstruction.textContent = `${topicProfiles[state.topic].missions.sound}. 패드를 눌러 소리와 그림을 조합해 보세요.`;
  elements.previewBoard.innerHTML = "";

  items.forEach((item, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "sound-pad";
    button.innerHTML = `${item}<small>pad ${index + 1}</small>`;
    button.addEventListener("click", () => {
      if (!state.started) {
        return;
      }
      button.classList.add("is-hit");
      window.setTimeout(() => button.classList.remove("is-hit"), 220);
      playPadSound(index);
      state.score += 1;
      elements.previewScore.textContent = `점수 ${state.score}`;
      elements.previewStatus.textContent =
        state.score >= targetScore
          ? "짧은 연주가 완성됐습니다."
          : `${item} 패드를 눌렀습니다. 계속 조합해 보세요.`;
      if (state.score >= targetScore) {
        showCompletionCard();
      }
    });
    elements.previewBoard.appendChild(button);
  });
}

function renderStickerPreview() {
  const targetScore = ageProfiles[state.age].stickerTarget;
  hideCompletionCard();
  const scene = document.createElement("div");
  scene.className = "sticker-canvas";
  scene.style.background = topicProfiles[state.topic].stickerBg;

  const layer = document.createElement("div");
  layer.className = "sticker-scene";
  scene.appendChild(layer);

  elements.previewInstruction.textContent = `${topicProfiles[state.topic].missions.sticker}. 아래 스티커를 눌러 장면 위에 하나씩 붙여 보세요.`;
  elements.previewBoard.innerHTML = "";
  elements.previewBoard.appendChild(scene);

  topicProfiles[state.topic].tapEmoji.slice(0, 4).forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "sticker-piece";
    button.innerHTML = `${item}<small>sticker</small>`;
    button.addEventListener("click", () => {
      if (!state.started) {
        return;
      }
      const placed = document.createElement("span");
      placed.className = "placed-item";
      placed.textContent = item;
      placed.style.left = `${12 + ((state.placedCount * 17) % 68)}%`;
      placed.style.top = `${18 + ((state.placedCount * 13) % 56)}%`;
      layer.appendChild(placed);
      state.placedCount += 1;
      state.score += 1;
      button.classList.add("is-hit");
      window.setTimeout(() => button.classList.remove("is-hit"), 220);
      playSuccess();
      elements.previewScore.textContent = `점수 ${state.score}`;
      elements.previewStatus.textContent =
        state.score >= targetScore
          ? "장면이 완성됐습니다."
          : "스티커를 붙였습니다. 장면을 더 꾸며 보세요.";
      if (state.score >= targetScore) {
        showCompletionCard();
      }
    });
    elements.previewBoard.appendChild(button);
  });
}

function renderPatternPreview() {
  const targetScore = ageProfiles[state.age].patternTarget;
  hideCompletionCard();
  const icons = topicProfiles[state.topic].tapEmoji.slice(0, 4);
  const palette = [
    topicProfiles[state.topic].color,
    topicProfiles[state.topic].accentStrong,
    "#ffffff",
    "#ffd166"
  ];

  elements.previewInstruction.textContent = `${topicProfiles[state.topic].missions.pattern}. 칸을 눌러 기호와 색을 바꾸며 패턴을 만들어 보세요.`;
  elements.previewBoard.innerHTML = "";

  Array.from({ length: 9 }).forEach((_, index) => {
    const cell = document.createElement("button");
    cell.type = "button";
    cell.className = "pattern-cell";
    let step = index % icons.length;
    cell.innerHTML = `${icons[step]}<small>pattern</small>`;
    cell.style.background = palette[step % palette.length];
    cell.addEventListener("click", () => {
      if (!state.started) {
        return;
      }
      step = (step + 1) % icons.length;
      cell.classList.add("is-hit");
      window.setTimeout(() => cell.classList.remove("is-hit"), 220);
      cell.innerHTML = `${icons[step]}<small>pattern</small>`;
      cell.style.background = palette[(step + index) % palette.length];
      state.score += 1;
      playPadSound(step);
      elements.previewScore.textContent = `점수 ${state.score}`;
      elements.previewStatus.textContent =
        state.score >= targetScore
          ? "패턴 포스터가 완성됐습니다."
          : "패턴이 바뀌었습니다. 마음에 드는 조합을 만들어 보세요.";
      if (state.score >= targetScore) {
        showCompletionCard();
      }
    });
    elements.previewBoard.appendChild(cell);
  });
}

function renderPreview() {
  elements.previewBoard.style.setProperty("--topic-accent", topicProfiles[state.topic].color);
  elements.previewStatus.textContent = state.started
    ? "바로 눌러서 놀 수 있습니다."
    : "시작을 누르면 선택한 미니 앱이 실행됩니다.";

  if (!state.started) {
    hideCompletionCard();
    const appLabel = appProfiles[state.app].label;
    const mission = topicProfiles[state.topic].missions[state.app];
    elements.previewInstruction.textContent = `${appLabel} 미리보기입니다. ${mission}`;
    elements.previewBoard.innerHTML = "";

    const samples = topicProfiles[state.topic].tapEmoji.slice(0, state.app === "pattern" ? 6 : 3);
    samples.forEach((item, index) => {
      const sample = document.createElement("div");
      sample.className = state.app === "pattern" ? "pattern-cell" : "preview-tile";
      sample.textContent = item;
      if (state.app === "pattern") {
        sample.innerHTML = `${item}<small>sample</small>`;
      }
      if (state.app === "sound") {
        sample.className = "sound-pad";
        sample.innerHTML = `${item}<small>sample</small>`;
      }
      if (state.app === "sticker") {
        sample.className = "sticker-piece";
        sample.innerHTML = `${item}<small>sample</small>`;
      }
      if (state.app === "tap" && index === 0) {
        sample.classList.add("is-target");
      }
      elements.previewBoard.appendChild(sample);
    });
    return;
  }

  if (state.app === "tap") {
    renderTapPreview();
    return;
  }

  if (state.app === "sound") {
    renderSoundPreview();
    return;
  }

  if (state.app === "pattern") {
    renderPatternPreview();
    return;
  }

  renderStickerPreview();
}

function buildPlayground() {
  state.score = 0;
  state.started = false;
  state.placedCount = 0;
  updateHeader();
  renderPreview();
  createParentGate();
}

function startPlayground() {
  state.score = 0;
  state.started = true;
  state.placedCount = 0;
  elements.previewScore.textContent = `점수 ${state.score}`;
  renderPreview();
}

function resetPlayground() {
  if (state.score > 0) {
    saveHistory();
  }
  buildPlayground();
}

function setSelected(buttons, activeButton, className) {
  buttons.forEach((button) => {
    const isActive = button === activeButton;
    button.classList.toggle(className, isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

elements.ageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (state.age === button.dataset.age) {
      return;
    }
    confirmStateChange(() => {
      state.age = button.dataset.age;
      setSelected(elements.ageButtons, button, "is-active");
      buildPlayground();
    });
  });
});

elements.topicButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (state.topic === button.dataset.topic) {
      return;
    }
    confirmStateChange(() => {
      state.topic = button.dataset.topic;
      setSelected(elements.topicButtons, button, "is-active");
      buildPlayground();
    });
  });
});

elements.appButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (state.app === button.dataset.app) {
      return;
    }
    confirmStateChange(() => {
      state.app = button.dataset.app;
      setSelected(elements.appButtons, button, "is-active");
      buildPlayground();
    });
  });
});

elements.difficultySlider.addEventListener("change", () => {
  const nextDifficulty = Number(elements.difficultySlider.value);
  if (state.difficulty === nextDifficulty) {
    return;
  }
  confirmStateChange(() => {
    state.difficulty = nextDifficulty;
    elements.difficultyValue.textContent = String(state.difficulty);
    buildPlayground();
  });
  elements.difficultySlider.value = String(state.difficulty);
});

elements.startButton.addEventListener("click", startPlayground);
elements.resetButton.addEventListener("click", resetPlayground);
elements.gateButton.addEventListener("click", unlockParentSummary);
elements.gateInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    unlockParentSummary();
  }
});

buildPlayground();
