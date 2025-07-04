# CP Like Me

A comprehensive web application designed to help individuals with cerebral palsy find specialists and assistive devices. The platform provides an intuitive interface for searching healthcare professionals and discovering assistive technology solutions tailored to specific needs.

## 🎯 Project Overview

CP Like Me is a full-stack web application that connects individuals with cerebral palsy to:
- **Healthcare Specialists**: Find doctors, therapists, and other healthcare professionals
- **Assistive Devices**: Discover and learn about assistive technology solutions
- **Personalized Recommendations**: Get suggestions based on individual CP characteristics

## 🏗️ Architecture

This project follows a monorepo structure with separate frontend and backend applications:

```
CP Like Me/
├── cplm-backend/     # Fastify API server
├── cplm-frontend/    # Next.js React application
└── README.md         # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** (v12 or higher) - for backend
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/CerebralPalsyLikeMe-Rebuild/monorepo.git
   cd monorepo
   ```

2. **Set up the Backend**
   ```bash
   cd cplm-backend
   npm install
   
   # Create .env file with your database credentials
   cp .env.example .env
   # Edit .env with your PostgreSQL details
   
   # Run database migrations
   npm run db:migrate
   
   # Start the development server
   npm run dev
   ```

3. **Set up the Frontend**
   ```bash
   cd ../cplm-frontend
   npm install
   
   # Create .env.local file
   cp .env.example .env.local
   # Edit .env.local with your API URL
   
   # Start the development server
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080

## 📚 Documentation

- **[Backend Documentation](cplm-backend/README.md)** - API server setup and configuration
- **[Frontend Documentation](cplm-frontend/README.md)** - React application setup and features

## 🛠️ Technology Stack

### Backend
- **Fastify** - High-performance web framework
- **PostgreSQL** - Relational database
- **Drizzle ORM** - Type-safe database toolkit
- **TypeScript** - Type safety
- **JWT** - Authentication
- **Vitest** - Testing framework

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **Material-UI** - Component library
- **Tailwind CSS** - Utility-first CSS
- **Redux Toolkit** - State management
- **TypeScript** - Type safety
- **Leaflet** - Interactive maps
- **i18next** - Internationalization

## 🌟 Key Features

### For Users
- **User Registration & Authentication**: Secure account creation and login
- **CP Profile Management**: Store and manage cerebral palsy-specific information
- **Device Search**: Browse and filter assistive devices by category and needs
- **Specialist Search**: Find healthcare professionals by location and specialty
- **Interactive Maps**: Visual representation of specialist locations
- **Multi-language Support**: English and Spanish interfaces

### For Developers
- **Type Safety**: Full TypeScript coverage
- **API Documentation**: Comprehensive endpoint documentation
- **Testing**: Unit and integration tests
- **Code Quality**: ESLint and Prettier configuration
- **Database Migrations**: Version-controlled schema changes

## 🔧 Development

### Running Both Applications

#### Option 1: Separate Terminals
```bash
# Terminal 1 - Backend
cd cplm-backend
npm run dev

# Terminal 2 - Frontend
cd cplm-frontend
npm run dev
```

#### Option 2: Using Concurrently (Recommended)
```bash
# Install concurrently globally
npm install -g concurrently

# Run both applications
concurrently "cd cplm-backend && npm run dev" "cd cplm-frontend && npm run dev"
```

### Database Management
```bash
cd cplm-backend

# Generate new migration
npm run db:generate

# Apply migrations
npm run db:migrate
```

### Testing
```bash
# Backend tests
cd cplm-backend
npm test

# Frontend tests
cd cplm-frontend
npm test
```

## 📊 API Endpoints

### Authentication
- `POST /users/register` - Register new user
- `POST /users/login` - User login
- `POST /users/cp-info` - Save CP user information

### Devices
- `GET /devices` - Get all devices
- `POST /devices/device_Search` - Search devices with filters

### Specialists
- `GET /specialists` - Get all specialists
- `POST /specialists/specialist_Search` - Search specialists with filters

### Health
- `GET /health` - Health check endpoint

## 🚀 Deployment

### Backend Deployment
The backend can be deployed to:
- **Railway** - Easy PostgreSQL integration
- **Heroku** - Simple deployment with add-ons
- **DigitalOcean App Platform** - Managed platform
- **AWS EC2** - Self-managed server
- **Docker** - Containerized deployment

### Frontend Deployment
The frontend can be deployed to:
- **Vercel** - Optimized for Next.js
- **Netlify** - Static site hosting
- **AWS Amplify** - Full-stack hosting
- **DigitalOcean App Platform** - Managed platform

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write tests for new features
- Maintain code quality with linting
- Update documentation for API changes
- Follow the existing code style

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection**
   - Ensure PostgreSQL is running
   - Verify credentials in `.env` file
   - Check if database exists

2. **Port Conflicts**
   - Backend: Change `PORT` in `.env`
   - Frontend: Use `npm run dev -- -p 3001`

3. **API Connection**
   - Verify `NEXT_PUBLIC_API_URL` in frontend `.env.local`
   - Check CORS configuration in backend
   - Ensure both servers are running

4. **Build Errors**
   - Clear cache: `npm run clear-cache` (frontend)
   - Delete `node_modules` and reinstall
   - Check TypeScript errors

## 📄 License

This project is licensed under the ISC License.

## 🤝 Support

- **GitHub Issues**: [Create an issue](https://github.com/CerebralPalsyLikeMe/monorepo/issues)
- **Documentation**: Check the individual README files for each application
