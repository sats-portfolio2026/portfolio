


document.addEventListener('DOMContentLoaded', () => {

    /* ------------------------------------------------------------------ */
    /* ハンバーガーメニュー（全ページ共通）                                  */
    /* ------------------------------------------------------------------ */

    const hamburger = document.getElementById('js-hamburger');
    const nav = document.getElementById('js-nav');

    if (hamburger && nav) {

        const closeMenu = () => {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        };

        hamburger.addEventListener('click', () => {
            const isOpen = hamburger.classList.toggle('active');
            nav.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', String(isOpen));
        });

        // ナビ内のリンクをクリックしたらメニューを閉じる（スマホ表示時）
        nav.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', closeMenu);
        });

        // Escキーで閉じる
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeMenu();
            }
        });
    }


    /* ------------------------------------------------------------------ */
    /* WORKS: カテゴリー絞り込みフィルター                                   */
    /* ------------------------------------------------------------------ */

    const filterButtons = document.querySelectorAll('.works-filter button');
    const workItems = document.querySelectorAll('.works-grid .work-item');

    if (filterButtons.length && workItems.length) {

        filterButtons.forEach((button) => {
            button.addEventListener('click', () => {

                const target = button.dataset.filter || 'all';

                filterButtons.forEach((b) => b.classList.remove('active'));
                button.classList.add('active');

                workItems.forEach((item) => {
                    const category = item.dataset.category;
                    const shouldShow = target === 'all' || category === target;
                    item.classList.toggle('is-filtered-out', !shouldShow);
                });
            });
        });
    }


    /* ------------------------------------------------------------------ */
    /* NEWS: アコーディオンの開閉                                            */
    /* ------------------------------------------------------------------ */

    const accordionItems = document.querySelectorAll('.news-accordion-item');

    accordionItems.forEach((item) => {
        const button = item.querySelector('.news-accordion-button');
        if (!button) return;

        button.addEventListener('click', () => {
            const isOpen = item.classList.toggle('is-open');
            button.setAttribute('aria-expanded', String(isOpen));
        });
    });


    /* ------------------------------------------------------------------ */
    /* NEXTセクションなど：左→右のスライドイン表示                            */
    /* ------------------------------------------------------------------ */

    const revealSlideItems = document.querySelectorAll('.reveal-slide');

    if (revealSlideItems.length && 'IntersectionObserver' in window) {

        const slideObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.4
        });

        revealSlideItems.forEach((item) => slideObserver.observe(item));

    } else {
        revealSlideItems.forEach((item) => item.classList.add('is-visible'));
    }


    /* ------------------------------------------------------------------ */
    /* ABOUT: PHILOSOPHYカードのスクロール表示アニメーション                  */
    /* ------------------------------------------------------------------ */

    const philosophyItems = document.querySelectorAll('.philosophy-item');

    if (philosophyItems.length && 'IntersectionObserver' in window) {

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3
        });

        philosophyItems.forEach((item) => observer.observe(item));

    } else {
        // IntersectionObserver未対応環境では最初から表示しておく
        philosophyItems.forEach((item) => item.classList.add('is-visible'));
    }

});
