// Firebase 연결 (Firestore Lite: 실시간 기능은 없지만 용량이 약 1/4)
// 이 파일은 동적 import로만 불러서 첫 화면 로딩에 포함되지 않게 한다.
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

const env = import.meta.env;

const firebaseConfig = {
    apiKey: env.VITE_FIREBASE_API_KEY as string | undefined,
    authDomain: env.VITE_FIREBASE_AUTH_DOMAIN as string | undefined,
    projectId: env.VITE_FIREBASE_PROJECT_ID as string | undefined,
    storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET as string | undefined,
    messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID as string | undefined,
    appId: env.VITE_FIREBASE_APP_ID as string | undefined,
};

export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

export const db = isFirebaseConfigured ? getFirestore(initializeApp(firebaseConfig)) : null;
