# 🚀 Project Setup Guide

Welcome! This guide will help you install and set up **React** and **Tailwind CSS** in your project.

---

## 📦 React Installation

Follow these steps to get started with React:

---

### 1. Install Node.js
Download and install Node.js from the official website:  
https://nodejs.org/

> Node.js includes **npm (Node Package Manager)**, which is required for React.

---

### 2. Verify Installation

-> Open your terminal or command prompt and run:

```bash
node -v
```

```bash
npm -v
```

---

### 3. Fix (recommended)

-> If "npm -v" gives an error like this.  
-> This error: "npm.ps1 cannot be loaded because running scripts is disabled"  
-> means PowerShell is preventing .ps1 files (like npm) from running.  
-> Run PowerShell as Administrator, then execute:

```bash
Set-ExecutionPolicy RemoteSigned
```

-> Then type:

```bash
Y
```

---

### 4. Install React Framework
-> If both commands return a version number, you're good to go.

```bash
npm install
```

```bash
npm run
```

```bash
npm run dev
```

---

# 🎨 Tailwind CSS Setup Guide

This guide will help you install and configure **Tailwind CSS** in your project.

---

## 📦 Installation

Follow these steps to get started with Tailwind CSS:

---

### 1. Install Tailwind CSS

-> Open your terminal and run:

```bash
npm install -D tailwindcss postcss autoprefixer
```

---

### 2. Configure Tailwind

-> Open the tailwind.config.js file  
-> Update the content section:

```bash
content: [
  "./src/**/*.{js,jsx,ts,tsx}",
],
```

---

### 3. Add Tailwind to CSS

-> Open your main CSS file (e.g., src/index.css)  
-> Add the following lines:

```bash
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

### 4. PDF Viewer

-> Install the required package by running:

```bash
npm install pdfjs-dist
```