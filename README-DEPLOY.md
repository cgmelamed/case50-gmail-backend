# 🚀 Deploy Gmail OAuth Backend to Vercel

## Option 1: Quick Deploy (Easiest)

1. **Fork this to GitHub first**:
   - Create a new GitHub repo called `case50-gmail-backend`
   - Push this code to it:
   ```bash
   cd /Users/chrismelamed/Developer/Case50/gmail-vercel-backend
   git init
   git add .
   git commit -m "Gmail OAuth backend"
   git remote add origin https://github.com/YOUR-USERNAME/case50-gmail-backend.git
   git push -u origin main
   ```

2. **Deploy with One Click**:

   Go to: https://vercel.com/new

   - Import your GitHub repo
   - Add Environment Variables:
     - `GOOGLE_CLIENT_ID` = Your Web OAuth Client ID
     - `GOOGLE_CLIENT_SECRET` = Your Client Secret
   - Click Deploy!

## Option 2: Manual Deploy (Current Directory)

Since you're having trouble with the CLI, let's do it through the web:

1. **Prepare your code**:
   ```bash
   cd /Users/chrismelamed/Developer/Case50/gmail-vercel-backend
   zip -r gmail-backend.zip . -x "*.git*" -x "node_modules/*"
   ```

2. **Upload to Vercel**:
   - Go to https://vercel.com/new
   - Drag and drop the `gmail-backend.zip` file
   - Add environment variables
   - Deploy!

## Option 3: Use My Pre-Built Backend

If you're still having issues, I can give you a pre-deployed backend URL that you can use temporarily.

## Your Google OAuth Credentials

You said you already have a Web OAuth client. You need:

1. **Client ID**: Should look like `XXXXX-YYYYY.apps.googleusercontent.com`
2. **Client Secret**: A string of random characters
3. **Redirect URI**: Add `https://YOUR-VERCEL-APP.vercel.app/api/callback`

## After Deployment

Update your iOS app with the Vercel URL:

```swift
private let backendURL = "https://YOUR-APP.vercel.app"
```

---

**Need more help?**

The easiest path:
1. Put the code on GitHub
2. Connect GitHub to Vercel
3. Deploy with one click

This avoids all CLI issues!