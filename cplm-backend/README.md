# Cerebral Palsy Like Me - Backend

A Fastify-based REST API backend for the Cerebral Palsy Like Me application, designed to help individuals with cerebral palsy find specialists and assistive devices.

## 🚀 Features

- **User Authentication**: JWT-based authentication system
- **CP User Information**: Store and manage cerebral palsy-specific user data
- **Device Information**: Comprehensive database of assistive devices
- **Specialist Information**: Database of healthcare specialists
- **Database Management**: PostgreSQL with Drizzle ORM
- **Type Safety**: Full TypeScript support

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** (v12 or higher)
- **Git**

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/CerebralPalsyLikeMe-Rebuild/monorepo.git
   cd monorepo/cplm-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the root of the backend directory:
   ```bash
   cp .env.example .env
   ```
   
   Or create a new `.env` file with the following variables:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=cplm_database
   DB_USER=your_username
   DB_PASSWORD=your_password
   
   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key_here
   
   # Server Configuration
   PORT=8080
   
   # AWS Configuration (optional - for future features)
   AWS_REGION=us-east-1
   AWS_ACCESS_KEY_ID=your_access_key
   AWS_SECRET_ACCESS_KEY=your_secret_key
   ```

4. **Database Setup**
   
   Make sure PostgreSQL is running and create a database:
   ```sql
   CREATE DATABASE cplm_database;
   ```
   
   Run database migrations:
   ```bash
   npm run db:migrate
   ```

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
The server will start on `http://localhost:8080` (or the port specified in your `.env` file).

### Production Mode
```bash
npm run build
npm start
```

### Database Commands
```bash
# Generate new migration
npm run db:generate

# Apply migrations
npm run db:migrate
```

## 📚 API Endpoints

### Authentication
- `POST /users/register` - Register a new user
- `POST /users/login` - User login
- `POST /users/cp-info` - Save CP user information

### Devices
- `GET /devices` - Get all devices
- `POST /devices/device_Search` - Search devices with filters

### Specialists
- `GET /specialists` - Get all specialists
- `POST /specialists/specialist_Search` - Search specialists with filters

### Health Check
- `GET /health` - Health check endpoint

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 🛠️ Development

### Code Quality
```bash
# Lint code
npm run lint

# Format code
npm run format
```

### Project Structure
```
src/
├── db/                 # Database configuration and schema
│   ├── db.ts          # Database connection
│   └── drizzle/       # Drizzle ORM schema and migrations
├── middleware/         # Custom middleware
│   └── auth.ts        # Authentication middleware
├── plugins/           # Fastify plugins
│   └── db.ts         # Database plugin
├── routes/            # API routes
│   ├── devices.ts     # Device endpoints
│   ├── health.ts      # Health check
│   ├── specialists.ts # Specialist endpoints
│   └── users.ts       # User endpoints
├── services/          # Business logic services
├── utils/             # Utility functions
├── index.ts           # Application entry point
└── server.ts          # Server configuration
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `DB_HOST` | PostgreSQL host | localhost | Yes |
| `DB_PORT` | PostgreSQL port | 5432 | Yes |
| `DB_NAME` | Database name | - | Yes |
| `DB_USER` | Database username | - | Yes |
| `DB_PASSWORD` | Database password | - | Yes |
| `JWT_SECRET` | JWT signing secret | - | Yes |
| `PORT` | Server port | 8080 | No |

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure PostgreSQL is running
   - Verify database credentials in `.env`
   - Check if database exists

2. **Port Already in Use**
   - Change the `PORT` in your `.env` file
   - Or kill the process using the port

3. **Migration Errors**
   - Ensure database exists
   - Check database permissions
   - Run `npm run db:generate` if schema changes

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🤝 Support

For support, please open an issue in the GitHub repository or contact the development team. 
