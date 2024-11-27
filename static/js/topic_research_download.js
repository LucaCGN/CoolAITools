// static/js/topic_research_download.js

const TopicResearchDownloadModule = (function() {
    /**
     * Converts the topic research report JSON data to Markdown format.
     * @param {Object} jsonData - The topic research report JSON data.
     * @returns {string} - The generated Markdown content.
     */
    function convertJSONToMarkdown(jsonData) {
        let markdown = '';

        // Title
        markdown += `# 📚 ${jsonData.report_title}\n\n`;

        // Summary
        markdown += `## Summary\n\n${jsonData.report_summary}\n\n`;

        // Report Content
        markdown += `## Report Content\n\n`;
        jsonData.report_content.forEach(section => {
            markdown += `### ${section.title}\n\n`;
            markdown += `**Description:** ${section.description}\n\n`;
            markdown += `**URL:** [${section.url}](${section.url})\n\n`;
            markdown += `**Published Time:** ${section.published_time}\n\n`;
            markdown += `**Key Points:**\n`;
            section.key_points.forEach(point => {
                markdown += `- ${point}\n`;
            });
            markdown += `\n`;
        });

        // Main Sources
        markdown += `## Main Sources\n\n`;
        jsonData.main_sources.forEach(source => {
            markdown += `- [${source.title}](${source.url}): ${source.description}\n`;
        });
        markdown += `\n`;

        // Quotes
        markdown += `## Quotes\n\n`;
        jsonData.quotes.forEach(quoteItem => {
            markdown += `> "${quoteItem.quote}" - *${quoteItem.source}*\n\n`;
        });

        // References
        markdown += `## References\n\n`;
        jsonData.references.forEach((ref, index) => {
            markdown += `${index + 1}. [${ref.url}](${ref.url}) - "${ref.keyQuote}"\n`;
        });

        return markdown;
    }

    /**
     * Downloads the topic research report as a Markdown file.
     */
    function downloadReport() {
        const jsonData = window.topicResearchReportData;
        if (!jsonData) {
            alert('No report data available to download.');
            return;
        }
        const markdownContent = convertJSONToMarkdown(jsonData);
        const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'Topic_Research_Report.md';
        a.style.display = 'none';

        document.body.appendChild(a);
        a.click();

        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 100);
    }

    /**
     * Copies the topic research report to the clipboard in Markdown format.
     */
    function copyReportToClipboard() {
        const jsonData = window.topicResearchReportData;
        if (!jsonData) {
            alert('No report data available to copy.');
            return;
        }
        const markdownContent = convertJSONToMarkdown(jsonData);

        navigator.clipboard.writeText(markdownContent)
            .then(() => {
                alert('Report copied to clipboard!');
            })
            .catch(err => {
                console.error('Could not copy text: ', err);
                alert('Failed to copy the report.');
            });
    }

    // Expose functions to the global scope for access from display script
    window.downloadReport = downloadReport;
    window.copyReportToClipboard = copyReportToClipboard;

    return {
        // No additional exposures needed
    };
})();
