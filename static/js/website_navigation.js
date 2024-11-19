// static/js/website_navigation.js

const WebsiteNavigationModule = (function() {
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

        // Ensure we use the topic from the JSON data
        const reportTopic = data.topic || 'Report';

        // Render header with topic and URL
        const headerSection = document.createElement('header');
        headerSection.classList.add('header-section');

        const topicTitle = document.createElement('h1');
        topicTitle.classList.add('topic-title');
        topicTitle.textContent = reportTopic;

        const reportUrl = document.createElement('a');
        reportUrl.href = data.url;
        reportUrl.target = '_blank';
        reportUrl.classList.add('report-url');
        reportUrl.textContent = data.url;

        headerSection.appendChild(topicTitle);
        headerSection.appendChild(reportUrl);

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

        // Append the report wrapper to the output container
        outputContainer.appendChild(reportWrapper);

        // Create Download and Copy Buttons
        const actionButtonsContainer = document.createElement('div');
        actionButtonsContainer.classList.add('action-buttons');

        const downloadButton = document.createElement('button');
        downloadButton.classList.add('download-button');
        downloadButton.textContent = 'Download Report';
        downloadButton.addEventListener('click', () => {
            downloadReportAsMarkdown(reportWrapper, 'Website_Navigation_Report.md');
        });

        const copyButton = document.createElement('button');
        copyButton.classList.add('copy-button');
        copyButton.textContent = 'Copy to Clipboard';
        copyButton.addEventListener('click', () => {
            copyReportToClipboard(reportWrapper);
        });

        actionButtonsContainer.appendChild(downloadButton);
        actionButtonsContainer.appendChild(copyButton);

        // Append action buttons to the output container
        outputContainer.appendChild(actionButtonsContainer);
    }

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
                    <p>${ref.keyQuote}</p>
                </div>
            `;
        });
        return content;
    }

    function createList(items) {
        return `<ul>${items.map(item => `<li>${item}</li>`).join('')}</ul>`;
    }

    function showError(message) {
        outputContainer.innerHTML = `<div class="error-message">${message}</div>`;
    }

    // Function to convert report to Markdown
    function convertReportToMarkdown(reportElement) {
        let markdown = '';

        function parseElement(element) {
            element.childNodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE) {
                    markdown += node.textContent;
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    switch (node.tagName.toLowerCase()) {
                        case 'h1':
                            markdown += `# ${node.textContent}\n\n`;
                            break;
                        case 'h2':
                            markdown += `## ${node.textContent}\n\n`;
                            break;
                        case 'h3':
                            markdown += `### ${node.textContent}\n\n`;
                            break;
                        case 'h4':
                            markdown += `#### ${node.textContent}\n\n`;
                            break;
                        case 'p':
                            markdown += `${node.textContent}\n\n`;
                            break;
                        case 'ul':
                            node.childNodes.forEach(li => {
                                if (li.tagName && li.tagName.toLowerCase() === 'li') {
                                    markdown += `- ${li.textContent}\n`;
                                }
                            });
                            markdown += `\n`;
                            break;
                        case 'div':
                            parseElement(node);
                            break;
                        case 'span':
                            parseElement(node);
                            break;
                        case 'a':
                            markdown += `[${node.textContent}](${node.href})`;
                            break;
                        default:
                            parseElement(node);
                            break;
                    }
                }
            });
        }

        parseElement(reportElement);

        // Clean up extra spaces and blank lines
        markdown = markdown.replace(/\n{2,}/g, '\n\n').trim();

        return markdown;
    }

    // Function to download report as Markdown file
    function downloadReportAsMarkdown(reportElement, filename) {
        const markdownContent = convertReportToMarkdown(reportElement);
        const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.style.display = 'none';

        document.body.appendChild(a);
        a.click();

        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 100);
    }

    // Function to copy report to clipboard
    function copyReportToClipboard(reportElement) {
        const markdownContent = convertReportToMarkdown(reportElement);

        navigator.clipboard.writeText(markdownContent)
            .then(() => {
                alert('Report copied to clipboard!');
            })
            .catch(err => {
                console.error('Could not copy text: ', err);
            });
    }

    return {};
})();
