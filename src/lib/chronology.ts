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
];
