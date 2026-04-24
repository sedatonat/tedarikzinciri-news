// Chronology of significant supply-chain events surfaced from the site's news.
// Each entry satisfies at least one of:
// - Attack / war / ceasefire (start, end, return)
// - Major accident (sinking, collision, explosion, blockage)
// - Government decision (tariff, sanction, ruling, agreement signing)
// - Major acquisition (completed)

export type EventKind =
  | 'attack' | 'ceasefire' | 'accident' | 'collision'
  | 'tariff' | 'sanction' | 'agreement' | 'acquisition'
  | 'drought' | 'cyber';

export interface ChronologyEvent {
  date: string;          // YYYY-MM-DD
  kind: EventKind;
  /** Slug of the source news article (without .md). */
  slug: string;
  title_tr: string;
  title_en: string;
  summary_tr: string;
  summary_en: string;
}

export const events: ChronologyEvent[] = [
  // 2023
  {
    date: '2023-12-08',
    kind: 'drought',
    slug: '2023-12-08-panama-kanali-su-seviyesi-kurakliktan-dolayi',
    title_tr: 'Panama Kanalı kuraklığı başlıyor',
    title_en: 'Panama Canal drought begins',
    summary_tr: 'Su seviyeleri kritik düştü, geçişler kısıtlanıyor.',
    summary_en: 'Water levels fall to critical, transits get capped.'
  },
  {
    date: '2023-12-13',
    kind: 'sanction',
    slug: 'abd-turk-sirketlerine-yaptirim-uyguladi',
    title_tr: 'ABD\'den 16 Türk şirketine yaptırım',
    title_en: 'US sanctions on 16 Turkish companies',
    summary_tr: 'Hazine tedarik zinciri ihlalleri gerekçesiyle listeyi açıkladı.',
    summary_en: 'Treasury announces list citing supply-chain violations.'
  },

  // 2024
  {
    date: '2024-01-16',
    kind: 'attack',
    slug: 'kizildeniz-gerilim-abd-gemi-fuze-saldirisi',
    title_tr: 'Kızıldeniz\'de ABD gemisine füze saldırısı',
    title_en: 'Missile strike on US ship in the Red Sea',
    summary_tr: 'Tırmanan gerilim küresel deniz güvenliği endişelerini büyüttü.',
    summary_en: 'Escalating tension fuels global maritime security concerns.'
  },
  {
    date: '2024-02-25',
    kind: 'attack',
    slug: 'orta-dogu-deniz-guvenligine-yeni-tehdit-husiler',
    title_tr: 'Husilerin MV Torm Thor\'a saldırısı',
    title_en: 'Houthis strike MV Torm Thor',
    summary_tr: 'Orta Doğu deniz güvenliğine yeni tehdit boyutu eklendi.',
    summary_en: 'A new threat dimension in Middle East maritime security.'
  },
  {
    date: '2024-03-04',
    kind: 'attack',
    slug: 'kizildenizde-msc-gemisine-houthi-saldirisi',
    title_tr: 'MSC konteyner gemisine Houthi saldırısı',
    title_en: 'MSC container ship hit by Houthis',
    summary_tr: 'Konteyner devleri rotalarını Ümit Burnu üzerinden değiştirmeye başladı.',
    summary_en: 'Container giants begin re-routing via the Cape of Good Hope.'
  },
  {
    date: '2024-05-16',
    kind: 'tariff',
    slug: 'beyaz-saray-cin-mallarina-tarife-karari',
    title_tr: 'Beyaz Saray\'dan Çin mallarına tarife kararı',
    title_en: 'White House tariff decision on Chinese goods',
    summary_tr: 'EV, çip, çelik dahil stratejik kalemlerde sert vergi artışları.',
    summary_en: 'Sharp duty hikes on EVs, chips, steel and other strategic items.'
  },
  {
    date: '2024-05-28',
    kind: 'attack',
    slug: 'kizildeniz-saldirilari-deniz-ticareti-umit-burnu',
    title_tr: 'Deniz ticareti Ümit Burnu\'na kayıyor',
    title_en: 'Sea trade reroutes to Cape of Good Hope',
    summary_tr: 'Süveyş alternatifi rota navlunları rekor yukarı çekti.',
    summary_en: 'Suez alternative route pushes freight rates to record highs.'
  },
  {
    date: '2024-06-20',
    kind: 'attack',
    slug: 'k-z-ldenizde-husi-saldirisi-tutor-gemisi-bat-r-ld',
    title_tr: 'Tutor gemisi Husi saldırısında battı',
    title_en: 'Tutor sunk by Houthi attack',
    summary_tr: 'Kızıldeniz kampanyasında batırılan ilk büyük dökme yük gemisi.',
    summary_en: 'First major bulk carrier sunk in the Red Sea campaign.'
  },
  {
    date: '2024-07-16',
    kind: 'acquisition',
    slug: 'aptean-wms-erp-principal-logistics-tech',
    title_tr: 'Aptean, Principal Logistics Technologies\'i satın aldı',
    title_en: 'Aptean acquires Principal Logistics Technologies',
    summary_tr: 'WMS pazarında konsolidasyon hızlanıyor.',
    summary_en: 'Consolidation accelerates in the WMS market.'
  },
  {
    date: '2024-10-28',
    kind: 'collision',
    slug: 'baltimore-koprusu-gemi-sahipleri-doj-anlasma',
    title_tr: 'Baltimore köprü çarpışmasına 102 milyon dolarlık uzlaşma',
    title_en: 'Baltimore bridge collision $102M settlement',
    summary_tr: 'Dali armatörleri ABD Adalet Bakanlığı ile anlaştı.',
    summary_en: 'Dali owners reach a settlement with the US Department of Justice.'
  },
  {
    date: '2024-12-04',
    kind: 'collision',
    slug: 'mega-containership-oil-tanker-collide-gibraltar',
    title_tr: 'Mega konteyner gemisi Cebelitarık\'ta tankerle çarpıştı',
    title_en: 'Mega-containership collides with tanker in Gibraltar Strait',
    summary_tr: 'Kritik geçişte iki dev geminin çarpışması seferleri etkiledi.',
    summary_en: 'Two giants collide in a critical strait, disrupting voyages.'
  },
  {
    date: '2024-12-24',
    kind: 'accident',
    slug: 'container-ship-capsize-turkish-port-accident-lates',
    title_tr: 'Ambarlı Limanı\'nda konteyner gemisi battı',
    title_en: 'Container ship sinks at Ambarlı Port',
    summary_tr: 'Türkiye\'nin en büyük konteyner limanlarından birinde kayıp.',
    summary_en: 'Loss at one of Türkiye\'s largest container ports.'
  },

  // 2025
  {
    date: '2025-01-28',
    kind: 'collision',
    slug: 'rus-nukleer-buzkiran-carpisma',
    title_tr: 'Rus nükleer buzkıran Arktik\'te çarpıştı',
    title_en: 'Russian nuclear icebreaker collides in the Arctic',
    summary_tr: 'Kuzey Deniz Yolu güzergâhında nadir bir kaza.',
    summary_en: 'A rare incident on the Northern Sea Route.'
  },
  {
    date: '2025-01-29',
    kind: 'ceasefire',
    slug: 'kizildeniz-abd-ve-uk-gemileri-ateskes',
    title_tr: 'ABD-UK gemileri Husi ateşkesi sonrası Kızıldeniz\'e dönüyor',
    title_en: 'US/UK ships return to Red Sea after Houthi ceasefire',
    summary_tr: 'Süveyş geçişlerinin yeniden hızlanması bekleniyor.',
    summary_en: 'Suez transits expected to ramp back up.'
  },
  {
    date: '2025-03-10',
    kind: 'collision',
    slug: 'kuzey-denizi-gemi-carpisma-tanker-kazasi',
    title_tr: 'Kuzey Denizi\'nde çarpışma sonrası petrol sızıntısı',
    title_en: 'North Sea collision causes oil spill',
    summary_tr: 'Çevresel risk yüksek; çevre temizliği başladı.',
    summary_en: 'High environmental risk; cleanup operations begin.'
  },
  {
    date: '2025-03-14',
    kind: 'acquisition',
    slug: 'triton-gci-satin-alimi',
    title_tr: 'Triton, GCI\'yi 1 milyar dolardan fazlaya satın aldı',
    title_en: 'Triton acquires GCI for over $1 billion',
    summary_tr: 'Konteyner kiralama segmentinde dev konsolidasyon.',
    summary_en: 'Major consolidation in the container leasing segment.'
  },
  {
    date: '2025-10-26',
    kind: 'accident',
    slug: 'cin-gemisi-guangzhouda-batti',
    title_tr: 'Çin bayraklı gemi Guangzhou açıklarında battı',
    title_en: 'Chinese-flag ship sinks off Guangzhou',
    summary_tr: 'İki mürettebat kayıp; arama kurtarma sürüyor.',
    summary_en: 'Two crew missing; search-and-rescue underway.'
  },
  {
    date: '2025-10-30',
    kind: 'ceasefire',
    slug: 'abd-cin-tarife-ateskesi',
    title_tr: 'ABD–Çin ticaret ateşkesi: tarifeler düşüyor',
    title_en: 'US–China trade truce: tariffs come down',
    summary_tr: 'Karşılıklı önlemler askıya alındı, soruşturmalar duruyor.',
    summary_en: 'Reciprocal measures suspended, investigations paused.'
  },
  {
    date: '2025-11-10',
    kind: 'agreement',
    slug: 'mhi-turkmenistan-amonyak-ure',
    title_tr: 'Mitsubishi HI, Türkmenistan\'da dev amonyak/üre kompleksi anlaşması',
    title_en: 'Mitsubishi HI signs Turkmenistan ammonia/urea deal',
    summary_tr: 'Orta Asya\'da büyük çaplı yeni bir gübre tedarik kaynağı.',
    summary_en: 'A major new fertilizer supply source in Central Asia.'
  },
  {
    date: '2025-11-12',
    kind: 'attack',
    slug: 'husi-kizildeniz-saldirilari-ara',
    title_tr: 'Husi saldırılarına ara verildi — risk sürüyor',
    title_en: 'Houthi attacks pause — risk persists',
    summary_tr: 'Gerginlik azaldı ama Kızıldeniz\'deki risk algısı yüksek.',
    summary_en: 'Tension eases but Red Sea risk perception remains high.'
  },
  {
    date: '2025-11-18',
    kind: 'collision',
    slug: 'dali-francis-scott-koprusu-kazasi-ntsb',
    title_tr: 'NTSB: Dali çarpışmasının kök sebebi tek gevşek kablo',
    title_en: 'NTSB: a single loose cable caused the Dali collision',
    summary_tr: 'Francis Scott Key köprüsü trajedisinin teknik raporu yayımlandı.',
    summary_en: 'Technical report on the Francis Scott Key bridge tragedy is out.'
  },

  // 2026
  {
    date: '2026-01-16',
    kind: 'ceasefire',
    slug: '2026-01-16-canada-inks-trade-truce-with-china-in-break-from-trumps-agenda',
    title_tr: 'Kanada–Çin ticaret ateşkesi imzalandı',
    title_en: 'Canada signs trade truce with China',
    summary_tr: 'Trump gündeminden ayrı bağımsız bir hat kuruldu.',
    summary_en: 'A line independent of Trump\'s agenda is drawn.'
  },
  {
    date: '2026-02-06',
    kind: 'tariff',
    slug: '2026-02-06-canada-to-revamp-tariffs-to-keep-auto-plants-trump-covets',
    title_tr: 'Kanada otomobil fabrikalarını korumak için tarife kararı',
    title_en: 'Canada\'s tariff move to protect auto plants',
    summary_tr: 'Trump\'ın hedefindeki tesisler için savunma hattı.',
    summary_en: 'A defensive line for plants in Trump\'s crosshairs.'
  },
  {
    date: '2026-02-09',
    kind: 'accident',
    slug: '2026-02-09-sealloyd-arc-cargo-ship-sinks-phuket-thailand-oil-leak-200-containers',
    title_tr: 'Tayland açıklarında Sealloyd Arc battı',
    title_en: 'Sealloyd Arc sinks off Thailand',
    summary_tr: 'Petrol sızıntısı ve 200\'den fazla konteyner kayboldu.',
    summary_en: 'Oil spill and over 200 containers lost.'
  },
  {
    date: '2026-04-03',
    kind: 'cyber',
    slug: '2026-04-03-hasbro-cyberattack-march-2026-sec-disclosure',
    title_tr: 'Hasbro siber saldırıya uğradı',
    title_en: 'Hasbro hit by cyberattack',
    summary_tr: 'SEC\'e 8-K bildirimi sunuldu; sevkiyatlarda gecikme uyarısı.',
    summary_en: '8-K filing made to the SEC; delivery delays warned.'
  },
  {
    date: '2026-04-07',
    kind: 'accident',
    slug: '2026-04-07-fuel-truck-explosion-shuts-bridge-panama-canal',
    title_tr: 'Yakıt tankeri patlaması Panama köprüsünü kapattı',
    title_en: 'Fuel tanker blast shuts Panama Canal bridge',
    summary_tr: 'Atlantik–Pasifik bağlantısında ciddi aksaklık.',
    summary_en: 'Serious disruption on the Atlantic–Pacific link.'
  },
  {
    date: '2026-04-09',
    kind: 'ceasefire',
    slug: '2026-04-09-marine-insurers-iran-ceasefire-skuld-dnk-hormuz-navigation-clarity',
    title_tr: 'Deniz sigortacıları İran ateşkesinde netlik bekliyor',
    title_en: 'Marine insurers await clarity on Iran ceasefire',
    summary_tr: 'Skuld ve DNK\'dan Hürmüz seyrüsefer riski uyarısı.',
    summary_en: 'Skuld and DNK warn on Hormuz navigation risk.'
  },
  {
    date: '2026-04-16',
    kind: 'attack',
    slug: '2026-04-16-stena-imperative-us-flagged-tanker-bahrain-port-projectile-attack',
    title_tr: 'Bahreyn limanında ABD bayraklı tankere mermi saldırısı',
    title_en: 'Bullet attack on US-flag tanker at Bahrain port',
    summary_tr: 'Körfez güvenliği yeniden gündemde.',
    summary_en: 'Gulf security back in the spotlight.'
  },
  {
    date: '2026-04-17',
    kind: 'attack',
    slug: '2026-04-17-port-of-salalah-drone-strike-apmt-maersk-suspension-march-2026',
    title_tr: 'Salalah limanında drone saldırısı operasyonları durdurdu',
    title_en: 'Drone attack halts operations at Salalah port',
    summary_tr: 'Umman\'ın en büyük transhipment limanı geçici olarak kapandı.',
    summary_en: 'Oman\'s largest transhipment port temporarily shut.'
  },
  {
    date: '2026-04-22',
    kind: 'tariff',
    slug: '2026-04-22-us-lowers-tariffs-eu-autos-15-percent',
    title_tr: 'ABD, AB otomobil tarifelerini %15\'e indirdi',
    title_en: 'US cuts EU auto tariffs to 15%',
    summary_tr: 'Atlantik ötesi ticaret anlaşmasının şartları sağlamlaştırıldı.',
    summary_en: 'Transatlantic trade deal terms firmed up.'
  },
  {
    date: '2026-04-22',
    kind: 'cyber',
    slug: '2026-04-22-jaguar-land-rover-cyberattack-uk-car-output',
    title_tr: 'Jaguar Land Rover üretimi siber saldırı ile felç oldu',
    title_en: 'Jaguar Land Rover production paralysed by cyberattack',
    summary_tr: 'UK araç üretimi %27 düştü, tedarikçi ağı zincirleme etkilendi.',
    summary_en: 'UK vehicle output down 27%; supplier network hit in cascade.'
  },
];
