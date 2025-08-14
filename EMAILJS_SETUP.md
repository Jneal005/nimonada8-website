# EmailJS Setup for Prayer Request Notifications

This guide will help you configure EmailJS to send prayer request notifications to jordaneneal005@gmail.com.

## Step 1: Create an EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Create an Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions to connect your email account
5. Note down the **Service ID** (you'll need this later)

## Step 3: Create an Email Template

1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

**Subject:** New Prayer Request from {{from_name}}

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

4. Save the template and note down the **Template ID**

## Step 4: Get Your Public Key

1. Go to "Account" in your EmailJS dashboard
2. Find your **Public Key** (also called User ID)
3. Copy this key

## Step 5: Configure Environment Variables

1. Create a `.env` file in your project root (copy from `.env.example`)
2. Add your EmailJS credentials:

```env
# EmailJS Configuration
REACT_APP_EMAILJS_SERVICE_ID=your_service_id_here
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id_here
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key_here
```

3. Replace the placeholder values with your actual EmailJS credentials
4. Restart your development server: `npm start`

## Step 6: Test the Setup

1. Go to your website's prayer request page
2. Fill out and submit a prayer request
3. Check jordaneneal005@gmail.com for the notification email

## Important Notes

- EmailJS has a free tier limit of 200 emails per month
- The email will be sent from your connected email account
- Make sure to keep your EmailJS credentials secure
- The prayer requests will still be saved to your database even if email sending fails

## Troubleshooting

- If emails aren't being sent, check the browser console for errors
- Verify that all environment variables are set correctly
- Make sure your EmailJS service is properly configured and active
- Check your EmailJS dashboard for any error logs

## Security

- Never commit your actual `.env` file to version control
- The `.env.example` file shows the required variables without exposing real credentials
- EmailJS public keys are safe to use in frontend applications