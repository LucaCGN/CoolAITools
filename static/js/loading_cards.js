// ============================
/* loading_cards.js */
// ============================

/**
 * LoadingCards Module
 * Manages the creation and animation of loading cards with controlled animations.
 */
const LoadingCards = (function() {
    /**
     * Creates and displays loading cards within the specified container.
     * @param {HTMLElement} container - The DOM element where loading cards will be appended.
     * @param {number} totalCount - Total number of loading cards to display.
     * @param {number} animatedCount - Number of cards to animate simultaneously (1 or 2).
     * @param {function} onComplete - Callback when all animated cards are loaded.
     */
    function showLoading(container, totalCount = 3, animatedCount = 1, onComplete = null) {
        // Clear any existing loading cards
        container.innerHTML = '';

        // Create a container for loading cards
        const loadingCardsContainer = document.createElement('div');
        loadingCardsContainer.classList.add('loading-cards-container');
        container.appendChild(loadingCardsContainer);

        let loadedCount = 0;

        for (let i = 0; i < totalCount; i++) {
            setTimeout(() => {
                const loadingCard = document.createElement('div');
                loadingCard.classList.add('loading-card');

                // Determine if the card should be animated
                if (i < animatedCount) {
                    loadingCard.classList.add('animated');

                    const shimmer = document.createElement('div');
                    shimmer.classList.add('loading-shimmer', 'swipe-animation');
                    loadingCard.appendChild(shimmer);
                } else {
                    // Static card with no shimmer
                    loadingCard.classList.add('static');
                }

                loadingCardsContainer.appendChild(loadingCard);

                loadedCount++;
                if (loadedCount === totalCount && onComplete) {
                    onComplete();
                }
            }, i * 5000); // Delay each card by i * 3000 milliseconds
        }
    }

    /**
     * Updates the loading cards by adding a static card once an animated card is present.
     * This ensures that only a specified number of cards remain animated.
     * @param {HTMLElement} container - The DOM element containing loading cards.
     * @param {number} animatedCount - Number of cards to animate simultaneously.
     */
    function updateLoading(container, animatedCount = 1) {
        const loadingCardsContainer = container.querySelector('.loading-cards-container');
        if (!loadingCardsContainer) return;

        const loadingCards = loadingCardsContainer.querySelectorAll('.loading-card.animated');
        loadingCards.forEach((card, index) => {
            if (index >= animatedCount) {
                card.classList.remove('animated');
                card.classList.add('static-blue');

                const shimmer = card.querySelector('.loading-shimmer');
                if (shimmer) {
                    shimmer.classList.remove('swipe-animation');
                    shimmer.classList.add('static-blue');
                }
            }
        });
    }

    /**
     * Removes all loading cards from the specified container.
     * @param {HTMLElement} container - The DOM element from which loading cards will be removed.
     */
    function removeLoading(container) {
        container.innerHTML = '';
    }

    return {
        showLoading,
        updateLoading,
        removeLoading
    };
})();

// Attach to window for global access
window.LoadingCards = LoadingCards;
