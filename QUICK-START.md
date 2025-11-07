# Quick Start Guide - ZAGA Technologies E-Commerce

## ⚠️ **CRITICAL FIRST STEP: START WEB SERVER!**

🚫 **DO NOT open HTML files by double-clicking them!**  
✅ **MUST use a web server for Firebase to work**

### **Quick Start: Double-click `START-SERVER.bat`**

This will automatically:
1. Start a local web server
2. Open your browser to http://localhost:8000
3. Make everything work!

**Why is this required?**
- Firebase needs HTTP/HTTPS (not file://)
- Browser security blocks ES6 modules on file://
- Database operations fail without proper protocol

---

## 🚀 Get Started in 5 Steps

### Step 1: Create Admin Account (REQUIRED - Do This First!)

**Option A: Use Admin Setup Page (Easiest)**

1. Open `admin-setup.html` in your browser
2. Click "Create Admin Account" button
3. Wait for success message
4. Click "Go to Login"

**Option B: Manual Creation via Firebase Console**

1. Go to [Firebase Console](https://console.firebase.google.com/project/zaga-tech-store/authentication/users)
2. Click "Add User"
3. Email: `sales2.zagatechnologiesltd@gmail.com`
4. Password: `@karenlivs2`
5. Click "Add User"

### Step 2: Install Firebase CLI (If Not Already Installed)

```bash
npm install -g firebase-tools
```

### Step 3: Login to Firebase

```bash
cd "C:\Users\owen\Documents\Github\ShopMe-Ecommerce"
firebase login
```

### Step 4: Deploy Security Rules

```bash
firebase deploy --only firestore:rules,storage:rules
```

### Step 5: Update Flutterwave API Key (Optional - For Payments)

**Open:** `cart.html`

**Find line 376:**
```javascript
public_key: "FLWPUBK_TEST-SANDBOXDEMOKEY-X",
```

**Replace with your key:**
```javascript
public_key: "FLWPUBK-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-X",
```

**Get your key:** [Flutterwave Dashboard](https://dashboard.flutterwave.com/settings/apis) → Settings → API Keys

---

## ✅ You're Ready!

### Test Locally

1. Open `index.html` in your browser
2. Click **Sign-In/Up**
3. Login as admin:
   - Email: `sales2.zagatechnologiesltd@gmail.com`
   - Password: `@karenlivs2`
4. Add a test product in Dashboard
5. Logout
6. Register as a regular user
7. Add product to cart
8. Test checkout

### Deploy to Firebase Hosting (Optional)

```bash
firebase deploy --only hosting
```

Your site will be live at: `https://zaga-tech-store.web.app`

---

## 🔑 Important Credentials

### Admin Login
- **URL:** `/login.html` → Admin Login (left side)
- **Email:** `sales2.zagatechnologiesltd@gmail.com`
- **Password:** `@karenlivs2`

### User Login
- **URL:** `/login.html` → User Login (right side)
- **Registration:** Users create their own accounts

---

## 📦 What's New?

✅ **Separated Admin and User Login**
- Admin has dedicated login form with hardcoded credentials
- Users can register and login separately

✅ **User-Specific Shopping Carts**
- Each user has their own cart
- Carts persist across sessions

✅ **Payment Integration**
- Flutterwave for Mobile Money (MTN, Airtel)
- Visa/Mastercard support
- Order tracking in Firestore

✅ **Logout Functionality**
- Available on all pages
- Clears session properly

✅ **Secure Database**
- Firestore security rules protect data
- Admin-only product management
- User cart isolation

---

## 🧪 Test Payment

### Flutterwave Test Cards (Sandbox Mode)

**Successful Transaction:**
- Card: `5531886652142950`
- CVV: `564`
- Expiry: `09/32`
- PIN: `3310`
- OTP: `12345`

**Failed Transaction:**
- Card: `5531886652142950`
- CVV: `564`
- Expiry: `09/32`
- PIN: `3310`
- OTP: Use any OTP except `12345`

**Mobile Money Test:**
- Number: `256772123456`

---

## ⚠️ Before Going Live

1. ✅ Create admin account in Firebase Authentication
2. ✅ Replace Flutterwave test key with live key
3. ✅ Deploy Firestore and Storage rules
4. ✅ Test all features (admin login, user registration, cart, payment)
5. ✅ Enable Flutterwave payment methods in dashboard
6. ✅ Add real products to database
7. ✅ Test on multiple devices

---

## 📊 Project Structure

```
ShopMe-Ecommerce/
├── index.html                  # Homepage
├── login.html                  # Admin & User Login/Register
├── admin-dashboard.html        # Product Management
├── shop.html                   # Product Listing
├── sproduct.html               # Product Details
├── cart.html                   # Shopping Cart & Checkout
├── about.html                  # About Page
├── contact.html                # Contact Page
├── style.css                   # Main Styles
├── js/
│   └── firebase-config.js      # Firebase Configuration
├── firestore.rules             # Database Security Rules
├── storage.rules               # File Storage Security Rules
├── firebase.json               # Firebase Config
└── .firebaserc                 # Firebase Project Alias
```

---

## 🔍 Common Issues

### "Permission denied" when accessing cart
**Fix:** Deploy Firestore rules
```bash
firebase deploy --only firestore:rules
```

### Admin can't login
**Fix:** Verify admin account exists in Firebase Console → Authentication

### Payment button doesn't work
**Fix:** Update Flutterwave API key in `cart.html` line 376

### Cart not saving
**Fix:** Ensure user is logged in (cart requires authentication)

---

## 📞 Need Help?

**Email:** sales2.zagatechnologiesltd@gmail.com
**Phone:** +256 700706809

**Documentation:**
- Full guide: `IMPLEMENTATION-SUMMARY.md`
- Deployment: `DEPLOYMENT-GUIDE.md`

---

## 🎉 Congratulations!

Your e-commerce platform is now:
- ✅ Secure
- ✅ User-friendly
- ✅ Payment-ready
- ✅ Production-ready (after API key setup)

**Happy Selling! 🛍️**

