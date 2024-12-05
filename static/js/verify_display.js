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
            alert(window.translations.error_empty_claim || "Please enter a claim to verify.");
            return;
        }

        transitionState(STATES.PREPARING_CREW);
        showSpinner(window.translations.preparing_crew || "Preparing crew...");

        const language = getCurrentLanguage(); // Get current language

        // Fetch planning texts from the backend
        fetch('/verify/planning', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ claim: claimInput, language: language }),
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
            transitionState(STATES.ERROR, window.translations.error_preparing_crew || "An error occurred while preparing the crew.");
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
                showSpinner(window.translations.preparing_report || "Preparing report...");
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

            const cardText = planningTexts[index];
            const card = createLoadingCard(cardText, true);
            loadingCardsContainer.appendChild(card);

            // Update the reference to the current card
            previousCurrentCard = card;

            index++;
            setTimeout(addNextCard, 3000);
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
        const claimInput = document.getElementById('fact_check_input').value.trim();
        const language = getCurrentLanguage(); // Get current language

        fetch('/verify/report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ claim: claimInput, language: language }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                transitionState(STATES.ERROR, data.error);
                return;
            }
            // Assign the JSON object directly without parsing
            window.verifyReportData = data;

            transitionState(STATES.REPORT_READY);
            hideSpinner();
            displayReport(window.verifyReportData);
        })
        .catch(error => {
            console.error('Error:', error);
            transitionState(STATES.ERROR, window.translations.error_preparing_report || "An error occurred while preparing the report.");
        });
    }

    function displayReport(data) {
        // Clear the output container
        outputContainer.innerHTML = '';

        // Create a wrapper div to hold the report content
        const reportWrapper = document.createElement('div');
        reportWrapper.id = 'report-wrapper';

        // Render header with claim and verification result
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
        factualityLabel.textContent = window.translations.factuality_score || "Factuality Score:";
        factualityLabel.classList.add('tooltip');
        factualityLabel.innerHTML += `<span class="tooltiptext">${window.translations.factuality_score_tooltip || "A score that represents the strength of evidence supporting the claim."}</span>`;

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
            scoreLabel.textContent = window.translations.strongly_supported || "Strongly Supported";
        } else if (score >= 0.5) {
            scoreLabel.textContent = window.translations.supported || "Supported";
        } else if (score >= 0.25) {
            scoreLabel.textContent = window.translations.neutral || "Neutral";
        } else {
            scoreLabel.textContent = window.translations.not_supported || "Not Supported";
        }

        factualitySection.appendChild(factualityLabel);
        factualitySection.appendChild(progressBarContainer);
        factualitySection.appendChild(scoreLabel);

        // Reason Section (Collapsible)
        const reasonSection = createCollapsibleSection(window.translations.reason || "Reason", data.details.reason);

        // Conclusion Section (Collapsible)
        const conclusionSection = createCollapsibleSection(window.translations.conclusion || "Conclusion", data.conclusion);

        // References Section
        const referencesSection = createReferencesSection(data.details.references);

        // **Define reportCard**
        const reportCard = document.createElement('div');
        reportCard.classList.add('report-card');

        // Assemble Report Card
        reportCard.appendChild(reportHeader);
        reportCard.appendChild(factualitySection);
        reportCard.appendChild(reasonSection);
        reportCard.appendChild(conclusionSection);
        reportCard.appendChild(referencesSection);

        // Append Report Header and Report Card to Report Wrapper
        reportWrapper.appendChild(reportHeader);
        reportWrapper.appendChild(reportCard);

        // Append the report wrapper to the output container
        outputContainer.appendChild(reportWrapper);

        // Create Download and Copy Buttons
        const actionButtonsContainer = document.createElement('div');
        actionButtonsContainer.classList.add('action-buttons');

        const downloadButton = document.createElement('button');
        downloadButton.classList.add('download-button');
        downloadButton.textContent = window.translations.download_report || 'Download Report';
        downloadButton.addEventListener('click', () => {
            if (typeof downloadVerifyReport === 'function') {
                downloadVerifyReport();
            } else {
                console.error('Download function not found.');
            }
        });

        const copyButton = document.createElement('button');
        copyButton.classList.add('copy-button');
        copyButton.textContent = window.translations.copy_to_clipboard || 'Copy to Clipboard';
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
        title.textContent = window.translations.references || "References";

        const filterOptions = document.createElement('div');
        filterOptions.classList.add('filter-options');

        const allFilter = document.createElement('button');
        allFilter.classList.add('filter-button', 'active');
        allFilter.textContent = window.translations.all || "All";
        allFilter.addEventListener('click', () => filterReferences('all'));

        const supportiveFilter = document.createElement('button');
        supportiveFilter.classList.add('filter-button');
        supportiveFilter.textContent = window.translations.supportive || "Supportive";
        supportiveFilter.addEventListener('click', () => filterReferences('supportive'));

        const nonSupportiveFilter = document.createElement('button');
        nonSupportiveFilter.classList.add('filter-button');
        nonSupportiveFilter.textContent = window.translations.non_supportive || "Non-Supportive";
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
        readSource.textContent = window.translations.read_source || "Read Source";

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
