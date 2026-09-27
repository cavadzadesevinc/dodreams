// --- 1. TƏRCÜMƏLƏR ---
const translations = {
    en: {
        appTitle: "✨ DoDreams",
        authSubtitle: "Please sign in or register to continue",
        authBtn: "Sign In / Register",
        todoInputPlaceholder: "Add a new task...",
        searchInputPlaceholder: "Search tasks...",
        catWork: "Work",
        catStudy: "Study",
        catPersonal: "Personal",
        priLow: "Low",
        priMed: "Medium",
        priHigh: "High",
        addBtn: "Add Task",
        filterAll: "All",
        filterActive: "Active",
        filterCompleted: "Completed",
        statTotal: "Total",
        statDone: "Done",
        friendsTitle: "👥 Friends",
        friendPlaceholder: "Add friend by username...",
        addFriendBtn: "Add",
        chatTitle: "💬 Chat",
        noChatText: "Select a friend to start chatting",
        msgPlaceholder: "Type a message...",
        sendBtn: "Send"
    },
    az: {
        appTitle: "✨ DoDreams",
        authSubtitle: "Davam etmək üçün daxil olun və ya qeydiyyatdan keçin",
        authBtn: "Daxil ol / Qeydiyyat",
        todoInputPlaceholder: "Yeni tapşırıq əlavə et...",
        searchInputPlaceholder: "Tapşırıqlarda axtar...",
        catWork: "İş",
        catStudy: "Təhsil",
        catPersonal: "Şəxsi",
        priLow: "Aşağı",
        priMed: "Orta",
        priHigh: "Yüksək",
        addBtn: "Tapşırıq Əlavə Et",
        filterAll: "Hamısı",
        filterActive: "Aktiv",
        filterCompleted: "Tamamlanmış",
        statTotal: "Ümumi",
        statDone: "Bitən",
        friendsTitle: "👥 Dostlar",
        friendPlaceholder: "İstifadəçi adı ilə əlavə et...",
        addFriendBtn: "Əlavə et",
        chatTitle: "💬 Mesajlar",
        noChatText: "Söhbətə başlamaq üçün dost seçin",
        msgPlaceholder: "Mesaj yazın...",
        sendBtn: "Göndər"
    },
    ru: {
        appTitle: "✨ DoDreams",
        authSubtitle: "Войдите или зарегистрируйтесь для продолжения",
        authBtn: "Войти / Регистрация",
        todoInputPlaceholder: "Добавить новую задачу...",
        searchInputPlaceholder: "Поиск задач...",
        catWork: "Работа",
        catStudy: "Учеба",
        catPersonal: "Личное",
        priLow: "Низкий",
        priMed: "Средний",
        priHigh: "Высокий",
        addBtn: "Добавить задачу",
        filterAll: "Все",
        filterActive: "Активные",
        filterCompleted: "Выполненные",
        statTotal: "Всего",
        statDone: "Готово",
        friendsTitle: "👥 Друзья",
        friendPlaceholder: "Добавить по имени...",
        addFriendBtn: "Добавить",
        chatTitle: "💬 Чат",
        noChatText: "Выберите друга для чата",
        msgPlaceholder: "Введите сообщение...",
        sendBtn: "Отправить"
    }
};

// --- 2. STATE VƏ ELEMENTLƏR ---
let currentUser = localStorage.getItem('currentUser') || null;
let currentLang = 'en';
let currentFilter = 'all';
let searchQuery = '';
let activeChatFriend = null;

// DOM
const authModal = document.getElementById('auth-modal');
const authForm = document.getElementById('auth-form');
const authUsernameInput = document.getElementById('auth-username');
const authPasswordInput = document.getElementById('auth-password');
const mainApp = document.getElementById('main-app');
const langSelect = document.getElementById('language-select');

// To-Do DOM
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const searchInput = document.getElementById('search-input');
const categorySelect = document.getElementById('category-select');
const prioritySelect = document.getElementById('priority-select');
const dueDateInput = document.getElementById('due-date');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const filterBtns = document.querySelectorAll('.filter-btn');
const totalCountEl = document.getElementById('total-count');
const completedCountEl = document.getElementById('completed-count');

// Social DOM
const friendUsernameInput = document.getElementById('friend-username');
const addFriendBtn = document.getElementById('add-friend-btn');
const friendsList = document.getElementById('friends-list');
const chatMessages = document.getElementById('chat-messages');
const noChatText = document.getElementById('no-chat-text');
const chatInputArea = document.getElementById('chat-input-area');
const messageInput = document.getElementById('message-input');
const sendMsgBtn = document.getElementById('send-msg-btn');
const chatTitle = document.getElementById('chat-title');

// --- 3. AUTHENTICATION ---
if (currentUser) {
    authModal.style.display = 'none';
    mainApp.style.display = 'block';
    initializeApp();
}

authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = authUsernameInput.value.trim();
    if (!username) return;

    currentUser = username;
    localStorage.setItem('currentUser', currentUser);
    
    authModal.style.display = 'none';
    mainApp.style.display = 'block';
    initializeApp();
});

// --- 4. DİL DƏYİŞDİRMƏ ---
function changeLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('.logo-large, .logo-text').forEach(el => el.textContent = translations[lang].appTitle);
    document.getElementById('auth-subtitle').textContent = translations[lang].authSubtitle;
    document.getElementById('auth-btn').textContent = translations[lang].authBtn;
    
    todoInput.placeholder = translations[lang].todoInputPlaceholder;
    searchInput.placeholder = translations[lang].searchInputPlaceholder;
    addBtn.textContent = translations[lang].addBtn;

    categorySelect.options[0].text = translations[lang].catWork;
    categorySelect.options[1].text = translations[lang].catStudy;
    categorySelect.options[2].text = translations[lang].catPersonal;

    prioritySelect.options[0].text = translations[lang].priLow;
    prioritySelect.options[1].text = translations[lang].priMed;
    prioritySelect.options[2].text = translations[lang].priHigh;

    document.getElementById('filter-all').textContent = translations[lang].filterAll;
    document.getElementById('filter-active').textContent = translations[lang].filterActive;
    document.getElementById('filter-completed').textContent = translations[lang].filterCompleted;

    document.getElementById('stat-total-label').textContent = translations[lang].statTotal;
    document.getElementById('stat-completed-label').textContent = translations[lang].statDone;

    document.getElementById('friends-title').textContent = translations[lang].friendsTitle;
    friendUsernameInput.placeholder = translations[lang].friendPlaceholder;
    addFriendBtn.textContent = translations[lang].addFriendBtn;
    
    if (!activeChatFriend) {
        noChatText.textContent = translations[lang].noChatText;
    }
    messageInput.placeholder = translations[lang].msgPlaceholder;
    sendMsgBtn.textContent = translations[lang].sendBtn;
}

langSelect.addEventListener('change', (e) => {
    changeLanguage(e.target.value);
});

// --- 5. TƏTBİQİN İŞƏ DÜŞMƏSİ ---
function initializeApp() {
    renderTodos();
    renderFriends();
}

// --- 6. TO-DO CRUD ---
function getTodos() {
    const allTodos = JSON.parse(localStorage.getItem('todos')) || {};
    return allTodos[currentUser] || [];
}

function saveTodos(todos) {
    const allTodos = JSON.parse(localStorage.getItem('todos')) || {};
    allTodos[currentUser] = todos;
    localStorage.setItem('todos', JSON.stringify(allTodos));
}

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (!text) return;

    const todos = getTodos();
    const newTodo = {
        id: Date.now(),
        text: text,
        category: categorySelect.value,
        priority: prioritySelect.value,
        dueDate: dueDateInput.value,
        completed: false
    };

    todos.push(newTodo);
    saveTodos(todos);
    renderTodos();
    todoInput.value = '';
    dueDateInput.value = '';
});

function renderTodos() {
    todoList.innerHTML = '';
    const todos = getTodos();

    totalCountEl.textContent = todos.length;
    completedCountEl.textContent = todos.filter(t => t.completed).length;

    let filtered = todos.filter(todo => {
        if (currentFilter === 'active' && todo.completed) return false;
        if (currentFilter === 'completed' && !todo.completed) return false;
        if (searchQuery && !todo.text.toLowerCase().includes(searchQuery)) return false;
        return true;
    });

    filtered.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <div>
                <span>${todo.text}</span>
                <small style="display: block; color: #8e24aa; font-size: 11px; margin-top: 2px;">
                    [${todo.category} | Priority: ${todo.priority} ${todo.dueDate ? '| Due: ' + todo.dueDate : ''}]
                </small>
            </div>
            <div class="todo-actions">
                <button onclick="toggleTodo(${todo.id})">✨</button>
                <button onclick="deleteTodo(${todo.id})">🗑️</button>
            </div>
        `;
        todoList.appendChild(li);
    });
}

window.toggleTodo = function(id) {
    let todos = getTodos();
    todos = todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    saveTodos(todos);
    renderTodos();
};

window.deleteTodo = function(id) {
    let todos = getTodos();
    todos = todos.filter(t => t.id !== id);
    saveTodos(todos);
    renderTodos();
};

searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase();
    renderTodos();
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter');
        renderTodos();
    });
});

// --- 7. DOSTLAR VƏ ÇAT ---
function getFriends() {
    const allFriends = JSON.parse(localStorage.getItem('friends')) || {};
    return allFriends[currentUser] || [];
}

function saveFriends(friends) {
    const allFriends = JSON.parse(localStorage.getItem('friends')) || {};
    allFriends[currentUser] = friends;
    localStorage.setItem('friends', JSON.stringify(allFriends));
}

addFriendBtn.addEventListener('click', () => {
    const friendName = friendUsernameInput.value.trim();
    if (!friendName || friendName === currentUser) return;

    let friends = getFriends();
    if (!friends.includes(friendName)) {
        friends.push(friendName);
        saveFriends(friends);
        renderFriends();
        friendUsernameInput.value = '';
    }
});

function renderFriends() {
    friendsList.innerHTML = '';
    const friends = getFriends();

    friends.forEach(friend => {
        const li = document.createElement('li');
        li.className = 'friend-item';
        li.textContent = `👤 ${friend}`;
        li.addEventListener('click', () => selectFriend(friend));
        friendsList.appendChild(li);
    });
}

function selectFriend(friend) {
    activeChatFriend = friend;
    chatTitle.textContent = `💬 Chat with ${friend}`;
    noChatText.style.display = 'none';
    chatInputArea.style.display = 'flex';
    renderMessages();
}

function getMessagesKey(friend) {
    const users = [currentUser, friend].sort();
    return `chat_${users[0]}_${users[1]}`;
}

function renderMessages() {
    if (!activeChatFriend) return;
    chatMessages.innerHTML = '';

    const chatKey = getMessagesKey(activeChatFriend);
    const messages = JSON.parse(localStorage.getItem(chatKey)) || [];

    messages.forEach(msg => {
        const p = document.createElement('div');
        p.style.margin = '6px 0';
        p.style.padding = '6px 10px';
        p.style.borderRadius = '8px';
        p.style.fontSize = '12px';
        
        if (msg.sender === currentUser) {
            p.style.background = '#fce4ec';
            p.style.textAlign = 'right';
            p.textContent = `You: ${msg.text}`;
        } else {
            p.style.background = '#f3e5f5';
            p.textContent = `${msg.sender}: ${msg.text}`;
        }
        chatMessages.appendChild(p);
    });
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

sendMsgBtn.addEventListener('click', () => {
    const text = messageInput.value.trim();
    if (!text || !activeChatFriend) return;

    const chatKey = getMessagesKey(activeChatFriend);
    const messages = JSON.parse(localStorage.getItem(chatKey)) || [];

    messages.push({
        sender: currentUser,
        text: text,
        time: Date.now()
    });

    localStorage.setItem(chatKey, JSON.stringify(messages));
    messageInput.value = '';
    renderMessages();
});