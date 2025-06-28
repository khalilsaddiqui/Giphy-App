# Giphy Infinite Scroll App

A modern React + TypeScript application for browsing and searching GIFs using the Giphy API with infinite scroll and local feedback saving per GIF.

---

## 🔥 Features

1. **Trending GIFs:**

   * Loads trending GIFs from the Giphy API with infinite scroll.

2. **Search GIFs:**

   * Provides a search bar to query Giphy’s database for any keyword.
   * Scroll to load more results dynamically.

3. **Feedback Per GIF:**

   * Clicking a GIF opens a feedback form.
   * Users can leave a star rating (required) and optional comment.
   * Feedback is stored in `localStorage` and auto-loaded on revisit.

4. **Modern UI:**

   * Tailwind CSS used for beautiful, responsive styling.
   * SweetAlert2 integrated for validation and success alerts.

---

## 📦 Tech Stack

* React 18 + TypeScript
* Tailwind CSS
* React Router DOM
* Axios
* Giphy API
* SweetAlert2

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/giphy-infinite-scroll-app.git
cd giphy-infinite-scroll-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add Giphy API key

Edit `.env` and add:

```ts
REACT_APP_GIPHY_API_KEY = 'R9vnSDSGZGDmC85TkLhzkuYNZK6pWZLG';
```

> Get your key from [https://developers.giphy.com](https://developers.giphy.com)

### 4. Run locally

```bash
npm start
```

Open [http://localhost:3000]

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.tsx
│   ├── GifList.tsx
│   └── GifFeedback.tsx
├── types/
│   └── gif.d.ts
├── utils/
│   └── api.ts
├── App.tsx
└── main.tsx
```

---

## 💡 Future Improvements

* Replace number input with star icons for rating.
* Add unit tests.
* Enhance mobile responsiveness.

---

## 🧑‍💻 Author

[Khalil ur rehman]

---

## 📄 License

MIT
