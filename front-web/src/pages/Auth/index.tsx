import React from 'react';
import { ReactComponent as AuthImage } from 'core/assets/images/auth.svg'
import './styles.scss';

const Auth = () => (
  <div className="auth-container">
    <div className="auth-info">
      <h1 className="auth-info-title">
        Divulgue seus produtos <br /> no DS Catalog
      </h1>
      <p className="auth-info-subtitle">
        Faça parte do nosso catálogo de divulgação e <br /> aumente a venda dos seus produtos.
      </p>
      <AuthImage />
    </div>
    <div className="auth-content">
      <h1>Formulário</h1>
    </div>
  </div>
);

export default Auth;