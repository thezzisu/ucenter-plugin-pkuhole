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
      path: '/hole/search',
      component: () => import('./HoleSearch.vue')
    },
    {
      path: '/hole/recover/:pid',
      component: () => import('./HoleRecover.vue'),
      props: true
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
      'no-comment': 'No comment yet...',
      'recover-alert':
        'You are viewing a hole that is stored in our archiver database. It may not be the latest version of the hole.',
      search: 'Search',
      settings: 'Settings',
      'some-keywords': 'Some keywords...',
      'hole-token': 'Hole Token',
      'anonymous-mode': 'Anonymous Mode',
      tips: 'Tips',
      'search-pid-tips':
        'It seems that you have entered a hole ID, do you want to go to that hole?',
      'goto-hole': 'Yes',
      'do-search': 'No'
    },
    zh: {
      hole: '树洞',
      'view-in-pkuhelper': '官方版本',
      reload: '刷新',
      'load-more': '加载更多',
      'no-comment': '暂无评论...',
      'recover-alert': '您正在查看的树洞已被存档，可能不是最新版本。',
      search: '搜索',
      settings: '设置',
      'some-keywords': '搜啥好捏',
      'hole-token': '树洞Token',
      'anonymous-mode': '匿名模式',
      tips: '提示',
      'search-pid-tips': '你输入了一个可能的树洞ID，是否跳转到该树洞？',
      'goto-hole': '前去吃瓜',
      'do-search': '我要搜索'
    }
  },
  policies: ['center:hole']
})
