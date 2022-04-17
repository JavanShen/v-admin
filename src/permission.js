import router from './router';

// router.beforeEach(async (to, from, next) => {
//   if (to.path === '/login') {
//     next();
//   } else {
//     const token = getToken();
//     if (token===undefined) {
//       next({name:'Login'});
//     } else {
//       if(store.getters.isRoute){
//         next();
//       }else{
//         try{
//           await store.dispatch('getUserInfo',token)
//           next({...to,replace:true});
//         }catch(e){
//           next({name:'Login'});
//         }
//       }
//     }
//   }
// });

export default router;