# Cerebral Palsy Like Me - Rebuild - Frontend

A Next.js-based React frontend application for Cerebral Palsy Like Me, designed to help individuals with cerebral palsy find specialists and assistive devices through an intuitive and accessible interface.

## 🚀 Features

- **Modern UI/UX**: Built with Material-UI and Tailwind CSS
- **Responsive Design**: Mobile-first approach with full responsive support
- **Internationalization**: Multi-language support (English/Spanish)
- **Interactive Maps**: Leaflet-based maps for specialist locations
- **Device Catalog**: Comprehensive searchable database of assistive devices
- **User Authentication**: Secure login and registration system
- **State Management**: Redux Toolkit for global state management
- **Form Validation**: Yup schema validation with React Hook Form
- **Type Safety**: Full TypeScript support

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/CerebralPalsyLikeMe/monorepo.git
   cd monorepo/cplm-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env.local` file in the root of the frontend directory:
   ```bash
   cp .env.example .env.local
   ```
   
   Or create a new `.env.local` file with the following variables:
   ```env
   # API Configuration
   NEXT_PUBLIC_API_URL=http://localhost:8080
   
   # Next.js Configuration
   NEXT_PUBLIC_APP_NAME=CP Like Me
   
   # Map Configuration (optional)
   NEXT_PUBLIC_MAP_API_KEY=your_map_api_key_here
   ```

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
The application will start on `http://localhost:3000`.

### Production Mode
```bash
npm run build
npm start
```

### Other Commands
```bash
# Run tests
npm test

# Lint code
npm run lint

# Clear cache and rebuild
npm run clear-cache
```

## 📱 Application Pages

### Public Pages
- **Home** (`/`) - Landing page with service overview
- **Login** (`/login`) - User authentication
- **Signup** (`/signup`) - User registration
- **Services** (`/services`) - Service selection page

### Protected Pages
- **Account** (`/account`) - User profile and settings
- **Device Page** (`/device-page`) - Browse and search assistive devices
- **Specialist Page** (`/specialist-page`) - Browse and search specialists
- **Specialist Map** (`/specialist-map`) - Interactive map view of specialists

## 🛠️ Development

### Project Structure
```
app/                    # Next.js 13+ app directory
├── account/           # Account management pages
├── device-page/       # Device browsing pages
├── login/             # Authentication pages
├── services/          # Service selection pages
├── specialist-map/    # Map-based specialist view
├── specialist-page/   # Specialist browsing pages
├── signup/            # Registration pages
├── globals.css        # Global styles
├── layout.tsx         # Root layout
├── page.tsx           # Home page
└── theme.ts           # Material-UI theme configuration

components/            # Reusable React components
├── ui/               # UI components
│   ├── Footer/       # Footer component
│   ├── Header/       # Header component
│   ├── Landing/      # Landing page components
│   └── ...           # Other UI components
├── Navigation.tsx    # Navigation component
└── ...               # Other components

constants/             # Application constants
├── routes.ts         # Route definitions
└── users.ts          # User-related constants

hooks/                 # Custom React hooks
├── useLocalStorage.ts # Local storage hook
└── ...               # Other custom hooks

services/              # API service layer
├── authApi.ts        # Authentication API
├── cpUserInfoApi.ts  # CP user info API
├── deviceApi.ts      # Device API
├── specialistApi.ts  # Specialist API
└── routes.ts         # Route utilities

store/                 # Redux store configuration
├── hooks/            # Redux hooks
├── slices/           # Redux slices
├── index.ts          # Store exports
└── store.ts          # Store configuration

types/                 # TypeScript type definitions
├── auth.ts           # Authentication types
└── ...               # Other type definitions

utils/                 # Utility functions
├── handleApiCall.ts  # API call utilities
└── i18n.ts           # Internationalization utilities

locales/               # Translation files
├── en/               # English translations
└── es/               # Spanish translations
```

### Key Technologies

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **Material-UI (MUI)** - Component library
- **Tailwind CSS** - Utility-first CSS framework
- **Redux Toolkit** - State management
- **React Hook Form** - Form handling
- **Yup** - Schema validation
- **Leaflet** - Interactive maps
- **i18next** - Internationalization
- **TypeScript** - Type safety

## 🎨 Styling

The application uses a combination of:
- **Material-UI** for component styling and theming
- **Tailwind CSS** for utility classes
- **Emotion** for styled components
- **Custom CSS** for specific styling needs

### Theme Configuration
The Material-UI theme is configured in `app/theme.ts` and includes:
- Custom color palette
- Typography settings
- Component overrides
- Responsive breakpoints

## 🌐 Internationalization

The application supports multiple languages:
- **English** (default)
- **Spanish**

Translation files are located in `locales/` directory and use the i18next library.

## 📊 State Management

Redux Toolkit is used for global state management with the following slices:
- **Auth Slice** - Authentication state
- **API Slices** - RTK Query for API calls

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | http://localhost:8080 | Yes |
| `NEXT_PUBLIC_APP_NAME` | Application name | CP Like Me | No |
| `NEXT_PUBLIC_MAP_API_KEY` | Map API key | - | No |

### API Configuration

The frontend communicates with the backend API through services in the `services/` directory. Each service uses RTK Query for efficient data fetching and caching.

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Self-hosted servers

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Error**
   - Ensure backend server is running
   - Check `NEXT_PUBLIC_API_URL` in `.env.local`
   - Verify CORS configuration on backend

2. **Build Errors**
   - Clear cache: `npm run clear-cache`
   - Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

3. **Port Already in Use**
   - Kill the process using port 3000
   - Or use a different port: `npm run dev -- -p 3001`

4. **TypeScript Errors**
   - Run `npm run lint` to identify issues
   - Check type definitions in `types/` directory

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use Material-UI components when possible
- Maintain responsive design principles
- Write tests for new features
- Follow the existing code style

## 📄 License

This project is licensed under the ISC License.

## 🤝 Support

For support, please open an issue in the GitHub repository or contact the development team.

## 🔗 Related

- [Backend Repository](../cplm-backend/README.md)
- [API Documentation](../cplm-backend/README.md#api-endpoints) 
