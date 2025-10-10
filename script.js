function startQuickMock() {
  localStorage.setItem("mode", "quick");
  localStorage.removeItem("section");
  localStorage.removeItem("returnTo");
  localStorage.removeItem("questions");
  localStorage.removeItem("timeLeft");
  // مسح بيانات المراجعة القديمة
  localStorage.removeItem("reviewQuestions"); 
  window.location.href = "quiz.html";
}

function startRealMock() {
  localStorage.setItem("mode", "real");
  localStorage.setItem("section", "1");
  localStorage.removeItem("returnTo");
  localStorage.removeItem("questions");
  localStorage.removeItem("timeLeft");
  // مسح بيانات المراجعة القديمة
  localStorage.removeItem("reviewQuestions"); 
  window.location.href = "quiz.html";
}
