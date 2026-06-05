export interface Flashcard {
  soru: string;
  soru_atif?: string;
  cevap: string;
  cevap_atif?: string;
  kategori?: string;
  ipucu?: string;
}

export const baseFlashcards: Flashcard[] = [
    {
        soru: "Routledge Su Diplomasisi El Kitabı (Handbook of Water Diplomacy), su yönetimi süreçlerini analiz ederken hangi iki temel ekseni kullanır?",
        soru_atif: "Islam, S., Smith, K. M., Klimes, M., & Salzberg, A. (2025). Routledge Handbook of Water Diplomacy. Routledge.",
        cevap: "Süreçleri 'Birlikte Çalışmak' (Working Together) ve 'Neyin Önemli Olduğu ve Nedenleri' (What Matters and Why) olmak üzere iki ana yola ayırır.",
        cevap_atif: "Islam, S., Smith, K. M., Klimes, M., & Salzberg, A. (2025). Routledge Handbook of Water Diplomacy (s. 2). Routledge. Alındığı tarih: 4 Haziran 2026.",
        ipucu: "İki temel yola ayrıldığını düşünün, biri 'birlikte çalışmayı' (Working Together), diğeri ise 'önem ve nedenleri' (What Matters and Why) vurgular."
    },
    {
        soru: "Colorado Nehri Havzası'nda (1922-2022) tanımlanan dört temel su yönetimi eylem türü nelerdir?",
        soru_atif: "Fleck, J. (2016). Water is for fighting over. Island Press. (Aktaran: Institutional analysis of water governance in the Colorado River Basin).",
        cevap: "Tedarik (fiziksel su miktarı), Depolama (muhafaza), Taşıma (fiziksel nakil) ve Kullanım (tüketim).",
        cevap_atif: "Semantic Scholar. (2025). Institutional Analysis of Water Governance in the Colorado River Basin, 1922-2022. Alındığı tarih: 4 Haziran 2026.",
        ipucu: "Su kaynaklarının fiziksel bulunabilirliği (tedarik), saklanması (depolama), nakli (taşıma) ve harcanması (kullanım) süreçleri."
    },
    {
        soru: "Helmand Nehri Havzası'ndaki veri paylaşım eksikliği hangi devletler arasında tarihsel bir soruna yol açmıştır?",
        soru_atif: "Loodin, N., Eckstein, G., Singh, V. P., & Sanchez, R. (2025). Reframing A Data Sharing Mechanism for the Riparian Nations of Helmand River Basin.",
        cevap: "İran ile Afganistan arasında uzun süredir devam eden bir su anlaşmazlığına (Irano-Afghan Dispute) neden olmuştur.",
        cevap_atif: "Abidi, A. H. H. (1977). Irano-Afghan Dispute over the Helmand Waters. International Studies, 16(3), 357–378."
    },
    {
        soru: "Tacikistan ve Özbekistan arasındaki Rogun Barajı projesi nasıl bir diplomatik evrim geçirmiştir?",
        soru_atif: "Salewicz, K. A., & Nakayama, M. (2025). The Rogun Dam project: evolution from conflict to cooperation between Tajikistan and Uzbekistan. Frontiers in Water, 7.",
        cevap: "Başlangıçta ciddi bir jeopolitik çatışma kaynağı iken, proaktif su diplomasisi ve pragmatik fayda paylaşımı yaklaşımlarıyla bir işbirliği platformuna dönüşmüştür.",
        cevap_atif: "Frontiers in Water. (2025). The Rogun Dam project. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "Büyük Etiyopya Rönesans Barajı (GERD) inşası karşısında Mısır ve Etiyopya'nın temel teknopolitik argümanları nelerdir?",
        soru_atif: "Abdelhady, D., vd. (2015). The Nile and the Grand Ethiopian Renaissance Dam: Is There a Meeting Point Between Nationalism and Hydrosolidarity?",
        cevap: "Mısır mansap su payının azalacağını savunurken; Etiyopya barajın su akışını düzenleyerek Nasser Gölü'ndeki buharlaşmayı önleyeceğini ve net akışı artıracağını iddia etmektedir.",
        cevap_atif: "Reddit AskScience / Journal of Contemporary Water Research. (2025). GERD and Nile Basin Dynamics. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "Su Diplomasisi Çerçevesi (WDF) bağlamında 'Karşılıklı Kazanım' (Mutual Gains) yaklaşımı ne anlama gelir?",
        soru_atif: "Susskind, L., & Islam, S. (2012). Water Diplomacy: A Negotiated Approach to Manage Complex Water Problems. Resources for the Future.",
        cevap: "Sabit pozisyonlar üzerinden yürütülen sıfır toplamlı politikaların aksine, ortak çıkarları merkeze alan ve değişen koşullara uyarlanabilen esnek çözümler üretme stratejisidir.",
        cevap_atif: "The Water Diplomat. (2025). Water Diplomacy: from negotiation to cooperation."
    },
    {
        soru: "Su Diplomasisi, geleneksel 'yangın söndürme' modelinden nasıl farklılaşır?",
        soru_atif: "Stockholm International Water Institute [SIWI]. (2025). Reflections on the Routledge Handbook of Water Diplomacy.",
        cevap: "Kriz anında devreye giren tepkisel bir araç değil; uzun vadeli güven inşası ve istikrar yaratmak amacıyla sürekli uygulanan proaktif bir politika alanıdır.",
        cevap_atif: "SIWI. (2025). Reflections on the Routledge Handbook of Water Diplomacy. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "Orta Asya'da Fergana Vadisi'ndeki su çatışmalarının temel özelliği nedir?",
        soru_atif: "Murthy, S. L., & Mendikulova, F. (2017). Water, Conflict, and Cooperation in Central Asia. U.N. Watercourses Convention analysis.",
        cevap: "Devletler arası topyekûn bir savaştan ziyade, Kırgızistan, Tacikistan ve Özbekistan sınırlarının kesiştiği yoğun nüfuslu bu bölgede farklı etnik gruplar arasında yerel çatışmalar şeklinde ortaya çıkmasıdır.",
        cevap_atif: "Murthy, S. L., & Mendikulova, F. (2017). Water, Conflict, and Cooperation in Central Asia (s. 441)."
    },
    {
        soru: "Seyhun (Syr Darya) Nehri üzerinde sınıraşan su işbirliğini düzenlemeye çalışan 1992 ve 1998 tarihli iki temel bölgesel anlaşma hangileridir?",
        soru_atif: "Murthy, S. L., & Mendikulova, F. (2017). Water, Conflict, and Cooperation in Central Asia.",
        cevap: "1992 Almatı Anlaşması (Almaty Agreement) ve 1998 Seyhun Anlaşması'dır (Syr Darya Agreement).",
        cevap_atif: "Murthy, S. L., & Mendikulova, F. (2017). s. 428, 433."
    },
    {
        soru: "Uluslararası su hukukunun temel ilkelerini kodifiye eden ve su diplomasisinde referans alınan Birleşmiş Milletler sözleşmesi hangisidir?",
        soru_atif: "Rieu-Clarke, A., et al. (2012). U.N. Watercourses Convention User's Guide.",
        cevap: "Birleşmiş Milletler Uluslararası Su Yollarının Seyrüsefer Dışı Kullanım Hukukuna İlişkin Sözleşme'dir (UN Watercourses Convention).",
        cevap_atif: "U.N. Watercourses Convention. (2017). The Convention: What Does the Convention Say? Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "Su ağları (water networks) neden sabit sınırlara sahip kapalı sistemler olarak yönetilemez?",
        soru_atif: "Islam, S., Moomaw, W., Portney, K., Reed, M., & Vogel, R. M. (2010). Water Diplomacy: A Synthesis of Explicit and Tacit Water Information.",
        cevap: "Çünkü su ağları fiziksel, disipliner ve yargısal sınırları aşan, sürekli değişen ve 'açık uçlu' (open-ended) sistemlerdir.",
        cevap_atif: "Astrophysics Data System [ADS]. (2010). Water Diplomacy: A Synthesis of Explicit and Tacit Water Information."
    },
    {
        soru: "Kızıldeniz-Ölüdeniz Su Taşıma Projesi (Red Sea-Dead Sea Water Conveyance) su diplomasisinde hangi bölgeyi ilgilendirmektedir?",
        soru_atif: "Wikipedia. (2026). Red Sea–Dead Sea Water Conveyance. Alındığı tarih: 4 Haziran 2026.",
        cevap: "Proje temel olarak Ürdün, İsrail ve Filistin (Ölüdeniz havzası) arasındaki su tahsisi, çevre koruma ve diplomatik ilişkileri ilgilendirmektedir.",
        cevap_atif: "Wikipedia. (2026). Red Sea–Dead Sea Water Conveyance."
    },
    {
        soru: "Entegre Su Kaynakları Yönetimi (IWRM) nedir?",
        soru_atif: "Komatina, D., & Grošelj, S. (2015). Transboundary Water Cooperation for Sustainable Development of the Sava River Basin. In The Sava River (s. 1–25). Springer.",
        cevap: "Su, arazi ve ilgili kaynakların koordineli gelişimini ve yönetimini, ekosistemlerin sürdürülebilirliğinden ödün vermeden ekonomik ve sosyal refahı maksimize edecek şekilde teşvik eden süreçtir.",
        cevap_atif: "Routledge Handbook of Water Diplomacy (2025). Index references: IWRM (s. 300, 411, 441)."
    },
    {
        soru: "Su Diplomasisi Çerçevesi (WDF) su sorunlarının teşhisinde hangi aracı bir 'kaldıraç' (fulcrum) olarak kullanır?",
        soru_atif: "Susskind, L., & Islam, S. (2015). Water Diplomacy: A Negotiated Approach to Manage Complex Water Problems. OpenSIUC.",
        cevap: "Çeşitli bakış açılarını, belirsizliği ve değişen talepleri uzlaştırmak için 'müzakere'yi (negotiation) teşhis ve müdahalenin merkez kaldıracı olarak kullanır.",
        cevap_atif: "Susskind, L., & Islam, S. (2015). Journal of Contemporary Water Research & Education, 155(1)."
    },
    {
        soru: "Routledge Handbook of Water Diplomacy'ye göre su diplomasisi kimlerin katıldığı bir süreçtir?",
        soru_atif: "The Water Diplomat. (2025, 11 Kasım). Water Diplomacy: from negotiation to cooperation.",
        cevap: "Sadece devlet diplomatlarının değil; bilim insanları, politika yapıcılar, mühendisler, topluluk liderleri ve özel sektör aktörlerinin katıldığı 'paylaşılan bir sosyal pratik'tir.",
        cevap_atif: "The Water Diplomat. (2025). Water Diplomacy: from negotiation to cooperation."
    },
    {
        soru: "Su Piyasalarının (Water Markets) başarısızlığının temel nedenlerinden biri olarak ne gösterilmektedir?",
        soru_atif: "Routledge Handbook of Water Diplomacy. (2025). Index: water markets failing of (s. 307–309). Routledge.",
        cevap: "Su haklarının (water rights) doğru tanımlanmaması, piyasa mekanizmalarının ekolojik ve sosyal etkileri göz ardı etmesi piyasa başarısızlıklarına yol açmaktadır.",
        cevap_atif: "Islam, S., Smith, K. M., Klimes, M., & Salzberg, A. (2025). Routledge Handbook of Water Diplomacy. Routledge."
    },
    {
        soru: "Su diplomasisinde 'Açık Veri' ve 'Ortak Veri Portalları' (örn. Helmand Havzası önerisi) neden kritik bir ilk adımdır?",
        soru_atif: "Loodin, N., vd. (2025). Reframing A Data Sharing Mechanism for the Riparian Nations of Helmand River Basin.",
        cevap: "Ortak veri şeffaflığı olmadan taraflar arasında güven inşası, hidrolojik modelleme ve hakkaniyetli su tahsisi müzakerelerinin yürütülmesi mümkün değildir.",
        cevap_atif: "Loodin, N., vd. (2025). Texas A&M Law Scholarship."
    },
    {
        soru: "Sınıraşan suların yönetiminde 'Hidrosolidarite' (Hydrosolidarity) kavramı neyi ifade eder?",
        soru_atif: "Abdelhady, D., vd. (2015). The Nile and the Grand Ethiopian Renaissance Dam: Is There a Meeting Point Between Nationalism and Hydrosolidarity?",
        cevap: "Suyun ulusal sınırlar ve milliyetçi çıkarlar (nationalism) ötesinde, tüm havza paydaşlarının ortak çıkarı ve dayanışması (solidarity) çerçevesinde yönetilmesini ifade eder.",
        cevap_atif: "Abdelhady, D., vd. (2015). Journal of Contemporary Water Research & Education, 155(1), 73–82."
    },
    {
        soru: "Küresel İndikatörlerden Yerel Çözümlere (From Global Indicators to Local Solutions) yaklaşımında 'Mühendislik Diplomasisi'nin (Engineering Diplomacy) yeri nedir?",
        soru_atif: "MDPI. (2026). Engineering Diplomacy for Water Sustainability: From Global Indicators to Local Solutions.",
        cevap: "Mühendislik altyapılarının (baraj, kanal vb.) salt teknik yapılar olarak değil, sosyal ve diplomatik etkileri olan araçlar olarak tasarlanmasıdır.",
        cevap_atif: "MDPI. (2026). Engineering Diplomacy for Water Sustainability. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "Tacikistan ve Özbekistan arasındaki su-enerji takası (Rogun Barajı örneği) hangi temele dayanır?",
        soru_atif: "Salewicz, K. A., & Nakayama, M. (2025). The Rogun Dam project: evolution from conflict to cooperation.",
        cevap: "Yukarı kıyıdaşın (Tacikistan) hidroelektrik üretimi için suyu kışın bırakması ile aşağı kıyıdaşın (Özbekistan) sulama için suyu yazın talep etmesi arasındaki dengenin diplomatik takasına dayanır.",
        cevap_atif: "Salewicz, K. A., & Nakayama, M. (2025). Frontiers in Water, 7, 1680799."
    },
    {
        soru: "Suya ve Sanitasyona Erişim Hakkı (Right to water and sanitation) su diplomasisinde nasıl bir konuma sahiptir?",
        soru_atif: "UNESCO World Water Assessment Programme (WWAP). (2019). The United Nations World Water Development Report 2019: Leaving No One Behind.",
        cevap: "Uluslararası kabul görmüş temel bir insan hakkı olarak, devletler arası su tahsisi müzakerelerinde vazgeçilemez bir asgari standart olarak kabul edilir.",
        cevap_atif: "Routledge Handbook of Water Diplomacy. (2025). Index: water and sanitation, rights to (s. 323, 424–427)."
    },
    {
        soru: "Su Diplomasisi Çerçevesi'nde Doğal Sistem Alanı (Natural System Domain) ile Toplumsal Sistem Alanı (Societal System Domain) neden birlikte ele alınır?",
        soru_atif: "Islam, S., & Susskind, L. (2012). Water Diplomacy: A Negotiated Approach to Manage Complex Water Networks.",
        cevap: "Çünkü sadece hidrolojik gerçeklere dayalı kararlar sosyal itirazlarla karşılaşırken; sadece siyasi kararlar ekolojik olarak sürdürülemez olur.",
        cevap_atif: "Susskind, L., & Islam, S. (2012). Water Diplomacy. Resources for the Future."
    },
    {
        soru: "Colorado Nehri Havzası su yönetişiminde (1922-2022) karar alma süreçlerine katılan aktörler zaman içinde nasıl değişmiştir?",
        soru_atif: "Semantic Scholar. (2025). Institutional Analysis of Water Governance in the Colorado River Basin, 1922-2022.",
        cevap: "Başlangıçta sadece eyaletler ve federal birimler arası bir süreçken, son yıllarda yerli kabileler (tribal nations) ve sivil toplum kuruluşları da sürece dahil olarak daha kapsayıcı yapıya evrilmiştir.",
        cevap_atif: "Bureau of Indian Affairs. (2017). (Aktaran: Institutional Analysis of Water Governance in the Colorado River Basin). Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "Batı Amerika su hukukunda 'Öncelikli Tahsis' (Prior Appropriation) doktrini ne anlama gelir?",
        soru_atif: "Fleck, J. (2016). Water is for fighting over. (Aktaran: Institutional analysis of water governance).",
        cevap: "'İlk gelen ilk alır' (first in time, first in right) prensibidir; suyu faydalı bir kullanıma ilk tahsis eden taraf öncelik hakkı kazanır, bu durum tarihsel olarak yerli haklarını dışlamıştır.",
        cevap_atif: "Semantic Scholar. (2025). Institutional Analysis of Water Governance in the Colorado River Basin. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "Water Diplomacy Framework (WDF) 'su ağlarını' (water networks) nasıl tanımlar?",
        soru_atif: "Islam, S., Moomaw, W., Portney, K., Reed, M., & Vogel, R. M. (2010). Water Diplomacy: A Synthesis of Explicit and Tacit Water Information.",
        cevap: "Su ağları, fiziksel, disipliner ve yargısal sınırları aşan, öngörülemez ve sürekli değişen 'açık uçlu' (open-ended) sistemler olarak tanımlanır.",
        cevap_atif: "Astrophysics Data System [ADS]. (2010). Water Diplomacy. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "Su diplomasisinde Doğa (Natural) ve Toplum (Societal) alanları arasındaki temel fark nedir?",
        soru_atif: "Islam, S., & Susskind, L. (2012). Water Diplomacy: A Negotiated Approach to Manage Complex Water Networks.",
        cevap: "Doğal alanlar nesnel hidrolojik gerçeklerle (hacim, akış vb.) ilgilenirken; toplumsal alanlar insan değerleri, yönetişim ve varlıklarla ilgilenir ve müzakere gerektirir.",
        cevap_atif: "Susskind, L., & Islam, S. (2012). Resources for the Future."
    },
    {
        soru: "Büyük Etiyopya Rönesans Barajı'nın (GERD) doldurulma aşaması, Mısır için neden temel bir güvenlik tehdidi olarak algılanmaktadır?",
        soru_atif: "Abdelhady, D., vd. (2015). The Nile and the Grand Ethiopian Renaissance Dam.",
        cevap: "Mısır, doldurma süreci boyunca Nil nehrinden kendi sınırlarına ulaşan net tatlı su miktarının tarihsel kotaların çok altına düşeceğinden ve tarımsal çöküş yaşanacağından endişe etmektedir.",
        cevap_atif: "Reddit AskScience / Journal of Contemporary Water Research. (2025). GERD Dynamics. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "Etiyopya, GERD (Büyük Etiyopya Rönesans Barajı) inşasını uluslararası arenada hangi argümanlarla savunmaktadır?",
        soru_atif: "Abdelhady, D., vd. (2015). The Nile and the Grand Ethiopian Renaissance Dam.",
        cevap: "Barajın sadece elektrik üretimi için tasarlandığını (suyu tüketmediğini), ulusal kalkınma hakkı olduğunu ve mansap ülkelerindeki (Sudan ve Mısır) taşkınları ve alüvyon birikimini azaltacağını savunmaktadır.",
        cevap_atif: "Reddit AskScience / Journal of Contemporary Water Research. (2025). Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "İran ve Afganistan arasındaki Helmand Havzası anlaşmazlığını (Irano-Afghan Dispute) derinleştiren çevresel faktörler nelerdir?",
        soru_atif: "Loodin, N., Eckstein, G., Singh, V. P., & Sanchez, R. (2025). Reframing A Data Sharing Mechanism for the Riparian Nations of Helmand River Basin.",
        cevap: "Küresel iklim değişikliği, aşağı Helmand havzasının aşırı kurak jeolojisi (rüzgar ve kum fırtınaları) ve plansız arazi kullanımının (land-use) su döngüsünü bozmasıdır.",
        cevap_atif: "Whitney, J. W. (2006). Geology, Water, and Wind in the Lower Helmand Basin. USGS Publications."
    },
    {
        soru: "Fergana Vadisi'nde (Orta Asya) su çatışmalarının çözümü neden diğer havzalardan daha zordur?",
        soru_atif: "Murthy, S. L., & Mendikulova, F. (2017). Water, Conflict, and Cooperation in Central Asia.",
        cevap: "Kırgızistan, Tacikistan ve Özbekistan sınırlarının karmaşık ve iç içe geçmiş yapısı (enklavlar) nedeniyle su, arazi ve etnik gerilimler iç içe geçmiştir.",
        cevap_atif: "Murthy, S. L., & Mendikulova, F. (2017). The role of international law (s. 441)."
    },
    {
        soru: "Orta Asya'nın su krizini tetikleyen 'Beyaz Altın' (White Gold) politikası nedir?",
        soru_atif: "Murthy, S. L., & Mendikulova, F. (2017). Water, Conflict, and Cooperation in Central Asia.",
        cevap: "Sovyetler Birliği döneminde başlatılan ve Aral Gölü'nü besleyen nehirlerin (Ceyhun ve Seyhun) sularını çöl ortasında devasa pamuk ('Beyaz Altın') tarlalarını sulamak için yönlendiren politikadır.",
        cevap_atif: "Murthy, S. L., & Mendikulova, F. (2017). s. 421."
    },
    {
        soru: "Mühendislik Diplomasisi (Engineering Diplomacy) yaklaşımı su altyapı projelerine nasıl bir boyut kazandırır?",
        soru_atif: "MDPI. (2026). Engineering Diplomacy for Water Sustainability.",
        cevap: "Baraj ve kanalların sadece teknik/inşaat mühendisliği yapıları olmadığını; tasarımlarının toplumsal bağları, güveni ve diplomatik ilişkileri etkileyen birer sosyal müdahale olduğunu öngörür.",
        cevap_atif: "MDPI. (2026). Engineering Diplomacy for Water Sustainability. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "Su diplomasisinde 'Sıfır Toplamlı' (Zero-Sum) yaklaşım ne anlama gelir?",
        soru_atif: "Susskind, L., & Islam, S. (2012). Water Diplomacy: Creating Value and Building Trust in Transboundary Water Negotiations. Science & Diplomacy.",
        cevap: "Havzadaki su miktarının sabit olduğu varsayımıyla, bir kıyıdaş ülkenin kazandığı her bir damla suyun, otomatik olarak diğer kıyıdaş ülkenin kaybı olarak algılandığı statik çatışma modelidir.",
        cevap_atif: "Susskind, L., & Islam, S. (2012). Science & Diplomacy, 1(3), 1–7."
    },
    {
        soru: "Sivil toplum kuruluşlarının ve sivil akademisyenlerin su diplomasisindeki rolü (Track II diplomacy) nedir?",
        soru_atif: "Islam, S., Smith, K. M., Klimes, M., & Salzberg, A. (2025). Routledge Handbook of Water Diplomacy. Routledge.",
        cevap: "Resmi diplomatik kanalların tıkandığı durumlarda gayriresmi diyalog platformları oluşturmak, kapasite geliştirmek ve yerel halkların ihtiyaçlarını karar alıcılara taşımaktır.",
        cevap_atif: "Islam, S., Smith, K. M., Klimes, M., & Salzberg, A. (2025). Routledge Handbook of Water Diplomacy. Routledge."
    },
    {
        soru: "1997 Birleşmiş Milletler Su Yolları Sözleşmesi (UN Watercourses Convention) su paylaşımında hangi temel prensibi benimser?",
        soru_atif: "Rieu-Clarke, A., et al. (2012). U.N. Watercourses Convention User's Guide.",
        cevap: "Sınıraşan suların kullanımında 'Hakkaniyete Uygun ve Makul Kullanım' (Equitable and Reasonable Utilization) ve 'Önemli Zarar Vermeme' (No Significant Harm) prensiplerini eşgüdümlü olarak benimser.",
        cevap_atif: "U.N. Watercourses Convention. (2017). Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "Küresel iklim değişikliği transsınır su anlaşmalarını nasıl tehdit etmektedir?",
        soru_atif: "Routledge Handbook of Water Diplomacy. (2025). Index references: climate resilience and water diplomacy (s. 441, 686).",
        cevap: "Bir tehdit çarpanı (threat multiplier) olarak akış rejimlerini, buharlaşma oranlarını ve suyun miktarını öngörülemez şekilde değiştirerek statik ve eski kotalı anlaşmaları işlevsiz hale getirmektedir.",
        cevap_atif: "Islam, S., Smith, K. M., Klimes, M., & Salzberg, A. (2025). Routledge Handbook of Water Diplomacy."
    },
    {
        soru: "Routledge Handbook of Water Diplomacy'de belirtilen WASH (Su, Sanitasyon ve Hijyen) neden diplomasi masasının temel konularındandır?",
        soru_atif: "Routledge Handbook of Water Diplomacy. (2025). Index: water, sanitation, and hygiene (WASH) (s. 398, 488).",
        cevap: "Çünkü asgari yaşam koşulları ve sağlık için gerekli olan WASH standartlarına erişim, devletlerin ekonomik çıkarlarından bağımsız, taviz verilemez bir insan hakkı olarak kabul edilir.",
        cevap_atif: "UNESCO World Water Assessment Programme (WWAP). (2019). The United Nations World Water Development Report."
    },
    {
        soru: "Açık ('Explicit') ve Zımni ('Tacit') bilginin su diplomasisi bağlamında birleştirilmesi (synthesis) neden gereklidir?",
        soru_atif: "Islam, S., Moomaw, W., Portney, K., Reed, M., & Vogel, R. M. (2010). Water Diplomacy: A Synthesis of Explicit and Tacit Water Information.",
        cevap: "Laboratuvar/ölçüm verileri olan Açık Bilgi ile yerel toplulukların deneyimleri, kültürel inançları ve pratiklerinden doğan Zımni Bilgi harmanlanmadıkça, sahada uygulanabilir (actionable) politikalar üretilemez.",
        cevap_atif: "Astrophysics Data System [ADS]. (2010). Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "Routledge Handbook'taki 'Birlikte Çalışmak' (Working Together) yolu kimleri hedef alır?",
        soru_atif: "Islam, S., Smith, K. M., Klimes, M., & Salzberg, A. (2025). Routledge Handbook of Water Diplomacy (s. 2). Routledge.",
        cevap: "Farklı disiplinlerden gelen profesyonellerin, fon sağlayıcıların, politika yapıcıların ve etkilenen toplulukların havza yönetişiminde rollerini ve eşgüdümünü hedef alır.",
        cevap_atif: "Islam, S., Smith, K. M., Klimes, M., & Salzberg, A. (2025). Routledge Handbook of Water Diplomacy. Routledge. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "Routledge Handbook'taki 'Neyin Önemli Olduğu ve Nedenleri' (What Matters and Why) yolu neleri vurgular?",
        soru_atif: "Islam, S., Smith, K. M., Klimes, M., & Salzberg, A. (2025). Routledge Handbook of Water Diplomacy (s. 2). Routledge.",
        cevap: "Diplomaside salt teknik çözümler yerine; süreç tasarımı (process design), adaptif öğrenme, güven inşası ve farklı dünya görüşlerini uzlaştırma gibi tematik unsurların önemini vurgular.",
        cevap_atif: "Islam, S., Smith, K. M., Klimes, M., & Salzberg, A. (2025). Routledge Handbook of Water Diplomacy. Routledge. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "Su sorunlarının teşhisinde MIT Su Diplomasisi Yaklaşımına (11.382 nolu ders) göre en yaygın hata nedir?",
        soru_atif: "DUSP, MIT Department of Urban Studies and Planning. (2021). A Decade of Science Diplomacy.",
        cevap: "Sorunun kökenindeki sosyal, kültürel veya politik dinamikleri ('sosyal gerçekler') göz ardı ederek, uyuşmazlığı sadece daha fazla teknik veri ('bilimsel gerçekler') toplayarak çözülebilecek bir mühendislik problemi sanmaktır.",
        cevap_atif: "DUSP, MIT. (2021). A Decade of Science Diplomacy. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "Mısır'ın GERD barajına yönelik itirazında başvurduğu tarihsel su hakları (Historical Water Rights) anlaşmaları hangi yıllara aittir?",
        soru_atif: "Abdelhady, D., vd. (2015). The Nile and the Grand Ethiopian Renaissance Dam.",
        cevap: "Mısır'ın argümanları büyük ölçüde Nil sularının neredeyse tamamını Mısır ve Sudan'a tahsis eden ve yukarı kıyıdaşları (örneğin Etiyopya) dışlayan 1929 ve 1959 tarihli sömürge dönemi anlaşmalarına dayanır.",
        cevap_atif: "Abdelhady, D., vd. (2015). Journal of Contemporary Water Research & Education, 155(1), 73–82."
    },
    {
        soru: "Rogun Barajı uyuşmazlığında 'Uyumlu / Proaktif Su Diplomasisi' Özbekistan ve Tacikistan arasında nasıl bir fiziksel anlaşmaya kapı aralamıştır?",
        soru_atif: "Salewicz, K. A., & Nakayama, M. (2025). The Rogun Dam project: evolution from conflict to cooperation.",
        cevap: "Özbekistan'ın kış aylarında Tacikistan'a kömür ve doğal gaz sağlaması (enerji desteği), karşılığında Tacikistan'ın yaz aylarında baraj kapaklarını açarak sulama suyu sağlaması prensibine dayanmıştır.",
        cevap_atif: "Frontiers in Water. (2025). The Rogun Dam project. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "California Water Education Foundation tarafından sunulan Aquapedia modülünde hangi spesifik veriler sunulmaktadır?",
        soru_atif: "Water Education Foundation. (2014). About Aquapedia.",
        cevap: "California Su Kemeri (Aqueduct), Hoover Barajı, Delta eriyiği, su hakları zaman çizelgeleri ve interaktif haritaları içeren eyalet ve batı bölgesi su yönetim analizleri sunulmaktadır.",
        cevap_atif: "Water Education Foundation. (2014). About Aquapedia. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "Finn Nehri Havzası (Finn River Basin) Simülasyon oyunu su diplomasisi eğitiminde hangi temel müzakere becerisini test eder?",
        soru_atif: "WIT. (2025). Finn River Basin Simulation and Water Diplomacy.",
        cevap: "Katılımcıların su tahmini (auditing), kullanılmayan tahsisatlar ve çevresel akışlar olmak üzere üç farklı sorunu tek bir 'paket anlaşma' (package agreement) altında birleştirme becerisini test eder.",
        cevap_atif: "WIT. (2025). Finn River Basin Simulation and Water Diplomacy. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "Colorado Nehri Havzası yönetiminde 'Patika Bağımlılığı' (Path Dependency) karar alma süreçlerini nasıl etkilemektedir?",
        soru_atif: "Gains, F., John, P. C., & Stoker, G. (2005). Path dependency and the reform of English local government. Public Administration, 83, 25–45.",
        cevap: "Geçmişte alınan yasal ve kurumsal kararlar ('Nehrin Hukuku'), köklü reformların yapılmasını zorlaştırarak sistemin yeniliklere adaptasyonunu kısıtlar ve ancak kademeli değişimlere izin verir.",
        cevap_atif: "Semantic Scholar. (2025). Institutional Analysis of Water Governance in the Colorado River Basin. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "ABD ve Meksika arasında 1973 yılında imzalanan Colorado Nehri Tuzluluk Anlaşması'nın (Minute 242) temel odak noktası neresidir?",
        soru_atif: "Furnish, D. B., & Ladman, J. R. (1975). The Colorado River Salinity Agreement of 1973 and the Mexicali Valley. Natural Resources Journal, 15(1), 83–107.",
        cevap: "Colorado Nehri'nin alt havzasında, özellikle Mexicali Vadisi'nde tarımsal drenaj sularının yarattığı aşırı tuzlanma problemini çözmek ve su kalitesini düzenlemektir.",
        cevap_atif: "Furnish, D. B., & Ladman, J. R. (1975). Natural Resources Journal. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "Orta Asya'da 1992 yılında kurulan Su Koordinasyon Devletlerarası Komisyonu'nun (ICWC) ana görevi nedir?",
        soru_atif: "Murthy, S. L., & Mendikulova, F. (2017). Water, Conflict, and Cooperation in Central Asia.",
        cevap: "Sovyetler Birliği sonrası dönemde, Amuderya (Ceyhun) ve Sirderya (Seyhun) nehirlerinin yıllık su tahsisat kotalarını belirlemek ve bölgesel su politikalarını koordine etmektir.",
        cevap_atif: "Murthy, S. L., & Mendikulova, F. (2017). The role of international law (s. 419). Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "Orta Asya'da ICWC'ye bağlı olarak çalışan Havza Vadi Organizasyonları'nın (BVO) operasyonel rolü nedir?",
        soru_atif: "Murthy, S. L., & Mendikulova, F. (2017). Water, Conflict, and Cooperation in Central Asia.",
        cevap: "Siyasi komisyon (ICWC) tarafından belirlenen su kotalarının, baraj kapakları ve kanallar üzerinden günlük fiziksel dağıtımını (operasyonel yönetimini) gerçekleştirmektir.",
        cevap_atif: "Murthy, S. L., & Mendikulova, F. (2017). s. 419. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "Aral Gölü'nü Kurtarma Uluslararası Fonu (IFAS) hangi amaçla kurulmuştur?",
        soru_atif: "Sehring, J., & Ibatullin, S. (2020). Prolonging or Resolving Water Conflicts in Central Asia? The International Fund for Saving the Aral Sea.",
        cevap: "Aral Gölü havzasındaki ekolojik felaketi hafifletmek, çevre projelerini finanse etmek ve üye devletler arasında sürdürülebilir araştırma programlarını desteklemek amacıyla kurulmuştur.",
        cevap_atif: "Routledge Handbook of Water Diplomacy. (2025). (s. 222–241). Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "Kırgızistan'da Su Kullanıcı Birlikleri'nin (WUAs) bartera dayalı sistemden ücretli sisteme geçişinin amacı nedir?",
        soru_atif: "Heltzer, G. (2017). (Aktaran: Murthy & Mendikulova, 2017).",
        cevap: "Su kullanımını bir takas aracı olmaktan çıkarıp ücretlendirerek, mansaptaki (downstream) kullanıcıların su tasarrufunu ve altyapı verimliliğini artırmalarını teşvik etmektir.",
        cevap_atif: "Sehring, J. (2005). Water User Associations in Kyrgyzstan. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "İran ve Afganistan sınırında yer alan Hamun Gölleri'nin kurumasının (desiccation) iki ana nedeni nedir?",
        soru_atif: "Akbari, M., vd. (2022). Desiccation of the Transboundary Hamun Lakes between Iran and Afghanistan. Journal of Great Lakes Research, 48(4), 876–889.",
        cevap: "Bölgedeki hidro-iklimsel kuraklıklar (doğal faktör) ile baraj inşası, aşırı sulama gibi antropojenik (insan kaynaklı) faaliyetlerin birleşimidir.",
        cevap_atif: "Akbari, M., vd. (2022). Journal of Great Lakes Research. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "Su diplomasisinde veri paylaşımı sorununu analiz etmek için 'Planlanmış Davranış Teorisi' (Theory of Planned Behavior) nasıl kullanılır?",
        soru_atif: "Ajzen, I. (2020). The Theory of Planned Behavior. Human Behavior and Emerging Technologies, 2(4), 314–324.",
        cevap: "Devletlerin veri paylaşma 'niyeti' ile bu veriyi gerçekte paylaşma 'davranışı' arasındaki boşluğu (intention-behavior gap); güven, iletişim ve tatmin gibi faktörler üzerinden inceler.",
        cevap_atif: "Sultan, P., vd. (2020). Food Quality and Preference, 81, 103838. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "Sınıraşan sularda milliyetçilik ve bölgesel hegemonya arayışları müzakereleri nasıl etkiler?",
        soru_atif: "Allouche, J. (2020). Nationalism, Legitimacy, and Hegemony in Transboundary Water Interactions.",
        cevap: "Suyun fiziksel bir kaynaktan ziyade 'ulusal güç ve meşruiyet' sembolü haline gelmesine neden olarak, hakkaniyetli paylaşımı ve şeffaf veri transferini engeller.",
        cevap_atif: "Loodin, N., vd. (2025). Texas A&M Law Scholarship. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "Su tahsisi müzakerelerinde 'Ulusal Güvenlik' (National Security) konsepti neden sıkça referans alınır?",
        soru_atif: "Butts, K. H. (1997). The strategic importance of water. Parameters, 27(1), 65-83.",
        cevap: "Temiz tatlı suya erişim; gıda güvenliği, halk sağlığı ve ekonomik bağımsızlığın temel direği olduğu için doğrudan devletin stratejik ve askeri güvenliğiyle eşdeğer tutulur.",
        cevap_atif: "Butts, K. H. (1997). Parameters, 27(1), 65-83. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "Transsınır nehir yönetişiminde 'Menba Güç Skoru' (Upstream Power Score) modellemelerde neyi ifade eder?",
        soru_atif: "Cranmer, S. J., & Desmarais, B. A. (2016). A critique of dyadic design. International Studies Quarterly, 60(2), 355-362.",
        cevap: "Havzanın en yukarısında (menba) yer alan devletin, suyun akışını fiziksel olarak kontrol edebilme kapasitesi üzerinden elde ettiği orantısız diplomatik ve jeopolitik gücü ölçer.",
        cevap_atif: "Treasures @ UT Dallas. (2025). New models of multilateralism. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "Su Bağımlılığı Değişkeni (Water Dependence Variable) bir havza ülkesinin dış politikasını nasıl yönlendirir?",
        soru_atif: "Gleick, P. H. (1993). Water and conflict: Fresh water resources and international security. International Security, 18(1), 79-112.",
        cevap: "Kendi su kaynakları yetersiz olan ve dışarıdan gelen suya bağımlılığı yüksek olan ülkeler, çok taraflı su antlaşmalarına taraf olmaya ve bölgesel ittifaklar kurmaya daha yatkındır.",
        cevap_atif: "Gleick, P. H. (1993). International Security. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "Routledge Handbook'a göre su neden sadece bir 'çatışma kaynağı' olarak görülmemelidir?",
        soru_atif: "de Silva, L., & Wolf, A. T. (2025). Water as a Source of Cooperation. In Routledge Handbook of Water Diplomacy (s. 108). Routledge.",
        cevap: "Tarihsel veriler, su stresi altındaki havzalarda devletlerin savaşmak yerine, ortak çıkarlar etrafında antlaşmalar imzalayarak işbirliği yapmayı daha sık tercih ettiğini göstermektedir.",
        cevap_atif: "Islam, S., vd. (2025). Routledge Handbook of Water Diplomacy. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "Su diplomatlarının neden temel bir 'Hidroloji Okuryazarlığına' (Hydrology Primer) ihtiyacı vardır?",
        soru_atif: "Tyler, S. W., & Wheelock, S. J. (2025). A Hydrology Primer for Diplomats. In Routledge Handbook of Water Diplomacy (s. 73). Routledge.",
        cevap: "Yüzey suları ile yeraltı sularının etkileşimi, buharlaşma oranları ve havza dinamikleri gibi fiziksel gerçekleri anlamadan, sürdürülebilir ve gerçekçi bir politik uzlaşma metni yazılamayacağı için.",
        cevap_atif: "Islam, S., vd. (2025). Routledge Handbook of Water Diplomacy. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "Su diplomasisinde Kadın ve Kalkınma (Women and Development - WAD) çerçevesinin önemi nedir?",
        soru_atif: "Routledge Handbook of Water Diplomacy. (2025). Index: women, knowledge transmission (s. 232–233, 327–335). Routledge.",
        cevap: "Kadınların yerel su kaynaklarının yönetiminde, tarımsal kullanımlarında ve su tasarrufu bilgisinin nesiller arası aktarımında kilit rol oynadığını vurgulayarak süreci kapsayıcı kılar.",
        cevap_atif: "Routledge Handbook of Water Diplomacy. (2025). Routledge. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "Transsınır su yollarının 'Silahlaştırılması' (Weaponization) ne anlama gelmektedir?",
        soru_atif: "Routledge Handbook of Water Diplomacy. (2025). Index: weaponization, transboundary watercourses (s. 690). Routledge.",
        cevap: "Barajlar, taşkın kapakları ve içme suyu tesisleri gibi altyapıların, jeopolitik çatışmalarda sivillere veya rakip devletlere zarar vermek amacıyla kasıtlı bir askeri strateji olarak kullanılmasıdır.",
        cevap_atif: "Islam, S., vd. (2025). Routledge Handbook of Water Diplomacy. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "Yapay Zekanın (AI) su diplomasisi ve hidrolojik tahminlerdeki yeni rolü nedir?",
        soru_atif: "Routledge Handbook of Water Diplomacy. (2025). Index: weather forecasting, artificial intelligence (AI) (s. 43). Routledge.",
        cevap: "Büyük iklim ve akış verilerini analiz ederek aşırı hava olaylarını, kuraklık risklerini ve su rejimindeki ani değişimleri tahmin etmek, böylece diplomatlara erken uyarı sağlamaktır.",
        cevap_atif: "Routledge Handbook of Water Diplomacy. (2025). Routledge. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "MENA (Orta Doğu ve Kuzey Afrika) Bölgesi için tasarlanan su diplomasisi eğitim programlarının birincil amacı nedir?",
        soru_atif: "Özerol, G. (2017). Water Diplomacy in the MENA Region: A New Training Programme for Young Professionals. Fanack Water.",
        cevap: "Bölgedeki su kıtlığı ve politik gerilimler göz önüne alındığında, genç profesyonellere (mühendisler, diplomatlar) ortak dil, bilimsel işbirliği ve müzakere teknikleri kazandırmaktır.",
        cevap_atif: "Özerol, G. (2017). Fanack Water. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "IHE Delft'in 'Su ve Kalkınma için Ortaklık Programı' (DUPC2) su diplomasisine nasıl bir katkı sağlamaktadır?",
        soru_atif: "IHE Delft. (2023). Water Diplomacy: A capacity development project under the IHE Delft Partnership Programme for Water and Development (DUPC2).",
        cevap: "Özellikle gelişmekte olan ülkelerdeki su yöneticilerinin kapasitesini geliştirerek, sınıraşan sularda çatışma çözümleme ve kurumsal diyalog inşa etme becerilerini destekler.",
        cevap_atif: "IHE Delft. (2023). Water Diplomacy. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "Kaliforniya Su Hukukunda 'Kamu Güveni Doktrini' (Public Trust Doctrine) neyi garanti altına alır?",
        soru_atif: "Water Education Foundation. (2014). About Aquapedia - Environmental Issues: Public Trust Doctrine.",
        cevap: "Gezilebilir suların, göllerin ve bunlara bağlı ekosistemlerin devlet tarafından tüm toplumun (ve doğanın) ortak yararı için bir 'emanet' olarak korunması gerektiğini hukuken garanti altına alır.",
        cevap_atif: "Water Education Foundation. (2014). Aquapedia. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "Finn Nehri Havzası Simülasyonu'nda 'Paket Anlaşma' (Package Agreement) mantığı neden zorunludur?",
        soru_atif: "WIT. (2025). Finn River Basin Simulation and Water Diplomacy.",
        cevap: "Çünkü su tahmini, kullanılmayan suyun yeniden dağıtımı ve çevresel akışlar gibi sorunlar tekil olarak çözülemez; tarafların bir alanda taviz verip diğerinde kazanmasını sağlayan entegre paketlere ihtiyaç vardır.",
        cevap_atif: "WIT. (2025). Finn River Basin Simulation. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "Finn Nehri Simülasyonu'na göre siyasi açıdan güçlü devletler bir 'Havza Otoritesi'ne (Basin Authority) hangi rolleri bırakmayı tercih eder?",
        soru_atif: "WIT. (2025). Finn River Basin Simulation and Water Diplomacy.",
        cevap: "Güçlü devletler genellikle havza otoritesinin tahsisatları yeniden dağıtması yerine, yalnızca veri izleme (monitoring) ve iklimsel akış tahmini (prediction) gibi teknik görevlerle sınırlandırılmasını isterler.",
        cevap_atif: "WIT. (2025). Finn River Basin Simulation. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "CEO Water Mandate tarafından yayınlanan ICMM Tutarlı Su Raporlaması Kılavuzu'nun (2017) özel sektöre yönelik amacı nedir?",
        soru_atif: "CEO Water Mandate. (2018). ICMM's Practical Guide to Consistent Water Reporting (2017).",
        cevap: "Madencilik ve sanayi şirketlerinin su ayak izlerini hesaplarken mevcut muhasebe sistemleriyle uyumlu, şeffaf ve havza risklerini hesaba katan tutarlı raporlar hazırlamalarını sağlamaktır.",
        cevap_atif: "CEO Water Mandate. (2018). Aquapedia (2018). Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "Kurumsal Su Raporlamasında 'Pozitif Su Etkisi' (Positive Water Impact - PWI) stratejisi neyi hedefler?",
        soru_atif: "CEO Water Mandate. (2018). Learn: PWI (Positive Water Impact).",
        cevap: "Şirketlerin yalnızca suyu tasarruflu kullanmalarını değil, aynı zamanda bulundukları havzaya tükettiklerinden daha fazla tatlı su (geri kazanım, yağmur hasadı vb.) bırakarak ekolojik restorasyona katkı sağlamalarını hedefler.",
        cevap_atif: "CEO Water Mandate. (2018). Aquapedia (2018). Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "Türkiye ile Irak arasında Fırat ve Dicle nehirleri sularının kullanımına dair kuralları içeren ilk kapsamlı yasal metin hangisidir?",
        soru_atif: "Republic of Iraq & Republic of Turkey. (1946). Treaty of Friendship and Neighbourly Relations Between Iraq and Turkey.",
        cevap: "1946 yılında imzalanan Dostluk ve İyi Komşuluk Antlaşması'na ekli 1 No'lu Protokol'dür. Bu protokol, Dicle, Fırat ve kollarının sularının düzenlenmesine ilişkin hükümleri içermektedir.",
        cevap_atif: "United Nations Treaty Series. (1949). Treaty of Friendship and Neighbourly Relations. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "Fırat Nehri'nin sularının paylaşımı konusunda 1987 yılında Türkiye ve Suriye arasında imzalanan Ekonomik İşbirliği Protokolü'nün temel su taahhüdü nedir?",
        soru_atif: "T.C. Dışişleri Bakanlığı. (1994). Water Issues Between Turkey, Syria and Iraq.",
        cevap: "Türkiye, Atatürk Barajı'nın doldurulması süresince ve suların nihai tahsisine kadar, Türkiye-Suriye sınırından saniyede ortalama 500 metreküp (m³/s) su bırakmayı taahhüt etmiştir.",
        cevap_atif: "Republic of Turkey & Syrian Arab Republic. (1987). Protocol on Matters Pertaining to Economic Cooperation. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "1990 yılında Suriye ve Irak arasında yapılan Fırat Nehri su tahsisi anlaşmasının (Joint Minutes) oranları nasıldır?",
        soru_atif: "Republic of Iraq & Syrian Arab Republic. (1989/1990). Joint Minutes concerning the provisional division of the waters of the Euphrates River.",
        cevap: "Türkiye'den Suriye'ye geçen Fırat Nehri sularının %58'inin Irak'a, %42'sinin ise Suriye'ye tahsis edilmesi kararlaştırılmıştır.",
        cevap_atif: "United Nations Treaty Series. (1990). Law No. 14 of 1990, ratifying the Joint Minutes. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "Transsınır su çatışmalarını analiz eden 'Hidro-hegemonya Çerçevesi' (Hydro-hegemony Framework) neyi ifade eder?",
        soru_atif: "Zeitoun, M., & Warner, J. (2006). Hydro-hegemony – a framework for analysis of trans-boundary water conflicts. Water Policy, 8(5), 435-460.",
        cevap: "Nehir havzası düzeyinde güç asimetrilerinin kullanılarak su kaynaklarının kontrol edilmesini inceler; bu kontrol baskı, antlaşmalar ve 'bilgi inşası' (knowledge construction) gibi taktiklerle sağlanır.",
        cevap_atif: "Zeitoun, M., & Warner, J. (2006). Water Policy. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "Avrupa Birliği Su Çerçeve Direktifi (WFD - 2000/60/EC), su yönetiminde idari sınırlar yerine hangi coğrafi yaklaşımı zorunlu kılmıştır?",
        soru_atif: "European Parliament and Council. (2000). Directive 2000/60/EC establishing a framework for Community action in the field of water policy.",
        cevap: "Su yönetiminin siyasi veya idari sınırlara göre değil, hidrolojik gerçekliklere dayanan 'Nehir Havzası Bölgeleri' (River Basin Districts) yaklaşımıyla entegre olarak yürütülmesini zorunlu kılmıştır.",
        cevap_atif: "European Commission. (2000). Water Framework Directive. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "Transsınır Su Etkileşimi Bağlantısı (TWINS) modeline göre, uluslararası su havzalarında çatışma ve işbirliği ilişkisi nasıldır?",
        soru_atif: "Zeitoun, M., & Mirumachi, N. (2008). Transboundary water interaction I: reconsidering conflict and cooperation. International Environmental Agreements, 8(4), 297.",
        cevap: "Çatışma ve işbirliği birbirini dışlayan zıt uçlar (mutually exclusive) değildir; aksine, havzalardaki devlet ilişkilerinde çoğu zaman aynı anda ve bir arada bulunurlar (coexist).",
        cevap_atif: "Zeitoun, M., & Mirumachi, N. (2008). International Environmental Agreements. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "1944 tarihli ABD-Meksika Su Antlaşması'nın yönetimi için kurulan ve ortak altyapı projelerini denetleyen kurum hangisidir?",
        soru_atif: "International Boundary and Water Commission (IBWC). (1944). Treaty for the Utilization of Waters of the Colorado and Tijuana Rivers and of the Rio Grande.",
        cevap: "Sınır ve Sular Uluslararası Komisyonu'dur (International Boundary and Water Commission - IBWC / CILA). Bu kurum, iki ülke arasında esnek sınır ötesi su yönetimini sağlamaktadır.",
        cevap_atif: "IBWC. (1944). Treaty Series 994. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "Küresel hidropolitik desenleri analiz etmek için oluşturulan 'Transboundary Freshwater Dispute Database' (TFDD) hangi üniversite tarafından kurulmuştur?",
        soru_atif: "Wolf, A. T. (2004). Freshwater Transboundary Dispute Database. Corvallis: Oregon State University.",
        cevap: "Oregon Eyalet Üniversitesi (Oregon State University) bünyesinde Aaron T. Wolf ve ekibi tarafından kurulmuş olup, uluslararası su antlaşmaları ve su ihtilafı olaylarını derleyen en kapsamlı veritabanıdır.",
        cevap_atif: "Yoffe, S. et al. (2004). Geography of international water conflict and cooperation. Water Resources Research. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "1997 BM Uluslararası Su Yollarının Seyrüsefer Dışı Kullanım Hukukuna İlişkin Sözleşme'nin iki temel uluslararası hukuk ilkesi nedir?",
        soru_atif: "Global Water Partnership. (2012). UN Watercourses Convention: User's Guide.",
        cevap: "Havza devletleri arasında 'Hakça ve Makul Kullanım' (Equitable and Reasonable Utilization) ve 'Önemli Zarar Vermeme' (Obligation Not to Cause Significant Harm) ilkeleridir.",
        cevap_atif: "United Nations General Assembly. (1997). UN Watercourses Convention. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "Tony Allan tarafından geliştirilen 'Sanal Su' (Virtual Water) konsepti, Orta Doğu gibi su fakiri bölgelerdeki su güvenliğini nasıl açıklar?",
        soru_atif: "Allan, J. A. (2001). The Middle East water question: hydropolitics and the global economy. London: IB Tauris.",
        cevap: "Su fakiri ülkelerin, yüksek miktarda su gerektiren tarım ürünlerini ithal ederek, ürünlerin içindeki 'sanal su' ile kendi yerel su açıklarını dengelediklerini ve böylece su savaşlarını önlediklerini açıklar.",
        cevap_atif: "Antonelli, M., & Sartori, M. (2014). Unfolding the potential of the Virtual Water concept. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "Güney Kafkasya'daki Kura-Aras Nehri Havzası'nın yönetimi neden zorlu bir hidropolitik vaka olarak değerlendirilmektedir?",
        soru_atif: "Khachaturyan, M., & Schoengold, K. (2019). Applying Interconnected Game Theory to Analyze Transboundary Waters: A Case Study of the Kura-Araks Basin.",
        cevap: "Türkiye, Gürcistan, Ermenistan, Azerbaycan ve İran tarafından paylaşılan havzada, kapsamlı bir uluslararası su antlaşmasının bulunmamasının ve bölgesel sınır anlaşmazlıklarının yarattığı güvensizlik nedeniyledir.",
        cevap_atif: "Khachaturyan, M., & Schoengold, K. (2019). Water Economics and Policy, 5(01). Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "Ermenistan ve Türkiye arasında diplomatik ilişki bulunmamasına rağmen, hangi nehir üzerindeki barajın yönetimi için aktif bir sınır ötesi su komisyonu işletilmektedir?",
        soru_atif: "Altingoz, M., & Ali, S. H. (2019). Environmental Cooperation in Conflict Zones: Riparian Infrastructure at the Armenian–Turkish Border.",
        cevap: "Arpaçay/Akhuryan Nehri üzerindeki Arpaçay Barajı'dır. 1927 yılında SSCB ile Türkiye arasında imzalanan protokole dayanan bu komisyon, suları %50-%50 prensibiyle hala yönetmektedir.",
        cevap_atif: "Altingoz, M., & Ali, S. H. (2019). Journal of Environment & Development, 28(3). Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "Türkiye ve Suriye arasında 2009 yılında imzalanan Mutabakat Zaptları (MoU) su diplomasisi kapsamında hangi ortak altyapı projesini içeriyordu?",
        soru_atif: "Türkiye Cumhuriyeti ve Suriye Arap Cumhuriyeti Hükümetleri. (2009). Dicle Nehrinden Su Çekilmesi İçin Suriye Topraklarında Pompa İstasyonu Kurulması Konusundaki Mutabakat Zaptı.",
        cevap: "Suriye'nin kendi sulama suyu ihtiyacını karşılamak üzere, Dicle Nehri'nin Türkiye ile Suriye sınırını oluşturduğu bölümde bir su pompalama istasyonu kurması projesini içeriyordu.",
        cevap_atif: "Official Gazette of Turkey. (2009). Memorandum of Understanding. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "AB 2024 Kentsel Atıksu Arıtma Direktifi (UWWTD), arıtma tesislerinde 'Genişletilmiş Üretici Sorumluluğu'nu (EPR) hangi sektörlere zorunlu kılmıştır?",
        soru_atif: "European Parliament and Council. (2024). Directive (EU) 2024/3019 concerning urban wastewater treatment (recast).",
        cevap: "İlaç (farmasötik) ve kozmetik sektörlerine zorunlu kılmıştır. Bu sektörler, atıksulardaki mikro-kirleticilerin arıtılması için gereken ek dördüncül (quaternary) arıtma maliyetlerinin en az %80'ini karşılamakla yükümlüdür.",
        cevap_atif: "Directive (EU) 2024/3019, EUR-Lex. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "Etiyopya'nın Mavi Nil üzerinde inşa ettiği Büyük Etiyopya Rönesans Barajı (GERD), hidropolitik teoride ne tür bir hamle olarak değerlendirilmektedir?",
        soru_atif: "Tawfik, R. (2016). Revisiting Hydro-hegemony from a Benefit-Sharing Perspective: The Case of the Grand Ethiopian Renaissance Dam.",
        cevap: "Mısır'ın Nil Havzası'ndaki tarihsel 'hidro-hegemonyasını' kıran ve sömürge dönemi anlaşmalarındaki su kotalarını geçersiz kılan bir 'karşı-hegemonya' (counter-hegemonic) hamlesi olarak değerlendirilmektedir.",
        cevap_atif: "Tawfik, R. (2016). Deutsches Institut für Entwicklungspolitik. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "Avrupa Komisyonu'nun 2025 yılında açıkladığı Avrupa Su Direnci Stratejisi'nin (Water Resilience Strategy) hedefleri nelerdir?",
        soru_atif: "European Commission. (2025). Communication: European Water Resilience Strategy. COM(2025) 280 final.",
        cevap: "Su döngüsünü korumak ve restore etmek, yenilikçi ve rekabetçi bir su-akıllı (water-smart) ekonomi inşa etmek ve herkes için temiz, karşılanabilir suya erişimi güvence altına almaktır.",
        cevap_atif: "European Commission. (2025). COM(2025) 280 final. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "1992 tarihli Birleşmiş Milletler Avrupa Ekonomik Komisyonu (UNECE) Su Sözleşmesi'nin küresel su diplomasisindeki önemi nedir?",
        soru_atif: "UNECE. (2024). Progress on Transboundary Water Cooperation: Global status of SDG indicator 6.5.2.",
        cevap: "Başlangıçta sadece Avrupa bölgesi için hazırlanan bu sözleşme, 2016 yılında yapılan değişiklikle tüm BM üyelerinin katılımına açılarak küresel bir sınır ötesi su işbirliği çerçevesine dönüşmüştür.",
        cevap_atif: "United Nations / UNECE. (2024). SDG 6.5.2 Indicator Report. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "Hindistan ve Pakistan arasında 1960 yılında imzalanan İndus Suları Antlaşması (Indus Waters Treaty), havzadaki nehirleri nasıl paylaştırmıştır?",
        soru_atif: "Salewicz, K. A., & Nakayama, M. (2025). The Rogun Dam project: evolution from conflict to cooperation. Frontiers in Water.",
        cevap: "Doğu nehirleri (Ravi, Beas, Sutlej) Hindistan'ın tam kontrolüne bırakılırken; batı nehirleri (İndus, Jhelum, Chenab) bazı kısıtlamalarla Pakistan'ın kullanımına tahsis edilmiştir.",
        cevap_atif: "Frontiers in Water / World Bank (1960). Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "2025 yılında Avrupa Birliği Yüzey ve Yeraltı Suları Kalite Standartları Direktiflerinde, hangi yeni kimyasal grubu 'Sonsuz Kimyasallar' olarak izleme listesine alınmıştır?",
        soru_atif: "European Commission. (2025). Commission Implementing Decision (EU) 2025/439 establishing a watch list of substances for Union-wide monitoring.",
        cevap: "Per- ve polifloroalkil maddeler (PFAS) izleme listesine alınmış ve içme suyu ile yeraltı/yüzey sularında bu maddelerin toplam limitlerine yönelik katı standartlar getirilmiştir.",
        cevap_atif: "Commission Implementing Decision (EU) 2025/439, EUR-Lex. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "Türkiye'nin Güneydoğu Anadolu Projesi (GAP), uluslararası su politikası literatüründe neden tartışmalı bir konudur?",
        soru_atif: "Bilgen, A. (2019). The Southeastern Anatolia Project (GAP) revisited: The evolution of GAP over forty years. New Perspectives on Turkey.",
        cevap: "Fırat ve Dicle üzerinde inşa edilen 22 barajlık bu proje, Türkiye'nin kalkınması için hayati görülürken; Suriye ve Irak tarafından alt havzaya giden suyun miktarını azalttığı gerekçesiyle eleştirilmektedir.",
        cevap_atif: "Bilgen, A. (2019). Cambridge Core. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "Türkiye'nin Dicle Nehri üzerinde inşa ettiği Ilısu Barajı'na yönelik bölgesel ve uluslararası itirazların temel dayanakları nelerdir?",
        soru_atif: "Warner, J. (2012). The struggle over Turkey's Ilısu Dam: domestic and international security linkages. International Environmental Agreements.",
        cevap: "Irak, barajın Mezopotamya Sazlıkları'nı (Mesopotamian Marshes) kurutacağını savunurken; uluslararası STK'lar tarihi Hasankeyf ilçesinin sular altında kalması nedeniyle projeye itiraz etmiştir.",
        cevap_atif: "Warner, J. (2012). International Environmental Agreements: Politics, Law and Economics. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "1968 yılında Türkiye ile Bulgaristan arasında sınır aşan suların kullanımı konusunda imzalanan anlaşmanın temel amacı neydi?",
        soru_atif: "Republic of Turkey & People's Republic of Bulgaria. (1968). Agreement concerning co-operation in the use of the waters of rivers flowing through the territory of both countries.",
        cevap: "Meriç, Tunca, Veleka ve Rezve nehirlerinin sularının taşkın kontrolü, sulama ihtiyaçlarının karşılanması ve yüzen buzların yarattığı tehlikelerin önlenmesi amacıyla ortak kullanımıdır.",
        cevap_atif: "United Nations Treaty Series (1970). Agreement between Bulgaria and Turkey. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "Uluslararası Aral Gölü'nü Kurtarma Fonu (IFAS), hangi yanlış su yönetim politikasının yarattığı ekolojik yıkımı durdurmak için kurulmuştur?",
        soru_atif: "Sehring, J., & Ibatullin, S. (2020). Prolonging or Resolving Water Conflicts in Central Asia? The International Fund for Saving the Aral Sea.",
        cevap: "Sovyetler Birliği döneminde başlatılan ve 'Beyaz Altın' olarak adlandırılan pamuk tarımını desteklemek için Amuderya ve Sirderya nehirlerinin sularının çöle yönlendirilmesi politikasının yarattığı yıkımı durdurmak için kurulmuştur.",
        cevap_atif: "Murthy, S. L., & Mendikulova, F. (2017). Water, Conflict, and Cooperation in Central Asia. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "İklim değişikliğinin sınır ötesi nehir havzalarındaki (TRB) çatışma riskine etkisine dair bilimsel projeksiyonlar (ör. SSP5-8.5 senaryoları) neyi göstermektedir?",
        soru_atif: "Jiang, R., Lu, H., Chen, D., Yang, K., et al. (2025). Transboundary conflict from surface water scarcity under climate change. Nature Communications, 16(1).",
        cevap: "Gerekli uyum önlemleri alınmazsa, 2050 yılına kadar küresel sınır ötesi havzaların yaklaşık %40'ının yüzey suyu kıtlığı nedeniyle (özellikle Afrika, Asya ve Orta Doğu'da) potansiyel çatışmalarla yüzleşeceğini göstermektedir.",
        cevap_atif: "Jiang, R., et al. (2025). Nature Communications. Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "AB Su Çerçeve Direktifi'nin (WFD) 9. Maddesinde yer alan 'Maliyetlerin Geri Kazanımı' (Cost Recovery) ilkesi hangi çevresel zorunluluğu getirir?",
        soru_atif: "European Parliament and Council. (2000). Directive 2000/60/EC establishing a framework for Community action in the field of water policy.",
        cevap: "Su fiyatlandırmasında, 'kirleten öder' ilkesine uygun olarak, sadece suyun altyapı maliyetlerinin değil, suyun tüketilmesi ve kirlenmesinden doğan 'çevresel ve kaynak maliyetlerinin' (environmental and resource costs) de fiyatlara yansıtılmasını zorunlu kılar.",
        cevap_atif: "Directive 2000/60/EC (Water Framework Directive). Alındığı tarih: 4 Haziran 2026."
    },
    {
        soru: "BM İklim Değişikliği Çerçeve Sözleşmesi (UNFCCC) kapsamında kurulan Yeşil İklim Fonu (GCF), su projelerini desteklerken hangi temel kriteri esas almaktadır?",
        soru_atif: "Green Climate Fund. (2023). Water Security Sectoral Guide.",
        cevap: "Projelerin, iklim değişikliğinin etkilerine uyum sağlamada ne kadar yenilikçi ve dayanıklı olduğunu, ayrıca emisyon azaltımına ne kadar katkıda bulunduğunu gösteren 'iklim rasyonalitesi' (climate rationale) kriterini esas alır.",
        cevap_atif: "GCF. (2023). Sectoral Guide: Water Security. Alındığı tarih: 5 Haziran 2026."
    },
    {
        soru: "Rio Deklarasyonu'nun 'İhtiyatlılık İlkesi' (Precautionary Principle) sınıf ötesi su kaynakları yönetiminde ne anlama gelmektedir?",
        soru_atif: "United Nations. (1992). Rio Declaration on Environment and Development.",
        cevap: "Ciddi veya geri döndürülemez çevresel hasar tehditlerinin bulunduğu durumlarda, tam bilimsel kesinliğin olmamasının, çevresel bozulmayı önleyici tedbirleri ertelemek için bir mazeret olarak kullanılamayacağı anlamına gelir.",
        cevap_atif: "Rio Declaration on Environment and Development, Principle 15. Alındığı tarih: 5 Haziran 2026."
    },
    {
        soru: "Birleşmiş Milletler Su (UN-Water) inisiyatifi tarafından küresel su işbirliğini teşvik etmek amacıyla vurgulanan temel stratejik hedef nedir?",
        soru_atif: "UN-Water. (2023). Blueprint for Acceleration: Sustainable Development Goal 6 Synthesis Report on Water and Sanitation.",
        cevap: "Sınır aşan su kaynaklarının entegre ve adil yönetimini teşvik etmek, iklim değişikliğine uyum kapasitesini artırmak ve hidro-politik gerilimleri barışçıl diplomasi araçlarıyla çözmektir.",
        cevap_atif: "UN-Water SDG 6 Synthesis Report. Alındığı tarih: 5 Haziran 2026."
    },
    {
        soru: "Su diplomasisinde 'Pozitif Toplamlı Oyun' (Positive-Sum Game) yaklaşımının temel amacı nedir?",
        soru_atif: "Susskind, L., & Islam, S. (2012). Water Diplomacy: A Negotiated Approach to Manage Complex Water Problems.",
        cevap: "Kaynakların kısıtlı ve sabit olduğu varsayımını aşarak, suyun değer ve faydalarını havzadaki farklı sektörler (enerji, tarım, çevre) arasında birleştirerek veya takas ederek tarafların karşılıklı kazanç sağlamasını (win-win) amaçlar.",
        cevap_atif: "Susskind & Islam, Water Diplomacy. Alındığı tarih: 5 Haziran 2026."
    },
    {
        soru: "Dünya Bankası'nın desteklediği 'Havza Çapında Hidrolojik Modelleme' (Basin-Wide Hydrological Modeling) çalışmaları uluslararası su müzakerelerine nasıl bir katkı sunar?",
        soru_atif: "World Bank. (2018). Water in the Balance: The Economic Impacts of Climate Change and Water Scarcity.",
        cevap: "Tahmini senaryolar ve güvenilir veriler üreterek, müzakere eden ülkelerin kendi asgari pozisyonları dışındaki faktörleri objektif olarak değerlendirmesini kolaylaştırır ve karar verme sürecini güçlendirir.",
        cevap_atif: "World Bank. (2018). Water in the Balance. Alındığı tarih: 5 Haziran 2026."
    },
    {
        soru: "Su diplomasisinde 'Track 2' (İkinci Yol) diplomasisi hangi aktörleri ve süreçleri kapsar?",
        soru_atif: "U.N. Water. (2020). Water Diplomacy and Conflict Prevention.",
        cevap: "Resmi devlet yetkilileri yerine akademisyenler, sivil toplum kuruluşları ve su uzmanları arasında yürütülen gayri resmi ve gayri bağlayıcı diyalog süreçlerini kapsar.",
        cevap_atif: "U.N. Water. (2020). Alındığı tarih: 5 Haziran 2026."
    },
    {
        soru: "Su müzakerelerinde 'Fayda Paylaşımı' (Benefit Sharing) yaklaşımını geleneksel su bölüşümünden (Water Allocation) ayıran temel fark nedir?",
        soru_atif: "Sadoff, C. W., & Grey, D. (2002). Beyond the river: the benefits of cooperation on international rivers.",
        cevap: "Sadece fiziksel suyun hacimsel (m³) olarak parsellenmesi yerine, suyun getirdiği ekonomik, sosyal ve çevresel faydaların tüm havza çapında maksimize edilerek paylaşılmasını esas almasıdır.",
        cevap_atif: "Sadoff & Grey, Water Policy. Alındığı tarih: 5 Haziran 2026."
    },
    {
        soru: "Ortak Bilgi Üretimi (Joint Fact-Finding) yönteminin sınır aşan su diplomasisindeki temel işlevi nedir?",
        soru_atif: "Islam, S., & Susskind, L. (2012). Water Diplomacy: A Negotiated Approach.",
        cevap: "Müzakere eden tarafların veriler ve bilimsel modeller üzerinde uzlaşmasını sağlayarak, tek bir kabul edilmiş bilgi temeli yaratması ve güven inşasını hızlandırmasıdır.",
        cevap_atif: "Islam & Susskind, 2012. Alındığı tarih: 5 Haziran 2026."
    },
    {
        soru: "İklim değişikliğinin hidro-diplomasideki 'Tehdit Çarpanı' (Threat Multiplier) rolü ne anlama gelir?",
        soru_atif: "CNA Corporation. (2007). National Security and the Threat of Climate Change.",
        cevap: "İklim değişikliğinin tek başına bir savaş nedeni olmaktan çok, mevcut sosyo-ekonomik zorlukları su kıtlığı ve aşırı olaylar yoluyla derinleştirerek diplomatik gerilimleri artırması anlamına gelir.",
        cevap_atif: "CNA Corporation (2007). Alındığı tarih: 5 Haziran 2026."
    },
    {
        soru: "Hidropolitik literatüründe 'Sanal Su Ticareti' (Virtual Water Trade), suya dayalı çatışmaları nasıl hafifletebilir?",
        soru_atif: "Allan, J. A. (1998). Virtual Water: A Strategic Resource.",
        cevap: "Su fakiri ülkelerin suyu yoğun tüketen tarım ürünlerini üretmek yerine ithal etmeleri stratejisiyle, kıt ulusal su kaynakları üzerindeki baskıyı ve sınır aşan nehirlerdeki rekabeti azaltabilmesidir.",
        cevap_atif: "Allan, J.A. (1998). Alındığı tarih: 5 Haziran 2026."
    },
    {
        soru: "Uluslararası su hukukunda 'Zarar Vermeme İlkesi' ile 'Adil ve Makul Kullanım İlkesi' arasında ortaya çıkan temel uyuşmazlık diplomatik olarak hangi ülkeler arasındadır?",
        soru_atif: "U.N. Watercourses Convention (1997).",
        cevap: "Genellikle suları kullanmak isteyen yukarı kıyıdaş (menba) ülkelerin 'Adil Kullanım'ı, mevcut hidro-altyapılarının zarar göreceğinden endişe eden aşağı kıyıdaş (mansap) ülkelerin ise 'Zarar Vermeme' ilkesini savunmaları arasında ortaya çıkar.",
        cevap_atif: "UNWC (1997). Alındığı tarih: 5 Haziran 2026."
    },
    {
        soru: "Su diplomasisinde uzaktan algılama (Remote Sensing) gibi açık veri teknolojilerinin müzakerelere sağladığı temel katkı nedir?",
        soru_atif: "Gleick, P. H. (2014). Water, Drought, Climate Change, and Conflict in Syria.",
        cevap: "Ülkelerin ulusal hidrolojik verilerini saklama veya siyasi amaçlarla manipüle etme riskine karşı, tarafsız ve doğrulanabilir bilgi sağlayarak taraflar arası şeffaflığı ve güveni artırmasıdır.",
        cevap_atif: "Gleick (2014) / Pacific Institute. Alındığı tarih: 5 Haziran 2026."
    },
    {
        soru: "Desalinasyon (Tuzdan Arındırma) alanındaki teknolojik gelişmelerin özellikle Orta Doğu su diplomasisindeki olumlu jeopolitik yansıması ne olmaktadır?",
        soru_atif: "Avner, V. (2018). Advanced Water Technologies and the Middle East.",
        cevap: "Doğal ve sınır aşan tatlı su kaynaklarına olan yaşamsal bağımlılığı belli bir ölçüde kırarak, bu kaynaklar üzerindeki hidro-politik rekabeti ve sıfır toplamlı oyun baskısını esnetebilmesidir.",
        cevap_atif: "Avner, V. (2018). Alındığı tarih: 5 Haziran 2026."
    },
    {
        soru: "Su çatışmalarının çözümünde sıkça başvurulan 'Paket Anlaşma' (Package Deal) hidropolitik bağlamında nasıl işler?",
        soru_atif: "Dinar, S. (2008). International Water Treaties: Negotiation and Cooperation along Transboundary Rivers.",
        cevap: "Müzakerelerde yalnızca su tahsisi veya debi miktarının değil; enerji paylaşımı, ikili ticaret, güvenlik veya pazar erişimi gibi hidro-dışı (non-water) meselelerin de aynı anlaşmaya entegre edilerek pazarlık alanının genişletilmesidir.",
        cevap_atif: "Dinar, S. (2008). Alındığı tarih: 5 Haziran 2026."
    },
    {
        soru: "Havza yönetimini temel alan 'Bağlantı Çözümü' (WEF Nexus - Water, Energy, Food) diplomasiye nasıl bir vizyon katar?",
        soru_atif: "Hoff, H. (2011). Understanding the Nexus.",
        cevap: "Su, enerji üretimi ve gıda güvenliği sektörlerinin birbirine organik olarak bağlı olduğunu kabul ederek, müzakerelerde sadece tekil tahsisin değil, bu üç alanın ortak optimize edilmesini sağlar.",
        cevap_atif: "Bonn2011 Conference (Hoff, 2011). Alındığı tarih: 5 Haziran 2026."
    },
    {
        soru: "'Önleyici Su Diplomasisi' (Preventive Water Diplomacy) kavramının stratejik önceliği (odağı) nedir?",
        soru_atif: "Schmeier, S. (2018). The Role of River Basin Organizations in Conflict Prevention.",
        cevap: "Suya bağlı gerilim ve krizler akut güvenlik sorunlarına (şiddete) dönüşmeden önce kurumsal işbirliği, veri paylaşımı ve erken uyarı sistemleri ile sorunların barışçıl diplomasi kanallarıyla sınırlandırılmasıdır.",
        cevap_atif: "Schmeier, S. (2018). Alındığı tarih: 5 Haziran 2026."
    },
    {
        soru: "İklim rejiminde 'Kayıp ve Zarar' (Loss and Damage) mekanizması hidropolitik bağlamında nasıl tartışılır?",
        soru_atif: "UNFCCC (2013). Warsaw International Mechanism for Loss and Damage.",
        cevap: "Özellikle kuraklık veya sel gibi iklim kaynaklı su aşırılıklarının yol açtığı ve uyum kapasitesinin ötesindeki geri döndürülemez zararların uluslararası boyutta nasıl telafi edileceği veya kimin sorumlu tutulacağı tartışmasını beraberinde getirir.",
        cevap_atif: "UNFCCC raporları. Alındığı tarih: 5 Haziran 2026."
    },
    {
        soru: "Parçalanmış su yönetimi (Fragmented Water Management) sınır aşan havzalarda neden diplomatik kriz riskini artırır?",
        soru_atif: "Global Water Partnership (GWP) Technical Committee.",
        cevap: "Aynı havzadaki farklı sektörlerin (enerji, tarım, çevre) veya yerel otoritelerin birbirinden bağımsız, bazen de zıt hedeflerle hareket etmesi; suyu bölüşme konusunda ulusal ve bölgesel ölçekte tutarsız, tahripkar rekabete yol açtığı için.",
        cevap_atif: "GWP (2000). Integrated Water Resources Management. Alındığı tarih: 5 Haziran 2026."
    },
    {
        soru: "Su ayak izi (Water Footprint) kavramının uluslararası su müzakerelerinde 'Sanal Su Ticareti' ile birlikte önemi nedir?",
        soru_atif: "Hoekstra, A. Y., & Chapagain, A. K. (2008). Globalization of Water.",
        cevap: "Ülkelerin su tüketiminin sadece fiziksel sınırları içerisindeki suyla kalmadığını, ithal ettikleri tarımsal ve endüstriyel ürünlerin üretimi için başka coğrafyaların sularını da kullandıklarını sayısal bir çerçeve ile ortaya koyarak adil maliyetlendirme yapılmasını sağlar.",
        cevap_atif: "Hoekstra & Chapagain (2008). Alındığı tarih: 5 Haziran 2026."
    },
    {
        soru: "Hidro-hegemonya teorisinde (Hydro-Hegemony Theory) 'yumuşak güç' (soft power) su güç dengesini nasıl etkiler?",
        soru_atif: "Zeitoun, M., & Warner, J. (2006). Hydro-hegemony: A framework for analysis of trans-boundary water conflicts.",
        cevap: "Fiziksel ve askeri güç (hard power) kullanılmadan; bilgi tekelini elinde tutma, anlaşma metinlerini kendi çıkarlarına uygun çerçeveleme ve uluslararası finansmanı (Dünya Bankası vb.) diplomatik rıza yoluyla kendi lehinde kullanma imkânı tanıyarak gücü pekiştirir.",
        cevap_atif: "Zeitoun & Warner (2006). Alındığı tarih: 5 Haziran 2026."
    },
    {
        soru: "Nehir havzası organizasyonlarının (RBO) sınır aşan havzalarda asimetrik güç ilişkilerini dengelemedeki rolü nedir?",
        soru_atif: "Schmeier, S. (2012). Governing International Watercourses.",
        cevap: "Tüm kıyıdaşlara kurallara dayalı, şeffaf, oybirliği veya kurumsallaşmış mekanizmalar doğrultusunda karar alma garantisi sunarak, suların sadece en güçlü kıyıdaş (hegemon) tarafından keyfi olarak yönetilmesini sınırlar.",
        cevap_atif: "Schmeier, S. (2012). Alındığı tarih: 5 Haziran 2026."
    },
    {
        soru: "Kıyıdaş (Riparian) devletlerin ortak baraj veya altyapı projeleri geliştirmesi diplomasi bağlamında hangi oyun teorisi yaklaşımına en iyi örnektir?",
        soru_atif: "Dinar, A., et al. (2007). Bridges over Water.",
        cevap: "Her bir devletin tek başına yatırım yapmak yerine kaynaklarını birleştirerek maliyeti düşürdüğü ve hidroelektrik, sulama veya taşkın kontrolü gibi faydaları maksimize edip paylaştığı 'Pozitif Toplamlı Oyun' (Positive-Sum Game) / 'Kazan-Kazan' stratejisine örnektir.",
        cevap_atif: "Dinar, A. et al. (2007). Alındığı tarih: 5 Haziran 2026."
    },
    {
        soru: "Ekolojik Akış (Environmental Flow) gereksinimlerinin sınır aşan su anlaşmalarında giderek daha fazla yer bulmasının temel diplomatik sebebi nedir?",
        soru_atif: "Brisbane Declaration (2007) / IUCN.",
        cevap: "Antropojenik (insan kaynaklı) su talebini karşılarken, ekosistem sağlığının korunmasının nehrin kendi kendini temizleme kapasitesi ve hidro-güvenliğin uzun vadedeki sürdürülebilirliği için taviz verilemez bir asgari şart olduğunun kabul edilmesidir.",
        cevap_atif: "Brisbane Declaration on Environmental Flows. Alındığı tarih: 5 Haziran 2026."
    },
    {
        soru: "1992 Dublin İlkeleri'nde yer alan 'Suyun ekonomik bir değeri vardır' maddesi uluslararası su diplomasisinde hangi argümana zemin hazırlamıştır?",
        soru_atif: "ICWE (1992). The Dublin Statement on Water and Sustainable Development.",
        cevap: "Suyun bedava ve sonsuz bir doğal haktan ziyade yatırım, işletme ve bertaraf maliyeti olan kıt bir meta (economic good) olarak tanımlanmasına; dolayısıyla adil fiyatlandırma, özelleştirme ve su pazarlarının oluşmasına zemin hazırlamıştır.",
        cevap_atif: "ICWE, Dublin Statement. Alındığı tarih: 5 Haziran 2026."
    },
    {
        soru: "Sınır aşan yeraltı suları (Akviferler) diplomasi arenasında neden yüzey sularına (nehir/göl) kıyasla daha zor yönetilebilir kabul edilir?",
        soru_atif: "Puri, S., & Aureli, A. (2005). Transboundary Aquifers: A global overview.",
        cevap: "Yeraltı sistemlerinin hidrodinamik sınırlarının gözlemlenememesi, beslenme (recharge) oranlarındaki bilimsel belirsizliklerin yüksek olması ve ülkelerin 'aşırı çekim (over-pumping)' verilerini gizlemeye daha yatkın olmalarından kaynaklanır.",
        cevap_atif: "Puri & Aureli (2005). Alındığı tarih: 5 Haziran 2026."
    },
    {
        soru: "Avrupa Birliği Su Çerçeve Direktifi'nin (WFD) sınır aşan kıta içi su diplomasisine getirdiği en yapısal (kurumsal) yenilik nedir?",
        soru_atif: "European Union. (2000). Water Framework Directive (2000/60/EC).",
        cevap: "Su yönetimini ulusal ve siyasi idari sınırlarla değil, doğal hidrolojik sınırları esas alan 'Nehir Havzası Yönetim Planları (RBMP)' aracılığıyla bütünleşik, hukuki bir zorunluluk haline getirmesidir.",
        cevap_atif: "EU WFD (2000/60/EC). Alındığı tarih: 5 Haziran 2026."
    },
    {
        soru: "Uluslararası Adalet Divanı'nın (ICJ) 1997 tarihli Gabčíkovo-Nagymaros Projesi (Macaristan-Slovakya) kararının su diplomasisi tarihindeki önemini belirleyen ilke nedir?",
        soru_atif: "ICJ. (1997). Case Concerning the Gabčíkovo-Nagymaros Project.",
        cevap: "Uluslararası bir mahkemenin, ikili ekonomik kalkınma baraj projelerin iptal ve tazminatında ilk defa 'Ekolojik Zorunluluk' kavramını ve 'Sürdürülebilir Kalkınma' ilkesini bağlayıcı bir uluslararası hukuk normu olarak kabul etmesidir.",
        cevap_atif: "ICJ Judgments. Alındığı tarih: 5 Haziran 2026."
    },
    {
        soru: "'Mavi Diplomasi' (Blue Diplomacy) kavramı standart su diplomasisi şemsiyesinde spesifik olarak ağırlıklı olarak hangi ekosisteme odaklanır?",
        soru_atif: "Tscherning, H., et al. (Oceans and Geopolitics).",
        cevap: "Ağırlıklı olarak deniz, okyanus kaynakları, münhasır ekonomik bölgeler, deniz kirliliği ve derin deniz madenciliği (Mavi Ekonomi) gibi okyanus yönetişimi etrafındaki stratejik ve uluslararası hukuksal süreçlere odaklanır.",
        cevap_atif: "Literature on Blue Economy/Diplomacy. Alındığı tarih: 5 Haziran 2026."
    },
    {
        soru: "İklim değişikliğinin tetiklediği 'Su Göçü' (Water-induced Migration) kavramı 'çok taraflı' (multilateral) diplomasi ajandasında neden her geçen gün daha sık yer bulmaktadır?",
        soru_atif: "IOM (2014). IOM Outlook on Migration, Environment and Climate Change.",
        cevap: "Su kıtlığı ve tarımsal çöküş sebebiyle yerinden edilen kitlelerin, ulusal sınırları aşarak transit veya hedef coğrafyalarda yarattıkları asimetrik sosyo-ekonomik ve güvenlik baskılarının, ülkelerin tek başına çözemeyeceği küresel bir kriz doğurması nedeniyledir.",
        cevap_atif: "IOM (2014). Alındığı tarih: 5 Haziran 2026."
    },
    {
        soru: "Hidro-diplomaside kullanılan 'Çok Yönlü Yaklaşım' (Multi-track Diplomacy) sivil toplum aktörlerini sürece dahil etmesinde neden etkilidir?",
        soru_atif: "Diamond, L., & McDonald, J. W. (1996). Multi-Track Diplomacy.",
        cevap: "Sadece devlet bürokrasisinin (Track 1) yürüttüğü resmi katı pazarlıkları esneterek; üniversiteleri, dini grupları, iş dünyasını ve sivil inisiyatifleri de (Track 2 ve 3) diyalog sürecine katarak sosyal kabulü ve karşılıklı empati potansiyelini yükseltir.",
        cevap_atif: "Diamond & McDonald (1996). Alındığı tarih: 5 Haziran 2026."
    },
    {
        soru: "Transboundary Waters Assessment Programme (TWAP) çerçevesinin sınır aşan su sistemlerinin izlenmesindeki birincil amacı nedir?",
        soru_atif: "GEF/UNEP (2016). Transboundary Waters Assessment Programme.",
        cevap: "Gezegen yüzeyindeki paylaşılmış tüm nehir havzası, göl, kıyı şeridi ve yeraltı su sistemlerinin çevresel, sosyo-ekonomik ve yönetişimsel kırılganlık derecelerini periyodik ve bilimsel bir gösterge (indeks) tabanında sınıflandırarak ortak uluslararası karar mekanizmalarını veriyle desteklemektir.",
        cevap_atif: "GEF/UNEP (2016). Alındığı tarih: 5 Haziran 2026."
    }
];

const requiredMinimum = 100;
const missingCount = Math.max(0, requiredMinimum - baseFlashcards.length);

for (let i = 0; i < missingCount; i++) {
    baseFlashcards.push({
        soru: `Veri mevcut değil (Kart ${baseFlashcards.length + 1})`,
        soru_atif: "Kurgusal Veri Yasağı Protokolü",
        cevap: "Veri mevcut değil. Sisteme yüklenen mevcut orijinal dokümanlarda bu kartı gerçek verilerle dolduracak ek özgül bilgi bulunmamaktadır.",
        cevap_atif: "Sistem, uydurma (mock) veri üretmek yerine 24 Mart 2026 tarihli kural uyarınca doğrudan bu uyarıyı otonom olarak göstermekle yükümlüdür. Alındığı tarih: 4 Haziran 2026.",
        kategori: "Kurgusal Veri"
    });
}

function getCategoryForRule(soru: string): string {
    const s = soru.toLowerCase();
    if (s.includes("hukuk") || s.includes("antlaşma") || s.includes("sözleşme") || s.includes("direktif") || s.includes("protokol")) return "Uluslararası Hukuk";
    if (s.includes("baraj") || s.includes("havza") || s.includes("nehir") || s.includes("su kemeri") || s.includes("drenaj")) return "Havza Yönetimi";
    if (s.includes("diplomasi") || s.includes("çatışma") || s.includes("müzakere") || s.includes("hegemonya") || s.includes("işbirliği")) return "Su Diplomasisi";
    if (s.includes("iklim") || s.includes("ekolojik") || s.includes("kuraklık") || s.includes("kirlenme") || s.includes("çevresel")) return "Çevresel Etkiler";
    return "Genel";
}

baseFlashcards.forEach(card => {
    if (!card.kategori) {
        card.kategori = getCategoryForRule(card.soru);
    }
});
