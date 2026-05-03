# ElectSmart Assistant 🇮🇳

ElectSmart is a high-fidelity civic-tech solution designed to navigate Indian citizens through their voting readiness journey with clarity, authority, and engagement.

## 🏛️ Vertical & Purpose

**Vertical:** Civic-Tech / Digital Democracy / E-Governance

**Purpose:**
In the world's largest democracy, electoral information is often fragmented across multiple official portals, PDFs, and news updates. ElectSmart acts as a **unified voting readiness assistant** that decodes this complexity into a personalized action plan. It is designed to feel like a premium Government of India digital product—authoritative yet accessible.

## 🧠 Approach & Core Logic

### 1. Personalized Roadmap Engine
The heart of ElectSmart is a derived-state logic engine (`useElectionPlan.js`) that computes a 100% personalized roadmap based on the user's profile:
- **Eligibility Logic**: Checks age and nationality status.
- **Registration State Machine**: Detects if a user is unregistered, needs a status check, or is fully ready.
- **Deadline Awareness**: Compares the current date against the state's election milestones to trigger urgent warnings or "planning window" states.
- **Readiness Score**: A weighted calculation of progress across 8 key milestones.

### 2. Conversational Intent Detection
The **Smart Assistant** uses a keyword-based intent detection system to navigate a comprehensive decision tree (`assistantTree.js`):
- **Free-text Processing**: Maps user queries (e.g., "how to vote", "booth location") to specific knowledge nodes.
- **Context Awareness**: Responses are dynamically updated based on the user's state (e.g., an underage user receives different advice than a registered voter).

## 🛠️ How the Solution Works

1.  **Onboarding**: The user provides their state, age, and current registration status.
2.  **Dynamic Dashboard**: The app generates a personalized dashboard featuring:
    *   **Election Summary**: Countdown and readiness percentage.
    *   **Timeline**: A 7-step visualization of the upcoming election cycle in their state.
    *   **Roadmap**: A step-by-step interactive guide from eligibility to VVPAT verification.
3.  **Multilingual Assistance**: Users can toggle between **English and Hindi** and chat with the AI assistant for granular help.
4.  **Education & Awareness**: A "Learn" tab provides interactive cards on ECI rules, while the "Quiz" module tests and builds electoral literacy.
5.  **Offline-First & Privacy**: All data stays in the user's `localStorage`; no personal data is sent to a server.
6.  **Sharing**: Users can generate and download a branded **Readiness Card** to spread awareness.

## 📋 Assumptions & Constraints

-   **Date Estimation**: For states where official ECI schedules are not yet announced, milestones (Announcement, Nomination, etc.) are estimated based on typical election cycle patterns relative to the polling date.
-   **Registration Deadline**: Modeled as 30 days prior to the estimated polling date, as per standard roll revision practices.
-   **Official Confirmation**: The app explicitly advises users that all critical data must be confirmed through the official [voters.eci.gov.in](https://voters.eci.gov.in) portal.
-   **State Data**: Currently covers all Indian States and Union Territories with detailed seat and phase modeling.

## 🏗️ Tech Stack

- **React (Vite)**: Modern, high-performance frontend framework.
- **Tailwind CSS**: Custom GoI-inspired design system (Navy/Saffron/White).
- **Context API**: Global state for voter profiles and i18n localization.
- **html2canvas**: Client-side image rendering for social sharing.
- **Lucide React**: Iconography.

## 🚀 Run Locally

```bash
npm install --legacy-peer-deps
npm run dev
```

---

## 🌐 Deployment
Optimized for **Vercel**. When deploying, set the Install Command to `npm install --legacy-peer-deps`.
