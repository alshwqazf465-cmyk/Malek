// ========== القائمة الجانبية ==========
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menu-toggle');
const mainContent = document.getElementById('main-content');
const scrollTopBtn = document.getElementById('scroll-top');

// فتح/إغلاق القائمة في الجوال
menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
});

// إغلاق القائمة عند النقر على رابط (في الجوال)
document.querySelectorAll('.chapter-list a').forEach(link => {
    link.addEventListener('click', () => {
        sidebar.classList.remove('open');
        // تحديث النشط
        document.querySelectorAll('.chapter-list li').forEach(li => li.classList.remove('active'));
        link.parentElement.classList.add('active');
    });
});

// إغلاق القائمة عند النقر خارجها (جوال)
mainContent.addEventListener('click', () => {
    sidebar.classList.remove('open');
});

// ========== زر العودة للأعلى ==========
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========== نسخ الأكواد ==========
function copyCode(button) {
    const codeBlock = button.closest('.code-block');
    const code = codeBlock.querySelector('pre').innerText;
    
    navigator.clipboard.writeText(code).then(() => {
        button.textContent = '✅ تم النسخ!';
        button.classList.add('copied');
        setTimeout(() => {
            button.textContent = '📋 نسخ';
            button.classList.remove('copied');
        }, 2000);
    }).catch(() => {
        button.textContent = '❌ فشل';
        setTimeout(() => {
            button.textContent = '📋 نسخ';
        }, 2000);
    });
}

// ========== بحث في القاموس ==========
const dictSearch = document.getElementById('dict-search');
if (dictSearch) {
    dictSearch.addEventListener('input', function() {
        const filter = this.value.toLowerCase();
        const rows = document.querySelectorAll('#dict-table tbody tr');
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(filter) ? '' : 'none';
        });
    });
}

// ========== تحديد الفصل النشط أثناء التمرير ==========
const chapters = document.querySelectorAll('.chapter');
const navLinks = document.querySelectorAll('.chapter-list a');

window.addEventListener('scroll', () => {
    let current = '';
    chapters.forEach(chapter => {
        const sectionTop = chapter.offsetTop;
        if (window.scrollY >= sectionTop - 150) {
            current = chapter.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.parentElement.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.parentElement.classList.add('active');
        }
    });
});

// ========== تحميل PDF (زر تحضيري) ==========
document.getElementById('download-pdf').addEventListener('click', () => {
    alert('🚀 ميزة تحميل PDF قادمة قريباً!\nحالياً يمكنك طباعة الصفحة من المتصفح (Ctrl+P) وحفظها كـ PDF.');
});
