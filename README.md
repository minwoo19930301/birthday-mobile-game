# CHAEEUN Birthday Castle

개인용으로 만든 모바일 2D 타일 기반 RPG/MMORPG 감성의 생일 축하 게임입니다. 플레이어 `채은`이 중세 마을 길을 따라 성으로 올라가며 NPC들의 축하 대사를 듣고, 마지막에 케이크 엔딩을 보는 구조입니다.

## Hosting

- Platform: `Cloudflare Workers Static Assets`
- Live URL: `https://soft-salad-7a8b.rlaalsdn456456.workers.dev/`
- GitHub repo: `private`

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
