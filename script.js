/**
 * المنهج العملي الأسطوري لصيانة الهواتف
 * إعداد: مالك 🌹
 */

// ========== عناصر DOM ==========
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menu-toggle');
const mainContent = document.getElementById('main-content');
const scrollTopBtn = document.getElementById('scroll-top');
const chapterLinks = document.querySelectorAll('.chapter-list a');
const chapters = document.querySelectorAll('.chapter');

// ========== القائمة الجانبية (فتح/إغلاق) ==========
menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    sidebar.classList.toggle('open');
});

// إغلاق القائمة عند النقر على أي رابط
chapterLinks.forEach(link => {
    link.addEventListener('click', () => {
        sidebar.classList.remove('open');
        // تحديث العنصر النشط يدوياً
        document.querySelectorAll('.chapter-list li').forEach(li => li.classList.remove('active'));
        link.parentElement.classList.add('active');
    });
});

// إغلاق القائمة عند النقر خارجها (للموبايل)
mainContent.addEventListener('click', () => {
    if (window.innerWidth <= 900) {
        sidebar.classList.remove('open');
    }
});

// ========== زر العودة للأعلى ==========
function toggleScrollButton() {
    if (window.scrollY > 600) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
}

window.addEventListener('scroll', toggleScrollButton);
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========== نسخ الأكواد ==========
function copyCode(button) {
    const codeBlock = button.closest('.code-block');
    if (!codeBlock) return;

    const preElement = codeBlock.querySelector('pre');
    if (!preElement) return;

    const codeText = preElement.innerText;

    // استخدام Clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(codeText).then(() => {
            showCopied(button);
        }).catch(() => {
            fallbackCopy(button, codeText);
        });
    } else {
        fallbackCopy(button, codeText);
    }
}

function fallbackCopy(button, text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '-9999px';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
        document.execCommand('copy');
        showCopied(button);
    } catch (err) {
        button.textContent = '❌ فشل النسخ';
        setTimeout(() => { button.textContent = '📋 نسخ'; }, 2000);
    }
    document.body.removeChild(textarea);
}

function showCopied(button) {
    const originalText = button.textContent;
    button.textContent = '✅ تم النسخ!';
    button.classList.add('copied');
    setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('copied');
    }, 2000);
}

// تعريض الدالة globally
window.copyCode = copyCode;

// ========== تحديد الفصل النشط أثناء التمرير ==========
function updateActiveChapter() {
    let currentId = '';
    const scrollPosition = window.scrollY + 120;

    chapters.forEach(chapter => {
        const sectionTop = chapter.offsetTop;
        const sectionHeight = chapter.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentId = chapter.getAttribute('id');
        }
    });

    chapterLinks.forEach(link => {
        const li = link.parentElement;
        li.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentId) {
            li.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveChapter);

// ========== تحميل PDF ==========
document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.querySelector('.sidebar-footer .btn-pdf');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            alert('🚀 ميزة تحميل PDF قادمة قريباً!\nحالياً يمكنك طباعة الصفحة من المتصفح (Ctrl+P) وحفظها كـ PDF.');
        });
    }
});

// ========== تحسين تجربة البحث داخل الصفحة ==========
// Ctrl+F طبيعي يعمل في المتصفح، لكن نضيف تنبيه لطيف
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        setTimeout(() => {
            const searchInput = document.querySelector('input[type="search"], #dict-search');
            if (!searchInput) {
                // لا شيء، المتصفح يتولى البحث
            }
        }, 100);
    }
});

// ========== تهيئة أولية ==========
toggleScrollButton();
updateActiveChapter();

console.log('📱 المنهج العملي الأسطوري لصيانة الهواتف - جاهز!');
console.log('🌹 إعداد: مالك');
console.log('💡 جميع الأوامر مشروحة بالتفصيل داخل كل فصل.');
