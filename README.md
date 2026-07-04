
  # 📚 CampusBae

CampusBae is a centralized platform for students to access **notes, previous year question papers, books, and attendance tracking**.  
It uses **Supabase** for authentication, database, and file storage.

---

## 🚀 Features

- 🔐 **Authentication**  
  - Student login via institutional email (Supabase Auth).
  - Stores user info like **name, email, branch, year**.

- 📂 **Resources Section**  
  - Upload & access **Notes**, **PYQs**, and **Books**.  
  - PDFs stored in **Supabase Buckets**.

- 📊 **Attendance Tracker**  
  - Add subjects and mark attendance daily.
  - Data stored securely in Supabase.

- 👤 **Profile Section**  
  - Displays student details (Name, Enrollment No., Branch, Year).
  - Linked to Supabase Auth.

---

## 🗂️ Supabase Storage Structure

We use **Buckets** in Supabase

---

## 🛠️ Tech Stack

- **Frontend**: React + Vite  
- **Backend/Database**: Supabase  
- **Auth**: Supabase Auth  
- **Storage**: Supabase Buckets  

---

## ⚙️ Setup Instructions

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/campusbae.git
   cd campusbae
