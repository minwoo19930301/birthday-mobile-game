const dom = {
  talkBtn: document.getElementById("talk-btn"),
  jumpBtn: document.getElementById("jump-btn"),
  panel: document.getElementById("dialogue-panel"),
  overlay: document.getElementById("dialogue-overlay"),
  npcName: document.getElementById("npc-nameplate"),
  npcSubtitle: document.getElementById("npc-subtitle"),
  portrait: document.getElementById("npc-portrait"),
  dialogueText: document.getElementById("dialogue-text"),
  nextBtn: document.getElementById("next-line-btn"),
  joystickBase: document.getElementById("joystick-base"),
  joystickStick: document.getElementById("joystick-stick"),
  endingPanel: document.getElementById("ending-panel"),
  endingCloseBtn: document.getElementById("ending-close-btn"),
  cakePhoto: document.getElementById("cake-photo"),
  guideBadge: document.getElementById("guide-badge"),
};

const PLAYER_NAME = "채은";
const TILE_SIZE = 16;
const SCALE = 3;

const GRID = {
  width: 21,
  height: 64,
};

const WORLD = {
  width: GRID.width * TILE_SIZE * SCALE,
  height: GRID.height * TILE_SIZE * SCALE,
  speed: 252,
};

const PATH = {
  widthTiles: 5,
  startX: Math.floor((GRID.width - 5) / 2),
};
PATH.endX = PATH.startX + PATH.widthTiles - 1;
PATH.centerX = PATH.startX + Math.floor(PATH.widthTiles / 2);

const CASTLE_GATE_Y = 39;
const FINAL_TILE_Y = 16;

const CHARACTER_SIZE = {
  width: 124,
  height: 168,
};

const FALLBACK_MAIN = "./assets/portraits/ariel.png";
const FALLBACK_GIVER = "./assets/portraits/harry.png";
const FALLBACK_CAKE = "./assets/portraits/cake-placeholder.svg";

const GIVER_CANDIDATES = [
  "./assets/portraits/husband.jpg",
  "./assets/portraits/husband.png",
  "./assets/portraits/man.jpg",
  "./assets/portraits/man.png",
  "./assets/portraits/giver.jpg",
  "./assets/portraits/giver.png",
  "./assets/portraits/partner.jpg",
  "./assets/portraits/partner.png",
  "./assets/portraits/tuxedo.jpg",
  "./assets/portraits/tuxedo.png",
  "./assets/portraits/lee-taegon.jpg",
  "./assets/portraits/lee-taegon.png",
  "./assets/portraits/harry.png",
];

const CAKE_CANDIDATES = [
  "./assets/portraits/cake.jpg",
  "./assets/portraits/cake.png",
  "./assets/portraits/birthday-cake.jpg",
  "./assets/portraits/birthday-cake.png",
  "./assets/portraits/chaeeun-cake.jpg",
  "./assets/portraits/chaeeun-cake.png",
  "./assets/portraits/cake-placeholder.svg",
];

const TILE_IDS = Array.from({ length: 132 }, (_, index) => index);

const NPC_DEFS = [
  {
    id: "ariel",
    name: "아리엘",
    subtitle: "인어공주",
    side: "right",
    ty: 34,
    portraits: ["./assets/portraits/ariel.png"],
    lines: [
      "채은, 오늘은 바닷결보다 반짝이는 하루야.",
      "조개껍데기 가득 담아온 소원처럼, 좋은 일만 밀려오길 바라.",
      "진심으로 생일 축하해!",
    ],
  },
  {
    id: "isabelle",
    name: "여울이",
    subtitle: "모여봐요 동물의 숲",
    side: "right",
    ty: 55,
    portraits: ["./assets/portraits/isabelle.png"],
    lines: [
      "채은님! 마을 공지사항 1번, 오늘은 채은님 생일 축하의 날입니다!",
      "광장, 성 앞길, 내부 복도까지 전부 축제 모드로 준비해뒀어요.",
      "생일 정말 축하드려요!",
    ],
  },
  {
    id: "forky",
    name: "포키",
    subtitle: "토이 스토리",
    side: "left",
    ty: 52,
    portraits: ["./assets/portraits/forky.png"],
    lines: [
      "우와! 파티다! 나도 파티 진짜 좋아해!",
      "채은 생일이면 오늘은 쓰레기통 말고 축하 무대로 갈래!",
      "해피 벌스데이!",
    ],
  },
  {
    id: "carrie",
    name: "캐리",
    subtitle: "섹스 앤 더 시티",
    side: "right",
    ty: 49,
    portraits: [
      "./assets/portraits/carrie.jpg",
      "./assets/portraits/carrie.png",
      "./assets/portraits/carrie.jpeg",
      "./assets/portraits/carrie.webp",
      "./assets/portraits/carry.png",
    ],
    lines: [
      "오늘 룩의 결론은 하나야, 채은이 주인공이라는 것.",
      "샴페인보다 반짝이는 하루, 하이힐보다 자신감 있는 밤이 되길.",
      "채은, 생일 축하해!",
    ],
  },
  {
    id: "lee-taegon",
    name: "이태곤",
    subtitle: "결혼작사이혼작곡",
    side: "left",
    ty: 46,
    portraits: [
      "./assets/portraits/lee-taegon.jpg",
      "./assets/portraits/lee-taegon.png",
      "./assets/portraits/lee-taegon.jpeg",
      "./assets/portraits/lee-taegon.webp",
      "./assets/portraits/leetaegon.png",
    ],
    lines: [
      "아ㅁ.. 아니.. 채은씨 생일 축하드려요 (느끼).",
      "오늘 밤의 주인공은 단연 채은씨입니다.",
      "진심으로 축하드립니다.",
    ],
  },
  {
    id: "haley",
    name: "헤일리",
    subtitle: "모던 패밀리",
    side: "right",
    ty: 28,
    portraits: [
      "./assets/portraits/haley.jpg",
      "./assets/portraits/haley.png",
      "./assets/portraits/haley.jpeg",
      "./assets/portraits/haley.webp",
      "./assets/portraits/hailey.png",
    ],
    lines: [
      "어? 우와... 잠깐, 나 방금 뭐 하려 했지?",
      "아무튼 오늘 채은이 완전 예쁘고, 분위기도 반짝반짝이야.",
      "케이크 나오면 나도 제일 크게 박수칠게!",
      "생일 축하해!",
    ],
  },
  {
    id: "perry",
    name: "페리",
    subtitle: "피니와 퍼브",
    side: "left",
    ty: 40,
    portraits: [
      "./assets/portraits/perry.png",
      "./assets/portraits/perry.jpg",
      "./assets/portraits/perry.jpeg",
      "./assets/portraits/perry.webp",
      "./assets/portraits/pery.png",
    ],
    lines: [
      "(중저음) 코드명 P. 오늘 작전명은 채은 생일 축하.",
      "(고개를 끄덕인다) 임무 완료까지 곁에서 호위하겠다.",
      "해피 벌스데이.",
    ],
  },
  {
    id: "gazelle",
    name: "가젤",
    subtitle: "주토피아",
    side: "left",
    ty: 58,
    portraits: [
      "./assets/portraits/gazelle.png",
      "./assets/portraits/gazelle.jpg",
      "./assets/portraits/gazelle.jpeg",
      "./assets/portraits/gazelle.webp",
    ],
    lines: [
      "Zoo~ Zoo~ 채은을 위한 오프닝 비트, 지금 바로 시작!",
      "Zoo~ Zoo~ 리듬에 맞춰 모두 손을 들어, 오늘 주인공은 채은!",
      "스포트라이트는 끝까지 채은에게 고정!",
      "생일 축하해!",
    ],
  },
  {
    id: "jennie",
    name: "제니",
    subtitle: "블랙핑크",
    side: "left",
    ty: 31,
    portraits: [
      "./assets/portraits/jennie.jpg",
      "./assets/portraits/jennie.png",
      "./assets/portraits/jennie.jpeg",
      "./assets/portraits/jennie.webp",
      "./assets/portraits/jenny.png",
    ],
    lines: [
      "오늘의 메인 캐릭터는 채은, 그건 확실해.",
      "한 컷 한 컷이 화보처럼 남을 하루로 만들자.",
      "HAPPY BIRTHDAY!",
    ],
  },
  {
    id: "haejoo",
    name: "해쭈",
    subtitle: "유튜버",
    side: "right",
    ty: 43,
    portraits: [
      "./assets/portraits/haejoo.jpg",
      "./assets/portraits/haejoo.png",
      "./assets/portraits/haejoo.jpeg",
      "./assets/portraits/haejoo.webp",
      "./assets/portraits/hazzu.png",
    ],
    lines: [
      "채은아 오늘 텐션 뭐야, 시작부터 이미 레전드다!",
      "브이로그 찍으면 썸네일이 다 채은으로 도배될 분위기야.",
      "진짜 크게, 크게 생일 축하해!",
    ],
  },
  {
    id: "harry",
    name: "해리",
    subtitle: "호그와트",
    side: "left",
    ty: 24,
    portraits: ["./assets/portraits/harry.png", "./assets/portraits/harry_hd.png"],
    lines: [
      "채은, 여기까지 올라오느라 고생 많았어.",
      "윙가르디움 레비오사! 축하 마법으로 오늘 하루를 반짝이게 해줄게.",
      "루모스! 어두운 순간이 와도 채은 앞길은 환하게 비출 거야.",
      "생일 축하해!",
    ],
  },
  {
    id: "husband",
    name: "HUSBAND",
    subtitle: "마지막 축하",
    side: "center",
    ty: FINAL_TILE_Y,
    portraits: GIVER_CANDIDATES,
    lines: [
      "채은, 끝까지 와줘서 고마워.",
      "오늘을 오래 기억할 수 있게 마지막 선물은 케이크로 준비했어.",
      "HAPPY BIRTHDAY CHAEEUN",
    ],
    isFinal: true,
  },
];

const state = {
  game: null,
  scene: null,
  player: null,
  npcs: [],
  nearNpc: null,
  dialogueOpen: false,
  endingOpen: false,
  endingTriggered: false,
  jumping: false,
  insideCastle: false,
  dialogueLines: [],
  dialogueIndex: 0,
  activeNpc: null,
  typing: {
    timer: null,
    full: "",
    cursor: 0,
    active: false,
  },
  joystick: {
    pointerId: null,
    x: 0,
    y: 0,
  },
};

function tileKey(tileId) {
  return `tile-${String(tileId).padStart(4, "0")}`;
}

function tileFilename(tileId) {
  return `tile_${String(tileId).padStart(4, "0")}.png`;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function worldFromTile(tx, ty) {
  return {
    x: tx * TILE_SIZE * SCALE,
    y: ty * TILE_SIZE * SCALE,
  };
}

function clearTypingTimer() {
  if (state.typing.timer) {
    window.clearInterval(state.typing.timer);
    state.typing.timer = null;
  }
}

function finishTypingImmediately() {
  if (!state.typing.active) {
    return;
  }

  clearTypingTimer();
  state.typing.active = false;
  dom.dialogueText.textContent = state.typing.full;
}

function typeLine(text) {
  clearTypingTimer();
  state.typing.full = text;
  state.typing.cursor = 0;
  state.typing.active = true;
  dom.dialogueText.textContent = "";

  state.typing.timer = window.setInterval(() => {
    state.typing.cursor += 1;
    dom.dialogueText.textContent = state.typing.full.slice(0, state.typing.cursor);

    if (state.typing.cursor >= state.typing.full.length) {
      clearTypingTimer();
      state.typing.active = false;
    }
  }, 18);
}

function setImageWithFallback(element, preferred, fallback) {
  const candidates = Array.from(new Set([...(preferred || []), fallback]));
  const cacheBust = Date.now();
  let index = 0;

  const tryNext = () => {
    if (index >= candidates.length) {
      element.src = fallback;
      return;
    }

    const candidate = candidates[index];
    index += 1;

    const img = new Image();
    img.onload = () => {
      element.src = candidate;
    };
    img.onerror = () => {
      tryNext();
    };
    img.src = `${candidate}?v=${cacheBust}`;
  };

  tryNext();
}

function showTalkButton(npcRuntime) {
  if (!npcRuntime || state.dialogueOpen || state.endingOpen) {
    dom.talkBtn.style.display = "none";
    return;
  }

  dom.talkBtn.textContent = `말 걸기 · ${npcRuntime.def.name}`;
  dom.talkBtn.style.display = "block";
}

function renderDialogueLine() {
  const line = state.dialogueLines[state.dialogueIndex] || "";
  const isLast = state.dialogueIndex >= state.dialogueLines.length - 1;
  dom.nextBtn.textContent = isLast ? "닫기" : "다음";
  typeLine(line);
}

function closeDialogue() {
  clearTypingTimer();
  state.typing.active = false;
  state.dialogueOpen = false;

  dom.panel.classList.add("hidden");
  dom.overlay.classList.add("hidden");

  if (state.activeNpc?.def?.isFinal && !state.endingTriggered) {
    state.endingTriggered = true;
    openEnding();
  }

  state.activeNpc = null;
  showTalkButton(state.nearNpc);
}

function advanceDialogue() {
  if (!state.dialogueOpen) {
    return;
  }

  if (state.typing.active) {
    finishTypingImmediately();
    return;
  }

  if (state.dialogueIndex >= state.dialogueLines.length - 1) {
    closeDialogue();
    return;
  }

  state.dialogueIndex += 1;
  renderDialogueLine();
}

function openDialogue(npcRuntime) {
  if (!npcRuntime || state.endingOpen) {
    return;
  }

  state.activeNpc = npcRuntime;
  state.dialogueOpen = true;
  state.dialogueLines = npcRuntime.def.lines;
  state.dialogueIndex = 0;

  dom.npcName.textContent = npcRuntime.def.name;
  dom.npcSubtitle.textContent = npcRuntime.def.subtitle;
  setImageWithFallback(dom.portrait, [npcRuntime.resolvedPortrait], FALLBACK_MAIN);

  dom.overlay.classList.remove("hidden");
  dom.panel.classList.remove("hidden");

  showTalkButton(null);
  renderDialogueLine();

  if (state.scene) {
    triggerCelebrateFx(state.scene, npcRuntime);
    if (npcRuntime.def.id === "harry") {
      triggerMagicFx(state.scene, npcRuntime);
    }
  }
}

function openEnding() {
  state.endingOpen = true;
  dom.endingPanel.classList.remove("hidden");

  dom.guideBadge.textContent = "HAPPY BIRTHDAY CHAEEUN";
  setImageWithFallback(dom.cakePhoto, CAKE_CANDIDATES, FALLBACK_CAKE);
}

function closeEnding() {
  state.endingOpen = false;
  dom.endingPanel.classList.add("hidden");
  dom.guideBadge.textContent = state.insideCastle
    ? "성 내부 복도 - 계속 위로 이동"
    : "중세 마을길 - 성으로 이동";
}

function tryTalk() {
  if (!state.nearNpc || state.dialogueOpen || state.endingOpen) {
    return;
  }
  openDialogue(state.nearNpc);
}

function tryJump() {
  if (!state.scene || !state.player) {
    return;
  }
  if (state.dialogueOpen || state.endingOpen || state.jumping) {
    return;
  }

  state.jumping = true;
  const baseY = state.player.y;

  state.scene.tweens.add({
    targets: state.player,
    y: baseY - 42,
    duration: 170,
    yoyo: true,
    ease: "Sine.easeOut",
    onComplete: () => {
      state.player.y = baseY;
      state.jumping = false;
    },
  });
}

function setupJoystick() {
  const base = dom.joystickBase;
  const stick = dom.joystickStick;

  const reset = () => {
    state.joystick.pointerId = null;
    state.joystick.x = 0;
    state.joystick.y = 0;
    stick.style.transform = "translate(-50%, -50%)";
  };

  const updateFromPointer = (event) => {
    const rect = base.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const maxRadius = rect.width * 0.34;

    const rawDx = event.clientX - centerX;
    const rawDy = event.clientY - centerY;
    const distance = Math.hypot(rawDx, rawDy) || 1;
    const ratio = distance > maxRadius ? maxRadius / distance : 1;

    const dx = rawDx * ratio;
    const dy = rawDy * ratio;

    state.joystick.x = clamp(dx / maxRadius, -1, 1);
    state.joystick.y = clamp(dy / maxRadius, -1, 1);
    stick.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
  };

  base.addEventListener("pointerdown", (event) => {
    if (state.joystick.pointerId !== null) {
      return;
    }
    state.joystick.pointerId = event.pointerId;
    updateFromPointer(event);
  });

  window.addEventListener("pointermove", (event) => {
    if (state.joystick.pointerId !== event.pointerId) {
      return;
    }
    updateFromPointer(event);
  });

  const release = (event) => {
    if (state.joystick.pointerId !== event.pointerId) {
      return;
    }
    reset();
  };

  window.addEventListener("pointerup", release);
  window.addEventListener("pointercancel", release);
}

class MainScene extends Phaser.Scene {
  constructor() {
    super("main-scene");
    this.cursors = null;
    this.wasd = null;
    this.pathMinX = 0;
    this.pathMaxX = 0;
    this.transitionOverlay = null;
    this.transitionBusy = false;
  }

  preload() {
    this.load.image("player", "./assets/player-chaeeun.png");
    this.load.image("fallback-portrait", FALLBACK_MAIN);

    TILE_IDS.forEach((tileId) => {
      this.load.image(tileKey(tileId), `./assets/tiny-town/Tiles/${tileFilename(tileId)}`);
    });
  }

  create() {
    state.scene = this;

    this.createParticleTexture();
    this.createMap();
    this.createPlayer();
    this.createNpcs();
    this.createAmbientFx();
    this.createInput();

    const min = worldFromTile(PATH.startX, 0).x + 16;
    const max = worldFromTile(PATH.endX, 0).x + TILE_SIZE * SCALE - 16;
    this.pathMinX = min;
    this.pathMaxX = max;
  }

  createParticleTexture() {
    const g = this.make.graphics({ add: false });
    g.fillStyle(0xffffff, 1);
    g.fillCircle(6, 6, 6);
    g.generateTexture("particle-dot", 12, 12);
    g.destroy();
  }

  placeTile(id, tx, ty, depth = 0) {
    const p = worldFromTile(tx, ty);
    const sprite = this.add.image(p.x, p.y, tileKey(id));
    sprite.setOrigin(0);
    sprite.setScale(SCALE);
    sprite.setDepth(depth + ty);
    return sprite;
  }

  fitSpriteToFrame(sprite, maxWidth, maxHeight) {
    const source = sprite?.texture?.getSourceImage?.();
    const width = source?.width || maxWidth;
    const height = source?.height || maxHeight;
    const scale = Math.min(maxWidth / width, maxHeight / height);
    sprite.setDisplaySize(
      Math.max(2, width * scale),
      Math.max(2, height * scale),
    );
  }

  stamp(pattern, tx, ty, depth = 0) {
    pattern.forEach((row, dy) => {
      row.forEach((tileId, dx) => {
        if (tileId === null || tileId === undefined || tileId < 0) {
          return;
        }
        this.placeTile(tileId, tx + dx, ty + dy, depth);
      });
    });
  }

  placeHouse(tx, ty, roofStyle = "blue", depth = 260) {
    if (roofStyle === "red") {
      this.stamp([
        [52, 53, 54],
        [72, 73, 74],
      ], tx, ty, depth);
      this.placeTile(75, tx + 1, ty + 1, depth + 1);
      return;
    }

    this.stamp([
      [64, 65, 66],
      [76, 77, 78],
    ], tx, ty, depth);
    this.placeTile(79, tx + 1, ty + 1, depth + 1);
  }

  drawGrass() {
    for (let y = 0; y < GRID.height; y += 1) {
      for (let x = 0; x < GRID.width; x += 1) {
        const hash = (x * 31 + y * 17) % 20;
        const id = hash < 2 ? 2 : (hash < 7 ? 1 : 0);
        this.placeTile(id, x, y, 0);
      }
    }
  }

  drawRoad(fromY, toY, isCastleRoad) {
    const dirt = [36, 37, 38, 39, 40, 41, 42, 43];
    const stoneIds = [48, 49, 50, 60, 61, 62];

    for (let y = fromY; y < toY; y += 1) {
      for (let x = PATH.startX; x <= PATH.endX; x += 1) {
        const list = isCastleRoad ? stoneIds : dirt;
        const tile = list[(x + y * 3) % list.length];
        this.placeTile(tile, x, y, 25);
      }
    }
  }

  drawTownDistrict() {
    const treeTiles = [3, 4, 5, 6, 7, 8, 9, 10, 11, 16, 17, 18, 19, 20, 21, 22, 23, 30, 31, 32, 33, 34, 35];
    const flowerTiles = [2, 28, 29];

    for (let y = CASTLE_GATE_Y + 2; y < GRID.height - 2; y += 1) {
      if (y % 3 === 0) {
        this.placeTile(treeTiles[y % treeTiles.length], 1, y, 180);
      }
      if ((y + 1) % 3 === 0) {
        this.placeTile(treeTiles[(y + 7) % treeTiles.length], GRID.width - 2, y, 180);
      }

      if (y % 2 === 0) {
        this.placeTile(flowerTiles[y % flowerTiles.length], PATH.startX - 2, y, 210);
        this.placeTile(flowerTiles[(y + 1) % flowerTiles.length], PATH.endX + 2, y, 210);
      }
    }

    this.placeHouse(1, GRID.height - 11, "red");
    this.placeHouse(GRID.width - 4, GRID.height - 12, "blue");
    this.placeHouse(2, CASTLE_GATE_Y + 8, "blue");
    this.placeHouse(GRID.width - 5, CASTLE_GATE_Y + 6, "red");

    for (let x = 1; x < PATH.startX - 1; x += 1) {
      this.placeTile(x % 2 === 0 ? 45 : 57, x, CASTLE_GATE_Y + 3, 240);
      this.placeTile(x % 2 === 0 ? 69 : 80, x, GRID.height - 6, 240);
    }
    for (let x = PATH.endX + 2; x < GRID.width - 1; x += 1) {
      this.placeTile(x % 2 === 0 ? 46 : 58, x, CASTLE_GATE_Y + 4, 240);
      this.placeTile(x % 2 === 0 ? 70 : 80, x, GRID.height - 7, 240);
    }

    this.placeTile(104, 2, GRID.height - 6, 260);
    this.placeTile(106, GRID.width - 3, GRID.height - 6, 260);
    this.placeTile(128, 3, CASTLE_GATE_Y + 5, 260);
    this.placeTile(129, GRID.width - 4, CASTLE_GATE_Y + 7, 260);
    this.placeTile(130, 2, CASTLE_GATE_Y + 10, 260);
    this.placeTile(131, GRID.width - 3, CASTLE_GATE_Y + 12, 260);
  }

  drawCastleGate() {
    const wallLeft = PATH.startX - 3;
    const wallRight = PATH.endX + 3;
    const topY = CASTLE_GATE_Y - 6;

    for (let x = wallLeft; x <= wallRight; x += 1) {
      const tile = x === wallLeft || x === wallRight ? 110 : (x % 2 === 0 ? 108 : 109);
      this.placeTile(tile, x, topY, 500);
    }

    for (let y = topY + 1; y <= CASTLE_GATE_Y; y += 1) {
      this.placeTile(121, wallLeft, y, 500);
      this.placeTile(120, wallRight, y, 500);
    }

    const cx = PATH.centerX;
    this.placeTile(116, cx - 2, CASTLE_GATE_Y - 1, 530);
    this.placeTile(112, cx - 1, CASTLE_GATE_Y - 1, 530);
    this.placeTile(112, cx, CASTLE_GATE_Y - 1, 530);
    this.placeTile(112, cx + 1, CASTLE_GATE_Y - 1, 530);
    this.placeTile(117, cx + 2, CASTLE_GATE_Y - 1, 530);

    this.placeTile(121, cx - 2, CASTLE_GATE_Y, 530);
    this.placeTile(118, cx - 1, CASTLE_GATE_Y, 530);
    this.placeTile(114, cx, CASTLE_GATE_Y, 530);
    this.placeTile(119, cx + 1, CASTLE_GATE_Y, 530);
    this.placeTile(120, cx + 2, CASTLE_GATE_Y, 530);

    const gateCenterX = worldFromTile(cx, 0).x + TILE_SIZE * SCALE * 0.5;
    const gateCenterY = worldFromTile(0, CASTLE_GATE_Y).y + TILE_SIZE * SCALE * 0.35;

    const archGlow = this.add.ellipse(
      gateCenterX,
      gateCenterY + TILE_SIZE * SCALE * 0.35,
      TILE_SIZE * SCALE * 4.6,
      TILE_SIZE * SCALE * 4,
      0xf0e0b8,
      0.2,
    );
    archGlow.setDepth(526 + CASTLE_GATE_Y);

    const archFrame = this.add.ellipse(
      gateCenterX,
      gateCenterY + TILE_SIZE * SCALE * 0.4,
      TILE_SIZE * SCALE * 3.7,
      TILE_SIZE * SCALE * 3.2,
      0x8fa5c2,
      0.45,
    );
    archFrame.setDepth(527 + CASTLE_GATE_Y);

    const doorway = this.add.rectangle(
      gateCenterX,
      gateCenterY + TILE_SIZE * SCALE * 0.78,
      TILE_SIZE * SCALE * 2.2,
      TILE_SIZE * SCALE * 2.35,
      0x0d111a,
      0.86,
    );
    doorway.setDepth(528 + CASTLE_GATE_Y);

    const doorwaySplit = this.add.rectangle(
      gateCenterX,
      gateCenterY + TILE_SIZE * SCALE * 0.8,
      4,
      TILE_SIZE * SCALE * 2.2,
      0x26344a,
      0.72,
    );
    doorwaySplit.setDepth(529 + CASTLE_GATE_Y);

    this.placeTile(126, wallLeft, topY + 1, 540);
    this.placeTile(126, wallRight, topY + 1, 540);
  }

  drawCastleInterior() {
    const wallLeft = PATH.startX - 2;
    const wallRight = PATH.endX + 2;

    for (let y = 0; y < CASTLE_GATE_Y; y += 1) {
      this.placeTile(y % 2 === 0 ? 120 : 121, wallLeft, y, 560);
      this.placeTile(y % 2 === 0 ? 122 : 123, wallRight, y, 560);

      if (y > 0) {
        this.placeTile((y + 1) % 3 === 0 ? 108 : 109, wallLeft - 1, y, 540);
        this.placeTile((y + 2) % 3 === 0 ? 110 : 111, wallRight + 1, y, 540);
      }
    }

    for (let y = 2; y < CASTLE_GATE_Y - 3; y += 4) {
      this.placeTile(83, wallLeft - 2, y, 580);
      this.placeTile(83, wallRight + 2, y + 1, 580);
    }

    for (let y = 3; y < CASTLE_GATE_Y - 5; y += 5) {
      this.placeTile(62, wallLeft - 1, y, 620);
      this.placeTile(75, wallLeft - 1, y + 1, 620);
      this.placeTile(74, wallLeft - 1, y + 2, 620);

      this.placeTile(64, wallRight + 1, y, 620);
      this.placeTile(76, wallRight + 1, y + 1, 620);
      this.placeTile(74, wallRight + 1, y + 2, 620);
    }

    const cx = PATH.centerX;
    this.stamp([
      [95, 96, 97],
      [98, 99, 100],
      [120, 121, 122],
    ], cx - 1, 3, 700);
    this.placeTile(126, cx - 2, 5, 705);
    this.placeTile(126, cx + 2, 5, 705);

    const castleTint = this.add.rectangle(0, 0, WORLD.width, worldFromTile(0, CASTLE_GATE_Y).y, 0x2f3c62, 0.15).setOrigin(0);
    castleTint.setDepth(60);
  }

  drawFestivalProps() {
    for (let y = CASTLE_GATE_Y + 4; y < GRID.height - 2; y += 4) {
      this.placeTile(y % 2 === 0 ? 47 : 59, PATH.startX - 3, y, 300);
      this.placeTile(y % 2 === 0 ? 47 : 59, PATH.endX + 3, y + 1, 300);
    }

    for (let y = 5; y < CASTLE_GATE_Y - 4; y += 4) {
      this.placeTile(y % 2 === 0 ? 83 : 126, PATH.startX - 3, y, 600);
      this.placeTile(y % 2 === 0 ? 83 : 126, PATH.endX + 3, y + 1, 600);
    }
  }

  createMap() {
    this.drawGrass();
    this.drawRoad(CASTLE_GATE_Y, GRID.height, false);
    this.drawRoad(0, CASTLE_GATE_Y, true);
    this.drawTownDistrict();
    this.drawCastleGate();
    this.drawCastleInterior();
    this.drawFestivalProps();

    this.cameras.main.setBounds(0, 0, WORLD.width, WORLD.height);
    this.physics.world.setBounds(0, 0, WORLD.width, WORLD.height);
  }

  createTransitionOverlay() {
    this.transitionOverlay = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x1f2b45, 0);
    this.transitionOverlay.setOrigin(0);
    this.transitionOverlay.setScrollFactor(0);
    this.transitionOverlay.setDepth(120000);

    this.scale.on("resize", (gameSize) => {
      if (!this.transitionOverlay) {
        return;
      }
      this.transitionOverlay.setSize(gameSize.width, gameSize.height);
    });
  }

  spawnAmbientBurst(x, y, tint) {
    const particles = this.add.particles(x, y, "particle-dot", {
      speed: { min: 40, max: 150 },
      angle: { min: 220, max: 320 },
      gravityY: 260,
      lifespan: 800,
      quantity: 10,
      scale: { start: 0.7, end: 0.05 },
      blendMode: "ADD",
      tint,
    });
    particles.setDepth(99990);
    this.time.delayedCall(820, () => particles.destroy());
  }

  playAreaTransition(insideCastle) {
    if (!this.transitionOverlay || this.transitionBusy) {
      return;
    }

    this.transitionBusy = true;
    this.transitionOverlay.setFillStyle(insideCastle ? 0x23345f : 0x5b3f2d, 1);
    this.transitionOverlay.alpha = 0;
    this.cameras.main.shake(140, 0.0022);
    this.spawnAmbientBurst(
      state.player.x,
      state.player.y - 100,
      insideCastle ? [0xc4deff, 0xffffff, 0xa7d1ff] : [0xffd27f, 0xff9ebb, 0xffffff],
    );

    this.tweens.add({
      targets: this.transitionOverlay,
      alpha: 0.8,
      duration: 150,
      yoyo: true,
      hold: 80,
      ease: "Sine.easeInOut",
      onComplete: () => {
        this.transitionBusy = false;
      },
    });
  }

  addDancer(tx, ty, outfitColor) {
    const p = worldFromTile(tx, ty);
    const x = p.x + TILE_SIZE * SCALE * 0.5;
    const y = p.y + TILE_SIZE * SCALE;

    const shadow = this.add.ellipse(x, y + 4, 34, 10, 0x0b0d12, 0.22);
    shadow.setDepth(430 + y);

    const body = this.add.container(x, y - 2);
    body.setDepth(440 + y);

    const head = this.add.circle(0, -26, 6, 0xf5d2b2, 1);
    const torso = this.add.rectangle(0, -14, 12, 18, outfitColor, 1);
    const armLeft = this.add.rectangle(-9, -16, 4, 14, 0xf5d2b2, 1).setOrigin(0.5, 0.1);
    const armRight = this.add.rectangle(9, -16, 4, 14, 0xf5d2b2, 1).setOrigin(0.5, 0.1);
    const legLeft = this.add.rectangle(-4, -1, 4, 10, 0x21273b, 1);
    const legRight = this.add.rectangle(4, -1, 4, 10, 0x21273b, 1);
    body.add([head, torso, armLeft, armRight, legLeft, legRight]);

    const note = this.add.text(x + 12, y - 46, "♫", {
      fontFamily: "Noto Sans KR",
      fontSize: "24px",
      color: "#ffeaa1",
      stroke: "#352417",
      strokeThickness: 4,
      fontStyle: "700",
    });
    note.setDepth(445 + y);

    this.tweens.add({
      targets: body,
      y: body.y - 6,
      duration: 560 + ((tx + ty) % 3) * 100,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });

    this.tweens.add({
      targets: armLeft,
      angle: { from: -34, to: 28 },
      duration: 360,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });

    this.tweens.add({
      targets: armRight,
      angle: { from: 34, to: -28 },
      duration: 360,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });

    this.tweens.add({
      targets: note,
      y: note.y - 8,
      alpha: { from: 0.95, to: 0.4 },
      duration: 740,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
  }

  addNpcFestivalFx(npcRuntime, index) {
    const noteLeft = this.add.text(npcRuntime.anchor.x - 52, npcRuntime.anchor.y - 188, "♪", {
      fontFamily: "Noto Sans KR",
      fontSize: "28px",
      color: "#ffeeb2",
      stroke: "#322216",
      strokeThickness: 5,
      fontStyle: "700",
    });
    noteLeft.setDepth(930 + npcRuntime.anchor.y);

    const noteRight = this.add.text(npcRuntime.anchor.x + 26, npcRuntime.anchor.y - 178, "♫", {
      fontFamily: "Noto Sans KR",
      fontSize: "24px",
      color: "#ffd5f1",
      stroke: "#3b2236",
      strokeThickness: 4,
      fontStyle: "700",
    });
    noteRight.setDepth(930 + npcRuntime.anchor.y);

    this.tweens.add({
      targets: noteLeft,
      y: noteLeft.y - 10,
      alpha: { from: 0.92, to: 0.42 },
      duration: 680 + (index % 3) * 90,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });

    this.tweens.add({
      targets: noteRight,
      y: noteRight.y - 12,
      alpha: { from: 0.92, to: 0.35 },
      duration: 700 + (index % 4) * 80,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });

    const tintPool = [
      [0xffffff, 0xffe186, 0xffa8d8],
      [0xffffff, 0x94e4ff, 0xf7c7ff],
      [0xffffff, 0xffd588, 0xa3f0ff],
    ];

    const confetti = this.add.particles(npcRuntime.anchor.x, npcRuntime.anchor.y - 120, "particle-dot", {
      speed: { min: 20, max: 80 },
      angle: { min: 238, max: 302 },
      gravityY: 160,
      lifespan: 1100,
      quantity: 1,
      frequency: 620 + (index % 5) * 70,
      scale: { start: 0.5, end: 0 },
      blendMode: "ADD",
      tint: tintPool[index % tintPool.length],
    });
    confetti.setDepth(925 + npcRuntime.anchor.y);
  }

  createAmbientFx() {
    this.createTransitionOverlay();

    const fireworks = [
      { tx: 2, ty: 58, tint: [0xffd37b, 0xffffff, 0xff9fc4] },
      { tx: 18, ty: 56, tint: [0x9ad8ff, 0xffffff, 0xdab2ff] },
      { tx: 2, ty: 51, tint: [0xffb3c7, 0xffffff, 0xffed98] },
      { tx: 18, ty: 48, tint: [0x8ff0d6, 0xffffff, 0x9db6ff] },
      { tx: 2, ty: 43, tint: [0xffd37b, 0xffffff, 0x9ad8ff] },
      { tx: 18, ty: 34, tint: [0xf7b8ff, 0xffffff, 0xffe089] },
      { tx: 2, ty: 28, tint: [0x9ad8ff, 0xffffff, 0xf9ca9d] },
      { tx: 18, ty: 22, tint: [0xffb1d8, 0xffffff, 0xa9ecff] },
    ];

    fireworks.forEach((firework, index) => {
      const p = worldFromTile(firework.tx, firework.ty);
      const emitter = this.add.particles(p.x + 24, p.y + 24, "particle-dot", {
        speed: { min: 70, max: 170 },
        angle: { min: 246, max: 294 },
        gravityY: 240,
        lifespan: 1050,
        quantity: 1,
        frequency: 260 + index * 30,
        scale: { start: 0.7, end: 0 },
        blendMode: "ADD",
        tint: firework.tint,
      });
      emitter.setDepth(520 + p.y);
    });

    [
      { tx: PATH.startX - 3, ty: 56, color: 0x4b5b97 },
      { tx: PATH.endX + 3, ty: 54, color: 0x8d486c },
      { tx: PATH.startX - 3, ty: 48, color: 0x3d6b61 },
      { tx: PATH.endX + 3, ty: 45, color: 0x5e4b9d },
      { tx: PATH.startX - 3, ty: 34, color: 0x3f547f },
      { tx: PATH.endX + 3, ty: 31, color: 0x7d4f72 },
      { tx: PATH.startX - 3, ty: 26, color: 0x3f7863 },
      { tx: PATH.endX + 3, ty: 22, color: 0x4c5ea0 },
    ].forEach((dancer) => {
      this.addDancer(dancer.tx, dancer.ty, dancer.color);
    });

    state.npcs.forEach((npcRuntime, index) => {
      this.addNpcFestivalFx(npcRuntime, index);
    });
  }

  createPlayer() {
    const spawn = worldFromTile(PATH.centerX, GRID.height - 3);

    state.player = this.physics.add.sprite(spawn.x + 24, spawn.y + 24, "player");
    this.fitSpriteToFrame(state.player, CHARACTER_SIZE.width, CHARACTER_SIZE.height);
    state.player.baseWidth = state.player.displayWidth;
    state.player.baseHeight = state.player.displayHeight;
    state.player.setCollideWorldBounds(true);
    state.player.setDrag(680, 680);

    this.cameras.main.startFollow(state.player, true, 0.07, 0.07);
    this.cameras.main.setZoom(1.2);
  }

  getNpcAnchor(def) {
    let tx = PATH.centerX;

    if (def.side === "left") {
      tx = PATH.startX - 0.15;
    } else if (def.side === "right") {
      tx = PATH.endX + 0.15;
    }

    const p = worldFromTile(tx, def.ty);
    return {
      x: p.x + TILE_SIZE * SCALE * 0.5,
      y: p.y + TILE_SIZE * SCALE,
    };
  }

  createNpcs() {
    state.npcs = NPC_DEFS.map((def, idx) => {
      const anchor = this.getNpcAnchor(def);

      const sprite = this.add.image(anchor.x, anchor.y, "fallback-portrait");
      sprite.setOrigin(0.5, 1);
      this.fitSpriteToFrame(sprite, CHARACTER_SIZE.width, CHARACTER_SIZE.height);
      sprite.setDepth(900 + anchor.y);

      const badge = this.add.text(anchor.x, anchor.y - 152, def.name, {
        fontFamily: "Noto Sans KR",
        fontSize: "20px",
        color: "#fff8df",
        stroke: "#2d2118",
        strokeThickness: 5,
        fontStyle: "700",
      });
      badge.setOrigin(0.5);
      badge.setDepth(910 + anchor.y);

      this.tweens.add({
        targets: sprite,
        y: sprite.y - (7 + (idx % 3)),
        yoyo: true,
        duration: 700 + (idx % 4) * 120,
        repeat: -1,
        ease: "Sine.easeInOut",
      });

      const runtime = {
        def,
        anchor,
        sprite,
        badge,
        resolvedPortrait: FALLBACK_MAIN,
      };

      this.resolvePortrait(runtime);
      return runtime;
    });
  }

  resolvePortrait(npcRuntime) {
    const options = Array.from(new Set([
      ...(npcRuntime.def.portraits || []),
      "./assets/portraits/ariel.png",
      "./assets/portraits/isabelle.png",
      "./assets/portraits/forky.png",
      "./assets/portraits/harry.png",
      FALLBACK_MAIN,
    ]));

    const key = `npc2-${npcRuntime.def.id}`;
    const cacheBust = `${Date.now()}`;

    const tryLoad = (index) => {
      if (index >= options.length) {
        return;
      }

      const file = options[index];
      const img = new Image();

      img.onload = () => {
        if (this.textures.exists(key)) {
          this.textures.remove(key);
        }

        this.textures.addImage(key, img);
        npcRuntime.sprite.setTexture(key);
        this.fitSpriteToFrame(npcRuntime.sprite, CHARACTER_SIZE.width, CHARACTER_SIZE.height);
        npcRuntime.resolvedPortrait = file;
      };

      img.onerror = () => {
        tryLoad(index + 1);
      };

      img.src = `${file}?v=${cacheBust}`;
    };

    tryLoad(0);
  }

  createInput() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasd = this.input.keyboard.addKeys("W,A,S,D");

    this.input.keyboard.on("keydown-E", tryTalk);
    this.input.keyboard.on("keydown-SPACE", tryTalk);
    this.input.keyboard.on("keydown-J", tryJump);
    this.input.keyboard.on("keydown-ENTER", advanceDialogue);
  }

  findNearestNpc() {
    let nearest = null;
    let nearestDist = Number.POSITIVE_INFINITY;

    state.npcs.forEach((npcRuntime) => {
      const dist = Phaser.Math.Distance.Between(
        state.player.x,
        state.player.y,
        npcRuntime.anchor.x,
        npcRuntime.anchor.y,
      );

      if (dist < 170 && dist < nearestDist) {
        nearest = npcRuntime;
        nearestDist = dist;
      }
    });

    return nearest;
  }

  constrainX() {
    state.player.x = clamp(state.player.x, this.pathMinX, this.pathMaxX);
  }

  updateInsideState() {
    const gateY = worldFromTile(0, CASTLE_GATE_Y).y;
    const nowInside = state.player.y < gateY;

    if (nowInside !== state.insideCastle) {
      state.insideCastle = nowInside;
      this.playAreaTransition(nowInside);
      dom.guideBadge.textContent = nowInside
        ? "성 내부 복도 - 계속 위로 이동"
        : "중세 마을길 - 성으로 이동";
    }
  }

  update(time) {
    if (!state.player) {
      return;
    }

    this.updateInsideState();

    state.npcs.forEach((npcRuntime) => {
      npcRuntime.badge.setVisible(!state.dialogueOpen && !state.endingOpen);
    });

    const nearest = this.findNearestNpc();
    if (nearest !== state.nearNpc) {
      state.nearNpc = nearest;
      showTalkButton(nearest);
    }

    if (state.dialogueOpen || state.endingOpen) {
      state.player.setVelocity(0, 0);
      this.constrainX();
      state.player.setDepth(1200 + state.player.y);
      return;
    }

    let moveX = state.joystick.x;
    let moveY = state.joystick.y;

    if (this.cursors.left.isDown || this.wasd.A.isDown) moveX -= 1;
    if (this.cursors.right.isDown || this.wasd.D.isDown) moveX += 1;
    if (this.cursors.up.isDown || this.wasd.W.isDown) moveY -= 1;
    if (this.cursors.down.isDown || this.wasd.S.isDown) moveY += 1;

    const length = Math.hypot(moveX, moveY);
    if (length > 0) {
      moveX /= length;
      moveY /= length;
      state.player.setVelocity(moveX * WORLD.speed, moveY * WORLD.speed);
      const pulse = Math.sin(time * 0.018) * 2;
      state.player.setDisplaySize(state.player.baseWidth + pulse, state.player.baseHeight + pulse);
      if (moveX < -0.05) state.player.setFlipX(true);
      if (moveX > 0.05) state.player.setFlipX(false);
    } else {
      state.player.setVelocity(0, 0);
      state.player.setDisplaySize(state.player.baseWidth, state.player.baseHeight);
    }

    this.constrainX();
    state.player.setDepth(1200 + state.player.y);
  }
}

function triggerCelebrateFx(scene, npcRuntime) {
  const particles = scene.add.particles(0, 0, "particle-dot", {
    x: npcRuntime.anchor.x,
    y: npcRuntime.anchor.y - 70,
    speed: { min: 70, max: 220 },
    angle: { min: 205, max: 335 },
    gravityY: 300,
    lifespan: 950,
    quantity: 14,
    scale: { start: 0.85, end: 0.1 },
    blendMode: "ADD",
    tint: [0xffe186, 0xffffff, 0xffa2c4],
  });

  particles.setDepth(99999);
  scene.time.delayedCall(1000, () => particles.destroy());
}

function triggerMagicFx(scene, npcRuntime) {
  const magic = scene.add.particles(npcRuntime.anchor.x, npcRuntime.anchor.y - 110, "particle-dot", {
    speed: { min: 20, max: 110 },
    angle: { min: 0, max: 360 },
    lifespan: 1200,
    quantity: 18,
    scale: { start: 0.65, end: 0.05 },
    blendMode: "ADD",
    tint: [0x8fd3ff, 0xffffff, 0xa89bff],
  });

  magic.setDepth(100000);
  scene.tweens.add({
    targets: magic,
    x: npcRuntime.anchor.x + 34,
    y: npcRuntime.anchor.y - 150,
    duration: 450,
    yoyo: true,
    ease: "Sine.easeInOut",
  });

  scene.time.delayedCall(1300, () => magic.destroy());
}

function startGame() {
  if (state.game) {
    return;
  }

  state.game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: "game-root",
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: "#566d8a",
    pixelArt: true,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 0 },
        debug: false,
      },
    },
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: MainScene,
  });
}

function setupEvents() {
  setupJoystick();

  dom.talkBtn.addEventListener("click", tryTalk);
  dom.jumpBtn.addEventListener("click", tryJump);
  dom.nextBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    advanceDialogue();
  });
  dom.panel.addEventListener("click", (event) => {
    if (event.target.closest("button")) {
      return;
    }
    advanceDialogue();
  });
  dom.overlay.addEventListener("click", advanceDialogue);
  dom.endingCloseBtn.addEventListener("click", closeEnding);

  dom.guideBadge.textContent = "중세 마을길 - 성으로 이동";

  startGame();
}

setupEvents();
