import ProfileMenu from "../ProfileMenu/ProfileMenu";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.scss";
import LogoNetshoes from "../../assets/logo-netshoes.svg"; 
import HeartIcon from "../../assets/icons/heart.svg?react";
export default function NavBar() {

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

        <ProfileMenu />
      </div>
    </header>
  );
}
