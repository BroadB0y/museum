// Массив изображений для виртуального тура
const tourImages = [
    {
        url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5',
        description: 'Зал современного искусства с интерактивными инсталляциями.'
    },
    {
        url: 'https://images.unsplash.com/photo-1736080987854-4b2a5551f716?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Зал классической живописи XVII-XIX веков.'
    },
    {
        url: 'https://images.unsplash.com/photo-1685042411757-b2310e8d0707?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Зал современной скульптуры с интерактивными композициями.'
    }
];

let currentImageIndex = 0;

// Функция для обновления изображения и описания
function updateTourView(direction) {
    const currentImage = document.querySelector('.tour-view img.active');
    const nextImage = document.querySelector('.tour-view img:not(.active)');
    const roomDescription = document.getElementById('room-description');
    
    if (currentImage && nextImage && roomDescription) {
        // Обновляем следующее изображение
        nextImage.src = tourImages[currentImageIndex].url;
        roomDescription.textContent = tourImages[currentImageIndex].description;
        
        // Добавляем классы для анимации
        currentImage.classList.add(direction === 'next' ? 'slide-left' : 'slide-right');
        nextImage.classList.add('active');
        
        // После завершения анимации
        setTimeout(() => {
            currentImage.classList.remove('active', 'slide-left', 'slide-right');
            nextImage.classList.remove('slide-left', 'slide-right');
        }, 500);
    }
}

// Обработчики событий для кнопок навигации
document.addEventListener('DOMContentLoaded', () => {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + tourImages.length) % tourImages.length;
            updateTourView('prev');
        });

        nextBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % tourImages.length;
            updateTourView('next');
        });
    }
});

// Анимация появления карточек выставок
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.exhibition-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
});

// Обработка переходов между страницами
document.addEventListener('DOMContentLoaded', () => {
    const pageTransition = document.querySelector('.page-transition');
    const navLinks = document.querySelectorAll('nav a[data-page]');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = link.getAttribute('data-page');
            
            // Активируем анимацию перехода
            pageTransition.classList.add('active');
            
            // После завершения анимации перехода
            setTimeout(() => {
                window.location.href = link.href;
            }, 500);
        });
    });
}); 