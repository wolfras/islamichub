import Icon from "./Icon";

export default function CardLink({ href, label = "Visit →" }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="card-link">
      {label} <Icon name="arrow" size={14} />
    </a>
  );
}