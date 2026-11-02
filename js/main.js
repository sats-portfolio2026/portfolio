



document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('js-hamburger');
    const nav = document.getElementById('js-nav');

    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
        });

        // メニュー内のリンクをクリックしたときの処理
        document.querySelectorAll('.nav a').forEach(link => {
            link.addEventListener('click', (e) => {
                hamburger.classList.remove('active');
                nav.classList.remove('active');

                // ページ内リンク（#で始まるもの）の場合のスムーズスクロール対応
                const href = link.getAttribute('href');
                if (href.startsWith('#') && href.length > 1) {
                    e.preventDefault();
                    const targetElement = document.querySelector(href);
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
});





document.querySelectorAll(".works-link").forEach(button => {
    button.addEventListener("click", () => {
        const item = button.closest(".works-item");
        item.classList.toggle("is-open");
    });
});





// 画像ポップアップ
const imageModal = document.getElementById('js-image-modal');
const imageModalImg = document.getElementById('js-image-modal-img');

document.querySelectorAll('.works-image-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
        imageModalImg.src = trigger.dataset.image;
        imageModalImg.alt = trigger.dataset.alt || '';
        imageModal.classList.add('is-open');
        imageModal.setAttribute('aria-hidden', 'false');
    });
});

document.querySelectorAll('[data-modal-close]').forEach(el => {
    el.addEventListener('click', () => {
        imageModal.classList.remove('is-open');
        imageModal.setAttribute('aria-hidden', 'true');
        imageModalImg.src = '';
    });
});

// Escキーでも閉じられるように
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && imageModal.classList.contains('is-open')) {
        imageModal.classList.remove('is-open');
        imageModal.setAttribute('aria-hidden', 'true');
        imageModalImg.src = '';
    }
});
