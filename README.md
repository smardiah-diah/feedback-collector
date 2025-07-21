# Feedback Form App

A simple web application to collect user feedback using unique access codes. Built with **React**, **Tailwind CSS**, and **Supabase**.

---

## 🔧 Features

- Unique Code Validation (to access the form)
- Rating (sentiment) & topic-based tagging
- Feedback submission with comments
- Auto-save user name & code from localStorage
- Prevent multiple feedbacks with `is_used` flag
- Redirect to Thank You page after submission
- Admin-ready structure for future dashboard

---

## 🛠 Tech Stack

- **Frontend**: React, Tailwind CSS, React Router
- **Backend**: Supabase (PostgreSQL + Auth)
- **Deployment**: [Vercel](https://vercel.com/) *(recommended)*

---

## 📂 Folder Structure

```
src/
│
├── components/
│   └── CodeInput.jsx.js
│   └── FeedbackCard.jsx
│   └── FeedbackForm.jsx
│   └── FeedbackTable.jsx
│   └── Header.jsx
│
├── lib/
│   └── supabaseClient.js
│
├── pages/
│   ├── EnterCode.jsx
│   ├── FeedbackForm.jsx
│   ├── ThankYou.jsx
│   ├── Dashboard.jsx
│   └── LoginForm.jsx
│
├── App.jsx
│
├── index.css
│
└── main.jsx


```

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

---

## 🔒 Environment Variables

Make sure you create a `.env` file with:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

---

## 📌 Deployment

Recommended deployment using [Vercel](https://vercel.com/):
- Connect GitHub repo
- Set environment variables on Vercel dashboard
- Deploy!

---

## 🙋‍♀️ Author

Built by [Siti Mardiah](https://github.com/smardiah-diah).  
For demo or testing purposes.

---

## 📄 License

MIT License