import os

files = [
    "templates/base.html",
    "static/css/container.css",
    "static/css/footer.css",
    "static/css/general.css",
    "static/css/header_mobile.css",
    "static/css/header_web.css",
    "static/js/scripts.js",
    "static/css/loading.css",
    #"static/js/loading_cards.js",
    "static/css/verify.css",
    #"routes/verify.py",
    #"routes/topic_research.py",
    #"routes/website_navigation.py",
    #"main.py",      
    "static/css/topic_research.css",
    "static/css/website_navigation.css",
    #"tools/generate_loading.py",
    #"tools/grounding_crew_single_claim.py",
    #"tools/reader_crew_single_domain.py",
    #"tools/search_crew_single_topic.py",
    #"static/js/topic_research_display.js",
    #"static/js/topic_research_download.js",
    #"static/js/verify_display.js",
    #"static/js/verify_download.js",
    #"static/js/website_navigation_display.js",
    #"static/js/website_navigation_download.js"

]

output_file = "codebase.md"

with open(output_file, 'w', encoding='utf-8') as outfile:
    for file_path in files:
        with open(file_path, 'r', encoding='utf-8') as infile:
            outfile.write(f"## {os.path.basename(file_path)}\n")
            outfile.write("```python\n")
            outfile.write(infile.read())
            outfile.write("\n```\n\n")
