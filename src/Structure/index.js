import React from 'react';
import css from './App.scss';

export const Main = ({children}) => (
  <div className={css.main}>
    {children}
  </div>
);

export const Header = ({children}) => (
  <header className={css.header}>
    {children}
  </header>
);

export const Body = ({children}) => (
  <div className={css.body}>
    {children}
  </div>
);

export const Content = ({children}) => (
  <div className={css.content}>
    {children}
  </div>
);

export const Nav = ({children}) => (
  <div className={css.nav}>
    {children}
  </div>
);
