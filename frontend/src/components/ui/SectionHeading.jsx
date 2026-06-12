export default function SectionHeading({ title, tag }) {
  return (
    <div className="sec-heading">
      <h3>{title}</h3>
      <div className="sec-divider" />
      {tag && <span className="sec-tag">{tag}</span>}
    </div>
  );
}