import { definePlugin } from '@ucenter/ui/src/plugin'
import { h } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

export default definePlugin({
  name: 'pkuhole',
  routes: [
    {
      path: '/hole',
      component: () => import('./HoleLayout.vue'),
      children: [
        {
          path: '',
          component: () => import('./HoleHome.vue')
        },
        {
          path: 'search',
          component: () => import('./HoleSearch.vue')
        },
        {
          path: 'recover/:pid',
          component: () => import('./HoleRecover.vue'),
          props: true
        },
        {
          path: ':pid',
          component: () => import('./HoleOne.vue'),
          props: true
        }
      ]
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
      'copy-hole-id': 'Copy Hole ID',
      'load-more': 'Load More',
      'no-comment': 'No comment yet...',
      'recover-alert':
        'You are viewing a hole that is stored in our archiver database. It may not be the latest version of the hole.',
      search: 'Search',
      settings: 'Settings',
      'some-keywords': 'Some keywords...',
      'hole-token': 'Hole Token',
      'hole-proxy': 'Hole Proxy',
      'anonymous-mode': 'Anonymous Mode',
      tips: 'Tips',
      'search-pid-tips':
        'It seems that you have entered a hole ID, do you want to go to that hole?',
      'goto-hole': 'Yes',
      'do-search': 'No',
      help: 'Help',
      'source-code': 'Source Code',
      reverse: 'Reverse',
      'hole-deleted': 'Hole deleted',
      'hole-welcome': 'Welcome to PKUHole!',
      'deletion-only': 'Only show deleted holes',
      'failed-to-recover': 'Failed to recover',
      error: 'Error',
      success: 'Success',
      'post-hole': 'Post Hole',
      'hole-text-placeholder': 'Some content...',
      'send-reply': 'Send Reply'
    },
    zh: {
      hole: '树洞',
      'view-in-pkuhelper': '官方版本',
      reload: '刷新',
      'copy-hole-id': '复制树洞ID',
      'load-more': '加载更多',
      'no-comment': '暂无评论...',
      'recover-alert': '您正在查看的树洞已被存档，可能不是最新版本。',
      search: '搜索',
      settings: '设置',
      'some-keywords': '搜啥好捏',
      'hole-token': '树洞Token',
      'hole-proxy': '树洞代理',
      'anonymous-mode': '匿名模式',
      tips: '提示',
      'search-pid-tips': '你输入了一个可能的树洞ID，是否跳转到该树洞？',
      'goto-hole': '前去吃瓜',
      'do-search': '我要搜索',
      help: '帮助',
      'source-code': '源代码',
      reverse: '倒序',
      'hole-deleted': '树洞已被删除',
      'hole-welcome': '欢迎来到北大树洞',
      'deletion-only': '只看被和谐的洞',
      'failed-to-recover': '恢复失败',
      error: '发生错误',
      success: '操作成功',
      'post-hole': '发洞',
      'hole-text-placeholder': '说点什么吧...',
      'send-reply': '发送回复'
    }
  },
  policies: ['center:hole']
})
