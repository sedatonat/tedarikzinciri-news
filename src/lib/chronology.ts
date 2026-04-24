// Chronology of significant supply-chain events surfaced from the site's news.
// Each entry satisfies at least one of:
// - Attack / war / ceasefire (start, end, return)
// - Major accident (sinking, collision, explosion, blockage)
// - Government decision (tariff, sanction, ruling, agreement signing)
// - Major acquisition (completed)

export type EventKind =
  | 'attack' | 'ceasefire' | 'accident' | 'collision'
  | 'tariff' | 'sanction' | 'agreement' | 'acquisition'
  | 'drought' | 'cyber' | 'strike';

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
    date: '2024-02-29',
    kind: 'attack',
    slug: 'herson-limaninda-turk-gemisine-saldiri',
    title_tr: 'Herson Limanı\'nda Türk gemisine saldırı',
    title_en: 'Turkish ship attacked at Kherson port',
    summary_tr: 'Karadeniz\'deki Türk bayraklı gemiye füze saldırısı.',
    summary_en: 'Missile strike on a Turkish-flagged vessel in the Black Sea.'
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


  // Additional events (from broader scan)
  {
    date: '2024-05-14',
    kind: 'sanction',
    slug: 'ab-rus-lng-yasaklari-kuresel-etki',
    title_tr: 'AB, Rus LNG ithalatını yasakladı',
    title_en: 'EU bans Russian LNG imports',
    summary_tr: 'Küresel gaz piyasalarında arz rotalarını yeniden şekillendiren karar.',
    summary_en: 'Decision reshaping supply routes in the global gas market.'
  },
  {
    date: '2024-11-21',
    kind: 'sanction',
    slug: 'cinli-tasiyici-baltik-denizi-sabotaj',
    title_tr: 'Çinli taşıyıcı Baltık kablo sabotajı şüphesiyle gözaltında',
    title_en: 'Chinese carrier detained over Baltic cable sabotage suspicion',
    summary_tr: 'Telekom altyapısına müdahale şüphesi Danimarka donanmasını harekete geçirdi.',
    summary_en: 'Suspicion of telecom infrastructure interference drew in the Danish navy.'
  },
  {
    date: '2025-01-13',
    kind: 'attack',
    slug: 'ukrayna-turkakim-boru-hattina-saldiri-iddiasi',
    title_tr: 'Ukrayna\'dan TürkAkım boru hattına saldırı girişimi iddiası',
    title_en: 'Alleged Ukrainian attack attempt on TurkStream pipeline',
    summary_tr: 'Rus enerji altyapısı hedefli saldırılar yayılıyor.',
    summary_en: 'Attacks targeting Russian energy infrastructure are spreading.'
  },
  {
    date: '2025-01-13',
    kind: 'sanction',
    slug: 'abd-rus-yaptirimlari',
    title_tr: 'ABD\'den Rusya\'ya en büyük denizcilik yaptırım paketi',
    title_en: 'US unveils largest-ever maritime sanctions package on Russia',
    summary_tr: 'Gölge filo gemileri ve petrol trafiği hedefleniyor.',
    summary_en: 'Shadow-fleet ships and oil traffic are squarely targeted.'
  },
  {
    date: '2025-03-04',
    kind: 'attack',
    slug: 'rusya-odessa-limani-msc-levante-f-gemisine-fuze-saldirisi',
    title_tr: 'MSC Levante F\'ye Odessa\'da füze saldırısı',
    title_en: 'MSC Levante F hit by missile at Odessa',
    summary_tr: 'Rusya\'nın konteyner gemisine saldırısı Karadeniz riskini yeniden artırdı.',
    summary_en: 'Russia\'s strike on a container ship revived Black Sea risk concerns.'
  },
  {
    date: '2025-05-21',
    kind: 'cyber',
    slug: 'mns-cyberattack-cost',
    title_tr: 'Marks & Spencer siber saldırısı: 300 milyon sterline ulaşabilir',
    title_en: 'Marks & Spencer cyberattack could reach £300 million',
    summary_tr: 'Büyük perakendecide yıllık kâra doğrudan etki.',
    summary_en: 'Direct hit to a major retailer\'s annual profit.'
  },
  {
    date: '2025-06-09',
    kind: 'strike',
    slug: 'dhl-canada-strike',
    title_tr: 'DHL Kanada\'da grev: Lockout sonrası iş bırakıldı',
    title_en: 'DHL Canada strike: workers walk out after lockout',
    summary_tr: 'Ülke genelinde kargo gecikmelerinin habercisi.',
    summary_en: 'Foreshadowing nationwide cargo delays.'
  },
  {
    date: '2025-06-14',
    kind: 'cyber',
    slug: 'wholefoods-siber-saldiri',
    title_tr: 'Siber saldırı Whole Foods tedarikçisini vurdu',
    title_en: 'Cyberattack on Whole Foods supplier empties shelves',
    summary_tr: 'Rafların kısa sürede boşalması tedarik bağımlılığını gösterdi.',
    summary_en: 'Rapid shelf outages exposed the supply dependency.'
  },
  {
    date: '2025-09-20',
    kind: 'cyber',
    slug: 'siber-saldiri-jaguar-land-rover',
    title_tr: 'JLR siber saldırısı ilk dalga: akıllı fabrikalar durdu',
    title_en: 'First JLR cyberattack wave halts smart factories',
    summary_tr: 'Otomotiv üretimi topyekûn durdu; 2026\'ya sarkan zincir etkisi başladı.',
    summary_en: 'Auto production came to a full stop; chain effects carry into 2026.'
  },
  {
    date: '2025-10-14',
    kind: 'sanction',
    slug: 'china-sanctions-hanwha',
    title_tr: 'Çin, Hanwha Ocean\'un ABD bağlı şirketlerine yaptırım uyguladı',
    title_en: 'China sanctions Hanwha Ocean\'s US-linked units',
    summary_tr: 'Kore-ABD tersane ittifakına karşı sert yanıt.',
    summary_en: 'A sharp response to the Korea-US shipyard alliance.'
  },
  {
    date: '2025-11-03',
    kind: 'attack',
    slug: 'stolt-tanker-somali-korsan-saldirisi',
    title_tr: 'Somali\'de Stolt tankerine korsan saldırısı',
    title_en: 'Pirate attack on Stolt tanker off Somalia',
    summary_tr: 'Silahlı çatışma yaşandı; Hint Okyanusu rotasında risk geri döndü.',
    summary_en: 'Armed clash reported; risk returns to Indian Ocean routes.'
  },
  {
    date: '2025-11-14',
    kind: 'attack',
    slug: 'uktayna-novorosiysk-saldirisi-petrol',
    title_tr: 'Ukrayna saldırısı Novorossiysk\'te küresel petrol arzının %2\'sini durdurdu',
    title_en: 'Ukrainian strike halts 2% of global oil supply at Novorossiysk',
    summary_tr: 'Rus limanına yapılan drone saldırısı ham petrol yüklemelerini kesti.',
    summary_en: 'Drone strike on the Russian port cut crude loadings.'
  },
  {
    date: '2025-12-02',
    kind: 'attack',
    slug: 'midvolga2-karadeniz-saldiri',
    title_tr: 'MIDVOLGA-2 tankeri Türk kıyıları açığında saldırıya uğradı',
    title_en: 'MIDVOLGA-2 tanker attacked off Türkiye coast',
    summary_tr: 'Karadeniz\'de ticari denizciliğe saldırılar yayılıyor.',
    summary_en: 'Attacks on commercial shipping spread across the Black Sea.'
  },
  {
    date: '2025-12-03',
    kind: 'agreement',
    slug: 'ab-msc-nyk-ortak-girisim-onay',
    title_tr: 'AB, MSC–NYK ortak girişimini onayladı',
    title_en: 'EU approves MSC-NYK joint venture',
    summary_tr: 'Afrika lojistiğinde yeni ittifak şekilleniyor.',
    summary_en: 'A new alliance takes shape in African logistics.'
  },
  {
    date: '2025-12-07',
    kind: 'agreement',
    slug: 'wan-hai-yeni-konteyner',
    title_tr: 'Wan Hai filosu için 49.300 yeni konteyner sipariş etti',
    title_en: 'Wan Hai orders 49,300 new containers for its fleet',
    summary_tr: 'Uzakdoğu taşıyıcısından büyük kapasite yatırımı.',
    summary_en: 'A large capacity investment from the Far East carrier.'
  },
  {
    date: '2025-12-10',
    kind: 'attack',
    slug: 'ukrayne-rus-golge-filo-karadeniz-dashan',
    title_tr: 'Ukrayna Sea Baby dronlarıyla Rus gölge filo tankeri Dashan\'ı vurdu',
    title_en: 'Ukraine hits Russian shadow-fleet tanker Dashan with Sea Baby drones',
    summary_tr: 'Gölge filo hedefli saldırılar tırmanıyor.',
    summary_en: 'Attacks targeting the shadow fleet escalate.'
  },
  {
    date: '2025-12-12',
    kind: 'agreement',
    slug: 'hapaglloyd-methanol-yakit',
    title_tr: 'Hapag-Lloyd 8 adet metanol yakıtlı konteyner gemisi sipariş etti',
    title_en: 'Hapag-Lloyd orders 8 methanol-fueled container ships',
    summary_tr: 'Yeşil dönüşümde somut bir yatırım sinyali.',
    summary_en: 'A concrete investment signal in the green transition.'
  },
  {
    date: '2025-12-23',
    kind: 'sanction',
    slug: '2025-12-23-fcc-bans-importing-of-new-foreign-made-drones',
    title_tr: 'FCC yabancı üretim yeni drone\'ların ithalatını yasakladı',
    title_en: 'FCC bans import of new foreign-made drones',
    summary_tr: 'DJI ve Autel ABD pazarına yeni ürün sokamayacak.',
    summary_en: 'DJI and Autel blocked from shipping new products into the US.'
  },
  {
    date: '2026-01-02',
    kind: 'sanction',
    slug: '2026-01-02-us-sanctions-chinese-companies-tankers-with-venezuela-links',
    title_tr: 'ABD, Venezuela bağlantılı Çinli şirket ve tankerleri yaptırım listesine aldı',
    title_en: 'US sanctions Chinese companies and tankers with Venezuela links',
    summary_tr: 'Karakaş-Pekin petrol bağı hedefli yaptırımlarla test ediliyor.',
    summary_en: 'The Caracas-Beijing oil link tested with targeted sanctions.'
  },
  {
    date: '2026-01-06',
    kind: 'sanction',
    slug: '2026-01-06-china-bans-dual-use-item-exports-to-japan',
    title_tr: 'Çin, Japonya\'ya çift kullanımlı ürün ihracatını yasakladı',
    title_en: 'China bans dual-use item exports to Japan',
    summary_tr: 'Teknoloji tedarik zincirinde yeni gerilim hattı.',
    summary_en: 'A new tension line in the technology supply chain.'
  },
  {
    date: '2026-01-14',
    kind: 'attack',
    slug: '2026-01-14-cpc-tankers-black-sea-attack',
    title_tr: 'Karadeniz\'de CPC terminali yakınında iki petrol tankerine saldırı',
    title_en: 'Two oil tankers hit near the CPC terminal in the Black Sea',
    summary_tr: 'Kazak petrolünün ana ihracat kapısı bir kez daha hedef.',
    summary_en: 'The main export gate for Kazakh oil is again under fire.'
  },
  {
    date: '2026-01-30',
    kind: 'tariff',
    slug: '2026-01-30-trump-signs-order-threatening-tariffs-against-countries-selling-oil-to-cuba',
    title_tr: 'Trump, Küba\'ya petrol satan ülkelere tarife tehdit eden kararnameyi imzaladı',
    title_en: 'Trump signs order threatening tariffs on countries selling oil to Cuba',
    summary_tr: 'Küba enerji zincirine baskı yeniden artıyor.',
    summary_en: 'Pressure on Cuba\'s energy chain ratchets up again.'
  },
  {
    date: '2026-02-09',
    kind: 'agreement',
    slug: '2026-02-09-maersk-eight-dual-fuel-18600-teu-vessels-new-times-shipbuilding-order',
    title_tr: 'Maersk, New Times\'tan 8 adet 18.600 TEU çift yakıtlı gemi sipariş etti',
    title_en: 'Maersk orders 8 dual-fuel 18,600 TEU ships from New Times',
    summary_tr: 'Konteyner devinden büyük ölçekli yeşil yatırım.',
    summary_en: 'A large-scale green investment from the container giant.'
  },
  {
    date: '2026-02-16',
    kind: 'acquisition',
    slug: '2026-02-16-hapag-lloyd-confirms-4-billion-acquisition-zim-shipping-fimi-carve-out',
    title_tr: 'Hapag-Lloyd, 4 milyar dolarlık ZIM satın almasını onayladı',
    title_en: 'Hapag-Lloyd confirms $4 billion ZIM acquisition',
    summary_tr: 'FIMI konteyner hattı ayrılıyor; konsolidasyon hızlanıyor.',
    summary_en: 'FIMI container line to be carved out; consolidation accelerates.'
  },
  {
    date: '2026-04-14',
    kind: 'attack',
    slug: '2026-04-14-joc-bunker-fuel-shortages-us-counter-strikes-strait-of-hormuz-block',
    title_tr: 'ABD karşı saldırıları Hürmüz Boğazı\'nı kapattı',
    title_en: 'US counter-strikes close Strait of Hormuz',
    summary_tr: 'Bunker yakıtı kıtlığı kapıda; küresel tanker akışı aksıyor.',
    summary_en: 'Bunker fuel shortages loom; global tanker flow disrupted.'
  },
  {
    date: '2026-04-22',
    kind: 'attack',
    slug: '2026-04-22-houthis-attack-netherlands-flagged-ship-gulf-aden',
    title_tr: 'Husiler Aden Körfezinde Hollanda bayraklı gemiye saldırdı',
    title_en: 'Houthis attack Netherlands-flagged ship in Gulf of Aden',
    summary_tr: 'Saldırı dalgası Kızıldeniz\'in güneyine yayıldı.',
    summary_en: 'Attack wave spreads to the southern Red Sea.'
  },
  {
    date: '2026-04-22',
    kind: 'attack',
    slug: '2026-04-22-container-ship-gunfire-oman-coast-iran-irgc',
    title_tr: 'Yunan çıkarlı konteyner gemisi Umman açıklarında silahlı saldırıya uğradı',
    title_en: 'Greek-interest container ship hit by gunfire off Oman',
    summary_tr: 'İran kıyılarına yakın sularda silahlı müdahale.',
    summary_en: 'Armed intervention in waters close to the Iranian coast.'
  },
  {
    date: '2026-04-22',
    kind: 'attack',
    slug: '2026-04-22-red-sea-ship-ablaze-abandoned-yemen-attack',
    title_tr: 'Kızıldeniz gemisi Yemen yakınında saldırı sonrası ateşe verildi ve terk edildi',
    title_en: 'Red Sea ship ablaze, abandoned after Yemen-area attack',
    summary_tr: 'Mürettebat kurtarıldı; gemi alevler içinde sürükleniyor.',
    summary_en: 'Crew rescued; vessel drifts in flames.'
  },


  // Batch 2: comprehensive scan additions
  {
    date: '2023-11-22',
    kind: 'agreement',
    slug: '2023-11-22-bmw',
    title_tr: 'BMW, Arsenikli su sebebi ile soruşturma başlattı.',
    title_en: 'BMW launches investigation over arsenic-contaminated water',
    summary_tr: 'BMW, Arsenikli su sebebi ile soruşturma başlattı.',
    summary_en: 'BMW launches investigation over arsenic-contaminated water'
  },
  {
    date: '2023-12-11',
    kind: 'attack',
    slug: '2023-12-11-ukrayna-sinir-blokajini-asmak-icin-rola-ya',
    title_tr: 'Ukrayna Sınır Blokajını Aşmak için RoLa \'ya Başvurdu',
    title_en: 'Ukraine Turns to Ro-La to Break Border Blockade',
    summary_tr: 'Ukrayna Sınır Blokajını Aşmak için RoLa \'ya Başvurdu',
    summary_en: 'Ukraine Turns to Ro-La to Break Border Blockade'
  },
  {
    date: '2023-12-16',
    kind: 'attack',
    slug: '2023-12-16-suez-kanali-maersk-israil-filistin',
    title_tr: 'İsrail \'in Filistin \'e Saldırısı Sebebi ile Suezh Kanalı da Artık Güvenli oluyorn Uzaklaş…',
    title_en: 'Israel\'s Attacks on Palestine Put Suez Canal\'s Safety Under Threat',
    summary_tr: 'İsrail \'in Filistin \'e Saldırısı Sebebi ile Suezh Kanalı da Artık Güvenli oluyorn Uzaklaşıyor',
    summary_en: 'Israel\'s Attacks on Palestine Put Suez Canal\'s Safety Under Threat'
  },
  {
    date: '2023-12-25',
    kind: 'sanction',
    slug: 'zim-line-gemi-trafigi-malezya-yasagi',
    title_tr: 'ZIM Line’ın Gemi Trafiği Malezya\'da Yasaklandı',
    title_en: 'ZIM Line\'s Ship Traffic Banned in Malaysia',
    summary_tr: 'ZIM Line’ın Gemi Trafiği Malezya\'da Yasaklandı',
    summary_en: 'ZIM Line\'s Ship Traffic Banned in Malaysia'
  },
  {
    date: '2024-02-13',
    kind: 'drought',
    slug: 'panama-kanali-gemi-kisitlamalari-2024',
    title_tr: 'Panama Kanalı\'nda Geçiş Kısıtlamaları ve Su Seviyeleri Üzerine Güncel Durum',
    title_en: '\'Panama Canal: Current Status on Transit Restrictions and Water Levels',
    summary_tr: 'Panama Kanalı\'nda Geçiş Kısıtlamaları ve Su Seviyeleri Üzerine Güncel Durum',
    summary_en: '\'Panama Canal: Current Status on Transit Restrictions and Water Levels'
  },
  {
    date: '2024-02-15',
    kind: 'accident',
    slug: 'suez-panama-kanal-aksamalari-perakendeci-maliyeti',
    title_tr: 'Süveyş ve Panama Kanallarındaki Aksamalar Perakendecilere Pahalıya Patlayabilir',
    title_en: 'Disruptions at Suez and Panama Canals Could Cost Retailers Dearly',
    summary_tr: 'Süveyş ve Panama Kanallarındaki Aksamalar Perakendecilere Pahalıya Patlayabilir',
    summary_en: 'Disruptions at Suez and Panama Canals Could Cost Retailers Dearly'
  },
  {
    date: '2024-03-08',
    kind: 'accident',
    slug: 'hindistan-limanlari-krize-ragmen-ihracat-ivmesi',
    title_tr: 'Hindistan Limanları Kızıldeniz Krizine Rağmen İhracatta İvme Kazanıyor',
    title_en: 'Indian Ports Gaining Momentum in Exports Despite Red Sea Crisis',
    summary_tr: 'Hindistan Limanları Kızıldeniz Krizine Rağmen İhracatta İvme Kazanıyor',
    summary_en: 'Indian Ports Gaining Momentum in Exports Despite Red Sea Crisis'
  },
  {
    date: '2024-03-16',
    kind: 'accident',
    slug: 'evyapport-limani-vinc-kazasi',
    title_tr: 'Evyapport Limanı\'nda Vinçleri Deviren Gemi Kazası',
    title_en: 'Ship Accident Topples Cranes at Evyapport',
    summary_tr: 'Evyapport Limanı\'nda Vinçleri Deviren Gemi Kazası',
    summary_en: 'Ship Accident Topples Cranes at Evyapport'
  },
  {
    date: '2024-03-26',
    kind: 'accident',
    slug: 'baltimore-koprusunde-kaza-maersk-gemisi',
    title_tr: '\'Baltimore Köprüsü\'\'nde Kaza: Maersk\'\'in Kiraladığı Gemi Çarptı',
    title_en: '\'Baltimore Bridge Collision: Maersk-Chartered Vessel Strikes Francis Scott Key Bridge',
    summary_tr: '\'Baltimore Köprüsü\'\'nde Kaza: Maersk\'\'in Kiraladığı Gemi Çarptı',
    summary_en: '\'Baltimore Bridge Collision: Maersk-Chartered Vessel Strikes Francis Scott Key Bridge'
  },
  {
    date: '2024-03-28',
    kind: 'accident',
    slug: 'baltimore-kopru-su-kazasi-kirli-yakit',
    title_tr: 'Baltimore Köprüsü Kazasına Kirli Yakıt Sebep Olmuş Olabilir',
    title_en: 'Dirty Fuel May Have Caused Baltimore Bridge Collision',
    summary_tr: 'Baltimore Köprüsü Kazasına Kirli Yakıt Sebep Olmuş Olabilir',
    summary_en: 'Dirty Fuel May Have Caused Baltimore Bridge Collision'
  },
  {
    date: '2024-03-31',
    kind: 'accident',
    slug: 'evyap-liman-kaza-sonrasi-gemi-ayrildi',
    title_tr: 'Evyap Limanı\'ndaki Kaza Sonrası YM Witness Konteyner Gemisi Ayrıldı',
    title_en: 'YM Witness Container Ship Departs Evyap Port After Accident',
    summary_tr: 'Evyap Limanı\'ndaki Kaza Sonrası YM Witness Konteyner Gemisi Ayrıldı',
    summary_en: 'YM Witness Container Ship Departs Evyap Port After Accident'
  },
  {
    date: '2024-05-03',
    kind: 'accident',
    slug: 'baltimore-koprusu-kazasinda-besinci-isci-cesedi',
    title_tr: 'Baltimore Köprüsü Kazasında Beşinci İşçi Cesedi Bulundu',
    title_en: 'Fifth Worker\'s Body Recovered in Baltimore Bridge Collapse',
    summary_tr: 'Baltimore Köprüsü Kazasında Beşinci İşçi Cesedi Bulundu',
    summary_en: 'Fifth Worker\'s Body Recovered in Baltimore Bridge Collapse'
  },
  {
    date: '2024-05-08',
    kind: 'accident',
    slug: 'baltimore-kopru-kazasi-altinci-kurban',
    title_tr: 'Baltimore\'daki Köprü Kazasında Altıncı ve Son Kurbanın Cesedi Bulundu',
    title_en: 'Sixth and Final Victim\'s Body Recovered in Baltimore Bridge Collapse',
    summary_tr: 'Baltimore\'daki Köprü Kazasında Altıncı ve Son Kurbanın Cesedi Bulundu',
    summary_en: 'Sixth and Final Victim\'s Body Recovered in Baltimore Bridge Collapse'
  },
  {
    date: '2024-05-13',
    kind: 'agreement',
    slug: 'cosco-shipping-abd-de-lojistik-depo-acildi',
    title_tr: 'COSCO SHIPPING, ABD’de Kapsamlı Lojistik Depo Operasyonlarını Başlattı',
    title_en: 'COSCO SHIPPING Launches Comprehensive Logistics Warehouse Operations in the U.S.',
    summary_tr: 'COSCO SHIPPING, ABD’de Kapsamlı Lojistik Depo Operasyonlarını Başlattı',
    summary_en: 'COSCO SHIPPING Launches Comprehensive Logistics Warehouse Operations in the U.S.'
  },
  {
    date: '2024-05-14',
    kind: 'accident',
    slug: 'baltimore-koprusu-kazasi-on-raporu',
    title_tr: 'Baltimore Köprüsü Kazası Ön Raporu Yayımlandı',
    title_en: 'NTSB Releases Preliminary Report on Baltimore Bridge Disaster',
    summary_tr: 'Baltimore Köprüsü Kazası Ön Raporu Yayımlandı',
    summary_en: 'NTSB Releases Preliminary Report on Baltimore Bridge Disaster'
  },
  {
    date: '2024-05-16',
    kind: 'accident',
    slug: 'baltimore-kazasina-yedek-guc-eksikligi-neden-oldu',
    title_tr: 'Baltimore Köprüsü Kazasına, Yedek Güç Eksikliği Neden Oldu',
    title_en: 'Baltimore Bridge Crash Caused by Lack of Backup Power',
    summary_tr: 'Baltimore Köprüsü Kazasına, Yedek Güç Eksikliği Neden Oldu',
    summary_en: 'Baltimore Bridge Crash Caused by Lack of Backup Power'
  },
  {
    date: '2024-05-23',
    kind: 'sanction',
    slug: 'bmw-yasakli-tedarikci-mini-cooper-usa',
    title_tr: 'BMW\'nin Yasaklı Tedarikçiden Parça Kullanarak ABD\'ye Mini Cooper İhracatı',
    title_en: 'BMW Exports Mini Cooper to US Using Parts From Banned Supplier',
    summary_tr: 'BMW\'nin Yasaklı Tedarikçiden Parça Kullanarak ABD\'ye Mini Cooper İhracatı',
    summary_en: 'BMW Exports Mini Cooper to US Using Parts From Banned Supplier'
  },
  {
    date: '2024-05-29',
    kind: 'agreement',
    slug: 'abd-koprulerde-acil-guvenlik-degerlendirmesi',
    title_tr: 'ABD\'deki Köprülerde Acil Güvenlik Değerlendirmesi Başlatıldı',
    title_en: 'Urgent Safety Assessment Launched on U.S. Bridges',
    summary_tr: 'ABD\'deki Köprülerde Acil Güvenlik Değerlendirmesi Başlatıldı',
    summary_en: 'Urgent Safety Assessment Launched on U.S. Bridges'
  },
  {
    date: '2024-08-09',
    kind: 'agreement',
    slug: 'abd-tasiyicilar-peak-sezon-erken-baslatti',
    title_tr: 'ABD\'li Taşıyıcılar Okyanus Peak Sezonunu Erken Başlattı',
    title_en: 'U.S. Shippers Launch Ocean Peak Season Early',
    summary_tr: 'ABD\'li Taşıyıcılar Okyanus Peak Sezonunu Erken Başlattı',
    summary_en: 'U.S. Shippers Launch Ocean Peak Season Early'
  },
  {
    date: '2024-09-16',
    kind: 'accident',
    slug: 'mro-operasyonlari-risk-ve-stok-optimizasyonu',
    title_tr: 'MRO Operasyonlarında Risk ve Stok Optimizasyonu Önem Kazanıyor',
    title_en: 'Risk Management and Inventory Optimization Gaining Importance in MRO Operations',
    summary_tr: 'MRO Operasyonlarında Risk ve Stok Optimizasyonu Önem Kazanıyor',
    summary_en: 'Risk Management and Inventory Optimization Gaining Importance in MRO Operations'
  },
  {
    date: '2024-10-10',
    kind: 'agreement',
    slug: 'ocean-network-express-aex-lex-yeni-rotalar',
    title_tr: 'Ocean Network Express, Aegean Express ve Levant Express Hatlarını Duyurdu',
    title_en: 'Ocean Network Express Announces Aegean Express and Levant Express Routes',
    summary_tr: 'Ocean Network Express, Aegean Express ve Levant Express Hatlarını Duyurdu',
    summary_en: 'Ocean Network Express Announces Aegean Express and Levant Express Routes'
  },
  {
    date: '2024-10-15',
    kind: 'agreement',
    slug: 'keelung-port-gantry-vinc-cokusu-sorusturma',
    title_tr: '\'Keelung Port\'\'ta Gantry Vinç Çöktü: Soruşturma Başlatıldı',
    title_en: '\'Gantry Crane Collapses at Keelung Port: Investigation Launched',
    summary_tr: '\'Keelung Port\'\'ta Gantry Vinç Çöktü: Soruşturma Başlatıldı',
    summary_en: '\'Gantry Crane Collapses at Keelung Port: Investigation Launched'
  },
  {
    date: '2024-10-16',
    kind: 'agreement',
    slug: 'bimco-autoshipman-anlasmasini-onayladi-uzaktan-gemi',
    title_tr: 'BIMCO, Uzaktan Kontrol Edilen Gemiler İçin AUTOSHIPMAN Anlaşmasını Onayladı',
    title_en: 'BIMCO Approves AUTOSHIPMAN Agreement for Remotely Operated Vessels',
    summary_tr: 'BIMCO, Uzaktan Kontrol Edilen Gemiler İçin AUTOSHIPMAN Anlaşmasını Onayladı',
    summary_en: 'BIMCO Approves AUTOSHIPMAN Agreement for Remotely Operated Vessels'
  },
  {
    date: '2024-10-23',
    kind: 'agreement',
    slug: 'eng-kong-singapur-otomatik-muhur-sistemi',
    title_tr: 'Eng Kong, Singapur\'un İlk Otomatik Konteyner Mühür Dağıtım Sistemini Başlattı',
    title_en: 'Eng Kong Launches Singapore\'s First Automated Container Seal Dispensing System',
    summary_tr: 'Eng Kong, Singapur\'un İlk Otomatik Konteyner Mühür Dağıtım Sistemini Başlattı',
    summary_en: 'Eng Kong Launches Singapore\'s First Automated Container Seal Dispensing System'
  },
  {
    date: '2024-11-08',
    kind: 'agreement',
    slug: 'amazon-drone-tolleson-arizona-teslimat',
    title_tr: 'Amazon, Arizona’nın Tolleson Şehrinde Aynı Gün Drone Teslimatını Başlattı',
    title_en: 'Amazon Launches Same-Day Drone Delivery in Tolleson, Arizona',
    summary_tr: 'Amazon, Arizona’nın Tolleson Şehrinde Aynı Gün Drone Teslimatını Başlattı',
    summary_en: 'Amazon Launches Same-Day Drone Delivery in Tolleson, Arizona'
  },
  {
    date: '2024-11-24',
    kind: 'agreement',
    slug: 'vard-five-walk-to-work-contract',
    title_tr: 'VARD, Uluslararası Müşteri ile Beş Walk-to-Work Gemi İçin Sözleşme İmzaladı',
    title_en: 'VARD Signs Contract for Five Walk-to-Work Vessels with International Customer',
    summary_tr: 'VARD, Uluslararası Müşteri ile Beş Walk-to-Work Gemi İçin Sözleşme İmzaladı',
    summary_en: 'VARD Signs Contract for Five Walk-to-Work Vessels with International Customer'
  },
  {
    date: '2024-11-29',
    kind: 'agreement',
    slug: 'cma-cgm-maya-rota',
    title_tr: 'CMA CGM, Orta Amerika Batı Kıyısı İçin Yeni “Maya” Servisini Başlattı',
    title_en: 'CMA CGM Launches New',
    summary_tr: 'CMA CGM, Orta Amerika Batı Kıyısı İçin Yeni “Maya” Servisini Başlattı',
    summary_en: 'CMA CGM Launches New'
  },
  {
    date: '2024-12-02',
    kind: 'drought',
    slug: 'panama-kanali-iklim-degisikligi-planlari',
    title_tr: 'İklim Değişikliğinin Tehdit Ettiği Panama Kanalı, Kuraklıkla Mücadelede Büyük Planlar Yap…',
    title_en: 'Threatened by Climate Change, Panama Canal Pushes Ambitious Plans to Combat Drought',
    summary_tr: 'İklim Değişikliğinin Tehdit Ettiği Panama Kanalı, Kuraklıkla Mücadelede Büyük Planlar Yapıyor',
    summary_en: 'Threatened by Climate Change, Panama Canal Pushes Ambitious Plans to Combat Drought'
  },
  {
    date: '2024-12-09',
    kind: 'accident',
    slug: 'climeon-novaalgoma-anlasmasi',
    title_tr: 'Climeon ve NovaAlgoma, Çimento Taşıyıcısında Isı Geri Kazanım Sistemi Kuruyor',
    title_en: 'Climeon and NovaAlgoma Install Waste Heat Recovery System on Cement Carrier',
    summary_tr: 'Climeon ve NovaAlgoma, Çimento Taşıyıcısında Isı Geri Kazanım Sistemi Kuruyor',
    summary_en: 'Climeon and NovaAlgoma Install Waste Heat Recovery System on Cement Carrier'
  },
  {
    date: '2024-12-24',
    kind: 'agreement',
    slug: 'msc-renfe-ortak-girisim',
    title_tr: 'MSC ve Renfe Ortak Demiryolu Girişimi İçin Ön Anlaşma İmzaladı',
    title_en: 'MSC and Renfe Sign Preliminary Agreement on Joint Rail Venture',
    summary_tr: 'MSC ve Renfe Ortak Demiryolu Girişimi İçin Ön Anlaşma İmzaladı',
    summary_en: 'MSC and Renfe Sign Preliminary Agreement on Joint Rail Venture'
  },
  {
    date: '2025-01-14',
    kind: 'accident',
    slug: 'kazak-cin-sinirinda-tren',
    title_tr: 'Kazak-Çin Sınırında 2024\'te Tren Trafiği Rekor Kırdı',
    title_en: 'Train Traffic on Kazakhstan-China Border Sets Record in 2024',
    summary_tr: 'Kazak-Çin Sınırında 2024\'te Tren Trafiği Rekor Kırdı',
    summary_en: 'Train Traffic on Kazakhstan-China Border Sets Record in 2024'
  },
  {
    date: '2025-01-16',
    kind: 'ceasefire',
    slug: 'kizildeniz-tehlike-husiler',
    title_tr: '\'Kızıldeniz\'\'de Tehlike: Yemen\'\'in Husileri Ateşkesi İzleyecek, Ancak Gemiler Hâlâ Risk A…',
    title_en: '\'Red Sea Danger: Yemen\'\'s Houthis to Monitor Ceasefire, but Ships Remain at Risk',
    summary_tr: '\'Kızıldeniz\'\'de Tehlike: Yemen\'\'in Husileri Ateşkesi İzleyecek, Ancak Gemiler Hâlâ Risk Altında',
    summary_en: '\'Red Sea Danger: Yemen\'\'s Houthis to Monitor Ceasefire, but Ships Remain at Risk'
  },
  {
    date: '2025-02-06',
    kind: 'accident',
    slug: 'toyota-traigoi-dizayn-odulu',
    title_tr: 'Toyota’nın Traigo_i Forklifti, Alman Tasarım Ödülü 2026’yı da Kazandı',
    title_en: 'Toyota\'s Traigo_i Forklift Wins the German Design Award 2026',
    summary_tr: 'Toyota’nın Traigo_i Forklifti, Alman Tasarım Ödülü 2026’yı da Kazandı',
    summary_en: 'Toyota\'s Traigo_i Forklift Wins the German Design Award 2026'
  },
  {
    date: '2025-02-10',
    kind: 'acquisition',
    slug: 'cofactr-factorio-satin-al',
    title_tr: '\'Cofactr Factor.io\'\'yu Satın Aldı: Tedarikçi Takibinde Otomasyon',
    title_en: '\'Cofactr Acquires Factor.io: Automating Supplier Tracking',
    summary_tr: '\'Cofactr Factor.io\'\'yu Satın Aldı: Tedarikçi Takibinde Otomasyon',
    summary_en: '\'Cofactr Acquires Factor.io: Automating Supplier Tracking'
  },
  {
    date: '2025-03-04',
    kind: 'collision',
    slug: 'konteyner-gemileri-carpisti-one-maersk',
    title_tr: 'Konteyner Gemileri Hong Kong\'da Çarpıştı',
    title_en: 'Container Vessels Collide in Hong Kong',
    summary_tr: 'Konteyner Gemileri Hong Kong\'da Çarpıştı',
    summary_en: 'Container Vessels Collide in Hong Kong'
  },
  {
    date: '2025-03-04',
    kind: 'acquisition',
    slug: 'sedna-flytta-satin-alimi',
    title_tr: 'Sedna, Flytta\'yı Satın Aldı',
    title_en: 'Sedna Acquires Flytta',
    summary_tr: 'Sedna, Flytta\'yı Satın Aldı',
    summary_en: 'Sedna Acquires Flytta'
  },
  {
    date: '2025-03-04',
    kind: 'agreement',
    slug: 'usps-next-day-28',
    title_tr: 'USPS 28 Eyalette Ertesi Gün Teslimatı Başlattı',
    title_en: 'USPS Launches Next-Day Delivery in 28 States',
    summary_tr: 'USPS 28 Eyalette Ertesi Gün Teslimatı Başlattı',
    summary_en: 'USPS Launches Next-Day Delivery in 28 States'
  },
  {
    date: '2025-03-07',
    kind: 'accident',
    slug: 'kazakistan-ptc-poti-terminal',
    title_tr: 'Kazakistan ve PTC Holding, Gürcistan\'ın Poti Limanı\'nda Yeni Konteyner Terminali İnşa Edi…',
    title_en: 'Kazakhstan and PTC Holding Build New Container Terminal at Georgia\'s Poti Port',
    summary_tr: 'Kazakistan ve PTC Holding, Gürcistan\'ın Poti Limanı\'nda Yeni Konteyner Terminali İnşa Ediyor',
    summary_en: 'Kazakhstan and PTC Holding Build New Container Terminal at Georgia\'s Poti Port'
  },
  {
    date: '2025-03-14',
    kind: 'accident',
    slug: 'konteyner-piyasa-perf',
    title_tr: '\'Konteyner Piyasasında Haftalık Performans: Eğilimler, Kazançlar ve Kayıplar',
    title_en: '\'Container Market Weekly Performance: Trends, Gains and Losses',
    summary_tr: '\'Konteyner Piyasasında Haftalık Performans: Eğilimler, Kazançlar ve Kayıplar',
    summary_en: '\'Container Market Weekly Performance: Trends, Gains and Losses'
  },
  {
    date: '2025-06-11',
    kind: 'attack',
    slug: 'wholefoods-unfi-siber-saldiri',
    title_tr: 'Siber Saldırı Sonrası Whole Foods Rafları Boş Kaldı',
    title_en: 'Cyber Attack Leaves Whole Foods Shelves Empty',
    summary_tr: 'Siber Saldırı Sonrası Whole Foods Rafları Boş Kaldı',
    summary_en: 'Cyber Attack Leaves Whole Foods Shelves Empty'
  },
  {
    date: '2025-07-17',
    kind: 'accident',
    slug: 'tsmc-cip-talep-patlamasi',
    title_tr: 'TSMC Talep Patlamasına Yetişmek İçin Yarışıyor',
    title_en: 'TSMC Races to Meet Soaring Demand',
    summary_tr: 'TSMC Talep Patlamasına Yetişmek İçin Yarışıyor',
    summary_en: 'TSMC Races to Meet Soaring Demand'
  },
  {
    date: '2025-08-16',
    kind: 'agreement',
    slug: 'google-nukleer-santral',
    title_tr: 'Google Tennessee’de İleri Nükleer Santral Planlarını Açıkladı',
    title_en: 'Google Unveils Advanced Nuclear Plant Plans in Tennessee',
    summary_tr: 'Google Tennessee’de İleri Nükleer Santral Planlarını Açıkladı',
    summary_en: 'Google Unveils Advanced Nuclear Plant Plans in Tennessee'
  },
  {
    date: '2025-09-14',
    kind: 'attack',
    slug: 'uk-arrest-airports-cyber',
    title_tr: 'Avrupa Havaalanlarına Yapılan Siber Saldırı Soruşturmasında İngiltere’de Gözaltı',
    title_en: 'Suspect Arrested in UK During Probe into Cyberattack on European Airports',
    summary_tr: 'Avrupa Havaalanlarına Yapılan Siber Saldırı Soruşturmasında İngiltere’de Gözaltı',
    summary_en: 'Suspect Arrested in UK During Probe into Cyberattack on European Airports'
  },
  {
    date: '2025-10-03',
    kind: 'attack',
    slug: 'jlr-restart-cyberattack',
    title_tr: 'Siber Saldırı Sonrası Jaguar Land Rover İngiltere’de Üretimi Yeniden Başlatıyor',
    title_en: 'Jaguar Land Rover Resumes UK Production After Cyberattack',
    summary_tr: 'Siber Saldırı Sonrası Jaguar Land Rover İngiltere’de Üretimi Yeniden Başlatıyor',
    summary_en: 'Jaguar Land Rover Resumes UK Production After Cyberattack'
  },
  {
    date: '2025-10-20',
    kind: 'agreement',
    slug: 'dhl-konsolide-gumruk',
    title_tr: 'DHL Global Forwarding, ABD Perakendecileri İçin Konsolide Gümrük Hizmetini Başlattı',
    title_en: 'DHL Global Forwarding Launches Consolidated Customs Service for U.S. Retailers',
    summary_tr: 'DHL Global Forwarding, ABD Perakendecileri İçin Konsolide Gümrük Hizmetini Başlattı',
    summary_en: 'DHL Global Forwarding Launches Consolidated Customs Service for U.S. Retailers'
  },
  {
    date: '2025-10-23',
    kind: 'agreement',
    slug: 'abd-avustralya-maden-anlasma',
    title_tr: 'ABD ve Avustralya Kritik Madenler İçin Stratejik İş Birliği Başlattı',
    title_en: 'U.S. and Australia Launch Strategic Partnership on Critical Minerals',
    summary_tr: 'ABD ve Avustralya Kritik Madenler İçin Stratejik İş Birliği Başlattı',
    summary_en: 'U.S. and Australia Launch Strategic Partnership on Critical Minerals'
  },
  {
    date: '2025-10-23',
    kind: 'agreement',
    slug: 'amazon-usps-iade',
    title_tr: 'Amazon, USPS ile Kapıdan İade Hizmetini Başlattı',
    title_en: 'Amazon Launches Doorstep Return Service with USPS',
    summary_tr: 'Amazon, USPS ile Kapıdan İade Hizmetini Başlattı',
    summary_en: 'Amazon Launches Doorstep Return Service with USPS'
  },
  {
    date: '2025-10-23',
    kind: 'agreement',
    slug: 'btk-baku-tiflis-kars-demiryolu',
    title_tr: 'Gürcistan, BTK Hattını Güçlendirecek Yeni Terminal ve Dijital Gümrük Planlarını Açıkladı',
    title_en: 'Georgia Unveils Plans for New Terminal and Digital Customs to Strengthen BTC Railway Line',
    summary_tr: 'Gürcistan, BTK Hattını Güçlendirecek Yeni Terminal ve Dijital Gümrük Planlarını Açıkladı',
    summary_en: 'Georgia Unveils Plans for New Terminal and Digital Customs to Strengthen BTC Railway Line'
  },
  {
    date: '2025-10-24',
    kind: 'agreement',
    slug: 'rusya-otonom-kamyon-tir',
    title_tr: 'Rusya, Otonom Kara Taşımacılığı İçin Yol Haritasını Onayladı',
    title_en: 'Russia Approves Roadmap for Autonomous Road Transport',
    summary_tr: 'Rusya, Otonom Kara Taşımacılığı İçin Yol Haritasını Onayladı',
    summary_en: 'Russia Approves Roadmap for Autonomous Road Transport'
  },
  {
    date: '2025-10-27',
    kind: 'ceasefire',
    slug: 'abd-asya-ticaret-anlasma',
    title_tr: 'ABD, Güneydoğu Asya ile Ticaret Anlaşmaları İmzaladı ve Çin ile Ateşkes Sinyali Verdi',
    title_en: 'U.S. Signs Trade Agreements with Southeast Asia and Signals Ceasefire with China',
    summary_tr: 'ABD, Güneydoğu Asya ile Ticaret Anlaşmaları İmzaladı ve Çin ile Ateşkes Sinyali Verdi',
    summary_en: 'U.S. Signs Trade Agreements with Southeast Asia and Signals Ceasefire with China'
  },
  {
    date: '2025-10-27',
    kind: 'ceasefire',
    slug: 'abd-cin-nadir-element-gorusmesi',
    title_tr: 'ABD ve Çin, Nadir Topraklar ve Gümrük Vergileri Üzerine Geçici Ateşkeste Anlaştı',
    title_en: 'US and China Agree on Temporary Ceasefire Over Rare Earths and Tariffs',
    summary_tr: 'ABD ve Çin, Nadir Topraklar ve Gümrük Vergileri Üzerine Geçici Ateşkeste Anlaştı',
    summary_en: 'US and China Agree on Temporary Ceasefire Over Rare Earths and Tariffs'
  },
  {
    date: '2025-10-27',
    kind: 'agreement',
    slug: 'chrobinson-agentic-ai',
    title_tr: 'C.H. Robinson, Yapay Zekâ Destekli “Agentic Supply Chain” ile Lojistikte Yeni Bir Dönem B…',
    title_en: 'C.H. Robinson Launches AI-Powered',
    summary_tr: 'C.H. Robinson, Yapay Zekâ Destekli “Agentic Supply Chain” ile Lojistikte Yeni Bir Dönem Başlattı',
    summary_en: 'C.H. Robinson Launches AI-Powered'
  },
  {
    date: '2025-10-27',
    kind: 'agreement',
    slug: 'deliverdirect-hizli-teslimat',
    title_tr: 'DeliverDirect, Küçük Paket Teslimatında Yeni Bir Dönem Başlattı',
    title_en: 'DeliverDirect Ushers in a New Era in Small Package Delivery',
    summary_tr: 'DeliverDirect, Küçük Paket Teslimatında Yeni Bir Dönem Başlattı',
    summary_en: 'DeliverDirect Ushers in a New Era in Small Package Delivery'
  },
  {
    date: '2025-10-27',
    kind: 'agreement',
    slug: 'dpworld-mombasa-liman-dijital',
    title_tr: 'DP World, Kenya’da Dijital Liman Topluluk Sistemi’ni Başlattı',
    title_en: 'DP World Launches Digital Port Community System in Kenya',
    summary_tr: 'DP World, Kenya’da Dijital Liman Topluluk Sistemi’ni Başlattı',
    summary_en: 'DP World Launches Digital Port Community System in Kenya'
  },
  {
    date: '2025-10-27',
    kind: 'collision',
    slug: 'stena-immaculate-kaza',
    title_tr: 'Kuzey Denizi’ndeki Ölümcül Çarpışmanın Ardından Stena Immaculate Satıldı',
    title_en: 'Stena Immaculate Sold Following Fatal North Sea Collision',
    summary_tr: 'Kuzey Denizi’ndeki Ölümcül Çarpışmanın Ardından Stena Immaculate Satıldı',
    summary_en: 'Stena Immaculate Sold Following Fatal North Sea Collision'
  },
  {
    date: '2025-10-28',
    kind: 'accident',
    slug: 'ups-isci-cikarma-2025',
    title_tr: 'UPS, Amazon Hacmindeki Düşüşe Paralel Olarak Bu Yıl 34 Bin Kişiyi İşten Çıkardı ve 93 Tes…',
    title_en: 'UPS Cuts 34,000 Positions and Closes 93 Facilities in 2025 Amid Amazon Volume Decline',
    summary_tr: 'UPS, Amazon Hacmindeki Düşüşe Paralel Olarak Bu Yıl 34 Bin Kişiyi İşten Çıkardı ve 93 Tesisi Kapattı',
    summary_en: 'UPS Cuts 34,000 Positions and Closes 93 Facilities in 2025 Amid Amazon Volume Decline'
  },
  {
    date: '2025-10-30',
    kind: 'ceasefire',
    slug: 'abd-cin-ricaret-savasi-ateskes',
    title_tr: '\'ABD–Çin Ticaret Ateşkesi: Tarifeler Düşüyor, Karşılıklı Önlemler Askıya Alınıyor',
    title_en: '\'U.S.–China Trade Truce: Tariffs Falling, Reciprocal Measures Suspended',
    summary_tr: '\'ABD–Çin Ticaret Ateşkesi: Tarifeler Düşüyor, Karşılıklı Önlemler Askıya Alınıyor',
    summary_en: '\'U.S.–China Trade Truce: Tariffs Falling, Reciprocal Measures Suspended'
  },
  {
    date: '2025-10-30',
    kind: 'accident',
    slug: 'deepocean-avustralya-sokum',
    title_tr: 'DeepOcean, Batı Avustralya’daki Deniz Altı Altyapısının Sökümü İçin Yeni Proje Kazandı',
    title_en: 'DeepOcean Wins Major Subsea Decommissioning Project Off Western Australia',
    summary_tr: 'DeepOcean, Batı Avustralya’daki Deniz Altı Altyapısının Sökümü İçin Yeni Proje Kazandı',
    summary_en: 'DeepOcean Wins Major Subsea Decommissioning Project Off Western Australia'
  },
  {
    date: '2025-10-30',
    kind: 'agreement',
    slug: 'postrack-uk-asset-tracking',
    title_tr: 'Postrack, İngiltere’de Lojistik ve Karayolu Taşımacılığına Yönelik Varlık Takip Hizmeti B…',
    title_en: 'Postrack Launches Asset Tracking Service for Logistics and Road Transport in the United K…',
    summary_tr: 'Postrack, İngiltere’de Lojistik ve Karayolu Taşımacılığına Yönelik Varlık Takip Hizmeti Başlattı',
    summary_en: 'Postrack Launches Asset Tracking Service for Logistics and Road Transport in the United Kingdom'
  },
  {
    date: '2025-10-31',
    kind: 'agreement',
    slug: 'volkswagen-slovakya-italya-cin',
    title_tr: 'Volkswagen, Slovakya–İtalya–Çin Arasında Yeni Intermodal Taşımacılık Hattı Başlattı',
    title_en: 'Volkswagen Launches New Intermodal Transport Link Between Slovakia, Italy and China',
    summary_tr: 'Volkswagen, Slovakya–İtalya–Çin Arasında Yeni Intermodal Taşımacılık Hattı Başlattı',
    summary_en: 'Volkswagen Launches New Intermodal Transport Link Between Slovakia, Italy and China'
  },
  {
    date: '2025-11-03',
    kind: 'accident',
    slug: 'leeuwin-ii-kaza-raporu',
    title_tr: '\'ATSB: Leeuwin II Kazasında Köprüüstü Ekip Koordinasyonundaki Hatalar Belirleyici Oldu',
    title_en: '\'ATSB: Bridge Team Coordination Failures Found to be Decisive in Leeuwin II Collision',
    summary_tr: '\'ATSB: Leeuwin II Kazasında Köprüüstü Ekip Koordinasyonundaki Hatalar Belirleyici Oldu',
    summary_en: '\'ATSB: Bridge Team Coordination Failures Found to be Decisive in Leeuwin II Collision'
  },
  {
    date: '2025-11-03',
    kind: 'accident',
    slug: 'linerless-etiketler-envanter',
    title_tr: '\'Linerless Etiketler: Depolama ve Üretimde Sürdürülebilirlik, Verimlilik ve Tasarrufun Üç…',
    title_en: '\'Linerless Labels: The Triple Win of Sustainability, Efficiency and Cost Savings in Wareh…',
    summary_tr: '\'Linerless Etiketler: Depolama ve Üretimde Sürdürülebilirlik, Verimlilik ve Tasarrufun Üçlü Kazancı',
    summary_en: '\'Linerless Labels: The Triple Win of Sustainability, Efficiency and Cost Savings in Warehousing and Manufacturing'
  },
  {
    date: '2025-11-03',
    kind: 'collision',
    slug: 'maersk-shekou-koprusu-carpisma',
    title_tr: 'Maersk Shekou Çarpışmasında Köprüüstü İletişim Hatası Zinciri Ortaya Çıktı',
    title_en: 'Maersk Shekou Collision Reveals Chain of Bridge Communication Failures',
    summary_tr: 'Maersk Shekou Çarpışmasında Köprüüstü İletişim Hatası Zinciri Ortaya Çıktı',
    summary_en: 'Maersk Shekou Collision Reveals Chain of Bridge Communication Failures'
  },
  {
    date: '2025-11-03',
    kind: 'agreement',
    slug: 'singapore-korea-yesil-koridor',
    title_tr: 'Singapur ve Güney Kore, Yeşil ve Dijital Denizcilik Koridoru Kurulması İçin Anlaşma İmzal…',
    title_en: 'Singapore and South Korea Sign Agreement to Establish Green and Digital Maritime Corridor',
    summary_tr: 'Singapur ve Güney Kore, Yeşil ve Dijital Denizcilik Koridoru Kurulması İçin Anlaşma İmzaladı',
    summary_en: 'Singapore and South Korea Sign Agreement to Establish Green and Digital Maritime Corridor'
  },
  {
    date: '2025-11-10',
    kind: 'agreement',
    slug: 'bg-mk-rail-border-crossing',
    title_tr: 'Bulgaristan ve Kuzey Makedonya, İlk Demiryolu Sınır Geçişi İçin Resmî Anlaşma İmzaladı',
    title_en: 'Bulgaria and North Macedonia Sign Official Agreement for First Railway Border Crossing',
    summary_tr: 'Bulgaristan ve Kuzey Makedonya, İlk Demiryolu Sınır Geçişi İçin Resmî Anlaşma İmzaladı',
    summary_en: 'Bulgaria and North Macedonia Sign Official Agreement for First Railway Border Crossing'
  },
  {
    date: '2025-11-10',
    kind: 'accident',
    slug: 'shoreham-espo-award-2025',
    title_tr: 'Shoreham Port, Kapsayıcılık Stratejisiyle 2025 ESPO Ödülünü Kazandı',
    title_en: 'Shoreham Port Wins 2025 ESPO Award for Inclusion Strategy',
    summary_tr: 'Shoreham Port, Kapsayıcılık Stratejisiyle 2025 ESPO Ödülünü Kazandı',
    summary_en: 'Shoreham Port Wins 2025 ESPO Award for Inclusion Strategy'
  },
  {
    date: '2025-11-11',
    kind: 'agreement',
    slug: 'ab-komisyonu-era-degerlendirmesi',
    title_tr: '\'AB Komisyonu, ERA Değerlendirmesini Açıkladı: Sonuç Olumlu, Ancak Beklentiler Tam Karşıl…',
    title_en: '\'EU Commission Releases ERA Assessment: Positive Outcome, but Expectations Not Fully Met',
    summary_tr: '\'AB Komisyonu, ERA Değerlendirmesini Açıkladı: Sonuç Olumlu, Ancak Beklentiler Tam Karşılanmadı',
    summary_en: '\'EU Commission Releases ERA Assessment: Positive Outcome, but Expectations Not Fully Met'
  },
  {
    date: '2025-11-11',
    kind: 'agreement',
    slug: 'rotterdam-hydrogen-import-consult',
    title_tr: 'Rotterdam Limanı, Hidrojen İthalat Terminallerini Hızlandırmak İçin Piyasa Danışma Süreci…',
    title_en: 'Port of Rotterdam Launches Market Consultation to Accelerate Hydrogen Import Terminals',
    summary_tr: 'Rotterdam Limanı, Hidrojen İthalat Terminallerini Hızlandırmak İçin Piyasa Danışma Süreci Başlattı',
    summary_en: 'Port of Rotterdam Launches Market Consultation to Accelerate Hydrogen Import Terminals'
  },
  {
    date: '2025-11-17',
    kind: 'tariff',
    slug: 'abd-avrupa-ilac-tarifeleri',
    title_tr: 'ABD–AB İlaç Tarifeleri Yerli Üretimi Geri Getirir mi?',
    title_en: 'Will US–EU Pharma Tariffs Restore Domestic Production?',
    summary_tr: 'ABD–AB İlaç Tarifeleri Yerli Üretimi Geri Getirir mi?',
    summary_en: 'Will US–EU Pharma Tariffs Restore Domestic Production?'
  },
  {
    date: '2025-11-17',
    kind: 'agreement',
    slug: 'bangladesh-laldia-terminal-2025',
    title_tr: 'Bangladeş, 550 Milyon Dolarlık Laldia Terminali İçin İmtiyaz Anlaşmasını Resmen Onayladı',
    title_en: 'Bangladesh Formally Approves 550 Million Dollar Laldia Terminal Concession Agreement',
    summary_tr: 'Bangladeş, 550 Milyon Dolarlık Laldia Terminali İçin İmtiyaz Anlaşmasını Resmen Onayladı',
    summary_en: 'Bangladesh Formally Approves 550 Million Dollar Laldia Terminal Concession Agreement'
  },
  {
    date: '2025-11-18',
    kind: 'attack',
    slug: 'novorossiysk-uktayna-saldirisi-gecikmesi',
    title_tr: 'Ukrayna Saldırısı Sonrası Novorossiysk’te Ham Petrol Yüklemeleri 2–3 Gün Gecikiyor',
    title_en: 'Crude Oil Loadings Delayed 2–3 Days at Novorossiysk Following Ukrainian Attack',
    summary_tr: 'Ukrayna Saldırısı Sonrası Novorossiysk’te Ham Petrol Yüklemeleri 2–3 Gün Gecikiyor',
    summary_en: 'Crude Oil Loadings Delayed 2–3 Days at Novorossiysk Following Ukrainian Attack'
  },
  {
    date: '2025-11-20',
    kind: 'agreement',
    slug: 'schneider-fast-track-demiryolu',
    title_tr: 'Schneider National, Fast Track Premium Demiryolu Hizmetini Başlattı',
    title_en: 'Schneider National Launches Fast Track Premium Rail Service',
    summary_tr: 'Schneider National, Fast Track Premium Demiryolu Hizmetini Başlattı',
    summary_en: 'Schneider National Launches Fast Track Premium Rail Service'
  },
  {
    date: '2025-11-23',
    kind: 'agreement',
    slug: 'cma-cgm-rusya-devam',
    title_tr: 'CMA CGM Rusya’da Ticari Faaliyetlerini Sınırlı Kapsamda Yeniden Başlattı',
    title_en: 'CMA CGM Resumes Limited Commercial Operations in Russia',
    summary_tr: 'CMA CGM Rusya’da Ticari Faaliyetlerini Sınırlı Kapsamda Yeniden Başlattı',
    summary_en: 'CMA CGM Resumes Limited Commercial Operations in Russia'
  },
  {
    date: '2025-11-24',
    kind: 'agreement',
    slug: 'abd-genesis-projesi',
    title_tr: 'ABD “Genesis Mission” ile Yapay Zekâ Destekli Bilimsel Atılım Programını Başlattı',
    title_en: 'U.S. Launches',
    summary_tr: 'ABD “Genesis Mission” ile Yapay Zekâ Destekli Bilimsel Atılım Programını Başlattı',
    summary_en: 'U.S. Launches'
  },
  {
    date: '2025-11-24',
    kind: 'agreement',
    slug: 'cma-cgm-barge-abd-ticaret',
    title_tr: 'CMA CGM ABD Ticareti İçin Kuzey Vietnam’da Yeni Barge Koridoru Başlattı',
    title_en: 'CMA CGM Launches New Barge Corridor in Northern Vietnam for U.S. Trade',
    summary_tr: 'CMA CGM ABD Ticareti İçin Kuzey Vietnam’da Yeni Barge Koridoru Başlattı',
    summary_en: 'CMA CGM Launches New Barge Corridor in Northern Vietnam for U.S. Trade'
  },
  {
    date: '2025-11-25',
    kind: 'agreement',
    slug: 'dammam-lojistik-atilim',
    title_tr: 'SGP, Dammam Lojistik Bölgesi ve Terminal 2 Genişlemesini Başlattı',
    title_en: 'SGP Launches Dammam Logistics Zone and Terminal 2 Expansion',
    summary_tr: 'SGP, Dammam Lojistik Bölgesi ve Terminal 2 Genişlemesini Başlattı',
    summary_en: 'SGP Launches Dammam Logistics Zone and Terminal 2 Expansion'
  },
  {
    date: '2025-11-28',
    kind: 'attack',
    slug: 'karadeniz-golge-filo-patlama',
    title_tr: 'Karadeniz’de Iki Tankere Yönelik Saldırı Sonrası Acil Müdahale Başlatıldı',
    title_en: 'Emergency Response Launched Following Attacks on Two Tankers in the Black Sea',
    summary_tr: 'Karadeniz’de Iki Tankere Yönelik Saldırı Sonrası Acil Müdahale Başlatıldı',
    summary_en: 'Emergency Response Launched Following Attacks on Two Tankers in the Black Sea'
  },
  {
    date: '2025-11-28',
    kind: 'agreement',
    slug: 'seaintel-kar-q3-2025',
    title_tr: 'Konteyner Taşımacıları Q3 2025’te 5.12 Milyar Dolar Kâr Açıkladı',
    title_en: 'Container Carriers Reported 5.12 Billion Dollars Profit in Q3 2025',
    summary_tr: 'Konteyner Taşımacıları Q3 2025’te 5.12 Milyar Dolar Kâr Açıkladı',
    summary_en: 'Container Carriers Reported 5.12 Billion Dollars Profit in Q3 2025'
  },
  {
    date: '2025-12-01',
    kind: 'agreement',
    slug: 'airbus-a320-panel-sorunu',
    title_tr: 'Airbus A320 Serisinde Panel Kalite Sorunu İçin Geniş Çaplı İnceleme Başlattı',
    title_en: 'Airbus Launches Broad Investigation into A320 Series Panel Quality Issues',
    summary_tr: 'Airbus A320 Serisinde Panel Kalite Sorunu İçin Geniş Çaplı İnceleme Başlattı',
    summary_en: 'Airbus Launches Broad Investigation into A320 Series Panel Quality Issues'
  },
  {
    date: '2025-12-03',
    kind: 'sanction',
    slug: 'ingiltere-surdurulebilirlik-reklam',
    title_tr: 'İngiltere, Nike–Superdry–Lacoste’un “Sürdürülebilir” Reklamlarını Yasakladı',
    title_en: 'U.K. Bans Nike–Superdry–Lacoste\'s',
    summary_tr: 'İngiltere, Nike–Superdry–Lacoste’un “Sürdürülebilir” Reklamlarını Yasakladı',
    summary_en: 'U.K. Bans Nike–Superdry–Lacoste\'s'
  },
  {
    date: '2025-12-04',
    kind: 'attack',
    slug: 'karadeniz-gemi-saldiri-sigorta',
    title_tr: '\'Karadeniz’de Savaş Sigortası Primleri %250 Arttı: Gemi Saldırıları Bölgesel Riskleri Tır…',
    title_en: '\'Black Sea War Insurance Premiums Surge 250%: Ship Attacks Escalate Regional Risks',
    summary_tr: '\'Karadeniz’de Savaş Sigortası Primleri %250 Arttı: Gemi Saldırıları Bölgesel Riskleri Tırmandırıyor',
    summary_en: '\'Black Sea War Insurance Premiums Surge 250%: Ship Attacks Escalate Regional Risks'
  },
  {
    date: '2025-12-08',
    kind: 'agreement',
    slug: 'afghanistan-dpworld-border-ports',
    title_tr: 'Afganistan, Hairatan ve Torkham Sınır Kapılarını Modernize Etmek İçin DP World ile Çerçev…',
    title_en: 'Afghanistan Signs Framework Agreement with DP World to Modernize Hairatan and Torkham Bor…',
    summary_tr: 'Afganistan, Hairatan ve Torkham Sınır Kapılarını Modernize Etmek İçin DP World ile Çerçeve Anlaşma İmzaladı',
    summary_en: 'Afghanistan Signs Framework Agreement with DP World to Modernize Hairatan and Torkham Border Gates'
  },
  {
    date: '2025-12-09',
    kind: 'tariff',
    slug: 'ikea-uretim-tarife',
    title_tr: 'IKEA, Tarifeler Nedeniyle ABD’de Üretimi Artırmaya Yöneliyor',
    title_en: 'IKEA Ramps Up U.S. Manufacturing in Response to Tariffs',
    summary_tr: 'IKEA, Tarifeler Nedeniyle ABD’de Üretimi Artırmaya Yöneliyor',
    summary_en: 'IKEA Ramps Up U.S. Manufacturing in Response to Tariffs'
  },
  {
    date: '2025-12-10',
    kind: 'agreement',
    slug: 'nyk-ai-autonomous-carrier',
    title_tr: 'NYK, Yapay Zekâ Destekli Otonom Seyir Sistemine Sahip Yeni Nesil Araç Taşıyıcısı Sipariş …',
    title_en: 'NYK Orders Next-Generation Car Carrier with AI-Enabled Autonomous Navigation System',
    summary_tr: 'NYK, Yapay Zekâ Destekli Otonom Seyir Sistemine Sahip Yeni Nesil Araç Taşıyıcısı Sipariş Etti',
    summary_en: 'NYK Orders Next-Generation Car Carrier with AI-Enabled Autonomous Navigation System'
  },
  {
    date: '2025-12-11',
    kind: 'agreement',
    slug: 'walmart-atlanta-drone',
    title_tr: '\'Walmart, Atlanta’da Drone Teslimatlarını Başlattı: Perakendede Son Kilometre Dönüşümü Hı…',
    title_en: '\'Walmart Launches Drone Deliveries in Atlanta: Last-Mile Transformation Accelerating in R…',
    summary_tr: '\'Walmart, Atlanta’da Drone Teslimatlarını Başlattı: Perakendede Son Kilometre Dönüşümü Hızlanıyor',
    summary_en: '\'Walmart Launches Drone Deliveries in Atlanta: Last-Mile Transformation Accelerating in Retail'
  },
  {
    date: '2025-12-12',
    kind: 'agreement',
    slug: 'china-asean-ontime-shipping',
    title_tr: 'Çin, Ningbo–Ho Chi Minh Hattında İlk ASEAN “Zamanında ve Maliyet Düşürücü” Servisini Başl…',
    title_en: 'China Launches First ASEAN',
    summary_tr: 'Çin, Ningbo–Ho Chi Minh Hattında İlk ASEAN “Zamanında ve Maliyet Düşürücü” Servisini Başlattı',
    summary_en: 'China Launches First ASEAN'
  },
  {
    date: '2025-12-12',
    kind: 'accident',
    slug: 'kazakhstan-shahid-rajaee-terminal',
    title_tr: 'Kazakistan, İran Şehid Raci Limanı’nda Özel Lojistik Terminal Planını Yeniden Teyit Etti',
    title_en: 'Kazakhstan Reaffirms Plan for Special Logistics Terminal at Iran\'s Shahid Rajaee Port',
    summary_tr: 'Kazakistan, İran Şehid Raci Limanı’nda Özel Lojistik Terminal Planını Yeniden Teyit Etti',
    summary_en: 'Kazakhstan Reaffirms Plan for Special Logistics Terminal at Iran\'s Shahid Rajaee Port'
  },
  {
    date: '2025-12-12',
    kind: 'agreement',
    slug: 'macn-asya-avrupa-yolsuzlukla-mucadele',
    title_tr: 'MACN, Asya ve Avrupa’da Denizcilik Tedarik Zincirleri İçin Yeni Yolsuzlukla Mücadele Prog…',
    title_en: 'MACN Launches New Anti-Corruption Program for Maritime Supply Chains in Asia and Europe',
    summary_tr: 'MACN, Asya ve Avrupa’da Denizcilik Tedarik Zincirleri İçin Yeni Yolsuzlukla Mücadele Programını Başlattı',
    summary_en: 'MACN Launches New Anti-Corruption Program for Maritime Supply Chains in Asia and Europe'
  },
  {
    date: '2025-12-16',
    kind: 'accident',
    slug: 'kazakistan-demiryolu-kapasite',
    title_tr: 'Kazakistan, Kritik Demiryolu Sınır Kapısında Kapasiteyi %40 Artırdı',
    title_en: 'Kazakhstan Boosts Capacity by 40% at Critical Rail Border Crossing',
    summary_tr: 'Kazakistan, Kritik Demiryolu Sınır Kapısında Kapasiteyi %40 Artırdı',
    summary_en: 'Kazakhstan Boosts Capacity by 40% at Critical Rail Border Crossing'
  },
  {
    date: '2025-12-18',
    kind: 'accident',
    slug: '2025-12-18-hapag-lloyd-zemba-e-methanol-shipping-tender-2027-cargo-owners-amazon-ikea-nike',
    title_tr: 'Hapag-Lloyd ZEMBA İhalesini Kazandı: 2027\'den İtibaren E-Metanol ile Sıfır Emisyonlu Taşı…',
    title_en: 'Hapag-Lloyd Wins ZEMBA E-Methanol Shipping Tender: Zero-Emission Transport With E-Methano…',
    summary_tr: 'ZEMBA\'nın ikinci ihalesini kazanan Hapag-Lloyd; 3 yıllık dönemde 120.000 ton CO2e azaltım taahhüt ediyor; Amazon, IKEA ve Nike dahil 45+ ka…',
    summary_en: 'Hapag-Lloyd, winning ZEMBA\'s second tender, commits to 120,000 tonnes of CO2e abatement over 3 years; 45+ cargo owners including Amazon, IK…'
  },
  {
    date: '2025-12-18',
    kind: 'agreement',
    slug: 'zebra-depo-robotik-cikis',
    title_tr: 'Zebra Depo Robotik İşinden Çıkış Kararı Aldı',
    title_en: 'Zebra Exits Warehouse Robotics Business',
    summary_tr: 'Zebra Depo Robotik İşinden Çıkış Kararı Aldı',
    summary_en: 'Zebra Exits Warehouse Robotics Business'
  },
  {
    date: '2025-12-19',
    kind: 'attack',
    slug: '2025-12-19-the-supply-chain-attack-hiding-in-your-supplier-portal',
    title_tr: 'Tedarikçi Portalınızda Gizlenen Tedarik Zinciri Saldırısı',
    title_en: 'The Supply Chain Attack Hiding in Your Supplier Portal',
    summary_tr: 'Tedarikçi Portalınızda Gizlenen Tedarik Zinciri Saldırısı',
    summary_en: 'The Supply Chain Attack Hiding in Your Supplier Portal'
  },
  {
    date: '2025-12-23',
    kind: 'attack',
    slug: '2025-12-23-how-to-stop-the-domino-effect-of-supply-chain-cyber-attacks',
    title_tr: 'Tedarik Zinciri Siber Saldırılarındaki «Domino Etkisi» Nasıl Durdurulur',
    title_en: 'How to Stop the Domino Effect of Supply Chain Cyber Attacks',
    summary_tr: 'Tedarik Zinciri Siber Saldırılarındaki «Domino Etkisi» Nasıl Durdurulur',
    summary_en: 'How to Stop the Domino Effect of Supply Chain Cyber Attacks'
  },
  {
    date: '2025-12-26',
    kind: 'agreement',
    slug: '2025-12-26-fesco-chekhov-blagoveshchensk-khabarovsk-rail-service-13-days-vladivostok',
    title_tr: 'FESCO Çehov\'dan Rus Uzak Doğusu\'na Demiryolu Servisi Başlattı: Blagoveşçensk ve Habarovsk…',
    title_en: 'FESCO Launches Rail Service from Moscow Region to Russian Far East',
    summary_tr: 'Çehov Transport ve Lojistik Merkezi\'nden Blagoveşçensk ve Krasnaya Rechka (Habarovsk) istasyonlarına ayda iki sefer; Çita\'ya ve Vladivostok…',
    summary_en: 'Services from Chekhov Transport and Logistics Center to Blagoveshchensk and Krasnaya Rechka (Khabarovsk) twice a month; also groupage to Ch…'
  },
  {
    date: '2026-01-14',
    kind: 'agreement',
    slug: '2026-01-14-eurosib-xian-moscow-orekhovo-zuevo-rail-direct-container-weekly-china',
    title_tr: 'Eurosib Xian-Moskova Doğrudan Demiryolu Servisini Başlattı: Orekhovo-Zuevo Terminaline Ha…',
    title_en: 'Eurosib Launches Rail Service from Xian to Moscow Region',
    summary_tr: 'Çin\'deki Xian\'dan Moskova bölgesindeki Orekhovo-Zuevo terminaline hizmet veren yeni servis; Haziran 2025\'te Xi\'an Free Trade Port ile imzal…',
    summary_en: 'New service from Xian in China to Eurosib\'s Orekhovo-Zuevo terminal in Moscow region follows the June 2025 strategic cooperation memorandum…'
  },
  {
    date: '2026-01-16',
    kind: 'accident',
    slug: '2026-01-16-cracking-down-on-tariff-evasion-and-customs-fraud',
    title_tr: 'Tarife Kaçakçılığı ve Gümrük Sahtekarlığı ile Mücadele Hız Kazanıyor',
    title_en: 'Cracking Down on Tariff Evasion and Customs Fraud',
    summary_tr: 'Tarife Kaçakçılığı ve Gümrük Sahtekarlığı ile Mücadele Hız Kazanıyor',
    summary_en: 'Cracking Down on Tariff Evasion and Customs Fraud'
  },
  {
    date: '2026-01-29',
    kind: 'agreement',
    slug: '2026-01-29-indian-greenfield-terminal-konecranes-rmg-twin-lift-active-load-control',
    title_tr: 'Hint Konteyner Terminali, Yeni Demiryolu Operasyonu İçin İki Konecranes RMG Vinci Sipariş…',
    title_en: 'Indian Container Terminal Orders Two Konecranes RMG Cranes for New Rail Operations',
    summary_tr: '30 RTG yatırımının ardından sipariş edilen RMG\'ler 2027\'nin ikinci çeyreğinde devreye girecek; ikiz spreader ve Active Load Control sallanm…',
    summary_en: 'Following an order for 30 RTGs, the RMGs will be operational by the end of Q2 2027; twin-lift spreaders and Active Load Control will elimin…'
  },
  {
    date: '2026-02-05',
    kind: 'accident',
    slug: '2026-02-05-maersk-earnings-hit-red-sea',
    title_tr: 'Maersk, Kızıldeniz\'in Yeniden Açılmasıyla Kazançlarda Sert Düşüş Bekliyor',
    title_en: 'Maersk Expects Sharp Earnings Decline as Red Sea Reopens for Container Shipping',
    summary_tr: '2026 EBITDA Tahmini 4,5-7 Milyar Dolara Çekiliyor; Şirket On Yıldır İlk Operasyonel Zararla Karşı Karşıya Kalıyor',
    summary_en: '2026 EBITDA Guidance Lowered to $4.5-7 Billion; Company Faces First Operating Loss in a Decade'
  },
  {
    date: '2026-02-09',
    kind: 'agreement',
    slug: '2026-02-09-azerbaijan-ady-express-container-block-train-georgia-middle-corridor',
    title_tr: 'Azerbaycan Orta Koridor\'da Öne Çıktı: ADY Express Azerbaycan-Gürcistan Hattında İlk Hafta…',
    title_en: 'Azerbaijan Leading Role in Middle Corridor: ADY Express Launches Weekly Container Block T…',
    summary_tr: 'Azerbaycan Demiryolları\'nın yük kolu ADY Express; Ocak ayı sonunda Azerbaycan-Gürcistan rotasında ilk ekspres konteyner bloktren servisini …',
    summary_en: 'ADY Express, the rail freight arm of Azerbaijan Railways, launched the first express container block train on the Azerbaijan-Georgia route …'
  },
  {
    date: '2026-02-11',
    kind: 'agreement',
    slug: '2026-02-11-hpa-simon-underwater-robotics-auv-water-quality-monitoring-elbe-tidal',
    title_tr: 'Hamburg Limanı, Elbe\'de Su Kalitesi İçin 1 Milyon Avroluk SIMON Sualtı Robotik Projesini …',
    title_en: 'Hamburg Port Launches €1 Million SIMON Underwater Robotics Project for Elbe Water Quality',
    summary_tr: 'BMFTR\'in Digital GreenTech Robotics çağrısı kapsamında finanse edilen 24 aylık proje, otonom sualtı araçlarıyla askıda katı madde, oksijen,…',
    summary_en: 'Funded under BMFTR\'s Digital GreenTech Robotics call, the 24-month project will use autonomous underwater vehicles to monitor suspended sol…'
  },
  {
    date: '2026-02-13',
    kind: 'sanction',
    slug: '2026-02-13-ice-plans-to-convert-warehouses-into-detention-centers',
    title_tr: 'ICE, Depoları Gözaltı Merkezlerine Dönüştürmeyi Planlıyor',
    title_en: 'ICE Plans to Convert Warehouses into Detention Centers',
    summary_tr: 'ICE, Depoları Gözaltı Merkezlerine Dönüştürmeyi Planlıyor',
    summary_en: 'ICE Plans to Convert Warehouses into Detention Centers'
  },
  {
    date: '2026-02-23',
    kind: 'tariff',
    slug: '2026-02-23-senate-democrats-introduce-bill-to-require-tariff-refunds',
    title_tr: 'Senato Demokratları; Tarife İadelerini Zorunlu Kılan Yasa Tasarısı Sunuyor',
    title_en: 'Senate Democrats Introduce Bill to Require Tariff Refunds',
    summary_tr: 'Senato Demokratları; Tarife İadelerini Zorunlu Kılan Yasa Tasarısı Sunuyor',
    summary_en: 'Senate Democrats Introduce Bill to Require Tariff Refunds'
  },
  {
    date: '2026-03-06',
    kind: 'accident',
    slug: '2026-03-06-iceland-wins-trademark-battle-with-uk-grocery-chain',
    title_tr: 'İzlanda; İngiliz Market Zinciri ile Marka Mücadelesini Kazanıyor',
    title_en: 'Iceland Wins Trademark Battle with U.K. Grocery Chain',
    summary_tr: 'İzlanda; İngiliz Market Zinciri ile Marka Mücadelesini Kazanıyor',
    summary_en: 'Iceland Wins Trademark Battle with U.K. Grocery Chain'
  },
  {
    date: '2026-03-13',
    kind: 'accident',
    slug: '2026-03-13-dp-world-record-revenue-earnings-2025',
    title_tr: 'DP World, 2025\'te Rekor Gelir ve Kazanç Bildiriyor',
    title_en: 'DP World Reports Record Revenue and Earnings in 2025',
    summary_tr: 'Gelir %22 Artarak 24,4 Mlr Dolara, EBITDA %18 Yükselerek 6,4 Mlr Dolara, Throughput 93,4 Mn TEU\'ya Çıkıyor; Capex 3,1 Mlr Dolar',
    summary_en: 'Revenue Up 22% to $24.4 Billion, EBITDA Up 18% to $6.4 Billion, Throughput Reaches 93.4 Million TEU; Capex $3.1 Billion'
  },
  {
    date: '2026-03-17',
    kind: 'attack',
    slug: '2026-03-17-shipping-insurance-cross-hormuz-soar',
    title_tr: 'Hürmüz Geçişi İçin Taşımacılık Sigortası Maliyetleri, Gemi Saldırılarının Ardından Sıçrıy…',
    title_en: 'Shipping Insurance Costs to Cross Hormuz Soar After Ship Attacks',
    summary_tr: 'Prim Gemi Değerinin %5\'ine Çıkıyor (100 Mn $ Tankere 5 Mn $); UKMTO 1 Mart\'tan Beri 20 Olay Sayılıyor',
    summary_en: 'Premiums Climb to 5% of Ship Value ($5M on $100M Tanker); UKMTO Counts 20 Incidents Since March 1'
  },
  {
    date: '2026-03-18',
    kind: 'accident',
    slug: '2026-03-18-panama-flagged-vessels-chinese-port-detentions-ck-hutchison-retaliation',
    title_tr: 'Panama Bayraklı Gemiler Çin Limanlarında Denetim Patlaması Yaşıyor: CK Hutchison Kararına…',
    title_en: 'Panama-Flagged Vessels Face Surge in Chinese Port Inspections',
    summary_tr: '8-12 Mart arasında Çin yetkilileri tarafından 28 Panama bayraklı gemi alıkonuldu; Panama\'nın CK Hutchison\'a ait terminal imtiyazlarını ipta…',
    summary_en: 'Chinese authorities detained 28 Panama-flagged ships between 8-12 March, seen as a coordinated response to Panama\'s revocation of CK Hutchi…'
  },
  {
    date: '2026-03-19',
    kind: 'accident',
    slug: '2026-03-19-report-space-launch-boom-risks-outpacing-supply-chain-capacity',
    title_tr: 'Rapor: Uzay Fırlatma Patlaması; Tedarik Zinciri Kapasitesini Geride Bırakma Riski Taşıyor',
    title_en: 'Report: Space Launch Boom Risks Outpacing Supply Chain Capacity',
    summary_tr: 'Rapor: Uzay Fırlatma Patlaması; Tedarik Zinciri Kapasitesini Geride Bırakma Riski Taşıyor',
    summary_en: 'Report: Space Launch Boom Risks Outpacing Supply Chain Capacity'
  },
  {
    date: '2026-03-25',
    kind: 'agreement',
    slug: '2026-03-25-russian-railways-cheboksary-khabarovsk-solar-power-modules-11-days-500mw',
    title_tr: 'Rus Demiryolları Cheboksary-Khabarovsk Hattında Güneş Paneli Taşıyan Yeni Bloktren Servis…',
    title_en: 'New Rail Service from Cheboksary to Khabarovsk',
    summary_tr: 'Orta Rusya\'dan Uzak Doğu\'ya yeni düzenli rota; 11 gün transit süreyle güneş enerji santrali modüllerini taşıyor, Ağustos 2026 sonuna kadar …',
    summary_en: 'New regular route from central Russia to the Far East with 11-day transit time carries solar power modules; by end August 2026, 20 block tr…'
  },
  {
    date: '2026-04-03',
    kind: 'attack',
    slug: '2026-04-03-hasbro-cyberattack-orders-shipping-disruption-march-2026',
    title_tr: 'Hasbro Siber Saldırısında Sipariş ve Sevkiyatlarda Haftalarca Sürebilecek Gecikme Uyarısı',
    title_en: 'Hasbro Cyberattack Could Cause Weeks of Delays in Orders and Shipping',
    summary_tr: 'Play-Doh ve Transformers gibi markaların üreticisi, 8-K kapsamında iş sürekliliği planlarını devreye aldığını ve seçili sistemleri proaktif…',
    summary_en: 'The maker of Play-Doh and Transformers said it has activated business continuity plans under its 8-K filing and proactively taken select sy…'
  },
  {
    date: '2026-04-09',
    kind: 'accident',
    slug: '2026-04-09-russia-kazakhstan-export-rail-traffic-january-february-2026-20-7-percent',
    title_tr: 'Rusya-Kazakistan İhracat Demiryolu Trafiği Ocak-Şubat 2026\'da %20,7 Arttı: 5,7 Milyon Ton…',
    title_en: 'Export Rail Traffic to Kazakhstan Growing in January-February 2026',
    summary_tr: 'Rus Demiryolları; konteynerize kargonun %8,5 büyüyerek 58,1 bin TEU\'ya ulaştığını, petrol ve ürünlerinde %3,5, demir-çelikte %26,5 ve tahıl…',
    summary_en: 'Russian Railways reported containerised cargo grew 8.5% to 58.1K TEU; oil and products rose 3.5%, ferrous metals 26.5%, and grain, meal and…'
  },
  {
    date: '2026-04-10',
    kind: 'agreement',
    slug: '2026-04-10-fesco-intermodal-russia-turkey-ankara-novorossiysk-gebze-black-sea',
    title_tr: 'FESCO Türkiye ile Rusya Arasında Intermodal Servisini Başlattı: Ankara-Gebze-Novorossiysk…',
    title_en: 'Intermodal Service Between Russia and Turkey Launched',
    summary_tr: 'Ankara\'dan Gebze\'ye bloktrenlerle, oradan FESCO Turkey Black Sea servisiyle Novorossiysk\'e; Rusya\'dan Orta Anadolu\'ya ise karayoluyla tesli…',
    summary_en: 'Cargo is delivered by block trains from Ankara to Gebze and shipped by FESCO Turkey Black Sea service to Novorossiysk; export mode offers r…'
  },
  {
    date: '2026-04-16',
    kind: 'agreement',
    slug: '2026-04-16-tsmc-sees-58-boost-to-profits-in-q1-of-2026',
    title_tr: 'TSMC, 2026 İlk Çeyrekte Karlarda %58 Artış Açıkladı',
    title_en: 'TSMC Sees 58% Boost to Profits in Q1 of 2026',
    summary_tr: 'TSMC, 2026 İlk Çeyrekte Karlarda %58 Artış Açıkladı',
    summary_en: 'TSMC Sees 58% Boost to Profits in Q1 of 2026'
  },
  {
    date: '2026-04-19',
    kind: 'agreement',
    slug: '2026-04-19-imo-fal-50-global-maritime-digitalisation-strategy-cybersecurity',
    title_tr: 'IMO Küresel Denizcilik Dijitalleşme Stratejisini Onayladı',
    title_en: 'IMO Approves Global Maritime Digitalisation Strategy',
    summary_tr: 'Uluslararası Denizcilik Örgütü, denizcilik tek pencereleri için zorunlu siber güvenlik tedbirleri ile birlikte küresel dijitalleşme stratej…',
    summary_en: 'The International Maritime Organization adopted a global digitalisation strategy alongside mandatory cybersecurity measures for maritime si…'
  },
  {
    date: '2026-04-21',
    kind: 'agreement',
    slug: '2026-04-21-lome-container-terminal-konecranes-reach-stacker-order-togo',
    title_tr: 'Togo\'nun Lomé Konteyner Terminali, Konecranes\'ten İki Yeni Reach Stacker Sipariş Etti',
    title_en: 'Lomé Container Terminal Orders Two Konecranes Reach Stackers as Fleet Expands',
    summary_tr: 'Yeni SMV 4632 TC5 üniteleri, terminalin 32 elektrikli RTG ve geniş Konecranes filosunu güçlendirerek konteyner işleme kapasitesini büyütüyo…',
    summary_en: 'The new SMV 4632 TC5 units strengthen the terminal\'s 32 electric RTG fleet and expand container handling capacity.'
  },
  {
    date: '2026-04-21',
    kind: 'agreement',
    slug: '2026-04-21-port-of-long-beach-heavy-haul-route-sully-miller-contract',
    title_tr: 'Port of Long Beach, Ağır Yük Güzergâhı Altyapısı için 5,5 Milyon Dolarlık Sözleşme İmzala…',
    title_en: 'Port of Long Beach Awards $5.5 Million Heavy Haul Route Infrastructure Contract',
    summary_tr: 'Sully-Miller Contracting, Pier B On-Dock Rail projesini tamamlayan ağır yük koridoru genişletme işini üstleniyor; inşaat Mayıs 2026\'da başl…',
    summary_en: 'Sully-Miller Contracting will widen the heavy-haul corridor in a project that complements the larger Pier B On-Dock Rail Support Facility; …'
  },
  {
    date: '2026-04-22',
    kind: 'accident',
    slug: '2026-04-22-dp-world-wins-contract-montreal-port-new-terminal',
    title_tr: 'DP World Montreal Limanı Yeni Terminali İşletme Sözleşmesi Kazanıyor',
    title_en: 'DP World Wins Contract to Operate Montreal Port\'s New Terminal',
    summary_tr: 'DP World Montreal Limanı Yeni Terminali İşletme Sözleşmesi Kazanıyor',
    summary_en: 'DP World Wins Contract to Operate Montreal Port\'s New Terminal'
  },
  {
    date: '2026-04-22',
    kind: 'accident',
    slug: '2026-04-22-hd-hyundai-heavy-industries-icebreaker-sweden-348-million-overseas-first',
    title_tr: 'HD Hyundai Heavy Industries, İsveç\'ten 348,9 Milyon Dolarlık Buz Kırıcı Gemi Siparişini K…',
    title_en: 'HD Hyundai Heavy Industries Secures First Overseas Icebreaking Vessel Order From Sweden',
    summary_tr: 'Güney Koreli tersanenin yurtdışından aldığı ilk özel buz kırıcı gemi siparişi; 126 metre uzunluğunda, yaklaşık 15.000 ton deplasmanlı tekne…',
    summary_en: 'The South Korean yard\'s first overseas dedicated icebreaking vessel order; the 126-metre, approximately 15,000-tonne displacement vessel wi…'
  },
  {
    date: '2026-04-22',
    kind: 'attack',
    slug: '2026-04-22-houthis-threaten-resume-attacks-red-sea',
    title_tr: 'Husiler Kızıldeniz\'de Saldırıları Yeniden Başlatma Tehdidi Yapıyor',
    title_en: 'Houthis Threaten to Resume Attacks in Red Sea',
    summary_tr: 'Husiler Kızıldeniz\'de Saldırıları Yeniden Başlatma Tehdidi Yapıyor',
    summary_en: 'Houthis Threaten to Resume Attacks in Red Sea'
  },
  {
    date: '2026-04-22',
    kind: 'attack',
    slug: '2026-04-22-jaguar-land-rover-production-cyberattack',
    title_tr: 'Jaguar Land Rover Üretimi Siber Saldırı ile Felç Oluyor',
    title_en: 'Jaguar Land Rover Production Crippled by Cyberattack',
    summary_tr: 'Jaguar Land Rover Üretimi Siber Saldırı ile Felç Oluyor',
    summary_en: 'Jaguar Land Rover Production Crippled by Cyberattack'
  },
  {
    date: '2026-04-22',
    kind: 'accident',
    slug: '2026-04-22-modernizing-warehouse-explosive-demand-federal-ammunition',
    title_tr: 'Patlayıcı Talep Büyümesini Karşılamak için Bir Deponun Modernleştirilmesi',
    title_en: 'Modernizing a Warehouse to Meet Explosive Demand Growth',
    summary_tr: 'Patlayıcı Talep Büyümesini Karşılamak için Bir Deponun Modernleştirilmesi',
    summary_en: 'Modernizing a Warehouse to Meet Explosive Demand Growth'
  },
  {
    date: '2026-04-22',
    kind: 'agreement',
    slug: '2026-04-22-mpa-psa-singapore-autonomous-feeder-vessel-eoi',
    title_tr: 'MPA ve PSA Singapore, Otonom Konteyner Besleme Gemileri için EOI Çağrısı Başlattı',
    title_en: 'MPA and PSA Singapore Launch EOI for Autonomous Container Feeder Operations',
    summary_tr: 'Singapur Boğazı ve liman sularında otonom konteyner taşımacılığını değerlendirmeye yönelik bir uzaktan operasyon merkezi geliştirilmesi pla…',
    summary_en: 'A remote operations centre is planned as part of the assessment of autonomous container shipping in the Singapore Strait and port waters.'
  },
  {
    date: '2026-04-23',
    kind: 'attack',
    slug: '2026-04-22-strong-offense-best-defense-global-trade-war',
    title_tr: 'Küresel Bir Ticaret Savaşında Güçlü Saldırı En İyi Savunma Oluyor',
    title_en: 'Strong Offense Is Best Defense in a Global Trade War',
    summary_tr: 'Küresel Bir Ticaret Savaşında Güçlü Saldırı En İyi Savunma Oluyor',
    summary_en: 'Strong Offense Is Best Defense in a Global Trade War'
  },
  {
    date: '2026-04-23',
    kind: 'agreement',
    slug: '2026-04-23-panama-canal-transit-cost-record-high-iran-war-impact-auction-2026',
    title_tr: 'Panama Kanalı Geçiş Maliyeti Rekor Seviyede: İran Savaşı Atlantik-Pasifik Bağlantısını da…',
    title_en: 'Cost of Panama Canal Transit Hits Record High',
    summary_tr: 'ShippingWatch\'a göre İran savaşı; Atlantik ile Pasifik arasındaki hayati denizyolunu da etkiliyor; Panama Kanalı geçiş açık artırma ücretle…',
    summary_en: 'According to ShippingWatch, the Iran war is also affecting the vital shipping route between the Atlantic and the Pacific; Panama Canal tran…'
  },
];
