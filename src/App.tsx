import React, { useEffect, useState, useRef } from 'react';
import { Search, Settings, LogOut, Download, Upload, Info, Scale, Droplets, Globe, Leaf, Lightbulb, Moon, Sun, User as UserIcon, LogIn, UserPlus, X, ChevronLeft, ChevronRight, Check, RefreshCw, RotateCcw, MessageSquare, AlertTriangle, Award, Share2, HelpCircle } from 'lucide-react';
import { auth, db, appId } from './firebase';
import { baseFlashcards, Flashcard } from './data';
import { t, Lang } from './translations';
import { 
  onAuthStateChanged, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  User
} from 'firebase/auth';
import { doc, setDoc, getDoc, onSnapshot, collection, serverTimestamp } from 'firebase/firestore';

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
  const [searchQuery, setSearchQuery] = useState('');
  
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem('lang');
    if (saved === 'en' || saved === 'tr') return saved;
    // Always default to Turkish
    return 'tr';
  });
  
  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  const texts = t[lang];

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
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showHintModal, setShowHintModal] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState('görüş');
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);
  const [loginReason, setLoginReason] = useState<'admin' | 'user' | null>(null);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [learnedCards, setLearnedCards] = useState<Set<string>>(new Set());
  const [reviewCards, setReviewCards] = useState<Set<string>>(new Set());
  const [quickReviewMode, setQuickReviewMode] = useState(false);
  const [dailyGoal, setDailyGoal] = useState({ date: '', count: 0 });
  
  const [notifications, setNotifications] = useState<{id: number, message: string}[]>([]);
  const notifIdRef = useRef(0);

  const [rssItems, setRssItems] = useState<RssItem[]>([]);
  const [rssLoading, setRssLoading] = useState(true);
  const [rssError, setRssError] = useState(false);

  useEffect(() => {
    const loadUserProgress = async () => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, `artifacts/${appId}/users`, currentUser.uid));
          if (userDoc.exists()) {
             const data = userDoc.data();
             if (data.learnedCards) setLearnedCards(new Set(data.learnedCards));
             else setLearnedCards(new Set());
             
             if (data.reviewCards) setReviewCards(new Set(data.reviewCards));
             else setReviewCards(new Set());
          } else {
             setLearnedCards(new Set());
             setReviewCards(new Set());
          }
        } catch(e) {}
      } else {
        setLearnedCards(new Set());
        setReviewCards(new Set());
      }
    };
    loadUserProgress();
  }, [currentUser]);

  const showNotification = (message: string) => {
    const id = notifIdRef.current++;
    setNotifications(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const savedData = localStorage.getItem('dailyGoalData');
    let data = savedData ? JSON.parse(savedData) : { date: '', count: 0 };
    
    if (data.date !== today) {
      data = { date: today, count: 0 };
      localStorage.setItem('dailyGoalData', JSON.stringify(data));
    }
    setDailyGoal(data);

    if (data.count < 5 && !sessionStorage.getItem('dailyReminderShown')) {
      setTimeout(() => {
        showNotification(`Günlük Öğrenme Hedefi: Bugün en az 5 kart öğrenin! (${data.count}/5)`);
        sessionStorage.setItem('dailyReminderShown', 'true');
      }, 1500);
    }
  }, []);

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

    if (quickReviewMode) {
      tempDeck = tempDeck.filter(card => card.soru && reviewCards.has(card.soru));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      tempDeck = tempDeck.filter(card => 
        (card.soru && card.soru.toLowerCase().includes(q)) || 
        (card.cevap && card.cevap.toLowerCase().includes(q))
      );
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
  }, [masterFlashcards, cardCount, selectedCategory, searchQuery, quickReviewMode, reviewCards]);

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

    if (quickReviewMode) {
      tempDeck = tempDeck.filter(card => card.soru && reviewCards.has(card.soru));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      tempDeck = tempDeck.filter(card => 
        (card.soru && card.soru.toLowerCase().includes(q)) || 
        (card.cevap && card.cevap.toLowerCase().includes(q))
      );
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Do not trigger if user is typing in an input or textarea
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA' ||
        document.activeElement?.tagName === 'SELECT'
      ) {
        return;
      }
      
      // Do not trigger if any modal is open or if we are on the hero screen
      if (
        showHero ||
        showLoginModal ||
        showAdminModal ||
        showUserModal ||
        showUnauthorizedModal ||
        showInfoModal ||
        showFeedbackModal ||
        showHintModal
      ) {
        return;
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextCard();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevCard();
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        setIsFlipped(f => !f);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    showHero, showLoginModal, showAdminModal, showUserModal, 
    showUnauthorizedModal, showInfoModal, showFeedbackModal, showHintModal,
    activeFlashcards.length, isFlipped
  ]);

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

  const markCard = async (status: string) => {
    console.log(`Card ${currentIndex + 1} marked as: ${status}`);
    
    if (currentCard?.soru) {
      if (status === 'Öğrenildi') {
        const isNew = !learnedCards.has(currentCard.soru);
        
        const newLearned = new Set(learnedCards);
        newLearned.add(currentCard.soru);
        const newReview = new Set(reviewCards);
        newReview.delete(currentCard.soru);
        
        setLearnedCards(newLearned);
        setReviewCards(newReview);
          
        if (currentUser) {
          try {
            setDoc(doc(db, `artifacts/${appId}/users`, currentUser.uid), {
              learnedCards: Array.from(newLearned),
              reviewCards: Array.from(newReview)
            }, { merge: true });
          } catch(e) {}
        }
  
        if (isNew) {
          const today = new Date().toISOString().split('T')[0];
          setDailyGoal(prev => {
            const isToday = prev.date === today;
            const newCount = isToday ? prev.count + 1 : 1;
            
            if (newCount === 5) {
              showNotification('🎉 Tebrikler! Günlük 5 kart öğrenme hedefinize ulaştınız!');
            }
            
            const newData = { date: today, count: newCount };
            localStorage.setItem('dailyGoalData', JSON.stringify(newData));
            return newData;
          });
        }
      } else if (status === 'Tekrar Edilecek') {
        const newLearned = new Set(learnedCards);
        newLearned.delete(currentCard.soru);
        const newReview = new Set(reviewCards);
        newReview.add(currentCard.soru);
        
        setLearnedCards(newLearned);
        setReviewCards(newReview);
        
        if (currentUser) {
          try {
            setDoc(doc(db, `artifacts/${appId}/users`, currentUser.uid), {
              learnedCards: Array.from(newLearned),
              reviewCards: Array.from(newReview)
            }, { merge: true });
          } catch(e) {}
        }
      }
    }
    
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
    setShowFeedbackModal(false);
    setShowHintModal(false);
    setFeedbackSuccess(false);
    setFeedbackMessage('');
  };

  const submitFeedback = async () => {
    if (!feedbackMessage.trim()) return;
    setIsSubmittingFeedback(true);
    try {
      const feedbackRef = doc(collection(db, `artifacts/${appId}/feedback`));
      await setDoc(feedbackRef, {
        message: feedbackMessage.trim(),
        type: feedbackType,
        createdAt: serverTimestamp(),
        userEmail: currentUser?.email || null,
        userId: currentUser?.uid || null
      });
      setFeedbackSuccess(true);
      setTimeout(() => {
        closeModals();
      }, 2000);
    } catch (e: any) {
      showNotification("Hata: Geri bildirim gönderilemedi");
    } finally {
      setIsSubmittingFeedback(false);
    }
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
  
  const getBadge = (count: number) => {
    if (count >= 50) return { title: 'Su Diplomasisi Uzmanı', color: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-900/40' };
    if (count >= 25) return { title: 'Havza Analisti', color: 'text-indigo-500', bg: 'bg-indigo-100 dark:bg-indigo-900/40' };
    if (count >= 10) return { title: 'Araştırmacı', color: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-900/40' };
    return { title: 'Çırak', color: 'text-slate-500', bg: 'bg-slate-100 dark:bg-slate-800' };
  };

  const handleShareBadge = async () => {
    const badge = getBadge(learnedCards.size);
    const shareText = `Su Diplomasisi uygulamasında toplam ${learnedCards.size} kart öğrenerek '${badge.title}' unvanını kazandım! Sen de katıl 💦`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Su Diplomasisi Başarım',
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Paylaşım iptal edildi veya desteklenmiyor.');
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${shareText}\n${window.location.href}`);
        showNotification("Panoya kopyalandı!");
      } catch (err) {
        showNotification("Kopyalama başarısız oldu.");
      }
    }
  };

  const renderModals = () => (
    <>
      {/* Modals Overlay */}
      {(showLoginModal || showAdminModal || showUserModal || showUnauthorizedModal || showInfoModal || showHintModal) && (
        <div className="fixed inset-0 bg-black/50 z-[2000]" onClick={closeModals} />
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 p-8 rounded-xl z-[2001] shadow-2xl w-[90%] max-w-sm text-center border border-slate-100 dark:border-slate-700">
          <h2 className="text-xl font-bold mb-1 text-slate-900 dark:text-slate-100">
            {loginReason === 'admin' ? 'Yönetici Girişi' : 'Kullanıcı Girişi'}
          </h2>
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
          
          <div className="flex justify-center gap-4 w-full mt-6">
            <button onClick={handleEmailLogin} title="Giriş Yap" className="w-12 h-12 bg-blue-100 border-transparent text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/80 rounded-full flex items-center justify-center transition-colors">
              <LogIn size={20} />
            </button>
            <button onClick={handleEmailRegister} title="Kayıt Ol" className="w-12 h-12 bg-emerald-100 border-transparent text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-800/80 rounded-full flex items-center justify-center transition-colors">
              <UserPlus size={20} />
            </button>
            <button onClick={handleGoogleLogin} title="Google ile Giriş Yap" className="w-12 h-12 bg-red-100 border-transparent text-red-700 dark:bg-red-900/50 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800/80 rounded-full flex items-center justify-center transition-colors">
              <Globe size={20} />
            </button>
            <button onClick={closeModals} title="İptal" className="w-12 h-12 bg-slate-200 border-transparent text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-full flex items-center justify-center transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      {/* User Modal */}
      {showUserModal && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 p-8 rounded-xl z-[2001] shadow-2xl w-[90%] max-w-sm text-center border border-slate-100 dark:border-slate-700">
          <h2 className="text-xl font-bold mb-1 text-slate-900 dark:text-slate-100">{texts.userProfile}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Hoş geldiniz, <br/><span className="font-bold text-slate-800 dark:text-slate-200">{currentUser?.email}</span></p>
          
          <div className="mb-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-700 flex flex-col items-center shadow-sm">
            {(() => {
              const badge = getBadge(learnedCards.size);
              return (
                <>
                  <div className={`p-4 rounded-full mb-3 ${badge.bg}`}>
                    <Award size={36} className={badge.color} />
                  </div>
                  <h3 className={`font-bold text-lg mb-1 leading-tight ${badge.color}`}>{badge.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Öğrenilen Kart: <strong className="text-slate-700 dark:text-slate-300">{learnedCards.size}</strong>
                  </p>
                  
                  <div className="w-full mt-4">
                    <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="bg-blue-500 h-1.5 rounded-full transition-all duration-500" 
                        style={{ width: `${Math.min((learnedCards.size / (learnedCards.size < 10 ? 10 : learnedCards.size < 25 ? 25 : 50)) * 100, 100)}%` }}
                      ></div>
                    </div>
                    {learnedCards.size < 50 ? (
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-2 font-medium">
                        Sonraki rozete {(learnedCards.size < 10 ? 10 : learnedCards.size < 25 ? 25 : 50) - learnedCards.size} kart kaldı
                      </p>
                    ) : (
                      <p className="text-[10px] text-yellow-500 mt-2 font-medium">En yüksek rütbeye ulaştınız!</p>
                    )}
                  </div>
                  
                  <button 
                    onClick={handleShareBadge} 
                    title="Paylaş" 
                    className="mt-4 flex items-center justify-center gap-2 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/80 w-full py-2.5 rounded-lg font-medium text-sm transition-colors"
                  >
                    <Share2 size={16} /> Paylaş
                  </button>
                </>
              );
            })()}
          </div>
          
          <div className="flex justify-center gap-4 w-full mt-2">
            <button onClick={handleLogout} title={texts.logout} className="w-12 h-12 bg-red-100 border-transparent text-red-700 dark:bg-red-900/50 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800/80 rounded-full flex items-center justify-center transition-colors">
              <LogOut size={20} />
            </button>
            <button onClick={closeModals} title={texts.close} className="w-12 h-12 bg-slate-200 border-transparent text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-full flex items-center justify-center transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Admin Modal */}
      {showAdminModal && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 p-8 rounded-xl z-[2001] shadow-2xl w-[90%] max-w-sm text-center border border-slate-100 dark:border-slate-700">
          <h2 className="text-xl font-bold mb-1 text-slate-900 dark:text-slate-100">{texts.databaseManagement}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Hoş geldiniz, <span className="font-bold text-slate-800 dark:text-slate-200">{currentUser?.email}</span></p>
          
          <input type="file" id="file-upload" accept=".json, .csv" className="hidden" onChange={handleFileUpload} />
          
          <div className="flex justify-center flex-wrap gap-4 w-full mt-4">
            <button onClick={exportJSON} title={texts.downloadJSON} className="w-12 h-12 bg-blue-100 border-transparent text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/80 rounded-full flex items-center justify-center transition-colors relative">
              <span className="relative flex items-center justify-center w-full h-full"><Download size={20} /><span className="absolute -bottom-1 right-0 text-[9px] font-bold">JSN</span></span>
            </button>
            <button onClick={exportCSV} title="CSV Olarak İndir" className="w-12 h-12 bg-blue-100 border-transparent text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/80 rounded-full flex items-center justify-center transition-colors relative">
              <span className="relative flex items-center justify-center w-full h-full"><Download size={20} /><span className="absolute -bottom-1 right-0 text-[9px] font-bold">CSV</span></span>
            </button>
            <button onClick={() => document.getElementById('file-upload')?.click()} title={texts.uploadJSONCSV} className="w-12 h-12 bg-emerald-100 border-transparent text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-800/80 rounded-full flex items-center justify-center transition-colors">
              <Upload size={20} />
            </button>
            <button onClick={handleLogout} title={texts.logout} className="w-12 h-12 bg-red-100 border-transparent text-red-700 dark:bg-red-900/50 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800/80 rounded-full flex items-center justify-center transition-colors">
              <LogOut size={20} />
            </button>
            <button onClick={closeModals} title={texts.close} className="w-12 h-12 bg-slate-200 border-transparent text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-full flex items-center justify-center transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Unauthorized Modal */}
      {showUnauthorizedModal && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 p-8 rounded-xl z-[2001] shadow-2xl w-[90%] max-w-sm text-center border border-slate-100 dark:border-slate-700">
          <h2 className="text-xl font-bold mb-1 text-slate-900 dark:text-slate-100">{texts.unauthorizedAccess}</h2>
          <p className="text-sm text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
            Giriş yaptığınız hesap: <br/><strong className="text-slate-900 dark:text-slate-100">{currentUser?.email}</strong><br/><br/>
            Yönetim paneline erişim yetkisi sadece sistem yöneticisine (serdarerman@gmail.com) aittir.
          </p>
          <div className="flex justify-center gap-4 w-full mt-4">
            <button onClick={handleLogout} title={texts.logout} className="w-12 h-12 bg-red-100 border-transparent text-red-700 dark:bg-red-900/50 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800/80 rounded-full flex items-center justify-center transition-colors">
              <LogOut size={20} />
            </button>
            <button onClick={closeModals} title={texts.cancel} className="w-12 h-12 bg-slate-200 border-transparent text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-full flex items-center justify-center transition-colors">
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
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">{texts.aboutApp}</h2>
          </div>
          
          <div className="space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed text-left">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-base mb-2">{texts.aboutAimTitle}</h3>
              <p>{texts.aboutAimDesc}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-base mb-2">{texts.aboutFeaturesTitle}</h3>
              <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-400">
                {(texts.aboutFeaturesList as Array<{t: string, d: string}>).map((item, i) => (
                  <li key={i}><strong className="text-slate-800 dark:text-slate-200">{item.t}</strong> {item.d}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-base mb-2">{texts.aboutAuthTitle}</h3>
              <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-400">
                {(texts.aboutAuthList as Array<{t: string, d: string}>).map((item, i) => (
                  <li key={i}><strong className="text-slate-800 dark:text-slate-200">{item.t}</strong> {item.d}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="flex justify-center mt-7 pt-5 border-t border-slate-100 dark:border-slate-800">
            <button onClick={closeModals} title={texts.readClose} className="w-12 h-12 bg-slate-200 border-transparent text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-full flex items-center justify-center transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 p-8 rounded-xl z-[2001] shadow-2xl w-[90%] max-w-sm text-center border border-slate-100 dark:border-slate-700">
          <h2 className="text-xl font-bold mb-1 text-slate-900 dark:text-slate-100">{texts.feedbackTitle}</h2>
          
          {feedbackSuccess ? (
            <div className="py-6 px-4">
              <div className="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Check size={32} />
              </div>
              <p className="text-slate-700 dark:text-slate-300 font-medium text-lg">Teşekkürler!</p>
              <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">Geri bildiriminiz başarıyla iletildi.</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                Uygulama ile ilgili görüşlerinizi, önerilerinizi veya kartlarda karşılaştığınız hataları bize iletebilirsiniz.
              </p>
              
              <div className="flex justify-center gap-4 mb-5 w-full">
                <button 
                  onClick={() => setFeedbackType('görüş')}
                  title="Görüş & Öneri"
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${feedbackType === 'görüş' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-slate-800' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                >
                  <Lightbulb size={20} />
                </button>
                <button 
                  onClick={() => setFeedbackType('hata')}
                  title="Hata Bildirimi"
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${feedbackType === 'hata' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300 ring-2 ring-amber-500 ring-offset-2 dark:ring-offset-slate-800' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                >
                  <AlertTriangle size={20} />
                </button>
              </div>

              <textarea 
                placeholder="Mesajınızı buraya yazın..."
                className="w-full h-32 p-3 mb-4 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                value={feedbackMessage}
                onChange={e => setFeedbackMessage(e.target.value)}
              />

              <div className="flex justify-center gap-4 w-full mt-2">
                <button 
                  onClick={submitFeedback} 
                  disabled={isSubmittingFeedback || !feedbackMessage.trim()}
                  title="Gönder" 
                  className="w-12 h-12 disabled:opacity-50 disabled:cursor-not-allowed bg-blue-100 border-transparent text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/80 rounded-full flex items-center justify-center transition-colors"
                >
                  {isSubmittingFeedback ? <RefreshCw size={20} className="animate-spin" /> : <Check size={20} />}
                </button>
                <button onClick={closeModals} title="İptal" className="w-12 h-12 bg-slate-200 border-transparent text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-full flex items-center justify-center transition-colors">
                  <X size={20} />
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Hint Modal */}
      {showHintModal && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 p-8 rounded-xl z-[2001] shadow-2xl w-[90%] max-w-sm text-center border border-slate-100 dark:border-slate-700">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300">
              <HelpCircle size={36} />
            </div>
          </div>
          <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-slate-100">{texts.hint}</h2>
          <p className="text-sm text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
            {currentCard?.ipucu || texts.noHint}
          </p>
          <div className="flex justify-center mt-6">
            <button onClick={() => setShowHintModal(false)} title={texts.close} className="w-12 h-12 bg-slate-200 border-transparent text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-full flex items-center justify-center transition-colors">
              <X size={20} />
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

      {showHero ? (
        <div className="relative w-full min-h-screen flex flex-col items-center justify-center py-6 px-4">
          {/* Top Nav for Hero */}
          <div className="absolute top-5 left-5 flex gap-2 z-40">
            <button 
              onClick={openUserPanel}
              title={currentUser ? texts.myProfile : texts.loginRegister}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 border p-3 rounded-full transition-colors flex items-center justify-center shadow-lg backdrop-blur-sm"
            >
              <UserIcon size={20} />
            </button>
            {(!currentUser || currentUser.email?.toLowerCase() === ADMIN_EMAIL) && (
              <button 
                onClick={openAdminPanel}
                title={texts.adminPanel}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 border p-3 rounded-full transition-colors flex items-center justify-center shadow-lg backdrop-blur-sm"
              >
                <Settings size={20} />
              </button>
            )}
          </div>

          <div className="absolute top-5 right-5 flex gap-2 z-40">
            <button
              onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 border p-3 rounded-full transition-colors flex items-center justify-center shadow-lg backdrop-blur-sm font-bold text-xs w-11 h-11 uppercase"
            >
              {lang}
            </button>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              title="Tema Değiştir"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 border p-3 rounded-full transition-colors flex items-center justify-center shadow-lg backdrop-blur-sm"
            >
              {isDarkMode ? <Sun size={20} className="text-yellow-300" /> : <Moon size={20} />}
            </button>
            <button 
              onClick={() => setShowFeedbackModal(true)}
              title={texts.feedbackTitle}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 border p-3 rounded-full transition-colors flex items-center justify-center shadow-lg backdrop-blur-sm"
            >
              <MessageSquare size={20} />
            </button>
          </div>

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
              {texts.appTitle}
            </h1>
            
            <div className="flex flex-row gap-4 w-full justify-center">
              <button 
                onClick={() => setShowHero(false)} 
                title={texts.appTitle}
                className="bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-full transition-transform shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center"
              >
                <ChevronRight size={32} />
              </button>
              <button 
                onClick={() => setShowInfoModal(true)} 
                title={texts.aboutApp}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 p-4 rounded-full transition-transform shadow-xl hover:-translate-y-1 flex items-center justify-center"
              >
                <Info size={32} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center w-full z-10 relative">
          
      {/* App Header */}
      <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Globe className="text-blue-600 dark:text-blue-400" size={24} />
          <h1 className="text-lg font-bold text-slate-900 dark:text-white hidden sm:block">{texts.appTitle}</h1>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 border-l border-slate-200 dark:border-slate-700 pl-4 ml-auto">
          <div className="flex items-center gap-2">
            <button
              title={(texts as any).quickReview}
              onClick={() => {
                if (!quickReviewMode && reviewCards.size === 0) {
                  showNotification((texts as any).quickReviewEmpty);
                  return;
                }
                setQuickReviewMode(!quickReviewMode);
              }}
              className={`px-2 py-1.5 rounded-lg border flex items-center justify-center transition-colors ${quickReviewMode ? 'bg-red-100 border-red-300 text-red-700 dark:bg-red-900/50 dark:border-red-700/60 dark:text-red-300' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'}`}
            >
              <RefreshCw size={16} />
              <span className="ml-1.5 text-xs sm:text-sm font-medium hidden md:block">{(texts as any).quickReview}</span>
            </button>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input
                type="text"
                placeholder={texts.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg pl-8 pr-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm font-medium w-32 sm:w-40 lg:w-48 placeholder-slate-400 dark:placeholder-slate-500 transition-all"
              />
            </div>
            <select 
              title="Kategori Seçimi"
              id="card-category" 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg px-2 sm:px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm font-medium cursor-pointer"
            >
              {['Tümü', ...Array.from(new Set(masterFlashcards.map(c => c.kategori || 'Genel')))].filter(c => c !== "Kurgusal Veri").map(cat => (
                <option key={cat} value={cat}>{cat === 'Tümü' ? texts.all : cat === 'Genel' ? texts.general : cat}</option>
              ))}
            </select>

            <select 
              title={texts.cardCount}
              id="card-count" 
              value={cardCount}
              onChange={(e) => setCardCount(e.target.value)}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg px-2 sm:px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm font-medium cursor-pointer"
            >
              <option value="10">10 Kart</option>
              <option value="25">25 Kart</option>
              <option value="50">50 Kart</option>
              <option value="all">{texts.all}</option>
            </select>

            <button onClick={handleRestart} title={texts.shuffleRefresh} className="bg-blue-500 hover:bg-blue-600 text-white p-1.5 sm:p-2 rounded-lg transition-colors cursor-pointer flex items-center justify-center">
              <RotateCcw size={16} />
            </button>
          </div>
          
          {/* Top Icons */}
          <div className="flex items-center gap-2 border-l border-slate-200 dark:border-slate-700 pl-4">
            <button 
              onClick={openUserPanel}
              title={currentUser ? texts.myProfile : texts.loginRegister}
              className="bg-emerald-100 border-transparent text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-800/80 p-2 rounded-full transition-colors flex items-center justify-center"
            >
              <UserIcon size={18} />
            </button>
            {(!currentUser || currentUser.email?.toLowerCase() === ADMIN_EMAIL) && (
              <button 
                onClick={openAdminPanel}
                title={texts.adminPanel}
                className="bg-slate-200 border-transparent text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 p-2 rounded-full transition-colors flex items-center justify-center"
              >
                <Settings size={18} />
              </button>
            )}
            <button
              onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}
              className="bg-slate-200 border-transparent text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 p-2 rounded-full transition-colors flex items-center justify-center font-bold text-[10px] w-9 h-9 uppercase"
            >
              {lang}
            </button>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              title="Tema Değiştir"
              className="bg-slate-200 border-transparent text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 p-2 rounded-full transition-colors flex items-center justify-center"
            >
              {isDarkMode ? <Sun size={18} className="text-yellow-500" /> : <Moon size={18} />}
            </button>
            <button 
              onClick={() => setShowInfoModal(true)}
              title={texts.aboutApp}
              className="bg-blue-100 hover:bg-blue-200 text-blue-800 dark:bg-blue-900/50 dark:text-blue-100 dark:hover:bg-blue-800/80 p-2 rounded-full transition-colors flex items-center justify-center"
            >
              <Info size={18} />
            </button>
            <button 
              onClick={() => setShowFeedbackModal(true)}
              title={texts.feedbackTitle}
              className="bg-amber-100 hover:bg-amber-200 text-amber-800 dark:bg-amber-900/50 dark:text-amber-100 dark:hover:bg-amber-800/80 p-2 rounded-full transition-colors flex items-center justify-center"
            >
              <MessageSquare size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Card Arena Setup */}
      <div className="flex items-center justify-center w-full max-w-[900px] gap-2 sm:gap-6 z-10 px-2 sm:px-4 mb-8">
        <button onClick={prevCard} title={texts.prevQuestion} className="hidden sm:flex w-12 h-12 bg-blue-100 border-transparent text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/80 rounded-full items-center justify-center transition-colors shadow-sm shrink-0">
          <ChevronLeft size={24} />
        </button>

        <div className="card-container flex-1 max-w-[700px] h-[380px] sm:h-[440px] cursor-pointer z-10" onClick={() => setIsFlipped(!isFlipped)}>
          <div className={`flash-card w-full h-full relative rounded-2xl shadow-lg border border-slate-100 ${isFlipped ? 'flipped' : ''}`}>
            
            {/* Front */}
            <div className="card-face absolute w-full h-full bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-10 flex flex-col items-center justify-center text-center border-t-[6px] border-t-blue-500 overflow-y-auto shadow-sm">
              <div className="absolute top-5 left-5 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">{texts.question}</div>
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
                    <div className="flex gap-4 mb-3">
                      {currentCard?.ipucu && (
                        <button 
                          title={texts.showHint}
                          onClick={(e) => { e.stopPropagation(); setShowHintModal(true); }}
                          className="bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 p-3 rounded-full hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors"
                        >
                          <HelpCircle size={20} />
                        </button>
                      )}
                      <button title={texts.viewAnswer} className="bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-400 p-3 rounded-full hover:bg-blue-100 dark:hover:bg-slate-600 transition-colors">
                        <RefreshCw size={20} />
                      </button>
                    </div>
                    {currentCard.soru_atif && (
                      <a 
                        href={`https://www.google.com/search?q=${encodeURIComponent(currentCard.soru_atif)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs italic text-slate-400 dark:text-slate-500 mt-2 pt-4 border-t border-slate-100 dark:border-slate-700 w-full break-words block hover:text-blue-500 dark:hover:text-blue-400 transition-colors z-20"
                      >
                        {texts.source} {currentCard.soru_atif}
                      </a>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-red-500 font-bold">{texts.noData}</div>
              )}
            </div>
            
            {/* Back */}
            <div className="card-face card-back absolute w-full h-full bg-slate-800 dark:bg-slate-700 rounded-2xl p-6 md:p-10 flex flex-col items-center justify-center text-center border-t-[6px] text-white border-t-slate-400 overflow-y-auto">
              <div className="absolute top-5 left-5 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">{texts.answer}</div>
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
                        {texts.source} {currentCard.cevap_atif}
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-red-400 font-bold">{texts.noData}</div>
              )}
            </div>
            
          </div>
        </div>

        <button onClick={nextCard} title={texts.nextQuestion} className="hidden sm:flex w-12 h-12 bg-blue-100 border-transparent text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/80 rounded-full items-center justify-center transition-colors shadow-sm shrink-0">
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center w-full max-w-md mb-8 z-10 px-4">
        <div className="flex items-center justify-between w-full mb-3 sm:hidden">
          <button onClick={prevCard} title={texts.prevQuestion} className="w-12 h-12 bg-blue-100 border-transparent text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/80 rounded-full flex items-center justify-center transition-colors shadow-sm shrink-0">
            <ChevronLeft size={24} />
          </button>
          
          <button onClick={nextCard} title={texts.nextQuestion} className="w-12 h-12 bg-blue-100 border-transparent text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/80 rounded-full flex items-center justify-center transition-colors shadow-sm shrink-0">
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="flex flex-col items-center flex-1 px-4 w-full">
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
      </div>

      <div className="flex gap-6 mb-12 z-10 w-full justify-center px-4">
        <button onClick={() => markCard('Öğrenildi')} title={texts.markLearned} className="w-16 h-16 bg-emerald-100 border-transparent text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-800/80 rounded-full flex items-center justify-center transition-colors shadow-sm">
          <Check size={32} />
        </button>
        <button onClick={() => markCard('Tekrar Edilecek')} title={texts.markToRepeat} className="w-16 h-16 bg-red-100 border-transparent text-red-700 dark:bg-red-900/50 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800/80 rounded-full flex items-center justify-center transition-colors shadow-sm">
          <RefreshCw size={32} />
        </button>
      </div>

      {/* RSS */}
      <div className="w-full max-w-[700px] bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm mb-12 z-10 mx-4">
        <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 border-b-2 border-slate-100 dark:border-slate-700 pb-3 mb-4 mt-0">{texts.rssTitle}</h3>
        {rssLoading ? (
          <div className="text-slate-500 text-sm">Haberler yükleniyor...</div>
        ) : rssError || rssItems.length === 0 ? (
          <div className="text-red-500 font-bold text-sm">{texts.noData} (Ağ kısıtlaması)</div>
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
