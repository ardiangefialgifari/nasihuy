// firebase/config.ts

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getDatabase, Database } from 'firebase/database';

// 1. Tentukan interface untuk memastikan konfigurasi yang valid
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    // measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID, 
};

// 2. Terapkan Logika Pencegahan Inisialisasi pada Server Build
// Jika API Key tidak ada (terjadi saat build server), jangan inisialisasi.
let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Database | null = null;

// Pastikan konfigurasi dasar (API Key dan Project ID) tersedia
if (firebaseConfig.apiKey && firebaseConfig.projectId) {
    
    // Inisialisasi atau ambil aplikasi yang sudah ada
    app = !getApps().length 
        ? initializeApp(firebaseConfig) 
        : getApp();

    // Ambil layanan dari aplikasi yang sudah diinisialisasi
    auth = getAuth(app);
    db = getDatabase(app);
} else {
    // 💡 Pesan error ini akan muncul di log build jika ENV tidak terpasang
    console.error("FIREBASE ERROR: Missing NEXT_PUBLIC_FIREBASE environment variables. Check .env.local and Netlify/GitHub Secrets.");
}

// 3. Ekspor layanan (dapat bernilai null jika inisialisasi gagal)
export { app, auth, db };
