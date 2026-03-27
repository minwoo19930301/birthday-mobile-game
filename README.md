# CHAEEUN Birthday Castle

개인용으로 만든 모바일 2D 타일 기반 RPG/MMORPG 감성의 생일 축하 게임입니다. 플레이어 `채은`이 중세 마을 길을 따라 성으로 올라가며 NPC들의 축하 대사를 듣고, 마지막에 케이크 엔딩을 보는 구조입니다.

## Links

- Live site: [CHAEEUN Birthday Castle](https://soft-salad-7a8b.rlaalsdn456456.workers.dev/)
- GitHub: [minwoo19930301/birthday-mobile-game](https://github.com/minwoo19930301/birthday-mobile-game)
- Hosting platform: `Cloudflare Workers Static Assets`

## How To Use

1. 사이트를 열면 바로 중세 마을길에서 게임이 시작됩니다.
2. 모바일에서는 화면 좌측 조이스틱으로 이동합니다.
3. `말 걸기` 버튼으로 가까운 NPC와 대화합니다.
4. 길을 따라 성문과 성 내부 복도를 지나면서 축하 메시지를 순서대로 확인합니다.
5. 마지막 NPC 구간을 지나면 케이크 엔딩 패널이 열립니다.
6. `산책 계속하기`로 엔딩 이후에도 계속 돌아다닐 수 있습니다.

## Local Run

```bash
python3 -m http.server 5174 --bind 127.0.0.1 --directory "/Users/minwokim/Documents/New project/birthday-mobile-game"
```

브라우저: `http://127.0.0.1:5174`

## Stack

- `Phaser 3`
- tile sheet based map rendering
- custom portrait-driven NPC dialogue
- `Cloudflare Workers` static hosting

## Gameplay

- 시작 선택창 없음
- 주인공 고정: `채은`
- 모바일 기준 세로 진행형 단일 동선
- 중세 마을 -> 성문 -> 성 내부 복도 순서로 이동
- NPC 좌우 줄 배치 + 떠있는 애니메이션 + 축제 연출
- 점프 버튼 지원
- 마지막에는 케이크만 보여주는 엔딩 패널

## Controls

- 모바일 조이스틱: 이동
- `말 걸기`: 가까운 NPC 대화 시작 / 다음 대사 진행
- `점프`: 점프
- 엔딩 패널 `산책 계속하기`: 엔딩 닫기

## Files

- `index.html`: 게임 HUD, 대화 패널, 엔딩 패널
- `game.js`: Phaser 씬, 이동, 대화, 조이스틱, 엔딩 로직
- `style.css`: 모바일 세로형 레이아웃 스타일
- `assets/portraits`: NPC 및 케이크 이미지 자산

## Portrait Assets

경로: `/Users/minwokim/Documents/New project/birthday-mobile-game/assets/portraits`

- `carry.png`
- `leetaegon.png`
- `hailey.png`
- `pery.png`
- `gazelle.png`
- `jenny.png`
- `hazzu.png`
- `husband.png`
- `cake.png`

## Notes

- 개인 선물용 프로젝트라 원본 캐릭터 이미지를 포함합니다.
- 공개 배포보다는 개인 공유를 전제로 관리하는 편이 안전합니다.
