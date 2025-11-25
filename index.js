import { onBalanceChange, addBalance } from "./firebase.js";

const balanceEl = document.getElementById("balance");
const watchAdBtn = document.getElementById("watchAd");
const withdrawBtn = document.getElementById("withdraw");

// Balansni yangilash
onBalanceChange(bal => {
    balanceEl.innerText = `Balans: ${bal.toFixed(2)} ₽`;
});

// AdsGram reklama
async function showAd() {
    return new Promise(resolve => {
        if(!window.Adsgram){ alert("AdsGram SDK yuklanmagan"); resolve(false); return; }

        const AdController = window.Adsgram.init({ blockId: "int-18178" });

        AdController.show()
            .then(result => {
                console.log("Ad result:", result);
                if(result.done && !result.error){
                    resolve(true); // foydalanuvchi reklama ko‘rdi va tugatdi
                } else {
                    resolve(false); // reklama yopildi yoki xato
                }
            })
            .catch(err => {
                console.log("Ad error:", err);
                resolve(false);
            });
    });
}

// Reklama tugagach balansga +0.02 ₽
watchAdBtn.addEventListener("click", async () => {
    let ok = await showAd();
    if(ok){
        addBalance(0.02);
    }
});

// Withdraw tugmasi
withdrawBtn.addEventListener("click", () => {
    window.location.href = "withdraw.html";
});