// static/js/verify_download.js

const VerifyDownloadModule = (function() {
    /**
     * Converts the JSON report data to Markdown format.
     * @param {Object} jsonData - The JSON data of the report.
     * @returns {string} - The Markdown formatted string.
     */
    function convertJSONToMarkdown(jsonData) {
        let markdown = '';

        // Title
        markdown += `# 🧐 ${jsonData.claim}\n\n`;

        // Verification Result
        markdown += `**Verification Result:** ${jsonData.details.result ? 'True' : 'False'}\n\n`;

        // Factuality Score
        markdown += `**Factuality Score:** ${jsonData.details.factuality}\n\n`;

        // Reason
        markdown += `## Reason\n\n${jsonData.details.reason}\n\n`;

        // Conclusion
        markdown += `## Conclusion\n\n${jsonData.conclusion}\n\n`;

        // References
        markdown += `## References\n\n`;
        jsonData.details.references.forEach((ref, index) => {
            markdown += `${index + 1}. [${ref.url}](${ref.url}) - "${ref.keyQuote}"\n`;
            markdown += `   - Supportive: ${ref.isSupportive ? 'Yes' : 'No'}\n\n`;
        });

        return markdown;
    }

    /**
     * Downloads the verification report as a Markdown file.
     */
    function downloadVerifyReport() {
        const reportData = window.verifyReportData;
        if (!reportData) {
            alert('No report data available to download.');
            return;
        }

        const markdownContent = convertJSONToMarkdown(reportData);
        const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'Fact_Check_Report.md';
        a.style.display = 'none';

        document.body.appendChild(a);
        a.click();

        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 100);
    }

    /**
     * Copies the verification report to the clipboard in Markdown format.
     */
    function copyVerifyReport() {
        const reportData = window.verifyReportData;
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
    window.downloadVerifyReport = downloadVerifyReport;
    window.copyVerifyReport = copyVerifyReport;

    return {
        // Optionally expose other functions or variables
    };
})();
