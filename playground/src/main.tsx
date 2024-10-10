import { StrictMode } from 'react';
import ReactDom from 'react-dom';
import Routes from '@/routes';

// render(document.getElementById('root')!).render(
//   <StrictMode>
//     <Routes />
//   </StrictMode>
// );


ReactDom.render(<Routes />, document.getElementById('root')!);