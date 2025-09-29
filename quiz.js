let mode = localStorage.getItem("mode");
let section = parseInt(localStorage.getItem("section") || "1");
let totalSections = 5;
let currentIndex = 0;
let timeLeft = 25 * 60;

// استرجاع الأسئلة من التخزين المؤقت إذا كانت موجودة
let savedQuestions = localStorage.getItem("questions");
if (savedQuestions) {
  questions = JSON.parse(savedQuestions);
  localStorage.removeItem("questions");
} else {
  questions = [
    {
      text: "ما هو أكبر كوكب في المجموعة الشمسية؟",
      options: ["المريخ", "الأرض", "المشتري", "زحل"],
      answer: null,
      marked: false,
      correct: 2,
      explanation: "المشتري هو أكبر كوكب في المجموعة الشمسية من حيث الحجم والكتلة."
    },
    {
      text: "من هو مؤسس شركة مايكروسوفت؟",
      options: ["إيلون ماسك", "مارك زوكربيرغ", "بيل غيتس", "ستيف جوبز"],
      answer: null,
      marked: false,
      correct: 2,
      explanation: "بيل غيتس أسس شركة مايكروسوفت مع بول ألين عام 1975."
    },
    {
      text: "كم عدد الأضلاع في الشكل السداسي؟",
      options: ["4", "5", "6", "8"],
      answer: null,
      marked: false,
      correct: 2,
      explanation: "الشكل السداسي يحتوي على 6 أضلاع و6 زوايا."
    },
    {
      text: "ما هو العنصر الكيميائي الذي رمزه O؟",
      options: ["أكسجين", "نيتروجين", "حديد", "ذهب"],
      answer: null,
      marked: false,
      correct: 0,
      explanation: "الرمز O في الجدول الدوري يمثل عنصر الأكسجين."
    },
    {
      text: "ما هي عاصمة اليابان؟",
      options: ["سيول", "بانكوك", "طوكيو", "بكين"],
      answer: null,
      marked: false,
      correct: 2,
      explanation: "طوكيو هي العاصمة الرسمية لليابان."
    }
  ];
}

function updateQuestion() {
  const q = questions[currentIndex];
  document.getElementById("section-title").textContent = `السؤال ${currentIndex + 1}`;
  document.getElementById("question-text").textContent = q.text;

  let answersHTML = "";
  q.options.forEach((opt, i) => {
    answersHTML += `<label><input type="radio" name="answer" value="${i}" ${q.answer === i ? "checked" : ""}> ${opt}</label>`;
  });
  document.getElementById("answers").innerHTML = answersHTML;

  // زر إنهاء الامتحان في آخر سؤال فقط
  const endExamBtn = document.getElementById("end-exam");
  if (currentIndex === questions.length - 1) {
    endExamBtn.style.display = "block";
  } else {
    endExamBtn.style.display = "none";
  }
}

function saveAnswer() {
  const selected = document.querySelector("input[name='answer']:checked");
  questions[currentIndex].answer = selected ? parseInt(selected.value) : null;
}

function nextQuestion() {
  saveAnswer();
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    updateQuestion();
  }
}

function prevQuestion() {
  saveAnswer();
  if (currentIndex > 0) {
    currentIndex--;
    updateQuestion();
  }
}

function markQuestion() {
  questions[currentIndex].marked = true;
  alert("⭐ تم وضع علامة مرجعية");
}

function reviewSection() {
  saveAnswer();
  let html = `<h2>مراجعة القسم ${section}</h2><ul>`;
  questions.forEach((q, i) => {
    let status = q.answer !== null ? "✅ مجاب" : "❌ غير مجاب";
    if (q.marked) status += " ⭐ مرجعي";
    html += `<li>سؤال ${i + 1}: ${status} <button onclick="goTo(${i})">🔁</button></li>`;
  });
  html += `</ul>
    <button onclick="goTo(0)">🔙 العودة لأول سؤال</button>
    <button onclick="chooseQuestion()">🔍 العودة لسؤال محدد</button>
    <button onclick="endSection()">✅ إنهاء القسم</button>`;
  document.body.innerHTML = html;
}

function goTo(index) {
  saveAnswer();
  localStorage.setItem("returnTo", index);
  localStorage.setItem("questions", JSON.stringify(questions));
  location.reload();
}

function chooseQuestion() {
  let num = prompt("أدخل رقم السؤال:");
  if (num && !isNaN(num) && num >= 1 && num <= questions.length) {
    goTo(parseInt(num) - 1);
  }
}

function endSection() {
  saveAnswer();
  if (mode === "real" && section < totalSections) {
    localStorage.setItem("section", section + 1);
    location.reload();
  } else {
    finishExam();
  }
}

function finishExam() {
  saveAnswer();
  window.location.href = "thankyou.html";
}

// عداد الوقت
setInterval(() => {
  if (timeLeft > 0) {
    timeLeft--;
    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;
    document.getElementById("timer").textContent = `الوقت المتبقي: ${min}:${sec < 10 ? "0" + sec : sec}`;
  } else {
    reviewSection();
  }
}, 1000);

// تحميل أول سؤال أو العودة لسؤال محدد
const returnTo = localStorage.getItem("returnTo");
if (returnTo !== null) {
  currentIndex = parseInt(returnTo);
  localStorage.removeItem("returnTo");
}
updateQuestion();
