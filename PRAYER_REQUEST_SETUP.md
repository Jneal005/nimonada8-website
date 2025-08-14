# Prayer Request Email Setup

The prayer request form is now configured to:
1. Save all prayer requests to the database
2. Send email notifications to `jordaneneal005@gmail.com` for **non-public** prayer requests only

## Current Status

✅ **Fixed**: Prayer requests no longer fail when EmailJS is not configured
✅ **Working**: All prayer requests are saved to the database
⚠️ **Needs Setup**: Email notifications require EmailJS configuration

## To Enable Email Notifications

1. Follow the complete setup guide in `EMAILJS_SETUP.md`
2. Update the `.env` file with your actual EmailJS credentials:
   ```
   REACT_APP_EMAILJS_SERVICE_ID=your_actual_service_id
   REACT_APP_EMAILJS_TEMPLATE_ID=your_actual_template_id
   REACT_APP_EMAILJS_PUBLIC_KEY=your_actual_public_key
   ```
3. Restart the application: `npm start`

## How It Works Now

- **Public prayer requests**: Saved to database only (no email sent)
- **Private prayer requests**: Saved to database + email sent (if EmailJS is configured)
- **Error handling**: Form submission succeeds even if email fails
- **User feedback**: Clear success/error messages

## Testing

1. Submit a public prayer request → Should succeed without email
2. Submit a private prayer request → Should succeed and attempt email (check console for status)
3. Check browser console for EmailJS configuration status