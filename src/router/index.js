import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
let router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/front/index'
    },
    {
      path: '/',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      meta: { title: '自述文件' },
      children: [
        {
          path: '/dashboard',
          component: resolve => require(['../components/page/Dashboard.vue'], resolve),
          meta: { title: '系统首页' }
        },
        {
          path: '/icon',
          component: resolve => require(['../components/page/Icon.vue'], resolve),
          meta: { title: '自定义图标' }
        },
        {
          path: '/articleList',
          component: resolve => require(['../components/page/Article/List/index.vue'], resolve),
          meta: { title: '文章列表' }
        },
        {
          path: '/tabs',
          component: resolve => require(['../components/page/Tabs.vue'], resolve),
          meta: { title: 'tab选项卡' }
        },
        {
          path: '/form',
          component: resolve => require(['../components/page/BaseForm.vue'], resolve),
          meta: { title: '基本表单' }
        },
        {
          // 富文本编辑器组件
          path: '/editor',
          component: resolve => require(['../components/page/VueEditor.vue'], resolve),
          meta: { title: '富文本编辑器' }
        },
        {
          // 富文本编辑器组件
          path: '/category',
          component: resolve => require(['../components/page/Category/Index/index.vue'], resolve),
          meta: { title: '菜单分类' }
        },
        {
          // 富文本编辑器组件
          path: '/add',
          component: resolve => require(['../components/page/Article/Add/index.vue'], resolve),
          meta: { title: '添加文章' }
        },
        {
          // markdown组件
          path: '/markdown',
          component: resolve => require(['../components/page/Markdown.vue'], resolve),
          meta: { title: 'markdown编辑器' }
        },
        {
          // 图片上传组件
          path: '/upload',
          component: resolve => require(['../components/page/Upload.vue'], resolve),
          meta: { title: '文件上传' }
        },
        {
          // vue-schart组件
          path: '/charts',
          component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
          meta: { title: 'schart图表' }
        },
        {
          // 拖拽列表组件
          path: '/drag',
          component: resolve => require(['../components/page/DragList.vue'], resolve),
          meta: { title: '拖拽列表' }
        },
        {
          // 拖拽Dialog组件
          path: '/dialog',
          component: resolve => require(['../components/page/DragDialog.vue'], resolve),
          meta: { title: '拖拽弹框' }
        },
        {
          // 权限页面
          path: '/permission',
          component: resolve => require(['../components/page/Permission.vue'], resolve),
          meta: { title: '权限测试', permission: true }
        },
        {
          path: '/404',
          component: resolve => require(['../components/page/404.vue'], resolve),
          meta: { title: '404' }
        },
        {
          path: '/403',
          component: resolve => require(['../components/page/403.vue'], resolve),
          meta: { title: '403' }
        }
      ]
    },
    {
      path: '/console',
      name: 'login',
      component: resolve => require(['../components/page/Login/Login.vue'], resolve)
    },
    {
      path: '/front/index',
      name: 'frontIndex',
      component: resolve => require(['../components/page/Font/index.vue'], resolve)
    },
    {
      path: '/front/detail',
      name: 'frontDetail',
      component: resolve => require(['../components/page/Font/detail.vue'], resolve)
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
export default router
