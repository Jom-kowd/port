// This script runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    
    const themeToggle = document.getElementById('theme-toggle');
    const storageKey = 'theme-preference';

    // This function applies the theme by adding/removing the 'dark-mode' class
    const applyTheme = (theme) => {
        document.body.classList.toggle('dark-mode', theme === 'dark');
        // Also update the toggle's checked state
        if (themeToggle) {
            themeToggle.checked = (theme === 'dark');
        }
    };

    // This function gets the preference from localStorage
    const getThemePreference = () => {
        return localStorage.getItem(storageKey);
    };

    // This function saves the preference to localStorage
    const setThemePreference = (theme) => {
        localStorage.setItem(storageKey, theme);
    };

    // This function determines the theme to apply on load
    const initializeTheme = () => {
        const savedTheme = getThemePreference();
        // We get the OS preference *only* if no theme is saved
        const osTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        
        // Priority: 1. Saved in localStorage, 2. OS preference
        const themeToApply = savedTheme || osTheme;
        
        applyTheme(themeToApply);
    };

    // Run the initialization on first load
    initializeTheme();

    // Add event listener for the toggle switch
    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            const newTheme = themeToggle.checked ? 'dark' : 'light';
            setThemePreference(newTheme);
            applyTheme(newTheme);
        });
    }

    // Optional: Listen for changes in OS preference
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Only change if the user hasn't set a preference
        if (!getThemePreference()) {
            const newTheme = e.matches ? 'dark' : 'light';
            applyTheme(newTheme);
        }
    });

});