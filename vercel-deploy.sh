#!/bin/bash

echo "🚀 Deploying Gmail OAuth Backend to Vercel"
echo ""
echo "Prerequisites:"
echo "1. You need a Vercel account (free at vercel.com)"
echo "2. You need your Google OAuth Web Client credentials"
echo ""
echo "Press Enter to continue..."
read

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "Installing Vercel CLI..."
    npm i -g vercel
fi

echo ""
echo "📝 Please enter your Google OAuth credentials:"
echo "(You can find these in Google Cloud Console > APIs & Services > Credentials)"
echo ""

read -p "Enter your Web OAuth Client ID: " CLIENT_ID
read -p "Enter your Client Secret: " CLIENT_SECRET

# Create .env file for deployment
cat > .env.production << EOF
GOOGLE_CLIENT_ID=$CLIENT_ID
GOOGLE_CLIENT_SECRET=$CLIENT_SECRET
EOF

echo ""
echo "🔧 Configuration saved!"
echo ""
echo "Next steps:"
echo "1. Run: npx vercel --prod"
echo "2. Follow the prompts (create new project, name it 'case50-gmail')"
echo "3. Your backend will be deployed!"
echo ""
echo "After deployment:"
echo "1. Copy your Vercel URL (like https://case50-gmail.vercel.app)"
echo "2. Add it to Google OAuth redirect URIs"
echo "3. Update the iOS app with the URL"