import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.scss";
import LogoNetshoes from "../../assets/logo-netshoes.svg"; 
import HeartIcon from "../../assets/icons/heart.svg?react";
import ProfileIcon from "../../assets/icons/profile.svg?react";
export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.navbar}>
      <div className={styles.logo}>
        <img src={LogoNetshoes} alt="Netshoes" />
      </div>

      <div className={styles.actions}>
        <Link to="/wishlist" className={styles.wishlist}>
          <HeartIcon className={styles.iconHeart} />
          Wishlist
        </Link>

        <div
          className={styles.profile}
          onMouseEnter={() => setMenuOpen(true)}
          onMouseLeave={() => setMenuOpen(false)}
          tabIndex={0}
          aria-label="perfil"
          aria-haspopup="true"
          aria-expanded={menuOpen}
        >
          <button className={styles.profileBtn} aria-label="Abrir menu de perfil"><ProfileIcon className={styles.iconUser} /></button>
        
          {menuOpen && (
            <ul className={styles.dropdown} role="menu" aria-label="menu de perfil">
              <li><a href="#">Entrar</a></li>
              <li><a href="#">Minha Conta</a></li>
              <li><a href="#">Endereços</a></li>
              <li><a href="#">Minha Netshoes</a></li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}
