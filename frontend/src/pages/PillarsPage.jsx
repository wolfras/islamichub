import SectionHeading from "../components/SectionHeading";
import { PILLARS } from "../data/pillars";

export default function PillarsPage() {
  return (
    <div>
      <div className="page-header">
        <div className="bismillah">أَرْكَانُ الإِسْلَامِ الخَمْسَة</div>
        <h2>The Five Pillars of Islam</h2>
        <p>The structural framework of Islamic practice — the five acts that define Muslim life.</p>
      </div>

      <SectionHeading title="The Five Pillars" tag="Fard — Obligatory" />
      <div className="pillars-grid">
        {PILLARS.map((p, i) => (
          <div className="pillar-card" key={p.name}>
            <div className="pillar-num">{i + 1}</div>
            <div className="pillar-icon">{p.icon}</div>
            <div className="pillar-name">{p.name}</div>
            <div className="pillar-arabic">{p.arabic}</div>
            <p className="pillar-desc">{p.desc}</p>
          </div>
        ))}
      </div>

      <div className="concept-box">
        <h3>📖 Quranic Foundation</h3>
        <p>"And I did not create the jinn and mankind except to worship Me." — (Quran 51:56)</p>
        <p>"Righteousness is not that you turn your faces toward the east or the west, but true righteousness is in one who believes in Allah, the Last Day, the angels, the Book, and the prophets..." — (Quran 2:177)</p>
        <div className="hadith-quote">"Islam is built upon five things: the testimony that there is no god but Allah and that Muhammad is His messenger, establishing prayer, giving Zakat, the pilgrimage, and fasting Ramadan." — Sahih al-Bukhari 8</div>
      </div>
    </div>
  );
}