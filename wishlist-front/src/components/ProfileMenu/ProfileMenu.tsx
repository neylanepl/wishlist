import { useState } from "react";
import styles from "../NavBar/NavBar.module.scss";
import ProfileIcon from "../../assets/icons/profile.svg?react";

export default function ProfileMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className={styles.profile}
      onMouseEnter={() => setMenuOpen(true)}
      onMouseLeave={() => setMenuOpen(false)}
      tabIndex={0}
      aria-label="perfil"
      aria-haspopup="true"
      aria-expanded={menuOpen}
    >
      <button className={styles.profileBtn} aria-label="Abrir menu de perfil">
        <ProfileIcon className={styles.iconUser} />
      </button>

      {menuOpen && (
        <ul className={styles.dropdown} role="menu" aria-label="menu de perfil">
          <li><a role="menuitem" href="#">Entrar</a></li>
          <li><a role="menuitem" href="#">Minha Conta</a></li>
          <li><a role="menuitem" href="#">Endereços</a></li>
          <li><a role="menuitem" href="#">Minha Netshoes</a></li>
        </ul>
      )}
    </div>
  );
}
