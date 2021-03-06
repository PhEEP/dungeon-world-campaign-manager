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
import PlayerCharacter from '@/components/PlayerCharacter/PlayerCharacter'
import Compendium from '@/components/Compendium/Compendium'
import EquipmentView from '@/components/Compendium/EquipmentView'
import EquipmentAdmin from '@/components/Compendium/EquipmentAdmin'
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
      component: Login,
      name: 'Login'
    },
    {
      path: '/signup',
      component: SignUp,
      name: 'SignUp'
    },
    {
      path: '/hello',
      components: { default: Hello },
      name: 'Hello'
    },
    {
      path: '/campaigns',
      components: { default: Campaigns },
      meta: {
        requiresAuth: true
      },
      name: 'Campaigns'
    },
    {
      path: '/characters',
      components: { default: Characters },
      beforeEnter: AuthGuard,
      name: 'Characters'
    },
    {
      path: '/character/:id',
      components: { default: Character },
      beforeEnter: AuthGuard,
      name: 'Character'
    },
    {
      path: '/playerCharacter/:id',
      components: { default: PlayerCharacter },
      beforeEnter: AuthGuard,
      name: 'PlayerCharacter'
    },
    {
      path: '/characters/new/:classId',
      components: { default: CharacterNew },
      beforeEnter: AuthGuard,
      props: { default: true },
      name: 'CharacterNew'
    },
    {
      path: '/characters/admin/:classId',
      components: { default: CharactersAdmin },
      beforeEnter: AuthGuard,
      props: { default: true },
      name: 'CharactersAdmin'
    },
    {
      path: '/compendium/equipment/admin/',
      components: { default: EquipmentAdmin },
      beforeEnter: AuthGuard,
      name: 'EquipmentAdmin'
    },
    {
      path: '/compendium/equipment/',
      components: { default: EquipmentView },
      beforeEnter: AuthGuard,
      name: 'EquipmentView'
    },
    {
      path: '/compendium',
      components: { default: Compendium },
      name: 'Compendium'
    },
    {
      path: '/profile',
      components: { default: Profile },
      beforeEnter: AuthGuard,
      name: 'Profile'
    }
  ],
  linkActiveClass: 'active',
  mode: 'hash'
})

export default router
