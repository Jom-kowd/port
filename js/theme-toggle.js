document.addEventListener('DOMContentLoaded', () => {
    
    const themeBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = themeBtn ? themeBtn.querySelector('i') : null;
    const storageKey = 'theme-preference';

    // --- Helper: Update the Icon (Moon <-> Sun) ---
    const updateIcon = (isDark) => {
        if (!themeIcon) return;
        
        if (isDark) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    };

    // --- Helper: Apply the theme ---
    const applyTheme = (theme) => {
        const isDark = (theme === 'dark');
        
        // 1. Toggle Body Class
        document.body.classList.toggle('dark-mode', isDark);
        
        // 2. Update Icon
        updateIcon(isDark);
    };

    // --- 1. Load Preference on Start ---
    const initializeTheme = () => {
        const savedTheme = localStorage.getItem(storageKey);
        
        // Check saved OR system preference
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            applyTheme('dark');
        } else {
            applyTheme('light');
        }
    };

    initializeTheme();

    // --- 2. Handle Click Event ---
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            // Check if we are currently in dark mode
            const isDark = document.body.classList.contains('dark-mode');
            
            // Toggle to the opposite
            const newTheme = isDark ? 'light' : 'dark';
            
            // Apply and Save
            applyTheme(newTheme);
            localStorage.setItem(storageKey, newTheme);
        });
    }
});