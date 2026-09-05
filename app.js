// --- APPLICATION STATE ---
let clerkInstance = null;
let currentTier = null;
let currentQuestions = [];
let currentQuestionIndex = 0;
let userAnswers = [];

// --- VIEW ROUTER ---
function switchView(viewId) {
  ['view-login', 'view-dashboard', 'view-quiz', 'view-results'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  });
  const targetView = document.getElementById(viewId);
  if (targetView) targetView.classList.remove('hidden');
}

// --- GLOBAL TRIGGER FOR MANUAL BUTTON CLICKS ---
async function triggerClerkSignIn() {
  if (window.Clerk) {
    if (!window.Clerk.loaded) {
      await window.Clerk.load();
    }
    window.Clerk.openSignIn();
  } else {
    alert("Authentication engine is still loading. Please wait a second and try again.");
  }
}

// --- CLERK AUTHENTICATION INITIALIZATION ---
window.addEventListener('load', async () => {
  // 1. Wait for the Clerk script to attach to the window object (retry loop)
  let attempts = 0;
  while (!window.Clerk && attempts < 30) {
    await new Promise(resolve => setTimeout(resolve, 100));
    attempts++;
  }

  if (!window.Clerk) {
    console.error("Clerk SDK failed to load from CDN.");
    return;
  }

  clerkInstance = window.Clerk;

  // 2. Initialize Clerk if not already loaded
  if (!clerkInstance.loaded) {
    await clerkInstance.load();
  }

  // 3. Handle session state
  if (clerkInstance.user) {
    mountAuthUI();
    showDashboard();
  } else {
    switchView('view-login');
    const loginBtn = document.getElementById('btn-login-trigger');
    if (loginBtn) {
      loginBtn.onclick = () => triggerClerkSignIn();
    }
  }
});

function mountAuthUI() {
  const authNode = document.getElementById('auth-node');
  if (authNode) {
    authNode.innerHTML = '';
    clerkInstance.mountUserButton(authNode);
  }
}

// --- DASHBOARD & PROGRESS LOGIC ---
function getCompletedTiers() {
  if (!clerkInstance || !clerkInstance.user) return [];
  return clerkInstance.user.unsafeMetadata?.completed || [];
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
  
  if (card && badge) {
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
    const response = await fetch(`${tier}.json`);
    if (!response.ok) throw new Error(`Could not load ${tier}.json`);
    
    currentQuestions = await response.json();
    currentTier = tier;
    currentQuestionIndex = 0;
    userAnswers = new Array(currentQuestions.length).fill(null);

    document.getElementById('quiz-tier-title').innerText = `${tier.toUpperCase()} Test`;
    switchView('view-quiz');
    renderQuestion();
  } catch (error) {
    console.error("Error loading questions:", error);
    alert("Failed to load quiz questions.");
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
  document.getElementById('score-message').innerText = `You scored ${Math.round((score / total) * 100)}%`;

  const completed = getCompletedTiers();
  if (!completed.includes(currentTier)) {
    completed.push(currentTier);
    if (clerkInstance && clerkInstance.user) {
      await clerkInstance.user.update({
        unsafeMetadata: { completed }
      });
    }
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