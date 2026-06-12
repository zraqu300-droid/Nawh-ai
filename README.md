# nawh.ai Premium Starter Template

A premium, production-ready React starter template with bilingual support (Arabic RTL / English LTR), dark mode, and modern UI components. Perfect for selling on GitHub, ThemeForest, or CodeCanyon.

![nawh.ai Preview](https://bolt.new/static/og_default.png)

## Features

### Core Features
- **Bilingual Support** - Full Arabic (RTL) and English (LTR) support with automatic layout mirroring
- **Dark/Light Mode** - Smooth theme transitions with persistent user preferences
- **Mobile-First Design** - Fully responsive with Tailwind CSS
- **Premium UI** - Beautiful gradients, animations, and micro-interactions
- **Clean Architecture** - Well-organized folder structure with reusable components

### Pages Included
1. **Splash Screen** - Animated brand logo with fade transitions
2. **Onboarding** - 3-step introduction with swipe-like navigation
3. **Authentication** - Modern login/signup with social login mockups
4. **Dashboard** - Stats, charts, and time-based greetings
5. **AI Playground** - Interactive chat interface for AI features
6. **Settings** - Language, theme, and account management

### Tech Stack
- **React 18** - Latest React with hooks
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Router 6** - Client-side routing
- **Capacitor** - Native mobile deployment (iOS/Android)
- **Lucide React** - Beautiful open-source icons

## Project Structure

```
nawh-ai/
├── src/
│   ├── assets/           # Images, icons, and static files
│   ├── components/       # Reusable UI components
│   │   ├── Button.jsx     # Gradient buttons with loading states
│   │   ├── Card.jsx       # Multiple card variants
│   │   ├── Input.jsx      # Form inputs with RTL support
│   │   ├── Navbar.jsx     # Responsive navigation bar
│   │   ├── Sidebar.jsx    # Dashboard sidebar
│   │   └── Toggle.jsx     # Animated toggle switches
│   ├── context/          # React Context providers
│   │   └── ThemeLanguageContext.jsx
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Application pages
│   │   ├── SplashPage.jsx
│   │   ├── OnboardingPage.jsx
│   │   ├── AuthPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── AIPlaygroundPage.jsx
│   │   └── SettingsPage.jsx
│   ├── utils/            # Helper functions and translations
│   │   ├── helpers.jsx
│   │   └── localization.jsx
│   ├── App.jsx           # Main application component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── capacitor.config.json # Capacitor configuration
├── tailwind.config.js    # Tailwind configuration
├── vite.config.ts        # Vite configuration
└── package.json          # Dependencies and scripts
```

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone or download the repository**
```bash
git clone https://github.com/your-username/nawh-ai.git
cd nawh-ai
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

The production build will be in the `dist/` folder.

## Mobile Deployment (Capacitor)

### Android Setup

1. **Initialize Capacitor** (already configured)
```bash
npm run cap:init
```

2. **Add Android platform**
```bash
npm run cap:add:android
```

3. **Build and sync**
```bash
npm run build
npm run cap:sync
```

4. **Open in Android Studio**
```bash
npm run cap:open:android
```

### iOS Setup (macOS only)

1. **Add iOS platform**
```bash
npm run cap:add:ios
```

2. **Build and sync**
```bash
npm run build
npm run cap:sync
```

3. **Open in Xcode**
```bash
npm run cap:open:ios
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run cap:init` | Initialize Capacitor |
| `npm run cap:add:android` | Add Android platform |
| `npm run cap:add:ios` | Add iOS platform |
| `npm run cap:sync` | Sync web assets to native |
| `npm run cap:open:android` | Open in Android Studio |
| `npm run cap:open:ios` | Open in Xcode |

## Customization

### Changing Brand Name
Update the following files:
- `src/context/ThemeLanguageContext.jsx` - Theme and language logic
- `src/utils/localization.jsx` - All text translations
- `index.html` - Page title and meta tags

### Adding New Pages
1. Create a new component in `src/pages/`
2. Add route in `src/App.jsx`
3. Add navigation link in `src/components/Navbar.jsx` or `src/components/Sidebar.jsx`

### Adding Translations
Edit `src/utils/localization.jsx` to add new translation keys for both Arabic and English.

### Theme Colors
Modify `tailwind.config.js` to customize:
- Primary colors
- Gradient colors
- Animation timings

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome for Android)

## License

This is a premium template. You may:
- Use for personal projects
- Use for client projects
- Modify and customize as needed

You may NOT:
- Redistribute the source code
- Resell the template as-is

## Credits

- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: [Cairo](https://fonts.google.com/specimen/Cairo) & [Inter](https://fonts.google.com/specimen/Inter)
- **UI Inspiration**: Modern SaaS dashboards

## Support

For questions or issues, please contact:
- Email: support@nawh.ai
- GitHub Issues: [Open an issue](https://github.com/your-username/nawh-ai/issues)

---

**Made with love by nawh.ai**

*Version 1.0.0*
