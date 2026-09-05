// --- QUESTION DATASETS ---
const questionBank = {
  normal: [
    { id: 1, question: "She _____ to the gym every Monday morning.", options: ["go", "goes", "going", "gone"], correct: 1, explanation: "Third-person singular 'she' takes the verb form 'goes' in the present simple tense." },
    { id: 2, question: "Which word is a synonym of 'Happy'?", options: ["Joyful", "Sorrowful", "Angry", "Tired"], correct: 0, explanation: "'Joyful' means feeling or causing great happiness." },
    { id: 3, question: "They _____ watching a movie when I called.", options: ["was", "were", "are", "have"], correct: 1, explanation: "'They' requires the plural past continuous auxiliary verb 'were'." },
    { id: 4, question: "I don't have _____ money left in my wallet.", options: ["many", "some", "any", "no"], correct: 2, explanation: "In negative sentences with uncountable nouns ('money'), 'any' is used." },
    { id: 5, question: "What is the opposite of 'Ancient'?", options: ["Old", "Modern", "Historic", "Aged"], correct: 1, explanation: "'Modern' refers to present times, which is the opposite of 'ancient'." },
    { id: 6, question: "He is interested _____ learning new languages.", options: ["on", "at", "in", "with"], correct: 2, explanation: "The adjective 'interested' is followed by the preposition 'in'." },
    { id: 7, question: "Yesterday, we _____ to the beach.", options: ["go", "went", "gone", "going"], correct: 1, explanation: "'Went' is the simple past tense of 'go'." },
    { id: 8, question: "This is _____ book I have ever read.", options: ["good", "better", "the best", "best"], correct: 2, explanation: "Superlatives comparing one item against all others require 'the best'." },
    { id: 9, question: "Choose the correct spelling:", options: ["Recieve", "Receive", "Receve", "Recive"], correct: 1, explanation: "The standard spelling rule is 'i before e except after c' -> 'Receive'." },
    { id: 10, question: "There isn't _____ milk in the fridge.", options: ["many", "much", "few", "some"], correct: 1, explanation: "'Milk' is an uncountable noun, so 'much' is used in negative statements." },
    { id: 11, question: "Listen! Somebody _____ at the door.", options: ["knocks", "is knocking", "knocked", "has knocked"], correct: 1, explanation: "Actions happening right now at the time of speaking use present continuous." },
    { id: 12, question: "What is the past participle of 'Break'?", options: ["Broke", "Broken", "Breaked", "Breaking"], correct: 1, explanation: "The principal parts of break are break (base), broke (past), broken (past participle)." },
    { id: 13, question: "We usually have lunch _____ noon.", options: ["in", "on", "at", "to"], correct: 2, explanation: "We use 'at' for specific times of day, like 'at noon' or 'at 3 PM'." },
    { id: 14, question: "Which word means 'to make something larger'?", options: ["Decrease", "Expand", "Shrink", "Halt"], correct: 1, explanation: "'Expand' means to become or make larger or more extensive." },
    { id: 15, question: "If it rains tomorrow, we _____ stay home.", options: ["would", "will", "did", "have"], correct: 1, explanation: "First conditional uses present simple in the if-clause and 'will + verb' in the result clause." },
    { id: 16, question: "She is shorter _____ her older sister.", options: ["then", "than", "that", "from"], correct: 1, explanation: "'Than' is used to make comparisons." },
    { id: 17, question: "Which noun is uncountable?", options: ["Car", "Water", "Apple", "Chair"], correct: 1, explanation: "'Water' is a liquid substance and cannot be counted individually." },
    { id: 18, question: "He drove _____ through the heavy rain.", options: ["careful", "carefully", "carefulness", "caring"], correct: 1, explanation: "An adverb ('carefully') is required to modify the verb 'drove'." },
    { id: 19, question: "What is a synonym for 'Huge'?", options: ["Tiny", "Massive", "Narrow", "Short"], correct: 1, explanation: "'Massive' means exceptionally large." },
    { id: 20, question: "I haven't seen him _____ last week.", options: ["for", "since", "from", "during"], correct: 1, explanation: "'Since' indicates a specific starting point in time." },
    { id: 21, question: "Where _____ you live?", options: ["does", "do", "are", "is"], correct: 1, explanation: "'Do' is the auxiliary verb used with 'you' in present simple questions." },
    { id: 22, question: "They _____ finished their homework yet.", options: ["haven't", "hasn't", "didn't", "don't"], correct: 0, explanation: "'They' takes 'haven't' in present perfect tense with 'yet'." },
    { id: 23, question: "Which sentence is grammatically correct?", options: ["He don't like coffee.", "He doesn't likes coffee.", "He doesn't like coffee.", "He not like coffee."], correct: 2, explanation: "Auxiliary 'does not' is followed by the base form of the verb ('like')." },
    { id: 24, question: "What is the plural of 'Child'?", options: ["Childs", "Children", "Childrens", "Childes"], correct: 1, explanation: "'Children' is the irregular plural form of 'child'." },
    { id: 25, question: "My brother is an _____ engineer.", options: ["a", "an", "the", "no article"], correct: 1, explanation: "'An' is used before singular countable nouns beginning with a vowel sound." },
    { id: 26, question: "Can you turn _____ the light? It's too dark.", options: ["off", "on", "out", "away"], correct: 1, explanation: "'Turn on' means to activate a light or device." },
    { id: 27, question: "She is the _____ girl in our class.", options: ["tall", "taller", "tallest", "most tall"], correct: 2, explanation: "Short adjectives take the suffix '-est' for the superlative form." },
    { id: 28, question: "Which word is an antonym of 'Difficult'?", options: ["Hard", "Easy", "Complex", "Tough"], correct: 1, explanation: "'Easy' is the opposite of 'difficult'." },
    { id: 29, question: "We _____ going to visit London next summer.", options: ["is", "am", "are", "be"], correct: 2, explanation: "Subject 'We' uses the auxiliary verb 'are' in the 'going to' future structure." },
    { id: 30, question: "Choose the correct sentence:", options: ["She can to speak French.", "She can speaks French.", "She can speak French.", "She cans speak French."], correct: 2, explanation: "Modal verb 'can' is followed directly by the bare infinitive ('speak')." }
  ],
  hard: [
    { id: 1, question: "Had I known about the delayed flight, I _____ earlier.", options: ["would leave", "would have left", "had left", "left"], correct: 1, explanation: "Inverted third conditional requires 'would have + past participle' in the main clause." },
    { id: 2, question: "The proposal was met with severe opposition and ultimately fell _____.", options: ["through", "out", "off", "behind"], correct: 0, explanation: "'Fall through' is a phrasal verb meaning to fail or not happen." },
    { id: 3, question: "Select the word closest in meaning to 'Reluctant':", options: ["Eager", "Hesitant", "Prompt", "Decisive"], correct: 1, explanation: "'Reluctant' means unwilling and hesitant." },
    { id: 4, question: "Neither the manager nor the employees _____ satisfied with the decision.", options: ["was", "were", "is", "be"], correct: 1, explanation: "With 'neither... nor', the verb agrees with the closer subject ('employees' -> 'were')." },
    { id: 5, question: "She suggested that he _____ a doctor immediately.", options: ["sees", "saw", "see", "would see"], correct: 2, explanation: "The subjunctive mood following verbs of suggestion uses the base form ('see')." },
    { id: 6, question: "The company suffered heavy losses due to bad management, _____?", options: ["didn't it", "did it", "hasn't it", "doesn't it"], correct: 0, explanation: "The sentence is simple past affirmative, so the tag question must be negative simple past ('didn't it')." },
    { id: 7, question: "Which term describes someone who speaks many languages?", options: ["Polyglot", "Philanthropist", "Misogynist", "Monolingual"], correct: 0, explanation: "A 'polyglot' is a person who knows and uses several languages." },
    { id: 8, question: "By this time next year, I _____ my university degree.", options: ["will finish", "will have finished", "am finishing", "have finished"], correct: 1, explanation: "Future Perfect ('will have finished') expresses an action completed before a set time in the future." },
    { id: 9, question: "The teacher insisted on _____ homework on time.", options: ["them to hand in", "their handing in", "they hand in", "them hand in"], correct: 1, explanation: "Prepositions ('on') take a gerund phrase, and the subject of a gerund is possessive ('their handing in')." },
    { id: 10, question: "What is an antonym for 'Candid'?", options: ["Frank", "Deceitful", "Honest", "Direct"], correct: 1, explanation: "'Candid' means truthful and straightforward; 'deceitful' is its opposite." },
    { id: 11, question: "Hardly _____ entered the room when the phone rang.", options: ["had I", "I had", "did I", "I did"], correct: 0, explanation: "Negative adverbial 'Hardly' placed at the start of a sentence causes subject-verb inversion." },
    { id: 12, question: "He talked as if he _____ everything about the incident.", options: ["knows", "knew", "had known", "has known"], correct: 1, explanation: "'As if' referring to a hypothetical present state takes the past simple ('knew')." },
    { id: 13, question: "The new regulation comes _____ force next month.", options: ["into", "to", "in", "with"], correct: 0, explanation: "The idiom is 'to come into force', meaning to become active or effective." },
    { id: 14, question: "Identify the word that means 'lasting for a very short time':", options: ["Eternal", "Ephemeral", "Perpetual", "Enduring"], correct: 1, explanation: "'Ephemeral' means transitory or lasting for a very short time." },
    { id: 15, question: "You _____ told him about the party; it was supposed to be a surprise!", options: ["mustn't have", "shouldn't have", "needn't have", "couldn't have"], correct: 1, explanation: "'Shouldn't have' expresses regret or criticism regarding a past action." },
    { id: 16, question: "Despite _____ late, she managed to catch the train.", options: ["of being", "being", "she was", "that she was"], correct: 1, explanation: "'Despite' is a preposition and must be followed directly by a noun or gerund ('being')." },
    { id: 17, question: "He is notorious _____ making promises he cannot keep.", options: ["for", "with", "about", "to"], correct: 0, explanation: "The adjective 'notorious' pairs with the preposition 'for'." },
    { id: 18, question: "Find the synonym for 'Meticulous':", options: ["Careless", "Thorough", "Rash", "Negligent"], correct: 1, explanation: "'Meticulous' means showing great attention to detail; very careful and precise." },
    { id: 19, question: "The manager had the report _____ before the meeting.", options: ["write", "wrote", "written", "writing"], correct: 2, explanation: "Causative form: 'have + object + past participle' ('had the report written')." },
    { id: 20, question: "It is high time we _____ home.", options: ["go", "went", "should go", "have gone"], correct: 1, explanation: "'It is high time' is followed by the simple past subjunctive structure ('went') to express urgency." },
    { id: 21, question: "She accused him _____ stealing her documents.", options: ["for", "with", "of", "on"], correct: 2, explanation: "The verb 'accuse' takes the preposition 'of'." },
    { id: 22, question: "Which of the following sentences contains a dangling modifier?", options: ["Walking down the street, the trees were beautiful.", "Walking down the street, I admired the trees.", "While I was walking down the street, the trees looked beautiful.", "The trees looked beautiful as I walked down the street."], correct: 0, explanation: "Option A incorrectly implies that the 'trees' were walking down the street." },
    { id: 23, question: "What does the idiom 'Burn the midnight oil' mean?", options: ["To waste energy", "To work late into the night", "To set something on fire", "To wake up early"], correct: 1, explanation: "'Burn the midnight oil' means to study or work late at night." },
    { id: 24, question: "Not only _____ the exam, but she also scored the highest mark.", options: ["she passed", "did she pass", "passed she", "she had passed"], correct: 1, explanation: "'Not only' at the start of a clause triggers subject-auxiliary inversion ('did she pass')." },
    { id: 25, question: "Choose the word that means 'expressing opinions directly and honestly':", options: ["Outspoken", "Reserved", "Timid", "Ambiguous"], correct: 0, explanation: "'Outspoken' means frank in stating one's opinions." },
    { id: 26, question: "I would rather you _____ call me after 10 PM.", options: ["don't", "didn't", "not", "won't"], correct: 1, explanation: "'Would rather + subject' takes the simple past to refer to present/future wishes." },
    { id: 27, question: "The house was destroyed by the storm, _____ was a tragic loss.", options: ["that", "which", "what", "it"], correct: 1, explanation: "Non-defining relative clauses modifying an entire sentence use 'which'." },
    { id: 28, question: "What is an antonym of 'Prudent'?", options: ["Cautious", "Reckless", "Wise", "Discrete"], correct: 1, explanation: "'Prudent' means acting with care; 'reckless' is its direct opposite." },
    { id: 29, question: "He is prone _____ making silly mistakes when under stress.", options: ["to", "for", "in", "with"], correct: 0, explanation: "The adjective 'prone' requires the preposition 'to'." },
    { id: 30, question: "Suppose he _____ you to resign, what would you do?", options: ["ask", "asked", "had asked", "asks"], correct: 1, explanation: "'Suppose' used for hypothetical conditions follows second conditional structure (past simple 'asked')." }
  ],
  advanced: [
    { id: 1, question: "The politician’s speech was full of _____ arguments that failed to persuade the critical audience.", options: ["specious", "veracious", "cogent", "trenchant"], correct: 0, explanation: "'Specious' means superficially plausible, but actually wrong or misleading." },
    { id: 2, question: "Were the evidence _____ presented during trial, the verdict might have differed.", options: ["to have been", "being", "had been", "to be"], correct: 0, explanation: "'Were + subject + to have + past participle' forms an advanced hypothetical condition." },
    { id: 3, question: "Select the word that is an antonym for 'Obsequious':", options: ["Servile", "Domineering", "Fawning", "Submissive"], correct: 1, explanation: "'Obsequious' means excessively submissive/fawning; 'domineering' is its antonym." },
    { id: 4, question: "Little _____ how profoundly his research would alter modern medicine.", options: ["he realized", "did he realize", "he had realized", "realized he"], correct: 1, explanation: "Fronted negative adverb 'Little' forces subject-verb inversion." },
    { id: 5, question: "The CEO was accused of _____ company funds for personal luxury investments.", options: ["embezzling", "exonerating", "substantiating", "vindicating"], correct: 0, explanation: "'Embezzling' means stealing or misappropriating funds placed in one's trust." },
    { id: 6, question: "So captivating _____ performance that the audience gave a ten-minute standing ovation.", options: ["was her", "her was", "did her", "she was"], correct: 0, explanation: "Inversion after 'So + adjective' structure ('So captivating was her performance...')." },
    { id: 7, question: "Which term denotes an expression whose meaning cannot be inferred from its literal words?", options: ["Metonymy", "Idiom", "Oxymoron", "Hyperbole"], correct: 1, explanation: "An 'idiom' is a figurative expression non-deducible from individual constituent words." },
    { id: 8, question: "The scholar’s treatise was so _____ that only specialists in the field could grasp its nuances.", options: ["abstruse", "lucid", "manifest", "pellucid"], correct: 0, explanation: "'Abstruse' means obscure, esoteric, and difficult to understand." },
    { id: 9, question: "No sooner _____ than the electricity went out completely.", options: ["had we arrived", "we arrived", "did we arrive", "were we arriving"], correct: 0, explanation: "'No sooner' is followed by past perfect in inverted order, paired with 'than'." },
    { id: 10, question: "He proved to be an _____ adversary, refusing to back down under immense pressure.", options: ["indomitable", "inept", "acquiescent", "unobtrusive"], correct: 0, explanation: "'Indomitable' means impossible to subdue or defeat." },
    { id: 11, question: "She insisted that the meeting _____ adjourned until the board members arrived.", options: ["be", "was", "is", "were"], correct: 0, explanation: "Mandative subjunctive uses the base verb form ('be')." },
    { id: 12, question: "Select the sentence that contains a correct use of the subjunctive mood:", options: ["I wish I was a king.", "If I was you, I would leave.", "If he were to resign, the company would collapse.", "It is imperative that he arrives on time."], correct: 2, explanation: "'If he were to...' correctly employs the past subjunctive for hypothetical conditions." },
    { id: 13, question: "What is the synonym of 'Laconic'?", options: ["Verbose", "Tersely expressed", "Garrulous", "Loquacious"], correct: 1, explanation: "'Laconic' means using very few words; concise or terse." },
    { id: 14, question: "The contract was nullified because one of the clauses was deemed _____.", options: ["enforceable", "unenforceable", "unforeseeable", "inevitable"], correct: 1, explanation: "'Unenforceable' terms render legal agreements null and void." },
    { id: 15, question: "Only by relentless practice _____ mastery over a musical instrument.", options: ["one can achieve", "can one achieve", "one achieves", "achieves one"], correct: 1, explanation: "Prepositional phrases with 'Only by...' placed initial require auxiliary inversion ('can one achieve')." },
    { id: 16, question: "The author's latest novel is a _____ critique of contemporary consumer culture.", options: ["scathing", "flattering", "bland", "benign"], correct: 0, explanation: "'Scathing' means severely critical, harsh, and cutting." },
    { id: 17, question: "Choose the correct phrase: 'He acted in accordance _____ the guidelines.'", options: ["to", "with", "for", "by"], correct: 1, explanation: "The standard idiomatic expression is 'in accordance with'." },
    { id: 18, question: "What does 'Sycophant' mean?", options: ["A rebel", "A flatterer", "A leader", "A scholar"], correct: 1, explanation: "A 'sycophant' acts obsequiously toward someone important to gain advantage." },
    { id: 19, question: "Try _____ he might, he could not lift the boulder.", options: ["as", "like", "though", "even"], correct: 0, explanation: "The structure 'Try as [subject] might' expresses conceded effort." },
    { id: 20, question: "The witness’s testimony was _____ with inconsistencies.", options: ["rife", "devoid", "lacking", "destitute"], correct: 0, explanation: "'Rife with' means abundantly filled or plagued with something undesirable." },
    { id: 21, question: "It is crucial that every candidate _____ the official code of conduct.", options: ["observes", "observe", "observed", "will observe"], correct: 1, explanation: "'It is crucial that...' requires the subjunctive base verb form ('observe')." },
    { id: 22, question: "Which literary device involves combining contradictory terms, like 'deafening silence'?", options: ["Paradox", "Oxymoron", "Metaphor", "Irony"], correct: 1, explanation: "An 'oxymoron' directly juxtaposes two conflicting terms." },
    { id: 23, question: "Far _____ it from me to tell you how to run your business.", options: ["be", "is", "were", "being"], correct: 0, explanation: "The fixed subjunctive idiom is 'Far be it from me...'" },
    { id: 24, question: "The disease caused an _____ loss of memory in affected patients.", options: ["irremediable", "irremediably", "remediable", "remedy"], correct: 0, explanation: "Adjective 'irremediable' means impossible to cure or put right." },
    { id: 25, question: "Should you _____ any difficulties, please contact customer support.", options: ["encounter", "encountered", "encounters", "will encounter"], correct: 0, explanation: "Inverted conditional using 'Should' takes the base verb form ('encounter')." },
    { id: 26, question: "Her _____ demeanor masked a deeply calculating mind.", options: ["guileless", "crafty", "astute", "shrewd"], correct: 0, explanation: "'Guileless' means innocent and naive, creating contrast with 'calculating'." },
    { id: 27, question: "Under no circumstances _____ leave the building during an alarm.", options: ["employees should", "should employees", "employees must", "must be employees"], correct: 1, explanation: "Fronted restrictive phrase 'Under no circumstances' requires modal inversion." },
    { id: 28, question: "What is the meaning of 'Equivocate'?", options: ["To speak clearly", "To use ambiguous language to conceal truth", "To balance weights", "To prove equal value"], correct: 1, explanation: "'Equivocate' means to use ambiguous language intentionally to conceal the truth." },
    { id: 29, question: "He was passed _____ for promotion in favor of a younger colleague.", options: ["over", "by", "off", "out"], correct: 0, explanation: "'Pass over' means to ignore or disregard someone's eligibility for a position." },
    { id: 30, question: "The project was executed with flawless _____, leaving no room for error.", options: ["precision", "precisioner", "precisenessly", "precise"], correct: 0, explanation: "The sentence requires a noun ('precision') following the preposition 'with' and adjective 'flawless'." }
  ]
};

// --- APPLICATION STATE ---
let clerkInstance = null;
let currentTier = null;
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
  // Replace with your real Publishable Key from Clerk Dashboard
  const clerkFrontendApi = "YOUR_CLERK_PUBLISHABLE_KEY"; 
  
  if (window.Clerk) {
    clerkInstance = window.Clerk;
    await clerkInstance.load();

    if (clerkInstance.user) {
      mountAuthUI();
      showDashboard();
    } else {
      switchView('view-login');
      document.getElementById('btn-login-trigger').onclick = () => clerkInstance.openSignIn();
    }
  } else {
    console.error("Clerk SDK failed to load. Please set your publishable key.");
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

  // Lock/Unlock updates
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

function startTest(tier) {
  const completed = getCompletedTiers();

  if (tier === 'hard' && !completed.includes('normal')) {
    alert("Please complete and submit the Normal test first to unlock the Hard test.");
    return;
  }
  if (tier === 'advanced' && !completed.includes('hard')) {
    alert("Please complete and submit the Hard test first to unlock the Advanced test.");
    return;
  }

  currentTier = tier;
  currentQuestionIndex = 0;
  userAnswers = new Array(30).fill(null);

  document.getElementById('quiz-tier-title').innerText = `${tier} Test`;
  switchView('view-quiz');
  renderQuestion();
}

// --- QUIZ EXECUTION LOGIC ---
function renderQuestion() {
  const qData = questionBank[currentTier][currentQuestionIndex];
  document.getElementById('quiz-progress').innerText = `Question ${currentQuestionIndex + 1} / 30`;
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
  document.getElementById('btn-next-q').innerText = currentQuestionIndex === 29 ? "Submit Test" : "Next";
}

function selectOption(index) {
  userAnswers[currentQuestionIndex] = index;
  renderQuestion();
}

function navigateQuestion(direction) {
  if (direction === 1 && currentQuestionIndex === 29) {
    submitTest();
    return;
  }
  currentQuestionIndex += direction;
  renderQuestion();
}

// --- RESULTS & METADATA SAVE ---
async function submitTest() {
  const questions = questionBank[currentTier];
  let score = 0;

  questions.forEach((q, idx) => {
    if (userAnswers[idx] === q.correct) {
      score++;
    }
  });

  // Render Score
  document.getElementById('score-display').innerText = `${score} / 30`;
  document.getElementById('score-message').innerText = `You scored ${Math.round((score/30)*100)}%`;

  // Update Metadata in Clerk if passed / finished
  const completed = getCompletedTiers();
  if (!completed.includes(currentTier)) {
    completed.push(currentTier);
    await clerkInstance.user.update({
      unsafeMetadata: { completed }
    });
  }

  // Render Detailed Breakdown
  const reviewContainer = document.getElementById('review-container');
  reviewContainer.innerHTML = '';

  questions.forEach((q, idx) => {
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