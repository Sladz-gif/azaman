# 🚀 Vercel Deployment Guide

This guide will help you deploy Azaman on Vercel quickly and easily.

## 📋 Prerequisites

- GitHub repository with the Azaman code
- Vercel account (free tier is sufficient)
- Node.js 18+ (for local testing)

## 🌐 Deployment Methods

### Method 1: Automatic Deployment (Recommended)

1. **Connect GitHub to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect the framework settings

2. **Configure Build Settings**
   - Framework: Vite (auto-detected)
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Deploy**
   - Click "Deploy"
   - Your app will be live in seconds!

### Method 2: Vercel CLI Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from Terminal**
   ```bash
   cd azaman
   vercel --prod
   ```

### Method 3: GitHub Integration

1. **Install Vercel GitHub App**
   - Go to Vercel dashboard
   - Settings → GitHub
   - Install the Vercel GitHub app

2. **Auto-deploy on Push**
   - Push to main branch → Auto-deploy to production
   - Push to other branches → Auto-deploy to preview

## ⚙️ Configuration Files

### vercel.json
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### package.json Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "npm run build"
  }
}
```

## 🔧 Environment Variables

Azaman doesn't require any environment variables for basic functionality. All features work out of the box.

## 📱 Build Optimization

The project is optimized for production:

- **Code Splitting**: Automatic chunk separation
- **Tree Shaking**: Unused code removal
- **Minification**: ESBuild minification
- **Asset Optimization**: Image and CSS optimization
- **Gzip Compression**: Automatic compression on Vercel

## 🌍 Domain Configuration

### Custom Domain
1. Go to Vercel dashboard
2. Select your project
3. Go to Settings → Domains
4. Add your custom domain
5. Configure DNS records

### Subdomain
Vercel provides a free `.vercel.app` subdomain automatically.

## 🔍 Pre-deployment Checklist

- [ ] Repository is pushed to GitHub
- [ ] `package.json` has correct build scripts
- [ ] `vercel.json` is configured
- [ ] Local build works: `npm run build`
- [ ] No sensitive data in code
- [ ] Environment variables configured (if needed)

## 🚀 Quick Deploy Commands

```bash
# Test build locally
npm run build

# Preview production build
npm run preview

# Deploy to Vercel
vercel --prod
```

## 📊 Performance Monitoring

Vercel provides built-in analytics:
- Page load times
- Core Web Vitals
- Error tracking
- User analytics

## 🔄 Continuous Deployment

Set up automatic deployments:
- **Main branch** → Production
- **Feature branches** → Preview deployments
- **Pull requests** → Automatic preview

## 🛠 Troubleshooting

### Common Issues

1. **Build Fails**
   - Check `npm run build` locally
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **404 Errors**
   - Ensure `vercel.json` has correct rewrites
   - Check `outputDirectory` setting

3. **Styling Issues**
   - Verify Tailwind CSS is properly configured
   - Check asset paths in `index.html`

4. **Performance Issues**
   - Check bundle size in Vercel analytics
   - Optimize images and assets
   - Enable code splitting

### Debug Mode

Add debug mode for development:
```bash
vercel --prod --debug
```

## 📞 Support

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Vercel Status**: [vercel-status.com](https://vercel-status.com/)
- **Community**: [vercel.com/discord](https://vercel.com/discord)

## 🎉 Success!

Once deployed, your Azaman app will be live at:
- `https://your-app.vercel.app` (Vercel subdomain)
- `https://your-custom-domain.com` (if configured)

The app will include:
- ✅ Dark theme with orange accents
- ✅ All financial features
- ✅ Responsive design
- ✅ Fast loading times
- ✅ SEO optimization

**Happy deploying! 🚀**
