# 📰 NewticaX

NewticaX adalah aplikasi berita modern dan elegan dengan real-time news dari NewsAPI, dark mode premium, dan fitur bookmark. Dibangun dengan Next.js + MongoDB + Prisma.

## ✨ Fitur Utama

- Real-time berita dari berbagai kategori
- Pencarian berita
- Simpan berita favorit
- Autentikasi user (login/register)
- Desain dark mode dengan warna eksklusif

## 🛠️ Teknologi

- **Next.js 14** (Frontend & API Routes)
- **Shadcn/UI + Tailwind CSS** (UI)
- **MongoDB** + **Prisma ORM** (Database)
- **NewsAPI** (Sumber berita)
- **Vercel** (Deployment)

## 🎨 Tema Warna

- Background: `#121212`
- Aksen Merah: `#D90429`
- Aksen Emas: `#FFD700`
- Teks: `#EAEAEA`

## 🚀 Cara Jalankan

```bash
git clone https://github.com/username/newticax.git
cd newticax
npm install
npx prisma generate
npx prisma db push
npm run dev
```

Tambahkan `.env`:

```env
DATABASE_URL="mongodb+srv://..."
NEWS_API_KEY="your_api_key"
NEXTAUTH_SECRET="your_secret"
```

## 📁 Struktur Folder

```
app/
 ├─ api/
 ├─ news/
 └─ page.tsx
lib/
prisma/
components/
public/
```

## 🧪 Todo (Fitur Mendatang)

- Komentar berita
- Notifikasi berita baru
- PWA support
- Light mode toggle
- Rangkuman berita pakai AI

## 📜 Lisensi

MIT

## 🙋‍♂️ Kontribusi

Fork, modifikasi, lalu pull request!  
