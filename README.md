# Remote Work Platform

A modern web application built with Next.js for managing remote work, including projects, tasks, and team communication.

## Features

- 🔐 **Secure Authentication**
  - Email/Password authentication
  - Protected routes
  - Session management

- 📊 **Dashboard**
  - Overview of active projects
  - Task statistics
  - Recent activity
  - Quick actions

- 📂 **Project Management**
  - Create and manage projects
  - Project status tracking
  - Start and end date management
  - Project descriptions
  - Modern card-based interface

- ✅ **Task Management**
  - Create and assign tasks
  - Task priorities
  - Due dates
  - Status tracking
  - Project association
  - Filterable task list

- 💬 **Team Communication**
  - Message center
  - Real-time updates
  - Team collaboration

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Authentication**: NextAuth.js
- **Database**: Prisma with PostgreSQL
- **Styling**: Tailwind CSS
- **UI Components**: 
  - Radix UI
  - Shadcn UI
  - Lucide Icons
- **Form Management**:
  - React Hook Form
  - Zod validation
- **State Management**: React Hooks
- **Notifications**: Sonner
- **Date Formatting**: Intl API

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/remote-work.git
cd remote-work
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Fill in your environment variables:
```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── (authenticated)/
│   │   ├── dashboard/
│   │   ├── projects/
│   │   ├── tasks/
│   │   ├── messages/
│   │   └── layout.tsx
│   └── layout.tsx
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── dialog.tsx
│   │   ├── form.tsx
│   │   └── ...
│   ├── new-project-dialog.tsx
│   ├── new-task-dialog.tsx
│   └── ...
├── lib/
│   └── utils.ts
└── types/
    └── index.ts
```

## Features in Detail

### Authentication
- Secure login and registration
- Protected routes using Next.js middleware
- Session-based authentication with NextAuth.js

### Project Management
- Create new projects with title, description, and dates
- Track project status (Active, Completed, On Hold)
- View projects in a modern card layout
- Project details with progress tracking

### Task Management
- Create tasks with title, description, and due date
- Assign priority levels
- Link tasks to projects
- Filter tasks by status
- Mark tasks as complete

### Team Communication
- Message center for team updates
- Real-time notifications
- Team member collaboration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Radix UI](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
