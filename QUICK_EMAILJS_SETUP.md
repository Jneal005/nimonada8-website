# Quick EmailJS Setup for Prayer Requests

Your prayer requests are failing because EmailJS isn't configured yet. Here's how to fix it in 5 minutes:

## Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service
1. In your EmailJS dashboard, click "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" (recommended)
4. Click "Connect Account" and sign in with your Gmail
5. **Copy the Service ID** (looks like `service_xxxxxxx`)

## Step 3: Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Set the template name: `Prayer Request Notification`
4. Use this template:

**Subject:** `New Prayer Request from {{from_name}}`

**Body:**
```
Hello,

A new prayer request has been submitted:

From: {{from_name}}
Submitted: {{submitted_at}}
Public Request: {{is_public}}

Prayer Request:
{{prayer_request}}

Blessings,
Holy Sips Ministry Website
```

5. **Copy the Template ID** (looks like `template_xxxxxxx`)

## Step 4: Get Public Key
1. Go to "Account" in your dashboard
2. Find "Public Key" (also called User ID)
3. **Copy this key** (looks like `xxxxxxxxxxxxxxx`)

## Step 5: Update Your .env File
Replace the placeholder values in your `.env` file:

```env
REACT_APP_EMAILJS_SERVICE_ID=service_your_actual_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=template_your_actual_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_actual_public_key
```

## Step 6: Restart Your App
1. Stop your development server (Ctrl+C in terminal)
2. Run `npm start` again
3. Test the prayer request form

## Test It
1. Go to your website
2. Submit a **non-public** prayer request
3. Check your email (jordaneneal005@gmail.com) for the notification

## Troubleshooting
- Make sure to use the **exact** IDs from EmailJS
- Restart your app after changing .env
- Check browser console for error messages
- Verify your Gmail account is connected in EmailJS

**Need help?** The detailed guide is in `EMAILJS_SETUP.md`