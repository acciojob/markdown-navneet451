import React, { useState, useEffect } from 'react';
import { marked } from 'marked';

// Main MarkdownApp component
const MarkdownApp = () => {
    const [markdown, setMarkdown] = useState(''); // State to store markdown input
    const [loading, setLoading] = useState(false); // State to track loading status

    // Update preview when markdown content changes
    const handleInputChange = (e) => {
        setMarkdown(e.target.value); // Set markdown text as user types
    };

    useEffect(() => {
        if (markdown === '') return;

        setLoading(true); // Set loading true when content is being processed
        
        // Simulate delay for rendering markdown preview
        const timer = setTimeout(() => {
            setLoading(false); // Set loading false after some time (processing complete)
        }, 1000);

        return () => clearTimeout(timer); // Cleanup timeout on component unmount or markdown change
    }, [markdown]); // Trigger effect when markdown text changes

    // Function to render the markdown as HTML using the 'marked' library
    const renderMarkdown = () => {
        return { __html: marked(markdown) }; // Convert markdown to HTML
    };

    return (
        <div className="app">
            <div className="markdown-container">
                <div className="left-section">
                    <h2>Write your Markdown</h2>
                    <textarea
                        className="textarea"
                        placeholder="Enter markdown here..."
                        value={markdown}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="right-section">
                    <h2>Preview</h2>
                    {loading ? (
                        <div className="loading">Loading preview...</div> // Display loading text
                    ) : (
                        <div
                            className="preview"
                            dangerouslySetInnerHTML={renderMarkdown()}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default MarkdownApp;
