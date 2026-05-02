# ElectSmart Assistant

ElectSmart Assistant is a civic-tech web application for Indian citizens. It turns election information into a personalized, step-by-step voting readiness journey.

## Problem Statement

Election information is often scattered across portals, notices, PDFs, and local updates. Citizens need a calm assistant that understands their state, age, and registration status, then tells them what to do next.

## Solution Overview

The app asks for a user profile, builds a personalized election plan, computes readiness progress, and guides the citizen through an assistant flow. It is designed to feel like a Government of India digital product: clear, accessible, authoritative, and action-oriented.

## Tech Stack

- React with Vite
- Tailwind CSS
- Context API for global user profile state
- LocalStorage for session persistence
- Google Maps embed for polling booth location search
- Lucide React icons

## Architecture

```text
src/
  components/   UI modules for onboarding, plan cards, roadmap, assistant, maps
  context/      Voter profile provider and persistence
  data/         Structured India election dataset
  hooks/        Derived election-plan logic
  pages/        App composition
  utils/        Date helpers, roadmap engine, assistant decision tree
```

## Data Structure

`src/data/elections.js` contains a reusable dataset for all Indian states and union territories. Each entry includes:

- State or UT name
- Category
- Assembly seats
- Lok Sabha seats
- Next election type
- Planning date and year
- Date status
- Registration portal and deadline
- Google Maps polling search query

UTs without assemblies are modeled as Lok Sabha planning entries.

## Logic Explanation

The roadmap engine computes:

- eligibility
- registration requirement
- missed registration deadline
- urgent registration window
- election passed state
- readiness percentage
- next best action

The roadmap steps are:

1. Check eligibility
2. Register
3. Get voter ID
4. Find booth
5. Know candidates
6. Prepare for voting
7. Cast vote
8. Verify VVPAT

Each step is marked as `completed`, `pending`, or `locked`.

## Assistant Logic

The Smart Assistant uses a decision tree in `src/utils/assistantTree.js`. Responses are computed from the user profile and election plan, covering:

- underage users
- registered users
- unregistered users
- users unsure about registration
- missed deadlines
- booth lookup
- candidate research
- document preparation
- VVPAT guidance

## Google Services Used

Google Maps is embedded in the dashboard as a polling booth locator. The app also opens Google Maps search results for the selected state or UT.

## Assumptions

- Election dates are planning estimates unless marked otherwise.
- Registration deadlines are modeled as 30 days before the planning election date.
- Official eligibility, roll revision, and schedule details should always be confirmed through the Election Commission portal.
- User profile data is stored locally in the browser, not on a remote server.

## Run Locally

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.
