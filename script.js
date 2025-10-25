// Modal functions
function openAuthModal() {
    document.getElementById('authModal').style.display = 'block';
}

function closeAuthModal() {
    document.getElementById('authModal').style.display = 'none';
}

function openTermsModal() {
    document.getElementById('termsModal').style.display = 'block';
    closeAuthModal();
}

function closeTermsModal() {
    document.getElementById('termsModal').style.display = 'none';
}

function openPrivacyModal() {
    alert('Политика конфиденциальности: Мы не собираем и не храним ваши личные данные.');
}

// Tab system
function openTab(tabName) {
    const tabcontents = document.getElementsByClassName('tab-content');
    const tabbuttons = document.getElementsByClassName('tab-btn');
    
    for (let i = 0; i < tabcontents.length; i++) {
        tabcontents[i].classList.remove('active');
    }
    
    for (let i = 0; i < tabbuttons.length; i++) {
        tabbuttons[i].classList.remove('active');
    }
    
    document.getElementById(tabName).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Form handling
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    
    // Здесь должна быть реальная авторизация
    alert('Функция авторизации в разработке');
    
    // После успешной авторизации
    startDownload();
});

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    
    if (password !== confirmPassword) {
        alert('Пароли не совпадают!');
        return;
    }
    
    // Здесь должна быть реальная регистрация
    alert('Регистрация успешна! Проверьте email для подтверждения.');
    
    // После успешной регистрации
    startDownload();
});

function acceptTerms() {
    localStorage.setItem('termsAccepted', 'true');
    closeTermsModal();
    alert('Условия приняты! Теперь вы можете скачать клиент.');
}

// Download function
function startDownload() {
    const termsAccepted = localStorage.getItem('termsAccepted');
    
    if (!termsAccepted) {
        alert('Пожалуйста, сначала примите условия использования');
        openTermsModal();
        return;
    }
    
    // Ссылка на скачивание лоудера
    const downloadUrl = 'https://example.com/cherepokclient-loader.exe'; // Заменить на реальную ссылку
    
    // Создаем временную ссылку для скачивания
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'CherepokClient-Loader.exe';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Отправка в Discord и Telegram (webhook)
    sendToDiscord('Новый пользователь скачал клиент');
    sendToTelegram('Новый пользователь скачал клиент');
    
    alert('Лоудер успешно скачан! Запустите файл для установки клиента.');
}

// Discord integration
function joinDiscord() {
    window.open('https://discord.com/channels/1429809816708059216/1429809819396739165', '_blank');
}

function sendToDiscord(message) {
    const webhookUrl = 'https://discordapp.com/api/webhooks/1429812232740540547/yJW01Mwyuji_-lQamETlG_uf6lycKxSP3bOPRtSbTqC6-iO7KOZ0SqC76m1aeTMNR094';
    
    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: message,
            embeds: [{
                title: 'CherepokClient Download',
                description: 'Новая загрузка клиента',
                color: 5814783,
                timestamp: new Date().toISOString()
            }]
        })
    }).catch(console.error);
}

// Telegram integration
function joinTelegram() {
    window.open('https://t.me/cherepokclient', '_blank');
}

function sendToTelegram(message) {
    const botToken = '7837645620:AAFRcsJX5SRliw2I4R9lnxr-fvV5z7jUpdU';
    const chatId = '@CherepokClientBOT';
    const url = `https://t.me/cherepokclient{7837645620:AAFRcsJX5SRliw2I4R9lnxr-fvV5z7jUpdU}/sendMessage`;
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'HTML'
        })
    }).catch(console.error);
}

// Close modals when clicking outside
window.onclick = function(event) {
    const modals = document.getElementsByClassName('modal');
    for (let modal of modals) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Add animation to feature cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});