import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import Campaigns from '@/components/Campaigns'
import Characters from '@/components/Characters/Characters'
import CharactersAdmin from '@/components/CharactersAdmin/CA'
import CharacterNew from '@/components/Characters/CharacterNew'
import Character from '@/components/Character/Character'
import Compendium from '@/components/Compendium'
import Profile from '@/components/Profile'
import AuthGuard from '@/router/auth-guard'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/signup',
      component: SignUp
    },
    {
      path: '/hello',
      components: { default: Hello }
    },
    {
      path: '/campaigns',
      components: { default: Campaigns },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/characters',
      components: { default: Characters },
      beforeEnter: AuthGuard
    },
    {
      path: '/character/:id',
      components: { default: Character },
      beforeEnter: AuthGuard
    },
    {
      path: '/characters/new/:classId',
      components: { default: CharacterNew },
      beforeEnter: AuthGuard,
      props: { default: true }
    },
    {
      path: '/characters/admin/:classId',
      components: { default: CharactersAdmin },
      beforeEnter: AuthGuard,
      props: { default: true }
    },
    {
      path: '/compendium',
      components: { default: Compendium }
    },
    {
      path: '/profile',
      components: { default: Profile },
      beforeEnter: AuthGuard
    }
  ],
  linkActiveClass: 'active',
  mode: 'hash'
})

export default router
