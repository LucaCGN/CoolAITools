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

        const language = getCurrentLanguage(); // Get current language

        // Fetch planning texts from the backend
        fetch('/topic_research/planning', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ topic: topicInput, focus: focusInput, language: language }),
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
        const language = getCurrentLanguage(); // Get current language

        fetch('/topic_research/report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ topic: topicInput, focus: focusInput, language: language }),
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
                if (activeTabContent) {
                    activeTabContent.style.display = 'block';
                }
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
