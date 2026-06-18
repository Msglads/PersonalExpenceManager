# Personal Expense Manager (Beginner CRUD App)

A simple React Native + Expo app for students to track daily expenses, using Firebase Firestore as the database. Supports Create, Read, Update, and Delete for expense records. No login, charts, or notifications — just core CRUD.

## Folder Structure

```
PersonalExpenseManager/
├── src/
│   ├── components/
│   │   └── ExpenseCard.js        # Single expense row UI (Edit/Delete buttons).
│   ├── screens/
│   │   ├── HomeScreen.js         # Lists all expenses (READ)
│   │   ├── AddExpenseScreen.js   # Form to add a new expense (CREATE)
│   │   └── EditExpenseScreen.js  # Form to edit/delete an expense (UPDATE/DELETE)
│   ├── firebase/
│   │   └── firebaseConfig.js     # Firebase init — put your project keys here
│   └── services/
│       └── expenseService.js     # All Firestore CRUD functions
├── App.js                        # Navigation setup
└── package.json
```..

## 1. Prerequisites

- Node.js installed (LTS version)
- Expo Go app on your phone (from App Store / Play Store), or an Android/iOS simulator
- A free Firebase account: https://console.firebase.google.com/

## 2. Firebase Setup

1. Go to the Firebase console and create a new project.
2. In the project, click the **Web** icon (`</>`) to register a web app. You don't need hosting.
3. Firebase will show you a config object — copy those values.
4. Open `src/firebase/firebaseConfig.js` in this project and paste your values in:

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

5. In the Firebase console sidebar, go to **Build > Firestore Database** > **Create database**.
6. Choose **Start in test mode** (fine for a student project — allows open read/write while you develop). You can tighten security rules later if needed.
7. You don't need to manually create the `expenses` collection — it's created automatically the first time you add an expense from the app.

## 3. Install Dependencies

From inside the `PersonalExpenseManager` folder:

```bash
npm install
```

This installs Expo, React Navigation, and the Firebase SDK as listed in `package.json`.

## 4. Run the App

```bash
npx expo start
```

This opens the Expo developer tools in your terminal/browser. From there:
- Scan the QR code with the **Expo Go** app on your phone, or
- Press `a` to open in an Android emulator, or `i` for an iOS simulator.

## 5. How the CRUD Maps to Code

| Operation | Screen | Function used | File |
|---|---|---|---|
| Create | AddExpenseScreen | `addExpense()` | `src/services/expenseService.js` |
| Read | HomeScreen | `getExpenses()` | `src/services/expenseService.js` |
| Update | EditExpenseScreen | `updateExpense()` | `src/services/expenseService.js` |
| Delete | HomeScreen & EditExpenseScreen | `deleteExpense()` | `src/services/expenseService.js` |

All four functions talk to a single Firestore collection called `expenses`. Each document has the fields: `title`, `amount`, `category`, `date`.

## 6. App Flow

```
HomeScreen (list + totals)
   │
   ├──> "+ Add Expense" ──> AddExpenseScreen ──> Save ──> back to HomeScreen
   │
   └──> Tap "Edit" on a card ──> EditExpenseScreen ──> Update or Delete ──> back to HomeScreen
```

Deleting can be done two ways: directly from the card on HomeScreen (with a confirmation alert), or from inside EditExpenseScreen via the Delete button.

## 7. Categories

The app ships with five fixed categories (matching the project spec): `Food`, `Transportation`, `School`, `Snacks`, `Others`. They appear as selectable chips on the Add/Edit forms and as colored badges on each expense card.

## 8. Notes for Students

- This is intentionally simple: no authentication, so every user shares the same `expenses` collection. That's fine for a class demo, but if you extend this into a multi-user app later, you'd add Firebase Auth and filter expenses by user ID.
- Firestore's "test mode" security rules expire after a set period (usually 30 days) — if your reads/writes suddenly stop working, check the **Firestore > Rules** tab in the console and extend or adjust the rules.
- Amounts are stored as numbers in Firestore, so sorting/summing works correctly.
