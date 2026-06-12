import { NavLink } from "react-router-dom";
import Icon from "./Icon";
import { TABS } from "../data/tabs";

export default function NavBar() {
  return (
    <nav className="nav-bar">
      <div className="nav-inner">
        {TABS.map(t => (
          <NavLink
            key={t.id}
            to={t.path}
            className={({ isActive }) => `nav-btn${isActive ? " active" : ""}`}
            end={t.id === "quran"}
          >
            <Icon name={t.icon} size={16} />
            {t.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}