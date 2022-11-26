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
      hole: 'Hole',
      'view-in-pkuhelper': 'View in PKUHelper',
      reload: 'Reload',
      'load-more': 'Load More',
      'no-comment': 'No comment yet...'
    },
    zh: {
      hole: '树洞',
      'view-in-pkuhelper': '官方版本',
      reload: '刷新',
      'load-more': '加载更多',
      'no-comment': '暂无评论...'
    }
  },
  policies: ['center:hole']
})
