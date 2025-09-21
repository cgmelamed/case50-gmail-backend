# Gmail OAuth Backend for Case50

This Vercel backend handles Gmail OAuth for the Case50 iOS app.

## Setup Instructions

### 1. Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your project (Case50)
3. Go to "APIs & Services" → "Credentials"
4. Click "Create Credentials" → "OAuth client ID"
5. Choose **"Web application"** (NOT iOS!)
6. Name: "Case50 Vercel Backend"
7. Add Authorized redirect URIs:
   - For local testing: `http://localhost:3000/api/callback`
   - For production: `https://YOUR-APP.vercel.app/api/callback`
8. Click "Create"
9. Save the Client ID and Client Secret

### 2. Deploy to Vercel

```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Install dependencies
cd gmail-vercel-backend
npm install

# Deploy to Vercel
vercel

# Follow the prompts:
# - Link to existing project or create new
# - Project name: case50-gmail-backend
```

### 3. Add Environment Variables in Vercel

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to Settings → Environment Variables
4. Add:
   - `GOOGLE_CLIENT_ID` = Your Web OAuth Client ID
   - `GOOGLE_CLIENT_SECRET` = Your Client Secret

### 4. Update Google OAuth Redirect URI

After deployment, update your Google OAuth client:
1. Go back to Google Cloud Console
2. Edit your Web OAuth client
3. Add the production redirect URI:
   - `https://YOUR-PROJECT.vercel.app/api/callback`

### 5. Test It

Visit: `https://YOUR-PROJECT.vercel.app/`

This should redirect you to Google OAuth.

## How It Works

1. iOS app opens: `https://YOUR-PROJECT.vercel.app/api/auth`
2. User authorizes with Google
3. Google redirects to `/api/callback`
4. Backend exchanges code for tokens
5. Backend redirects to `case50://gmail-auth?token=TOKEN`
6. iOS app receives and stores the token

## API Endpoints

- `GET /api/auth` - Starts OAuth flow
- `GET /api/callback` - Handles OAuth callback
- `POST /api/refresh` - Refreshes expired tokens