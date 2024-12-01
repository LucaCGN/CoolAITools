/**
 * Function to populate input fields with example suggestions.
 * @param {Object} inputs - An object where keys are input IDs and values are the values to populate.
 */
function populateInputs(inputs) {
    for (const [inputId, value] of Object.entries(inputs)) {
        const inputElement = document.getElementById(inputId);
        if (inputElement) {
            inputElement.value = value;
        } else {
            console.warn(`Input element with ID "${inputId}" not found.`);
        }
    }
}

/**
 * Tab Switching Logic
 * Manages the activation of tabs and displays the corresponding sections.
 */
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    // Sections corresponding to each functionality
    const sections = {
        'fact_check_content': document.getElementById('fact_check_content'),
        'topic_research_content': document.getElementById('topic_research_content'),
        'website_navigation_content': document.getElementById('website_navigation_content')
    };

    // Function to hide all sections
    function hideAllSections() {
        for (let key in sections) {
            if (sections[key]) {
                sections[key].style.display = 'none';
            }
        }
    }

    // Initially, hide all sections except the one with 'active' tab
    const activeTab = document.querySelector('.tab.active');
    const activeSectionId = activeTab ? activeTab.getAttribute('data-page') : 'fact_check_content';
    hideAllSections();
    if (sections[activeSectionId]) {
        sections[activeSectionId].style.display = 'block';
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Get the target section ID from data-page attribute
            const targetSectionId = tab.getAttribute('data-page');

            // Hide all sections
            hideAllSections();

            // Show the target section
            if (sections[targetSectionId]) {
                sections[targetSectionId].style.display = 'block';
            }

            // Update active tabs
            tabs.forEach(t => {
                if (t.getAttribute('data-page') === targetSectionId) {
                    t.classList.add('active');
                } else {
                    t.classList.remove('active');
                }
            });
        });
    });

    // Add listeners for example buttons for each functionality
    addExampleButtonListeners();

    // Day/Night Mode Toggle
    const dayNightButton = document.getElementById('toggle-day-night');
    if (dayNightButton) {
        dayNightButton.addEventListener('click', () => {
            // Toggle day/night mode
            document.body.classList.toggle('night-mode');
            // Change button icon
            if (document.body.classList.contains('night-mode')) {
                dayNightButton.textContent = '🌙';
            } else {
                dayNightButton.textContent = '☀️';
            }
        });
    }
});

/**
 * Function to add event listeners to example buttons.
 * Populates corresponding input fields with values from data attributes.
 */
function addExampleButtonListeners() {
    // Fact Checking
    const factCheckButtons = document.querySelectorAll('.example-button[data-fact_check_input]');
    factCheckButtons.forEach(button => {
        button.addEventListener('click', () => {
            const input = button.getAttribute('data-fact_check_input');
            const inputElement = document.getElementById('fact_check_input');
            if (inputElement) {
                inputElement.value = input;
            }
        });
    }); 

    // Topic Research
    const topicResearchButtons = document.querySelectorAll('.example-button[data-topic_research_input]');
    topicResearchButtons.forEach(button => {
        button.addEventListener('click', () => {
            const input = button.getAttribute('data-topic_research_input');
            const focus = button.getAttribute('data-topic_research_focus') || '';
            const inputElement = document.getElementById('topic_research_input');
            const focusElement = document.getElementById('topic_research_focus');
            if (inputElement) {
                inputElement.value = input;
            }
            if (focusElement) {
                focusElement.value = focus;
            }
        });
    });

    // Website Navigation
    const websiteNavigationButtons = document.querySelectorAll('.example-button[data-website_navigation_url]');
    websiteNavigationButtons.forEach(button => {
        button.addEventListener('click', () => {
            const url = button.getAttribute('data-website_navigation_url');
            const focus = button.getAttribute('data-website_navigation_focus') || '';
            const urlElement = document.getElementById('website_navigation_url');
            const focusElement = document.getElementById('website_navigation_focus');
            if (urlElement) {
                urlElement.value = url;
            }
            if (focusElement) {
                focusElement.value = focus;
            }
        });
    });
}
