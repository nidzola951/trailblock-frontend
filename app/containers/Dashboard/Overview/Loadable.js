/**
 * Asynchronously loads the component for NotFoundPage
 */
import Loadable from 'react-loadable';
import LoadingIndicator from '../../../components/LoadingIndicator/index';

export default Loadable({
  loader: () => import('./Overview.js'),
  loading: LoadingIndicator
});
