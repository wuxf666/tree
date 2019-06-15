import Vue from 'vue'
import Router from 'vue-router'
import StepOne from './views/wone.vue'
import Course from './views/course.vue'
import Skill from './views/skill.vue'
import SkillDetail from './views/skilldetail.vue'
import Answer from './views/answer.vue'
import Result from './views/result.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component:StepOne
    },
    {
      path: '/course',
      name: 'course',
      component:Course
    },
    {
      path: '/skill',
      name: 'skill',
      component:Skill
    },
    {
      path: '/skilldetail',
      name: 'skilldetail',
      component:SkillDetail
    },
    {
      path: '/answer',
      name: 'answer',
      component:Answer
    },
    {
      path: '/result',
      name: 'result',
      component:Result
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
