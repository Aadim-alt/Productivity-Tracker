# GitHub Productivity Tracker

A web application that tracks and visualizes your GitHub activity and productivity metrics.

## Features

- 🔐 GitHub OAuth authentication
- 📊 Comprehensive activity tracking (commits, PRs, issues, reviews)
- 📈 Interactive charts and visualizations
- 🎯 Professional dashboard with statistics
- 📱 Responsive design
- 🔄 Real-time data refresh

## Tech Stack

- **Backend**: Node.js, Express, Passport.js, GitHub API
- **Frontend**: React, Chart.js, React Router
- **Authentication**: GitHub OAuth 2.0
- **Styling**: CSS3 with GitHub-inspired design

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- GitHub account
- GitHub OAuth App credentials

### 1. Clone and Install Dependencies

```bash
cd github-productivity-tracker/backend
npm install

cd ../frontend
npm install
```

### 2. Create GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the details:
   - Application name: `GitHub Productivity Tracker`
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:5000/auth/github/callback`
4. Note down the Client ID and Client Secret

### 3. Environment Configuration

Create a `.env` file in the root directory with:

```env
# GitHub OAuth Configuration
GITHUB_CLIENT_ID=your_github_client_id_here
GITHUB_CLIENT_SECRET=your_github_client_secret_here
GITHUB_CALLBACK_URL=http://localhost:5000/auth/github/callback

# Server Configuration
PORT=5000
SESSION_SECRET=your_random_session_secret_here

# Frontend URL
CLIENT_URL=http://localhost:3000

# API Configuration
NODE_ENV=development
```

### 4. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### 5. Access the Application

Open your browser and navigate to:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

- `GET /auth/github` - Initiate GitHub OAuth flow
- `GET /auth/github/callback` - OAuth callback handler
- `GET /auth/user` - Get current user info
- `GET /auth/logout` - Logout user
- `GET /api/user/stats` - Get user productivity statistics
- `GET /health` - Health check endpoint

## Project Structure

```
github-productivity-tracker/
├── backend/
│   ├── package.json
│   ├── server.js
│   ├── services/
│   │   └── githubService.js
│   └── config/
├── frontend/
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Header.js
│   │   │   ├── StatCard.js
│   │   │   ├── CommitChart.js
│   │   │   └── ActivityChart.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── build/
├── .env
├── README.md
└── TODO.md
```

## Security Notes

- Uses secure session management with express-session
- OAuth tokens are stored server-side only
- CORS is configured for local development
- Environment variables are used for sensitive data

## Development

To contribute to this project:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for personal or commercial purposes.
