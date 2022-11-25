import { definePlugin, api } from '@ucenter/ui/src/plugin'
import { h } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

export default definePlugin({
  name: 'pkuhole',
  routes: [
    {
      path: '/hole',
      component: () => import('./HoleHome.vue'),
      beforeEnter(to, from, next) {
        if (api.isLoggedIn.value) {
          next()
        } else {
          next('/login')
        }
      }
    }
  ],
  mainMenu: () => {
    const { t } = useI18n()
    return [
      {
        key: 'hole',
        label: () => h(RouterLink, { to: '/hole' }, () => t('hole'))
      }
    ]
  },
  locales: {
    en: {
      hole: 'Hole'
    },
    zh: {
      hole: '树洞'
    }
  },
  policies: ['center:hole']
})
