// CropGuard On-Device Demo — Client-side simulation of NPU + local LLM path
// For Snapdragon AI Lab Build & Present Challenge

const DISEASE_DB = {
  tomato_late_blight: {
    name: "Tomato Late Blight",
    nameHi: "टमाटर लेट ब्लाइट",
    confidences: [
      { label: "Tomato Late Blight", pct: 94 },
      { label: "Tomato Early Blight", pct: 4 },
      { label: "Healthy", pct: 2 }
    ],
    en: {
      explanation: "Late blight is caused by the oomycete Phytophthora infestans. It thrives in cool, moist conditions and can destroy foliage and fruit rapidly. Dark water-soaked lesions with pale green borders are typical.",
      treatment: [
        "Remove and destroy all infected leaves and fruit immediately (do not compost).",
        "Apply copper-based fungicide (e.g., Bordeaux mixture) or approved systemic fungicides at first sign.",
        "Improve air circulation; avoid overhead irrigation late in the day.",
        "For organic option: use copper soap or Bacillus subtilis based bio-fungicides."
      ],
      prevention: [
        "Plant resistant varieties when available.",
        "Space plants for good airflow and stake them.",
        "Rotate crops; avoid planting tomatoes after potatoes.",
        "Monitor weather forecasts for prolonged leaf wetness."
      ]
    },
    hi: {
      explanation: "लेट ब्लाइट फाइटोफ्थोरा इन्फेस्टन्स नामक कवक के कारण होता है। यह ठंडी और नम परिस्थितियों में तेजी से फैलता है। पत्तियों पर गहरे पानी से भरे धब्बे दिखाई देते हैं।",
      treatment: [
        "संक्रमित पत्तियों और फलों को तुरंत हटाकर नष्ट करें (कम्पोस्ट न बनाएं)।",
        "कॉपर आधारित फफूंदनाशक (बोर्दो मिश्रण) या अनुमोदित प्रणालीगत फफूंदनाशक का छिड़काव करें।",
        "हवा का संचार बढ़ाएं; देर शाम पानी न दें।",
        "जैविक विकल्प: कॉपर साबुन या बेसिलस सबटिलिस आधारित जैव-फफूंदनाशक।"
      ],
      prevention: [
        "प्रतिरोधी किस्में लगाएं।",
        "पौधों के बीच उचित दूरी रखें और सहारा दें।",
        "फसल चक्र अपनाएं; आलू के बाद टमाटर न लगाएं।",
        "लंबे समय तक पत्ती गीली रहने वाले मौसम पर नजर रखें।"
      ]
    }
  },
  potato_early_blight: {
    name: "Potato Early Blight",
    nameHi: "आलू अर्ली ब्लाइट",
    confidences: [
      { label: "Potato Early Blight", pct: 91 },
      { label: "Potato Late Blight", pct: 6 },
      { label: "Healthy", pct: 3 }
    ],
    en: {
      explanation: "Early blight is caused by Alternaria solani. It appears as target-like concentric rings on older leaves. Stress and nutrient deficiency increase susceptibility.",
      treatment: [
        "Remove lower infected leaves carefully.",
        "Apply fungicides containing chlorothalonil, mancozeb or copper at recommended intervals.",
        "Ensure adequate potassium and balanced fertilization.",
        "Organic: neem oil + copper soap rotations can help reduce pressure."
      ],
      prevention: [
        "Use certified disease-free seed tubers.",
        "Practice 2–3 year crop rotation.",
        "Avoid overhead watering; keep foliage dry.",
        "Mulch to reduce soil splash onto leaves."
      ]
    },
    hi: {
      explanation: "अर्ली ब्लाइट अल्टरनेरिया सोलानी के कारण होता है। पुरानी पत्तियों पर लक्ष्य जैसे छल्ले दिखाई देते हैं। पोषक तत्वों की कमी से जोखिम बढ़ता है।",
      treatment: [
        "निचली संक्रमित पत्तियों को सावधानी से हटाएं।",
        "क्लोरोथैलोनिल, मैंकोजेब या कॉपर युक्त फफूंदनाशक का छिड़काव करें।",
        "पर्याप्त पोटाश और संतुलित उर्वरक सुनिश्चित करें।",
        "जैविक: नीम तेल + कॉपर साबुन के चक्र उपयोगी हो सकते हैं।"
      ],
      prevention: [
        "प्रमाणित रोग-मुक्त बीज कंद उपयोग करें।",
        "2–3 वर्ष का फसल चक्र अपनाएं।",
        "ऊपर से पानी देने से बचें; पत्ते सूखे रखें।",
        "मल्चिंग से मिट्टी का छींटा कम करें।"
      ]
    }
  },
  apple_scab: {
    name: "Apple Scab",
    nameHi: "सेब स्कैब",
    confidences: [
      { label: "Apple Scab", pct: 89 },
      { label: "Cedar Apple Rust", pct: 7 },
      { label: "Healthy", pct: 4 }
    ],
    en: {
      explanation: "Apple scab is caused by Venturia inaequalis. Olive-green to black lesions appear on leaves and fruit. It overwinters in fallen leaves.",
      treatment: [
        "Apply fungicides (captan, myclobutanil or sulfur) from green tip through petal fall as needed.",
        "Rake and destroy fallen leaves in autumn to reduce inoculum.",
        "Prune for better air flow and sunlight penetration.",
        "Organic orchards: use sulfur or potassium bicarbonate sprays."
      ],
      prevention: [
        "Plant scab-resistant cultivars where possible.",
        "Remove nearby wild hosts if practical.",
        "Maintain good sanitation — no leaf litter under trees.",
        "Monitor degree-day models for infection periods."
      ]
    },
    hi: {
      explanation: "सेब स्कैब वेंटूरिया इनेक्वेलिस के कारण होता है। पत्तियों और फलों पर जैतून-हरे से काले धब्बे बनते हैं। यह गिरी हुई पत्तियों में सर्दी बिताता है।",
      treatment: [
        "हरे सिरे से पंखुड़ी गिरने तक आवश्यकतानुसार फफूंदनाशक (कैप्टन, माइक्लोब्यूटानिल या सल्फर) का छिड़काव करें।",
        "शरद ऋतु में गिरी पत्तियों को इकट्ठा कर नष्ट करें।",
        "हवा और धूप के लिए छंटाई करें।",
        "जैविक: सल्फर या पोटेशियम बाइकार्बोनेट स्प्रे।"
      ],
      prevention: [
        "स्कैब-प्रतिरोधी किस्में लगाएं।",
        "आसपास के जंगली मेजबान हटाएं यदि संभव हो।",
        "सफाई बनाए रखें — पेड़ों के नीचे पत्ते न छोड़ें।",
        "संक्रमण अवधियों के लिए डिग्री-डे मॉडल की निगरानी करें।"
      ]
    }
  },
  healthy: {
    name: "Healthy Leaf",
    nameHi: "स्वस्थ पत्ती",
    confidences: [
      { label: "Healthy", pct: 97 },
      { label: "Early Blight", pct: 2 },
      { label: "Nutrient Deficiency", pct: 1 }
    ],
    en: {
      explanation: "No disease symptoms detected. Leaf appears healthy with uniform green color and no lesions, spots, or discoloration indicative of common fungal or bacterial pathogens.",
      treatment: [
        "No treatment required.",
        "Continue regular monitoring every 5–7 days during humid periods.",
        "Maintain balanced nutrition and irrigation."
      ],
      prevention: [
        "Keep practicing good cultural hygiene.",
        "Scout regularly for early signs of stress or infection.",
        "Ensure adequate spacing and airflow."
      ]
    },
    hi: {
      explanation: "कोई रोग लक्षण नहीं पाए गए। पत्ती स्वस्थ दिख रही है — एक समान हरा रंग, कोई धब्बे या मलिनकिरण नहीं।",
      treatment: [
        "किसी उपचार की आवश्यकता नहीं।",
        "नम अवधि में हर 5–7 दिन में नियमित निगरानी जारी रखें।",
        "संतुलित पोषण और सिंचाई बनाए रखें।"
      ],
      prevention: [
        "अच्छी सांस्कृतिक स्वच्छता बनाए रखें।",
        "तनाव या संक्रमण के शुरुआती संकेतों के लिए नियमित स्काउटिंग करें।",
        "पर्याप्त दूरी और हवा का संचार सुनिश्चित करें।"
      ]
    }
  }
};

let currentDisease = null;
let currentLang = "en";
let offlineMode = false;

// DOM
const dropZone = document.getElementById("drop-zone");
const imageInput = document.getElementById("image-input");
const previewWrap = document.getElementById("preview-wrap");
const previewImg = document.getElementById("preview-img");
const heatmapCanvas = document.getElementById("heatmap-canvas");
const detectionStatus = document.getElementById("detection-status");
const resultsEl = document.getElementById("results");
const confidenceList = document.getElementById("confidence-list");
const advisoryEl = document.getElementById("advisory");
const offlineBanner = document.getElementById("offline-banner");
const offlineToggle = document.getElementById("offline-toggle");

// Offline toggle
offlineToggle.addEventListener("click", () => {
  offlineMode = !offlineMode;
  offlineBanner.classList.toggle("hidden", !offlineMode);
  offlineToggle.textContent = offlineMode ? "Online Mode" : "Toggle Offline";
});

// Drop zone
dropZone.addEventListener("click", () => imageInput.click());
dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropZone.classList.add("dragover");
});
dropZone.addEventListener("dragleave", () => dropZone.classList.remove("dragover"));
dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropZone.classList.remove("dragover");
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith("image/")) handleImage(file);
});
imageInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) handleImage(file);
});

// Sample buttons
document.querySelectorAll(".sample-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const key = btn.dataset.disease;
    runDetection(key, null);
  });
});

// Language toggle
document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".lang-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentLang = btn.dataset.lang;
    if (currentDisease) renderAdvisory(currentDisease);
  });
});

function handleImage(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    previewImg.src = e.target.result;
    previewWrap.classList.remove("hidden");
    // Simulate random disease for uploaded images (demo)
    const keys = Object.keys(DISEASE_DB);
    const randomKey = keys[Math.floor(Math.random() * (keys.length - 1))]; // bias away from healthy
    runDetection(randomKey, e.target.result);
  };
  reader.readAsDataURL(file);
}

function runDetection(diseaseKey, imageSrc) {
  currentDisease = diseaseKey;
  const data = DISEASE_DB[diseaseKey];

  // Reset UI
  resultsEl.classList.add("hidden");
  advisoryEl.classList.add("hidden");
  detectionStatus.className = "processing";
  detectionStatus.textContent = offlineMode
    ? "🔒 Offline • Running on Hexagon NPU (simulated)…"
    : "⚡ Running quantized model on NPU path…";

  // Show placeholder leaf if sample
  if (!imageSrc) {
    previewImg.src = createPlaceholderLeaf(diseaseKey);
    previewWrap.classList.remove("hidden");
  }

  // Simulate inference latency (NPU is fast)
  setTimeout(() => {
    detectionStatus.className = "done";
    detectionStatus.textContent = offlineMode
      ? `✅ Offline inference complete • ${data.confidences[0].pct}% confidence`
      : `✅ NPU inference complete • ${data.confidences[0].pct}% confidence`;

    // Confidence bars
    confidenceList.innerHTML = data.confidences
      .map(
        (c) => `
      <div class="conf-item">
        <span class="conf-label">${c.label}</span>
        <div class="conf-bar"><div class="conf-fill" style="width:0%" data-w="${c.pct}"></div></div>
        <span class="conf-pct">${c.pct}%</span>
      </div>`
      )
      .join("");

    resultsEl.classList.remove("hidden");

    // Animate bars
    requestAnimationFrame(() => {
      document.querySelectorAll(".conf-fill").forEach((el) => {
        el.style.width = el.dataset.w + "%";
      });
    });

    // Draw simple heatmap overlay
    drawHeatmap(diseaseKey !== "healthy");

    // Advisory after short delay (LLM tokens)
    setTimeout(() => {
      renderAdvisory(diseaseKey);
      advisoryEl.classList.remove("hidden");
    }, 400);
  }, 900 + Math.random() * 400);
}

function renderAdvisory(key) {
  const data = DISEASE_DB[key];
  const content = data[currentLang];
  document.getElementById("adv-explanation").textContent = content.explanation;
  document.getElementById("adv-treatment").innerHTML = content.treatment
    .map((t) => `<li>${t}</li>`)
    .join("");
  document.getElementById("adv-prevention").innerHTML = content.prevention
    .map((p) => `<li>${p}</li>`)
    .join("");
}

function drawHeatmap(showHotspots) {
  const canvas = heatmapCanvas;
  const ctx = canvas.getContext("2d");
  const rect = previewImg.getBoundingClientRect();
  canvas.width = previewImg.clientWidth || 400;
  canvas.height = previewImg.clientHeight || 220;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!showHotspots) {
    // Healthy — subtle green wash
    const g = ctx.createRadialGradient(
      canvas.width * 0.5,
      canvas.height * 0.5,
      10,
      canvas.width * 0.5,
      canvas.height * 0.5,
      canvas.width * 0.6
    );
    g.addColorStop(0, "rgba(34,197,94,0.15)");
    g.addColorStop(1, "rgba(34,197,94,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    return;
  }

  // Fake Grad-CAM style blobs
  const spots = [
    { x: 0.35, y: 0.4, r: 0.25 },
    { x: 0.65, y: 0.55, r: 0.2 },
    { x: 0.5, y: 0.3, r: 0.15 }
  ];
  spots.forEach((s) => {
    const g = ctx.createRadialGradient(
      canvas.width * s.x,
      canvas.height * s.y,
      0,
      canvas.width * s.x,
      canvas.height * s.y,
      canvas.width * s.r
    );
    g.addColorStop(0, "rgba(239,68,68,0.55)");
    g.addColorStop(0.5, "rgba(234,179,8,0.3)");
    g.addColorStop(1, "rgba(34,197,94,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  });
}

function createPlaceholderLeaf(key) {
  // Simple SVG data URI as placeholder
  const colors = {
    tomato_late_blight: "#4a7c4a",
    potato_early_blight: "#5a8a4a",
    apple_scab: "#3d7a3d",
    healthy: "#22c55e"
  };
  const c = colors[key] || "#4a7c4a";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="220" viewBox="0 0 400 220">
    <rect fill="#1a2a1a" width="400" height="220"/>
    <ellipse cx="200" cy="110" rx="120" ry="80" fill="${c}" opacity="0.9"/>
    <ellipse cx="200" cy="110" rx="90" ry="60" fill="${c}" opacity="0.7"/>
    <path d="M200 40 Q210 110 200 180" stroke="#2d5a2d" stroke-width="4" fill="none"/>
    <text x="200" y="205" text-anchor="middle" fill="#8a9a8a" font-size="12" font-family="sans-serif">Sample • ${key.replace(/_/g, " ")}</text>
  </svg>`;
  return "data:image/svg+xml;base64," + btoa(svg);
}

// Download advisory as simple text/PDF simulation
document.getElementById("download-pdf").addEventListener("click", () => {
  if (!currentDisease) return;
  const data = DISEASE_DB[currentDisease];
  const content = data[currentLang];
  const text = `
CropGuard On-Device Advisory
============================
Disease: ${currentLang === "hi" ? data.nameHi : data.name}
Confidence: ${data.confidences[0].pct}%

Explanation:
${content.explanation}

Treatment Steps:
${content.treatment.map((t, i) => `${i + 1}. ${t}`).join("\n")}

Prevention:
${content.prevention.map((p) => `• ${p}`).join("\n")}

---
Generated offline on Snapdragon Hexagon NPU
CropGuard • Privacy-first • No cloud required
  `.trim();

  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `CropGuard_Advisory_${currentDisease}_${currentLang}.txt`;
  a.click();
  URL.revokeObjectURL(url);
});

// Initial sample suggestion
console.log("CropGuard On-Device ready • Optimized for Snapdragon X Elite Hexagon NPU");
