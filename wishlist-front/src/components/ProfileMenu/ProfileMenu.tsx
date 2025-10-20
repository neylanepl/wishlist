import { useState } from "react";
import styles from "./ProfileMenu.module.scss";
import ProfileIcon from "../../assets/icons/profile.svg?react";

export default function ProfileMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setMenuOpen(false);
    }
  };

  return (
    <div
      className={styles.profile}
      onMouseEnter={() => setMenuOpen(true)}
      onMouseLeave={() => setMenuOpen(false)}
      onBlur={handleBlur}
      aria-label="perfil"
      aria-haspopup="true"
      aria-expanded={menuOpen}
    >
      <button 
        className={styles.profileBtn} 
        aria-label="Abrir menu de perfil"
        onClick={toggleMenu}
        onFocus={() => setMenuOpen(true)}
      >
        <ProfileIcon className={styles.iconUser} />
      </button>

      {menuOpen && (
        <ul className={styles.dropdown} role="menu" aria-label="menu de perfil">
          <li>
            <button role="menuitem" type="button">Entrar</button>
          </li>
          <li>
            <button role="menuitem" type="button">Minha Conta</button>
          </li>
          <li>
            <button role="menuitem" type="button">Endereços</button>
          </li>
          <li>
            <button role="menuitem" type="button">Minha Netshoes</button>
          </li>
        </ul>
      )}
    </div>
  );
}
