import React, { useEffect, useState, useRef } from 'react';
import { Settings, LogOut, Download, Upload, Info, Scale, Droplets, Globe, Leaf, Lightbulb, Moon, Sun, User as UserIcon, LogIn, UserPlus, X, ChevronLeft, ChevronRight, Check, RefreshCw, RotateCcw } from 'lucide-react';
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
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const [showHero, setShowHero] = useState(true);
  
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showUnauthorizedModal, setShowUnauthorizedModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [loginReason, setLoginReason] = useState<'admin' | 'user' | null>(null);
  
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
      setLoginReason('admin');
      setShowLoginModal(true);
    }
  };

  const openUserPanel = () => {
    if (currentUser) {
      setShowUserModal(true);
    } else {
      setLoginReason('user');
      setShowLoginModal(true);
    }
  };

  const handleSuccessfulLogin = () => {
    closeModals();
    if (loginReason === 'admin') {
      openAdminPanel();
    } else {
      openUserPanel();
    }
  };

  const closeModals = () => {
    setShowAdminModal(false);
    setShowUserModal(false);
    setShowUnauthorizedModal(false);
    setShowLoginModal(false);
    setShowInfoModal(false);
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      handleSuccessfulLogin();
      showNotification("Giriş başarılı.");
    } catch (e: any) {
      showNotification("Google giriş hatası: " + e.message);
    }
  };

  const handleEmailLogin = async () => {
    if (!email || !password) { showNotification("E-posta ve şifre zorunludur."); return; }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      handleSuccessfulLogin();
      showNotification("Giriş başarılı.");
    } catch (e) {
      showNotification("Giriş hatası: Lütfen bilgilerinizi kontrol edin.");
    }
  };

  const handleEmailRegister = async () => {
    if (!email || !password) { showNotification("E-posta ve şifre zorunludur."); return; }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      handleSuccessfulLogin();
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
  
  const renderModals = () => (
    <>
      {/* Modals Overlay */}
      {(showLoginModal || showAdminModal || showUserModal || showUnauthorizedModal || showInfoModal) && (
        <div className="fixed inset-0 bg-black/50 z-[2000]" onClick={closeModals} />
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 p-8 rounded-xl z-[2001] shadow-2xl w-[90%] max-w-sm text-center border border-slate-100 dark:border-slate-700">
          <h2 className="text-xl font-bold mb-1 text-slate-900 dark:text-slate-100">Kullanıcı Girişi</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            {loginReason === 'admin' ? 'Yönetim paneline erişmek için giriş yapın.' : 'Devam etmek için giriş yapın veya kayıt olun.'}
          </p>
          
          <input 
            type="email" 
            placeholder="E-posta Adresi" 
            className="w-full p-2.5 mb-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email} onChange={e => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Şifre" 
            className="w-full p-2.5 mb-4 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password} onChange={e => setPassword(e.target.value)}
          />
          
          <div className="flex gap-4 w-full">
            <button onClick={handleEmailLogin} title="Giriş Yap" className="flex-1 bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center py-2.5 rounded-md transition-colors">
              <LogIn size={20} />
            </button>
            <button onClick={handleEmailRegister} title="Kayıt Ol" className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center py-2.5 rounded-md transition-colors">
              <UserPlus size={20} />
            </button>
          </div>
          
          <div className="flex items-center text-slate-400 my-4 text-sm before:flex-1 before:border-b before:border-slate-200 before:mr-2 after:flex-1 after:border-b after:border-slate-200 after:ml-2">
            veya
          </div>
          
          <button onClick={handleGoogleLogin} title="Google ile Giriş Yap" className="w-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center py-2.5 rounded-md transition-colors gap-2 mb-4">
            <Globe size={20} />
          </button>
          
          <button onClick={closeModals} title="İptal" className="w-full bg-slate-400 hover:bg-slate-500 text-white flex items-center justify-center py-2.5 rounded-md transition-colors">
            <X size={20} />
          </button>
        </div>
      )}

      {/* User Modal */}
      {showUserModal && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 p-8 rounded-xl z-[2001] shadow-2xl w-[90%] max-w-sm text-center border border-slate-100 dark:border-slate-700">
          <h2 className="text-xl font-bold mb-1 text-slate-900 dark:text-slate-100">Kullanıcı Profili</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Hoş geldiniz, <br/><span className="font-bold text-slate-800 dark:text-slate-200">{currentUser?.email}</span></p>
          
          <button onClick={handleLogout} title="Çıkış Yap" className="flex items-center justify-center gap-2 w-full bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-md transition-colors mb-4">
            <LogOut size={20} />
          </button>
          <button onClick={closeModals} title="Kapat" className="w-full bg-slate-400 hover:bg-slate-500 text-white flex items-center justify-center py-2.5 rounded-md transition-colors">
            <X size={20} />
          </button>
        </div>
      )}

      {/* Admin Modal */}
      {showAdminModal && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 p-8 rounded-xl z-[2001] shadow-2xl w-[90%] max-w-sm text-center border border-slate-100 dark:border-slate-700">
          <h2 className="text-xl font-bold mb-1 text-slate-900 dark:text-slate-100">Veritabanı Yönetimi</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Hoş geldiniz, <span className="font-bold text-slate-800 dark:text-slate-200">{currentUser?.email}</span></p>
          
          <input type="file" id="file-upload" accept=".json, .csv" className="hidden" onChange={handleFileUpload} />
          
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <button onClick={exportJSON} title="JSON Olarak İndir" className="flex-1 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-md transition-colors">
                <Download size={20} />
              </button>
              <button onClick={exportCSV} title="CSV Olarak İndir" className="flex-1 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-md transition-colors">
                <Download size={20} />
              </button>
            </div>
            <button onClick={() => document.getElementById('file-upload')?.click()} title="Veri Yükle (JSON/CSV)" className="flex items-center justify-center w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 rounded-md transition-colors">
              <Upload size={20} />
            </button>
            <button onClick={handleLogout} title="Çıkış Yap" className="flex items-center justify-center w-full bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-md transition-colors mt-2">
              <LogOut size={20} />
            </button>
          </div>
          
          <button onClick={closeModals} title="Kapat" className="w-full bg-slate-400 hover:bg-slate-500 text-white flex items-center justify-center py-2.5 rounded-md transition-colors mt-4">
            <X size={20} />
          </button>
        </div>
      )}

      {/* Unauthorized Modal */}
      {showUnauthorizedModal && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 p-8 rounded-xl z-[2001] shadow-2xl w-[90%] max-w-sm text-center border border-slate-100 dark:border-slate-700">
          <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-slate-100">Yetkisiz Erişim</h2>
          <p className="text-sm text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
            Giriş yaptığınız hesap: <br/><strong className="text-slate-900 dark:text-slate-100">{currentUser?.email}</strong><br/><br/>
            Yönetim paneline erişim yetkisi sadece sistem yöneticisine (serdarerman@gmail.com) aittir.
          </p>
          <div className="flex gap-4 w-full">
            <button onClick={handleLogout} title="Hesaptan Çıkış Yap" className="flex-1 bg-red-500 hover:bg-red-600 text-white flex items-center justify-center py-2.5 rounded-md transition-colors mb-2">
              <LogOut size={20} />
            </button>
            <button onClick={closeModals} title="İptal" className="flex-1 bg-slate-400 hover:bg-slate-500 text-white flex items-center justify-center py-2.5 rounded-md transition-colors mb-2">
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Info Modal */}
      {showInfoModal && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 p-8 rounded-xl z-[2001] shadow-2xl w-[90%] max-w-md max-h-[85vh] overflow-y-auto border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-6 border-b dark:border-slate-700 pb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg text-blue-600 dark:text-blue-400 shadow-sm">
              <Info size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">Uygulama Hakkında</h2>
          </div>
          
          <div className="space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed text-left">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-base mb-2">Amacımız</h3>
              <p>
                Bu uygulama, "Su Diplomasisi" (Water Diplomacy) alanındaki kavram, antlaşma ve terimlerin hızlı ve etkileşimli bir şekilde öğrenilmesini sağlamak amacıyla geliştirilmiştir. Öğrenciler, araştırmacılar ve ilgili personel için yapılandırılmış bir pratik çalışma aracıdır.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-base mb-2">Özellikler</h3>
              <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-400">
                <li><strong className="text-slate-800 dark:text-slate-200">İnteraktif Bilgi Kartları:</strong> Soru-cevap şeklindeki kartlarla kendinizi test edin.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Kategorik Çalışma:</strong> "Uluslararası Hukuk", "Havza Yönetimi", "Su Diplomasisi" ve "Çevresel Etkiler" gibi belirli kategorileri filtreleyerek çalışın.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">İsteğe Bağlı Soru Sayısı:</strong> Çözmek istediğiniz soru adedini belirleyin (10, 25, 50, Tümü) ve kalanları rastgele filtreleyin.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Çevrimdışı Kullanım (PWA - Progressive Web App):</strong> Uygulama tarayıcınız aracılığıyla cihazınıza yüklenebilir ve bir kere önyüklendikten sonra veri israfı olmadan veya internet bağlantınız kesilse dahi çevrimdışı kullanılabilir.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Bulut Destekli İçerik:</strong> Admin paneli yardımı ile yöneticiler doğrudan veri ekleyebilir ve uygulama veritabanını güncelleyebilir.</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-7 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button onClick={closeModals} title="Okudum, Kapat" className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center py-3 rounded-lg transition-colors cursor-pointer shadow-sm">
              <X size={24} />
            </button>
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans relative overflow-x-hidden flex flex-col items-center">
      {renderModals()}
      
      {/* Notifications */}
      <div className="fixed top-5 right-5 z-[5000] flex flex-col gap-2 pointer-events-none">
        {notifications.map(n => (
          <div key={n.id} className="bg-amber-500 text-white px-5 py-3 rounded-lg shadow-md font-semibold pointer-events-auto transition-all animate-in slide-in-from-right-10 fade-in duration-300">
            {n.message}
          </div>
        ))}
      </div>

      {/* Shared Absolute Top Nav */}
      <div className="absolute top-5 left-5 flex gap-2 z-40">
        <button 
          onClick={openUserPanel}
          title={currentUser ? 'Profilim' : 'Giriş / Kayıt'}
          className={`${showHero ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' : 'bg-emerald-600 border-transparent text-white hover:bg-emerald-700'} border p-3 rounded-full transition-colors flex items-center justify-center shadow-lg backdrop-blur-sm`}
        >
          <UserIcon size={20} />
        </button>
        {(!currentUser || currentUser.email?.toLowerCase() === ADMIN_EMAIL) && (
          <button 
            onClick={openAdminPanel}
            title="Yönetim Paneli"
            className={`${showHero ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' : 'bg-slate-600 border-transparent text-white hover:bg-slate-700'} border p-3 rounded-full transition-colors flex items-center justify-center shadow-lg backdrop-blur-sm`}
          >
            <Settings size={20} />
          </button>
        )}
      </div>

      <div className="absolute top-5 right-5 flex gap-2 z-40">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          title="Tema Değiştir"
          className={`${showHero ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' : 'bg-slate-200 border-transparent text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'} border p-3 rounded-full transition-colors flex items-center justify-center shadow-lg backdrop-blur-sm`}
        >
          {isDarkMode ? <Sun size={20} className={showHero ? 'text-yellow-300' : 'text-yellow-500'} /> : <Moon size={20} />}
        </button>
        {!showHero && (
          <button 
            onClick={() => setShowInfoModal(true)}
            title="Hakkında"
            className="bg-blue-100 hover:bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800 p-3 rounded-full transition-colors flex items-center justify-center shadow-lg"
          >
            <Info size={20} />
          </button>
        )}
      </div>

      {showHero ? (
        <div className="relative w-full min-h-screen flex flex-col items-center justify-center py-6 px-4">
          {/* Background Image */}
          <div className="absolute inset-0 z-0 bg-slate-900">
            <img 
              src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&q=80&w=1920&h=1080" 
              alt="Sınır Aşan Akarsu" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 via-slate-900/60 to-slate-900/90 dark:from-slate-900/90 dark:to-slate-950/90" />
          </div>
          
          {/* Content */}
          <div className="relative z-10 text-center px-4 max-w-4xl flex flex-col items-center">
            <div className="mb-8 p-5 bg-white/10 rounded-full backdrop-blur-md border border-white/20 shadow-2xl">
              <Globe size={64} className="text-white drop-shadow-md" />
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">
              Su Diplomasisi
            </h1>
            
            <div className="flex flex-row gap-4 w-full justify-center">
              <button 
                onClick={() => setShowHero(false)} 
                title="Uygulamaya Giriş"
                className="bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-full transition-transform shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center"
              >
                <ChevronRight size={32} />
              </button>
              <button 
                onClick={() => setShowInfoModal(true)} 
                title="Hakkında"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 p-4 rounded-full transition-transform shadow-xl hover:-translate-y-1 flex items-center justify-center"
              >
                <Info size={32} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center py-6 px-4 w-full z-10 relative mt-14 md:mt-2">
          
      {/* Settings */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-8 bg-white dark:bg-slate-800 px-6 py-4 rounded-xl shadow-sm z-10 w-full max-w-3xl">
        <div className="flex items-center gap-2">
          <label htmlFor="card-category" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Kategori:</label>
          <select 
            id="card-category" 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium cursor-pointer"
          >
            {['Tümü', ...Array.from(new Set(masterFlashcards.map(c => c.kategori || 'Genel')))].filter(c => c !== "Kurgusal Veri").map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="card-count" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Soru Sayısı:</label>
          <select 
            id="card-count" 
            value={cardCount}
            onChange={(e) => setCardCount(e.target.value)}
            className="bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium cursor-pointer"
          >
            <option value="10">10 Kart</option>
            <option value="25">25 Kart</option>
            <option value="50">50 Kart</option>
            <option value="all">Tümü</option>
          </select>
        </div>

        <button onClick={handleRestart} title="Karıştır & Yenile" className="bg-blue-500 hover:bg-blue-600 text-white p-2.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center ml-auto">
          <RotateCcw size={20} />
        </button>
      </div>

      {/* Card Arena */}
      <div className="card-container w-full max-w-[700px] h-[380px] sm:h-[440px] mb-8 cursor-pointer z-10" onClick={() => setIsFlipped(!isFlipped)}>
        <div className={`flash-card w-full h-full relative rounded-2xl shadow-lg border border-slate-100 ${isFlipped ? 'flipped' : ''}`}>
          
          {/* Front */}
          <div className="card-face absolute w-full h-full bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-10 flex flex-col items-center justify-center text-center border-t-[6px] border-t-blue-500 overflow-y-auto shadow-sm">
            <div className="absolute top-5 left-5 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Soru</div>
            {currentCard && currentCard.kategori && currentCard.kategori !== "Kurgusal Veri" && (
                <div className="absolute top-5 right-5 text-[10px] font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 px-2.5 py-1 rounded-full">{currentCard.kategori}</div>
            )}
            {currentCard ? (
              <div className="flex flex-col h-full w-full justify-between items-center">
                <div className="mt-8 flex-1 flex flex-col items-center justify-center">
                  {getCategoryIcon(currentCard.kategori)}
                  <div className="text-lg md:text-xl leading-relaxed mt-2 mb-4 font-medium text-slate-700 dark:text-slate-200">
                    {currentCard.soru}
                  </div>
                </div>
                <div className="mt-auto w-full flex flex-col items-center">
                  <button title="Yanıtı görüntüleyin" className="bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-400 p-3 rounded-full mb-3 hover:bg-blue-100 dark:hover:bg-slate-600 transition-colors">
                    <RefreshCw size={20} />
                  </button>
                  {currentCard.soru_atif && (
                    <a 
                      href={`https://www.google.com/search?q=${encodeURIComponent(currentCard.soru_atif)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs italic text-slate-400 dark:text-slate-500 mt-2 pt-4 border-t border-slate-100 dark:border-slate-700 w-full break-words block hover:text-blue-500 dark:hover:text-blue-400 transition-colors z-20"
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
          <div className="card-face card-back absolute w-full h-full bg-slate-800 dark:bg-slate-700 rounded-2xl p-6 md:p-10 flex flex-col items-center justify-center text-center border-t-[6px] text-white border-t-slate-400 overflow-y-auto">
            <div className="absolute top-5 left-5 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">Cevap</div>
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
      <div className="flex flex-col items-center w-full max-w-md mb-8 z-10 px-4">
        <div className="flex items-center justify-between w-full mb-3">
          <button onClick={prevCard} title="Önceki Soru" className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg font-bold transition-transform hover:-translate-y-0.5 shadow-sm shrink-0">
            <ChevronLeft size={24} />
          </button>
          
          <div className="flex flex-col items-center flex-1 px-4">
            <span className="font-bold text-slate-500 dark:text-slate-400 text-sm md:text-base mb-2">
              {activeFlashcards.length > 0 ? `${currentIndex + 1} / ${activeFlashcards.length}` : '0 / 0'}
            </span>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden shadow-inner">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300 ease-out" 
                style={{ width: `${activeFlashcards.length > 0 ? ((currentIndex + 1) / activeFlashcards.length) * 100 : 0}%` }}
              >
              </div>
            </div>
          </div>

          <button onClick={nextCard} title="Sonraki Soru" className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg font-bold transition-transform hover:-translate-y-0.5 shadow-sm shrink-0">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-12 z-10 w-full max-w-sm justify-center px-4">
        <button onClick={() => markCard('Öğrenildi')} title="Öğrenildi Olarak İşaretle" className="flex-1 flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-bold transition-transform hover:-translate-y-0.5 shadow-sm">
          <Check size={24} />
        </button>
        <button onClick={() => markCard('Tekrar Edilecek')} title="Tekrar Edilecek Olarak İşaretle" className="flex-1 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-bold transition-transform hover:-translate-y-0.5 shadow-sm">
          <RefreshCw size={24} />
        </button>
      </div>

      {/* RSS */}
      <div className="w-full max-w-[700px] bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm mb-12 z-10 mx-4">
        <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 border-b-2 border-slate-100 dark:border-slate-700 pb-3 mb-4 mt-0">Güncel Su Diplomasisi Gelişmeleri (RSS)</h3>
        {rssLoading ? (
          <div className="text-slate-500 text-sm">Haberler yükleniyor...</div>
        ) : rssError || rssItems.length === 0 ? (
          <div className="text-red-500 font-bold text-sm">Veri mevcut değil. (Ağ kısıtlaması)</div>
        ) : (
          <div className="flex flex-col">
            {rssItems.map((item, i) => (
              <div key={i} className={`py-4 ${i !== rssItems.length - 1 ? 'border-b border-slate-100 dark:border-slate-700' : ''}`}>
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-slate-800 dark:text-slate-200 font-medium hover:text-blue-500 dark:hover:text-blue-400 transition-colors text-sm md:text-base leading-tight">
                  {item.title}
                </a>
                <div className="text-xs text-slate-400 dark:text-slate-500 mt-2">
                  {new Date(item.pubDate).toLocaleDateString('tr-TR')} - Küresel Su Raporları
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
      )}
    </div>
  );
}
