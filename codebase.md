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
            <div class="row header-row">
                <!-- Logo -->
                <div class="logo-container">
                    <img src="{{ url_for('static', path='logos/cait_logo.png') }}" alt="{{ _('Logo') }}" class="logo"><h1 class="title">{{ _('Cool AI Tools') }}</h1>
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
                <img src="{{ url_for('static', path='logos/cait_logo.png') }}" alt="{{ _('Logo') }}" class="logo">
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

    <!-- Main Content Wrapper -->
    <div class="wrapper">
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
                         data-fact_check_input="{{ _('Health benefits of intermittent fasting') | tojson }}">
                        {{ _('Health benefits of intermittent fasting') }}
                    </div>
                    <div id="example2_fact_check" class="example-button" 
                         data-fact_check_input="{{ _('Impact of social media on mental health') | tojson }}">
                        {{ _('Impact of social media on mental health') }}
                    </div>
                    <div id="example3_fact_check" class="example-button" 
                         data-fact_check_input="{{ _('Is electric car adoption growing rapidly?') | tojson }}">
                        {{ _('Is electric car adoption growing rapidly?') }}
                    </div>
                    <div id="example4_fact_check" class="example-button" 
                         data-fact_check_input="{{ _('Do video games improve cognitive skills?') | tojson }}">
                        {{ _('Do video games improve cognitive skills?') }}
                    </div>
                </div>

                <!-- Input Group -->
                <div class="input-group">
                    <input type="text" id="fact_check_input" placeholder="{{ _('🖊 Enter a claim you need to verify') }}" required>
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
                         data-topic_research_input="{{ _('Machine Learning') | tojson }}" 
                         data-topic_research_focus="">
                        {{ _('Learn about Machine Learning') }}
                    </div>
                    <div id="example2_topic_research" class="example-button" 
                         data-topic_research_input="{{ _('Renewable Energy') | tojson }}" 
                         data-topic_research_focus="{{ _('Latest trends') | tojson }}">
                        {{ _('Latest trends in Renewable Energy') }}
                    </div>
                    <div id="example3_topic_research" class="example-button" 
                         data-topic_research_input="{{ _('Meditation') | tojson }}" 
                         data-topic_research_focus="{{ _('Beginner\'s guide') | tojson }}">
                        {{ _("Beginner's guide to Meditation") }}
                    </div>
                    <div id="example4_topic_research" class="example-button" 
                         data-topic_research_input="{{ _('Space Exploration') | tojson }}" 
                         data-topic_research_focus="{{ _('Advancements') | tojson }}">
                        {{ _('Advancements in Space Exploration') }}
                    </div>
                </div>

                <!-- Input Group -->
                <div class="input-group">
                    <input type="text" id="topic_research_input" placeholder="{{ _('📚 Enter your topic of research') }}" required>
                    <input type="text" id="topic_research_focus" placeholder="{{ _('🎯 Focus Area (Optional)') }}" style="margin-top: 10px;">
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
                         data-website_navigation_focus="{{ _('Latest Tech News') | tojson }}">
                        {{ _('Latest Tech News on The Verge') }}
                    </div>
                    <div id="example2_website_navigation" class="example-button" 
                         data-website_navigation_url="https://www.foodnetwork.com" 
                         data-website_navigation_focus="{{ _('Healthy Recipes') | tojson }}">
                        {{ _('Healthy Recipes on Food Network') }}
                    </div>
                    <div id="example3_website_navigation" class="example-button" 
                         data-website_navigation_url="https://www.lonelyplanet.com" 
                         data-website_navigation_focus="{{ _('Travel Guides') | tojson }}">
                        {{ _('Travel Guides on Lonely Planet') }}
                    </div>
                    <div id="example4_website_navigation" class="example-button" 
                         data-website_navigation_url="https://www.investopedia.com" 
                         data-website_navigation_focus="{{ _('Investment Tips') | tojson }}">
                        {{ _('Investment Tips on Investopedia') }}
                    </div>
                </div>

                <!-- Input Group -->
                <div class="input-group">
                    <input type="text" id="website_navigation_url" placeholder="{{ _('🌐 URL or Domain to Navigate') }}" required>
                    <input type="text" id="website_navigation_focus" placeholder="{{ _('🎯 Topic of Focus (Optional)') }}" style="margin-top: 10px;">
                    <button type="button" id="website_run_button" class="toggle-button">
                        {{ _('🚀 Run Specialized AI Team 🚀') }}
                    </button>
                </div>

                <!-- Output Container -->
                <div id="website_output_container"></div>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-container">
                <!-- Logos Section -->
                <div class="footer-section logos">
                    <!-- Five logos with links -->
                    <a href="https://github.com/crewAIInc/crewAI" target="_blank" rel="noopener noreferrer" aria-label="{{ _('CrewAI') }}">
                        <img src="{{ url_for('static', path='logos/crewai_logo.png') }}" alt="{{ _('CrewAI Logo') }}">
                    </a>
                    <a href="https://jina.ai" target="_blank" rel="noopener noreferrer" aria-label="{{ _('Jina AI') }}">
                        <img src="{{ url_for('static', path='logos/jina_ai_logo.png') }}" alt="{{ _('Jina AI Logo') }}">
                    </a>
                    <a href="mailto:your_email@example.com" aria-label="{{ _('Send us an Email') }}">
                        <img src="{{ url_for('static', path='logos/email_logo.png') }}" alt="{{ _('Email Logo') }}">
                    </a>
                    <a href="https://www.linkedin.com/in/luca-nonino-72196893" target="_blank" rel="noopener noreferrer" aria-label="{{ _('Follow us on LinkedIn') }}">
                        <img src="{{ url_for('static', path='logos/linkedin_logo.png') }}" alt="{{ _('LinkedIn Logo') }}">
                    </a>
                    <a href="https://github.com/LucaCGN/CoolAITools" target="_blank" rel="noopener noreferrer" aria-label="{{ _('GitHub') }}">
                        <img src="{{ url_for('static', path='logos/github_logo.png') }}" alt="{{ _('GitHub Logo') }}">
                    </a>
                </div>

                <!-- Branding Section -->
                <div class="footer-section branding">
                    <p>{{ _('© 2024 Cool AI Tools. All rights reserved.') }}</p>
                </div>
            </div>
        </div>
    </footer>

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

## general.css
```python
/* ============================
   general.css - Updated
============================ */

/* Importing Fonts */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&family=Raleway:wght@400;500;700&family=Montserrat:wght@700&display=swap');

/* Reset and Base Styles */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body, html {
    overflow: auto;
    height: 100%;
}

body {
    font-family: 'Poppins', sans-serif;
    background-color: #f1f5f8; /* Catskill White */
    color: #1e1e76; /* Lucky Point */
    line-height: 1.6;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    font-size: 1rem;
    transition: background-color 0.3s, color 0.3s;
}

/* Video Background Styles */
.video-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
}

/* Styles for Day/Night Mode */
body.night-mode {
    background-color: #1e1e76; /* Dark Blue */
    color: #f1f5f8; /* Light Gray */
}

body.night-mode a {
    color: #ffffff; /* White */
}

/* Utilities */
.text-center {
    text-align: center;
}

.text-left {
    text-align: left;
}

.text-right {
    text-align: right;
}

.mt-1 {
    margin-top: 8px;
}

.mt-2 {
    margin-top: 16px;
}

.mb-1 {
    margin-bottom: 8px;
}

.mb-2 {
    margin-bottom: 16px;
}

/* Shared Container Styles */
.container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
}

/* Accessibility */
a {
    color: #1e1e76; /* Lucky Point */
    text-decoration: none;
    transition: color 0.3s;
}

a:hover,
a:focus {
    text-decoration: underline;
    color: #707ff5; /* Accent Blue */
    outline: none;
}

/* Focus Styles for Accessibility */
button:focus,
input:focus,
a:focus {
    outline: 2px dashed #1e1e76; /* Lucky Point */
    outline-offset: 4px;
}

/* Responsive Typography */
html {
    font-size: 100%; /* 16px */
}

@media (max-width: 768px) {
    body {
        font-size: 0.9rem;
    }
}

@media (min-width: 1200px) {
    body {
        font-size: 1.1rem;
    }
}

/* Dark Mode Adjustments for Links */
body.night-mode a:hover,
body.night-mode a:focus {
    color: #e0e0ff; /* Light Blue */
}


```

## header_shared.css
```python
/* ============================
   shared_header.css - Updated
============================ */

/* ============================
   CSS Variables for Consistency
============================ */
:root {
    --primary-color: #1e1e76; /* Lucky Point */
    --secondary-color: #f1f5f8; /* Catskill White */
    --accent-color: #707ff5;
    --error-color: #e74c3c;
    --font-primary: 'Poppins', sans-serif;
    --font-secondary: 'Raleway', sans-serif;
    --font-montserrat: 'Montserrat', sans-serif;
    --border-radius: 4px;
    --transition-speed: 0.3s;
    --badge-background: #e74c3c;
    --badge-color: #ffffff;
    --outline-color: var(--primary-color);
}

/* ============================
   Importing Fonts
============================ */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&family=Raleway:wght@400;500;700&family=Montserrat:wght@700&display=swap');

/* ============================
   Keyframes for Spinning Logo
============================ */
@keyframes spinCounterclockwise {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(-360deg);
    }
}

/* ============================
   Shared Header Styles
============================ */
.header {
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 1000;
    background-color: var(--header-background);
    transition: background-color var(--transition-speed), box-shadow var(--transition-speed);
}

body.night-mode .header {
    background-color: var(--header-background-night);
    box-shadow: 0 2px 4px rgba(255, 255, 255, 0.1);
}

/* ============================
   Logo Animation
============================ */
.logo {
    animation: spinCounterclockwise 12s linear infinite;
    transition: height var(--transition-speed), transform var(--transition-speed);
    /* Ensure smooth scaling and rotation */
}



/* ============================
   Universal Button Styling
============================ */
button {
    cursor: pointer;
    border: none;
    outline: none;
    transition: background-color 0.3s, transform 0.2s;
    font-family: var(--font-primary);
    background-color: transparent; /* Default to transparent, override as needed */
    color: inherit; /* Inherit text color, override as needed */
    padding: 8px 12px; /* Standard padding */
    border-radius: var(--border-radius);
}

button:hover,
button:focus {
    transform: scale(1.05);
    /* Optionally add a slight color change on hover */
}

button:focus {
    outline: 2px solid var(--outline-color);
    outline-offset: 2px;
}

/* ============================
   Badge Styling for Credits
============================ */
.badge {
    background-color: var(--badge-background);
    color: var(--badge-color);
    padding: 2px 6px;
    border-radius: 12px;
    font-size: 12px;
    position: relative;
    display: inline-block;
    /* Optional: Add a subtle shadow */
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* ============================
   Header Visibility Control
============================ */

/* Hide both headers by default */
.mobile-header,
.desktop-header {
    display: none;
}

/* Show Mobile Header */
@media (max-width: 768px) {
    .mobile-header {
        display: block;
        font-size: 14px;
    }
}

/* Show Desktop Header */
@media (min-width: 769px) {
    .desktop-header {
        display: block;
    }
}

/* ============================
   Accessibility Enhancements
============================ */

/* Ensure all buttons are accessible via keyboard */
button:focus-visible {
    outline: 2px solid var(--outline-color);
    outline-offset: 2px;
}

/* ============================
   Remove Duplicate Keyframes
============================ */
/* Note: The duplicate @keyframes block has been removed to prevent redundancy. */

```

## header_mobile.css
```python
/* ============================
   header_mobile.css - Updated
============================ */

/* General Styles for Mobile Header */
.mobile-header {
    padding: 12px 20px;
    border-radius: 12px; /* Increased border-radius for more rounded edges */
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    transition: background-color 0.3s, box-shadow 0.3s;
}


/* Header Container */
.mobile-header .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

/* Row Layout */
.mobile-header .header-row {
    display: flex;
    align-items: center;
    justify-content: space-between; /* Space between the logo/title and buttons */
    width: 100%;
}

/* Logo and Title Container */
.mobile-header .logo-container {
    display: flex;
    align-items: center;
    gap: 12px; /* Spacing between logo and title */
    flex-shrink: 0; /* Prevent shrinking */
}

.mobile-header .logo {
    height: 40px; /* Adjust logo height for mobile */
    width: auto;
}

.mobile-header .title {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.125rem;
    font-weight: bold;
    color: #1e1e76;
    margin: 0;
    white-space: nowrap; /* Prevent wrapping */
}

body.night-mode .mobile-header .title {
    color: #f1f5f8;
}

/* Button Container */
.mobile-header .button-container {
    display: flex;
    gap: 8px;
    align-items: center;
    margin-left: auto; /* Push buttons to the right */
}

/* Button Styles */
.mobile-header .button-language,
.mobile-header .button-theme-toggle,
.mobile-header .button-credits,
.mobile-header .button-learn-more {
    font-size: 0.875rem;
    padding: 6px 12px; /* Adjusted padding for better fit */
    background-color: #1e1e76;
    color: #ffffff;
    border: none;
    border-radius: 12px; /* Increased border-radius */
    cursor: pointer;
    transition: background-color 0.3s;
    font-family: 'Raleway', sans-serif;
}

body.night-mode .mobile-header .button-language,
body.night-mode .mobile-header .button-theme-toggle,
body.night-mode .mobile-header .button-credits,
body.night-mode .mobile-header .button-learn-more {
    background-color: #14145e;
}

.mobile-header .button-credits .badge {
    position: relative;
    background-color: #ff0000;
    border-radius: 50%;
    padding: 2px 6px;
    font-size: 0.75rem;
    color: #ffffff;
}

.mobile-header .button-language:hover,
.mobile-header .button-theme-toggle:hover,
.mobile-header .button-credits:hover,
.mobile-header .button-learn-more:hover,
.mobile-header .button-language:focus,
.mobile-header .button-theme-toggle:focus,
.mobile-header .button-credits:focus,
.mobile-header .button-learn-more:focus {
    background-color: #14145e;
    outline: none;
}

/* Responsive Design */
@media (max-width: 768px) {
    .mobile-header .title {
        font-size: 1rem; /* Slightly smaller for small screens */
    }

    .mobile-header .logo {
        height: 36px; /* Adjust logo size for smaller screens */
    }

    .mobile-header .logo-container {
        gap: 8px; /* Reduce spacing for smaller screens */
    }

    .mobile-header .button-language,
    .mobile-header .button-theme-toggle,
    .mobile-header .button-credits,
    .mobile-header .button-learn-more {
        font-size: 0.75rem;
        padding: 5px 10px; /* Further adjusted padding */
    }
}

```

## header_web.css
```python
/* ============================
   header_web.css - Updated
============================ */

/* Desktop Header Styles */
@media (min-width: 769px) {
    /* Desktop Header Container - Transparent Background */
    .desktop-header .header-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 0;
        flex-wrap: nowrap;
        border-radius: 12px; /* Increased border-radius for more rounded edges */
        transition: background-color 0.3s, box-shadow 0.3s;
    }

    /* Logo Container */
    .desktop-header .logo-container {
        flex: 0 0 auto;
        display: flex;
        align-items: center;
    }

    .desktop-header .logo {
        height: 120px; /* Larger logo for desktop */
        width: auto;
    }

    /* Info Container */
    .desktop-header .info-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 16px;
    }

    .desktop-header .title {
        font-family: 'Montserrat', sans-serif;
        font-size: 2.25rem;
        font-weight: bold;
        color: #1e1e76;
        margin-bottom: 8px;
    }

    .desktop-header .message {
        font-family: 'Raleway', sans-serif;
        font-size: 1rem;
        color: #1e1e76;
        margin-bottom: 4px;
    }

    body.night-mode .desktop-header .title,
    body.night-mode .desktop-header .message {
        color: #f1f5f8;
    }

    /* Menu Container */
    .desktop-header .menu-container {
        flex: 0 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
    }

    .desktop-header .menu-buttons {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .desktop-header .top-buttons {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
    }

    /* Button Styles */
    .desktop-header .button-language,
    .desktop-header .button-theme-toggle,
    .desktop-header .button-credits,
    .desktop-header .button-learn-more {
        padding: 8px 16px; /* Adjusted padding for better fit */
        font-size: 0.875rem;
        background-color: #1e1e76;
        color: #ffffff;
        border: none;
        border-radius: 12px; /* Increased border-radius */
        cursor: pointer;
        transition: background-color 0.3s;
        font-family: 'Raleway', sans-serif;
    }

    body.night-mode .desktop-header .button-language,
    body.night-mode .desktop-header .button-theme-toggle,
    body.night-mode .desktop-header .button-credits,
    body.night-mode .desktop-header .button-learn-more {
        background-color: #14145e;
    }

    .desktop-header .button-credits .badge {
        top: -0px;
        right: -6px;
    }

    .desktop-header .button-language:hover,
    .desktop-header .button-theme-toggle:hover,
    .desktop-header .button-credits:hover,
    .desktop-header .button-learn-more:hover,
    .desktop-header .button-language:focus,
    .desktop-header .button-theme-toggle:focus,
    .desktop-header .button-credits:focus,
    .desktop-header .button-learn-more:focus {
        background-color: #14145e; /* Darker blue on hover */
        outline: none;
    }

    /* Alignment Fixes */
    .desktop-header .menu-container {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }
}

```

