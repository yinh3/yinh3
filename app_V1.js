// 選取 HTML 元素
const chatWindow = document.getElementById("chat-window");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const nameElement = document.getElementById("name");
const bioList = document.getElementById("bio-list");

// 1. 自動讀取並顯示 settings.json 的內容
async function loadSettings() {
    try {
        const response = await fetch('settings.json');
        const data = await response.json();

        // 設定姓名
        nameElement.textContent = data.name;

        // 擷取並顯示完整資訊
        const infoHtml = `
            <ul style="list-style: none; padding: 0; margin: 5px 0; font-size: 0.85em; color: #333;">
                <li>📍 <strong>地點：</strong> ${data.location}</li>
                <li>🎓 <strong>階段：</strong> ${data.education_stage}</li>
                <li>🧠 <strong>學習：</strong> ${data.learning_style.join('、')}</li>
                <li>🎨 <strong>藝術興趣：</strong> ${data.interests.art.slice(0, 3).join('、')}...</li>
                <li>💻 <strong>科技領域：</strong> ${data.interests.technology.slice(0, 2).join('、')}</li>
            </ul>
        `;
        bioList.innerHTML = infoHtml;

    } catch (error) {
        console.error("無法讀取 settings.json:", error);
        nameElement.textContent = "謝乙安";
        bioList.innerHTML = "<p>資料載入失敗，請確認檔案路徑。</p>";
    }
}

// 執行載入
loadSettings();

// 2. 聊天室訊息處理功能
function addMessage(text, className) {
    const msg = document.createElement("div");
    msg.className = `message ${className}`;
    msg.textContent = text;
    chatWindow.appendChild(msg);
    
    // 自動捲動到最底部
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// 傳送按鈕點擊事件
sendBtn.addEventListener("click", () => {
    const text = userInput.value.trim();
    if (!text) return;

    addMessage(text, "user");
    userInput.value = "";

    // 模擬 AI 回應
    setTimeout(() => {
        addMessage("我收到你的訊息了 👋，這與妳在 settings.json 提到的興趣很契合！", "bot");
    }, 800);
});

// 支援 Enter 鍵傳送
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        sendBtn.click();
    }
});