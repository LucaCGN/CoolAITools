# 🤖 Cool AI Tools - Simple AI for Everyone 🚀

Welcome to **Cool AI Tools**, a suite of intuitive and powerful AI-driven solutions designed to empower individuals and organizations. Our platform offers a range of tools including Fact Checking, Topic Research, and Website Navigation, all seamlessly integrated into a user-friendly web interface. Whether you're verifying information, conducting in-depth research, or navigating complex websites, **Cool AI Tools** provides the simplicity and efficiency you need.

---

## Table of Contents

- [🤖 Cool AI Tools - Simple AI for Everyone 🚀](#-cool-ai-tools---simple-ai-for-everyone-)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Architecture](#architecture)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Configuration](#configuration)
    - [Running the Application](#running-the-application)
  - [Usage](#usage)
    - [Fact Checking](#fact-checking)
    - [Topic Research](#topic-research)
    - [Website Navigation](#website-navigation)
  - [API Endpoints](#api-endpoints)
  - [Frontend Details](#frontend-details)
  - [Backend Details](#backend-details)
  - [Deployment](#deployment)
  - [License](#license)
  - [Contributing](#contributing)
  - [Contact](#contact)
  - [Acknowledgements](#acknowledgements)

---

## Introduction

**Cool AI Tools** is an AI-powered platform that democratizes access to advanced tools, making them accessible to everyone. Built with a focus on simplicity and effectiveness, our platform leverages cutting-edge technologies to deliver reliable and actionable insights. Whether you're an individual user seeking to verify a claim or a business aiming to conduct comprehensive research, **Cool AI Tools** is your go-to solution.

---

## Features

- **Fact Checking 🧐**
  - Verify claims with precision using specialized AI models.
  - Access example claims to streamline the verification process.
  - Download or copy detailed reports for your records.

- **Topic Research 📚**
  - Conduct in-depth research on any topic with optional focus areas.
  - Utilize example topics to kickstart your research.
  - Generate comprehensive reports summarizing your findings.

- **Website Navigation 🧙**
  - Navigate and analyze websites efficiently.
  - Use example URLs to explore website content.
  - Obtain detailed reports on website topics and focus areas.

- **User-Friendly Interface**
  - Intuitive design with easy navigation between different tools.
  - Responsive design ensuring optimal experience across devices.

- **Secure and Private**
  - Designed for internal use within organizations.
  - Ensures data privacy and security for all users.

---

## Architecture

**Cool AI Tools** follows a modular architecture, separating concerns between the frontend and backend to ensure scalability and maintainability.

- **Frontend:**
  - Built with HTML, CSS, and JavaScript.
  - Utilizes Google Fonts for enhanced typography.
  - Implements dynamic content rendering with JavaScript modules for each tool.

- **Backend:**
  - Powered by FastAPI, a high-performance Python web framework.
  - Includes multiple API routes for handling Fact Checking, Topic Research, and Website Navigation.
  - Integrates with external AI services (e.g., OpenAI, Jina AI) for processing tasks.
  - Uses Pydantic for data validation and structured output.

- **Inter-Agent Communication:**
  - Employs CrewAI for orchestrating agents and tasks, ensuring efficient processing and response generation.

---

## Getting Started

Follow these instructions to set up and run **Cool AI Tools** within your organization.

### Prerequisites

Ensure you have the following installed on your system:

- **Python 3.8+**
- **Node.js (for frontend development, if applicable)**
- **pip (Python package installer)**
- **Virtual Environment Tool (e.g., `venv` or `virtualenv`)**

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/cool-ai-tools.git
   cd cool-ai-tools
   ```

2. **Set Up the Python Virtual Environment**

   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Python Dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Install Frontend Dependencies**

   If your project includes frontend dependencies managed via `npm` or `yarn`, install them accordingly.

   ```bash
   npm install
   # or
   yarn install
   ```

### Configuration

1. **Environment Variables**

   Create a `.env` file in the root directory and add the necessary environment variables:

   ```env
   OPENAI_API_KEY=your_openai_api_key
   JINA_API_KEY=your_jina_api_key
   ```

   Replace `your_openai_api_key` and `your_jina_api_key` with your actual API keys.

2. **API Keys**

   - **OpenAI API Key:** Required for AI processing tasks.
   - **Jina API Key:** Required for interacting with Jina AI services.

### Running the Application

1. **Start the Backend Server**

   ```bash
   uvicorn main:app --reload
   ```

   The server will start at `http://127.0.0.1:8000/`.

2. **Access the Application**

   Open your web browser and navigate to `http://127.0.0.1:8000/` to access **Cool AI Tools**.

---

## Usage

Explore the various tools offered by **Cool AI Tools** through the intuitive web interface.

### Fact Checking

1. **Navigate to Fact Checking Tab 🧐**
2. **Enter a Claim:**
   - Input a claim manually or select from example claims.
3. **Run Verification:**
   - Click on the "Run Specialized AI Team 🚀" button.
4. **View Report:**
   - Analyze the detailed verification report.
   - Download or copy the report as needed.

### Topic Research

1. **Navigate to Topic Research Tab 📚**
2. **Enter a Topic:**
   - Input your research topic and an optional focus area.
   - Alternatively, select from example topics.
3. **Run Research:**
   - Click on the "Run Specialized AI Team 🚀" button.
4. **View Report:**
   - Review the comprehensive research report.
   - Download or copy the report as needed.

### Website Navigation

1. **Navigate to Website Navigation Tab 🧙**
2. **Enter a URL:**
   - Input the website URL and an optional topic of focus.
   - Alternatively, select from example URLs.
3. **Run Navigation:**
   - Click on the "Run Specialized AI Team 🚀" button.
4. **View Report:**
   - Examine the detailed website navigation report.
   - Download or copy the report as needed.

---

## API Endpoints

**Cool AI Tools** exposes several API endpoints for each tool. Below is an overview of the available routes.

### Fact Checking

- **Planning Phase**

  ```
  POST /verify/planning
  ```

  **Request Body:**

  ```json
  {
    "claim": "Your claim here"
  }
  ```

  **Response:**

  ```json
  {
    "thought_process": ["Step 1", "Step 2", "..."]
  }
  ```

- **Report Generation**

  ```
  POST /verify/report
  ```

  **Request Body:**

  ```json
  {
    "claim": "Your claim here"
  }
  ```

  **Response:**

  ```json
  {
    "claim": "Your claim here",
    "details": {
      "factuality": 0.9,
      "result": true,
      "reason": "The claim aligns with verified sources.",
      "references": [
        {
          "url": "https://example.com",
          "keyQuote": "This source supports the claim.",
          "isSupportive": true
        }
      ]
    },
    "conclusion": "Detailed conclusion here."
  }
  ```

### Topic Research

- **Planning Phase**

  ```
  POST /topic_research/planning
  ```

  **Request Body:**

  ```json
  {
    "topic": "Your research topic here",
    "focus": "Optional focus area"
  }
  ```

  **Response:**

  ```json
  {
    "thought_process": ["Step 1", "Step 2", "..."]
  }
  ```

- **Report Generation**

  ```
  POST /topic_research/report
  ```

  **Request Body:**

  ```json
  {
    "topic": "Your research topic here",
    "focus": "Optional focus area"
  }
  ```

  **Response:**

  ```json
  {
    "report_title": "Topic Research Report",
    "report_summary": "Summary of findings...",
    "report_content": [
      {
        "title": "Article Title",
        "url": "https://example.com/article",
        "description": "Brief description.",
        "published_time": "2023-01-01T00:00:00Z",
        "key_points": ["Point A", "Point B"]
      }
      // More articles...
    ],
    "main_sources": [
      {
        "title": "Main Source Title",
        "url": "https://example.com/source",
        "description": "Description of the source."
      }
      // More sources...
    ],
    "quotes": [
      {
        "quote": "A relevant quote.",
        "source": "Source Title or URL"
      }
      // More quotes...
    ],
    "references": [
      {
        "url": "https://example.com/reference",
        "keyQuote": "A key quote from the reference."
      }
      // More references...
    ]
  }
  ```

### Website Navigation

- **Planning Phase**

  ```
  POST /website_navigation/planning
  ```

  **Request Body:**

  ```json
  {
    "url": "https://example.com",
    "topic": "Optional topic of focus"
  }
  ```

  **Response:**

  ```json
  {
    "thought_process": ["Step 1", "Step 2", "..."]
  }
  ```

- **Report Generation**

  ```
  POST /website_navigation/report
  ```

  **Request Body:**

  ```json
  {
    "url": "https://example.com",
    "topic": "Optional topic of focus"
  }
  ```

  **Response:**

  ```json
  {
    "report_title": "Website Navigation Report",
    "report_summary": "Summary of website analysis...",
    "report_content": [
      {
        "title": "Page Title",
        "url": "https://example.com/page",
        "description": "Description of the page.",
        "published_time": "2023-01-01T00:00:00Z",
        "key_points": ["Point 1", "Point 2"]
      }
      // More pages...
    ],
    "main_sources": [
      {
        "title": "Main Source Title",
        "url": "https://example.com/source",
        "description": "Description of the source."
      }
      // More sources...
    ],
    "quotes": [
      {
        "quote": "A relevant quote.",
        "source": "Source Title or URL"
      }
      // More quotes...
    ],
    "references": [
      {
        "url": "https://example.com/reference",
        "keyQuote": "A key quote from the reference."
      }
      // More references...
    ]
  }
  ```

---

## Frontend Details

The frontend of **Cool AI Tools** is crafted using standard web technologies, ensuring compatibility and responsiveness across various devices.

### `base.html`

- **Structure:**
  - **Header:** Displays the main title and description.
  - **Tabs:** Navigation between different tools (Fact Checking, Topic Research, Website Navigation).
  - **Content Areas:** Dedicated sections for each tool, hidden or shown based on active tab.
  - **Input Groups:** Fields and buttons for user input and action triggers.
  - **Output Containers:** Sections to display results and reports.

- **Styling:**
  - Utilizes Google Fonts for modern typography.
  - Organized CSS files for general styles, loading animations, and tool-specific styles.

- **Scripts:**
  - Modular JavaScript files handle interactions and dynamic content rendering for each tool.

### JavaScript Modules

- **`scripts.js`:** Handles common functionalities such as populating input fields and managing tab navigation.
- **`verify.js`:** Manages Fact Checking tool operations, including state transitions and report generation.
- **`topic_research.js`:** Handles Topic Research tool operations, including state management and report rendering.
- **`website_navigation.js`:** Manages Website Navigation tool operations, including state transitions and report generation.

---

## Backend Details

The backend is built with FastAPI, ensuring high performance and easy scalability. It handles API requests, processes data with AI tools, and generates structured reports.

### `main.py`

- **Initialization:**
  - Sets up the FastAPI application.
  - Configures logging for detailed insights.
  - Mounts static files and sets up Jinja2 templates.

- **Routes:**
  - **Home Route (`/`):** Serves the main HTML page.
  - **API Routers:** Includes routes for Fact Checking, Topic Research, and Website Navigation.

### API Routers

- **`verify.py`:** Handles Fact Checking functionalities.
  - **`/verify/planning`:** Prepares thought processes for verifying claims.
  - **`/verify/report`:** Generates verification reports based on claims.

- **`topic_research.py`:** Manages Topic Research functionalities.
  - **`/topic_research/planning`:** Prepares thought processes for topic research.
  - **`/topic_research/report`:** Generates research reports based on topics.

- **`website_navigation.py`:** Oversees Website Navigation functionalities.
  - **`/website_navigation/planning`:** Prepares thought processes for website navigation.
  - **`/website_navigation/report`:** Generates navigation reports based on URLs and topics.

### AI Integration

- **OpenAI API:** Utilized for generating thought processes and report content.
- **Jina AI:** Integrated for advanced grounding and content fetching capabilities.
- **CrewAI:** Orchestrates agents and tasks to ensure efficient processing and response generation.

---

## Deployment

Deploy **Cool AI Tools** within your organization's infrastructure to offer AI-driven solutions in the cloud.

### Steps to Deploy

1. **Prepare the Environment:**
   - Ensure all prerequisites are met.
   - Secure necessary API keys and set them as environment variables.

2. **Containerization (Optional):**
   - Use Docker to containerize the application for consistent deployment.
   - Example `Dockerfile`:

     ```dockerfile
     FROM python:3.9-slim

     WORKDIR /app

     COPY requirements.txt .
     RUN pip install --no-cache-dir -r requirements.txt

     COPY . .

     CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
     ```

3. **Deploy to Cloud Platforms:**
   - Utilize platforms like AWS, Azure, or Google Cloud for scalable deployment.
   - Ensure proper configuration of environment variables and secrets.

4. **Set Up Reverse Proxy (Optional):**
   - Use Nginx or similar for handling incoming requests and serving static files.

5. **Monitor and Maintain:**
   - Implement monitoring tools to track application performance and logs.
   - Regularly update dependencies and maintain security best practices.

---

## License

**Cool AI Tools** is released under a **Custom Open-But-Non-Distributable License**. This license allows for open access within organizations and companies for internal use, including deployment and utilization of the platform's tools and functionalities. However, redistribution, resale, or commercial distribution of the software is strictly prohibited. The platform is intended to be offered as a cloud-based solution, maintaining proprietary control over the product.

### Key Terms

- **Allowed Uses:**
  - Internal deployment within organizations.
  - Modification and customization for internal workflows.
  - Usage of tools and features for organizational purposes.

- **Prohibited Uses:**
  - Selling, sublicensing, or distributing the software to third parties.
  - Sharing the source code or binaries outside the organization.
  - Commercializing the platform without explicit permission.

For more details, please refer to the [LICENSE](LICENSE) file.

---

## Contributing

We welcome contributions from the community to enhance **Cool AI Tools**. If you're interested in contributing, please follow these guidelines:

1. **Fork the Repository**
2. **Create a Feature Branch**

   ```bash
   git checkout -b feature/YourFeature
   ```

3. **Commit Your Changes**

   ```bash
   git commit -m "Add your feature"
   ```

4. **Push to the Branch**

   ```bash
   git push origin feature/YourFeature
   ```

5. **Open a Pull Request**

   Provide a clear description of your changes and the problem they address.

**Please ensure that your contributions adhere to the project's licensing terms.**

---

## Contact

For any questions, feedback, or support, please reach out to us:

- **Email:** support@coolaitools.com
- **Website:** [https://www.coolaitools.com](https://www.coolaitools.com)
- **GitHub Issues:** [https://github.com/yourusername/cool-ai-tools/issues](https://github.com/yourusername/cool-ai-tools/issues)

---

## Acknowledgements

- **OpenAI:** For providing powerful AI models that drive our Fact Checking and Research tools.
- **Jina AI:** For advanced grounding and content processing capabilities.
- **CrewAI:** For orchestrating intelligent agents and tasks within our platform.
- **FastAPI:** For the robust and high-performance backend framework.
- **Google Fonts:** For enhancing the typography and aesthetics of our frontend.

---

*© 2024 Cool AI Tools. All rights reserved.*