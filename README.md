# 🚀 Portfolio Developer - GitHub Pages

Un portfolio moderno e professionale per sviluppatori, con tema light/dark, sezione progetti, grafico contribuzioni GitHub e design responsivo.

## ✨ Caratteristiche

- 🎨 **Tema Light/Dark** - Switch fluido tra modalità chiara e scura
- 💼 **Sezione Hero** - Introduzione accattivante con animazione typing
- 📝 **About Section** - Presentazione personale con lista skills
- 🎯 **Portfolio Progetti** - Grid di progetti con card interattive
- 📊 **GitHub Activity** - Grafico contribuzioni stile GitHub
- 📱 **Responsive Design** - Perfettamente adattato a tutti i dispositivi
- ⚡ **Performance Ottimizzate** - Caricamento veloce e animazioni fluide
- ♿ **Accessibile** - Seguendo le best practices di accessibilità

## 🛠️ Tecnologie Utilizzate

- HTML5
- CSS3 (Custom Properties, Grid, Flexbox)
- JavaScript Vanilla (ES6+)
- Google Fonts (JetBrains Mono, Outfit)

## 📦 Installazione e Deploy su GitHub Pages

### 1. Crea il Repository

1. Vai su [GitHub](https://github.com) e crea un nuovo repository
2. Nomina il repository: `tuousername.github.io` (sostituisci "tuousername" con il tuo username GitHub)
   - Esempio: se il tuo username è `mario-rossi`, nomina il repo `mario-rossi.github.io`
3. Seleziona "Public" e NON aggiungere README, .gitignore o licenza (lo faremo dopo)

### 2. Clona o scarica questo progetto

Se hai già i file locali:
```bash
cd path/to/portfolio-dev
```

### 3. Inizializza Git e carica su GitHub

```bash
# Inizializza repository Git
git init

# Aggiungi tutti i file
git add .

# Fai il primo commit
git commit -m "Initial commit: Portfolio setup"

# Collega al repository remoto (sostituisci tuousername)
git remote add origin https://github.com/tuousername/tuousername.github.io.git

# Carica su GitHub (branch main)
git branch -M main
git push -u origin main
```

### 4. Attiva GitHub Pages

1. Vai nel tuo repository su GitHub
2. Clicca su **Settings** (Impostazioni)
3. Nel menu laterale, clicca su **Pages**
4. In **Source**, seleziona `main` branch e `/ (root)`
5. Clicca su **Save**
6. Aspetta qualche minuto e il tuo sito sarà live su: `https://tuousername.github.io`

## 🎨 Personalizzazione

### Informazioni Personali

Apri `index.html` e modifica:

1. **Tag `<title>`** (riga 6):
```html
<title>Il Tuo Nome | Developer Portfolio</title>
```

2. **Nome e titolo** (circa riga 78-82):
```html
<h1 class="hero-name">
    <span class="name-highlight">Il Tuo Nome</span>
</h1>
```

3. **Descrizione** (circa riga 88):
```html
<p class="hero-description">
    La tua descrizione personale...
</p>
```

4. **Link Social** (circa riga 105-135):
```html
<a href="https://github.com/tuousername" target="_blank">
<a href="https://linkedin.com/in/tuousername" target="_blank">
<a href="mailto:tua@email.com">
```

### Progetti

Modifica le card dei progetti (circa riga 230-380):

```html
<div class="project-card">
    <!-- Cambia URL GitHub e Demo -->
    <a href="https://github.com/username/project1" target="_blank">
    <a href="https://project1-demo.com" target="_blank">
    
    <!-- Cambia titolo e descrizione -->
    <h3 class="project-title">Titolo Progetto</h3>
    <p class="project-description">Descrizione del progetto...</p>
    
    <!-- Cambia tecnologie -->
    <span class="tech-tag">React</span>
    <span class="tech-tag">Node.js</span>
</div>
```

### Colori e Stile

Apri `styles.css` e modifica le variabili CSS (riga 2-28):

```css
:root {
    --accent-color: #3b82f6;  /* Colore principale */
    --accent-hover: #2563eb;  /* Hover del colore principale */
    /* ... altre variabili ... */
}
```

### Skills

Modifica la lista delle skills in `index.html` (circa riga 194-203):

```html
<ul class="skills-list">
    <li>JavaScript (ES6+)</li>
    <li>React / Next.js</li>
    <!-- Aggiungi le tue skills -->
</ul>
```

### Code Window

Modifica il contenuto della finestra di codice (circa riga 147-160):

```html
<pre><code><span class="code-keyword">const</span> <span class="code-variable">developer</span> = {
  <span class="code-property">name</span>: <span class="code-string">"Tuo Nome"</span>,
  <!-- Personalizza il contenuto -->
};</code></pre>
```

## 🔧 Funzionalità Avanzate

### Integrare il vero grafico GitHub

Per mostrare le tue vere contribuzioni GitHub, puoi:

1. Usare l'API di GitHub:
```javascript
fetch('https://api.github.com/users/tuousername/events')
    .then(response => response.json())
    .then(data => {
        // Processa i dati e genera il grafico
    });
```

2. Usare librerie come:
   - [GitHub Calendar](https://github.com/Bloggify/github-calendar)
   - [GitHub Contribution Graph](https://github.com/sallar/github-contributions-canvas)

### Aggiungere Google Analytics

Aggiungi prima del tag `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Aggiungere Favicon

Crea un file `favicon.ico` e aggiungi in `<head>`:

```html
<link rel="icon" type="image/x-icon" href="favicon.ico">
```

## 📱 Test Responsiveness

Testa il tuo portfolio su:
- Desktop (1920x1080, 1366x768)
- Tablet (768x1024)
- Mobile (375x667, 414x896)

Usa gli strumenti di sviluppo del browser (F12) per simulare diversi dispositivi.

## 🚀 Ottimizzazioni

### Velocità

1. **Comprimi le immagini** se ne aggiungi
2. **Minifica CSS e JS** per produzione:
   - CSS: Usa [CSS Minifier](https://cssminifier.com/)
   - JS: Usa [JavaScript Minifier](https://javascript-minifier.com/)

### SEO

Aggiungi meta tags in `<head>`:

```html
<meta name="description" content="Portfolio di [Tuo Nome] - Full Stack Developer">
<meta name="keywords" content="developer, portfolio, web development, react, node.js">
<meta name="author" content="Tuo Nome">

<!-- Open Graph per social media -->
<meta property="og:title" content="Tuo Nome | Developer Portfolio">
<meta property="og:description" content="La tua descrizione">
<meta property="og:image" content="https://tuousername.github.io/preview.jpg">
<meta property="og:url" content="https://tuousername.github.io">
```

## 🎯 Prossimi Passi

1. ✅ Deploy su GitHub Pages
2. 📝 Personalizza contenuti
3. 📸 Aggiungi screenshot dei progetti
4. 🔗 Connetti dominio personalizzato (opzionale)
5. 📊 Aggiungi analytics
6. 🎨 Raffina lo stile

## 🔗 Dominio Personalizzato (Opzionale)

Se vuoi usare un dominio personalizzato (es: `tuonome.com`):

1. Acquista un dominio da servizi come Namecheap, GoDaddy, etc.
2. Crea un file `CNAME` nella root del progetto:
```
tuonome.com
```
3. Configura i DNS del dominio:
   - Aggiungi un record `A` che punta a:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - Oppure aggiungi un record `CNAME` che punta a: `tuousername.github.io`

## 📚 Risorse Utili

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Custom Domain Setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Web.dev Performance](https://web.dev/measure/)
- [Can I Use](https://caniuse.com/) - Check browser compatibility

## 🐛 Troubleshooting

### Il sito non si carica
- Verifica che il repository sia pubblico
- Controlla che GitHub Pages sia attivato nelle Settings
- Aspetta 5-10 minuti dopo il primo deploy

### Le modifiche non si vedono
- Fai un "hard refresh" (Ctrl+Shift+R o Cmd+Shift+R)
- Svuota la cache del browser
- Verifica che le modifiche siano state pushate su GitHub

### Il tema non si salva
- Verifica che JavaScript sia abilitato nel browser
- Controlla la console del browser per errori (F12)

## 📄 Licenza

Questo progetto è open source e disponibile sotto la licenza MIT.

## 🤝 Contributi

Sentiti libero di fare fork del progetto e personalizzarlo!

---

**Fatto con ❤️ e ☕**

Buona fortuna con il tuo portfolio! 🚀
