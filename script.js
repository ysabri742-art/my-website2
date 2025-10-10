function clearPreviousState() {
  // مسح جميع بيانات الأقسام المحفوظة والنتائج النهائية لضمان تجربة جديدة
  localStorage.removeItem("mode");
  localStorage.removeItem("section");
  localStorage.removeItem("totalSections");
  localStorage.removeItem("quizResults");
  // مسح حالات الأسئلة المحفوظة لكل قسم (من 1 إلى 5)
  for (let i = 1; i <= 5; i++) {
    localStorage.removeItem(`section_questions_${i}`);
  }
}

function startQuickMock() {
  clearPreviousState(); // مسح البيانات القديمة
  localStorage.setItem("mode", "quick");
  localStorage.setItem("section", "1"); // يبدأ دائماً بالقسم الأول
  localStorage.setItem("totalSections", "1"); // السريع قسم واحد فقط
  window.location.href = "quiz.html";
}

function startRealMock() {
  clearPreviousState(); // مسح البيانات القديمة
  localStorage.setItem("mode", "real");
  localStorage.setItem("section", "1");
  localStorage.setItem("totalSections", "5"); // الواقعي 5 أقسام
  window.location.href = "quiz.html";
}
