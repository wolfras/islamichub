export default function VerseBox({ arabic, translation, reference }) {
  return (
    <div className="verse-box">
      <div className="verse-arabic">{arabic}</div>
      <div className="verse-translation">{translation}</div>
      <div className="verse-ref">{reference}</div>
    </div>
  );
}