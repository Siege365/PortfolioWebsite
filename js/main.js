/* ==========================================
   MAIN SCRIPTS - Entry Point
   Imports and initializes all section scripts
   ========================================== */

// Note: In a production environment, you might use ES6 modules or a bundler.
// For simplicity, we're using script tags in HTML and global functions.

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize global UI components
    initNavbar();
    
    // Initialize all sections
    initHero();
    initAbout();
    initProjects();
    initSkills();
    initCertificates();
    initContact();
    
    // Console Easter Egg
    showConsoleEasterEgg();
});

// ==================== CONSOLE EASTER EGG ====================
function showConsoleEasterEgg() {
    console.log(`
%c👋 Hey there, curious developer!
%c
Looking at the code? I like your style!
Feel free to reach out: nkmerka.work@gmail.com

Built with ❤️ by Nathaniel Keene M. Merka
`,
'font-size: 20px; font-weight: bold; color: #6366f1;',
'font-size: 14px; color: #10b981;'
    );
}
