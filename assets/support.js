(() => {
  const isGerman=(navigator.languages||[navigator.language||'en']).some(l=>String(l).toLowerCase().startsWith('de'));
  const t=isGerman?{
    title:'ASTREA unterstützen.',
    lead:'Wähle direkt, was du unterstützen willst. Der Checkout läuft über Patreon.',
    hardware_type:'EINMALIG',
    hardware_title:'Hardware Support',
    hardware_copy:'Direkter Support für Flughardware, Sensoren, Bergungssysteme und Testequipment.',
    hardware_detail:'Direkte Finanzierung für die physische Seite von ASTREA: Avionik, Sensoren, Bergungshardware, Strukturteile, Testequipment und Missionsverbrauchsmaterial.',
    hardware_order:'AUF PATREON ORDERN ↗',
    hardware_item_1:'Flugcomputer, Sensoren und Elektronik',
    hardware_item_2:'Steuerungs- und Bergungshardware',
    hardware_item_3:'Bench-Tests und Missionsverbrauchsmaterial',
    member_type:'WIEDERKEHREND',
    member_title:'Membership',
    member_copy:'Wiederkehrender Support für laufende ASTREA Entwicklung, Tests und öffentliche Projektarbeit.',
    member_detail:'Wiederkehrender Support für das gesamte ASTREA Programm und die laufende Arbeit an Hardware, Software, Tests und Dokumentation.',
    member_join:'AUF PATREON BEITRETEN ↗',
    member_item_1:'Wiederkehrender Programmsupport',
    member_item_2:'Direkt über Patreon verwaltet',
    member_item_3:'Aktueller Preis und Vorteile werden vor dem Beitritt angezeigt',
    details:'DETAILS →'
  }:{
    title:'Support ASTREA.',
    lead:'Choose exactly what you want to support. Checkout is handled by Patreon.',
    hardware_type:'ONE-TIME',
    hardware_title:'Hardware Support',
    hardware_copy:'Direct support for flight hardware, sensors, recovery systems and test equipment.',
    hardware_detail:'Direct funding for the physical side of ASTREA: avionics, sensors, recovery hardware, structural parts, test equipment and mission consumables.',
    hardware_order:'ORDER ON PATREON ↗',
    hardware_item_1:'Flight computers, sensors and electronics',
    hardware_item_2:'Control and recovery hardware',
    hardware_item_3:'Bench testing and mission consumables',
    member_type:'RECURRING',
    member_title:'Membership',
    member_copy:'Recurring support for ongoing ASTREA development, testing and public project work.',
    member_detail:'Recurring support for the whole ASTREA program and its continued hardware, software, testing and documentation work.',
    member_join:'JOIN ON PATREON ↗',
    member_item_1:'Recurring program support',
    member_item_2:'Managed directly through Patreon',
    member_item_3:'Current price and benefits shown before joining',
    details:'DETAILS →'
  };
  document.documentElement.lang=isGerman?'de':'en';
  document.querySelectorAll('[data-support]').forEach(el=>{const k=el.dataset.support;if(t[k]!==undefined)el.innerHTML=t[k]});
})();