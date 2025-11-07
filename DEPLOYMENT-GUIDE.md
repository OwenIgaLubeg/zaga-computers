# ZAGA Technologies E-Commerce - Deployment Guide

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Firebase Setup](#firebase-setup)
3. [Admin Account Creation](#admin-account-creation)
4. [Flutterwave Payment Setup](#flutterwave-payment-setup)
5. [Deploying to Firebase Hosting](#deploying-to-firebase-hosting)
6. [Security Rules Deployment](#security-rules-deployment)
7. [Testing](#testing)

---

## Prerequisites

Before deploying, ensure you have:
- ✅ Node.js installed (v14 or higher)
- ✅ Firebase CLI installed: `npm install -g firebase-tools`
- ✅ A Firebase project created at [console.firebase.google.com](https://console.firebase.google.com)
- ✅ A Flutterwave account for payment processing

---

## Firebase Setup

### Step 1: Initialize Firebase Project

```bash
cd "C:\Users\owen\Documents\Github\ShopMe-Ecommerce"
firebase login
firebase init
```

### Step 2: Select Firebase Services

When prompted, select:
- ✅ Firestore (Database)
- ✅ Storage
- ✅ Hosting

### Step 3: Configure Firestore

- Use existing `firestore.rules` file: **YES**
- Use existing `firestore.indexes.json` file: **YES**

### Step 4: Configure Storage

- Use existing `storage.rules` file: **YES**

### Step 5: Configure Hosting

- Public directory: **. (current directory)**
- Single-page app: **YES**
- Overwrite index.html: **NO**

---

## Admin Account Creation

### Option 1: Via Firebase Console (Recommended)

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: **zaga-tech-store**
3. Navigate to **Authentication** → **Users**
4. Click **Add User**
5. Enter:
   - **Email**: `sales2.zagatechnologiesltd@gmail.com`
   - **Password**: `@karenlivs2`
6. Click **Add User**

### Option 2: Via Firebase CLI

```bash
firebase auth:import admin-user.json
```

Create `admin-user.json`:
```json
{
  "users": [
    {
      "email": "sales2.zagatechnologiesltd@gmail.com",
      "passwordHash": "base64EncodedHash",
      "emailVerified": true
    }
  ]
}
```

---

## Flutterwave Payment Setup

### Step 1: Create Flutterwave Account

1. Go to [Flutterwave](https://flutterwave.com)
2. Sign up for a business account
3. Complete KYC verification

### Step 2: Get API Keys

1. Login to Flutterwave Dashboard
2. Navigate to **Settings** → **API Keys**
3. Copy your **Public Key** (starts with `FLWPUBK_`)

### Step 3: Update Payment Configuration

Open `cart.html` and update line 376:

```javascript
// BEFORE (Test key)
public_key: "FLWPUBK_TEST-SANDBOXDEMOKEY-X",

// AFTER (Your actual key)
public_key: "FLWPUBK-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-X",
```

### Step 4: Enable Payment Methods

In Flutterwave Dashboard:
1. Go to **Settings** → **Payment Methods**
2. Enable:
   - ✅ **Card Payments** (Visa/Mastercard)
   - ✅ **Mobile Money Uganda** (MTN, Airtel)
   - ✅ **Bank Transfer** (Optional)

### Step 5: Test Payments

Flutterwave provides test cards for sandbox testing:

**Test Card (Success)**
- Card Number: `5531886652142950`
- CVV: `564`
- Expiry: `09/32`
- PIN: `3310`
- OTP: `12345`

**Mobile Money Test Number**
- Uganda: `256772123456`

---

## Deploying to Firebase Hosting

### Step 1: Build and Deploy

```bash
# Deploy everything (Firestore, Storage, Hosting)
firebase deploy

# Or deploy individually:
firebase deploy --only firestore:rules
firebase deploy --only storage:rules
firebase deploy --only hosting
```

### Step 2: Verify Deployment

After deployment, Firebase will provide a URL:
```
✔ Deploy complete!

Project Console: https://console.firebase.google.com/project/zaga-tech-store
Hosting URL: https://zaga-tech-store.web.app
```

---

## Security Rules Deployment

### Deploy Firestore Rules

```bash
firebase deploy --only firestore:rules
```

**Verify in Firebase Console:**
1. Go to **Firestore Database** → **Rules**
2. Ensure rules show admin email check

### Deploy Storage Rules

```bash
firebase deploy --only storage:rules
```

**Verify in Firebase Console:**
1. Go to **Storage** → **Rules**
2. Ensure only admin can upload to `/products/`

---

## Testing

### Test Admin Login

1. Visit your deployed site
2. Go to **Login** page
3. Use Admin credentials:
   - Email: `sales2.zagatechnologiesltd@gmail.com`
   - Password: `@karenlivs2`
4. Verify redirect to Dashboard

### Test User Registration

1. Click **"Don't have an account? Sign up here"**
2. Register with test email
3. Verify user created in Firebase Console

### Test Product Management

1. Login as admin
2. Add a test product with image
3. Verify product appears in **Our Store**

### Test Shopping Cart

1. Logout from admin
2. Login as regular user
3. Add product to cart
4. Verify cart is user-specific

### Test Payment

1. Go to cart with items
2. Click **Checkout**
3. Use Flutterwave test card
4. Verify order created in Firestore `orders` collection

---

## Custom Domain Setup (Optional)

### Step 1: Add Domain in Firebase

```bash
firebase hosting:channel:deploy production
```

### Step 2: Connect Domain

1. Go to Firebase Console → **Hosting**
2. Click **Add custom domain**
3. Enter your domain: `zagatechnologies.com`
4. Follow DNS configuration steps

### Step 3: Update DNS Records

Add these records to your domain registrar:

```
Type    Name    Value
A       @       151.101.1.195
A       @       151.101.65.195
```

---

## Environment Variables

For production, consider using Firebase Functions to hide API keys:

```javascript
// functions/index.js
const functions = require('firebase-functions');

exports.getFlutterwaveKey = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Must be logged in');
  }
  return { publicKey: functions.config().flutterwave.public_key };
});
```

---

## Troubleshooting

### Issue: "Permission denied" errors

**Solution**: Ensure Firestore rules are deployed
```bash
firebase deploy --only firestore:rules
```

### Issue: Admin can't login

**Solution**: Verify admin account exists in Firebase Authentication

### Issue: Payment not working

**Solution**: 
1. Check Flutterwave API key is correct
2. Ensure payment methods are enabled in Flutterwave dashboard
3. Check browser console for errors

### Issue: Images not uploading

**Solution**: Deploy storage rules
```bash
firebase deploy --only storage:rules
```

---

## Post-Deployment Checklist

- ✅ Admin account created and tested
- ✅ Firebase security rules deployed
- ✅ Flutterwave payment configured and tested
- ✅ Test user registration working
- ✅ Product CRUD operations working
- ✅ Shopping cart is user-specific
- ✅ Payment integration tested
- ✅ Email notifications configured (if using Firebase Functions)
- ✅ Analytics enabled (Google Analytics)
- ✅ Performance monitoring enabled

---

## Support

For issues or questions:
- Email: sales2.zagatechnologiesltd@gmail.com
- Phone: +256 700706809

---

## License

Copyright © 2025 ZAGA Technologies. All Rights Reserved.

