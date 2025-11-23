document.addEventListener('DOMContentLoaded', () => {
    const terminalModal = document.getElementById('terminal-modal');
    const terminalBtn = document.getElementById('terminal-toggle');
    const closeBtn = document.getElementById('close-terminal');
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');

    // --- 1. Open/Close Logic ---
    if (terminalBtn) {
        terminalBtn.addEventListener('click', () => {
            terminalModal.classList.add('active');
            terminalInput.focus();
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            terminalModal.classList.remove('active');
        });
    }

    // Close if clicking outside the window
    window.addEventListener('click', (e) => {
        if (e.target === terminalModal) {
            terminalModal.classList.remove('active');
        }
    });

    // --- 2. Command Logic ---
    if (terminalInput) {
        terminalInput.addEventListener('keydown', async (e) => {
            if (e.key === 'Enter') {
                const command = terminalInput.value.trim().toLowerCase();
                
                // Add the command line to history
                addToOutput(`visitor@jomkowd:~$ ${command}`, 'command-line');
                
                // Clear input
                terminalInput.value = '';

                // Process Command
                await processCommand(command);
                
                // Scroll to bottom
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            }
        });
    }

    async function processCommand(cmd) {
        switch (cmd) {
            case 'help':
                addToOutput(`
Available commands:
  <span class="cmd-highlight">about</span>      - Who is Mark Jomar?
  <span class="cmd-highlight">skills</span>     - List technical skills
  <span class="cmd-highlight">projects</span>   - List recent projects
  <span class="cmd-highlight">socials</span>    - Connect with me
  <span class="cmd-highlight">clear</span>      - Clear terminal
  <span class="cmd-highlight">exit</span>       - Close terminal
                `);
                break;

            case 'about':
                addToOutput(`
> Name: Mark Jomar S. Calmateo
> Role: Full Stack Developer & Graphic Designer
> Location: Philippines 🇵🇭
> Status: Building digital solutions and crafting experiences.
                `);
                break;

            case 'skills':
                addToOutput(`
[FRONTEND] React, Vue.js, JavaScript, Tailwind, CSS3
[BACKEND]  Node.js, Express, Python, PHP
[DATABASE] MongoDB, PostgreSQL, MySQL
[DESIGN]   Photoshop, Illustrator, Figma
                `);
                break;

            case 'projects':
                addToOutput("Fetching projects from database...");
                try {
                    const response = await fetch('data/projects.json');
                    const projects = await response.json();
                    // Show first 5 projects
                    const list = projects.slice(0, 5).map(p => `* ${p.title} [${p.tags[0]}]`).join('<br>');
                    addToOutput(list + "<br><br>Type 'gui' to view full portfolio.");
                } catch (error) {
                    addToOutput("Error: Could not retrieve projects.");
                }
                break;

            case 'socials':
                addToOutput(`
GitHub:   github.com/Jom-kowd
LinkedIn: linkedin.com/in/markjomar-calmateo
Facebook: facebook.com/markjomar.calmateo.1
                `);
                break;

            case 'clear':
                terminalOutput.innerHTML = '';
                break;

            case 'exit':
                terminalModal.classList.remove('active');
                break;
            
            case 'sudo':
                addToOutput("Permission denied: You are not an admin.");
                break;

            case '':
                break;

            default:
                addToOutput(`Command not found: ${cmd}. Type 'help' for list.`);
        }
    }

    function addToOutput(text, className = '') {
        const div = document.createElement('div');
        div.className = `terminal-line ${className}`;
        div.innerHTML = text;
        terminalOutput.appendChild(div);
    }
});