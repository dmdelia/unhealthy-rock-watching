(() => {
  const isGerman=(navigator.languages||[navigator.language||'en']).some(l=>String(l).toLowerCase().startsWith('de'));
  const t=isGerman?{
    support_title:'Unterstütze die Arbeit<br>hinter der Mission.',
    support_lead:'ASTREA wird unabhängig aufgebaut. Support hilft dabei, Designs, Software und Testpläne in reale Hardware, Testkampagnen und langfristige Entwicklung zu verwandeln.',
    choose:'01 / SUPPORT WÄHLEN',
    hardware_title:'Finanziere das physische System.',
    hardware_copy:'Unterstütze Avionik, Sensoren, Aktuation, Bergungshardware, Missionsverbrauchsmaterial und Hardware für die ICARUS-RLV Entwicklung.',
    hardware_open:'Hardware Support öffnen ↗',
    member_title:'Unterstütze ASTREA langfristig.',
    member_copy:'Wiederkehrender Support für das Programm über Patreon. Aktuelle Optionen, Preise und Vorteile werden vor dem Checkout angezeigt.',
    member_open:'Mitgliedschaft öffnen ↗',
    transparent:'TRANSPARENT', transparent_copy:'Support ist mit realer Entwicklungsarbeit, Hardware und Testaktivität verbunden.',
    checkout:'PATREON CHECKOUT', checkout_copy:'Zahlungen, Mitgliedschaftsverwaltung und Checkout werden über Patreon abgewickelt.',
    optional:'OPTIONAL', optional_copy:'ASTREA zu verfolgen und die öffentlichen Projektinhalte zu nutzen erfordert keine finanzielle Unterstützung.',
    hw_title:'Finanziere, was<br>physisch existieren muss.', hw_lead:'Hardware Support geht in die physische Seite der ASTREA Entwicklung: Avionik, Sensoren, Steuerungshardware, Bergungssysteme, Nutzlastmaterial und Missionsverbrauchsmaterial.',
    hw_use:'01 / EINSATZBEREICHE', hw_a:'Avionik & Bench', hw_a_copy:'Flugcomputer, Sensoren, Stromverteilung, Verkabelung, Testelektronik und Bench-Hardware für die Systemvalidierung.',
    hw_c:'Steuerung & Bergung', hw_c_copy:'Aktuation, Grid-Fin Mechanik, RCS Entwicklung, Fallschirmhardware und Testteile für das Bergungssystem.',
    hw_m:'Missionshardware', hw_m_copy:'Nutzlastmaterial, Ballon- und Startverbrauchsmaterial, Strukturteile und Hardware für geplante Testkampagnen.',
    hw_checkout:'Wähle die aktuelle Hardware-Support-Option auf Patreon.', hw_checkout_copy:'Die aktuellen Hardware-Support-Angebote und der Checkout liegen bei Patreon. Preise und Verfügbarkeit dort sind maßgeblich.', hw_button:'Patreon Shop öffnen ↗',
    member_page_title:'Unterstütze das Programm<br>auf lange Sicht.', member_page_lead:'Membership ist der wiederkehrende Support-Pfad für ASTREA. Er hilft, Entwicklung über Hardware, Software, Tests und öffentliche Dokumentation hinweg weiterzuführen.',
    member_heading:'Ein wiederkehrender Support für das gesamte Programm.', member_body:'Aktuelle Mitgliedschaftsstufen, Preise und enthaltene Vorteile werden auf Patreon gepflegt. Vor dem Beitritt siehst du die genauen Bedingungen und verwaltest die Mitgliedschaft danach dort.',
    member_checkout:'Wähle deine Mitgliedschaft auf Patreon.', member_checkout_copy:'Patreon zeigt dir die aktuellen Mitgliedschaftsoptionen, Preise und Vorteile, bevor du etwas bestätigst.', member_button:'Mitgliedschaftsoptionen ansehen ↗'
  }:{
    support_title:'Back the work<br>behind the mission.',
    support_lead:'ASTREA is built independently. Support helps turn designs, software and test plans into real hardware, test campaigns and long-term development.',
    choose:'01 / CHOOSE SUPPORT PATH',
    hardware_title:'Fund the physical system.',
    hardware_copy:'Help cover avionics, sensors, actuation, recovery hardware, mission consumables and hardware needed for ICARUS-RLV development.',
    hardware_open:'Open hardware support ↗',
    member_title:'Back ASTREA over time.',
    member_copy:'Recurring support for the program through Patreon. Current membership options, pricing and included benefits are shown before checkout.',
    member_open:'Open membership ↗',
    transparent:'TRANSPARENT', transparent_copy:'Support is connected to real development work, hardware and test activity.',
    checkout:'PATREON CHECKOUT', checkout_copy:'Payments, membership management and checkout are handled on Patreon.',
    optional:'OPTIONAL', optional_copy:'Following ASTREA and using the public project material does not require financial support.',
    hw_title:'Fund what has<br>to exist physically.', hw_lead:'Hardware support is directed toward the physical side of ASTREA development: avionics, sensors, control hardware, recovery systems, payload materials and mission consumables.',
    hw_use:'01 / FUNDING LANES', hw_a:'Avionics & Bench', hw_a_copy:'Flight computers, sensors, power distribution, wiring, test electronics and bench hardware for system validation.',
    hw_c:'Control & Recovery', hw_c_copy:'Actuation, grid-fin mechanisms, RCS development, parachute hardware and recovery-system test parts.',
    hw_m:'Mission Hardware', hw_m_copy:'Payload materials, balloon and launch consumables, structural parts and hardware needed for planned test campaigns.',
    hw_checkout:'Choose the current hardware support option on Patreon.', hw_checkout_copy:'The current hardware support listings and checkout are hosted by Patreon. Pricing and availability shown there are authoritative.', hw_button:'Open Patreon shop ↗',
    member_page_title:'Support the program<br>for the long run.', member_page_lead:'Membership is the recurring support path for ASTREA. It helps keep development moving across hardware, software, testing and public documentation.',
    member_heading:'One recurring link to the whole program.', member_body:'Current membership levels, prices and included benefits are maintained on Patreon. You see the exact terms before joining and manage the membership there afterwards.',
    member_checkout:'Choose your membership on Patreon.', member_checkout_copy:'Patreon displays the current membership options, pricing and benefits before you confirm anything.', member_button:'View membership options ↗'
  };
  document.documentElement.lang=isGerman?'de':'en';
  document.querySelectorAll('[data-support]').forEach(el=>{const k=el.dataset.support;if(t[k]!==undefined)el.innerHTML=t[k]});
})();