// api/callback.js - Handles OAuth callback and exchanges code for tokens
import axios from 'axios';

export default async function handler(req, res) {
  const { code, error } = req.query;

  if (error) {
    // User denied access
    return res.redirect(`case50://gmail-auth?error=${error}`);
  }

  if (!code) {
    return res.status(400).json({ error: 'No authorization code provided' });
  }

  try {
    // Exchange authorization code for tokens
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : 'http://localhost:3000'}/api/callback`,
      grant_type: 'authorization_code'
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const { access_token, refresh_token } = tokenResponse.data;

    // Create a success page that redirects to the app with tokens
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Gmail Authorization Success</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body {
            font-family: -apple-system, system-ui, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }
          .container {
            background: white;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 400px;
          }
          h1 { color: #333; }
          p { color: #666; line-height: 1.6; }
          .success { color: #22c55e; font-size: 48px; margin-bottom: 20px; }
          button {
            background: #667eea;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 16px;
            cursor: pointer;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="success">✓</div>
          <h1>Success!</h1>
          <p>Gmail has been connected successfully.</p>
          <p>You can now close this window and return to Case50.</p>
          <button onclick="openApp()">Open Case50</button>
        </div>

        <script>
          // Automatically redirect to app
          function openApp() {
            window.location.href = 'case50://gmail-auth?token=${encodeURIComponent(access_token)}&refresh=${encodeURIComponent(refresh_token || '')}';
          }

          // Auto-redirect after 2 seconds
          setTimeout(openApp, 2000);
        </script>
      </body>
      </html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);

  } catch (error) {
    console.error('Token exchange error:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to exchange authorization code',
      details: error.response?.data || error.message
    });
  }
}