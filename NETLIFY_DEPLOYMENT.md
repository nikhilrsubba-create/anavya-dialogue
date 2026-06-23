# Production Deployment Guide: Netlify
1. Put code to GitHub repository.
2. Link repository to Netlify via dashboard interface panel.
3. Configure settings: Build command: `next build`, Publish path: `.next`.
4. Inject production environment metrics: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
