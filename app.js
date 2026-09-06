const SUPABASE_URL = "https://qrzjhczdlnrhsscotnmf.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyempoY3pkbG5yaHNzY290bm1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg2NzU3NjYsImV4cCI6MjEwNDI1MTc2Nn0.R2v6VqMSEpL0BwpRFcEgSq7o6IrM6A72kIAUji9w8pQ";

// Use supabaseClient to prevent collision with window.supabase
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let currentUser = null;
let currentAuthMode = 'login';
let currentTier = null;
let currentQuestions = [];
let currentQuestionIndex = 0;
let userAnswers = [];

function switchView(viewId) {
  ['view-hero', 'view-dashboard', 'view-quiz', 'view-results', 'view-policy', 'view-contact'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  });
  document.getElementById(viewId).classList.remove('hidden');
}

/* MODAL CONTROLS */
function openModal(mode) {
  currentAuthMode = mode;
  document.getElementById('modal-title').innerText = mode.toUpperCase();
  document.getElementById('auth-modal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('auth-modal').classList.add('hidden');
}

/* AUTHENTICATION */
window.addEventListener('load', async () => {
  const { data: { session } } = await supabaseClient.auth.getSession();
  if (session) {
    currentUser = session.user;
    updateHeaderUI(true);
    showDashboard();
  } else {
    switchView('view-hero');
  }

  supabaseClient.auth.onAuthStateChange((event, session) => {
    if (session) {
      currentUser = session.user;
      updateHeaderUI(true);
      showDashboard();
    } else {
      currentUser = null;
      updateHeaderUI(false);
      switchView('view-hero');
    }
  });
});

async function handleAuthSubmit() {
  const email = document.getElementById('auth-email').value;
  const password = document.getElementById('auth-password').value;

  if (!email || !password) return alert("Please fill in both fields.");

  if (currentAuthMode === 'login') {
    const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else closeModal();
  } else {
    const { error } = await supabaseClient.auth.signUp({ email, password });
    if (error) alert(error.message);
    else {
      alert("Registration complete! Check your email.");
      closeModal();
    }
  }
}

function updateHeaderUI(isLoggedIn) {
  const headerNode = document.getElementById('auth-header-nodes');
  if (isLoggedIn) {
    headerNode.innerHTML = `
      <span style="color: var(--text-muted); align-self: center;">${currentUser.email}</span>
      <button class="btn-outline" onclick="supabaseClient.auth.signOut()">Logout</button>
    `;
  } else {
    headerNode.innerHTML = `
      <button class="btn-outline" onclick="openModal('login')">Login</button>
      <button class="btn" onclick="openModal('register')">Register</button>
    `;
  }
}

/* DASHBOARD & PROGRESS */
async function getCompletedTiers() {
  if (!currentUser) return [];
  const { data } = await supabaseClient.from('profiles').select('completed_tiers').eq('id', currentUser.id).single();
  return data ? data.completed_tiers || [] : [];
}

async function showDashboard() {
  switchView('view-dashboard');
  const completed = await getCompletedTiers();

  const hardCard = document.getElementById('card-hard');
  const advCard = document.getElementById('card-advanced');

  if (completed.includes('normal')) hardCard.classList.remove('locked');
  if (completed.includes('hard')) advCard.classList.remove('locked');
}

/* QUIZ ENGINE */
async function startTest(tier) {
  const completed = await getCompletedTiers();
  if (tier === 'hard' && !completed.includes('normal')) return alert("Complete Normal test first.");
  if (tier === 'advanced' && !completed.includes('hard')) return alert("Complete Hard test first.");

  try {
    const res = await fetch(`${tier}.json`);
    currentQuestions = await res.json();
    currentTier = tier;
    currentQuestionIndex = 0;
    userAnswers = new Array(currentQuestions.length).fill(null);

    document.getElementById('quiz-tier-title').innerText = `${tier.toUpperCase()} TEST`;
    switchView('view-quiz');
    renderQuestion();
  } catch (e) {
    alert("Could not load questions.");
  }
}

function renderQuestion() {
  const q = currentQuestions[currentQuestionIndex];
  document.getElementById('quiz-progress').innerText = `Question ${currentQuestionIndex + 1} of ${currentQuestions.length}`;
  document.getElementById('q-text').innerText = `${q.id}. ${q.question}`;

  const container = document.getElementById('q-options');
  container.innerHTML = '';
  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'btn-outline';
    btn.style.textAlign = 'left';
    if (userAnswers[currentQuestionIndex] === idx) btn.style.background = 'var(--accent)';
    btn.innerText = opt;
    btn.onclick = () => { userAnswers[currentQuestionIndex] = idx; renderQuestion(); };
    container.appendChild(btn);
  });

  document.getElementById('btn-prev-q').disabled = currentQuestionIndex === 0;
  document.getElementById('btn-next-q').innerText = currentQuestionIndex === currentQuestions.length - 1 ? "Submit" : "Next";
}

function navigateQuestion(dir) {
  if (dir === 1 && currentQuestionIndex === currentQuestions.length - 1) {
    submitTest();
    return;
  }
  currentQuestionIndex += dir;
  renderQuestion();
}

async function submitTest() {
  let score = 0;
  currentQuestions.forEach((q, idx) => { if (userAnswers[idx] === q.correct) score++; });

  document.getElementById('score-display').innerText = `${score} / ${currentQuestions.length}`;
  
  const completed = await getCompletedTiers();
  if (!completed.includes(currentTier)) {
    completed.push(currentTier);
    await supabaseClient.from('profiles').update({ completed_tiers: completed }).eq('id', currentUser.id);
  }

  switchView('view-results');
}