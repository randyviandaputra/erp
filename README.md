# ERP System

A modern, full-stack ERP (Enterprise Resource Planning) system built with React, Node.js, and PostgreSQL. This system manages quotations, sales orders, products, customers, and user authentication with role-based access control.

## 🚀 Quick Start

### Option 1: Docker

#### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) (version 20.10 or higher)
- [Docker Compose](https://docs.docker.com/compose/install/) (version 2.0 or higher)

#### Running the Application

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd erp
   ```

2. **Start the application:**
   ```bash
   docker-compose up -d
   ```

3. **Access the application:**
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:4000
   - **Database**: localhost:5432
   - **API Documentation**: http://localhost:4000/docs

4. **Stop the application:**
   ```bash
   docker-compose down
   ```

### Option 2: Manual Setup (Local Development)(Recommendation)

#### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) (version 8 or higher)
- [PostgreSQL](https://www.postgresql.org/download/) (version 16 or higher)

#### Database Setup

1. **Install and start PostgreSQL:**
   ```bash
   # macOS (using Homebrew)
   brew install postgresql
   brew services start postgresql
   
   # Ubuntu/Debian
   sudo apt update
   sudo apt install postgresql postgresql-contrib
   sudo systemctl start postgresql
   sudo systemctl enable postgresql
   
   # Windows
   # Download and install from https://www.postgresql.org/download/windows/
   ```

2. **Create database and user:**
   ```bash
   # Connect to PostgreSQL
   sudo -u postgres psql
   
   # Create database and user
   CREATE DATABASE erp_db;
   CREATE USER erp_user WITH PASSWORD 'erp_password';
   GRANT ALL PRIVILEGES ON DATABASE erp_db TO erp_user;
   \q
   ```

#### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   # Create .env file
   cp .env_example .env
   
   # Edit .env file with your database configuration
   DATABASE_URL="postgresql://erp_user:erp_password@localhost:5432/erp_db"
   PORT=4000
   JWT_SECRET="your-super-secret-jwt-key-change-in-production"
   NODE_ENV=development
   ```

4. **Run database migrations:**
   ```bash
   npx prisma generate
   npx prisma migrate deploy
   ```

5. **Seed the database (optional):**
   ```bash
   npm run seed
   ```

6. **Start the backend server:**
   ```bash
   # Development mode with hot reloading
   npm run dev
   
   # Production mode
   npm start
   ```

#### Frontend Setup

1. **Open a new terminal and navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   # Create .env file
   echo "VITE_API_URL=http://localhost:4000" > .env
   ```

4. **Start the frontend development server:**
   ```bash
   npm run dev
   ```

#### Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **API Documentation**: http://localhost:4000/docs

#### Default Users (if seeded)

- Admin: `admin@example.com` / `password123`
- Sales: `sales@example.com` / `password123`
- Customer: `customer@example.com` / `password123`

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   Database      │
│   (React)       │◄──►│   (Express)     │◄──►│  (PostgreSQL)   │
│   Port: 3000    │    │   Port: 4000    │    │   Port: 5432    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🆚 Setup Comparison

| Aspect | Docker Setup | Manual Setup |
|--------|-------------|--------------|
| **Setup Time** | ~5 minutes | ~15-30 minutes |
| **Prerequisites** | Docker only | Node.js, npm, PostgreSQL |
| **Environment** | Isolated containers | Local system |
| **Database** | Auto-configured | Manual installation |
| **Port Conflicts** | Easy to change | May conflict with existing services |
| **Development** | Hot reloading with volumes | Native hot reloading |
| **Debugging** | Container logs | Direct console output |
| **Production** | Identical to development | Different setup required |
| **Learning Curve** | Docker knowledge needed | Standard development tools |

**Recommendation**: Use Docker for quick setup and consistent environments, use manual setup for deeper development control and learning.

## 📋 Features

### Core Functionality
- **User Authentication**: JWT-based authentication with role-based access
- **Quotation Management**: Create, view, and approve quotations
- **Sales Order Management**: Generate sales orders from approved quotations
- **Product Catalog**: Manage product inventory and pricing
- **Customer Management**: Track customer information and relationships
- **Role-Based Access Control**: ADMIN, SALES, and CUSTOMER roles

### Technical Features
- **Modern Frontend**: React 19 with TypeScript and Tailwind CSS
- **RESTful API**: Express.js backend with comprehensive endpoints
- **Database ORM**: Prisma with PostgreSQL for type-safe database operations
- **Containerized**: Docker and Docker Compose for easy deployment
- **API Documentation**: Swagger/OpenAPI documentation
- **Responsive Design**: Mobile-friendly user interface

## 🛠️ Development

### Development Environment

#### Using Docker

1. **Start development environment with hot reloading:**
   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```

2. **View logs:**
   ```bash
   # All services
   docker-compose logs -f
   
   # Specific service
   docker-compose logs -f backend
   ```

3. **Database operations:**
   ```bash
   # Run migrations
   docker-compose exec backend npx prisma migrate deploy
   
   # Seed database
   docker-compose exec backend npm run seed
   
   # Access database
   docker-compose exec postgres psql -U erp_user -d erp_db
   ```

#### Using Local Setup

1. **Backend development:**
   ```bash
   cd backend
   npm run dev  # Starts with hot reloading
   ```

2. **Frontend development:**
   ```bash
   cd frontend
   npm run dev  # Starts Vite dev server
   ```

3. **Database operations:**
   ```bash
   # Run migrations
   cd backend
   npx prisma migrate dev
   
   # Seed database
   npm run seed
   
   # Access database
   psql -U erp_user -d erp_db -h localhost
   ```

4. **Useful development commands:**
   ```bash
   # Backend
   cd backend
   npm run dev          # Start development server
   npm run build        # Build for production
   npm run lint         # Run ESLint
   npx prisma studio    # Open Prisma Studio (database GUI)
   
   # Frontend
   cd frontend
   npm run dev          # Start development server
   npm run build        # Build for production
   npm run preview      # Preview production build
   npm run lint         # Run ESLint
   ```

### Available Scripts

```bash
# Using Makefile (recommended)
make help          # Show all available commands
make up            # Start production environment
make dev-up        # Start development environment
make logs          # View production logs
make dev-logs      # View development logs
make down          # Stop production environment
make dev-down      # Stop development environment
make clean         # Clean up all containers and volumes

# Using Docker Compose directly
docker-compose up -d                    # Start production
docker-compose -f docker-compose.dev.yml up -d  # Start development
docker-compose down                     # Stop production
docker-compose -f docker-compose.dev.yml down   # Stop development
```

## 📁 Project Structure

```
erp/
├── backend/                    # Backend API
│   ├── src/
│   │   ├── controllers/       # Request handlers
│   │   ├── routes/           # API routes
│   │   ├── middlewares/      # Authentication & validation
│   │   ├── docs/             # API documentation
│   │   └── server.ts         # Server entry point
│   ├── prisma/               # Database schema & migrations
│   ├── Dockerfile            # Production Docker image
│   └── Dockerfile.dev        # Development Docker image
├── frontend/                  # React frontend
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── api/             # API client
│   │   └── main.tsx         # App entry point
│   ├── Dockerfile            # Production Docker image
│   └── Dockerfile.dev        # Development Docker image
├── docker-compose.yml         # Production environment
├── docker-compose.dev.yml     # Development environment
├── Makefile                   # Convenient commands
├── API.md                     # API documentation
├── SYSTEM_DIAGRAM.md          # Architecture documentation
└── DOCKER_README.md           # Docker setup guide
```

## 🔐 Authentication & Roles

### User Roles
- **ADMIN**: Full access to all features
- **SALES**: Can manage quotations and sales orders
- **CUSTOMER**: Can view their own quotations and create new ones

### Default Users
The system includes seeded data with default users for testing:
- Admin: `admin@example.com` / `password123`
- Sales: `sales@example.com` / `password123`
- Customer: `customer@example.com` / `password123`

## 🌐 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user

### Quotations
- `GET /quotations` - List quotations
- `POST /quotations` - Create quotation
- `GET /quotations/:id` - Get quotation details
- `PUT /quotations/:id/approve` - Approve quotation

### Sales Orders
- `GET /sales-orders` - List sales orders
- `POST /sales-orders` - Create sales order

### Products & Customers
- `GET /products` - List products
- `GET /customers` - List customers

For complete API documentation, see [API.md](./API.md) or visit http://localhost:4000/docs when running.

## 🐳 Docker Commands

### Production
```bash
# Build and start
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Remove volumes (WARNING: deletes all data)
docker-compose down -v
```

### Development
```bash
# Start with hot reloading
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop services
docker-compose -f docker-compose.dev.yml down
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
NODE_ENV=production
DATABASE_URL=postgresql://erp_user:erp_password@postgres:5432/erp_db
PORT=4000
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:4000
```

### Database Configuration
- **Host**: localhost (or postgres container)
- **Port**: 5432
- **Database**: erp_db
- **Username**: erp_user
- **Password**: erp_password

## 🚨 Troubleshooting

### Docker Issues

1. **Port conflicts**: If ports 3000, 4000, or 5432 are in use, modify the port mappings in docker-compose files.

2. **Database connection issues**:
   ```bash
   # Check database status
   docker-compose logs postgres
   
   # Restart database
   docker-compose restart postgres
   ```

3. **Permission issues**: On Linux, you might need to run Docker commands with `sudo`.

4. **Memory issues**: Increase Docker's memory limit in Docker Desktop settings.

### Manual Setup Issues

1. **PostgreSQL connection issues**:
   ```bash
   # Check if PostgreSQL is running
   # macOS
   brew services list | grep postgresql
   
   # Ubuntu/Debian
   sudo systemctl status postgresql
   
   # Windows
   # Check Services app for PostgreSQL service
   ```

2. **Node.js version issues**:
   ```bash
   # Check Node.js version
   node --version  # Should be 18 or higher
   
   # Use nvm to manage Node.js versions
   nvm install 18
   nvm use 18
   ```

3. **npm install issues**:
   ```bash
   # Clear npm cache
   npm cache clean --force
   
   # Delete node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Prisma issues**:
   ```bash
   # Reset Prisma
   npx prisma generate
   npx prisma migrate reset
   npx prisma migrate dev
   ```

5. **Frontend build issues**:
   ```bash
   # Clear Vite cache
   rm -rf node_modules/.vite
   
   # Reinstall dependencies
   rm -rf node_modules package-lock.json
   npm install
   ```

### Reset Everything

#### Docker Reset
```bash
# Stop all containers and remove volumes
docker-compose down -v
docker-compose -f docker-compose.dev.yml down -v

# Remove all images
docker rmi $(docker images -q)

# Clean up
docker system prune -f
```

#### Manual Setup Reset
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install

# Database (WARNING: This will delete all data)
psql -U erp_user -d erp_db -h localhost -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
npx prisma migrate dev
npm run seed
```

## 📊 Health Checks

Check if services are running properly:

```bash
# Check service status
docker-compose ps

# Health check endpoints
curl http://localhost:4000/health  # Backend
curl http://localhost:3000/health  # Frontend
```

## 🔄 Development Workflow

1. **Start development environment:**
   ```bash
   make dev-up
   ```

2. **Make changes to your code** - they will be automatically reflected due to volume mounting

3. **Run database migrations:**
   ```bash
   docker-compose -f docker-compose.dev.yml exec backend npx prisma migrate dev
   ```

4. **Seed the database:**
   ```bash
   docker-compose -f docker-compose.dev.yml exec backend npm run seed
   ```

5. **Stop development environment:**
   ```bash
   make dev-down
   ```

## 📚 Documentation

- [API Documentation](./API.md) - Complete API reference
- [System Architecture](./SYSTEM_DIAGRAM.md) - Technical architecture and diagrams
- [Docker Setup](./DOCKER_README.md) - Detailed Docker configuration guide

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Review the logs: `docker-compose logs -f`
3. Check the documentation files
4. Create an issue in the repository

---

**Happy coding! 🚀** 
