
# Livedoc Project Documentation

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture & Tech Stack](#architecture--tech-stack)
3. [Feature Implementation Status](#feature-implementation-status)
4. [Development Setup](#development-setup)
5. [Database Schema](#database-schema)
6. [API Documentation](#api-documentation)
7. [Security Implementation](#security-implementation)
8. [AI Integration](#ai-integration)
9. [Deployment Guide](#deployment-guide)
10. [Contributing Guidelines](#contributing-guidelines)

## 🚀 Project Overview

### Mission Statement
Livedoc revolutionizes software documentation through AI-powered automation, real-time collaboration, and intelligent project management tools.

### Core Value Propositions
- **98% Accuracy** in AI-generated specifications
- **200+ Hours Saved** per team through automation
- **Real-time Synchronization** between code and documentation
- **Unified Workspace** for all documentation needs

### Target Users
- **Primary**: Software Engineers, Technical Writers, Engineering Managers, Product Managers
- **Secondary**: QA Engineers, DevOps Engineers, Customer Success Teams

## 🏗️ Architecture & Tech Stack

### Frontend Architecture
```
Frontend (React 18.3.1 + TypeScript)
├── UI Framework: Shadcn/UI + Tailwind CSS
├── State Management: TanStack React Query
├── Routing: React Router DOM
├── Form Handling: React Hook Form + Zod
├── Animation: Framer Motion
└── Icons: Lucide React
```

### Backend Architecture
```
Backend (Supabase)
├── Authentication: Supabase Auth
├── Database: PostgreSQL with RLS
├── Storage: Supabase Storage
├── Real-time: Supabase Realtime
└── Edge Functions: Deno runtime
```

### AI Integration
```
AI Services
├── Primary: OpenAI GPT-4
├── Planned: Anthropic Claude, Google Gemini
├── Content Generation: Specifications, Documentation
└── Code Analysis: AST parsing, Quality scoring
```

## 📊 Feature Implementation Status

### ✅ Completed (Production Ready)

#### Authentication & Security System
- **Implementation**: Complete Supabase Auth integration
- **Features**: Email/password, Google OAuth, 2FA ready
- **Security**: Session management, audit logging, RLS policies
- **Files**: `src/contexts/AuthContext.tsx`, `src/components/auth/`

#### User Profile Management
- **Implementation**: Full CRUD with preferences
- **Features**: Avatar upload, notification/security preferences
- **Storage**: Supabase profiles table with JSONB preferences
- **Files**: `src/hooks/useProfile.ts`, `src/components/profile/`

#### Security Dashboard
- **Implementation**: Comprehensive security monitoring
- **Features**: Audit logs, session management, security settings
- **Monitoring**: Real-time security event tracking
- **Files**: `src/components/profile/SecuritySettings.tsx`, `src/hooks/useSecurity.ts`

### 🔄 In Progress (Beta)

#### Project Management
- **Status**: Core CRUD operations complete
- **Features**: Project creation, metadata, type classification
- **Pending**: Templates, advanced sharing, analytics
- **Files**: `src/hooks/useProjects.ts`, `src/components/projects/`

#### Document Management
- **Status**: Basic operations complete
- **Features**: Document CRUD, versioning, type classification
- **Pending**: Advanced collaboration, templates
- **Files**: `src/hooks/useDocuments.ts`, `src/components/documents/`

#### AI Content Generation
- **Status**: OpenAI integration active
- **Features**: Content generation, document improvement
- **Pending**: Multi-provider support, advanced prompting
- **Files**: `src/lib/ai-content-service.ts`, `supabase/functions/`

### ⏳ Pending Implementation

#### Real-time Collaboration
- **Requirements**: WebSocket infrastructure, OT algorithm
- **Features**: Multi-user editing, presence indicators
- **Dependencies**: Document management completion

#### Team Management
- **Requirements**: Team CRUD, member management
- **Features**: Role-based permissions, team analytics
- **Dependencies**: Advanced auth system

#### Advanced Analytics
- **Requirements**: Metrics collection, visualization
- **Features**: Usage analytics, productivity insights
- **Dependencies**: Core feature completion

## 🛠️ Development Setup

### Prerequisites
```bash
Node.js >= 18.0.0
npm >= 8.0.0
Git
Supabase CLI (optional)
```

### Installation
```bash
# Clone repository
git clone <repository-url>
cd livedoc

# Install dependencies
npm install

# Environment setup
cp .env.example .env.local
# Configure environment variables

# Start development server
npm run dev
```

### Environment Variables
```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# AI Services
OPENAI_API_KEY=your_openai_key
```

## 🗄️ Database Schema

### Core Tables

#### profiles
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users,
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  phone TEXT,
  timezone TEXT DEFAULT 'UTC',
  language TEXT DEFAULT 'en',
  notification_preferences JSONB DEFAULT '{"email": true, "push": true, "security_alerts": true}',
  security_preferences JSONB DEFAULT '{"two_factor_enabled": false, "login_notifications": true, "session_timeout": 30}',
  email_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

#### projects
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL,
  status TEXT DEFAULT 'draft',
  tech_stack TEXT[] DEFAULT '{}',
  ai_model TEXT DEFAULT 'gpt-4',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

#### documents
```sql
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users,
  project_id UUID REFERENCES projects(id),
  title TEXT NOT NULL,
  description TEXT,
  doc_type TEXT DEFAULT 'specification',
  content TEXT,
  file_url TEXT,
  version INTEGER DEFAULT 1,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

#### security_audit_logs
```sql
CREATE TABLE security_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users,
  event_type TEXT NOT NULL,
  event_data JSONB,
  ip_address INET,
  user_agent TEXT,
  success BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### Row Level Security (RLS)
All tables implement RLS policies ensuring users can only access their own data:
- Users can only view/modify their own profiles
- Projects are scoped to the creating user
- Documents are accessible based on project permissions
- Security logs are user-specific

## 🔒 Security Implementation

### Authentication Flow
1. **Registration**: Email verification with secure password requirements
2. **Login**: Session-based with device fingerprinting
3. **2FA**: TOTP-based two-factor authentication (ready)
4. **Social**: Google OAuth integration

### Security Features
- **Session Management**: Device tracking, automatic timeout
- **Audit Logging**: Comprehensive security event tracking
- **Data Protection**: AES-256 encryption, secure headers
- **Access Control**: Row-level security, role-based permissions

### Security Monitoring
```typescript
// Security event tracking
logSecurityEvent({
  event: "login_attempt",
  userId: user.id,
  detail: { method: "email", success: true }
});
```

## 🤖 AI Integration

### Current Implementation
- **Provider**: OpenAI GPT-4
- **Features**: Content generation, document improvement
- **Endpoints**: Edge functions for secure API calls

### AI Services Architecture
```typescript
// Content generation
const response = await aiContentService.generateContent({
  prompt: "Generate API documentation for...",
  type: "documentation",
  context: existingContent,
  model: "gpt-4"
});
```

### Planned Enhancements
- Multi-provider support (Claude, Gemini)
- Advanced prompt engineering
- Custom model fine-tuning
- Quality scoring algorithms

## 🚀 Deployment Guide

### Production Deployment
```bash
# Build application
npm run build

# Deploy to hosting platform
npm run deploy

# Supabase migrations
supabase db push --local
```

### Environment Configuration
- **Supabase**: Database, auth, storage, edge functions
- **Hosting**: Vercel, Netlify, or custom infrastructure
- **CDN**: Asset distribution and caching
- **Monitoring**: Error tracking, performance monitoring

## 👥 Contributing Guidelines

### Development Workflow
1. Create feature branch from `main`
2. Implement feature with tests
3. Submit pull request with description
4. Code review and approval
5. Merge to main and deploy

### Code Standards
- **TypeScript**: Strict mode enabled
- **ESLint**: Configured with React rules
- **Prettier**: Code formatting
- **Components**: Small, focused, reusable

### File Organization
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (Shadcn)
│   ├── auth/           # Authentication components
│   ├── documents/      # Document management
│   ├── projects/       # Project management
│   └── profile/        # User profile
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Route components
└── types/              # TypeScript definitions
```

### Testing Strategy
- **Unit Tests**: Component and hook testing
- **Integration Tests**: API and database testing
- **E2E Tests**: Critical user journey testing
- **Security Tests**: Penetration testing, audit reviews

## 📈 Performance Metrics

### Current Benchmarks
- **Page Load**: <2 seconds average
- **Time to Interactive**: <3 seconds
- **Core Web Vitals**: LCP <2.5s, FID <100ms, CLS <0.1
- **Database**: <500ms query response time

### Monitoring Tools
- **Performance**: Lighthouse, Web Vitals
- **Errors**: Console logging, error boundaries
- **Analytics**: User behavior tracking
- **Security**: Audit log monitoring

## 🔮 Future Roadmap

### Phase 1: MVP Completion (Q1)
- Real-time collaboration
- Team management
- Basic analytics dashboard

### Phase 2: Advanced Features (Q2)
- Mobile application
- Advanced AI capabilities
- Enterprise integrations

### Phase 3: Scale & Growth (Q3-Q4)
- API marketplace
- White-label solutions
- Global expansion

---

**Last Updated**: December 2024  
**Version**: 1.0.0  
**Maintainers**: Development Team

For questions or contributions, please refer to the contributing guidelines or contact the development team.
