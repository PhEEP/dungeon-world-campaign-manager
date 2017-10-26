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
import DWCMNav from '@/components/DWCMNav'
import firebase from 'firebase'

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
      components: { default: Hello, nav: DWCMNav },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/campaigns',
      name: 'Campaigns',
      components: { default: Campaigns, nav: DWCMNav },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/characters',
      name: 'Characters',
      components: { default: Characters, nav: DWCMNav },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/character/:id',
      name: 'Character',
      components: { default: Character, nav: DWCMNav },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/characters/new/:className',
      name: 'New Character',
      components: { default: CharacterNew, nav: DWCMNav },
      meta: { requiresAuth: true }
    },
    {
      path: '/characters/admin/:className',
      name: 'CharactersAdmin',
      components: { default: CharactersAdmin, nav: DWCMNav },
      meta: { requiresAuth: true }
    },
    {
      path: '/compendium',
      name: 'Compendium',
      components: { default: Compendium, nav: DWCMNav },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      components: { default: Profile, nav: DWCMNav },
      meta: {
        requiresAuth: true
      }
    }
  ],
  linkActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser) next('hello')
  else next()
})

export default router
