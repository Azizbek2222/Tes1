// index.js
import { db, addBalance, device } from './firebase.js';

let adCount = 0;
let isFlying = false;
let flyTime = 15 * 60;
let flyInterval = null;

// Balansni ko'rsatish
function loadBalance() {
    const balanceEl = document.getElementById("balance");
    db.ref("users/" + device + "/balance").on("value", snap => {
        let bal = snap.val() || 0;
        balanceEl.innerText = "Balans: " + bal.toFixed(3) + " $";
    });
}
loadBalance();

// AdsGram reklama
async function showAd() {
    return new Promise((resolve) => {
        const AdController = window.Adsgram.init({ blockId: "int-18178" });
        AdController.show()
            .then(() => resolve(true))
            .catch(() => resolve(false));
    });
}

async function handleLaunchButton() {
    if (isFlying) return;
    
    let ok = await showAd();
    if (!ok) return;
    
    adCount++;
    document.getElementById("adCount").innerText = `${adCount}/2`;
    
    if (adCount >= 2) {
        startFly();
    }
}

function startFly() {
    if (isFlying) return;
    
    isFlying = true;
    adCount = 0;
    document.getElementById("adCount").innerText = `${adCount}/2`;
    
    let time = flyTime;
    const timerEl = document.getElementById("timer");
    const rocketEl = document.getElementById("rocket");
    
    timerEl.innerText = "Raketa uchdi!";
    
    // Raketa animatsiyasi
    rocketEl.style.transition = "transform 0.5s";
    rocketEl.style.transform = "translateY(-10px)";
    let direction = 1;
    
    flyInterval = setInterval(() => {
        // Raketa qimirlamasi
        rocketEl.style.transform = `translateY(${direction * -10}px)`;
        direction *= -1;
        
        // Vaqt sanash
        let m = Math.floor(time / 60);
        let s = time % 60;
        timerEl.innerText = `${m}:${s < 10 ? "0"+s : s}`;
        
        // Balansga qo'shish progressiv
        let addAmount = 0.005 / flyTime;
        addBalance(addAmount);
        
        time--;
        if (time < 0) {
            clearInterval(flyInterval);
            isFlying = false;
            timerEl.innerText = "Uchish tugadi";
            rocketEl.style.transform = "translateY(0)";
        }
    }, 1000);
}

document.getElementById("launchButton").addEventListener("click", handleLaunchButton);
