import { store } from '@/store'

export default (to, from, next) => {
  console.log(store.getters.loading)
  if (store.getters.user) {
    next()
  } else {
    next('/login')
  }
}
