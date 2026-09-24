# CropGuard On-Device

**Real-time crop disease detection + offline advisory for farmers on Snapdragon HP AI PCs**

A privacy-first, offline-capable AI agent that detects crop diseases from camera images, explains findings in local languages (Hindi + English), and generates actionable treatment steps — fully optimized to run on the Snapdragon X Elite/Plus Hexagon NPU (45 TOPS) in HP AI PCs (e.g., HP OmniBook X).

Built for the **Snapdragon® AI Lab Build & Present Challenge**.

## Live Demo

- Interactive web demo (client-side simulation of NPU + local LLM path)
- Upload leaf images or try samples
- Toggle offline mode
- Hindi / English advisory generation
- Confidence scores + Grad-CAM style heatmap overlay

## Target Hardware

- **HP OmniBook X / OmniBook 5** (Snapdragon X Elite / X Plus)
- 45 TOPS Hexagon NPU, 16 GB+ RAM, Windows 11 Copilot+ PC

## Core Features (MVP)

1. **On-device disease detection** — Quantized CNN/ViT (MobileNetV3 / EfficientNet-Lite) fine-tuned on PlantVillage-style datasets. Top-3 diseases + confidence + heatmap.
2. **Local-language advisory** — Small on-device LLM (1–3B quantized) generates plain-language explanation, organic + chemical treatment steps, and prevention tips.
3. **Offline-first** — No internet required after install. Ideal for rural / low-connectivity scenarios and privacy.

## Technical Architecture

```
Image Capture → Preprocess → Hexagon NPU Inference (INT8/INT4) → Disease labels + heatmap
       ↓
Structured prompt → Local LLM (NPU/CPU) → Advisory text (HI/EN)
       ↓
UI + Downloadable PDF
```

- **AI runtime**: Qualcomm AI Hub / SNPE targeting Hexagon NPU
- **Vision**: MobileNetV3 / EfficientNet-Lite (quantized)
- **LLM**: Phi-3-small / Granite-4 class (4-bit)
- **Frontend**: WinUI / PWA / this demo web UI

## Stretch Goals

- Voice interface (Whisper-small ASR + TTS)
- Multi-disease & severity scoring
- Personal RAG over local agri-extension PDFs

## Demo Script (3–5 min)

1. Context (20s): Millions of smallholder farmers lose yield to late detection; internet unreliable.
2. Live demo: Capture/upload → instant diagnosis + heatmap → “Explain in Hindi” → offline (airplane mode).
3. Impact: NPU usage, 45 TOPS, battery efficiency, privacy, social good.

## Repository Structure

```
├── index.html      # Main demo UI
├── styles.css      # Dark agri-tech theme
├── app.js          # Detection + advisory simulation
└── README.md
```

## Deploy

Static site — drop on any host or Vercel / Netlify.

```bash
# Local preview
npx serve .
```

## License

MIT — for educational and competition use.

---

**CropGuard On-Device** — Built for Snapdragon® AI Lab Build & Present Challenge  
Optimized for HP OmniBook X • Snapdragon X Elite/Plus • 45 TOPS Hexagon NPU
