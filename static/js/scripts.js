// ============================
/* scripts.js */
// ============================

/**
 * Function to populate input fields with example suggestions.
 * @param {string} inputId - The ID of the input field.
 * @param {string} value - The value to populate.
 */
function populateInput(inputId, value) {
    const inputElement = document.getElementById(inputId);
    if (inputElement) {
        inputElement.value = value;
    } else {
        console.warn(`Input element with ID "${inputId}" not found.`);
    }
}

/**
 * Tab Switching Logic
 * Handles the activation of tabs and displays the corresponding content areas.
 */
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const contents = {
        'fact_check_tab': document.getElementById('fact_check_content'),
        'topic_research_tab': document.getElementById('topic_research_content'),
        'website_navigation_tab': document.getElementById('website_navigation_content')
    };

    // Hide all content areas except the first one
    for (let key in contents) {
        if (contents[key]) {
            contents[key].style.display = 'none';
        }
    }
    // Show the first tab's content by default
    const firstTabId = tabs[0].id;
    contents[firstTabId].style.display = 'block';
    tabs[0].classList.add('active');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove 'active' class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Hide all content areas
            for (let key in contents) {
                if (contents[key]) {
                    contents[key].style.display = 'none';
                }
            }
            // Add 'active' class to the clicked tab
            tab.classList.add('active');
            // Show the corresponding content area
            if (contents[tab.id]) {
                contents[tab.id].style.display = 'block';
                // Dispatch a custom event to notify that the tab is shown
                const event = new Event('tabShown');
                contents[tab.id].dispatchEvent(event);
            }
        });
    });
});
