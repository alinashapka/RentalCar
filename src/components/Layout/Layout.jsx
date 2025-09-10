import { NavLink, Outlet } from "react-router-dom";
import clsx from "clsx";
import css from "./Layout.module.css";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

function Layout() {
  return (
    <div className={css.container}>
      <header className={css.header}>
        <nav className={css.nav}>
          {/* Logo */}
          <NavLink to="/" className={css.logo}>
            Rental<span className={css.accent}>Car</span>
          </NavLink>
          {/* NavList */}
          <NavLink to="/" className={buildLinkClass}>
            Home
          </NavLink>
          <NavLink to="/catalog" className={buildLinkClass}>
            Catalog
          </NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
