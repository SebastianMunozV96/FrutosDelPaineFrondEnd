import { useAuthStore } from 'src/stores/auth';
import { NavigationGuardNext as Next, RouteLocationNormalized as RouteLocation } from 'vue-router';
import store from '../stores/index'
const storeAuth = useAuthStore(store);

const isAuthenticatedGuard = async (to: RouteLocation, from: RouteLocation, next: Next) => {
  const { ok } = await storeAuth.checkAuthentication();
  console.log('REDIRECCIONADO isAuthenticatedGuard: ', ok);
  if (ok) next();
  else next({ name: 'login' });
};

export default isAuthenticatedGuard;
