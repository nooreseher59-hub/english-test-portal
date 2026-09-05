// --- APPLICATION STATE ---
let clerkInstance = null;
let currentTier = null;
let currentQuestions = [];
let currentQuestionIndex = 0;
let userAnswers = [];

// --- VIEW ROUTER ---
function switchView(viewId) {
  ['view-login', 'view-dashboard', 'view-quiz', 'view-results'].forEach(id => {
    document.getElementById(id).classList.add('hidden');
  });
  document.getElementById(viewId).classList.remove('hidden');
}

// --- CLERK AUTHENTICATION INITIALIZATION ---
window.addEventListener('load', async () => {
  if (window.Clerk) {
    clerkInstance = window.Clerk;
    
    // Wait for Clerk UI components to load completely
    await clerkInstance.load();

    if (clerkInstance.user) {
      mountAuthUI();
      showDashboard();
    } else {
      switchView('view-login');
      const loginBtn = document.getElementById('btn-login-trigger');
      if (loginBtn) {
        loginBtn.onclick = () => clerkInstance.openSignIn();
      }
    }
  } else {
    console.error("Clerk SDK failed to load. Ensure your script tag in index.html is correct.");
  }
});

function mountAuthUI() {
  const authNode = document.getElementById('auth-node');
  authNode.innerHTML = '';
  clerkInstance.mountUserButton(authNode);
}

// --- DASHBOARD & PROGRESS LOGIC ---
function getCompletedTiers() {
  if (!clerkInstance.user) return [];
  return clerkInstance.user.unsafeMetadata.completed || [];
}

function showDashboard() {
  switchView('view-dashboard');
  const completed = getCompletedTiers();

  const hardUnlocked = completed.includes('normal');
  const advancedUnlocked = completed.includes('hard');

  updateCardStatus('hard', hardUnlocked);
  updateCardStatus('advanced', advancedUnlocked);
}

function updateCardStatus(tier, isUnlocked) {
  const card = document.getElementById(`card-${tier}`);
  const badge = document.getElementById(`badge-${tier}`);
  
  if (isUnlocked) {
    card.className = "test-card unlocked";
    badge.className = "badge badge-unlocked";
    badge.innerText = "Unlocked";
  } else {
    card.className = "test-card locked";
    badge.className = "badge badge-locked";
    badge.innerText = "Locked";
  }
}

// --- FETCH QUESTIONS FROM JSON FILES ---
async function startTest(tier) {
  const completed = getCompletedTiers();

  if (tier === 'hard' && !completed.includes('normal')) {
    alert("Please complete and submit the Normal test first to unlock the Hard test.");
    return;
  }
  if (tier === 'advanced' && !completed.includes('hard')) {
    alert("Please complete and submit the Hard test first to unlock the Advanced test.");
    return;
  }

  try {
    // Dynamically fetch the requested JSON file
    const response = await fetch(`${tier}.json`);
    if (!response.ok) throw new Error(`Could not load ${tier}.json`);
    
    currentQuestions = await response.json();
    currentTier = tier;
    currentQuestionIndex = 0;
    userAnswers = new Array(currentQuestions.length).fill(null);

    document.getElementById('quiz-tier-title').innerText = `${tier} Test`;
    switchView('view-quiz');
    renderQuestion();
  } catch (error) {
    console.error("Error loading questions:", error);
    alert("Failed to load quiz questions. Make sure you are running a local web server (e.g. VS Code Live Server).");
  }
}

// --- QUIZ EXECUTION LOGIC ---
function renderQuestion() {
  const qData = currentQuestions[currentQuestionIndex];
  const total = currentQuestions.length;

  document.getElementById('quiz-progress').innerText = `Question ${currentQuestionIndex + 1} / ${total}`;
  document.getElementById('q-text').innerText = `${qData.id}. ${qData.question}`;

  const optionsContainer = document.getElementById('q-options');
  optionsContainer.innerHTML = '';

  qData.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn' + (userAnswers[currentQuestionIndex] === idx ? ' selected' : '');
    btn.innerText = opt;
    btn.onclick = () => selectOption(idx);
    optionsContainer.appendChild(btn);
  });

  document.getElementById('btn-prev-q').disabled = currentQuestionIndex === 0;
  document.getElementById('btn-next-q').innerText = currentQuestionIndex === total - 1 ? "Submit Test" : "Next";
}

function selectOption(index) {
  userAnswers[currentQuestionIndex] = index;
  renderQuestion();
}

function navigateQuestion(direction) {
  if (direction === 1 && currentQuestionIndex === currentQuestions.length - 1) {
    submitTest();
    return;
  }
  currentQuestionIndex += direction;
  renderQuestion();
}

// --- RESULTS & METADATA SAVE ---
async function submitTest() {
  let score = 0;

  currentQuestions.forEach((q, idx) => {
    if (userAnswers[idx] === q.correct) {
      score++;
    }
  });

  const total = currentQuestions.length;
  document.getElementById('score-display').innerText = `${score} / ${total}`;
  document.getElementById('score-message').innerText = `You scored ${Math.round((score/total)*100)}%`;

  const completed = getCompletedTiers();
  if (!completed.includes(currentTier)) {
    completed.push(currentTier);
    await clerkInstance.user.update({
      unsafeMetadata: { completed }
    });
  }

  const reviewContainer = document.getElementById('review-container');
  reviewContainer.innerHTML = '';

  currentQuestions.forEach((q, idx) => {
    const isCorrect = userAnswers[idx] === q.correct;
    const userPickText = userAnswers[idx] !== null ? q.options[userAnswers[idx]] : "None selected";
    const correctText = q.options[q.correct];

    const item = document.createElement('div');
    item.className = 'review-item';
    item.innerHTML = `
      <div class="review-status ${isCorrect ? 'review-correct' : 'review-incorrect'}">
        ${isCorrect ? '✓ Correct' : '✗ Incorrect'}
      </div>
      <p><strong>Q${idx + 1}: ${q.question}</strong></p>
      <p style="margin-top:5px; font-size:0.95rem;">
        Your Answer: <span style="color:${isCorrect ? 'var(--success)' : 'var(--error)'}">${userPickText}</span>
        ${!isCorrect ? `| Correct Answer: <strong>${correctText}</strong>` : ''}
      </p>
      <div class="explanation">${q.explanation}</div>
    `;
    reviewContainer.appendChild(item);
  });

  switchView('view-results');
}