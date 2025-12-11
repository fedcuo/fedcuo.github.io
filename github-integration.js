// ==================== GITHUB INTEGRATION ====================
// Configurazione GitHub
const GITHUB_USERNAME = 'fedcuo'; // CAMBIA CON IL TUO USERNAME GITHUB
const GITHUB_API_BASE = 'https://api.github.com';

// ==================== FETCH GITHUB USER DATA ====================
async function fetchGitHubUserData() {
    try {
        const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`);
        if (!response.ok) throw new Error('User not found');
        return await response.json();
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
}

// ==================== FETCH GITHUB REPOSITORIES ====================
async function fetchGitHubRepos() {
    try {
        const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
        if (!response.ok) throw new Error('Repos not found');
        return await response.json();
    } catch (error) {
        console.error('Error fetching repos:', error);
        return [];
    }
}

// ==================== FETCH GITHUB EVENTS (for contributions) ====================
async function fetchGitHubEvents() {
    try {
        const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/events/public?per_page=100`);
        if (!response.ok) throw new Error('Events not found');
        return await response.json();
    } catch (error) {
        console.error('Error fetching events:', error);
        return [];
    }
}

// ==================== UPDATE STATISTICS ====================
async function updateGitHubStats() {
    const userData = await fetchGitHubUserData();
    const repos = await fetchGitHubRepos();
    const events = await fetchGitHubEvents();
    
    if (!userData) {
        console.warn('Could not load GitHub data');
        return;
    }
    
    // Calcola statistiche
    const totalRepos = userData.public_repos;
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
    
    // Calcola contribuzioni dagli eventi (ultimi 90 giorni)
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
    
    const recentEvents = events.filter(event => {
        const eventDate = new Date(event.created_at);
        return eventDate >= ninetyDaysAgo;
    });
    
    // Conta contribuzioni per tipo
    const pushEvents = recentEvents.filter(e => e.type === 'PushEvent').length;
    const prEvents = recentEvents.filter(e => e.type === 'PullRequestEvent').length;
    const issueEvents = recentEvents.filter(e => e.type === 'IssuesEvent').length;
    const totalContributions = pushEvents + prEvents + issueEvents;
    
    // Aggiorna i valori nel DOM
    updateStatValue('[data-stat="contributions"]', totalContributions);
    updateStatValue('[data-stat="repositories"]', totalRepos);
    updateStatValue('[data-stat="stars"]', totalStars);
    
    return { userData, repos, events };
}

// Funzione helper per aggiornare le statistiche
function updateStatValue(selector, value) {
    const element = document.querySelector(selector);
    if (element) {
        element.setAttribute('data-target', value);
        animateCounter(element);
    }
}

// ==================== GENERATE REAL CONTRIBUTION GRAPH ====================
async function generateRealGitHubGraph() {
    const graphContainer = document.getElementById('github-graph');
    if (!graphContainer) return;
    
    // Mostra loading
    graphContainer.innerHTML = '<div class="loading">Caricamento contribuzioni GitHub...</div>';
    
    try {
        // Fetch events per le contribuzioni
        const events = await fetchGitHubEvents();
        
        // Crea mappa delle contribuzioni per data
        const contributionMap = new Map();
        
        events.forEach(event => {
            const date = new Date(event.created_at).toISOString().split('T')[0];
            contributionMap.set(date, (contributionMap.get(date) || 0) + 1);
        });
        
        // Genera la griglia
        const grid = document.createElement('div');
        grid.className = 'graph-grid';
        
        // Crea 52 settimane (364 giorni)
        const today = new Date();
        const startDate = new Date(today);
        startDate.setDate(startDate.getDate() - 364);
        
        for (let i = 0; i < 364; i++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(currentDate.getDate() + i);
            const dateString = currentDate.toISOString().split('T')[0];
            
            const cell = document.createElement('div');
            cell.className = 'graph-cell';
            
            // Ottieni il numero di contribuzioni per questa data
            const contributions = contributionMap.get(dateString) || 0;
            
            // Determina il livello (0-4)
            let level = 0;
            if (contributions > 0) level = 1;
            if (contributions >= 3) level = 2;
            if (contributions >= 6) level = 3;
            if (contributions >= 10) level = 4;
            
            cell.classList.add(`level-${level}`);
            cell.setAttribute('title', `${contributions} contribuzioni il ${currentDate.toLocaleDateString('it-IT')}`);
            cell.setAttribute('data-date', dateString);
            cell.setAttribute('data-count', contributions);
            
            // Aggiungi evento hover
            cell.addEventListener('mouseenter', function() {
                showTooltip(this, contributions, currentDate);
            });
            
            cell.addEventListener('mouseleave', function() {
                hideTooltip();
            });
            
            grid.appendChild(cell);
        }
        
        graphContainer.innerHTML = '';
        graphContainer.appendChild(grid);
        
    } catch (error) {
        console.error('Error generating graph:', error);
        graphContainer.innerHTML = '<div class="error">Impossibile caricare le contribuzioni GitHub</div>';
    }
}

// ==================== TOOLTIP FOR CONTRIBUTIONS ====================
let tooltip = null;

function showTooltip(element, count, date) {
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.className = 'github-tooltip';
        document.body.appendChild(tooltip);
    }
    
    const rect = element.getBoundingClientRect();
    const dateStr = date.toLocaleDateString('it-IT', { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
    
    tooltip.innerHTML = `
        <strong>${count} contribuzioni</strong>
        <div>${dateStr}</div>
    `;
    
    tooltip.style.display = 'block';
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + window.scrollY + 'px';
}

function hideTooltip() {
    if (tooltip) {
        tooltip.style.display = 'none';
    }
}

// ==================== FETCH RECENT ACTIVITY ====================
async function displayRecentActivity() {
    const events = await fetchGitHubEvents();
    const activityContainer = document.getElementById('recent-activity');
    
    if (!activityContainer || events.length === 0) return;
    
    // Prendi gli ultimi 5 eventi
    const recentEvents = events.slice(0, 5);
    
    const activityHTML = recentEvents.map(event => {
        const date = new Date(event.created_at);
        const timeAgo = getTimeAgo(date);
        let icon = '📝';
        let action = '';
        
        switch(event.type) {
            case 'PushEvent':
                icon = '🚀';
                const commits = event.payload.commits?.length || 0;
                action = `Pushed ${commits} commit${commits !== 1 ? 's' : ''} to ${event.repo.name}`;
                break;
            case 'CreateEvent':
                icon = '✨';
                action = `Created ${event.payload.ref_type} in ${event.repo.name}`;
                break;
            case 'PullRequestEvent':
                icon = '🔀';
                action = `${event.payload.action} PR in ${event.repo.name}`;
                break;
            case 'IssuesEvent':
                icon = '🐛';
                action = `${event.payload.action} issue in ${event.repo.name}`;
                break;
            case 'WatchEvent':
                icon = '⭐';
                action = `Starred ${event.repo.name}`;
                break;
            case 'ForkEvent':
                icon = '🍴';
                action = `Forked ${event.repo.name}`;
                break;
            default:
                icon = '📌';
                action = `${event.type.replace('Event', '')} in ${event.repo.name}`;
        }
        
        return `
            <div class="activity-item">
                <span class="activity-icon">${icon}</span>
                <div class="activity-content">
                    <div class="activity-action">${action}</div>
                    <div class="activity-time">${timeAgo}</div>
                </div>
            </div>
        `;
    }).join('');
    
    activityContainer.innerHTML = activityHTML;
}

// Helper function per calcolare il tempo trascorso
function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + ' anni fa';
    
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' mesi fa';
    
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' giorni fa';
    
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' ore fa';
    
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' minuti fa';
    
    return Math.floor(seconds) + ' secondi fa';
}

// ==================== FETCH LANGUAGE STATISTICS ====================
async function displayLanguageStats() {
    const repos = await fetchGitHubRepos();
    const languageContainer = document.getElementById('language-stats');
    
    if (!languageContainer || repos.length === 0) return;
    
    // Conta i linguaggi
    const languageCount = {};
    repos.forEach(repo => {
        if (repo.language) {
            languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
        }
    });
    
    // Ordina per frequenza
    const sortedLanguages = Object.entries(languageCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5); // Top 5
    
    const total = sortedLanguages.reduce((sum, [, count]) => sum + count, 0);
    
    // Colori per linguaggi (puoi espandere)
    const languageColors = {
        'JavaScript': '#f1e05a',
        'TypeScript': '#2b7489',
        'Python': '#3572A5',
        'Java': '#b07219',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'PHP': '#4F5D95',
        'Ruby': '#701516',
        'Go': '#00ADD8',
        'Rust': '#dea584',
        'C++': '#f34b7d',
        'C': '#555555',
        'C#': '#178600',
        'Swift': '#ffac45',
        'Kotlin': '#F18E33'
    };
    
    const languageHTML = sortedLanguages.map(([language, count]) => {
        const percentage = ((count / total) * 100).toFixed(1);
        const color = languageColors[language] || '#888888';
        
        return `
            <div class="language-item">
                <div class="language-header">
                    <span class="language-dot" style="background: ${color}"></span>
                    <span class="language-name">${language}</span>
                    <span class="language-percentage">${percentage}%</span>
                </div>
                <div class="language-bar">
                    <div class="language-progress" style="width: ${percentage}%; background: ${color}"></div>
                </div>
            </div>
        `;
    }).join('');
    
    languageContainer.innerHTML = languageHTML;
}

// ==================== INIT GITHUB INTEGRATION ====================
async function initGitHubIntegration() {
    console.log('🔄 Caricamento dati GitHub...');
    
    try {
        // Carica tutti i dati in parallelo
        await Promise.all([
            updateGitHubStats(),
            generateRealGitHubGraph(),
            displayRecentActivity(),
            displayLanguageStats()
        ]);
        
        console.log('✅ Dati GitHub caricati con successo!');
    } catch (error) {
        console.error('❌ Errore nel caricamento dei dati GitHub:', error);
    }
}

// ==================== HELPER: ANIMATE COUNTER ====================
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// ==================== AUTO-INITIALIZE ====================
// Inizializza quando la pagina è caricata
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGitHubIntegration);
} else {
    initGitHubIntegration();
}

// ==================== EXPORT FOR TESTING ====================
// Esporta funzioni per testing (opzionale)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        fetchGitHubUserData,
        fetchGitHubRepos,
        fetchGitHubEvents,
        updateGitHubStats,
        generateRealGitHubGraph
    };
}