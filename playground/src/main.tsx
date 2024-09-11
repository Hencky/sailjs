import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Routes from '@/routes';

import 'antd/lib/style/index'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Routes />
  </StrictMode>
);
