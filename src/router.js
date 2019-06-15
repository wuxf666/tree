import Vue from 'vue'
import Router from 'vue-router'
import StepOne from './views/wone.vue'
import Course from './views/course.vue'
import Skill from './views/skill.vue'
import SkillDetail from './views/skilldetail.vue'
import Answer from './views/answer.vue'
import Result from './views/result.vue'
Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component:StepOne,
      meta: {
        title: "welcome"
      }
    },
    {
      path: '/course',
      name: 'course',
      component:Course,
      meta: {
        title: "职业技能"
      }
    },
    {
      path: '/skill',
      name: 'skill',
      component:Skill,
      meta: {
        title: "织金树"
      }
    },
    {
      path: '/skilldetail',
      name: 'skilldetail',
      component:SkillDetail,
      meta: {
        title: "技能等级"
      }
    },
    {
      path: '/answer',
      name: 'answer',
      component:Answer,
      meta: {
        title: "技能问答"
      }
    },
    {
      path: '/result',
      name: 'result',
      component:Result,
      meta: {
        title: "结果"
      }
    }
  ]
});
router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  if (to.meta.title) {
      document.title = to.meta.title;
  }
  next();
});
export default router;
