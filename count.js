let count = 0;
let time = 0;
let timer = null;

let records = []; // memo: 直近3回分の記録

const countDisplay = document.getElementById("count");
const plusBtn = document.getElementById("plus");
const resetBtn = document.getElementById("reset");
const recordsList = document.getElementById("records");

// タイマー開始（1回目のクリックで）
function startTimer() {
  if (count === 0 && time === 0) {
    timer = setInterval(() => {
      time++;
    }, 1000);
  }
}

// 記録を画面に反映
function updateRecords() {
  recordsList.innerHTML = "";

  records.forEach(r => {
    const li = document.createElement("li");
    li.textContent = r;
    recordsList.appendChild(li);
  });
}

plusBtn.addEventListener("click", () => {
  startTimer();
  count++;
  countDisplay.textContent = count;
});

resetBtn.addEventListener("click", () => {
  // タイマーを止める
  clearInterval(timer);
  timer = null;

  // 記録を保存（0回は保存しない。infinity見たいから0秒はアリ！）
  if (count > 0) {
    const average = (count / time).toFixed(2);
    const record = `${time} 秒で ${count} 回（平均 ${average} 回/秒）`;

    // 直近3回の記録に追加
    records.unshift(record);
    if (records.length > 3) {
      records.pop();
    }

    updateRecords();
  }

  // リセット処理
  count = 0;
  time = 0;
  countDisplay.textContent = 0;
});