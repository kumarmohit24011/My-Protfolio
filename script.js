// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAvL-UgyneS2_5zE-f97V-w0dGUAOlwePY",
    authDomain: "my-protfolio-2411.firebaseapp.com",
    projectId: "my-protfolio-2411",
    storageBucket: "my-protfolio-2411.appspot.com",
    messagingSenderId: "437370319768",
    appId: "1:437370319768:web:ff851ec637f00dfcd6b1ed",
    measurementId: "G-EKEC4LZL0G"
};

// Initialize Firebase
let app, db;

try {
    console.log("🚀 Initializing Firebase...");
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log("✅ Firebase initialized successfully!");
} catch (error) {
    console.error("🔥 Firebase initialization error:", error);
}

// Test Firestore Write
const testFirestore = async () => {
    try {
        const docRef = await addDoc(collection(db, "contactMessages"), {
            name: "Test User",
            email: "test@example.com",
            subject: "Test",
            message: "Hello Firestore!",
            timestamp: new Date().toISOString()
        });
        console.log(`✅ Test data saved! Document ID: ${docRef.id}`);
    } catch (error) {
        console.error("❌ Firestore Write Error:", error);
    }
};

// Uncomment to test Firestore write functionality
// testFirestore();

// 📩 Contact Form Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    console.log("📩 Contact form detected. Adding event listener...");

    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        console.log("📌 Form submitted. Processing...");

        // 🔍 Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        const timestamp = new Date().toISOString();

        console.log(`📌 Form Data - Name: ${name}, Email: ${email}, Subject: ${subject}, Message: ${message}`);

        // 🔍 Validation
        if (!name || !email || !message) {
            console.warn("⚠️ Validation failed: Missing required fields.");
            showMessage('Please fill in all required fields.', 'error');
            return;
        }

        if (!validateEmail(email)) {
            console.warn("⚠️ Validation failed: Invalid email format.");
            showMessage('Please enter a valid email address.', 'error');
            return;
        }

        // ⏳ Show loading state
        const submitBtn = document.getElementById('submit-button');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            console.log("⏳ Attempting to save form data...");
        
            await addDoc(collection(db, "contactMessages"), {
                name: name,
                email: email,
                subject: subject || 'No subject',
                message: message,
                timestamp: timestamp
            });
        
            console.log("✅ Data successfully added to Firestore!");
            showMessage('Message sent successfully! 🎉', 'success');
            contactForm.reset();
        } catch (error) {
            console.error("❌ Firestore Error:", error);
            showMessage(`Firestore Error: ${error.message}`, 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
    });
} else {
    console.warn("⚠️ Contact form not found in DOM.");
}

// 🔥 Function to show messages
function showMessage(text, type) {
    const successMessage = document.getElementById('successMessage');
    if (!successMessage) {
        console.warn("⚠️ Success message element not found.");
        return;
    }
    
    successMessage.textContent = text;
    successMessage.style.color = type === 'success' ? 'green' : 'red';
    successMessage.style.display = 'block';

    setTimeout(() => {
        successMessage.textContent = '';
        successMessage.style.display = 'none';
    }, 5000);
}

// 📧 Helper function to validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// 🌍 Optional: Get user's IP address
async function getIPAddress() {
    try {
        console.log("🔍 Fetching IP address...");
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        console.log("🌍 User IP:", data.ip);
        return data.ip || 'unknown';
    } catch (error) {
        console.warn("⚠️ Trying backup IP API...");
        try {
            const response = await fetch('https://ifconfig.me/all.json');
            const data = await response.json();
            console.log("🌍 Backup IP fetched:", data.ip_addr);
            return data.ip_addr || 'unknown';
        } catch (err) {
            console.error("❌ Error getting IP:", err);
            return 'unknown';
        }
    }
}



let i =1;
for(i=1;i>=5;i++){
    i*=i;
    console.log("i-",i)
}