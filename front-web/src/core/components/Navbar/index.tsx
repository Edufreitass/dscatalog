import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './styles.scss';

const Navbar = () => (
  <nav className="row bg-primary main-nav">
    <div className="col-3">
      <Link to="/" className="nav-logo-text">
        <h4>DS Catalog</h4>
      </Link>
    </div>
    <div className="col-6">
      <ul className="main-menu">
        <li>
          <NavLink to="/" exact>
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink to="/products">
            CATÁLOGO
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin">
            ADMIN
          </NavLink>
        </li>
      </ul>
    </div>
    <div className="col-3 text-right">
      LOGIN
    </div>
  </nav>
);

export default Navbar;