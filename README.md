# Malaysian Night-Heron Invasion
### 黑冠麻鷺大進擊

A browser-based vertical shooter where you play as a **Malayan Night Heron (黑冠麻鷺, *Gorsachius melanolophus*)** fighting through 10 waves of birds.

🎮 **Play now:** https://phoenix-game-one.vercel.app

---

## Gameplay

- **10 waves** of enemy bird formations in Space Invaders style
- **Wave 10** is a boss fight against the Crested Goshawk (鳳頭蒼鷹) with 3 phases
- Survive all 10 waves to win

### Controls

| Action | Keyboard | Mobile |
|--------|----------|--------|
| Move | Arrow keys / WASD | Drag to move |
| Shoot | Space | Auto-fire while touching |
| Shield | Shift / Z | 🛡 button (bottom-right) |

---

## Systems

### Weapon Levels (Lv 1–4)
Collect ⭐ power-ups to upgrade. Being hit drops one level.

| Level | Color | Pattern | Cooldown |
|-------|-------|---------|----------|
| Lv1 | Yellow | Single shot | 30 frames |
| Lv2 | Cyan | Double shot | 27 frames |
| Lv3 | Pink | Triple scatter | 25 frames |
| Lv4 | Red | Quad plasma | 22 frames |

### Shield
Hold Shift (or tap 🛡) to activate. Blocks enemy bullets and scores +10 per block. Recharges automatically when inactive.

### Item Drops
| Item | Drop Rate | Effect |
|------|-----------|--------|
| 💊 Health | 7% | +1 life (max 5) |
| ⭐ Weapon Up | 8% | Upgrade weapon level |
| 🛡 Shield | 6%* | Restore 40% shield |

*Shield item only drops when shield is below 50%.

### Scoring
| Target | Points |
|--------|--------|
| 麻雀 Sparrow | 100 |
| 八哥 Myna | 200 |
| 喜鵲 Magpie | 300 |
| Boss wing (×2) | 500 each |
| Boss core | 3,000 |
| Shield block | +10 per bullet |

---

## Boss — Crested Goshawk (鳳頭蒼鷹)

Three phases:

1. **Shield Phase** — Protected by a cyan energy shield; destroy the shield to proceed
2. **Wing Phase** — Each wing is an independent target; left wing drops ⭐, right wing drops 💊
3. **Berserk Phase** — Faster movement, 8-way bullet spread, red glow

Defeating the boss triggers a **victory screen** with rainbow animation before the score submission.

---

## Leaderboard

- Global Top 10 stored on **Upstash Redis** (Vercel KV)
- Enter your name (up to 6 characters) after each run
- Fields: Name · Score · Wave reached · Date
- Total play count displayed on title screen and leaderboard
- Falls back to `localStorage` if the server is unreachable

---

## Tech

- Single HTML file frontend — no build step, no client-side dependencies
- Canvas 2D rendering at 560×800 logical resolution, mobile-adaptive scaling
- Procedural BGM and SFX via **Web Audio API** (no audio files)
  - Title / Game / Boss BGM loops
  - Sound effects: shoot, explosion, hit, power-up, shield, wave clear, game over
- **Upstash Redis** (via Vercel KV) for global leaderboard and play count
- `localStorage` fallback when offline

---

## Development

```bash
# Clone
git clone https://github.com/lcat2000/phoenix-game.git
cd phoenix-game

# Open directly in browser — no server needed
open index.html
```

Deployed automatically to Vercel on every push to `master`.
