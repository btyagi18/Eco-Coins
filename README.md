# 🌱 Clean2Earn — Rewarding Real-World Environmental Impact

Clean2Earn is an AI-powered sustainability platform that rewards users with digital coins for performing real-world environmental activities like cleaning surroundings.

Users submit **before & after images**, and our **AI verification system** ensures authenticity before rewarding them.

---

## ✨ Features

* 📸 Upload Before/After Cleanup Images
* 🤖 AI-based Cleaning Verification
* 🪙 Earn Eco-Coins for verified actions
* 📊 User Dashboard (coins, impact, activities)
* 🔐 JWT Authentication System
* 📍 Location tagging using geolocation
* 🚫 Fraud Detection using AI
* 📈 Impact Score Tracking

---

## 🧠 Problem Statement

People want to contribute to the environment but lack:

* Motivation
* Reward systems
* Trust-based validation

Fake claims also reduce the credibility of such systems.

---

## 💡 Solution

Eco-Coins solves this by:

* Providing **incentives (coins)** for eco-actions
* Using **AI to verify authenticity**
* Building a **trust-based ecosystem**

---

## ⚙️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB
* JWT Authentication

### AI Integration

* Groq API (LLaMA / Vision Model)
* Image-based verification system

---

## 📁 Project Structure

```
Eco-Coins/
│
├── frontend/              # React frontend
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middleware/
│   │   ├── services/      # AI logic (Groq)
│   │   └── config/
│   │
│   └── server.js
│
└── README.md
```

---

## 🔐 Authentication Flow

1. User registers / logs in
2. JWT token is generated
3. Token is used to access protected routes
4. Middleware verifies user identity

---

## 🤖 AI Verification Workflow

### Step 1: User Submission

User uploads:

* Before Image
* After Image
* Location metadata

---

### Step 2: Backend Processing

Request goes to:

```
POST /api/verify-cleaning
```

---

### Step 3: AI Verification (Core Logic)

* Images are sent to **Groq AI service**
* AI analyzes:

  * Difference between images
  * Whether actual cleaning happened
  * Signs of manipulation

---

### Step 4: AI Response Format

AI returns:

```json
{
  "verdict": "CLEANED | FRAUD_DETECTED",
  "confidence": "HIGH | MEDIUM | LOW",
  "details": "Explanation"
}
```

---

### Step 5: Decision Engine

* If verdict = CLEANED:

  * ✅ User earns 25 coins
  * 📈 Impact score increases
  * 🧹 Cleanup count increments

* Else:

  * ❌ No reward
  * ⚠️ Marked as fraud

---

### Step 6: Database Update

* Verification stored in `Verification` collection
* User stats updated:

  * ecoCoins
  * cleanups
  * impactScore
  * activity history

---

### Step 7: Daily Limit Protection

* Max **2 cleanups per day**
* Prevents abuse/spam

---

## 📍 Location Handling

* Uses **OpenStreetMap Reverse Geocoding**
* Converts coordinates → readable city name
* Stored with each activity

---


## 🧪 Future Enhancements

* 🎁 Reward redemption (NGO tie-ups)
* 📱 Mobile app
* 🌍 Community challenges
* 🔗 Blockchain-based proof

---

## 🌟 Why This Project Stands Out

* Real-world + AI integration
* Fraud-resistant reward system
* Scalable sustainability model
* Social impact + tech innovation

---

## 👨‍💻 Author

**Bhumika Tyagi**

---

## ⭐ Support

If you like this project:

* Star ⭐ the repo
* Share 🚀
* Contribute 🤝

---

## Sneak-Peak


<img width="1900" height="969" alt="Screenshot 2026-04-26 112021" src="https://github.com/user-attachments/assets/7c03ff26-286a-41d8-883e-30cca5c9b1f8" />




<img width="1887" height="934" alt="Screenshot 2026-04-26 112110" src="https://github.com/user-attachments/assets/5992f6ff-6ba7-4f6b-a341-058be17763c6" />




<img width="1891" height="968" alt="Screenshot 2026-04-26 112135" src="https://github.com/user-attachments/assets/f4417c5a-8cc0-42ee-a802-07eb9cc84cce" />




<img width="1897" height="970" alt="Screenshot 2026-04-26 112156" src="https://github.com/user-attachments/assets/4d82314a-4a29-4510-aefd-2fe3c104c9e7" />



