# 🏰 The Traitors Season 4: Interactive Dashboard

**[Live Dashboard](https://mike10010100.github.io/traitors-s4-dashboard/)**

An immersive, interactive companion for **The Traitors US Season 4**. Built with React, TypeScript, and Vite, this dashboard uses official Peacock headshots and features high-fidelity animations and state persistence to keep your game tracking saved.

![Traitors Dashboard](https://www.peacocktv.com/blog/sites/peacock/files/2025/11/1920_traitors_s4.jpg)

## 🎭 Choose Your Playstyle

The dashboard features two distinct modes, toggleable in the header:

- **🕵️ DETECTIVE MODE:** For the purist. Start with a "naive" board where all roles are unknown. Mark your own suspicions and manually "Murder" or "Banish" players as you watch.
- **📺 AUDIENCE MODE:** For the fan following along. The board automatically syncs to the official starting state of any episode you select. Roles are revealed only as the show's audience would know them (e.g., Traitors are revealed in Ep 2, while "Secret Traitors" remain hidden until their official banishment).

## ✨ Features

- **Explosive Shatter Animation:** Experience the "smash" of the portrait just like the host when a player is murdered. The card lifts, slams, and shatters into fragments of its own content.
- **Episode Synchronization:** Jump to any episode's start to see exactly who was in and who was out at that moment.
- **Role Management:** Cycle player roles (Faithful 🛡️, Traitor 🗡️, or Unknown 👻) by clicking the icon badge.
- **Local Persistence:** All tracking and mode preferences are saved to `localStorage`.
- **Responsive Design:** Optimized for both desktop and mobile viewing.

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)

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

## 📦 Deployment

This project is configured for **GitHub Actions**. Any push to the `main` branch will automatically build and deploy to GitHub Pages.

---
*Disclaimer: This is a fan-made tool and is not affiliated with Peacock or the producers of The Traitors.*
