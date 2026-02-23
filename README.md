# 🏰 The Traitors Season 4: Heads-Up Dashboard

**[Live Dashboard](https://mike10010100.github.io/traitors-s4-dashboard/)**

A specialized, interactive heads-up display (HUD) for tracking the remaining and eliminated players in **The Traitors US Season 4**. Built with React, TypeScript, and Vite, this dashboard uses official Peacock headshots and features local persistence to keep your game state saved during the finale.

![Traitors Dashboard](https://www.peacocktv.com/blog/sites/peacock/files/2025/11/1920_traitors_s4.jpg)

## 🎭 Features

- **Real-Time Tracking:** Toggle players between "Remaining", "Murdered", and "Banished" statuses.
- **Role Management:** Cycle player roles (Faithful, Traitor, or Unknown) by clicking the icon badge on each card.
- **Local Persistence:** Your tracking state is saved to `localStorage`, so it persists even if you refresh your browser.
- **Season 4 Standings:** Comes pre-loaded with the official cast and current standings (as of late Feb 2026).
- **Thematic Design:** A dark, immersive UI with gold accents and "Graveyard" reveal mechanics.

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/mike10010100/traitors-s4-dashboard.git
   cd traitors-s4-dashboard
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 🛠️ How to Use

- **Eliminate/Revive:** Click the "Eliminate" or "Revive" button on any card to move players between the **Council Chamber** and the **Graveyard**.
- **Assign Roles:** Click the floating icon badge (Ghost/Shield/Sword) in the top-right of any player card to cycle through:
  - 👻 **Unknown** (Default)
  - 🛡️ **Faithful**
  - 🗡️ **Traitor**
- **Sync to Show:** Use the "Sync to Show" button in the header to reset the dashboard to the official standings found in the source code.

## 📦 Deployment

This project is configured for **GitHub Pages**. Any push to the `master` branch will automatically trigger a build and deploy.

---
*Disclaimer: This is a fan-made tool and is not affiliated with Peacock or the producers of The Traitors.*
