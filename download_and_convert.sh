#!/bin/bash

# Create a folder for the PDFs
mkdir -p downloaded_pdfs

# Read each URL from queries.txt
while IFS= read -r url; do
    # Extract the page name from the URL
    page_name=$(basename "$url")
    
    # Use wget to download the page as a temporary HTML file
    wget -O "downloaded_pdfs/${page_name}.html" "$url"
    
    # Convert the downloaded HTML to PDF
    wkhtmltopdf "downloaded_pdfs/${page_name}.html" "downloaded_pdfs/${page_name}.pdf"
    
    # Remove the temporary HTML file if you no longer need it
    rm "downloaded_pdfs/${page_name}.html"

done < queries.txt

echo "Download and conversion complete!"