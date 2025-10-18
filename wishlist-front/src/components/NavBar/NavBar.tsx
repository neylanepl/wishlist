import React, { useState } from "react";
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
        <a href="#" className={styles.wishlist}>
          {<HeartIcon className={styles.iconHeart} />}
          Wishlist
        </a>

        <div
          className={styles.profile}
          onMouseEnter={() => setMenuOpen(true)}
          onMouseLeave={() => setMenuOpen(false)}
          tabIndex={0}
        >
          {<button className={styles.profileBtn}><ProfileIcon className={styles.iconUser} /></button>}
        
          {menuOpen && (
            <ul className={styles.dropdown}>
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
