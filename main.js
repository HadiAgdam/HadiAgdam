(() => {
  'use strict'

  const roles = ['Software Engineer', 'Backend Developer', 'Full-Stack Creator', 'Systems Thinker', 'Android Developer']
  const prompt = 'hadi@portfolio ~ %'
  const birthDate = new Date(2005, 5, 20)
  const terminalHelpGroups = [
    { title: 'Identity', commands: [['whoami', 'name and role'], ['name', 'full name'], ['age', 'birth date and current age'], ['location', 'current location'], ['education', 'education details'], ['focus', 'technical focus']] },
    { title: 'Contact', commands: [['email', 'email address'], ['telegram', 'Telegram profile'], ['github', 'GitHub profile'], ['linkedin', 'LinkedIn profile']] },
    { title: 'Portfolio', commands: [['about', 'about section'], ['projects', 'project notes'], ['experience', 'experience and education'], ['skills', 'technical skills'], ['contact', 'contact section']] },
    { title: 'Utilities', commands: [['help', 'list all commands'], ['clear', 'clear terminal output'], ['sudo make-coffee', 'small terminal easter egg'], ['make-a-plan', 'small planning response']] },
  ]
  const sectionIds = ['home', 'about', 'experience', 'projects', 'skills', 'contact']
  const skills = [
    'Backend & systems: .NET Core, C#, Entity Framework Core, Python, Flask, Microsoft SQL Server',
    'Mobile & native apps: Kotlin, Jetpack Compose, Android XML, Java, .NET Desktop (WPF)',
    'Specialized engineering: OpenCV, Arduino Prototyping, Embedded C/C++, Linux Environments',
    'Additional tools: MySQL, SQLite, Figma',
  ]

  const $ = (selector, parent = document) => parent.querySelector(selector)
  const $$ = (selector, parent = document) => Array.from(parent.querySelectorAll(selector))
  const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

  function calculateAge(date) {
    const today = new Date()
    let age = today.getFullYear() - date.getFullYear()
    const birthdayHasPassed = today.getMonth() > date.getMonth() || (today.getMonth() === date.getMonth() && today.getDate() >= date.getDate())
    if (!birthdayHasPassed) age -= 1
    return age
  }

  function navigate(id) {
    const target = document.getElementById(id)
    if (target) target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
  }

  function initNavigation() {
    const menuButton = $('.mobile-menu-button')
    const nav = $('#primary-navigation')
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('site-nav--open')
      menuButton.setAttribute('aria-expanded', String(open))
      menuButton.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu')
    })
    $$('.site-nav a, .brand').forEach((link) => link.addEventListener('click', () => {
      nav.classList.remove('site-nav--open')
      menuButton.setAttribute('aria-expanded', 'false')
    }))
    $$('a[href^="#"]').forEach((link) => link.addEventListener('click', (event) => {
      const id = link.getAttribute('href').slice(1)
      if (!document.getElementById(id)) return
      event.preventDefault()
      navigate(id)
    }))
    const active = $('#active-section')
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) active.textContent = `${visible.target.id} / 06`
    }, { rootMargin: '-20% 0px -65% 0px', threshold: [0.1, 0.3, 0.6] })
    sectionIds.forEach((id) => { const section = document.getElementById(id); if (section) observer.observe(section) })
  }

  function initTheme() {
    const toggle = $('[data-theme-toggle]')
    let saved = null
    try { saved = window.localStorage.getItem('portfolio-theme') } catch (error) { /* Storage may be blocked for file URLs. */ }
    let theme = saved || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
    const apply = () => {
      document.documentElement.dataset.theme = theme
      toggle.setAttribute('aria-pressed', String(theme === 'light'))
      toggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`)
      toggle.querySelector('span').textContent = theme === 'dark' ? '☼' : '◐'
      try { window.localStorage.setItem('portfolio-theme', theme) } catch (error) { /* Continue without persistence when storage is unavailable. */ }
    }
    apply()
    toggle.addEventListener('click', () => { theme = theme === 'dark' ? 'light' : 'dark'; apply() })
  }

  function initRoleRotation() {
    const element = $('#hero-role')
    let index = 0
    window.setInterval(() => {
      index = (index + 1) % roles.length
      element.textContent = roles[index]
    }, 3000)
  }

  function initTerminal() {
    const terminal = $('#portfolio-terminal')
    const body = $('#terminal-body')
    const boot = $('.terminal__boot', body)
    const output = $('#terminal-output')
    const form = $('#terminal-form')
    const input = $('#terminal-input')
    const loading = $('#terminal-loading')
    const helpButton = $('#terminal-help-button')
    const history = []
    let historyIndex = -1

    function showReady() {
      loading.hidden = true
      form.hidden = false
    }

    if (prefersReducedMotion()) showReady()
    else window.setTimeout(showReady, 850)

    function go(id) { navigate(id) }

    function response(command) {
      switch (command) {
        case 'help': return [
          { type: 'heading', text: 'Available commands' },
          ...terminalHelpGroups.flatMap((group) => [
            { type: 'section', text: group.title },
            ...group.commands.map(([name, description]) => ({ type: 'command', name, description })),
          ]),
          { type: 'hint', text: 'Type any command and press Enter. Use Arrow Up/Down for history.' },
        ]
        case 'whoami': return ['Hadi Agdam', 'Software Engineer']
        case 'name': return ['Hadi Agdam']
        case 'age': return [`Age: ${calculateAge(birthDate)}`, 'Born: 20 June 2005', 'Iranian calendar: 1384/03/30']
        case 'location': return ['Tabriz, Iran']
        case 'education': go('experience'); return ["Bachelor’s in Statistics", 'University of Tabriz', 'Currently studying.']
        case 'focus': return ['Backend Architecture & Mobile Systems']
        case 'email': return ['hadiagdam0@gmail.com']
        case 'telegram': return ['@HadiAqdam', 'https://t.me/HadiAqdam']
        case 'github': return ['https://github.com/HadiAgdam']
        case 'linkedin': return ['https://www.linkedin.com/in/HadiAgdam/']
        case 'about': go('about'); return ['Hadi Agdam — Software Engineer', 'Based in Tabriz, Iran. Focused on backend architecture and mobile systems.', 'Opening about section...']
        case 'projects': go('projects'); return ['No named projects are listed in the current portfolio yet.', 'Browse the source profile on GitHub for the latest public work.', 'Opening projects section...']
        case 'experience': go('experience'); return ['No professional employment history is listed in the current portfolio.', '3 education and recognition records found.', 'Opening experience section...']
        case 'skills': go('skills'); return skills
        case 'contact': go('contact'); return ['Email: hadiagdam0@gmail.com', 'Telegram: @HadiAqdam', 'Opening contact section...']
        case 'sudo make-coffee': return ['Nice try. The terminal has no caffeine privileges.', 'Try: make-a-plan']
        case 'make-a-plan': return ['1. Understand the system.', '2. Make the smallest useful change.', '3. Test it.']
        default: return [`Command not found: ${command}`, 'Type "help" for available commands.']
      }
    }

    function execute(value) {
      const command = value.trim().toLowerCase()
      if (!command) return
      history.push(command)
      historyIndex = -1
      input.value = ''
      if (command === 'clear') {
        history.length = 0
        historyIndex = -1
        boot.replaceChildren()
        boot.hidden = true
        output.replaceChildren()
        loading.hidden = true
        form.hidden = false
        input.focus()
        return
      }
      const entry = document.createElement('div')
      entry.className = 'terminal__entry'
      const commandLine = document.createElement('div')
      commandLine.className = 'terminal__command-line'
      commandLine.innerHTML = `<span class="terminal__prompt">${prompt}</span> ${escapeHtml(command)}`
      const responseBlock = document.createElement('div')
      responseBlock.className = 'terminal__output'
      response(command).forEach((line) => {
        const lineElement = document.createElement('div')
        if (typeof line === 'string') {
          lineElement.className = 'terminal__line terminal__line--text'
          lineElement.textContent = line
        } else if (line.type === 'heading') {
          lineElement.className = 'terminal__line terminal__line--heading'
          lineElement.textContent = line.text
        } else if (line.type === 'section') {
          lineElement.className = 'terminal__line terminal__line--section'
          lineElement.textContent = `// ${line.text}`
        } else if (line.type === 'hint') {
          lineElement.className = 'terminal__line terminal__line--hint'
          lineElement.textContent = line.text
        } else if (line.type === 'command') {
          lineElement.className = 'terminal__line terminal__line--command'
          const name = document.createElement('span')
          name.className = 'terminal__command-name'
          name.textContent = line.name
          const description = document.createElement('span')
          description.className = 'terminal__command-description'
          description.textContent = ` — ${line.description}`
          lineElement.append(name, description)
        }
        responseBlock.appendChild(lineElement)
      })
      entry.append(commandLine, responseBlock)
      output.appendChild(entry)
      body.scrollTop = body.scrollHeight
    }

    function escapeHtml(value) {
      const element = document.createElement('span')
      element.textContent = value
      return element.innerHTML
    }

    terminal.addEventListener('click', () => input.focus())
    form.addEventListener('submit', (event) => { event.preventDefault(); execute(input.value) })
    input.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowUp') { event.preventDefault(); if (!history.length) return; historyIndex = historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1); input.value = history[historyIndex] }
      if (event.key === 'ArrowDown') { event.preventDefault(); if (historyIndex < 0) return; historyIndex += 1; if (historyIndex >= history.length) { historyIndex = -1; input.value = '' } else input.value = history[historyIndex] }
    })
    helpButton.addEventListener('click', (event) => { event.stopPropagation(); input.value = 'help'; input.focus() })
  }

  function initPalette() {
    const backdrop = $('#palette-backdrop')
    const palette = $('.command-palette', backdrop)
    const search = $('#palette-input')
    const items = $$('.palette-item', palette)
    const empty = $('.palette-empty', palette)
    let selected = 0
    let lastTrigger = null

    function visibleItems() { return items.filter((item) => !item.hidden) }
    function setSelected(index) { const visible = visibleItems(); if (!visible.length) return; selected = Math.max(0, Math.min(index, visible.length - 1)); items.forEach((item) => item.classList.remove('palette-item--selected')); visible[selected].classList.add('palette-item--selected') }
    function open(trigger) { lastTrigger = trigger; backdrop.hidden = false; backdrop.setAttribute('aria-hidden', 'false'); search.value = ''; selected = 0; filter(); search.focus() }
    function close() { backdrop.hidden = true; backdrop.setAttribute('aria-hidden', 'true'); if (lastTrigger) lastTrigger.focus() }
    function filter() { const query = search.value.toLowerCase().trim(); items.forEach((item) => { item.hidden = !item.textContent.toLowerCase().includes(query) }); const visible = visibleItems(); empty.hidden = visible.length !== 0; setSelected(0) }
    $$('[data-open-palette]').forEach((button) => button.addEventListener('click', () => open(button)))
    $$('[data-close-palette]', backdrop).forEach((button) => button.addEventListener('click', close))
    backdrop.addEventListener('click', (event) => { if (event.target === backdrop) close() })
    search.addEventListener('input', filter)
    items.forEach((item) => item.addEventListener('mouseenter', () => setSelected(visibleItems().indexOf(item))))
    items.forEach((item) => item.addEventListener('click', () => { navigate(item.dataset.section); close() }))
    document.addEventListener('keydown', (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); open(document.activeElement) }
      if (backdrop.hidden) return
      if (event.key === 'Escape') { event.preventDefault(); close() }
      if (event.key === 'ArrowDown') { event.preventDefault(); setSelected(selected + 1) }
      if (event.key === 'ArrowUp') { event.preventDefault(); setSelected(selected - 1) }
      if (event.key === 'Enter') { const item = visibleItems()[selected]; if (item) { navigate(item.dataset.section); close() } }
    })
  }

  document.addEventListener('DOMContentLoaded', () => {
    $('#current-year').textContent = new Date().getFullYear()
    initNavigation()
    initTheme()
    initRoleRotation()
    initTerminal()
    initPalette()
  })
})()
