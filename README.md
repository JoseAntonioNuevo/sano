# Sano

A health companion mobile app built with React Native and Expo. Track your daily health metrics, manage tasks, and monitor your wellness journey.

## Features

- **Simulated Authentication**: Email-based login with local persistence
- **Daily Check-in**: Track symptoms (0-10), stress (0-10), and sleep hours (0-12) with optional notes
- **Daily Plan**: Manage 5 daily health tasks with progress tracking and daily reset
- **Health Questionnaire**: Complete a one-time questionnaire about your health goals and habits
- **History**: View your last 7 check-ins with detailed metrics and task snapshots
- **Persistent Storage**: All data is saved locally and hydrated on app start

## Tech Stack

- **Framework**: Expo SDK 54.0.0
- **Language**: TypeScript (strict mode)
- **Navigation**: expo-router (file-based routing with tabs and stacks)
- **State Management**: Zustand with persist middleware
- **Storage**: @react-native-async-storage/async-storage
- **Styling**: NativeWind (TailwindCSS for React Native)
- **Forms**: react-hook-form + Zod validation
- **UI Components**: Custom components (Button, Card, Field, Slider, EmptyState)
- **Lists**: React Native ScrollView components
- **Notifications**: react-native-toast-message
- **Linting**: ESLint (flat config via expo-config)

## Architecture Overview

### Project Structure

```
.
├── app/                      # Expo Router screens
│   ├── _layout.tsx           # Root layout with auth guard
│   ├── (auth)/
│   │   ├── _layout.tsx       # Auth stack layout
│   │   └── login.tsx         # Login screen
│   └── (tabs)/
│       ├── _layout.tsx       # Bottom tabs layout
│       ├── index.tsx         # Home/Dashboard
│       ├── checkin.tsx       # Daily check-in
│       ├── plan.tsx          # Daily task plan
│       ├── questionnaire.tsx # Health questionnaire
│       └── history.tsx       # Check-in history
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Button.tsx        # Primary/secondary button
│   │   ├── Card.tsx          # Container card
│   │   ├── Field.tsx         # Form input with label/error
│   │   ├── Slider.tsx        # Numeric slider input
│   │   └── EmptyState.tsx    # Empty state placeholder
│   ├── store/                # Zustand state stores
│   │   ├── useSession.ts     # Auth session (email, login/logout)
│   │   ├── usePlan.ts        # Daily tasks with auto-reset
│   │   └── useEntries.ts     # Check-ins and questionnaire
│   ├── lib/                  # Utility functions
│   │   ├── storage.ts        # AsyncStorage wrapper
│   │   └── format.ts         # Date formatting and UUID
│   ├── types.ts              # TypeScript type definitions
│   └── styles/
│       └── global.css        # TailwindCSS imports
├── eslint.config.js          # ESLint flat configuration
├── babel.config.js           # Babel + NativeWind configuration
├── metro.config.js           # Metro bundler config (NativeWind)
├── tailwind.config.js        # TailwindCSS configuration
├── tsconfig.json             # TypeScript configuration (strict)
└── package.json
```

### State Management

Three Zustand stores with AsyncStorage persistence:

1. **useSession**: Authentication state (email, isLoggedIn)
2. **usePlan**: Daily tasks with automatic date-based reset
3. **useEntries**: Check-ins (max 30) and questionnaire data

### Navigation Flow

- Root `_layout.tsx` implements auth guard logic
- Unauthenticated users → `/(auth)/login`
- Authenticated users → `/(tabs)` (Home, Check-in, Plan, Questionnaire, History)
- Auto-redirect on session change

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Expo CLI (installed automatically via npx)
- Expo Go app on your iOS/Android device (for quick testing)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd sano
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npx expo start
```

4. Scan the QR code with:
   - **iOS**: Camera app (opens Expo Go)
   - **Android**: Expo Go app

### Development Scripts

```bash
# Start Expo dev server
npx expo start

# Type checking
npx tsc --noEmit

# Linting
npx eslint .
```

## Why `npx expo install`?

We use `npx expo install <package>` instead of `npm install` to ensure all native dependencies are compatible with our Expo SDK version (54.0.0). Expo's install command automatically pins versions that work together.

Example:
```bash
npx expo install @react-native-async-storage/async-storage
# ✓ Installs version compatible with SDK 54
```

## Usage Guide

### 1. Login
- Enter any valid email address (e.g., `demo@example.com`)
- Session persists across app restarts

### 2. Daily Check-in
- Use sliders to set symptoms, stress, and sleep hours
- Add optional notes
- Can only complete once per day
- Includes a snapshot of your daily plan

### 3. Daily Plan
- Toggle tasks to mark as complete
- Progress updates in real-time
- Reset button creates a fresh plan for demo purposes
- Auto-resets daily (based on date change)

### 4. Questionnaire
- Complete once to provide health context
- 5 questions with validation
- Can view answers after completion

### 5. History
- View last 7 check-ins
- Tap any entry to see detailed metrics and notes
- Visual progress bars for each metric

## Known Limitations & Future Work

### Current MVP Limitations

- **No backend**: All data is local-only
- **No data export**: Cannot export check-in history
- **Single user**: No multi-user support
- **No data sync**: Data stays on device
- **Basic theming**: Light mode only
- **Limited validation**: Minimal edge-case handling

### Future Enhancements

1. **Notifications**: Daily check-in reminders using expo-notifications
2. **Data Export**: Export history as CSV/JSON
3. **Charts**: Visualize trends over time (symptoms, stress, sleep)
4. **Remote Sync**: Firebase/Supabase backend integration
5. **Dark Mode**: Full light/dark theme support
6. **Onboarding**: First-time user tutorial
7. **Customizable Plan**: Let users add/edit daily tasks
8. **Advanced Analytics**: Weekly/monthly summaries
9. **Reminders**: Custom task-based notifications
10. **Accessibility**: Enhanced screen reader support

## Dependency Versions (Expo SDK 54)

Key packages installed:

```json
{
  "@expo/vector-icons": "^15.0.3",
  "@hookform/resolvers": "^5.2.2",
  "@react-native-async-storage/async-storage": "^2.2.0",
  "@react-native-community/slider": "^5.1.0",
  "@react-navigation/bottom-tabs": "^7.4.0",
  "@react-navigation/elements": "^2.6.3",
  "@react-navigation/native": "^7.1.8",
  "expo": "~54.0.22",
  "expo-constants": "~18.0.10",
  "expo-font": "~14.0.9",
  "expo-haptics": "~15.0.7",
  "expo-image": "~3.0.10",
  "expo-linking": "~8.0.8",
  "expo-router": "~6.0.14",
  "expo-splash-screen": "~31.0.10",
  "expo-status-bar": "~3.0.8",
  "expo-symbols": "~1.0.7",
  "expo-system-ui": "~6.0.8",
  "expo-web-browser": "~15.0.9",
  "nativewind": "^4.2.1",
  "react": "19.1.0",
  "react-dom": "19.1.0",
  "react-hook-form": "^7.66.0",
  "react-native": "0.81.5",
  "react-native-gesture-handler": "~2.28.0",
  "react-native-reanimated": "~4.1.1",
  "react-native-safe-area-context": "~5.6.0",
  "react-native-screens": "~4.16.0",
  "react-native-toast-message": "^2.3.3",
  "react-native-web": "~0.21.0",
  "tailwindcss": "^3.4.18",
  "zod": "^3.25.76",
  "zustand": "^5.0.8"
}
```

> All native modules installed via `npx expo install` to ensure SDK compatibility.

## Troubleshooting

### TypeScript Errors
```bash
# Clear cache and reinstall
rm -rf node_modules .expo
npm install
```

### Metro Bundler Issues
```bash
# Clear Metro cache
npx expo start --clear
```

### AsyncStorage Warnings
- These are safe to ignore in development
- For production, consider using Flipper or react-native-debugger

### NativeWind Not Working
- Ensure `metro.config.js` includes the NativeWind transformer
- Restart Metro bundler after config changes

## Contributing

This is a demo/MVP project. For production use:

1. Add proper error boundaries
2. Implement comprehensive testing (Jest + Testing Library)
3. Add analytics and crash reporting
4. Implement proper secrets management
5. Add CI/CD pipeline
6. Enhance accessibility features

## License

MIT (or your preferred license)

---

**Built with ❤️ using Expo and React Native**
