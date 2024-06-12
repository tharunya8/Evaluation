'use client';

import { Provider } from 'react-redux';
import './global.css';
import store from '../../redux/store';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Provider store={store}>
        <body>{children}</body>
      </Provider>
    </html>
  )
}
