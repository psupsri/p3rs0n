import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import Home from '@/pages/Home'
import SignIn from '@/pages/SignIn'
// import User from '@/pages/User'
// import UserCreate from '@/pages/UserCreate'
import People from '@/pages/People'
import PeopleCreate from '@/pages/PeopleCreate'
import PeopleById from '@/pages/PeopleById'
import PeopleEdit from '@/pages/PeopleEdit'
import PeopleSearch from '@/pages/PeopleSearch'
import Organization from '@/pages/Organization'
import OrganizationCreate from '@/pages/OrganizationCreate'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'is-active',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: { requiresAuth: true },
      children: [
        { path: '/home', name: 'Home', component: Home },
        // { path: '/user', name: 'User', component: User },
        // { path: '/user/new', name: 'UserCreate', component: UserCreate },
        { path: '/people', name: 'People', component: People },
        { path: '/people/new', name: 'PeopleCreate', component: PeopleCreate },
        { path: '/people/id/:id', name: 'PeopleById', component: PeopleById },
        { path: '/people/id/edit/:id', name: 'PeopleEdit', component: PeopleEdit },
        { path: '/organization', name: 'Organization', component: Organization },
        { path: '/organization/new', name: 'OrganizationCreate', component: OrganizationCreate },
        { path: '/searching', name: 'PeopleSearch', component: PeopleSearch }
      ]
    },
    { path: '/signin', name: 'SignIn', component: SignIn },
    { path: '*', redirect: '/home' }
  ]
})
