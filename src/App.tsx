import { useEffect, useState, useRef } from 'react';
import { Settings, LogOut, Download, Upload, Info, Scale, Droplets, Globe, Leaf, Lightbulb } from 'lucide-react';
import { auth, db, appId } from './firebase';
import { baseFlashcards, Flashcard } from './data';
import { 
  onAuthStateChanged, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  User
} from 'firebase/auth';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';

const ADMIN_EMAIL = "serdarerman@gmail.com";

const getCategoryIcon = (category?: string) => {
  switch (category) {
    case "Uluslararası Hukuk": return <Scale size={48} className="text-blue-200 mb-4 opacity-50" />;
    case "Havza Yönetimi": return <Droplets size={48} className="text-blue-200 mb-4 opacity-50" />;
    case "Su Diplomasisi": return <Globe size={48} className="text-blue-200 mb-4 opacity-50" />;
    case "Çevresel Etkiler": return <Leaf size={48} className="text-blue-200 mb-4 opacity-50" />;
    default: return <Lightbulb size={48} className="text-blue-200 mb-4 opacity-50" />;
  }
};

const getCategoryIconBack = (category?: string) => {
  switch (category) {
    case "Uluslararası Hukuk": return <Scale size={48} className="text-slate-600 mb-4 opacity-50" />;
    case "Havza Yönetimi": return <Droplets size={48} className="text-slate-600 mb-4 opacity-50" />;
    case "Su Diplomasisi": return <Globe size={48} className="text-slate-600 mb-4 opacity-50" />;
    case "Çevresel Etkiler": return <Leaf size={48} className="text-slate-600 mb-4 opacity-50" />;
    default: return <Lightbulb size={48} className="text-slate-600 mb-4 opacity-50" />;
  }
};

interface RssItem {
  title: string;
  link: string;
  pubDate: string;
}

export default function App() {
  const [masterFlashcards, setMasterFlashcards] = useState<Flashcard[]>([...baseFlashcards]);
  const [activeFlashcards, setActiveFlashcards] = useState<Flashcard[]>([...baseFlashcards]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardCount, setCardCount] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');
  
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showUnauthorizedModal, setShowUnauthorizedModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [notifications, setNotifications] = useState<{id: number, message: string}[]>([]);
  const notifIdRef = useRef(0);

  const [rssItems, setRssItems] = useState<RssItem[]>([]);
  const [rssLoading, setRssLoading] = useState(true);
  const [rssError, setRssError] = useState(false);

  const showNotification = (message: string) => {
    const id = notifIdRef.current++;
    setNotifications(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    console.log("Firestore Path:", 'artifacts', appId, 'public', 'data', 'flashcards', 'main-deck');
    const deckRef = doc(db, 'artifacts', appId, 'public', 'data', 'flashcards', 'main-deck');
    const unsubStore = onSnapshot(deckRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.cards && data.cards.length > 0) {
          setMasterFlashcards(data.cards);
        }
      } else {
        setMasterFlashcards([...baseFlashcards]);
      }
    }, (err) => {
      console.error("Firestore read error:", err);
    });
    
    return () => {
      unsubscribeAuth();
      unsubStore();
    };
  }, []);

  useEffect(() => {
    let tempDeck = [...masterFlashcards];
    
    if (selectedCategory !== 'Tümü') {
      tempDeck = tempDeck.filter(card => card.kategori === selectedCategory || (!card.kategori && selectedCategory === 'Genel'));
    }

    for (let i = tempDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tempDeck[i], tempDeck[j]] = [tempDeck[j], tempDeck[i]];
    }

    if (cardCount !== 'all') {
        const count = parseInt(cardCount, 10);
        tempDeck = tempDeck.slice(0, count);
    }
    setActiveFlashcards(tempDeck);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [masterFlashcards, cardCount, selectedCategory]);

  useEffect(() => {
    const fetchRss = async () => {
      setRssLoading(true);
      try {
        const targetRSSUrl = 'https://reliefweb.int/updates/rss.xml?theme=4593';
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(targetRSSUrl)}`;
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("HTTP Error");
        const data = await response.json();
        if (data.status === 'ok' && data.items.length > 0) {
          setRssItems(data.items.slice(0, 3));
        } else {
          throw new Error("No valid items");
        }
      } catch (e) {
        setRssError(true);
      } finally {
        setRssLoading(false);
      }
    };
    fetchRss();
  }, []);

  const handleRestart = () => {
    let tempDeck = [...masterFlashcards];

    if (selectedCategory !== 'Tümü') {
      tempDeck = tempDeck.filter(card => card.kategori === selectedCategory || (!card.kategori && selectedCategory === 'Genel'));
    }

    for (let i = tempDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tempDeck[i], tempDeck[j]] = [tempDeck[j], tempDeck[i]];
    }

    if (cardCount !== 'all') {
        const count = parseInt(cardCount, 10);
        tempDeck = tempDeck.slice(0, count);
    }
    setActiveFlashcards(tempDeck);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const nextCard = () => {
    if (activeFlashcards.length === 0) return;
    if (isFlipped) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(c => (c + 1) % activeFlashcards.length), 300);
    } else {
      setCurrentIndex(c => (c + 1) % activeFlashcards.length);
    }
  };

  const prevCard = () => {
    if (activeFlashcards.length === 0) return;
    if (isFlipped) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(c => (c - 1 + activeFlashcards.length) % activeFlashcards.length), 300);
    } else {
      setCurrentIndex(c => (c - 1 + activeFlashcards.length) % activeFlashcards.length);
    }
  };

  const markCard = (status: string) => {
    console.log(`Card ${currentIndex + 1} marked as: ${status}`);
    nextCard();
  };

  const openAdminPanel = () => {
    if (currentUser?.email?.toLowerCase() === ADMIN_EMAIL) {
      setShowAdminModal(true);
    } else if (currentUser?.email) {
      setShowUnauthorizedModal(true);
    } else {
      setShowLoginModal(true);
    }
  };

  const closeModals = () => {
    setShowAdminModal(false);
    setShowUnauthorizedModal(false);
    setShowLoginModal(false);
    setShowInfoModal(false);
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      closeModals();
      openAdminPanel();
      showNotification("Giriş başarılı.");
    } catch (e: any) {
      showNotification("Google giriş hatası: " + e.message);
    }
  };

  const handleEmailLogin = async () => {
    if (!email || !password) { showNotification("E-posta ve şifre zorunludur."); return; }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      closeModals();
      openAdminPanel();
      showNotification("Giriş başarılı.");
    } catch (e) {
      showNotification("Giriş hatası: Lütfen bilgilerinizi kontrol edin.");
    }
  };

  const handleEmailRegister = async () => {
    if (!email || !password) { showNotification("E-posta ve şifre zorunludur."); return; }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      closeModals();
      openAdminPanel();
      showNotification("Kayıt ve giriş başarılı.");
    } catch (e: any) {
      showNotification("Kayıt hatası: " + e.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      closeModals();
      showNotification("Çıkış yapıldı.");
    } catch (e) {
      console.error(e);
    }
  };

  const saveToCloud = async (cards: Flashcard[]) => {
    if (currentUser?.email?.toLowerCase() === ADMIN_EMAIL) {
      try {
        const deckRef = doc(db, 'artifacts', appId, 'public', 'data', 'flashcards', 'main-deck');
        await setDoc(deckRef, { cards });
        showNotification("Veritabanı buluta kaydedildi.");
      } catch (e: any) {
        showNotification("Buluta kaydetme hatası: " + e.message);
      }
    }
  };

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportJSON = () => {
    if (!masterFlashcards.length) return;
    const blob = new Blob([JSON.stringify(masterFlashcards, null, 4)], { type: 'application/json;charset=utf-8;' });
    downloadBlob(blob, 'su_diplomasisi_kartlari.json');
    showNotification("Veritabanı JSON formatında indirildi.");
  };

  const exportCSV = () => {
    if (!masterFlashcards.length) return;
    const headers = ["soru", "soru_atif", "cevap", "cevap_atif", "kategori"];
    const csvRows = [headers.join(",")];
    for (const card of masterFlashcards) {
      const row = headers.map(header => {
        let cell = (card as any)[header] || "";
        cell = cell.toString().replace(/"/g, '""');
        return `"${cell}"`;
      });
      csvRows.push(row.join(","));
    }
    const blob = new Blob(["\uFEFF" + csvRows.join("\n")], { type: 'text/csv;charset=utf-8;' });
    downloadBlob(blob, 'su_diplomasisi_kartlari.csv');
    showNotification("Veritabanı CSV formatında indirildi.");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const contents = event.target?.result as string;
        if (file.name.endsWith('.json')) {
          const parsed = JSON.parse(contents);
          if (Array.isArray(parsed)) {
            setMasterFlashcards(parsed);
            saveToCloud(parsed);
            closeModals();
          } else throw new Error("Dizi bekleniyor.");
        } else if (file.name.endsWith('.csv')) {
          const rows = contents.split('\n');
          if (rows.length < 2) throw new Error("CSV veri içermiyor.");
          const headers = rows[0].split(',').map(h => h.replace(/^"|"$/g, '').trim());
          const newData = [];
          const regex = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;
          for (let i = 1; i < rows.length; i++) {
            if (!rows[i].trim()) continue;
            const values = rows[i].split(regex).map(v => v.replace(/^"|"$/g, '').replace(/""/g, '"').trim());
            let obj: any = {};
            headers.forEach((h, index) => { obj[h] = values[index] || ""; });
            newData.push(obj);
          }
          if (newData.length > 0) {
            setMasterFlashcards(newData as Flashcard[]);
            saveToCloud(newData as Flashcard[]);
            closeModals();
          }
        }
      } catch (err) {
        showNotification("Dosya yükleme hatası: Format uyumsuz.");
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const currentCard = activeFlashcards[currentIndex];
  
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col items-center py-6 px-4 font-sans relative overflow-hidden">
      
      {/* Notifications */}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
        {notifications.map(n => (
          <div key={n.id} className="bg-amber-500 text-white px-5 py-3 rounded-lg shadow-md font-semibold pointer-events-auto transition-all animate-in slide-in-from-right-10 fade-in duration-300">
            {n.message}
          </div>
        ))}
      </div>

      <button 
        onClick={openAdminPanel}
        className="absolute top-5 left-5 bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 text-sm rounded-md z-40 transition-colors flex items-center gap-2 shadow-sm"
      >
        <Settings size={16} /> Yönetim Paneli
      </button>

      <button 
        onClick={() => setShowInfoModal(true)}
        className="absolute top-5 right-5 bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 text-sm rounded-md z-40 transition-colors flex items-center gap-2 shadow-sm"
      >
        <Info size={16} /> Hakkında
      </button>

      {/* Modals Overlay */}
      {(showLoginModal || showAdminModal || showUnauthorizedModal || showInfoModal) && (
        <div className="fixed inset-0 bg-black/50 z-[2000]" onClick={closeModals} />
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-xl z-[2001] shadow-2xl w-[90%] max-w-sm text-center">
          <h2 className="text-xl font-bold mb-1 text-slate-900">Kullanıcı Girişi</h2>
          <p className="text-sm text-slate-500 mb-6">Yönetim paneline erişmek için giriş yapın.</p>
          
          <input 
            type="email" 
            placeholder="E-posta Adresi" 
            className="w-full p-2.5 mb-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email} onChange={e => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Şifre" 
            className="w-full p-2.5 mb-4 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password} onChange={e => setPassword(e.target.value)}
          />
          
          <div className="flex gap-2 w-full">
            <button onClick={handleEmailLogin} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-md font-medium transition-colors">Giriş Yap</button>
            <button onClick={handleEmailRegister} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 rounded-md font-medium transition-colors">Kayıt Ol</button>
          </div>
          
          <div className="flex items-center text-slate-400 my-4 text-sm before:flex-1 before:border-b before:border-slate-200 before:mr-2 after:flex-1 after:border-b after:border-slate-200 after:ml-2">
            veya
          </div>
          
          <button onClick={handleGoogleLogin} className="w-full bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-md font-medium transition-colors flex items-center justify-center gap-2 mb-4">
            <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#fff"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#fff"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#fff"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#fff"/>
              <path d="M1 1h22v22H1z" fill="none"/>
            </svg>
            Google ile Giriş Yap
          </button>
          
          <button onClick={closeModals} className="w-full bg-slate-400 hover:bg-slate-500 text-white py-2.5 rounded-md font-medium transition-colors">İptal</button>
        </div>
      )}

      {/* Admin Modal */}
      {showAdminModal && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-xl z-[2001] shadow-2xl w-[90%] max-w-sm text-center">
          <h2 className="text-xl font-bold mb-1 text-slate-900">Veritabanı Yönetimi</h2>
          <p className="text-sm text-slate-500 mb-6">Hoş geldiniz, <span className="font-bold text-slate-800">{currentUser?.email}</span></p>
          
          <input type="file" id="file-upload" accept=".json, .csv" className="hidden" onChange={handleFileUpload} />
          
          <div className="flex flex-col gap-3">
            <button onClick={exportJSON} className="flex items-center justify-center gap-2 w-full bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-md font-medium transition-colors">
              <Download size={18} /> JSON Olarak İndir
            </button>
            <button onClick={exportCSV} className="flex items-center justify-center gap-2 w-full bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-md font-medium transition-colors">
              <Download size={18} /> CSV Olarak İndir
            </button>
            <button onClick={() => document.getElementById('file-upload')?.click()} className="flex items-center justify-center gap-2 w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 rounded-md font-medium transition-colors">
              <Upload size={18} /> Veri Yükle (JSON/CSV)
            </button>
            
            <button onClick={handleLogout} className="flex items-center justify-center gap-2 w-full bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-md font-medium transition-colors mt-2">
              <LogOut size={18} /> Çıkış Yap
            </button>
          </div>
          
          <button onClick={closeModals} className="w-full bg-slate-400 hover:bg-slate-500 text-white py-2.5 rounded-md font-medium transition-colors mt-4">Kapat</button>
        </div>
      )}

      {/* Unauthorized Modal */}
      {showUnauthorizedModal && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-xl z-[2001] shadow-2xl w-[90%] max-w-sm text-center">
          <h2 className="text-xl font-bold mb-4 text-slate-900">Yetkisiz Erişim</h2>
          <p className="text-sm text-slate-700 mb-6 leading-relaxed">
            Giriş yaptığınız hesap: <br/><strong className="text-slate-900">{currentUser?.email}</strong><br/><br/>
            Yönetim paneline erişim yetkisi sadece sistem yöneticisine (serdarerman@gmail.com) aittir.
          </p>
          <button onClick={handleLogout} className="w-full bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-md font-medium transition-colors mb-2">Hesaptan Çıkış Yap</button>
          <button onClick={closeModals} className="w-full bg-slate-400 hover:bg-slate-500 text-white py-2.5 rounded-md font-medium transition-colors">İptal</button>
        </div>
      )}

      {/* Info Modal */}
      {showInfoModal && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-xl z-[2001] shadow-2xl w-[90%] max-w-md max-h-[85vh] overflow-y-auto border border-slate-100">
          <div className="flex items-center gap-3 mb-6 border-b pb-4">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600 shadow-sm">
              <Info size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Uygulama Hakkında</h2>
          </div>
          
          <div className="space-y-6 text-sm text-slate-700 leading-relaxed text-left">
            <div>
              <h3 className="font-semibold text-slate-900 text-base mb-2">Amacımız</h3>
              <p>
                Bu uygulama, "Su Diplomasisi" (Water Diplomacy) alanındaki kavram, antlaşma ve terimlerin hızlı ve etkileşimli bir şekilde öğrenilmesini sağlamak amacıyla geliştirilmiştir. Öğrenciler, araştırmacılar ve ilgili personel için yapılandırılmış bir pratik çalışma aracıdır.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-slate-900 text-base mb-2">Özellikler</h3>
              <ul className="list-disc pl-5 space-y-2 text-slate-600">
                <li><strong className="text-slate-800">İnteraktif Bilgi Kartları:</strong> Soru-cevap şeklindeki kartlarla kendinizi test edin.</li>
                <li><strong className="text-slate-800">Kategorik Çalışma:</strong> "Uluslararası Hukuk", "Havza Yönetimi", "Su Diplomasisi" ve "Çevresel Etkiler" gibi belirli kategorileri filtreleyerek çalışın.</li>
                <li><strong className="text-slate-800">İsteğe Bağlı Soru Sayısı:</strong> Çözmek istediğiniz soru adedini belirleyin (10, 25, 50, Tümü) ve kalanları rastgele filtreleyin.</li>
                <li><strong className="text-slate-800">Çevrimdışı Kullanım (PWA - Progressive Web App):</strong> Uygulama tarayıcınız aracılığıyla cihazınıza yüklenebilir ve bir kere önyüklendikten sonra veri israfı olmadan veya internet bağlantınız kesilse dahi çevrimdışı kullanılabilir.</li>
                <li><strong className="text-slate-800">Bulut Destekli İçerik:</strong> Admin paneli yardımı ile yöneticiler doğrudan veri ekleyebilir ve uygulama veritabanını güncelleyebilir.</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-4 border-t border-slate-100">
            <button onClick={closeModals} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition-colors cursor-pointer shadow-sm">
              Okudum, Kapat
            </button>
          </div>
        </div>
      )}

      <div className="mt-14 md:mt-6 text-center z-10 w-full max-w-3xl px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Su Diplomasisi Bilgi Kartları</h1>
        <p className="text-sm md:text-base text-slate-500 mb-8 max-w-lg mx-auto">Kurumsal Çerçeve ve Küresel Havza Analizleri (Genişletilmiş Veri Seti)</p>
      </div>

      {/* Settings */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-8 bg-white px-6 py-4 rounded-xl shadow-sm z-10 w-full max-w-3xl">
        <div className="flex items-center gap-2">
          <label htmlFor="card-category" className="text-sm font-semibold text-slate-700">Kategori:</label>
          <select 
            id="card-category" 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium cursor-pointer"
          >
            {['Tümü', ...Array.from(new Set(masterFlashcards.map(c => c.kategori || 'Genel')))].filter(c => c !== "Kurgusal Veri").map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="card-count" className="text-sm font-semibold text-slate-700">Soru Sayısı:</label>
          <select 
            id="card-count" 
            value={cardCount}
            onChange={(e) => setCardCount(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium cursor-pointer"
          >
            <option value="10">10 Kart</option>
            <option value="25">25 Kart</option>
            <option value="50">50 Kart</option>
            <option value="all">Tümü</option>
          </select>
        </div>

        <button onClick={handleRestart} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 text-sm rounded-lg font-medium transition-colors cursor-pointer flex items-center justify-center ml-auto">
          🔄 Karıştır & Yenile
        </button>
      </div>

      {/* Card Arena */}
      <div className="card-container w-full max-w-[700px] h-[380px] sm:h-[440px] mb-8 cursor-pointer z-10" onClick={() => setIsFlipped(!isFlipped)}>
        <div className={`flash-card w-full h-full relative rounded-2xl shadow-lg border border-slate-100 ${isFlipped ? 'flipped' : ''}`}>
          
          {/* Front */}
          <div className="card-face absolute w-full h-full bg-white rounded-2xl p-6 md:p-10 flex flex-col items-center justify-center text-center border-t-[6px] border-t-blue-500 overflow-y-auto">
            <div className="absolute top-5 left-5 text-xs font-bold uppercase tracking-wider text-slate-400">Soru</div>
            {currentCard && currentCard.kategori && currentCard.kategori !== "Kurgusal Veri" && (
                <div className="absolute top-5 right-5 text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-600 px-2.5 py-1 rounded-full">{currentCard.kategori}</div>
            )}
            {currentCard ? (
              <div className="flex flex-col h-full w-full justify-between items-center">
                <div className="mt-8 flex-1 flex flex-col items-center justify-center">
                  {getCategoryIcon(currentCard.kategori)}
                  <div className="text-lg md:text-xl leading-relaxed mt-2 mb-4 font-medium text-slate-700">
                    {currentCard.soru}
                  </div>
                </div>
                <div className="mt-auto w-full flex flex-col items-center">
                  <button className="bg-blue-50 text-blue-600 px-5 py-2.5 rounded-full text-sm font-semibold mb-3 hover:bg-blue-100 transition-colors">
                    Yanıtı görüntüleyin
                  </button>
                  {currentCard.soru_atif && (
                    <a 
                      href={`https://www.google.com/search?q=${encodeURIComponent(currentCard.soru_atif)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs italic text-slate-400 mt-2 pt-4 border-t border-slate-100 w-full break-words block hover:text-blue-500 transition-colors z-20"
                    >
                      Kaynak: {currentCard.soru_atif}
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-red-500 font-bold">Veri mevcut değil</div>
            )}
          </div>
          
          {/* Back */}
          <div className="card-face card-back absolute w-full h-full bg-slate-800 rounded-2xl p-6 md:p-10 flex flex-col items-center justify-center text-center border-t-[6px] text-white border-t-slate-400 overflow-y-auto">
            <div className="absolute top-5 left-5 text-xs font-bold uppercase tracking-wider text-slate-400">Cevap</div>
            {currentCard && currentCard.kategori && currentCard.kategori !== "Kurgusal Veri" && (
                <div className="absolute top-5 right-5 text-[10px] font-bold uppercase tracking-wider bg-slate-700 text-slate-300 px-2.5 py-1 rounded-full">{currentCard.kategori}</div>
            )}
            {currentCard ? (
              <div className="flex flex-col h-full w-full justify-between items-center">
                <div className="mt-8 flex-1 flex flex-col items-center justify-center">
                  {getCategoryIconBack(currentCard.kategori)}
                  <div className="text-lg md:text-xl leading-relaxed mt-2 mb-4 font-medium">
                    {currentCard.cevap}
                  </div>
                </div>
                {currentCard.cevap_atif && (
                  <div className="mt-auto w-full flex flex-col items-center">
                    <a 
                      href={`https://www.google.com/search?q=${encodeURIComponent(currentCard.cevap_atif)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs italic text-slate-300 mt-4 pt-4 border-t border-slate-600 w-full break-words opacity-80 block hover:text-blue-300 transition-colors z-20"
                    >
                      Kaynak: {currentCard.cevap_atif}
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-red-400 font-bold">Veri mevcut değil</div>
            )}
          </div>
          
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 md:gap-6 mb-8 z-10 whitespace-nowrap">
        <button onClick={prevCard} className="bg-blue-500 hover:bg-blue-600 text-white px-4 md:px-6 py-2.5 rounded-lg font-bold transition-transform hover:-translate-y-0.5 shadow-sm text-sm md:text-base">← Önceki</button>
        <span className="font-bold text-slate-500 min-w-16 text-center text-sm md:text-base">
          {activeFlashcards.length > 0 ? `${currentIndex + 1} / ${activeFlashcards.length}` : '0 / 0'}
        </span>
        <button onClick={nextCard} className="bg-blue-500 hover:bg-blue-600 text-white px-4 md:px-6 py-2.5 rounded-lg font-bold transition-transform hover:-translate-y-0.5 shadow-sm text-sm md:text-base">Sonraki →</button>
      </div>

      <div className="flex gap-4 mb-12 z-10 w-full max-w-sm justify-center px-4">
        <button onClick={() => markCard('Öğrenildi')} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 rounded-lg font-bold transition-transform hover:-translate-y-0.5 shadow-sm text-sm">
          ✔ Öğrenildi
        </button>
        <button onClick={() => markCard('Tekrar Edilecek')} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-lg font-bold transition-transform hover:-translate-y-0.5 shadow-sm text-sm">
          ↻ Tekrar
        </button>
      </div>

      {/* RSS */}
      <div className="w-full max-w-[700px] bg-white p-6 rounded-2xl shadow-sm mb-12 z-10 mx-4">
        <h3 className="text-lg font-bold text-blue-600 border-b-2 border-slate-100 pb-3 mb-4 mt-0">Güncel Su Diplomasisi Gelişmeleri (RSS)</h3>
        {rssLoading ? (
          <div className="text-slate-500 text-sm">Haberler yükleniyor...</div>
        ) : rssError || rssItems.length === 0 ? (
          <div className="text-red-500 font-bold text-sm">Veri mevcut değil. (Ağ kısıtlaması)</div>
        ) : (
          <div className="flex flex-col">
            {rssItems.map((item, i) => (
              <div key={i} className={`py-4 ${i !== rssItems.length - 1 ? 'border-b border-slate-100' : ''}`}>
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-slate-800 font-medium hover:text-blue-500 transition-colors text-sm md:text-base leading-tight">
                  {item.title}
                </a>
                <div className="text-xs text-slate-400 mt-2">
                  {new Date(item.pubDate).toLocaleDateString('tr-TR')} - Küresel Su Raporları
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
