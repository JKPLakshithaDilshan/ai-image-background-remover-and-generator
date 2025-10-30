# AI Image Background Remover & Generator

An AI-powered web application for removing image backgrounds and generating new AI-created images.
Built with React and TypeScript.

## ✨ Features

- **AI Background Remover:** Instantly erase backgrounds from your images.
- **AI Image Generator:** Create new, unique images using generative AI (Gemini API).
- **Simple Interface:** User-friendly with tab-based navigation.
- **Works Locally:** Runs entirely in your browser – no data leaves your machine.

## 📸 Screenshots

<!--
Add screenshots or demo GIFs here:
![Screenshot](./screenshot.png)
-->

## 🚀 Tech Stack

- **Frontend:** React, TypeScript, Vite
- **AI Service:** Gemini API

## 🛠️ Installation

1. **Clone the repository:**  
   ```bash
   git clone https://github.com/YOUR-USERNAME/ai-image-background-remover-and-generator.git
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

## 🙌 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

[MIT](LICENSE)  
&copy; 2025 Your Name

---

*Made with ❤️ using React & AI.*
