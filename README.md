# 📚 BookNook – Online Library Management System

BookNook is a full-stack online library management platform where users can explore books, borrow their favorite books, manage their own book collections, and track borrowing history. It provides a simple and user-friendly experience for managing library activities.

## 🌐 Live Website

**Live Demo:** https://book-nook-peach.vercel.app

## ✨ Key Features

- **User Authentication:** Secure authentication with email/password and Google sign-in using Better Auth.
- **Browse Books:** Explore all available books from the library.
- **Search & Filter:** Find books by title and filter them by category.
- **Book Details:** View detailed information about individual books.
- **Add Books:** Authenticated users can add new books to the library.
- **Manage Books:** Users can view, edit, and delete books they have added.
- **Borrow Books:** Borrow available books from the library.
- **Borrowing History:** View and manage personal borrowing records.
- **Return Books:** Return borrowed books and update their availability.
- **Responsive Design:** Optimized for desktop, tablet, and mobile devices.

## 🛠️ Technologies Used

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Shadcn UI
- Better Auth
- Embla Carousel

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Jose

### Deployment
- Vercel
- MongoDB Atlas

## 📂 Project Structure

```text
BookNook/
├── public/
├── src/
│   ├── app/
│   │   ├── all-books/
│   │   ├── add-books/
│   │   ├── books-details/
│   │   ├── edit-books/
│   │   ├── my-books/
│   │   ├── my-borrows/
│   │   ├── profile/
│   │   ├── signin/
│   │   ├── signup/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   └── lib/
├── package.json
└── README.md
```

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/iftekharm-alasif/BookNook.git
```

### 2. Navigate to the Project Directory

```bash
cd BookNook
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000

BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:3000

NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Add your actual credentials before running the application.

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Authentication

BookNook uses Better Auth for user authentication.

- Email and password authentication.
- Google authentication.
- JWT-based API authentication.
- Protected user-specific operations.

## 📖 How It Works

1. Create an account or sign in.
2. Explore the available books.
3. View book details.
4. Borrow books that are available.
5. Manage your personal book collection.
6. Track borrowed books and return them when finished.

## 🚀 Future Improvements

- Advanced book recommendation system.
- Book reviews and ratings.
- Improved library analytics.
- Enhanced user dashboard.
- Notifications for borrowing and returning books.

## 👨‍💻 Developer

**Iftekhar Mahamud Al Asif**

- GitHub: [iftekharm-alasif](https://github.com/iftekharm-alasif)

---

⭐ If you find this project interesting, consider giving it a star!
