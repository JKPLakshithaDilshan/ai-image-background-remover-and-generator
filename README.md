# AI Image Background Remover & Generator

An AI-powered web application for removing image backgrounds and generating new AI-created images.
Built with React and TypeScript.

## ✨ Features

- **AI Background Remover:** Instantly erase backgrounds from your images.
- **AI Image Generator:** Create new, unique images using generative AI (Gemini API).
- **Simple Interface:** User-friendly with tab-based navigation.
- **Works Locally:** Runs entirely in your browser – no data leaves your machine.

## 📸 Screenshots

<img src="./Sample Images/sample.png" width="100%" alt="Dashboard" />

## 🚀 Tech Stack

- **Frontend:** React, TypeScript, Vite
- **AI Service:** Gemini API

## 🛠️ Installation

1. **Clone the repository:**  
   ```bash
   git clone https://github.com/JKPLakshithaDilshan/ai-image-background-remover-and-generator.git
   cd ai-image-background-remover-and-generator
   ```

2. **Install dependencies:**  
   ```bash
   npm install
   ```

3. **Configure API Keys:**  
   Update your Gemini API key in `services/geminiService.ts` as needed.

4. **Run the app locally:**  
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173).

## 🧩 Folder Structure

```
.
├── App.tsx
├── components/
│   ├── BackgroundRemover.tsx
│   ├── ImageGenerator.tsx
│   ├── Tabs.tsx
│   └── icons.tsx
├── services/
│   └── geminiService.ts
├── utils/
│   └── fileUtils.ts
├── index.tsx
├── index.html
├── package.json
└── vite.config.ts
```

## 📜 License
This project is for academic purposes only. All rights reserved to the authors.

## 📬 Contact
Have questions? Reach out via:

GitHub: https://github.com/JKPLakshithaDilshan

Email: lakshithadilshan.info@gmail.com

---

*Made with ❤️ using React & AI.*
