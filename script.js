
// Скрываем окно подтверждения при каждом открытии страницы.
document.addEventListener('DOMContentLoaded', function () {
    const successModal = document.getElementById('successModal');
    if (successModal) successModal.classList.remove('active');
});
window.addEventListener('pageshow', function () {
    const successModal = document.getElementById('successModal');
    if (successModal) successModal.classList.remove('active');
});
"use strict";

// 1. Тень у шапки
const header = document.getElementById("header");

function updateHeader() {
    if (!header) return;
    if (window.scrollY > 20) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
}

window.addEventListener("scroll", updateHeader);
updateHeader();

// 2. Мобильное меню
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");
const navLinks = document.querySelectorAll(".nav__link");

function closeMenu() {
    if (!burger || !nav) return;
    burger.classList.remove("active");
    nav.classList.remove("active");
    document.body.classList.remove("menu-open");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Открыть меню");
}

function openMenu() {
    if (!burger || !nav) return;
    burger.classList.add("active");
    nav.classList.add("active");
    document.body.classList.add("menu-open");
    burger.setAttribute("aria-expanded", "true");
    burger.setAttribute("aria-label", "Закрыть меню");
}

if (burger && nav) burger.addEventListener("click", () => {
    const menuIsOpen = nav.classList.contains("active");
    if (menuIsOpen) {
        closeMenu();
    } else {
        openMenu();
    }
});

navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
        closeMenu();
    }
});

// 3. Переключение вкладок цен
const priceTabs = document.querySelectorAll(".price-tab");
const priceContents = document.querySelectorAll(".price-content");

priceTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        const selectedTabId = tab.dataset.tab;

        priceTabs.forEach((item) => {
            item.classList.remove("active");
        });

        priceContents.forEach((content) => {
            content.classList.remove("active");
        });

        tab.classList.add("active");

        const selectedContent = document.getElementById(selectedTabId);
        if (selectedContent) {
            selectedContent.classList.add("active");
        }
    });
});

// 4. FAQ
const faqItems = document.querySelectorAll(".faq__item");

faqItems.forEach((item) => {
    const question = item.querySelector(".faq__question");
    const answer = item.querySelector(".faq__answer");

    question.addEventListener("click", () => {
        const isActive = item.classList.contains("active");

        faqItems.forEach((otherItem) => {
            const otherAnswer = otherItem.querySelector(".faq__answer");
            otherItem.classList.remove("active");
            otherAnswer.style.maxHeight = null;
        });

        if (!isActive) {
            item.classList.add("active");
            answer.style.maxHeight = `${answer.scrollHeight}px`;
        }
    });
});

// 5. Год в подвале
const yearElement = document.getElementById("year");
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// 6. Плавное появление
const animatedElements = document.querySelectorAll(
    ".direction-card, .price-card, .coach-card, .advantage, .about__number-card, .feature-card, .format-card, .direction-detail, .step-card, .contact-card, .bonus-card, .birthday-card"
);

animatedElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(25px)";
    element.style.transition = "opacity 0.55s ease, transform 0.55s ease";
});

const observer = new IntersectionObserver(
    (entries, currentObserver) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                currentObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12 }
);

animatedElements.forEach((element) => {
    observer.observe(element);
});


// Быстрый выбор сценария на странице цен
document.querySelectorAll('[data-open-tab]').forEach(function(btn){btn.addEventListener('click',function(){const tab=document.querySelector('.price-tab[data-tab="'+this.dataset.openTab+'"]'); if(tab){tab.click(); document.getElementById(this.dataset.openTab).scrollIntoView({behavior:'smooth',block:'start'});}});});

// 7. Отправка форм в Битрикс24
const WEBHOOK_URL = 'https://b24-w67km1.bitrix24.ru/rest/1656/a02i07mkap0sddtq/crm.lead.add.json';

document.querySelectorAll('.ajax-form').forEach(function(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        e.stopPropagation();

        const nameInput = this.querySelector('input[name="name"]') || this.querySelector('input[placeholder*="Имя"]');
        const phoneInput = this.querySelector('input[name="phone"]') || this.querySelector('input[placeholder*="Телефон"]');
        const selectInput = this.querySelector('select[name="service"]');
        const textareaInput = this.querySelector('textarea[name="comment"]');
        const ageInput = this.querySelector('[name="age"]');
        const levelInput = this.querySelector('[name="level"]');
        const timeInput = this.querySelector('[name="time"]');
        const methodInput = this.querySelector('[name="contact_method"]');
        const sourceInput = this.querySelector('[name="source"]');

        const name = nameInput ? nameInput.value.trim() : '';
        const phone = phoneInput ? phoneInput.value.trim() : '';
        let service = '';
        if (selectInput && selectInput.selectedIndex > 0) {
            service = selectInput.options[selectInput.selectedIndex].text;
        }
        const comment = textareaInput ? textareaInput.value.trim() : '';
        const age = ageInput ? ageInput.value.trim() : '';
        const level = levelInput ? levelInput.value : '';
        const convenientTime = timeInput ? timeInput.value : '';
        const contactMethod = methodInput ? methodInput.value : ''; 
        const requestSource = sourceInput ? sourceInput.value.trim() : '';

        if (!phone) {
            alert('Пожалуйста, укажите номер телефона');
            return;
        }

        const title = name ? 'Заявка: ' + name : 'Заявка с сайта НА_ДИНАМО';
        let fullComment = '';
        if (name) fullComment += 'Имя: ' + name + '\n';
        fullComment += 'Телефон: ' + phone + '\n';
        if (service) fullComment += 'Услуга: ' + service + '\n';
        if (age) fullComment += 'Возраст: ' + age + '\n';
        if (level) fullComment += 'Уровень: ' + level + '\n';
        if (convenientTime) fullComment += 'Удобное время: ' + convenientTime + '\n';
        if (contactMethod) fullComment += 'Способ связи: ' + contactMethod + '\n';
        if (comment) fullComment += 'Комментарий: ' + comment + '\n';
        fullComment += '\n---\n';
        const params = new URLSearchParams(window.location.search);
        fullComment += 'Источник: ' + (requestSource || 'сайт') + '\n';
        fullComment += 'Страница: ' + window.location.href + '\n';
        ['utm_source','utm_medium','utm_campaign','utm_content','utm_term'].forEach(function(k){if(params.get(k)) fullComment += k + ': ' + params.get(k) + '\n';});
        fullComment += 'Дата: ' + new Date().toLocaleString('ru-RU');

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.textContent : '';
        if (submitBtn) {
            submitBtn.textContent = 'Отправка...';
            submitBtn.disabled = true;
        }

        const bitrixData = new FormData();
        bitrixData.append('fields[TITLE]', title);
        bitrixData.append('fields[NAME]', name || 'Не указано');
        bitrixData.append('fields[PHONE][0][VALUE]', phone);
        bitrixData.append('fields[PHONE][0][VALUE_TYPE]', 'WORK');
        bitrixData.append('fields[COMMENTS]', fullComment);
        bitrixData.append('fields[SOURCE_ID]', 'WEB');
        bitrixData.append('fields[SOURCE_DESCRIPTION]', 'Сайт НА_ДИНАМО');
        bitrixData.append('fields[UTM_SOURCE]', 'website');

        fetch(WEBHOOK_URL, {
            method: 'POST',
            body: bitrixData
        })
        .then(response => {
            if (!response.ok) throw new Error('Ошибка сети: ' + response.status);
            return response.json();
        })
        .then(data => {
            if (data.error) throw new Error(data.error_description || data.error);
            if (submitBtn) {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
            const modal = document.getElementById('successModal');
            if (modal) {
                modal.classList.add('active');
            } else {
                alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.');
            }
            form.reset();
        })
        .catch(error => {
            console.error('Ошибка отправки:', error);
            if (submitBtn) {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
            alert('Не удалось отправить заявку. Пожалуйста, позвоните по номеру 44-53-88.');
        });
    });
});

// 8. Закрытие модального окна
function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(function(modal) {
            modal.classList.remove('active');
        });
    }
});

// 9. Активный раздел меню
(function setActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav__link').forEach((link) => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });
})();

// 10. Таблицы цен превращаются в удобные карточки на телефоне
(function prepareResponsiveTables() {
    document.querySelectorAll('.price-table').forEach((table) => {
        const headings = Array.from(table.querySelectorAll('thead th')).map((th) => th.textContent.trim());
        table.querySelectorAll('tbody tr').forEach((row) => {
            Array.from(row.children).forEach((cell, index) => {
                cell.dataset.label = headings[index] || '';
            });
        });
    });
})();


// 10. Единая анкета: подстановка услуги, текста и источника из кнопок сайта
(function prefillQuestionnaireFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const requestedService = params.get('service');
    const requestedMessage = params.get('message');
    const requestedSource = params.get('source');
    if (!requestedService && !requestedMessage && !requestedSource) return;

    const form = document.querySelector('#contacts .ajax-form') || document.querySelector('.ajax-form');
    if (!form) return;

    const serviceSelect = form.querySelector('select[name="service"]');
    if (serviceSelect && requestedService) {
        const option = Array.from(serviceSelect.options).find((item) => item.text.trim() === requestedService.trim());
        if (option) serviceSelect.value = option.value || option.text;
    }

    const commentField = form.querySelector('textarea[name="comment"]');
    if (commentField && requestedMessage) commentField.value = requestedMessage;

    let sourceField = form.querySelector('input[name="source"]');
    if (!sourceField) {
        sourceField = document.createElement('input');
        sourceField.type = 'hidden';
        sourceField.name = 'source';
        form.appendChild(sourceField);
    }
    if (requestedSource) sourceField.value = requestedSource;

    requestAnimationFrame(() => {
        const contacts = document.getElementById('contacts');
        if (contacts) contacts.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
})();
