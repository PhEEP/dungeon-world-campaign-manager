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
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/hello',
      name: 'Hello',
      components: { default: Hello }
    },
    {
      path: '/campaigns',
      name: 'Campaigns',
      components: { default: Campaigns },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/characters',
      name: 'Characters',
      components: { default: Characters },
      beforeEnter: AuthGuard
    },
    {
      path: '/character/:id',
      name: 'Character',
      components: { default: Character },
      beforeEnter: AuthGuard
    },
    {
      path: '/characters/new/:className',
      name: 'New Character',
      components: { default: CharacterNew },
      beforeEnter: AuthGuard,
      props: { default: true }
    },
    {
      path: '/characters/admin/:className',
      name: 'CharactersAdmin',
      components: { default: CharactersAdmin },
      beforeEnter: AuthGuard,
      props: { default: true }
    },
    {
      path: '/compendium',
      name: 'Compendium',
      components: { default: Compendium }
    },
    {
      path: '/profile',
      name: 'Profile',
      components: { default: Profile },
      beforeEnter: AuthGuard
    }
  ],
  linkActiveClass: 'active',
  mode: 'history'
})

export default router
