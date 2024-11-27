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
