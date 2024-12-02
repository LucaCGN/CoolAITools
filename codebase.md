## base.html
```python
<!DOCTYPE html>
<html lang="{{ request.state.get_locale() }}">
<head>
    <meta charset="UTF-8">
    <title>{{ _('🤖 Cool AI Tools - Simple AI for Everyone 🚀') }}</title>

    <!-- Include Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&family=Raleway:wght@400;500;700&family=Montserrat:wght@700&display=swap" rel="stylesheet">

    <!-- Modular CSS Files -->
    <link rel="stylesheet" href="{{ url_for('static', path='css/general.css') }}">
    <link rel="stylesheet" href="{{ url_for('static', path='css/header_web.css') }}">
    <link rel="stylesheet" href="{{ url_for('static', path='css/header_mobile.css') }}">
    <link rel="stylesheet" href="{{ url_for('static', path='css/header_shared.css') }}">
    <link rel="stylesheet" href="{{ url_for('static', path='css/container.css') }}">
    <link rel="stylesheet" href="{{ url_for('static', path='css/footer.css') }}">

    <!-- Loading Styles -->
    <link rel="stylesheet" href="{{ url_for('static', path='css/loading.css') }}">
    <!-- Page-Specific Styles -->
    <link rel="stylesheet" href="{{ url_for('static', path='css/verify.css') }}">
    <link rel="stylesheet" href="{{ url_for('static', path='css/topic_research.css') }}">
    <link rel="stylesheet" href="{{ url_for('static', path='css/website_navigation.css') }}">
</head>
<body>

    <!-- Background Video -->
    <video id="background-video" class="video-background" autoplay loop muted playsinline>
        <source src="{{ url_for('static', path='background_light.mp4') }}" type="video/mp4">
        {{ _('Your browser does not support the video tag.') }}
    </video>

    <!-- Mobile Header -->
    <header class="header mobile-header">
        <div class="header-container">
            <!-- Single Row: Logo + Title + Buttons -->
            <div class="header-row">
                <!-- Logo Container -->
                <div class="logo-container">
                    <!-- Outer Gear (Spins Anticlockwise) -->
                    <img src="{{ url_for('static', path='logos/cait_logo_outer.png') }}" alt="{{ _('Outer Gear Logo') }}" class="logo outer-logo">
                    
                    <!-- Inner Gear (Spins Clockwise) -->
                    <img src="{{ url_for('static', path='logos/cait_logo_inner.png') }}" alt="{{ _('Inner Gear Logo') }}" class="logo inner-logo">
                </div>
                <!-- Title Container -->
                <div class="title-container">
                    <h1 class="title">{{ _('Cool AI Tools') }}</h1>
                </div>
                <!-- Buttons -->
                <div class="button-container">
                    <!-- Language Toggle -->
                    <form action="/set_language" method="post" class="language-form">
                        <input type="hidden" name="language" value="{% if request.cookies.get('language', 'en') == 'en' %}pt_BR{% else %}en{% endif %}">
                        <button type="submit" class="button-language">
                            {% if request.cookies.get('language', 'en') == 'en' %}
                                PT
                            {% else %}
                                EN
                            {% endif %}
                        </button>
                    </form>

                    <!-- Theme Toggle -->
                    <button class="button-theme-toggle" id="toggle-day-night">☀️</button>

                    <!-- Credits -->
                    <button class="button-credits">
                        {{ _('Credits') }}: <span class="badge">0</span>
                    </button>

                    <!-- Learn More -->
                    <button class="button-learn-more">{{ _('Learn More') }}</button>
                </div>
            </div>
        </div>
    </header>

    <!-- Desktop Header -->
    <header class="header desktop-header">
        <div class="container header-container">
            <!-- Logo Container -->
            <div class="logo-container">
                <!-- Outer Gear (Spins Anticlockwise) -->
                <img src="{{ url_for('static', path='logos/cait_logo_outer.png') }}" alt="{{ _('Outer Gear Logo') }}" class="logo outer-logo">
                
                <!-- Inner Gear (Spins Clockwise) -->
                <img src="{{ url_for('static', path='logos/cait_logo_inner.png') }}" alt="{{ _('Inner Gear Logo') }}" class="logo inner-logo">
            </div>

            <!-- Info Container -->
            <div class="info-container">
                <div class="title">{{ _('Cool AI Tools') }}</div>
                <p class="message">{{ _('Simple AI Tools for everyone.') }}</p>
                <p class="message">{{ _('A step in the open-sourcing mission.') }}</p>
            </div>

            <!-- Menu Container -->
            <div class="menu-container">
                <div class="menu-buttons">
                    <div class="top-buttons">
                        <form action="/set_language" method="post">
                            <input type="hidden" name="language" value="{% if request.cookies.get('language', 'en') == 'en' %}pt_BR{% else %}en{% endif %}">
                            <button type="submit" class="button-language">
                                {% if request.cookies.get('language', 'en') == 'en' %}
                                    PT
                                {% else %}
                                    EN
                                {% endif %}
                            </button>
                        </form>
                        <button class="button-theme-toggle" id="toggle-day-night">☀️</button>
                    </div>
                    <button class="button-credits">
                        {{ _('Credits') }}: <span class="badge">0</span>
                    </button>
                    <button class="button-learn-more">{{ _('Learn More') }}</button>
                </div>
            </div>
        </div>
    </header>

    <!-- Flex Container Wrapper -->
    <div class="flex-container">
        <!-- Main Content Wrapper -->
        <main class="wrapper">
            <div class="container">
                <!-- Tabs for Different Functionalities -->
                <div class="tabs">
                    <div class="tab active" id="fact_check_tab" data-page="fact_check_content">
                        🧐 {{ _('Fact Checking') }}
                    </div>
                    <div class="tab" id="topic_research_tab" data-page="topic_research_content">
                        📚 {{ _('Topic Research') }}
                    </div>
                    <div class="tab" id="website_navigation_tab" data-page="website_navigation_content">
                        🧙 {{ _('Website Navigation') }}
                    </div>
                </div>

                <!-- Content Areas -->
                <!-- Fact Checking Content -->
                <div class="content-area" id="fact_check_content">
                    <h2 class="section-header">{{ _('Fact Checking') }}</h2>

                    <!-- Example Buttons -->
                    <div class="example-grid">
                        <div id="example1_fact_check" class="example-button" 
                            data-fact_check_input="{{ _('Health benefits of intermittent fasting') | e }}">
                            {{ _('Health benefits of intermittent fasting') }}
                        </div>
                        <div id="example2_fact_check" class="example-button" 
                            data-fact_check_input="{{ _('Impact of social media on mental health') | e }}">
                            {{ _('Impact of social media on mental health') }}
                        </div>
                        <div id="example3_fact_check" class="example-button" 
                            data-fact_check_input="{{ _('Is electric car adoption growing rapidly?') | e }}">
                            {{ _('Is electric car adoption growing rapidly?') }}
                        </div>
                        <div id="example4_fact_check" class="example-button" 
                            data-fact_check_input="{{ _('Do video games improve cognitive skills?') | e }}">
                            {{ _('Do video games improve cognitive skills?') }}
                        </div>
                    </div>

                    <!-- Input Group -->
                    <div class="input-group">
                        <input type="text" id="fact_check_input" placeholder="{{ _('🖊 Enter a claim you need to verify') | e }}" required>
                        <button type="button" id="fact_run_button" class="toggle-button">
                            {{ _('🚀 Run Specialized AI Team 🚀') }}
                        </button>
                    </div>

                    <!-- Output Container -->
                    <div id="fact_output_container"></div>
                </div>


                <!-- Topic Research Content -->
                <div class="content-area" id="topic_research_content" style="display: none;">
                    <h2 class="section-header">{{ _('Topic Research') }}</h2>

                    <!-- Example Buttons -->
                    <div class="example-grid">
                        <div id="example1_topic_research" class="example-button" 
                            data-topic_research_input="{{ _('Machine Learning') | e }}" 
                            data-topic_research_focus="">
                            {{ _('Learn about Machine Learning') }}
                        </div>
                        <div id="example2_topic_research" class="example-button" 
                            data-topic_research_input="{{ _('Renewable Energy') | e }}" 
                            data-topic_research_focus="{{ _('Latest trends') | e }}">
                            {{ _('Latest trends in Renewable Energy') }}
                        </div>
                        <div id="example3_topic_research" class="example-button" 
                            data-topic_research_input="{{ _('Meditation') | e }}" 
                            data-topic_research_focus="{{ _('Beginner\'s guide') | e }}">
                            {{ _("Beginner's guide to Meditation") }}
                        </div>
                        <div id="example4_topic_research" class="example-button" 
                            data-topic_research_input="{{ _('Space Exploration') | e }}" 
                            data-topic_research_focus="{{ _('Advancements') | e }}">
                            {{ _('Advancements in Space Exploration') }}
                        </div>
                    </div>

                    <!-- Input Group -->
                    <div class="input-group">
                        <input type="text" id="topic_research_input" placeholder="{{ _('📚 Enter your topic of research') | e }}" required>
                        <input type="text" id="topic_research_focus" placeholder="{{ _('🎯 Focus Area (Optional)') | e }}" style="margin-top: 10px;">
                        <button type="button" id="topic_run_button" class="toggle-button">
                            {{ _('🚀 Run Specialized AI Team 🚀') }}
                        </button>
                    </div>

                    <!-- Output Container -->
                    <div id="topic_output_container"></div>
                </div>


                <!-- Website Navigation Content -->
                <div class="content-area" id="website_navigation_content" style="display: none;">
                    <h2 class="section-header">{{ _('Website Navigation') }}</h2>

                    <!-- Example Buttons -->
                    <div class="example-grid">
                        <div id="example1_website_navigation" class="example-button" 
                            data-website_navigation_url="https://www.theverge.com" 
                            data-website_navigation_focus="{{ _('Latest Tech News') | e }}">
                            {{ _('Latest Tech News on The Verge') }}
                        </div>
                        <div id="example2_website_navigation" class="example-button" 
                            data-website_navigation_url="https://www.foodnetwork.com" 
                            data-website_navigation_focus="{{ _('Healthy Recipes') | e }}">
                            {{ _('Healthy Recipes on Food Network') }}
                        </div>
                        <div id="example3_website_navigation" class="example-button" 
                            data-website_navigation_url="https://www.lonelyplanet.com" 
                            data-website_navigation_focus="{{ _('Travel Guides') | e }}">
                            {{ _('Travel Guides on Lonely Planet') }}
                        </div>
                        <div id="example4_website_navigation" class="example-button" 
                            data-website_navigation_url="https://www.investopedia.com" 
                            data-website_navigation_focus="{{ _('Investment Tips') | e }}">
                            {{ _('Investment Tips on Investopedia') }}
                        </div>
                    </div>

                    <!-- Input Group -->
                    <div class="input-group">
                        <input type="text" id="website_navigation_url" placeholder="{{ _('🌐 URL or Domain to Navigate') | e }}" required>
                        <input type="text" id="website_navigation_focus" placeholder="{{ _('🎯 Topic of Focus (Optional)') | e }}" style="margin-top: 10px;">
                        <button type="button" id="website_run_button" class="toggle-button">
                            {{ _('🚀 Run Specialized AI Team 🚀') }}
                        </button>
                    </div>

                    <!-- Output Container -->
                    <div id="website_output_container"></div>
                </div>
            </div>
        </main>

        <!-- Footer -->
        <footer class="footer">
            <div class="footer-container">
                 <!-- Branding Section -->
                 <div class="footer-section branding">
                    <p>&copy; 2024 Cool AI Tools. All rights reserved.</p>
                </div>               
                <!-- Logos Section -->
                <div class="footer-section logos">
                    <!-- Five logos with links -->
                    <a href="https://github.com/crewAIInc/crewAI" target="_blank" rel="noopener noreferrer" aria-label="CrewAI">
                        <img src="{{ url_for('static', path='logos/crewai_logo.png') }}" alt="CrewAI Logo">
                    </a>
                    <a href="https://jina.ai" target="_blank" rel="noopener noreferrer" aria-label="Jina AI">
                        <img src="{{ url_for('static', path='logos/jina_ai_logo.png') }}" alt="Jina AI Logo">
                    </a>
                    <a href="mailto:your_email@example.com" aria-label="Send us an Email">
                        <img src="{{ url_for('static', path='logos/email_logo.png') }}" alt="Email Logo">
                    </a>
                    <a href="https://www.linkedin.com/in/luca-nonino-72196893" target="_blank" rel="noopener noreferrer" aria-label="Follow us on LinkedIn">
                        <img src="{{ url_for('static', path='logos/linkedin_logo.png') }}" alt="LinkedIn Logo">
                    </a>
                    <a href="https://github.com/LucaCGN/CoolAITools" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <img src="{{ url_for('static', path='logos/github_logo.png') }}" alt="GitHub Logo">
                    </a>
                </div>
            </div>
        </footer>
    </div> <!-- End of Flex Container Wrapper -->

    <!-- Include External JavaScript -->
    <script src="{{ url_for('static', path='js/loading_cards.js') }}"></script>
    <script src="{{ url_for('static', path='js/scripts.js') }}"></script>

    <!-- Functionality Scripts -->
    <!-- Fact Checking Scripts -->
    <script src="{{ url_for('static', path='js/verify_display.js') }}"></script>
    <script src="{{ url_for('static', path='js/verify_download.js') }}"></script>

    <!-- Topic Research Scripts -->
    <script src="{{ url_for('static', path='js/topic_research_display.js') }}"></script>
    <script src="{{ url_for('static', path='js/topic_research_download.js') }}"></script>

    <!-- Website Navigation Scripts -->
    <script src="{{ url_for('static', path='js/website_navigation_display.js') }}"></script>
    <script src="{{ url_for('static', path='js/website_navigation_download.js') }}"></script>
</body>
</html>

```

## scripts.js
```python
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

```

## loading_cards.js
```python
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

```

## topic_research_display.js
```python
// static/js/topic_research_display.js

const TopicResearchDisplayModule = (function() {
    // Define States
    const STATES = {
        IDLE: 'idle',
        PREPARING_CREW: 'preparingCrew',
        LOADING_CARDS: 'loadingCards',
        PREPARING_REPORT: 'preparingReport',
        REPORT_READY: 'reportReady',
        ERROR: 'error'
    };

    let currentState = STATES.IDLE;
    const runButton = document.getElementById('topic_run_button');
    const outputContainer = document.getElementById('topic_output_container');

    // State variable to store JSON data
    window.topicResearchReportData = null;

    runButton.addEventListener('click', handleRunButtonClick);

    function handleRunButtonClick() {
        // Clear output and reset state
        outputContainer.innerHTML = '';
        currentState = STATES.IDLE;

        const topicInput = document.getElementById('topic_research_input').value.trim();
        const focusInput = document.getElementById('topic_research_focus').value.trim();

        if (!topicInput) {
            alert("Please enter a topic for research.");
            return;
        }

        transitionState(STATES.PREPARING_CREW);
        showSpinner("Preparing crew...");

        // Fetch planning texts from the backend
        fetch('/topic_research/planning', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ topic: topicInput, focus: focusInput }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                transitionState(STATES.ERROR, data.error);
                return;
            }

            transitionState(STATES.LOADING_CARDS);
            hideSpinner();
            startLoadingCards(data.thought_process);
        })
        .catch(error => {
            console.error('Error:', error);
            transitionState(STATES.ERROR, "An error occurred while preparing the crew.");
        });
    }

    function transitionState(newState, errorMessage = '') {
        currentState = newState;
        if (newState === STATES.ERROR) {
            showError(errorMessage);
        }
    }

    function showSpinner(message) {
        outputContainer.innerHTML = `
            <div class="spinner-container">
                <div class="spinner"></div>
                <div class="spinner-text">${message}</div>
            </div>
        `;
    }

    function hideSpinner() {
        outputContainer.innerHTML = '';
    }

    function startLoadingCards(planningTexts) {
        const loadingCardsContainer = document.createElement('div');
        loadingCardsContainer.classList.add('loading-cards-container');
        outputContainer.appendChild(loadingCardsContainer);

        let index = 0;
        let previousCurrentCard = null;

        function addNextCard() {
            if (index >= planningTexts.length) {
                // All cards added, prepare report
                transitionState(STATES.PREPARING_REPORT);
                showSpinner("Preparing report...");
                setTimeout(() => {
                    fetchReport();
                }, 3000); // Reduced delay to 3 seconds
                return;
            }

            // Update the previous current-step card to stacked
            if (previousCurrentCard) {
                previousCurrentCard.classList.remove('current-step');
                previousCurrentCard.classList.add('stacked');
            }

            const cardText = planningTexts[index];
            const card = createLoadingCard(cardText, true);
            loadingCardsContainer.appendChild(card);

            // Update the reference to the current card
            previousCurrentCard = card;

            index++;
            setTimeout(addNextCard, 3000); // Reduced delay to 3 seconds
        }

        addNextCard();
    }

    function createLoadingCard(text, isCurrentStep) {
        const card = document.createElement('div');
        card.classList.add('loading-card');
        card.classList.add(isCurrentStep ? 'current-step' : 'stacked');

        const cardContent = document.createElement('div');
        cardContent.classList.add('card-content');
        cardContent.textContent = text;

        card.appendChild(cardContent);
        return card;
    }

    function fetchReport() {
        const topicInput = document.getElementById('topic_research_input').value.trim();
        const focusInput = document.getElementById('topic_research_focus').value.trim();
        fetch('/topic_research/report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ topic: topicInput, focus: focusInput }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                transitionState(STATES.ERROR, data.error);
                return;
            }
            // Store JSON data in state variable
            window.topicResearchReportData = data;
            transitionState(STATES.REPORT_READY);
            hideSpinner();
            displayReport(data);
        })
        .catch(error => {
            console.error('Error:', error);
            transitionState(STATES.ERROR, "An error occurred while preparing the report.");
        });
    }

    function displayReport(data) {
        // Clear the output container
        outputContainer.innerHTML = '';

        // Create Report Card
        const reportCard = document.createElement('div');
        reportCard.classList.add('report-card');

        // Report Header
        const reportHeader = document.createElement('div');
        reportHeader.classList.add('report-header');

        // Container for Title and Buttons
        const headerLeft = document.createElement('div');
        headerLeft.classList.add('header-left');

        const reportTitle = document.createElement('div');
        reportTitle.classList.add('report-title');
        reportTitle.innerHTML = `<span class="claim-icon">📚</span> ${data.report_title || 'Topic Research Report'}`;

        headerLeft.appendChild(reportTitle);

        // Container for Action Buttons
        const actionButtons = document.createElement('div');
        actionButtons.classList.add('action-buttons');

        // Create Download Button
        const downloadButton = document.createElement('button');
        downloadButton.classList.add('download-button');
        downloadButton.textContent = 'Download';
        downloadButton.addEventListener('click', () => {
            if (typeof downloadReport === 'function') {
                downloadReport();
            } else {
                console.error('Download function not found.');
            }
        });

        // Create Copy Button
        const copyButton = document.createElement('button');
        copyButton.classList.add('copy-button');
        copyButton.textContent = 'Copy';
        copyButton.addEventListener('click', () => {
            if (typeof copyReportToClipboard === 'function') {
                copyReportToClipboard();
            } else {
                console.error('Copy function not found.');
            }
        });

        actionButtons.appendChild(downloadButton);
        actionButtons.appendChild(copyButton);

        // Append title and buttons to reportHeader
        reportHeader.appendChild(headerLeft);
        reportHeader.appendChild(actionButtons);

        // Append report header to report card
        reportCard.appendChild(reportHeader);

        // Create Summary Card
        const summaryCard = document.createElement('div');
        summaryCard.classList.add('summary-card');

        const summaryTitle = document.createElement('h3');
        summaryTitle.textContent = "Summary";

        const summaryText = document.createElement('p');
        summaryText.textContent = data.report_summary || 'No summary available.';

        summaryCard.appendChild(summaryTitle);
        summaryCard.appendChild(summaryText);

        // Append summary card to report card
        reportCard.appendChild(summaryCard);

        // Create Tab Navigation
        const tabContainer = document.createElement('div');
        tabContainer.classList.add('tab-container');

        const tabs = [
            { name: 'Report Content', key: 'reportContent' },
            { name: 'Main Sources', key: 'mainSources' },
            { name: 'Quotes', key: 'quotes' },
            { name: 'References', key: 'references' }
        ];

        tabs.forEach((tab, idx) => {
            const tabElement = document.createElement('div');
            tabElement.classList.add('tab');
            if (idx === 0) tabElement.classList.add('tab-active');
            tabElement.textContent = tab.name;
            tabElement.dataset.tab = tab.key;
            tabContainer.appendChild(tabElement);
        });

        reportCard.appendChild(tabContainer);

        // Create Tab Content Container
        const tabContentContainer = document.createElement('div');
        tabContentContainer.classList.add('tab-content-container');

        // Create individual tab contents
        const reportContentSection = createReportContentSection(data.report_content);
        const mainSourcesSection = createMainSourcesSection(data.main_sources);
        const quotesSection = createQuotesSection(data.quotes);
        const referencesSection = createReferencesSection(data.references);

        tabContentContainer.appendChild(reportContentSection);
        tabContentContainer.appendChild(mainSourcesSection);
        tabContentContainer.appendChild(quotesSection);
        tabContentContainer.appendChild(referencesSection);

        reportCard.appendChild(tabContentContainer);

        // Append report card to output container
        outputContainer.appendChild(reportCard);

        // Initialize Tab Navigation
        initializeTabNavigation();

        // Initialize Collapsible Sections
        initializeCollapsibleSections();
    }

    function createReportContentSection(reportContent) {
        const section = document.createElement('div');
        section.classList.add('tab-content');
        section.id = 'reportContent';

        reportContent.forEach(item => {
            const contentItem = document.createElement('div');
            contentItem.classList.add('reference-card');

            // Source Icon (Assuming favicon URL can be derived or fetched)
            const sourceIcon = document.createElement('img');
            sourceIcon.classList.add('source-icon');
            sourceIcon.src = getFaviconUrl(item.url);
            sourceIcon.alt = 'Source Icon';

            const itemTitle = document.createElement('a');
            itemTitle.href = item.url;
            itemTitle.textContent = item.title;
            itemTitle.target = '_blank';

            const itemDescription = document.createElement('p');
            itemDescription.textContent = item.description;

            const itemPublishedTime = document.createElement('p');
            const publishedDate = new Date(item.published_time);
            itemPublishedTime.textContent = `Published Time: ${publishedDate.toLocaleDateString()}`;

            // Optional: Make Key Points Collapsible
            const collapsibleHeader = document.createElement('div');
            collapsibleHeader.classList.add('collapsible-header');
            collapsibleHeader.innerHTML = `<span>Key Points</span><span class="toggle-icon">➕</span>`;

            const collapsibleContent = document.createElement('div');
            collapsibleContent.classList.add('collapsible-content');
            collapsibleContent.style.maxHeight = null; // Initially collapsed

            const keyPointsList = document.createElement('ul');
            item.key_points.forEach(point => {
                const li = document.createElement('li');
                li.textContent = point;
                keyPointsList.appendChild(li);
            });

            collapsibleContent.appendChild(keyPointsList);

            contentItem.appendChild(sourceIcon);
            contentItem.appendChild(itemTitle);
            contentItem.appendChild(itemDescription);
            contentItem.appendChild(itemPublishedTime);
            contentItem.appendChild(collapsibleHeader);
            contentItem.appendChild(collapsibleContent);

            section.appendChild(contentItem);
        });

        return section;
    }

    function createMainSourcesSection(mainSources) {
        const section = document.createElement('div');
        section.classList.add('tab-content');
        section.id = 'mainSources';
        section.style.display = 'none'; // Initially hidden

        mainSources.forEach(source => {
            const sourceItem = document.createElement('div');
            sourceItem.classList.add('reference-card', 'reference-card-supportive');

            const sourceTitle = document.createElement('a');
            sourceTitle.href = source.url;
            sourceTitle.textContent = source.title;
            sourceTitle.target = '_blank';

            const sourceDescription = document.createElement('p');
            sourceDescription.textContent = source.description;

            sourceItem.appendChild(sourceTitle);
            sourceItem.appendChild(sourceDescription);

            section.appendChild(sourceItem);
        });

        return section;
    }

    function createQuotesSection(quotes) {
        const section = document.createElement('div');
        section.classList.add('tab-content');
        section.id = 'quotes';
        section.style.display = 'none'; // Initially hidden

        quotes.forEach(quoteItem => {
            const quoteDiv = document.createElement('div');
            quoteDiv.classList.add('reference-card');

            const quoteText = document.createElement('p');
            quoteText.textContent = `"${quoteItem.quote}"`;

            const quoteSource = document.createElement('p');
            quoteSource.textContent = `Source: ${quoteItem.source}`;

            quoteDiv.appendChild(quoteText);
            quoteDiv.appendChild(quoteSource);

            section.appendChild(quoteDiv);
        });

        return section;
    }

    function createReferencesSection(references) {
        const section = document.createElement('div');
        section.classList.add('tab-content');
        section.id = 'references';
        section.style.display = 'none'; // Initially hidden

        references.forEach(ref => {
            const refDiv = document.createElement('div');
            refDiv.classList.add('reference-card');

            const refUrl = document.createElement('a');
            refUrl.href = ref.url;
            refUrl.textContent = ref.url;
            refUrl.target = '_blank';

            const refQuote = document.createElement('p');
            refQuote.textContent = ref.keyQuote;

            refDiv.appendChild(refUrl);
            refDiv.appendChild(refQuote);

            section.appendChild(refDiv);
        });

        return section;
    }

    function initializeTabNavigation() {
        const tabs = outputContainer.querySelectorAll('.tab');
        const tabContents = outputContainer.querySelectorAll('.tab-content');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                tabs.forEach(t => t.classList.remove('tab-active'));
                // Hide all tab contents
                tabContents.forEach(tc => tc.style.display = 'none');

                // Add active class to the clicked tab
                tab.classList.add('tab-active');
                // Show the corresponding tab content
                const activeTabContent = document.getElementById(tab.dataset.tab);
                activeTabContent.style.display = 'block';
            });
        });
    }

    function initializeCollapsibleSections() {
        const headers = outputContainer.querySelectorAll('.collapsible-header');
        headers.forEach(header => {
            header.addEventListener('click', () => {
                const content = header.nextElementSibling;
                const toggleIcon = header.querySelector('.toggle-icon');

                if (content.style.maxHeight) {
                    // Collapse
                    content.style.maxHeight = null;
                    toggleIcon.textContent = "➕";
                } else {
                    // Expand
                    content.style.maxHeight = content.scrollHeight + "px";
                    toggleIcon.textContent = "➖";
                }
            });
        });
    }

    function showError(message) {
        outputContainer.innerHTML = `<div class="error-message">${message}</div>`;
    }

    /**
     * Utility function to get favicon URL from a website URL.
     * @param {string} url - The website URL.
     * @returns {string} - The favicon URL or a placeholder image.
     */
    function getFaviconUrl(url) {
        try {
            const urlObj = new URL(url);
            return `${urlObj.origin}/favicon.ico`;
        } catch (e) {
            return 'https://via.placeholder.com/20'; // Fallback icon
        }
    }

    return {
        // Expose functions or variables if needed
    };
})();

```

## verify_display.js
```python
// static/js/verify_display.js

const VerifyDisplayModule = (function() {
    // Define States
    const STATES = {
        IDLE: 'idle',
        PREPARING_CREW: 'preparingCrew',
        LOADING_CARDS: 'loadingCards',
        PREPARING_REPORT: 'preparingReport',
        REPORT_READY: 'reportReady',
        ERROR: 'error'
    };

    let currentState = STATES.IDLE;
    const factRunButton = document.getElementById('fact_run_button');
    const outputContainer = document.getElementById('fact_output_container');

    // State variable to store JSON data
    window.verifyReportData = null;

    factRunButton.addEventListener('click', handleRunButtonClick);

    function handleRunButtonClick() {
        // Clear output and reset state
        outputContainer.innerHTML = '';
        currentState = STATES.IDLE;

        let claimInput = document.getElementById('fact_check_input').value.trim();
        if (!claimInput) {
            alert("Please enter a claim to verify.");
            return;
        }

        transitionState(STATES.PREPARING_CREW);
        showSpinner("Preparing crew...");

        // Fetch planning texts from the backend
        fetch('/verify/planning', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ claim: claimInput }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                transitionState(STATES.ERROR, data.error);
                return;
            }

            transitionState(STATES.LOADING_CARDS);
            hideSpinner();
            startLoadingCards(data.thought_process);
        })
        .catch(error => {
            console.error('Error:', error);
            transitionState(STATES.ERROR, "An error occurred while preparing the crew.");
        });
    }

    function transitionState(newState, errorMessage = '') {
        currentState = newState;
        if (newState === STATES.ERROR) {
            showError(errorMessage);
        }
    }

    function showSpinner(message) {
        outputContainer.innerHTML = `
            <div class="spinner-container">
                <div class="spinner"></div>
                <div class="spinner-text">${message}</div>
            </div>
        `;
    }

    function hideSpinner() {
        outputContainer.innerHTML = '';
    }

    function startLoadingCards(planningTexts) {
        let loadingCardsContainer = document.createElement('div');
        loadingCardsContainer.classList.add('loading-cards-container');
        outputContainer.appendChild(loadingCardsContainer);

        let index = 0;
        let previousCurrentCard = null;

        function addNextCard() {
            if (index >= planningTexts.length) {
                // All cards added, prepare report
                transitionState(STATES.PREPARING_REPORT);
                showSpinner("Preparing report...");
                setTimeout(() => {
                    fetchReport();
                }, 3000);
                return;
            }

            // Update the previous current-step card to stacked
            if (previousCurrentCard) {
                previousCurrentCard.classList.remove('current-step');
                previousCurrentCard.classList.add('stacked');
            }

            let cardText = planningTexts[index];
            let card = createLoadingCard(cardText, true);
            loadingCardsContainer.appendChild(card);

            // Update the reference to the current card
            previousCurrentCard = card;

            index++;
            setTimeout(addNextCard, 3000);
        }

        addNextCard();
    }

    function createLoadingCard(text, isCurrentStep) {
        let card = document.createElement('div');
        card.classList.add('loading-card');
        card.classList.add(isCurrentStep ? 'current-step' : 'stacked');

        let cardContent = document.createElement('div');
        cardContent.classList.add('card-content');
        cardContent.textContent = text;

        card.appendChild(cardContent);
        return card;
    }

    function fetchReport() {
        let claimInput = document.getElementById('fact_check_input').value.trim();
        fetch('/verify/report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ claim: claimInput }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                transitionState(STATES.ERROR, data.error);
                return;
            }
            // Store the JSON data in the state variable
            window.verifyReportData = data;
            transitionState(STATES.REPORT_READY);
            hideSpinner();
            displayReport(data);
        })
        .catch(error => {
            console.error('Error:', error);
            transitionState(STATES.ERROR, "An error occurred while preparing the report.");
        });
    }

    function displayReport(data) {
        // Clear the output container
        outputContainer.innerHTML = '';

        // Create a wrapper div to hold the report content
        const reportWrapper = document.createElement('div');
        reportWrapper.id = 'report-wrapper';

        // Create Summary Card
        const summaryCard = document.createElement('div');
        summaryCard.classList.add('summary-card');

        const summaryTitle = document.createElement('h3');
        summaryTitle.textContent = "Summary";

        const summaryText = document.createElement('p');
        summaryText.textContent = data.conclusion;

        summaryCard.appendChild(summaryTitle);
        summaryCard.appendChild(summaryText);

        // Create Report Card
        const reportCard = document.createElement('div');
        reportCard.classList.add('report-card');

        // Report Header
        const reportHeader = document.createElement('div');
        reportHeader.classList.add('report-header');

        const reportTitle = document.createElement('div');
        reportTitle.classList.add('report-title');
        reportTitle.innerHTML = `<span class="claim-icon">🧐</span>${data.claim}`;

        const verificationBadge = document.createElement('div');
        verificationBadge.classList.add('badge');
        verificationBadge.classList.add(data.details.result ? 'true' : 'false');
        verificationBadge.textContent = data.details.result ? 'True' : 'False';

        reportHeader.appendChild(reportTitle);
        reportHeader.appendChild(verificationBadge);

        // Factuality Score
        const factualitySection = document.createElement('div');
        factualitySection.classList.add('factuality-score');

        const factualityLabel = document.createElement('span');
        factualityLabel.textContent = "Factuality Score:";
        factualityLabel.classList.add('tooltip');
        factualityLabel.innerHTML += `<span class="tooltiptext">A score that represents the strength of evidence supporting the claim.</span>`;

        const progressBarContainer = document.createElement('div');
        progressBarContainer.classList.add('progress-bar-container');

        const progressBar = document.createElement('div');
        progressBar.classList.add('progress-bar');

        // Set progress bar width and color based on factuality score
        const score = data.details.factuality;
        progressBar.style.width = `${score * 100}%`;

        if (score >= 0.75) {
            progressBar.classList.add('score-strongly-supported');
        } else if (score >= 0.5) {
            progressBar.classList.add('score-supported');
        } else if (score >= 0.25) {
            progressBar.classList.add('score-neutral');
        } else {
            progressBar.classList.add('score-not-supported');
        }

        progressBarContainer.appendChild(progressBar);

        const scoreLabel = document.createElement('span');
        scoreLabel.classList.add('score-label');
        if (score >= 0.75) {
            scoreLabel.textContent = "Strongly Supported";
        } else if (score >= 0.5) {
            scoreLabel.textContent = "Supported";
        } else if (score >= 0.25) {
            scoreLabel.textContent = "Neutral";
        } else {
            scoreLabel.textContent = "Not Supported";
        }

        factualitySection.appendChild(factualityLabel);
        factualitySection.appendChild(progressBarContainer);
        factualitySection.appendChild(scoreLabel);

        // Reason Section (Collapsible)
        const reasonSection = createCollapsibleSection("Reason", data.details.reason);

        // Conclusion Section (Collapsible)
        const conclusionSection = createCollapsibleSection("Conclusion", data.conclusion);

        // References Section
        const referencesSection = createReferencesSection(data.details.references);

        // Assemble Report Card
        reportCard.appendChild(reportHeader);
        reportCard.appendChild(factualitySection);
        reportCard.appendChild(reasonSection);
        reportCard.appendChild(conclusionSection);
        reportCard.appendChild(referencesSection);

        // Append Summary and Report to Report Wrapper
        reportWrapper.appendChild(summaryCard);
        reportWrapper.appendChild(reportCard);

        // Append the report wrapper to the output container
        outputContainer.appendChild(reportWrapper);

        // Create Download and Copy Buttons
        const actionButtonsContainer = document.createElement('div');
        actionButtonsContainer.classList.add('action-buttons');

        const downloadButton = document.createElement('button');
        downloadButton.classList.add('download-button');
        downloadButton.textContent = 'Download Report';
        downloadButton.addEventListener('click', () => {
            if (typeof downloadVerifyReport === 'function') {
                downloadVerifyReport();
            } else {
                console.error('Download function not found.');
            }
        });

        const copyButton = document.createElement('button');
        copyButton.classList.add('copy-button');
        copyButton.textContent = 'Copy to Clipboard';
        copyButton.addEventListener('click', () => {
            if (typeof copyVerifyReport === 'function') {
                copyVerifyReport();
            } else {
                console.error('Copy function not found.');
            }
        });

        actionButtonsContainer.appendChild(downloadButton);
        actionButtonsContainer.appendChild(copyButton);

        // Append action buttons to the output container
        outputContainer.appendChild(actionButtonsContainer);

        // Initialize Collapsible Sections
        initializeCollapsibleSections();
    }

    function createCollapsibleSection(title, content) {
        const section = document.createElement('div');
        section.classList.add('collapsible-section');

        const header = document.createElement('div');
        header.classList.add('collapsible-header');
        header.innerHTML = `<h3>${title}</h3><span class="toggle-icon">➕</span>`;

        const body = document.createElement('div');
        body.classList.add('collapsible-content');

        const paragraph = document.createElement('p');
        paragraph.innerHTML = content;

        body.appendChild(paragraph);

        section.appendChild(header);
        section.appendChild(body);

        return section;
    }

    function createReferencesSection(references) {
        // Group references by supportiveness
        const supportiveRefs = references.filter(ref => ref.isSupportive);
        const nonSupportiveRefs = references.filter(ref => !ref.isSupportive);

        const section = document.createElement('div');
        section.classList.add('references-section');

        const header = document.createElement('div');
        header.classList.add('references-header');

        const title = document.createElement('h2');
        title.textContent = "References";

        const filterOptions = document.createElement('div');
        filterOptions.classList.add('filter-options');

        const allFilter = document.createElement('button');
        allFilter.classList.add('filter-button', 'active');
        allFilter.textContent = "All";
        allFilter.addEventListener('click', () => filterReferences('all'));

        const supportiveFilter = document.createElement('button');
        supportiveFilter.classList.add('filter-button');
        supportiveFilter.textContent = "Supportive";
        supportiveFilter.addEventListener('click', () => filterReferences('supportive'));

        const nonSupportiveFilter = document.createElement('button');
        nonSupportiveFilter.classList.add('filter-button');
        nonSupportiveFilter.textContent = "Non-Supportive";
        nonSupportiveFilter.addEventListener('click', () => filterReferences('non-supportive'));

        filterOptions.appendChild(allFilter);
        filterOptions.appendChild(supportiveFilter);
        filterOptions.appendChild(nonSupportiveFilter);

        header.appendChild(title);
        header.appendChild(filterOptions);

        const referencesContainer = document.createElement('div');
        referencesContainer.classList.add('references-container');

        // Function to render references based on filter
        function renderReferences(filteredRefs) {
            referencesContainer.innerHTML = '';
            filteredRefs.forEach(ref => {
                const refCard = createReferenceCard(ref);
                referencesContainer.appendChild(refCard);
            });
        }

        // Initial render with all references
        renderReferences(references);

        section.appendChild(header);
        section.appendChild(referencesContainer);

        return section;

        function filterReferences(filter) {
            const allFilters = header.querySelectorAll('.filter-button');
            allFilters.forEach(btn => btn.classList.remove('active'));

            let selectedFilter;
            if (filter === 'all') {
                selectedFilter = allFilter;
            } else if (filter === 'supportive') {
                selectedFilter = supportiveFilter;
            } else if (filter === 'non-supportive') {
                selectedFilter = nonSupportiveFilter;
            }

            if (selectedFilter) {
                selectedFilter.classList.add('active');
            }

            let filteredRefs;
            if (filter === 'all') {
                filteredRefs = references;
            } else if (filter === 'supportive') {
                filteredRefs = supportiveRefs;
            } else if (filter === 'non-supportive') {
                filteredRefs = nonSupportiveRefs;
            }

            renderReferences(filteredRefs);
        }
    }

    function createReferenceCard(ref) {
        const card = document.createElement('div');
        card.classList.add('reference-card');
        if (!ref.isSupportive) {
            card.classList.add('non-supportive');
        } else {
            card.classList.add('supportive');
        }

        const title = document.createElement('div');
        title.classList.add('reference-title');
        // Extract page title from URL if possible
        const pageTitle = ref.title || ref.url;
        title.textContent = pageTitle;

        const quote = document.createElement('div');
        quote.classList.add('key-quote');
        quote.textContent = `"${ref.keyQuote}"`;

        const actions = document.createElement('div');
        actions.classList.add('reference-actions');

        const supportIcon = document.createElement('span');
        supportIcon.classList.add('support-icon');
        supportIcon.innerHTML = ref.isSupportive ? "✔️ Supportive" : "❌ Not Supportive";

        const readSource = document.createElement('a');
        readSource.classList.add('read-source-button');
        readSource.href = ref.url;
        readSource.target = "_blank";
        readSource.rel = "noopener noreferrer";
        readSource.textContent = "Read Source";

        actions.appendChild(supportIcon);
        actions.appendChild(readSource);

        card.appendChild(title);
        card.appendChild(quote);
        card.appendChild(actions);

        return card;
    }

    function showError(message) {
        outputContainer.innerHTML = `<div class="error-message">${message}</div>`;
    }

    function initializeCollapsibleSections() {
        const headers = outputContainer.querySelectorAll('.collapsible-header');
        headers.forEach(header => {
            header.addEventListener('click', () => {
                const content = header.nextElementSibling;
                const toggleIcon = header.querySelector('.toggle-icon');

                if (content.style.maxHeight) {
                    // Collapse
                    content.style.maxHeight = null;
                    toggleIcon.textContent = "➕";
                } else {
                    // Expand
                    content.style.maxHeight = content.scrollHeight + "px";
                    toggleIcon.textContent = "➖";
                }
            });
        });
    }

    return {
        // Expose functions or variables if needed
    };
})();

```

## website_navigation_display.js
```python
// static/js/website_navigation_display.js

const WebsiteNavigationDisplayModule = (function() {
    // Define States
    const STATES = {
        IDLE: 'idle',
        PREPARING_CREW: 'preparingCrew',
        LOADING_CARDS: 'loadingCards',
        PREPARING_REPORT: 'preparingReport',
        REPORT_READY: 'reportReady',
        ERROR: 'error'
    };

    let currentState = STATES.IDLE;
    const runButton = document.getElementById('website_run_button');
    const outputContainer = document.getElementById('website_output_container');

    // State variable to store JSON data
    window.websiteNavigationReportData = null;

    runButton.addEventListener('click', handleRunButtonClick);

    function handleRunButtonClick() {
        // Clear output and reset state
        outputContainer.innerHTML = '';
        currentState = STATES.IDLE;

        const urlInput = document.getElementById('website_navigation_url').value.trim();
        const focusInput = document.getElementById('website_navigation_focus').value.trim();

        if (!urlInput) {
            alert("Please enter a URL to navigate.");
            return;
        }

        transitionState(STATES.PREPARING_CREW);
        showSpinner("Preparing crew...");

        // Fetch planning texts from the backend
        fetch('/website_navigation/planning', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: urlInput, topic: focusInput }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                transitionState(STATES.ERROR, data.error);
                return;
            }

            transitionState(STATES.LOADING_CARDS);
            hideSpinner();
            startLoadingCards(data.thought_process);
        })
        .catch(error => {
            console.error('Error:', error);
            transitionState(STATES.ERROR, "An error occurred while preparing the crew.");
        });
    }

    function transitionState(newState, errorMessage = '') {
        currentState = newState;
        if (newState === STATES.ERROR) {
            showError(errorMessage);
        }
    }

    function showSpinner(message) {
        outputContainer.innerHTML = `
            <div class="spinner-container">
                <div class="spinner"></div>
                <div class="spinner-text">${message}</div>
            </div>
        `;
    }

    function hideSpinner() {
        outputContainer.innerHTML = '';
    }

    function startLoadingCards(planningTexts) {
        const loadingCardsContainer = document.createElement('div');
        loadingCardsContainer.classList.add('loading-cards-container');
        outputContainer.appendChild(loadingCardsContainer);

        let index = 0;
        let previousCurrentCard = null;

        function addNextCard() {
            if (index >= planningTexts.length) {
                // All cards added, prepare report
                transitionState(STATES.PREPARING_REPORT);
                showSpinner("Preparing report...");
                setTimeout(() => {
                    fetchReport();
                }, 3000); // Adjust the delay as needed
                return;
            }

            // Update the previous current-step card to stacked
            if (previousCurrentCard) {
                previousCurrentCard.classList.remove('current-step');
                previousCurrentCard.classList.add('stacked');
            }

            const cardText = planningTexts[index];
            const card = createLoadingCard(cardText, true);
            loadingCardsContainer.appendChild(card);

            // Update the reference to the current card
            previousCurrentCard = card;

            index++;
            setTimeout(addNextCard, 3000); // Adjust the delay as needed
        }

        addNextCard();
    }

    function createLoadingCard(text, isCurrentStep) {
        const card = document.createElement('div');
        card.classList.add('loading-card');
        card.classList.add(isCurrentStep ? 'current-step' : 'stacked');

        const cardContent = document.createElement('div');
        cardContent.classList.add('card-content');
        cardContent.textContent = text;

        card.appendChild(cardContent);
        return card;
    }

    function fetchReport() {
        const urlInput = document.getElementById('website_navigation_url').value.trim();
        const focusInput = document.getElementById('website_navigation_focus').value.trim();
        fetch('/website_navigation/report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: urlInput, topic: focusInput }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                transitionState(STATES.ERROR, data.error);
                return;
            }
            // Assign the JSON object directly without parsing
            window.websiteNavigationReportData = data;

            transitionState(STATES.REPORT_READY);
            hideSpinner();
            displayReport(window.websiteNavigationReportData);
        })
        .catch(error => {
            console.error('Error:', error);
            transitionState(STATES.ERROR, "An error occurred while preparing the report.");
        });
    }

    function displayReport(data) {
        // Clear the output container
        outputContainer.innerHTML = '';

        // Create a wrapper div to hold the report content
        const reportWrapper = document.createElement('div');
        reportWrapper.id = 'report-wrapper';

        // Render header with topic and URL
        const headerSection = document.createElement('header');
        headerSection.classList.add('header-section');

        const topicTitle = document.createElement('h1');
        topicTitle.classList.add('topic-title');
        topicTitle.textContent = data.topic || 'Report';

        const reportUrl = document.createElement('a');
        reportUrl.href = data.url;
        reportUrl.target = '_blank';
        reportUrl.classList.add('report-url');
        reportUrl.textContent = data.url;

        headerSection.appendChild(topicTitle);
        headerSection.appendChild(reportUrl);

        // Render Related Topics as Tags/Chips
        if (data.related_topics && Array.isArray(data.related_topics) && data.related_topics.length > 0) {
            const tagsContainer = document.createElement('div');
            tagsContainer.classList.add('related-topics');

            data.related_topics.forEach(topic => {
                const tag = document.createElement('span');
                tag.classList.add('tag');
                tag.textContent = topic;
                tagsContainer.appendChild(tag);
            });

            headerSection.appendChild(tagsContainer);
        }

        if (data.report_summary) {
            const summaryOverview = document.createElement('p');
            summaryOverview.classList.add('summary-overview');
            summaryOverview.textContent = data.report_summary;
            headerSection.appendChild(summaryOverview);
        }

        reportWrapper.appendChild(headerSection);

        const mainContent = document.createElement('div');
        mainContent.classList.add('main-content-area');
        reportWrapper.appendChild(mainContent);

        // Sections to render
        const sectionsToRender = {
            'detailed_content_summary': 'Detailed Content Summary',
            'detailed_analysis': 'Detailed Analysis',
            'references': 'References',
            'conclusion': 'Conclusion'
        };

        for (let key in sectionsToRender) {
            if (data[key]) {
                // Create section
                const sectionElement = document.createElement('div');
                sectionElement.id = key;
                sectionElement.classList.add('content-section');

                // Generate section content
                let sectionContent = '';
                if (key === 'detailed_content_summary') {
                    sectionContent = generateContentSummary(data[key]);
                } else if (key === 'references') {
                    sectionContent = generateReferencesContent(data[key]);
                } else {
                    sectionContent = generateSectionContent(data[key]);
                }

                const sectionHeader = document.createElement('h2');
                sectionHeader.textContent = sectionsToRender[key];
                sectionElement.appendChild(sectionHeader);

                const sectionBody = document.createElement('div');
                sectionBody.innerHTML = sectionContent;
                sectionElement.appendChild(sectionBody);

                mainContent.appendChild(sectionElement);
            }
        }

        // Render Extracted Links and Fetched Links Content as Tabs
        if ((data.extracted_links && data.extracted_links.length > 0) || 
            (data.fetched_links_content && data.fetched_links_content.length > 0)) {
            const tabsContainer = document.createElement('div');
            tabsContainer.classList.add('tabs-container');

            // Create Tabs Header
            const tabsHeader = document.createElement('div');
            tabsHeader.classList.add('tabs-header');

            const extractedLinksTab = document.createElement('div');
            extractedLinksTab.classList.add('tab');
            extractedLinksTab.textContent = 'Extracted Links';
            extractedLinksTab.dataset.tab = 'extracted-links';
            tabsHeader.appendChild(extractedLinksTab);

            if (data.fetched_links_content && data.fetched_links_content.length > 0) {
                const fetchedLinksTab = document.createElement('div');
                fetchedLinksTab.classList.add('tab');
                fetchedLinksTab.textContent = 'Fetched Links Content';
                fetchedLinksTab.dataset.tab = 'fetched-links-content';
                tabsHeader.appendChild(fetchedLinksTab);
            }

            tabsContainer.appendChild(tabsHeader);

            // Create Tabs Content
            const tabsContent = document.createElement('div');
            tabsContent.classList.add('tabs-content');

            // Extracted Links Content
            if (data.extracted_links && data.extracted_links.length > 0) {
                const extractedLinksContent = document.createElement('div');
                extractedLinksContent.classList.add('tab-content');
                extractedLinksContent.id = 'extracted-links';

                const extractedLinksList = document.createElement('ul');
                extractedLinksList.classList.add('extracted-links-list');

                data.extracted_links.forEach(link => {
                    const listItem = document.createElement('li');

                    const linkAnchor = document.createElement('a');
                    linkAnchor.href = link.url;
                    linkAnchor.target = '_blank';
                    linkAnchor.textContent = link.url;

                    const descriptionPara = document.createElement('p');
                    descriptionPara.classList.add('extracted-links-description');
                    descriptionPara.textContent = link.description;

                    listItem.appendChild(linkAnchor);
                    listItem.appendChild(descriptionPara);
                    extractedLinksList.appendChild(listItem);
                });

                extractedLinksContent.appendChild(extractedLinksList);
                tabsContent.appendChild(extractedLinksContent);
            }

            // Fetched Links Content
            if (data.fetched_links_content && data.fetched_links_content.length > 0) {
                const fetchedLinksContent = document.createElement('div');
                fetchedLinksContent.classList.add('tab-content');
                fetchedLinksContent.id = 'fetched-links-content';

                data.fetched_links_content.forEach(linkContent => {
                    const fetchedLinkItem = document.createElement('div');
                    fetchedLinkItem.classList.add('fetched-link-item');

                    const linkTitle = document.createElement('h4');
                    linkTitle.textContent = linkContent.url;
                    linkTitle.style.cursor = 'pointer';
                    linkTitle.addEventListener('click', () => {
                        // Toggle visibility of content summary and key insights
                        const details = fetchedLinkItem.querySelector('.fetched-link-details');
                        if (details.style.display === 'none' || details.style.display === '') {
                            details.style.display = 'block';
                        } else {
                            details.style.display = 'none';
                        }
                    });

                    const detailsDiv = document.createElement('div');
                    detailsDiv.classList.add('fetched-link-details');
                    detailsDiv.style.display = 'none';

                    const contentSummaryPara = document.createElement('p');
                    contentSummaryPara.textContent = `Summary: ${linkContent.content_summary}`;

                    const keyInsightsHeader = document.createElement('p');
                    keyInsightsHeader.textContent = 'Key Insights:';

                    const keyInsightsList = document.createElement('ul');
                    keyInsightsList.classList.add('key-insights-list');

                    linkContent.key_insights.forEach(insight => {
                        const insightItem = document.createElement('li');
                        insightItem.textContent = insight;
                        keyInsightsList.appendChild(insightItem);
                    });

                    detailsDiv.appendChild(contentSummaryPara);
                    detailsDiv.appendChild(keyInsightsHeader);
                    detailsDiv.appendChild(keyInsightsList);

                    fetchedLinkItem.appendChild(linkTitle);
                    fetchedLinkItem.appendChild(detailsDiv);

                    fetchedLinksContent.appendChild(fetchedLinkItem);
                });

                tabsContent.appendChild(fetchedLinksContent);
            }

            tabsContainer.appendChild(tabsContent);
            mainContent.appendChild(tabsContainer);

            // Initialize Tabs Functionality
            initializeTabs(tabsContainer);
        }

        // Append the report wrapper to the output container
        outputContainer.appendChild(reportWrapper);

        // Create Download and Copy Buttons
        const actionButtonsContainer = document.createElement('div');
        actionButtonsContainer.classList.add('action-buttons');

        const downloadButton = document.createElement('button');
        downloadButton.classList.add('download-button');
        downloadButton.textContent = 'Download Report';
        downloadButton.addEventListener('click', () => {
            if (typeof downloadWebsiteNavigationReport === 'function') {
                downloadWebsiteNavigationReport();
            } else {
                console.error('Download function not found.');
            }
        });

        const copyButton = document.createElement('button');
        copyButton.classList.add('copy-button');
        copyButton.textContent = 'Copy to Clipboard';
        copyButton.addEventListener('click', () => {
            if (typeof copyWebsiteNavigationReport === 'function') {
                copyWebsiteNavigationReport();
            } else {
                console.error('Copy function not found.');
            }
        });

        actionButtonsContainer.appendChild(downloadButton);
        actionButtonsContainer.appendChild(copyButton);

        // Append action buttons to the output container
        outputContainer.appendChild(actionButtonsContainer);
    }

    // Function definitions outside of displayReport

    function generateContentSummary(contentData) {
        let content = '';

        // Introduction
        if (contentData.introduction) {
            content += `
                <div class="sub-section">
                    <h3>Introduction</h3>
                    <p>${contentData.introduction}</p>
                </div>
            `;
        }

        // Main Sections (without titles)
        if (contentData.main_sections) {
            for (let key in contentData.main_sections) {
                if (contentData.main_sections.hasOwnProperty(key)) {
                    content += `
                        <div class="sub-section">
                            <p>${contentData.main_sections[key]}</p>
                        </div>
                    `;
                }
            }
        }

        // Key Points
        if (contentData.key_points && contentData.key_points.length > 0) {
            content += `
                <div class="sub-section">
                    <h3>Key Points</h3>
                    ${createList(contentData.key_points)}
                </div>
            `;
        }

        return content;
    }

    function generateSectionContent(sectionData) {
        let content = '';

        if (typeof sectionData === 'string') {
            content += `<p>${sectionData}</p>`;
        } else if (Array.isArray(sectionData)) {
            content += createList(sectionData);
        } else if (typeof sectionData === 'object') {
            for (let key in sectionData) {
                if (sectionData.hasOwnProperty(key)) {
                    const title = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                    let subContent = '';

                    if (typeof sectionData[key] === 'string') {
                        subContent = `<p>${sectionData[key]}</p>`;
                    } else if (Array.isArray(sectionData[key])) {
                        subContent = createList(sectionData[key]);
                    } else if (typeof sectionData[key] === 'object') {
                        subContent = generateSectionContent(sectionData[key]);
                    }

                    content += `
                        <div class="sub-section">
                            <h3>${title}</h3>
                            ${subContent}
                        </div>
                    `;
                }
            }
        }

        return content;
    }

    function generateReferencesContent(referencesData) {
        let content = '';
        referencesData.forEach(ref => {
            content += `
                <div class="reference-item">
                    <p><a href="${ref.url}" target="_blank">${ref.url}</a></p>
                    <p>${ref.description}</p>
                </div>
            `;
        });
        return content;
    }

    function createList(items) {
        return `<ul>${items.map(item => `<li>${item}</li>`).join('')}</ul>`;
    }

    function initializeTabs(tabsContainer) {
        const tabsHeader = tabsContainer.querySelector('.tabs-header');
        const tabs = tabsHeader.querySelectorAll('.tab');
        const tabContents = tabsContainer.querySelectorAll('.tab-content');

        if (tabs.length === 0) return;

        // Activate the first tab by default
        tabs[0].classList.add('active');
        const firstTabContent = tabsContainer.querySelector(`#${tabs[0].dataset.tab}`);
        if (firstTabContent) {
            firstTabContent.classList.add('active');
        }

        // Add click event listeners to tabs
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                tabs.forEach(t => t.classList.remove('active'));
                // Hide all tab contents
                tabContents.forEach(content => content.classList.remove('active'));

                // Add active class to the clicked tab
                tab.classList.add('active');
                // Show the corresponding tab content
                const activeContent = tabsContainer.querySelector(`#${tab.dataset.tab}`);
                if (activeContent) {
                    activeContent.classList.add('active');
                }
            });
        });
    }

    function showError(message) {
        outputContainer.innerHTML = `<div class="error-message">${message}</div>`;
    }

    return {
        // Expose functions or variables if needed
    };
})();

```

