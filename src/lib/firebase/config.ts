// firebase/clientApp.js (Ganti nama file jika perlu)
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// 1. Pastikan Anda hanya membaca variabel ENV yang diperlukan,
//    agar kode lebih rapi.
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    // measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID, // Opsional, jika tidak dipakai
};

// 2. Gunakan pengecekan yang sudah ada, ini sudah benar.
//    Ini memastikan aplikasi diinisialisasi sekali saja.
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// 3. Ambil layanan Firebase dari aplikasi yang sudah diinisialisasi
const auth = getAuth(app);
const db = getDatabase(app);

// 4. Ekspor layanan
export { app, auth, db };
