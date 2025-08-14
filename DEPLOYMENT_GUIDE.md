# 🚀 Deployment Guide - Free Custom Domain

This guide will help you deploy your Holy Sips app with a free custom domain.

## 🎯 **Recommended: Vercel (Best for React Apps)**

### **Step 1: Prepare Your Code**
1. Make sure your code is in a GitHub repository
2. Ensure your `.env` file is in `.gitignore` (don't commit secrets)

### **Step 2: Deploy to Vercel**
1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Click **"New Project"**
3. Import your GitHub repository
4. Configure environment variables:
   - `REACT_APP_SUPABASE_URL`: `https://ufrbubthlifbfvflvwue.supabase.co`
   - `REACT_APP_SUPABASE_ANON_KEY`: Your anon key
5. Click **"Deploy"**

### **Step 3: Add Custom Domain**
1. In your Vercel dashboard, go to **Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter your custom domain (e.g., `holysips.com`)
4. Follow the DNS configuration instructions

## 🌐 **Alternative: Netlify**

### **Step 1: Build Your App**
```bash
npm run build
```

### **Step 2: Deploy to Netlify**
1. Go to [netlify.com](https://netlify.com) and sign up
2. Drag and drop your `build` folder to deploy
3. Or connect your GitHub repository for automatic deployments

### **Step 3: Add Custom Domain**
1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Enter your domain and configure DNS

## 📝 **Alternative: GitHub Pages**

### **Step 1: Install gh-pages**
```bash
npm install --save-dev gh-pages
```

### **Step 2: Update package.json**
Add these scripts:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  },
  "homepage": "https://yourusername.github.io/holy-sips"
}
```

### **Step 3: Deploy**
```bash
npm run deploy
```

### **Step 4: Add Custom Domain**
1. Create a `CNAME` file in your `public` folder with your domain
2. Go to repository **Settings** → **Pages**
3. Add your custom domain

## 🔧 **Free Domain Options**

### **1. Freenom (Free .tk, .ml, .ga domains)**
1. Go to [freenom.com](https://freenom.com)
2. Search for your desired domain
3. Register for free (12 months)
4. Configure DNS to point to your hosting provider

### **2. GitHub Student Pack**
- Free `.me` domain for students
- Free hosting on various platforms

### **3. Domain.com Promotions**
- Often has $1 domain deals
- Check for current promotions

## 🌍 **DNS Configuration**

### **For Vercel:**
```
Type: A
Name: @
Value: 76.76.19.19

Type: CNAME
Name: www
Value: your-app.vercel.app
```

### **For Netlify:**
```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: your-app.netlify.app
```

## 🔒 **Environment Variables Setup**

### **Vercel:**
1. Go to **Settings** → **Environment Variables**
2. Add:
   - `REACT_APP_SUPABASE_URL`
   - `REACT_APP_SUPABASE_ANON_KEY`

### **Netlify:**
1. Go to **Site settings** → **Environment variables**
2. Add the same variables

## 📱 **PWA Configuration (Optional)**

To make your app installable:

1. Update `public/manifest.json`
2. Add service worker
3. Configure icons

## 🚀 **Quick Deploy Commands**

### **Vercel CLI:**
```bash
npm i -g vercel
vercel
```

### **Netlify CLI:**
```bash
npm i -g netlify-cli
netlify deploy
```

## 💡 **Pro Tips**

1. **Use a CDN** for better performance
2. **Enable HTTPS** (automatic on most platforms)
3. **Set up automatic deployments** from GitHub
4. **Monitor performance** with built-in analytics
5. **Use environment-specific builds** for staging/production

## 🆘 **Troubleshooting**

### **Common Issues:**
- **Build fails**: Check environment variables
- **Domain not working**: Verify DNS settings
- **App not loading**: Check routing configuration
- **Supabase connection fails**: Verify credentials in production

### **Support:**
- Vercel: [vercel.com/support](https://vercel.com/support)
- Netlify: [netlify.com/support](https://netlify.com/support)
- GitHub: [github.com/support](https://github.com/support)

## 🎉 **Next Steps After Deployment**

1. **Test all features** on the live site
2. **Set up monitoring** and analytics
3. **Configure backups** for your database
4. **Set up CI/CD** for automatic deployments
5. **Optimize performance** with caching and compression

Your Holy Sips app will be live with a custom domain! 🍋✨