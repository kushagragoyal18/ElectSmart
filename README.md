# ElectSmart Assistant 🇮🇳

ElectSmart Assistant is a premium civic-tech voting readiness platform for Indian citizens. It transforms complex electoral information into a personalized, step-by-step journey, ensuring every citizen is prepared for democracy.

## 🌟 Premium Features

### 1. Conversational AI Assistant
Replaced static decision trees with a real-time conversational chat interface.
- **Free-text Input**: Users can type queries naturally (e.g., "how to register").
- **Smart Context**: Assistant detects user intent and provides state-specific guidance.
- **Typing Indicator**: Provides a polished, modern chat experience.
- **Quick-Reply Chips**: One-tap shortcuts for common voter questions.

### 2. Multilingual Support (English + Hindi)
Full localization for maximum accessibility across India.
- **Dynamic Toggle**: Instantly switch between English and Hindi.
- **Persistence**: Language preferences are remembered for future visits.

### 3. Interactive Election Education
A dedicated "Learn" tab featuring swipeable cards that explain key concepts:
- EVM & VVPAT mechanics
- Model Code of Conduct (MCC)
- NOTA and voter rights
- Election Commission of India (ECI) role

### 4. Expanded 7-Step Timeline
A comprehensive vertical timeline visualizer specific to the user's state:
- Tracks milestones from Announcement → Registration → Nomination → Campaign → Polling → Counting → Results.
- Smart color-coding: Past (Green), Current (Orange), Future (Grey).

### 5. Voter Awareness Quiz
An interactive "Test Your Knowledge" module with 5 multiple-choice questions to build electoral literacy and awareness.

### 6. Shareable Readiness Card
Celebrate voter readiness with a high-fidelity digital badge.
- **Tricolor Theme**: Government-inspired design with saffron/white/green accents.
- **Downloadable**: Integrated `html2canvas` for one-click PNG downloads of your readiness card.

## 🎨 Design Language

Designed to feel like an authoritative Government of India digital product:
- **Palette**: Civic Navy (`#000080`), ECI Saffron (`#FF9933`), and Prosperity Green (`#138808`).
- **Typography**: Clean, professional, and accessible.
- **Branding**: Ashoka Emblem and Tricolor motifs for a premium, trustworthy feel.

## 🛠️ Tech Stack

- **React (Vite)**: Modern component-based architecture.
- **Tailwind CSS**: Utility-first styling for a premium UI.
- **Context API**: Global state management for voter profiles and localization.
- **html2canvas**: Client-side image generation for the shareable readiness card.
- **Lucide React**: Modern iconography.
- **LocalStorage**: Persistence for user progress and language settings.

## 📂 Architecture

```text
src/
  components/   UI modules (Chat, Timeline, Education, Quiz, ShareCard)
  context/      Voter profile and i18n/Language state management
  data/         Structured India election dataset (milestones, seats, types)
  hooks/        Custom hooks for election plan logic and translations
  pages/        Main dashboard composition with tabbed navigation
  utils/        Date logic, roadmap engine, and assistant logic
```

## 🚀 Run Locally

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## 🌐 Deployment

ElectSmart is optimized for **Vercel**. 

### Quick Deploy
When deploying to Vercel, ensure you set the **Install Command** to:
```bash
npm install --legacy-peer-deps
```
Or set the environment variable `NPM_CONFIG_LEGACY_PEER_DEPS=true`.

For a step-by-step guide on production deployment, check out [deployment_vercel.md](./deployment_vercel.md).

### Disclaimer
ElectSmart is an assistant tool. Election dates are planning estimates unless marked as official. Always verify critical information (eligibility, roll revision, final schedules) through the **Election Commission of India (ECI)** official portal at [voters.eci.gov.in](https://voters.eci.gov.in/).
