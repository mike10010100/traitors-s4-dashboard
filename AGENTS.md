# 🤖 AGENTS.md: Traitors Dashboard

**Live URL:** [https://mike10010100.github.io/traitors-s4-dashboard/](https://mike10010100.github.io/traitors-s4-dashboard/)

This file provides architectural context and instructions for AI agents or developers interacting with the Traitors Season 4 Dashboard.

## 🏗️ Architecture

- **Stack:** React (v18), TypeScript, Vite, Lucide-React.
- **Styling:** Vanilla CSS (`src/App.css`), using a dark-mode theme with gold accents.
- **State:** Managed with React `useState` and persistent via `localStorage` (via the `STORAGE_KEY` constant).
- **Data Source:** Cast information is sourced from the [Peacock TV blog](https://www.peacocktv.com/blog/the-traitors-season-4-cast).

## 🗂️ Project Structure

- `src/App.tsx`: Main application logic, player data, and state management.
- `src/App.css`: Custom HUD styles, including "Graveyard" reveal effects and role-based border colors.
- `src/main.tsx`: React entry point.
- `initialPlayers`: The source-of-truth array for cast member data, roles, and initial statuses.

## 📝 Guidelines for Agents

### 1. Updating Player Data
To update the dashboard for new episodes:
- Modify the `initialPlayers` array in `src/App.tsx`.
- Statuses available: `'Remaining'`, `'Murdered'`, `'Banished'`.
- Roles available: `'Faithful'`, `'Traitor'`, `'Unknown'`.

### 2. Styling Changes
Maintain the dark, high-contrast HUD aesthetic. Use the CSS variables defined in `:root` of `src/App.css`:
- `--traitor-red`: #8b0000
- `--faithful-blue`: #0047ab
- `--gold-accent`: #d4af37

### 3. Local Storage Handling
Persistence is tied to the `STORAGE_KEY = 'traitors_s4_state'`. Be mindful that clearing `localStorage` will reset the dashboard to the hard-coded `initialPlayers` state.

## 🚀 Deployment Instructions
The project uses GitHub Actions for deployment to GitHub Pages. Any updates to `src/App.tsx` or other source files should be pushed to the `master` branch.
