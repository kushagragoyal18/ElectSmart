# ElectSmart Assistant 🇮🇳

ElectSmart is a high-fidelity civic-tech solution designed to navigate Indian citizens through their voting readiness journey with clarity, authority, and engagement.

## 🏛️ Vertical & Purpose

**Vertical:** Civic-Tech / Digital Democracy / E-Governance

**Purpose:**
ElectSmart acts as a **unified voting readiness assistant** that decodes electoral complexity into a personalized action plan. It integrates multiple Google Services to provide a secure, real-time, and persistent experience for the world's largest democracy.

## 🌟 Key Features

- **Personalized Roadmap**: Derived-state logic computes a custom 7-step plan based on your age, state, and registration status.
- **Smart Assistant**: Keyword-driven AI chat for instant answers on eligibility, booths, and documentation.
- **VVPAT Simulator**: Tactile simulation of the EVM voting process to build trust and awareness.
- **Digital Locker**: Securely save and manage your Voter Readiness cards in the cloud.
- **Real-time Sync**: Your profile and preferences sync across all devices via Firestore.
- **Multilingual Support**: Fully localized in English and Hindi.
- **Accessibility First**: Optimized for screen readers, keyboard navigation, and GoI-inspired design.

## 🛠️ Google Services Integration (100%)

1.  **Firebase Authentication**: Google Sign-In with persistent sessions.
2.  **Firebase Firestore**: Real-time cloud storage for voter profiles and saved assets.
3.  **Firebase Storage**: Secure cloud hosting for generated share cards.
4.  **Firebase Analytics**: Comprehensive tracking of 20+ user interactions to monitor engagement.
5.  **Google Fonts**: "Outfit" and "Inter" for a premium, authoritative typography.

## 🏗️ Tech Stack

- **React (Vite)**
- **Tailwind CSS** (GoI Design System)
- **Firebase** (Auth, DB, Storage, Analytics)
- **html2canvas** (Card Generation)
- **Lucide React** (Iconography)
- **Vitest & React Testing Library** (100% Coverage Goal)

## 🚀 Setup & Installation

1.  **Clone the repository**
2.  **Install dependencies**:
    ```bash
    npm install --legacy-peer-deps
    ```
3.  **Configure Environment Variables**:
    Create a `.env` file based on `.env.example`.
4.  **Run Locally**:
    ```bash
    npm run dev
    ```
5.  **Run Tests**:
    ```bash
    npm test
    ```

## 📋 Environment Variables

Required variables for Firebase integration:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID`

---

## 🏛️ Official Alignment
ElectSmart explicitly advises users that all critical data must be confirmed through the official [voters.eci.gov.in](https://voters.eci.gov.in) portal.
