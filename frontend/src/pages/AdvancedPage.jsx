import SectionHeading from "../components/SectionHeading";
import CardLink from "../components/CardLink";
import { LIBRARIES } from "../data/libraries";

const topics = [
  { icon: "🛡️", name: "Aqeedah (Creed)", desc: "Kitaab at-Tawheed, Aqeedah al-Waasitiyyah, Sharh al-Aqeedah at-Tahaawiyyah — the pillars of correct Islamic belief.", link: "https://emaanlibrary.com/category/aqeedah-emaan/" },
  { icon: "📖", name: "Tafsir", desc: "Tafsir Ibn Kathir, Tafsir al-Jalalayn, Tafsir as-Sa'di, and advanced word-by-word Quranic studies.", link: "https://emaanlibrary.com/category/quran/" },
  { icon: "⚖️", name: "Usool al-Fiqh", desc: "Al-Waraqat, Rawdat al-Nazir, Buloogh al-Maram, Zaad al-Mustaqni' — principles of Islamic jurisprudence.", link: "https://emaanlibrary.com/category/fiqh/" },
  { icon: "💚", name: "Tazkiyah", desc: "Ihya Ulum ad-Din (Ghazali), Madarij as-Salikin (Ibn Qayyim), Riyad as-Salihin — purify and elevate the soul.", link: "https://emaanlibrary.com/category/tazkiyah/" },
  { icon: "📜", name: "Sirah & History", desc: "Ar-Raheeq al-Makhtum, Al-Bidayah wa an-Nihayah (Ibn Kathir), Biographies of the Salaf.", link: "https://emaanlibrary.com/category/biographies/" },
  { icon: "🎙️", name: "Hadith Sciences", desc: "Nukhbat al-Fikr, Al-Bayquniyyah, advanced Sharh of Sahih al-Bukhari and Sahih Muslim.", link: "https://emaanlibrary.com/category/hadith/" },
  { icon: "✍️", name: "Arabic Language", desc: "Ajrumiyyah, Alfiyyah of Ibn Malik — master the language of the Quran from foundation to fluency.", link: "https://emaanlibrary.com" },
  { icon: "🔬", name: "Usool al-Hadith", desc: "The science of Hadith classification — Mustalah al-Hadith, Uloom al-Hadith, chain analysis.", link: "https://emaanlibrary.com/category/hadith/" },
];

export default function AdvancedPage() {
  return (
    <div>
      <div className="page-header">
        <div className="bismillah">طَلَبُ الْعِلْمِ فَرِيضَةٌ</div>
        <h2>Advanced Islamic Sciences</h2>
        <p>"Seeking knowledge is an obligation upon every Muslim." — Ibn Majah &nbsp;|&nbsp; Classical texts, free PDFs, and authentic lectures.</p>
      </div>

      <div className="stats-row">
        <div className="stat-card"><div className="stat-num">&gt;17k</div><div className="stat-label">Books on EmaanLibrary</div></div>
        <div className="stat-card"><div className="stat-num">&gt;10k</div><div className="stat-label">Audio Lectures</div></div>
        <div className="stat-card"><div className="stat-num">&gt;50k</div><div className="stat-label">Video Lectures</div></div>
        <div className="stat-card"><div className="stat-num">100+</div><div className="stat-label">Languages</div></div>
      </div>

      <SectionHeading title="Core Advanced Topics" tag="For Students of Knowledge" />
      <div className="grid">
        {topics.map(r => (
          <div className="card" key={r.name}>
            <div className="card-icon">{r.icon}</div>
            <h4>{r.name}</h4>
            <p>{r.desc}</p>
            <CardLink href={r.link} />
          </div>
        ))}
      </div>

      <div className="concept-box" style={{ marginTop: 32 }}>
        <h3>💡 Recommended Study Path</h3>
        <p>Kitaab at-Tawheed → Thalaathat al-Usool → Al-Aqeedah al-Waasitiyyah → Buloogh al-Maram → Ar-Raheeq al-Makhtum</p>
        <p>All of these are freely available on the libraries above. Always study with a qualified teacher when possible.</p>
        <div className="hadith-quote">"Whoever Allah wants good for, He gives him understanding of the religion." — Sahih al-Bukhari</div>
      </div>

      <div style={{ marginTop: 24 }}>
        <SectionHeading title="Free Digital Libraries" tag="Thousands of PDFs" />
        <div className="library-banner">
          <div className="lib-grid">
            {LIBRARIES.map(l => (
              <div className="lib-item" key={l.name}>
                <h4>{l.name}</h4>
                <p>{l.desc}</p>
                <a href={l.link} target="_blank" rel="noopener noreferrer" className="lib-link">Visit →</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}