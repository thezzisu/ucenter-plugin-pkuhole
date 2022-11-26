import { definePlugin } from '@ucenter/ui/src/plugin'
import { h } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

export default definePlugin({
  name: 'pkuhole',
  routes: [
    {
      path: '/hole',
      component: () => import('./HoleHome.vue')
    },
    {
      path: '/hole/:pid',
      component: () => import('./HoleOne.vue'),
      props: true
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
