import SectionHeading from "../components/SectionHeading";
import CardLink from "../components/CardLink";

export default function ConceptsPage() {
  return (
    <div>
      <div className="page-header">
        <div className="bismillah">أُصُولُ الإِسْلَام</div>
        <h2>Key Concepts of Islam</h2>
        <p>Foundational Islamic sciences — Tawhid, Fiqh, and Sirah explained clearly for every level of student.</p>
      </div>

      <SectionHeading title="Tawhid — Oneness of Allah" tag="Aqeedah" />
      <div className="concept-box">
        <h3>☝️ What is Tawhid?</h3>
        <p><strong>Tawhid</strong> is the central message of Islam — the absolute oneness and uniqueness of Allah. Every Prophet from Adam ﷺ to Muhammad ﷺ called their people to it.</p>
        <p><strong>1. Tawhid al-Rububiyyah:</strong> Recognizing Allah as the sole Creator, Sustainer, and Controller of all existence.</p>
        <p><strong>2. Tawhid al-Uluhiyyah:</strong> Directing all worship — prayer, fasting, sacrifice, hope, fear — exclusively to Allah alone.</p>
        <p><strong>3. Tawhid al-Asma' wa al-Sifat:</strong> Affirming Allah's names and attributes as in the Quran and Sunnah without distortion or comparison.</p>
        <div className="hadith-quote">"Say: He is Allah, the One. Allah, the Eternal Refuge. He neither begets nor is born, nor is there to Him any equivalent." — Quran 112:1–4</div>
      </div>

      <SectionHeading title="Fiqh — Islamic Jurisprudence" tag="Islamic Law" />
      <div className="concept-box" style={{ background: "var(--green-dark)" }}>
        <h3>⚖️ The Four Madhabs</h3>
        <p><strong>Fiqh</strong> is the scholarly understanding of Islamic law derived from Quran, Sunnah, Ijma (consensus), and Qiyas (analogy).</p>
        <p>• <strong>Hanafi:</strong> Imam Abu Hanifa — South Asia, Turkey, the Balkans, Central Asia</p>
        <p>• <strong>Maliki:</strong> Imam Malik ibn Anas — North Africa, West Africa, parts of the Gulf</p>
        <p>• <strong>Shafi'i:</strong> Imam al-Shafi'i — East Africa, Southeast Asia, parts of the Middle East</p>
        <p>• <strong>Hanbali:</strong> Imam Ahmad ibn Hanbal — Saudi Arabia and the Gulf states</p>
      </div>

      <SectionHeading title="Sirah — Prophetic Biography" tag="History" />
      <div className="concept-box" style={{ background: "#1e4a2e" }}>
        <h3>📜 Life of the Prophet ﷺ</h3>
        <p>The Sirah covers the life of Prophet Muhammad ﷺ from his birth in Mecca (570 CE) to his passing (632 CE).</p>
        <p>• Birth in Mecca (570 CE) &nbsp;•&nbsp; First revelation in Cave Hira (610 CE)</p>
        <p>• Hijrah to Medina (622 CE) &nbsp;•&nbsp; Battle of Badr (624 CE)</p>
        <p>• Treaty of Hudaybiyyah (628 CE) &nbsp;•&nbsp; Conquest of Mecca (630 CE)</p>
        <p>• Farewell Pilgrimage and sermon (632 CE)</p>
        <div className="hadith-quote">"Indeed in the Messenger of Allah you have an excellent example to follow for whoever hopes in Allah and the Last Day." — Quran 33:21</div>
      </div>

      <SectionHeading title="Further Resources" tag="Concepts" />
      <div className="grid">
        {[
          { icon: "📖", name: "Al-Sirah Al-Nabawiyyah", desc: "Ibn Ishaq's classical Sirah — the oldest foundational biography of the Prophet ﷺ.", link: "https://archive.org/details/TheLifeOfMohammad" },
          { icon: "🏫", name: "Islamic Online University", desc: "Free accredited courses on Aqeedah, Fiqh, Tafsir, and Sirah from qualified scholars.", link: "https://islamiconlineuniversity.com" },
          { icon: "❓", name: "IslamQA.info", desc: "Scholarly fatawa on Fiqh, Aqeedah, and daily Islamic questions — graded and verified.", link: "https://islamqa.info" },
        ].map(r => (
          <div className="card" key={r.name}>
            <div className="card-icon">{r.icon}</div>
            <h4>{r.name}</h4>
            <p>{r.desc}</p>
            <CardLink href={r.link} />
          </div>
        ))}
      </div>
    </div>
  );
}