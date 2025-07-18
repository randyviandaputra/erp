# ERP System Architecture & System Diagram

## System Overview

The ERP System is a full-stack web application designed to manage quotations, sales orders, products, customers, and user authentication. It follows a modern microservices-inspired architecture with clear separation of concerns.

## Architecture Layers

### 1. Presentation Layer (Frontend)
- **Technology**: React 19 + TypeScript + Vite
- **UI Framework**: Tailwind CSS
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router DOM
- **HTTP Client**: Axios

### 2. API Layer (Backend)
- **Technology**: Node.js + Express + TypeScript
- **Database ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **Documentation**: Swagger/OpenAPI

### 3. Data Layer
- **Primary Database**: PostgreSQL 16
- **Migrations**: Prisma Migrations

## C4 Model System Context

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              ERP System                                     │
│                                                                             │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐          │
│  │   Frontend      │    │    Backend      │    │   Database      │          │
│  │   (React)       │◄──►│   (Express)     │◄──►│  (PostgreSQL)   │          │
│  │   Port: 3000    │    │   Port: 4000    │    │   Port: 5432    │          │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘          │
│           │                                               │                 │
│           │                                               │                 │
│  ┌─────────────────┐                             ┌─────────────────┐        │
│  │   Nginx         │                             │   Prisma        │        │
│  │   (Reverse      │                             │   (ORM)         │        │
│  │    Proxy)       │                             │                 │        │
│  └─────────────────┘                             └─────────────────┘        │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Container Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              ERP System                                     │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                        Frontend Container                           │   │
│  │                                                                     │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │   │
│  │  │   Pages     │  │ Components  │  │   Hooks     │  │   Context   │ │   │
│  │  │             │  │             │  │             │  │             │ │   │
│  │  │ • Login     │  │ • Forms     │  │ • API       │  │ • Auth      │ │   │
│  │  │ • Dashboard │  │ • Tables    │  │ • Queries   │  │ • Theme     │ │   │
│  │  │ • Quotations│  │ • Layouts   │  │ • Mutations │  │             │ │   │
│  │  │ • Sales     │  │ • Navigation│  │             │  │             │ │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘ │   │
│  │                                                                     │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                  │   │
│  │  │   API       │  │   Utils     │  │   Types     │                  │   │
│  │  │   Client    │  │             │  │             │                  │   │
│  │  │             │  │ • Helpers   │  │ • Interfaces│                  │   │
│  │  │ • Axios     │  │ • Constants │  │ • Enums     │                  │   │
│  │  │ • Interceptors│ • Validation│  │ • DTOs      │                  │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘                  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                       │
│                                    │ HTTP/HTTPS                            │
│                                    ▼                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                        Backend Container                            │   │
│  │                                                                     │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │   │
│  │  │ Controllers │  │   Routes    │  │ Middlewares │  │   Services  │ │   │
│  │  │             │  │             │  │             │  │             │ │   │
│  │  │ • Auth      │  │ • Auth      │  │ • Auth      │  │ • Business  │ │   │
│  │  │ • Quotation │  │ • Quotation │  │ • Role      │  │   Logic     │ │   │
│  │  │ • Sales     │  │ • Sales     │  │ • Validation│  │ • External  │ │   │
│  │  │ • Product   │  │ • Product   │  │ • CORS      │  │   APIs      │ │   │
│  │  │ • Customer  │  │ • Customer  │  │ • Error     │  │             │ │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘ │   │
│  │                                                                     │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                  │   │
│  │  │   Prisma    │  │   Utils     │  │   Types     │                  │   │
│  │  │   Client    │  │             │  │             │                  │   │
│  │  │             │  │ • Helpers   │  │ • Interfaces│                  │   │
│  │  │ • Database  │  │ • Validation│  │ • Enums     │                  │   │
│  │  │ • Migrations│  │ • JWT       │  │ • DTOs      │                  │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘                  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                       │
│                                    │ SQL                                   │
│                                    ▼                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                      Database Container                              │   │
│  │                                                                     │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │   │
│  │  │    Users    │  │  Customers  │  │   Products  │  │ Quotations  │ │   │
│  │  │             │  │             │  │             │  │             │ │   │
│  │  │ • id        │  │ • id        │  │ • id        │  │ • id        │ │   │
│  │  │ • name      │  │ • name      │  │ • name      │  │ • customerId│ │   │
│  │  │ • email     │  │ • userId    │  │ • price     │  │ • status    │ │   │
│  │  │ • password  │  │ • createdAt │  │ • createdAt │  │ • createdBy │ │   │
│  │  │ • role      │  │ • updatedAt │  │ • updatedAt │  │ • approvedBy│ │   │
│  │  │ • createdAt │  │             │  │             │  │ • createdAt │ │   │
│  │  │ • updatedAt │  │             │  │             │  │ • approvedAt│ │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘ │   │
│  │                                                                     │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                  │   │
│  │  │ Quotation   │  │ Sales       │  │ Status      │                  │   │
│  │  │   Items     │  │  Orders     │  │ History     │                  │   │
│  │  │             │  │             │  │             │                  │   │
│  │  │ • id        │  │ • id        │  │ • id        │                  │   │
│  │  │ • quotationId│ • quotationId│  │ • quotationId│                  │   │
│  │  │ • productId │  │ • createdBy │  │ • status    │                  │   │
│  │  │ • quantity  │  │ • createdAt │  │ • changedBy │                  │   │
│  │  │ • createdAt │  │ • updatedAt │  │ • timestamp │                  │   │
│  │  │ • updatedAt │  │             │  │ • createdAt │                  │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘                  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Component Diagram - Backend

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            Backend API                                     │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                        Express App                                   │   │
│  │                                                                     │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │   │
│  │  │   Auth      │  │ Quotation   │  │   Sales     │  │   Product   │ │   │
│  │  │ Controller  │  │ Controller  │  │   Order     │  │ Controller  │ │   │
│  │  │             │  │             │  │ Controller  │  │             │ │   │
│  │  │ • register  │  │ • create    │  │ • create    │  │ • getAll    │ │   │
│  │  │ • login     │  │ • getAll    │  │ • getAll    │  │ • search    │ │   │
│  │  │ • me        │  │ • getById   │  │             │  │             │ │   │
│  │  │             │  │ • approve   │  │             │  │             │ │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘ │   │
│  │           │               │               │               │           │   │
│  │           │               │               │               │           │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │   │
│  │  │   Auth      │  │ Quotation   │  │   Sales     │  │   Product   │ │   │
│  │  │   Routes    │  │   Routes    │  │   Order     │  │   Routes    │ │   │
│  │  │             │  │             │  │   Routes    │  │             │ │   │
│  │  │ POST /register│ POST /quotations│ POST /sales-orders│ GET /products│ │   │
│  │  │ POST /login │ GET /quotations│ GET /sales-orders│             │ │   │
│  │  │ GET /me     │ GET /:id       │             │             │ │   │
│  │  │             │ PUT /:id/approve│             │             │ │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘ │   │
│  │           │               │               │               │           │   │
│  │           │               │               │               │           │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │   │
│  │  │   Auth      │  │   Role      │  │ Validation  │  │   Error     │ │   │
│  │  │ Middleware  │  │ Middleware  │  │ Middleware  │  │   Handler   │ │   │
│  │  │             │  │             │  │             │  │             │ │   │
│  │  │ • JWT       │  │ • Role      │  │ • Zod       │  │ • Global    │ │   │
│  │  │ • Token     │  │ • Permission│  │ • Schema    │  │ • Error     │ │   │
│  │  │ • User      │  │ • Access    │  │ • Validation│  │ • Logging   │ │   │
│  │  │ • Context   │  │ • Control   │  │ • Sanitize  │  │ • Response  │ │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘ │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                       │
│                                    │ Prisma Client                         │
│                                    ▼                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                        Prisma ORM                                   │   │
│  │                                                                     │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │   │
│  │  │   User      │  │  Customer   │  │   Product   │  │ Quotation   │ │   │
│  │  │   Model     │  │   Model     │  │   Model     │  │   Model     │ │   │
│  │  │             │  │             │  │             │  │             │ │   │
│  │  │ • findUnique│  │ • findMany  │  │ • findMany  │  │ • create    │ │   │
│  │  │ • create    │  │ • findUnique│  │ • findUnique│  │ • findMany  │ │   │
│  │  │ • update    │  │ • create    │  │ • create    │  │ • findUnique│ │   │
│  │  │ • delete    │  │ • update    │  │ • update    │  │ • update    │ │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘ │   │
│  │                                                                     │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                  │   │
│  │  │ Quotation   │  │ Sales       │  │ Status      │                  │   │
│  │  │   Item      │  │   Order     │  │ History     │                  │   │
│  │  │   Model     │  │   Model     │  │   Model     │                  │   │
│  │  │             │  │             │  │             │                  │   │
│  │  │ • create    │  │ • create    │  │ • create    │                  │   │
│  │  │ • findMany  │  │ • findMany  │  │ • findMany  │                  │   │
│  │  │ • update    │  │ • findUnique│  │ • findUnique│                  │   │
│  │  │ • delete    │  │ • update    │  │ • update    │                  │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘                  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Component Diagram - Frontend

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            Frontend App                                    │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                        React App                                     │   │
│  │                                                                     │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │   │
│  │  │   Pages     │  │ Components  │  │   Hooks     │  │   Context   │ │   │
│  │  │             │  │             │  │             │  │             │ │   │
│  │  │ • LoginPage │  │ • LoginForm │  │ • useAuth   │  │ • AuthContext│ │   │
│  │  │ • HomePage  │  │ • Navbar    │  │ • useQuotations│ • ThemeContext│ │   │
│  │  │ • QuotationPage│ • QuotationTable│ • useProducts│             │ │   │
│  │  │ • SalesOrderPage│ • ProductSelector│ • useCustomers│             │ │   │
│  │  │ • ErrorPage │  │ • Button    │  │ • useSalesOrders│             │ │   │
│  │  │             │  │ • Input     │  │             │  │             │ │   │
│  │  │             │  │ • Skeleton  │  │             │  │             │ │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘ │   │
│  │           │               │               │               │           │   │
│  │           │               │               │               │           │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │   │
│  │  │   Layouts   │  │   Routes    │  │   API       │  │   Utils     │ │   │
│  │  │             │  │             │  │             │  │             │ │   │
│  │  │ • MainLayout│  │ • AppRouter │  │ • index.ts  │  │ • helpers   │ │   │
│  │  │ • RequiredAuth│ • ProtectedRoute│ • auth.ts   │  │ • constants │ │   │
│  │  │ • withLayout│  │ • PublicRoute│ • quotations.ts│ • validation │ │   │
│  │  │             │  │             │  │ • products.ts│ • formatting │ │   │
│  │  │             │  │             │  │ • customers.ts│ • dateUtils  │ │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘ │   │
│  │                                                                     │   │
│  │  ┌─────────────┐  ┌──────────────────┐  ┌─────────────┐                  │
│  │  │   Atoms     │  │ Molecules        │  │ Organisms   │                  │
│  │  │             │  │                  │  │             │                  │   
│  │  │ • Button    │  │ • LoginForm      │  │ • Navbar    │                  │   
│  │  │ • Input     │  │ • ProductSelector│  | • QuotationTable│              |    
│  │  │ • Badge     │  │                  │  │ • SalesOrderList│              |
│  │  │ • Skeleton  │  │                  │  │             │                  │   
│  │  │ • ThemeToggle│ |                  │  │             │                  │   
│  │  └─────────────┘  └──────────────────┘       └─────────────┘                 
│  └─────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Data Flow Diagrams

### Authentication Flow

```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│ Frontend│    │ Backend │    │ Database│    │ JWT     │    │ Context │
│         │    │         │    │         │    │         │    │         │
│ Login   │───►│ /auth/  │───►│ User    │───►│ Generate│───►│ Store   │
│ Form    │    │ login   │    │ Validate│    │ Token   │    │ Token   │
│         │    │         │    │         │    │         │    │         │
│         │◄───│ Token   │◄───│ Success │◄───│ JWT     │◄───│ Auth    │
│ Redirect│    │ Response│    │         │    │ Token   │    │ State   │
└─────────┘    └─────────┘    └─────────┘    └─────────┘    └─────────┘
```

### Quotation Creation Flow

```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│ Frontend│    │ Backend │    │ Database│    │ Status  │    │ Response│
│         │    │         │    │         │    │ History │    │         │
│ Create  │───►│ /quotations│───►│ Quotation│───►│ Create  │───►│ Success │
│ Form    │    │ POST    │    │ Create  │    │ Record  │    │ Response│
│         │    │         │    │         │    │         │    │         │
│         │◄───│ 201     │◄───│ Success │◄───│ Success │◄───│ Data    │
│ Redirect│    │ Created │    │         │    │         │    │         │
└─────────┘    └─────────┘    └─────────┘    └─────────┘    └─────────┘
```

### Quotation Approval Flow

```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│ Frontend│    │ Backend │    │ Database│    │ Sales   │    │ Response│
│         │    │         │    │         │    │ Order   │    │         │
│ Approve │───►│ /quotations│───►│ Update  │───►│ Create  │───►│ Success │
│ Button  │    │ /:id/   │    │ Status  │    │ Auto    │    │ Response│
│         │    │ approve │    │         │    │ Generate│    │         │
│         │◄───│ 200     │◄───│ Success │◄───│ Success │◄───│ Data    │
│ Update  │    │ Approved│    │         │    │         │    │         │
│ UI      │    │         │    │         │    │         │    │         │
└─────────┘    └─────────┘    └─────────┘    └─────────┘    └─────────┘
```

## Security Architecture

### Authentication & Authorization

```
┌───────────────────────────────────────────────────────────────────────────┐
│                            Security Layer                                 │
│                                                                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │
│  │   JWT       │  │   Role      │  │   CORS      │  │   Input     │       │
│  │   Token     │  │   Based     │  │   Policy    │  │ Validation  │       │
│  │             │  │   Access    │  │             │  │             │       │
│  │ • Sign      │  │   Control   │  │ • Origin    │  │ • Zod       │       │
│  │ • Verify    │  │             │  │ • Methods   │  │ • Sanitize  │       │
│  │ • Expire    │  │ • ADMIN     │  │ • Headers   │  │ • Escape    │       │
│  │ • Refresh   │  │ • SALES     │  │ • Credentials│ • Type Check  │       │
│  │             │  │ • CUSTOMER  │  │             │  │             │       │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘       │
│                                                                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │
│  │   Password  │  │   Session   │  │   Rate      │  │   Audit     │       │
│  │   Hashing   │  │   Management│  │   Limiting  │  │   Logging   │       │
│  │             │  │             │  │             │  │             │       │
│  │ • bcrypt    │  │ • JWT       │  │ • Per IP    │  │ • Actions   │       │
│  │ • Salt      │  │ • Expiry    │  │ • Per User  │  │ • Timestamps│       │
│  │ • Rounds    │  │ • Refresh   │  │ • Per Endpoint│ • User ID    │       │
│  │ • Cost      │  │ • Blacklist │  │ • Throttling│  │ • IP Address│       │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘       │
└───────────────────────────────────────────────────────────────────────────┘
```

## Deployment Architecture

### Docker Containerization

```
┌────────────────────────────────────────────────────────────────────────────┐
│                            Docker Environment                              │
│                                                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                        Docker Compose                               │   │
│  │                                                                     │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                  │   │
│  │  │   Frontend  │  │   Backend   │  │ PostgreSQL  │                  │   │
│  │  │   Container │  │   Container │  │   Container │                  │   │
│  │  │             │  │             │  │             │                  │   │
│  │  │ • React     │  │ • Node.js   │  │ • Database  │                  │   │
│  │  │ • Nginx     │  │ • Express   │  │ • Migrations│                  │   │
│  │  │ • Port 3000 │  │ • Prisma    │  │ • Port 5432 │                  │   │
│  │  │ • Static    │  │ • Port 4000 │  │ • Volume    │                  │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘                  │   │
│  │                                                                     │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                  │   │
│  │  │   Network   │  │   Volumes   │  │   Health    │                  │   │
│  │  │             │  │             │  │   Checks    │                  │   │
│  │  │ • Bridge    │  │ • Postgres  │  │ • Backend   │                  │   │
│  │  │ • Internal  │  │             │  │ • Frontend  │                  │   │
│  │  │ • External  │  │ • Logs      │  │ • Database  │                  │   │
│  │  │ • DNS       │  │ • Backups   │  │ • Cache     │                  │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘                  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query (React Query)
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **UI Components**: Custom component library
- **Form Handling**: React Hook Form
- **Date Handling**: date-fns
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js 20
- **Framework**: Express.js
- **Language**: TypeScript
- **Database ORM**: Prisma
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **CORS**: cors middleware
- **Documentation**: Swagger/OpenAPI

### Database
- **Primary Database**: PostgreSQL 16
- **Migrations**: Prisma Migrations
- **Seeding**: Prisma Seed

### DevOps
- **Containerization**: Docker & Docker Compose
- **Reverse Proxy**: Nginx
- **Environment**: Development & Production configs
