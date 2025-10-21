import ProfileMenu from "../ProfileMenu/ProfileMenu";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.scss";
import LogoNetshoes from "../../assets/logo-netshoes.svg";
import HeartIcon from "../../assets/icons/heart.svg?react";

export default function NavBar() {
  return (
    <header className={styles.navbar} role="banner" aria-label="Navegação principal">
        <div className={styles.logo}>
          <Link to="/" aria-label="Página inicial">
            <img src={LogoNetshoes} alt="Netshoes" />
          </Link>
        </div>
        <div className={styles.actions}>
          <Link to="/wishlist" className={styles.wishlist} aria-label="wishlist">
            <HeartIcon className={styles.iconHeart} />
            Wishlist
          </Link>
          <ProfileMenu />
        </div>
    </header>

  );
}
