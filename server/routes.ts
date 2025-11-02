import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const BASE_URL = process.env.REPL_ID 
  ? `https://${process.env.REPL_ID}.replit.app`
  : 'http://localhost:5000';

// In-memory session store (replace with Redis/DB for production)
const sessions = new Map<string, {
  username: string;
  avatarUrl: string;
  forkedRepoUrl: string;
}>();

const stateStore = new Map<string, { timestamp: number }>();

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Generate random state for OAuth
  function generateState(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }

  // Initiate GitHub OAuth
  app.get("/api/auth/github", (req, res) => {
    const state = generateState();
    stateStore.set(state, { timestamp: Date.now() });
    
    // Clean up old states (older than 10 minutes)
    const tenMinutesAgo = Date.now() - 10 * 60 * 1000;
    Array.from(stateStore.entries()).forEach(([key, value]) => {
      if (value.timestamp < tenMinutesAgo) {
        stateStore.delete(key);
      }
    });

    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(BASE_URL + '/api/auth/github/callback')}&state=${state}&scope=public_repo`;
    
    res.redirect(githubAuthUrl);
  });

  // Handle GitHub OAuth callback
  app.get("/api/auth/github/callback", async (req, res) => {
    const { code, state } = req.query;

    // Validate state
    if (!state || !stateStore.has(state as string)) {
      return res.redirect('/?error=invalid_state');
    }
    stateStore.delete(state as string);

    if (!code) {
      return res.redirect('/?error=no_code');
    }

    try {
      // Exchange code for access token
      const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          client_id: GITHUB_CLIENT_ID,
          client_secret: GITHUB_CLIENT_SECRET,
          code,
        }),
      });

      const tokenData = await tokenResponse.json();
      
      if (!tokenData.access_token) {
        return res.redirect('/?error=no_access_token');
      }

      const accessToken = tokenData.access_token;

      // Fetch user profile
      const userResponse = await fetch('https://api.github.com/user', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      });

      const userData = await userResponse.json();

      // Fork the repository
      const forkResponse = await fetch('https://api.github.com/repos/horlapookie/Horlapookie-bot/forks', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      });

      if (!forkResponse.ok) {
        const errorData = await forkResponse.json();
        console.error('Fork error:', errorData);
        return res.redirect('/?error=fork_failed');
      }

      const forkData = await forkResponse.json();

      // Create session
      const sessionId = generateState();
      sessions.set(sessionId, {
        username: userData.login,
        avatarUrl: userData.avatar_url,
        forkedRepoUrl: forkData.html_url,
      });

      // Set session cookie
      res.cookie('session_id', sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        sameSite: 'lax',
      });

      // Redirect to home page
      res.redirect('/');
    } catch (error) {
      console.error('OAuth error:', error);
      res.redirect('/?error=oauth_failed');
    }
  });

  // Get current session
  app.get("/api/auth/session", (req, res) => {
    const sessionId = req.cookies.session_id;
    
    if (!sessionId || !sessions.has(sessionId)) {
      return res.json({ user: null });
    }

    const session = sessions.get(sessionId);
    res.json({ user: session });
  });

  // Logout
  app.post("/api/auth/logout", (req, res) => {
    const sessionId = req.cookies.session_id;
    
    if (sessionId) {
      sessions.delete(sessionId);
      res.clearCookie('session_id');
    }

    res.json({ success: true });
  });

  const httpServer = createServer(app);

  return httpServer;
}
