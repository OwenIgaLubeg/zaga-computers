# ZAGA Technologies E-Commerce Platform

![Status](https://img.shields.io/badge/status-production%20ready-brightgreen)
![Firebase](https://img.shields.io/badge/firebase-v11.0.1-orange)
![Payment](https://img.shields.io/badge/payment-Flutterwave-blue)

## ⚠️ **CRITICAL: YOU MUST USE A WEB SERVER!**

🚫 **DO NOT** double-click HTML files directly (file:// protocol won't work)  
✅ **USE** the provided server startup file or a local web server

### **START HERE: Double-click `START-SERVER.bat`** 🚀

This will:
1. Start a local web server
2. Open your browser to `http://localhost:8000`
3. Make everything work properly!

**Why?** Firebase requires HTTP/HTTPS protocol. Opening files directly causes:
- ❌ Login failures
- ❌ Products not saving
- ❌ Cart not working
- ❌ Payment failures

---

## 🚀 Quick Start (3 Minutes!)

### **STEP 0: Start Web Server** 🔥 (REQUIRED FIRST!)

**Double-click:** `START-SERVER.bat`  
**Wait for:** Browser to open to `http://localhost:8000`  
**Now you can proceed with the steps below** ✅

### **STEP 1: Create Admin Account** ⚡

1. **Open `admin-setup.html` in your browser**
2. Click **"Create Admin Account"** button
3. Wait for success message
4. Done! Now you can login as admin

### **STEP 2: Login as Admin**

1. Open `index.html` in your browser
2. Click **"Sign-In/Up"**
3. Use **Admin Login** (left side):
   - **Email:** `sales2.zagatechnologiesltd@gmail.com`
   - **Password:** `@karenlivs2`

### **STEP 3: Add Products**

1. You'll be in the Dashboard
2. Fill in product details
3. Upload product image
4. Click "Add Product"
5. Your products will now appear in the shop!

---

## ✅ What's Working

### For Customers:
- ✅ User registration and login
- ✅ Browse products
- ✅ Add to cart (user-specific)
- ✅ Checkout with payment (Mobile Money & Card)
- ✅ Order tracking

### For Admin:
- ✅ Secure login (hardcoded credentials)
- ✅ Add/Edit/Delete products
- ✅ Upload product images
- ✅ View orders
- ✅ Protected dashboard

---

## 🔐 Admin Credentials

**Login Page:** `login.html` → Admin Login (left side)

**Email:** `sales2.zagatechnologiesltd@gmail.com`  
**Password:** `@karenlivs2`

---

## 💳 Payment Integration

**Provider:** Flutterwave

**Supported Methods:**
- 💰 Mobile Money (MTN, Airtel Uganda)
- 💳 Visa/Mastercard
- 🏦 Bank Transfer

**Current Status:** TEST MODE (sandbox)

**Test Card for Testing:**
- Card: `5531886652142950`
- CVV: `564`
- Expiry: `09/32`
- PIN: `3310`
- OTP: `12345`

---

## 📂 Project Structure

```
ShopMe-Ecommerce/
├── admin-setup.html           ⭐ CREATE ADMIN ACCOUNT HERE FIRST!
├── index.html                 # Homepage
├── login.html                 # Admin & User Login
├── admin-dashboard.html       # Product Management
├── shop.html                  # Product Listing
├── cart.html                  # Shopping Cart & Checkout
├── js/
│   └── firebase-config.js     # Firebase Configuration
├── firestore.rules            # Database Security
├── storage.rules              # File Security
└── Documentation/
    ├── QUICK-START.md         # 5-minute setup guide
    ├── DEPLOYMENT-GUIDE.md    # Full deployment steps
    └── IMPLEMENTATION-SUMMARY.md  # Technical details
```

---

## 🐛 Troubleshooting

### ❌ Admin Login Error: "invalid-credential"

**Problem:** Admin account doesn't exist yet

**Solution:** 
1. Open `admin-setup.html`
2. Click "Create Admin Account"
3. Try logging in again

### ❌ No Products Showing in Shop

**Problem:** No products added yet

**Solution:**
1. Login as admin
2. Go to Dashboard
3. Add products with images

### ❌ Can't Add to Cart

**Problem:** User not logged in

**Solution:**
1. Click "Sign-In/Up"
2. Register as a customer (right side)
3. Login and try again

### ❌ Payment Not Working

**Problem:** Using test key (for development only)

**Solution:**
- For production: Update Flutterwave key in `cart.html` line 376
- Get key from: https://dashboard.flutterwave.com/settings/apis

---

## 📚 Documentation

### For Quick Setup:
📄 **[QUICK-START.md](QUICK-START.md)** - Get running in 5 minutes

### For Deployment:
📄 **[DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md)** - Complete deployment instructions

### For Technical Details:
📄 **[IMPLEMENTATION-SUMMARY.md](IMPLEMENTATION-SUMMARY.md)** - What was built and how

### Quick Overview:
📄 **[WHATS-CHANGED.txt](WHATS-CHANGED.txt)** - Summary of all changes

---

## 🔒 Security Features

✅ Firebase Authentication  
✅ Firestore Security Rules  
✅ Admin-only product management  
✅ User-specific carts  
✅ Protected admin dashboard  
✅ Secure payment processing

---

## 🌐 Deployment

### Option 1: Local Testing
Just open `index.html` in your browser!

### Option 2: Firebase Hosting

```bash
cd "C:\Users\owen\Documents\Github\ShopMe-Ecommerce"
firebase login
firebase deploy
```

Your site will be live at: `https://zaga-tech-store.web.app`

---

## 📞 Support

**Business:**
- Email: sales2.zagatechnologiesltd@gmail.com
- Phone: +256 700706809
- Location: Kabaka Kintu House, Kampala Road, Uganda

**Technical:**
- See documentation files in project folder
- All guides included for self-service setup

---

## ⚠️ Before Going Live

- [ ] Create admin account (via `admin-setup.html`)
- [ ] Add products in dashboard
- [ ] Test customer registration and login
- [ ] Test shopping cart and checkout
- [ ] Deploy Firebase security rules
- [ ] Update Flutterwave to live key (for real payments)
- [ ] Test on multiple devices

---

## 🎉 You're Ready!

1. ✅ Admin account: Use `admin-setup.html`
2. ✅ Login: Use provided credentials
3. ✅ Add products: Via dashboard
4. ✅ Test: Register as customer and place order

**Everything is configured and ready to use!**

---

## 📝 License

Copyright © 2025 ZAGA Technologies. All Rights Reserved.

---

## 🚀 Quick Links

- 🏠 [Home](index.html)
- 🔐 [Admin Setup](admin-setup.html) ⭐ **START HERE**
- 🔑 [Login](login.html)
- 🛒 [Shop](shop.html)
- 📊 [Dashboard](admin-dashboard.html)
- 📧 [Contact](contact.html)

---

**Made with ❤️ for ZAGA Technologies**

