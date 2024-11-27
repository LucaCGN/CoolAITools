// static/js/website_navigation_download.js

const WebsiteNavigationDownloadModule = (function() {
    /**
     * Converts the website navigation JSON data to Markdown format.
     * @param {Object} jsonData - The JSON data of the report.
     * @returns {string} - The generated Markdown content.
     */
    function convertJSONToMarkdown(jsonData) {
        let markdown = '';

        // Report Title
        markdown += `# 📊 ${jsonData.report_title || 'Website Navigation Report'}\n\n`;

        // Summary
        if (jsonData.report_summary) {
            markdown += `## Summary\n\n${jsonData.report_summary}\n\n`;
        }

        // Detailed Content Summary
        if (jsonData.detailed_content_summary) {
            markdown += `## Detailed Content Summary\n\n`;

            if (jsonData.detailed_content_summary.introduction) {
                markdown += `### Introduction\n\n${jsonData.detailed_content_summary.introduction}\n\n`;
            }

            if (jsonData.detailed_content_summary.main_sections) {
                for (let key in jsonData.detailed_content_summary.main_sections) {
                    if (jsonData.detailed_content_summary.main_sections.hasOwnProperty(key)) {
                        const sectionTitle = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                        markdown += `### ${sectionTitle}\n\n${jsonData.detailed_content_summary.main_sections[key]}\n\n`;
                    }
                }
            }

            if (jsonData.detailed_content_summary.key_points && jsonData.detailed_content_summary.key_points.length > 0) {
                markdown += `### Key Points\n\n`;
                jsonData.detailed_content_summary.key_points.forEach(point => {
                    markdown += `- ${point}\n`;
                });
                markdown += `\n`;
            }
        }

        // Detailed Analysis
        if (jsonData.detailed_analysis) {
            markdown += `## Detailed Analysis\n\n`;

            for (let key in jsonData.detailed_analysis) {
                if (jsonData.detailed_analysis.hasOwnProperty(key)) {
                    const analysisTitle = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                    if (Array.isArray(jsonData.detailed_analysis[key])) {
                        markdown += `### ${analysisTitle}\n\n`;
                        jsonData.detailed_analysis[key].forEach(item => {
                            markdown += `- ${item}\n`;
                        });
                        markdown += `\n`;
                    } else {
                        markdown += `### ${analysisTitle}\n\n${jsonData.detailed_analysis[key]}\n\n`;
                    }
                }
            }
        }

        // Main Sources
        if (jsonData.main_sources && jsonData.main_sources.length > 0) {
            markdown += `## Main Sources\n\n`;
            jsonData.main_sources.forEach(source => {
                markdown += `- **[${source.title}](${source.url})**: ${source.description}\n`;
            });
            markdown += `\n`;
        }

        // Quotes
        if (jsonData.quotes && jsonData.quotes.length > 0) {
            markdown += `## Quotes\n\n`;
            jsonData.quotes.forEach(quoteItem => {
                markdown += `> "${quoteItem.quote}"\n> \- ${quoteItem.source}\n\n`;
            });
        }

        // References
        if (jsonData.references && jsonData.references.length > 0) {
            markdown += `## References\n\n`;
            jsonData.references.forEach((ref, index) => {
                markdown += `${index + 1}. [${ref.url}](${ref.url}) - "${ref.keyQuote}"\n`;
            });
            markdown += `\n`;
        }

        // Extracted Links
        if (jsonData.extracted_links && jsonData.extracted_links.length > 0) {
            markdown += `## Extracted Links\n\n`;
            jsonData.extracted_links.forEach(link => {
                markdown += `- [${link.url}](${link.url}): ${link.description}\n`;
            });
            markdown += `\n`;
        }

        // Fetched Links Content
        if (jsonData.fetched_links_content && jsonData.fetched_links_content.length > 0) {
            markdown += `## Fetched Links Content\n\n`;
            jsonData.fetched_links_content.forEach(linkContent => {
                markdown += `### [${linkContent.url}](${linkContent.url})\n\n`;
                markdown += `**Summary:** ${linkContent.content_summary}\n\n`;
                markdown += `**Key Insights:**\n`;
                linkContent.key_insights.forEach(insight => {
                    markdown += `- ${insight}\n`;
                });
                markdown += `\n`;
            });
        }

        return markdown;
    }

    /**
     * Downloads the website navigation report as a Markdown file.
     */
    function downloadWebsiteNavigationReport() {
        const reportData = window.websiteNavigationReportData;
        if (!reportData) {
            alert('No report data available to download.');
            return;
        }
        const markdownContent = convertJSONToMarkdown(reportData);
        const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'Website_Navigation_Report.md';
        a.style.display = 'none';

        document.body.appendChild(a);
        a.click();

        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 100);
    }

    /**
     * Copies the website navigation report to the clipboard in Markdown format.
     */
    function copyWebsiteNavigationReport() {
        const reportData = window.websiteNavigationReportData;
        if (!reportData) {
            alert('No report data available to copy.');
            return;
        }
        const markdownContent = convertJSONToMarkdown(reportData);

        navigator.clipboard.writeText(markdownContent)
            .then(() => {
                alert('Report copied to clipboard!');
            })
            .catch(err => {
                console.error('Could not copy text: ', err);
                alert('Failed to copy the report.');
            });
    }

    // Expose the download and copy functions to the global scope
    window.downloadWebsiteNavigationReport = downloadWebsiteNavigationReport;
    window.copyWebsiteNavigationReport = copyWebsiteNavigationReport;

    return {
        // Optionally expose other functions or variables
    };
})();
