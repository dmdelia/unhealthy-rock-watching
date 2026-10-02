(() => {
  const root = document.documentElement;
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');

  const preferredLanguages = Array.isArray(navigator.languages) && navigator.languages.length
    ? navigator.languages
    : [navigator.language || 'en'];
  const isGerman = preferredLanguages.some((language) => String(language).toLowerCase().startsWith('de'));
  const lang = isGerman ? 'de' : 'en';
  root.lang = lang;

  const translations = {
    en: {
      nav_overview:'Overview', nav_projects:'Systems', nav_about:'The Program', nav_discord:'Discord ↗', nav_github:'GitHub ↗', menu:'MENU',
      open_nav:'Open navigation',
      hero_eyebrow:'ASTREA SOLO SPACE PROGRAM / GERMANY',
      hero_title:'Engineering systems<br>for the edge of flight.',
      hero_lead:'ASTREA is a solo space program focused on building, testing and documenting aerospace systems and astrophysics software.',
      explore:'Explore systems <span>→</span>', program_link:'Enter the program ↗', status:'STATUS: ACTIVE DEVELOPMENT',
      program:'01 / PROGRAM',
      intro_title:'One program.<br>Two technical domains.',
      intro_copy:'ASTREA Solo Space Program brings physical flight hardware and scientific computation together under one long-term development effort. ICARUS-RLV addresses autonomous flight systems. JOANUS addresses computational astrophysics and exoplanet detection.',
      identity_kicker:'ASTREA SOLO SPACE PROGRAM',
      identity_title:'Build it. Test it.<br>Understand it.',
      identity_copy:'A single-person engineering program built around real systems, measurable experiments, software and iteration. The work is public because the development itself is part of the project.',
      ic_caption:'ICARUS-RLV / CONCEPT', flight_systems:'01 - FLIGHT SYSTEMS',
      ic_desc:'Autonomous stratospheric reentry vehicle hardware testbed for guidance, navigation, control and recovery.',
      compute:'COMPUTE', control:'CONTROL', recovery:'RECOVERY', project_details:'System details <span>↗</span>',
      astrophysics:'02 - ASTROPHYSICS',
      jo_desc:'A headless exoplanet discovery and validation pipeline built around relative photometry, BLS period searches and automated false-positive checks.',
      data:'DATA', method:'METHOD', output:'OUTPUT', jo_caption:'JOANUS / SIGNAL ANALYSIS',
      roadmap:'02 / ROADMAP', roadmap_title:'From bench testing<br>to near-space flight.',
      phase0:'PHASE 0 / CURRENT', phase1:'PHASE 1 / PLANNED', phase2:'PHASE 2 / PLANNED', phase3:'PHASE 3 / LONG TERM',
      arch:'Architecture & Bench', drops:'Local Drop Tests', strato:'Stratospheric Mission', pinnacle:'High-Altitude Pinnacle',
      phase0copy:'Flight software, sensor fusion, hardware interrupts and pipeline modularization.',
      phase1copy:'Controlled 1,000 m drops to validate flight state machines, grid fins and recovery.',
      phase2copy:'Targeting up to approximately 35 km with the full science payload.',
      phase3copy:'Targeting approximately 40 km and ultra-thin atmospheric conditions.',
      why:'WHY ASTREA EXISTS', why_title:'A solo program<br>with a long horizon.',
      whycopy:'ASTREA started as a way to build something real, document the engineering journey and create a body of serious technical work for the next stages of my education. The long-term direction is aerospace engineering and, eventually, the possibility of applying to the European Space Agency.',
      cool:'And, honestly: because building rockets and hunting exoplanets is fucking cool. XD',
      public:'THE BUILD IS PUBLIC', discord_cta:'Follow ASTREA on Discord.', join_discord:'Join Discord ↗',
      statement:'Build. Measure. Verify.', about_program:'About the program <span>→</span>', copyright:'© 2026 ASTREA SOLO SPACE PROGRAM',
      projects_eyebrow:'ASTREA SSP / SYSTEMS', projects_title:'Systems under<br>development.',
      projects_lead:'The current ASTREA program consists of two technical tracks: autonomous aerospace hardware and computational astrophysics.',
      ic_index:'Autonomous flight hardware for guidance, navigation, control, recovery and scientific payload experiments.',
      jo_index:'Automated exoplanet discovery and validation using space telescope photometry and signal-processing methods.',
      open_project:'Open system ↗',
      about_eyebrow:'ASTREA SSP / THE PROGRAM', about_title:'Independent research.<br>End to end.',
      about_lead:'ASTREA Solo Space Program is a single-person aerospace technology and astrophysics research program based in Germany.',
      approach:'01 / APPROACH', approach_title:'Hardware, software and analysis belong to the same system.',
      approach_copy:'The program focuses on building and testing complete technical loops rather than isolated demonstrations: embedded flight software connects to sensors and actuators; scientific payloads create data; analysis pipelines turn that data into measurable results.',
      program_reason_title:'A program built to keep going.',
      program_reason_copy:'ASTREA is meant to grow through systems, experiments, software, failures and iterations. The goal is not to present a finished space mission. The goal is to develop the capability to design, build, test and understand increasingly complex systems over time.',
      cool2:'And yes: because it is fucking cool.',
      measure:'MEASURE', measure_copy:'Instrument the system and preserve useful telemetry.',
      verify:'VERIFY', verify_copy:'Use controlled tests and independent validation wherever possible.',
      iterate:'ITERATE', iterate_copy:'Use every test to reduce uncertainty in the next design cycle.',
      current:'02 / ROADMAP', current_title:'Current development',
      current_copy:'ICARUS-RLV is progressing through architecture, bench validation and planned controlled drop testing. JOANUS continues pipeline modularization, validation and data-processing development.',
      view_all:'View all systems ↗',
      system01:'SYSTEM / 01', close_loop:'Close the loop.',
      ic_long:'ICARUS is designed as an end-to-end avionics and flight-control testbed. The architecture combines deterministic embedded software on ESP32/FreeRTOS with active attitude and aerodynamic control, telemetry and a return-to-launch concept.',
      avionics:'AVIONICS', avionics_copy:'Deterministic task scheduling, sensor fusion and hardware interrupt paths.',
      gnc:'GNC', gnc_copy:'Active control architecture combining RCS and aerodynamic grid-fin actuation.',
      science:'SCIENCE', science_copy:'Radiation, astrobiology and optical payload concepts create measurable mission data.',
      next:'NEXT SYSTEM', open_jo:'Open system →',
      pipeline01:'PIPELINE / 01', search_validate:'Search first.<br>Validate independently.',
      jo_long:'JOANUS processes public space-telescope photometry with a relative-first approach, searches for periodic transit signatures and exports structured candidate telemetry for further validation.',
      photometry:'PHOTOMETRY', photometry_copy:'Relative measurements keep the search focused on observable transit depth and periodicity.',
      search:'SEARCH', search_copy:'Box Least Squares identifies candidate periods across batches of targets.',
      validate:'VALIDATE', validate_copy:'Odd/even and secondary-event checks help reject common false positives.'
    },
    de: {
      nav_overview:'Übersicht', nav_projects:'Systeme', nav_about:'Das Programm', nav_discord:'Discord ↗', nav_github:'GitHub ↗', menu:'MENÜ',
      open_nav:'Navigation öffnen',
      hero_eyebrow:'ASTREA SOLO SPACE PROGRAM / DEUTSCHLAND',
      hero_title:'Engineering-Systeme<br>an der Grenze des Flugs.',
      hero_lead:'ASTREA ist ein Solo-Space-Programm mit Fokus auf dem Bau, Test und der Dokumentation von Raumfahrtsystemen und Astrophysik-Software.',
      explore:'Systeme ansehen <span>→</span>', program_link:'Zum Programm ↗', status:'STATUS: AKTIVE ENTWICKLUNG',
      program:'01 / PROGRAMM',
      intro_title:'Ein Programm.<br>Zwei technische Bereiche.',
      intro_copy:'Das ASTREA Solo Space Program verbindet reale Flughardware und wissenschaftliche Datenverarbeitung in einem langfristigen Entwicklungsprogramm. ICARUS-RLV beschäftigt sich mit autonomen Flugsystemen. JOANUS mit computergestützter Astrophysik und Exoplanetensuche.',
      identity_kicker:'ASTREA SOLO SPACE PROGRAM',
      identity_title:'Bauen. Testen.<br>Verstehen.',
      identity_copy:'Ein von einer Person entwickeltes Engineering-Programm mit realen Systemen, messbaren Experimenten, Software und Iteration. Der Build ist öffentlich, weil die Entwicklung selbst Teil des Projekts ist.',
      ic_caption:'ICARUS-RLV / KONZEPT', flight_systems:'01 - FLUGSYSTEME',
      ic_desc:'Autonomer stratosphärischer Wiedereintritts-Testträger für Führung, Navigation, Regelung und Bergung.',
      compute:'RECHENWERK', control:'REGELUNG', recovery:'BERGUNG', project_details:'Systemdetails <span>↗</span>',
      astrophysics:'02 - ASTROPHYSIK',
      jo_desc:'Eine automatisierte Pipeline zur Entdeckung und Validierung von Exoplaneten auf Basis relativer Photometrie, BLS-Periodensuchen und automatisierter False-Positive-Prüfungen.',
      data:'DATEN', method:'METHODE', output:'AUSGABE', jo_caption:'JOANUS / SIGNALANALYSE',
      roadmap:'02 / ROADMAP', roadmap_title:'Vom Bench-Test<br>bis zum Near-Space-Flug.',
      phase0:'PHASE 0 / AKTUELL', phase1:'PHASE 1 / GEPLANT', phase2:'PHASE 2 / GEPLANT', phase3:'PHASE 3 / LANGFRISTIG',
      arch:'Architektur & Bench', drops:'Lokale Falltests', strato:'Stratosphärenmission', pinnacle:'Höhenflug',
      phase0copy:'Flugsoftware, Sensorfusion, Hardware-Interrupts und Modularisierung der Datenpipeline.',
      phase1copy:'Kontrollierte Abwürfe aus 1.000 m zur Validierung von Flugzuständen, Grid Fins und Bergung.',
      phase2copy:'Zielbereich bis etwa 35 km mit vollständiger wissenschaftlicher Nutzlast.',
      phase3copy:'Zielbereich etwa 40 km unter Bedingungen extrem dünner Atmosphäre.',
      why:'WARUM ASTREA EXISTIERT', why_title:'Ein Solo-Programm<br>mit langem Horizont.',
      whycopy:'ASTREA entstand, um etwas Reales zu bauen, den technischen Weg zu dokumentieren und über die nächsten Stationen meines Bildungswegs hinweg ernsthafte technische Arbeit aufzubauen. Die langfristige Richtung ist Raumfahrttechnik und irgendwann vielleicht eine Bewerbung bei der European Space Agency.',
      cool:'Und ganz ehrlich: weil Raketen bauen und Exoplaneten jagen fucking geil ist. XD',
      public:'DER BUILD IST ÖFFENTLICH', discord_cta:'Verfolge ASTREA auf Discord.', join_discord:'Discord beitreten ↗',
      statement:'Bauen. Messen. Verifizieren.', about_program:'Über das Programm <span>→</span>', copyright:'© 2026 ASTREA SOLO SPACE PROGRAM',
      projects_eyebrow:'ASTREA SSP / SYSTEME', projects_title:'Systeme in<br>Entwicklung.',
      projects_lead:'Das aktuelle ASTREA Programm besteht aus zwei technischen Bereichen: autonomer Raumfahrthardware und computergestützter Astrophysik.',
      ic_index:'Autonome Flughardware für Führung, Navigation, Regelung, Bergung und wissenschaftliche Nutzlast-Experimente.',
      jo_index:'Automatisierte Exoplanetensuche und Validierung mit Weltraumteleskop-Photometrie und Signalverarbeitung.',
      open_project:'System öffnen ↗',
      about_eyebrow:'ASTREA SSP / DAS PROGRAMM', about_title:'Unabhängige Forschung.<br>Ende zu Ende.',
      about_lead:'Das ASTREA Solo Space Program ist ein von einer Person entwickeltes Forschungsprogramm für Raumfahrttechnologie und Astrophysik in Deutschland.',
      approach:'01 / ANSATZ', approach_title:'Hardware, Software und Analyse gehören zum selben System.',
      approach_copy:'Der Fokus liegt auf dem Bau und Test vollständiger technischer Kreisläufe statt isolierter Demonstrationen: Eingebettete Flugsoftware verbindet Sensoren und Aktoren; wissenschaftliche Nutzlasten erzeugen Daten; Analysepipelines verwandeln diese Daten in messbare Ergebnisse.',
      program_reason_title:'Ein Programm, das weiterwachsen soll.',
      program_reason_copy:'ASTREA soll durch Systeme, Experimente, Software, Fehlschläge und Iterationen wachsen. Das Ziel ist nicht, eine fertige Raumfahrtmission darzustellen. Das Ziel ist, über die Zeit die Fähigkeit aufzubauen, immer komplexere Systeme zu entwerfen, zu bauen, zu testen und zu verstehen.',
      cool2:'Und ja: weil es fucking geil ist.',
      measure:'MESSEN', measure_copy:'Das System instrumentieren und verwertbare Telemetrie erhalten.',
      verify:'VERIFIZIEREN', verify_copy:'Wo möglich kontrollierte Tests und unabhängige Validierung einsetzen.',
      iterate:'ITERIEREN', iterate_copy:'Jeden Test nutzen, um die Unsicherheit im nächsten Entwicklungszyklus zu reduzieren.',
      current:'02 / ROADMAP', current_title:'Aktuelle Entwicklung',
      current_copy:'ICARUS-RLV durchläuft Architektur, Bench-Validierung und geplante kontrollierte Falltests. JOANUS wird bei Modularisierung, Validierung und Datenverarbeitung weiterentwickelt.',
      view_all:'Alle Systeme ansehen ↗',
      system01:'SYSTEM / 01', close_loop:'Den Regelkreis schließen.',
      ic_long:'ICARUS ist als Ende-zu-Ende-Testträger für Avionik und Flugregelung ausgelegt. Die Architektur verbindet deterministische Embedded-Software auf ESP32/FreeRTOS mit aktiver Lage- und Aerodynamikregelung, Telemetrie und einem Return-to-Launch-Konzept.',
      avionics:'AVIONIK', avionics_copy:'Deterministisches Task-Scheduling, Sensorfusion und Hardware-Interrupt-Pfade.',
      gnc:'GNC', gnc_copy:'Aktive Regelungsarchitektur aus RCS und aerodynamischer Grid-Fin-Steuerung.',
      science:'WISSENSCHAFT', science_copy:'Strahlungs-, Astrobiologie- und optische Nutzlasten erzeugen messbare Missionsdaten.',
      next:'NÄCHSTES SYSTEM', open_jo:'System öffnen →',
      pipeline01:'PIPELINE / 01', search_validate:'Zuerst suchen.<br>Unabhängig validieren.',
      jo_long:'JOANUS verarbeitet öffentliche Photometriedaten von Weltraumteleskopen mit einem Relative-First-Ansatz, sucht nach periodischen Transitsignaturen und exportiert strukturierte Kandidaten-Telemetrie zur weiteren Validierung.',
      photometry:'PHOTOMETRIE', photometry_copy:'Relative Messungen konzentrieren die Suche auf beobachtbare Transit-Tiefe und Periodizität.',
      search:'SUCHE', search_copy:'Box Least Squares identifiziert Kandidatenperioden über viele Targets hinweg.',
      validate:'VALIDIERUNG', validate_copy:'Odd/Even- und Sekundärereignis-Prüfungen helfen dabei, typische False Positives auszusortieren.'
    }
  };

  const t = translations[lang];
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  const titles = {
    index: ['ASTREA SSP - Solo Space Program', 'ASTREA SSP - Solo Space Program'],
    projects: ['Systems - ASTREA SSP', 'Systeme - ASTREA SSP'],
    about: ['The Program - ASTREA SSP', 'Das Programm - ASTREA SSP'],
    icarus: ['ICARUS-RLV - ASTREA SSP', 'ICARUS-RLV - ASTREA SSP'],
    joanus: ['JOANUS - ASTREA SSP', 'JOANUS - ASTREA SSP']
  };
  const page = document.body.dataset.page;
  if (titles[page]) document.title = titles[page][lang === 'de' ? 1 : 0];

  navToggle?.setAttribute('aria-label', t.open_nav);
  navToggle?.addEventListener('click', () => {
    const open = nav?.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(Boolean(open)));
  });
  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav?.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }));

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveal = document.querySelectorAll('.reveal');
  if (reducedMotion) {
    reveal.forEach((element) => element.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveal.forEach((element) => observer.observe(element));
  }
})();
