# WonderSnap

**Gesture-controlled 3D models made of glowing light particles, running entirely in your browser.**

Snap your fingers in front of your webcam and up to 250,000 GPU particles swirl into existence. Make a fist and they form the Eiffel Tower, a beating heart or a V8 engine. Open your hand and the model morphs into the next one, or explodes into a labelled diagram of every part.

No mouse, no controller, no installation beyond Node.js.

![WonderSnap showing a beating human heart made of particles](docs/preview.png)

## Quick Start

You need [Node.js](https://nodejs.org/) 18 or newer and a webcam. Everything also works with the mouse and keyboard.

```bash
git clone https://github.com/kirollos123/wondersnap.git
cd wondersnap
npm install
npm start
```

Then open **http://localhost:5173** in Chrome or Edge and click **Start with camera**, or **Continue without camera** to use the on-screen buttons and keyboard.

> The browser only allows camera access on `localhost` or `https`, which is why the app comes with its own tiny local server. To use a different port: `npm start -- 8080`.

## How It Works

| Layer | What it does |
|---|---|
| **Hand tracking** | [MediaPipe Hand Landmarker](https://ai.google.dev/edge/mediapipe/solutions/vision/hand_landmarker) tracks up to two hands (21 landmarks each) from the webcam, fully on-device. |
| **Gesture recognition** | Custom classifiers recognize poses (fist, open, point, pinch, peace), finger snaps, hand twists, tilts, and two-hand zoom. |
| **Particle engine** | A hand-written WebGL2 renderer. Particle physics runs on the GPU with transform feedback: no Three.js, no game engine, no framework. |
| **Models** | 35 procedural models built from real measurements and sampled into point clouds, with named parts that can explode, glow, and be pulled out. |
| **Server** | A zero-dependency Node.js static server (`server.mjs`). |

Nothing is sent anywhere: the video never leaves your machine.

## Gestures

| Gesture | What it does |
|---|---|
| 🫰 **Snap** | Summon the particles, or dissolve the current model. |
| ✊ **Fist** | Form the wonder, organ, or machine. |
| ✋ **Open hand** | Wonders morph to the next model. Organs, engines, and vehicles explode into their individual parts. Closing your hand brings them back together. |
| 🔄 **Twist / raise your hand** | Turn and tilt the formed model. |
| ☝️ **Point** | Hold your finger on a part to select it. It glows, and a card explains what it does. |
| 🤏 **Pinch** | Pull the selected part out toward you; pinch again to put it back. |
| 🙌 **Two hands** | Move them apart or together to zoom. |
| ✌️ **Peace** | Jump to the next model. |

## Keyboard and Mouse

| Key | Action |
|---|---|
| `Space` | Snap |
| `F` / `O` / `V` | Fist / open hand / peace sign |
| `←` `→` | Previous / next model |
| `E`, `↑` `↓`, mouse wheel | Explode amount |
| `+` `-` `0`, Ctrl + wheel | Zoom |
| `C` | Camera on/off |
| `L` | Part labels |
| `R` | Auto-rotate |
| `G` | Hand rotation on/off |
| `X` | Cut-away cross-section (`,` and `.` nudge the plane) |
| `Q` | Quiz mode |
| `M` | Voice commands and read-aloud |
| `K` | Record a video |
| `D` | Play the demo |
| `I` / `Esc` | Describe / deselect the selected part |
| `H` | Help |

Click a part to select it, or drag to rotate the model.

## Features

- **Beating heart and breathing lungs:** The heart contracts in a lub-dub rhythm at 72 bpm, the lungs inflate every 4.5 seconds, and pulses of light travel through them like blood or air.
- **Exploded views with named parts:** Every part has a leader-line label explaining its function.
- **Quiz mode:** "Find: Hippocampus" — point at or click the correct part. Five questions, with a score.
- **Voice control:** Say "show me the heart", "open it up", "where is the right atrium", "zoom in", "quiz", and more. Parts are read aloud using speech synthesis in Chrome or Edge.
- **Cut-away:** A cutting plane follows your hand and reveals a glowing cross-section.
- **Recording:** Save a WebM video of the scene.

## Models

| Category | Models |
|---|---|
| **Wonders (11)** | Turtle Tower, Eiffel Tower, Statue of Liberty, Burj Khalifa, Great Pyramid, Colosseum, Leaning Tower of Pisa, Taj Mahal, Big Ben, Christ the Redeemer, Sydney Opera House |
| **Anatomy (10)** | Brain, beating Heart, Kidney, breathing Lungs, Eye, Ear, Tooth, Skull, Skeleton, Human Body (skin, organs, nerves, arteries, veins, skeleton) |
| **Biology (2)** | DNA double helix that unzips, Animal cell |
| **Engines (4)** | Inline-4, Supercharged HEMI V8, Turbofan jet, 9-cylinder radial |
| **Vehicles (4)** | Sports car, Motorcycle, Airliner, Saturn V (with stage separation) |
| **Machines (2)** | Mechanical wristwatch, EV battery pack (280 cells, busbars, cooling, BMS) |
| **Football (1)** | Football Pitch with two teams, 22 players, player positions, and a match ball |
| **Space (1)** | Solar System featuring the Sun, eight planets, orbital paths, Saturn's rings, and Earth's Moon |

## My Contributions & Extensions

This repository is based on the original WonderSnap project by **Akbar Sheikh**. I extended the original project with additional procedural 3D models focused on football and space exploration, while preserving its original architecture, rendering engine, and gesture interaction system.

### 1. Football Visualization ⚽

Added a procedural 3D football pitch using the existing GPU particle engine.

**What's included:**

- A football pitch with boundaries, halfway line, centre circle, and penalty areas.
- Two teams represented by different particle colors.
- 22 player models: 11 players per team.
- Player positions represented by Goalkeeper (GK), Defenders (DF), Midfielders (MF), and Forwards (FW).
- Individual player body and head particle groups.
- A football positioned on the pitch.
- Separate model groups integrated with the existing particle model system.

**Source file:** `src/models/football.js`

### 2. Solar System Visualization 🪐

Added a procedural 3D Solar System featuring the Sun and all eight planets.

**What's included:**

- The Sun and eight planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune.
- Individual orbital paths for the planets.
- Distinct particle colors and visual sizes.
- Saturn's rings represented as separate geometry.
- Earth's Moon and its orbital path.
- Informational descriptions for the Sun, planets, Saturn's rings, and the Moon.
- Individual model groups integrated with the existing particle model system.

**Source file:** `src/models/space.js`

### 3. Model Catalog Integration

- Registered the new Football and Space models in `src/models/catalog.js`.
- Added both models to the existing model catalog.
- Integrated them into the original model-building pipeline so they can use the existing particle rendering and interaction features.

### 4. Interface and Local Launch Improvements

- Updated `styles.css` to support the visual presentation of the additions.
- Added `launch.sh`, a convenience script for launching WonderSnap locally on Linux using Chrome app mode.
- Preserved `styles.css.backup` as a backup of the original stylesheet.

### Extension Files

| File | Description |
|---|---|
| `src/models/football.js` | Procedural football pitch, teams, players, and match ball. |
| `src/models/space.js` | Sun, eight planets, orbital paths, Saturn's rings, and Earth's Moon. |
| `src/models/catalog.js` | Registration of the new models. |
| `styles.css` | Interface styling updates. |
| `launch.sh` | Linux launch helper. |
| `styles.css.backup` | Original stylesheet backup. |

**Important:** These are extensions to the original WonderSnap project. The original gesture recognition, WebGL2 particle engine, and existing models remain part of the project.

## Gesture Sensitivity

The **Gesture sensitivity** control in the status panel defaults to **Standard**, which preserves the original gesture thresholds.

**More forgiving** slightly relaxes static hand-pose recognition and openness. Snap and pinch detection remain unchanged. The selection lasts only for the current page session.

## URL Options

| Option | Effect |
|---|---|
| `?n=250000` | Particle count |
| `?model=12` | Start on a given model |
| `?autostart=camera` / `?autostart=nocamera` | Skip the start screen |
| `?trails=0` | Turn off particle trails |
| `?dpr=1` | Force the device pixel ratio (useful on slower GPUs) |

## Tests

39 end-to-end and unit tests with [Playwright](https://playwright.dev/), driving the real app with synthetic hands on a deterministic clock.

```bash
npx playwright install chromium   # one time
npm test
```

| Spec | Covers |
|---|---|
| `app.spec.js` | The full gesture story, every model, explode/contract, keyboard, wheel, tabs, demo, phone layout, hand twist and tilt. |
| `features.spec.js` | Heartbeat and breathing, two-hand zoom, point-to-pick, pinch-to-pull, quiz, voice commands, cut-away, video recording. |
| `camera.spec.js` | Real `getUserMedia` to MediaPipe on Chromium's fake webcam, plus the camera-denied fallback. |
| `gpu.spec.js` | The GPU physics shader matches its CPU twin to approximately 1e-7 in every mode. |
| `logic.spec.js` | Pose classifiers, snap detector, debouncer, state machine, controller, voice-command parser. |
| `models.spec.js` | Every original model is deterministic, finite, and fast, with real measurements and correctly exploding parts. |

## Project Structure

```text
index.html, styles.css     Page and styles
server.mjs                 Zero-dependency static server
models/                    MediaPipe hand landmark model
src/app.js                 Render loop, explode, zoom, picking, quiz, cut-away, HUD, labels, demo
src/hands.js               Webcam + MediaPipe Hand Landmarker
src/features.js            Voice commands, read-aloud, video recorder
src/gl/                    WebGL2 shaders and renderer (transform-feedback physics)
src/logic/                 Gestures, state machine, controller, CPU physics twin
src/lib/                   Vector math, samplers, procedural shapes
src/models/                Wonders, anatomy, biology, engines, vehicles, machines, football, space
tests/                     Playwright specs
launch.sh                  Linux launch helper
```

## Troubleshooting

- **Camera doesn't start:** Open the app via `http://localhost:5173`, not by double-clicking `index.html`, and allow camera access when the browser asks.
- **Hand tracking never loads:** Run `npm install` first; the tracking runtime is served from `node_modules`.
- **Low frame rate:** Try `http://localhost:5173/?n=100000&dpr=1`.
- **Port already in use:** Run `npm start -- 8080` and open `http://localhost:8080`.

## License

[MIT](LICENSE) © 2026 Akbar Sheikh

## Acknowledgment

Original project created by [Akbar Sheikh](https://github.com/AkbarSheikh-debug).

This repository maintains the original project and documents additional contributions and extensions separately.