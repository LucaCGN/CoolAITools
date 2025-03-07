// static/js/scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const sections = {
        'fact_check_content': document.getElementById('fact_check_content'),
        'topic_research_content': document.getElementById('topic_research_content'),
        'website_navigation_content': document.getElementById('website_navigation_content')
    };

    // Function to hide all sections
    function hideAllSections() {
        Object.values(sections).forEach(section => {
            if (section) {
                section.style.display = 'none';
            }
        });
    }

    // Function to show the target section and update active tab
    function showSection(targetSectionId) {
        hideAllSections();
        if (sections[targetSectionId]) {
            sections[targetSectionId].style.display = 'block';
        }

        // Update active tabs
        tabs.forEach(tab => tab.classList.toggle('active', tab.getAttribute('data-page') === targetSectionId));
    }

    // Initially, hide all sections except the one with 'active' tab
    const activeTab = document.querySelector('.tab.active');
    const activeSectionId = activeTab ? activeTab.getAttribute('data-page') : 'fact_check_content';
    showSection(activeSectionId);

    // Add click event listeners to tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetSectionId = tab.getAttribute('data-page');
            showSection(targetSectionId);
        });
    });

    // Add listeners for example buttons for each functionality
    addExampleButtonListeners();

    // Updated Selector (Correct)
    const dayNightButtons = document.querySelectorAll('.button-theme-toggle');

    /**
     * Function to set the theme and update the video source accordingly.
     * @param {boolean} isNight - True if night mode should be activated.
     */
    function setTheme(isNight) {
        document.body.classList.toggle('night-mode', isNight);
        dayNightButtons.forEach(btn => btn.textContent = isNight ? '🌙' : '☀️');
        setBackgroundVideo(isNight ? 'background_dark.mp4' : 'background_light.mp4');
        localStorage.setItem('theme', isNight ? 'night' : 'day');
    }

    /**
     * Function to update the background video source.
     * @param {string} videoFileName - The filename of the video to load.
     */
    function setBackgroundVideo(videoFileName) {
        const videoElement = document.getElementById('background-video');
        if (videoElement) {
            const sourceElement = videoElement.querySelector('source');
            if (sourceElement) {
                if (sourceElement.getAttribute('src') !== `/static/${videoFileName}`) {
                    sourceElement.setAttribute('src', `/static/${videoFileName}`);
                    videoElement.load(); // Reload the video with the new source
                }
            } else {
                console.error('Source element not found within the video element.');
            }
        } else {
            console.error('Background video element not found.');
        }
    }

    // Function to initialize theme based on localStorage
    function initializeTheme() {
        const savedTheme = localStorage.getItem('theme');
        setTheme(savedTheme === 'night');
    }

    // Initialize theme on page load
    initializeTheme();

    // Add click event listeners to all theme toggle buttons
    dayNightButtons.forEach(button => {
        button.addEventListener('click', () => {
            const isNight = !document.body.classList.contains('night-mode');
            setTheme(isNight);
        });
    });
});

/**
 * Function to add event listeners to example buttons.
 * Populates corresponding input fields with values from data attributes.
 */
function addExampleButtonListeners() {
    const exampleMappings = [
        {
            buttonSelector: '.example-button[data-fact_check_input]',
            inputSelectors: ['#fact_check_input'],
            attributeNames: ['data-fact_check_input']
        },
        {
            buttonSelector: '.example-button[data-topic_research_input]',
            inputSelectors: ['#topic_research_input', '#topic_research_focus'],
            attributeNames: ['data-topic_research_input', 'data-topic_research_focus']
        },
        {
            buttonSelector: '.example-button[data-website_navigation_url]',
            inputSelectors: ['#website_navigation_url', '#website_navigation_focus'],
            attributeNames: ['data-website_navigation_url', 'data-website_navigation_focus']
        }
    ];

    exampleMappings.forEach(mapping => {
        const buttons = document.querySelectorAll(mapping.buttonSelector);
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                try {
                    mapping.inputSelectors.forEach((selector, index) => {
                        const inputElement = document.querySelector(selector);
                        if (inputElement) {
                            let value = button.getAttribute(mapping.attributeNames[index]);

                            if (value) {
                                inputElement.value = value;
                                console.debug(`Set value of '${selector}' to '${value}'`);
                            } else {
                                console.warn(`Attribute '${mapping.attributeNames[index]}' is empty for button ID '${button.id}'`);
                            }
                        } else {
                            console.error(`Input element '${selector}' not found for button ID '${button.id}'`);
                        }
                    });
                } catch (error) {
                    console.error(`Error processing click event for button ID '${button.id}':`, error);
                }
            });
        });
    });
}

// scripts.js

/**
 * Utility function to get a cookie value by name.
 * @param {string} name - The name of the cookie.
 * @returns {string|null} - The value of the cookie or null if not found.
 */
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

/**
 * Function to retrieve the current language code.
 * Maps 'pt_BR' to 'pt', 'en_US' to 'en', etc.
 * Defaults to 'en' if not found or unsupported.
 * @returns {string} - The language code ('en', 'pt', 'es').
 */
function getCurrentLanguage() {
    const languageCookie = getCookie('language');
    if (!languageCookie) return 'en'; // Default to English

    // Mapping full language names or variants to supported codes
    const languageMap = {
        'en': 'en',
        'en_us': 'en',
        'pt': 'pt',
        'pt_br': 'pt',
        'es': 'es',
        'es_es': 'es',
        // Add more mappings if necessary
    };

    const langKey = languageCookie.toLowerCase();
    return languageMap[langKey] || 'en'; // Default to English if unsupported
}

// Expose the functions globally if needed
window.getCurrentLanguage = getCurrentLanguage;
