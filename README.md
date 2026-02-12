# ☀️ Sunny Cafe - Modern Cafe Management System

<div align="center">

![Sunny Cafe Banner](https://img.shields.io/badge/Sunny%20Cafe-Fresh%20Drinks%2C%20Happy%20Moments-orange?style=for-the-badge&logo=coffee)

**A modern, AI-powered cafe management system with seamless ordering, intelligent recommendations, and integrated payment processing.**

[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-12.9.0-FFCA28?style=flat&logo=firebase)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Project Structure](#-project-structure) • [Deployment](#-deployment)

</div>

---

## ✨ Features

### 🛒 **Smart Ordering System**
- **Interactive Menu** - Browse categorized menu items with beautiful UI
- **Real-time Cart** - Persistent shopping cart with local storage
- **Dynamic Pricing** - Automatic total calculation with tax
- **Quantity Management** - Easy increment/decrement controls

### 🤖 **AI-Powered Recommendations**
- **Gemini AI Integration** - Intelligent menu suggestions based on preferences
- **Personalized Experience** - Context-aware recommendations
- **Natural Language Processing** - Chat-based ordering assistance

### 💳 **Payment Integration**
- **Stripe Integration** - Secure payment processing
- **Multiple Payment Methods** - Credit cards, digital wallets
- **Order Confirmation** - Instant payment verification

### 📊 **Business Management**
- **Inventory Tracking** - Real-time stock management
- **Order History** - Complete transaction records
- **Analytics Dashboard** - Sales insights and trends
- **Customer Management** - User profiles and preferences

### 🎨 **Modern UI/UX**
- **Responsive Design** - Mobile-first approach
- **Smooth Animations** - Framer Motion transitions
- **Accessible** - WCAG compliant
- **PWA Ready** - Installable progressive web app

---

## 🛠️ Tech Stack

### **Frontend**
- **React 19.2.4** - Latest React with concurrent features
- **TypeScript 5.8.2** - Type-safe development
- **Vite 6.2.0** - Lightning-fast build tool
- **Tailwind CSS 3.4.19** - Utility-first styling
- **Framer Motion 12.34.0** - Smooth animations

### **Backend & Services**
- **Firebase 12.9.0**
  - Authentication - User management
  - Firestore - Real-time database
  - Storage - File uploads
- **Stripe** - Payment processing
- **Google Gemini AI** - AI recommendations

### **UI Components**
- **Lucide React** - Beautiful icons
- **Recharts** - Data visualization
- **React Hook Form** - Form management
- **Zod** - Schema validation

### **Development Tools**
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Terser** - Code minification

---

## 🚀 Getting Started

### **Prerequisites**

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Firebase Account** (for backend services)
- **Stripe Account** (for payments)
- **Google AI Studio Account** (for Gemini API)

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/giridhar-narapusetty/Sunnycafe.git
   cd sunny-cafe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Firebase Configuration
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id

   # Stripe Configuration
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key

   # Gemini AI Configuration
   VITE_GEMINI_API_KEY=your_gemini_api_key

   # App Environment
   VITE_APP_ENV=development
   ```

   > 💡 **Tip:** Copy from `.env.example` and fill in your credentials

4. **Firebase Setup**
   
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password, Google)
   - Create a Firestore database
   - Enable Storage
   - Copy configuration to `.env.local`

5. **Stripe Setup**
   
   - Create account at [Stripe Dashboard](https://dashboard.stripe.com/)
   - Get your publishable key from API keys section
   - Add to `.env.local`

6. **Gemini AI Setup**
   
   - Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Add to `.env.local`

### **Running the Application**

#### **Development Mode**
```bash
npm run dev
```
Access at: `http://localhost:3000`

#### **Production Build**
```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
sunny-cafe/
├── public/                  # Static assets
│   ├── favicon.svg         # App icon
│   ├── manifest.json       # PWA manifest
│   └── robots.txt          # SEO configuration
├── src/
│   ├── components/         # React components
│   │   ├── AboutView.tsx
│   │   ├── BillSection.tsx
│   │   ├── ContactView.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── HomeView.tsx
│   │   ├── MenuSection.tsx
│   │   └── Navbar.tsx
│   ├── config/             # Configuration files
│   │   ├── app.config.ts
│   │   └── firebase.config.ts
│   ├── constants/          # App constants
│   │   └── index.ts
│   ├── context/            # React context providers
│   │   ├── AuthContext.tsx
│   │   └── CartContext.tsx
│   ├── services/           # API services
│   │   ├── aiAgents/
│   │   ├── geminiService.ts
│   │   ├── inventoryService.ts
│   │   ├── menuService.ts
│   │   ├── orderService.ts
│   │   └── paymentService.ts
│   ├── types/              # TypeScript types
│   │   ├── database.types.ts
│   │   └── index.ts
│   ├── utils/              # Utility functions
│   │   ├── errorHandler.ts
│   │   ├── helpers.ts
│   │   └── validation.ts
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── .env.example            # Environment template
├── .gitignore              # Git ignore rules
├── index.html              # HTML template
├── package.json            # Dependencies
├── tailwind.config.js      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── README.md               # This file
```

### **Key Directories**

- **`/components`** - Reusable UI components
- **`/services`** - API integration and business logic
- **`/context`** - Global state management
- **`/utils`** - Helper functions and utilities
- **`/types`** - TypeScript type definitions
- **`/config`** - App and service configurations

---

## 🎯 Core Features Explained

### **1. Menu Management**
The menu system supports multiple categories (Coffee, Tea, Pastries, etc.) with:
- Dynamic filtering
- Search functionality
- Category-based navigation
- Real-time availability updates

### **2. Shopping Cart**
Persistent cart with:
- Local storage backup
- Quantity adjustments
- Item removal
- Total calculation
- Tax computation

### **3. AI Recommendations**
Powered by Google Gemini:
- Analyzes user preferences
- Suggests complementary items
- Provides personalized menu highlights
- Natural language interaction

### **4. Payment Processing**
Secure Stripe integration:
- PCI compliant
- Multiple payment methods
- Instant confirmation
- Receipt generation

### **5. User Authentication**
Firebase Auth provides:
- Email/password login
- Google OAuth
- Session management
- Protected routes

---

## 🌐 Deployment

### **Vercel (Recommended)**

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Add Environment Variables**
   - Go to Vercel Dashboard → Settings → Environment Variables
   - Add all variables from `.env.local`

### **Netlify**

1. **Build Command:** `npm run build`
2. **Publish Directory:** `dist`
3. **Add environment variables in Netlify dashboard**

### **Firebase Hosting**

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

---

## 🔧 Configuration

### **TypeScript Path Aliases**

The project uses path aliases for cleaner imports:

```typescript
import Component from '@components/Component';
import { service } from '@services/service';
import { helper } from '@utils/helper';
```

Configured in `tsconfig.json` and `vite.config.ts`.

### **Build Optimization**

- **Code Splitting** - Vendor chunks for better caching
- **Tree Shaking** - Remove unused code
- **Minification** - Terser for production
- **Source Maps** - Development only

---

## 📱 Progressive Web App (PWA)

Sunny Cafe is PWA-ready with:
- **Offline Support** - Service worker caching
- **Installable** - Add to home screen
- **App-like Experience** - Full-screen mode
- **Fast Loading** - Optimized assets

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### **Development Workflow**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Giridhar Narapusetty**

- GitHub: [@giridhar-narapusetty](https://github.com/giridhar-narapusetty)
- Project Link: [https://github.com/giridhar-narapusetty/Sunnycafe](https://github.com/giridhar-narapusetty/Sunnycafe)

---

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI framework
- [Firebase](https://firebase.google.com/) - Backend services
- [Stripe](https://stripe.com/) - Payment processing
- [Google Gemini](https://ai.google.dev/) - AI capabilities
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Lucide](https://lucide.dev/) - Icons

---

<div align="center">

**Made with ☕ and ❤️ by Sunny Cafe Team**

⭐ Star this repo if you find it helpful!

</div>
