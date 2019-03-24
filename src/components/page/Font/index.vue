<template>
    <div class="font-container">
        <div class="header-container">
            <div class="header">
                <el-row>
                    <el-col class="logo" :span="18" @click.native="home">
                        <img width="40%"
                             src="@/assets/img/bg.png"
                             alt="">
                    </el-col>
                    <el-col :span="6">
                        <el-input
                                class="search"
                                popper-class="my-autocomplete"
                                v-model="pageInit.keyword"
                                placeholder="请输入内容"
                        >
                            <i
                                    class="el-icon-search el-input__icon"
                                    slot="suffix"
                                    style="cursor: pointer;"
                                    @click="handleIconClick">
                            </i>
                        </el-input>
                    </el-col>
                </el-row>
            </div>
        </div>
        <el-row class="header-nav">
            <el-menu
                    class="el-menu-demo"
                    mode="horizontal"
                    @select="handleSelect"
                    background-color="#333333"
                    text-color="#fff"
                    active-text-color="#409EFF">
                <el-menu-item @click="home" index="index">
                    首页
                </el-menu-item>
                <el-submenu
                        v-for="(item,index) in list"
                        :key="index"
                        :default-active="activeIndex2"
                        v-if="item.child != ''"
                        :index="item._id">
                    <template slot="title">{{item.name}}</template>
                    <el-submenu v-for="(itemTwo,indexTwo) in item.child"
                                :key="indexTwo"
                                :index="itemTwo._id"
                                v-if="itemTwo.child != ''">
                        <template slot="title">{{itemTwo.name}}</template>
                        <el-menu-item
                                v-for="(itemThree,indexThree) in itemTwo.child"
                                :key="indexThree"
                                :index="itemThree._id"
                                @click="op(itemThree)">{{itemThree.name}}
                        </el-menu-item>
                    </el-submenu>
                    <el-menu-item
                            v-for="(itemTwo,indexTwo) in item.child"
                            :key="indexTwo"
                            v-if="itemTwo.child == ''"
                            :index="itemTwo._id"
                            @click="op(itemTwo)">{{itemTwo.name}}
                    </el-menu-item>
                </el-submenu>
                <el-menu-item v-for="(item,index) in list"
                              :key="index"
                              v-if="item.child == ''"
                              :index="item._id"
                              @click="op(item)">{{ item.name }}
                </el-menu-item>
            </el-menu>
        </el-row>
        <div class="article-list" v-loading="loading">
            <el-row>
                <el-col v-if="displayDesc" :lg="16" :md="24">
                    <div class="article-content" v-if="articleInfo.title !== undefined">
                        <div class="title">
                            {{articleInfo.title}}
                        </div>
                        <div class="main">
                            <div class="record">
                                <i class="icon el-icon-date"></i><span class="text">{{articleInfo.author}}</span>
                                <i class="icon el-icon-time"></i><span class="text">{{articleInfo.ct}}</span>
                                <i class="icon el-icon-refresh"></i><span class="text">{{articleInfo.ut}}</span>
                                <!--<i class="icon el-icon-news"></i><span class="text">32 Comments</span>-->
                            </div>
                            <div class="tag">
                                <div class="left"><i class="el-icon-menu"></i>{{articleInfo.categoryName}}</div>
                                <div class="right">{{articleInfo.tag}}</div>
                            </div>
                            <div class="bg-img" style="width: 100%">
                                <img style="max-width: 95%"
                                     :src="'https://www.uslazycreditcard.com/cgi-bin/download.pl?proj=credit&fid=' + articleInfo.coverFid"
                                     alt="">
                            </div>
                            <div class="descripiton" v-html="articleInfo.content">
                            </div>
                            <!--<div class="relation">-->
                                <!--相关-->
                            <!--</div>-->
                            <div class="re-list">
                                <div id="jp-relatedposts" class="jp-relatedposts" style="display: block;text-align: left;">
                                    <h3 class="jp-relatedposts-headline">
                                        <em>相关</em>
                                    </h3>
                                    <el-row type="flex" justify="space-around" class="jp-relatedposts-items jp-relatedposts-items-visual jp-relatedposts-grid ">
                                        <el-col v-for="(item,index) in relatedList" :key="index"
                                                :span="8"
                                                class="jp-relatedposts-post jp-relatedposts-post0 jp-relatedposts-post-thumbs"
                                                data-post-id="9297" data-post-format="false">
                                            <a
                                                    class="jp-relatedposts-post-a"
                                                    href="#"
                                                    @click="readMore(item._id)"
                                                    :title="item.content" rel="nofollow" data-origin="76044"
                                                    data-position="0">
                                                <img
                                                        class="jp-relatedposts-post-img"
                                                        :src="'https://www.uslazycreditcard.com/cgi-bin/download.pl?proj=credit&fid=' + item.coverFid"
                                                        width="350" height="144" :alt="item.tag">
                                            </a>
                                            <h4
                                                    class="jp-relatedposts-post-title">
                                                <a class="jp-relatedposts-post-a"
                                                   href="#"
                                                   @click="readMore(item._id)"
                                                   :title="item.title" rel="nofollow" data-origin="76044"
                                                   data-position="0">{{item.title}}
                                                </a>
                                            </h4>
                                            <p class="jp-relatedposts-post-excerpt">
                                                {{item.content}}
                                            </p>
                                            <p class="jp-relatedposts-post-date" style="display: block;">{{item.ut}}</p>
                                            <p class="jp-relatedposts-post-context">{{item.categoryName}}</p>
                                        </el-col>
                                    </el-row>
                                </div>
                            </div>
                            <div class="next-previous">
                                <el-row type="flex" class="row-bg" justify="space-between">
                                    <el-col class="pre" :span="3" @click.native="previousPage">上一页</el-col>
                                    <el-col class="next" :span="3" @click.native="nextPage">下一页</el-col>
                                </el-row>
                            </div>
                        </div>
                    </div>
                    <div class="main" v-else
                         style="text-align: center;padding: 20px;margin-top:30px;background: #ffffff">
                        暂无搜索结果
                        <!--<div class="relation">-->
                        <!--相关-->
                        <!--</div>-->
                        <div class="re-list">
                            <div id="jp-relatedposts" class="jp-relatedposts" style="display: block;text-align: left;border-top: 1px solid #d8d8d8;">
                                <h3 class="jp-relatedposts-headline">
                                    <em>相关</em>
                                </h3>
                                <el-row type="flex" justify="space-around" class="jp-relatedposts-items jp-relatedposts-items-visual jp-relatedposts-grid ">
                                    <el-col v-for="(item,index) in relatedList" :key="index"
                                            :span="8"
                                            class="jp-relatedposts-post jp-relatedposts-post0 jp-relatedposts-post-thumbs"
                                            data-post-id="9297" data-post-format="false">
                                        <a
                                                class="jp-relatedposts-post-a"
                                                href="#"
                                                @click="readMore(item._id)"
                                                :title="item.content" rel="nofollow" data-origin="76044"
                                                data-position="0">
                                            <img
                                                    class="jp-relatedposts-post-img"
                                                    :src="'https://www.uslazycreditcard.com/cgi-bin/download.pl?proj=credit&fid=' + item.coverFid"
                                                    width="350" height="144" :alt="item.tag">
                                        </a>
                                        <h4
                                                class="jp-relatedposts-post-title">
                                            <a class="jp-relatedposts-post-a"
                                               href="#"
                                               @click="readMore(item._id)"
                                               :title="item.title" rel="nofollow" data-origin="76044"
                                               data-position="0">{{item.title}}
                                            </a>
                                        </h4>
                                        <p class="jp-relatedposts-post-excerpt">
                                            {{item.content}}
                                        </p>
                                        <p class="jp-relatedposts-post-date" style="display: block;">{{item.ut}}</p>
                                        <p class="jp-relatedposts-post-context">{{item.categoryName}}</p>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                        <div class="next-previous">
                            <el-row type="flex" class="row-bg" justify="space-between">
                                <el-col class="pre" :span="3" @click.native="previousPage">上一页</el-col>
                                <el-col class="next" :span="3" @click.native="nextPage">下一页</el-col>
                            </el-row>
                        </div>
                    </div>
                </el-col>
                <el-col v-else :lg="16" :md="24" style="min-height: 800px;">
                    <div v-if="article_list.length > 0" class="article-item" v-for="(item,index) in article_list"
                         :key="index">
                        <div class="title" @click="readMore(item._id)" style="cursor: pointer;">{{item.title}}</div>
                        <div class="record">
                            <i class="icon el-icon-date"></i><span class="text">{{item.author}}</span>
                            <i class="icon el-icon-time"></i><span class="text">{{item.ut}}</span>
                            <i class="icon el-icon-refresh"></i><span class="text">{{item.ut}}</span>
                            <!--<i class="icon el-icon-news"></i><span class="text">32 Comments</span>-->
                        </div>
                        <div class="flex">
                            <div class="left" @click="readMore(item._id)" style="cursor: pointer;">
                                <img :src="'https://www.uslazycreditcard.com/cgi-bin/download.pl?proj=credit&fid=' + item.coverFid"
                                     alt="">
                            </div>
                            <div class="right">
                                <div class="content-text" style="cursor: pointer;" @click="readMore(item._id)">
                                    {{ item.content }}
                                </div>
                                <el-button @click="readMore(item._id)" class="btn" size="small" type="primary">read
                                    more
                                </el-button>
                            </div>
                            <div class="footer">
                                <div class="menu" style="cursor: pointer;" @click="getCatList(item.categoryId)">{{
                                    item.categoryName }}
                                </div>
                                <div class="tag" style="cursor: pointer;">{{item.tag ? item.tag : item.ut}}</div>
                            </div>
                        </div>
                    </div>
                    <div v-if="article_list.length === 0"
                         style="text-align: center;padding: 20px;margin-top:30px;background: #ffffff">
                        暂无搜索结果
                    </div>
                </el-col>
                <el-col :lg="8" :md="24">
                    <div class="in-search" style="padding-top: 1px">
                        <div class="title">
                            站内搜索
                        </div>
                        <el-input
                                class="inner-search"
                                popper-class="my-autocomplete"
                                v-model="state3"
                                placeholder="请输入内容"
                                style="width: 300px"
                        >
                            <i
                                    class="el-icon-search el-input__icon"
                                    slot="suffix"
                                    style="cursor: pointer;"
                                    @click="searchIn">
                            </i>
                        </el-input>
                    </div>
                    <div class="in-search" style="float:left;margin-left: 10px">
                        <div class="title">
                            最新热门
                        </div>
                        <div class="main">
                            <ul class="smart-post-list-main">
                                <li class="smart-post-list-single-container" style="width: 100%; clear: right;"
                                    v-for="(item,index) in hotList" :key="index">
                                    <div class="image-left-of-excerpt img-container" style="width: 155px;margin-right: 20px">
                                        <a
                                                href="#"><img
                                                width="158" height="95"
                                                style="border: 1px solid #d8d8d8;"
                                                :src="'https://www.uslazycreditcard.com/cgi-bin/download.pl?proj=credit&fid=' + item.coverFid"
                                                class="smart-post-list-image"></a>
                                    </div>
                                    <div class="text-left-of-excerpt">
                                        <a
                                                href="#"
                                                @click="readMore(item._id)"
                                                class="smart-post-list-title">{{item.title}}<br />{{item.content}}
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="in-search" style="clear: both;margin-top: 470px;padding-top: 1px;height: 260px">
                        <div class="title">
                            我们的App
                        </div>
                        <div class="box">
                            <img style="text-align: center;margin: auto" width="40%"
                                 src="@/assets/img/qrcode.png"
                                 alt="">
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="" v-if="!displayDesc" style="width:100%;background: #ffffff;padding: 10px">
            <div class="page-container" style="margin: auto;max-width: 1200px">
                <el-pagination
                        background
                        @current-change="handleCurrentChange"
                        layout="prev, pager, next"
                        :total="total">
                </el-pagination>
            </div>
        </div>
        <footer id="wrapper-footer" style="background: #333">
            <el-row id="footer">
                <el-row :gutter="24" type="flex" style="margin: auto" justify="space-around">
                    <el-col :lg="8" :md="24" class="footer-widget-area footer-widget-area-1">
                        <div id="text-14" class="widget footer-widget widget_text"><p class="footer-headline">Contact
                            Us</p>
                            <div class="textwidget">
                                <div style="color:#999999">uslazycreditcard@gmail.com</div>
                            </div>
                        </div>
                        <div id="text-8" class="widget footer-widget widget_text"><p class="footer-headline">
                            Copyright</p>
                            <div class="textwidget">
                                <div id="copyright" class="wrapper" style="color:#999999"> Copyright © 2019 - 2019
                                    北美懒人信用卡
                                    by Spin Zero Limited is licensed under a <a rel="license"
                                                                                href="https://creativecommons.org/licenses/by-nc-nd/4.0/"
                                                                                target="_blank">Creative
                                        Commons Attribution-NonCommercial-NoDerivatives 4.0 International
                                        License</a>.<br>
                                    <img alt="Creative Commons License"
                                         src="https://pgo1b3ii48f1ua79w2tv3s71-wpengine.netdna-ssl.com/wp-content/uploads/copyright-cc-by-nc-nd.jpg"><br>
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :lg="8" :md="24" class="footer-widget-area footer-widget-area-2">
                        <div id="text-18" class="widget footer-widget widget_text"><p class="footer-headline">
                            Disclaimer</p>
                            <div class="textwidget">
                                <div style="color:#999999">Content and opinions on this site are authors/editors’ alone,
                                    not
                                    provided by any bank, credit card issuer, airline, hotel chain, and have not been
                                    reviewed, approved or otherwise endorsed by any of these entities. We attempt to
                                    keep
                                    the information found on this site as accurate as possible, but it is user’s
                                    liability
                                    to verify the bonus and other credit card information in the issuer's official
                                    website
                                    during the application process. If you find any information incorrect or expired,
                                    please
                                    contact us immediately. The credit card logos are trademarks of the issuers. The
                                    Amazon
                                    logos are trademarks of Amazon, Inc.
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :lg="8" :md="24" class="footer-widget-area footer-widget-area-3">
                        <div id="text-20" class="widget footer-widget widget_text"><p class="footer-headline">Advertiser
                            Disclosure</p>
                            <div class="textwidget">
                                <div style="color:#999999">Some links to credit cards and other products on this website
                                    will earn an affiliate commission or referral bonus. This compensation may impact
                                    how
                                    and where products appear on this site. This site does not include all credit card
                                    issuers or all available credit card offers.
                                </div>
                            </div>
                        </div>
                        <div id="text-34" class="widget footer-widget widget_text"><p class="footer-headline">Legal</p>
                            <div class="textwidget">
                                <div style="color:#999999"><a
                                        href="#"
                                        @click="readMore('o15523198851367819309')"
                                        >Terms of Service</a> | <a
                                        href="#"
                                        @click="readMore('o15523194763724160194')"
                                        >Privacy Policy</a></div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-row>
        </footer>
    </div>

</template>

<script>
import api from './server'
import 'element-ui/lib/theme-chalk/display.css'
import utils from '@/utils/utils'

const SEARCH_LIST = 1
const ARTICLE_LIST = 2
const MEMU_ARTICLE_LIST = 3
export default {
  data () {
    return {
      activeIndex: '1',
      currentArticleId: '',
      activeIndex2: '',
      state3: '',
      list: [],
      loading: false,
      pageInit: {
        page: '1',
        limit: '10',
        menuId: '',
        keyword: ''
      },
      displayDesc: false,
      cur_page: 1,
      total: 1,
      article_list: [],
      articleInfo: {},
      currentList: '',
      relatedList: [],
      hotList: []
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    handleIconClick () {
      this.pageInit.page = 1
      this.search(this.pageInit)
      this.currentList = SEARCH_LIST
    },
    querySearch () {

    },
    searchIn () {
      this.message.info({
        title: '功能待开发'
      })
    },
    home () {
      this.loading = true
      api.list((d) => {
        this.list = d.list
      })
      this.getArticle({
        page: '1',
        limit: '10'
      })
    },
    getCatList (id) {
      this.pageInit.menuId = id
      this.getMenuArticleList(this.pageInit)
    },
    getMenuArticleList (pageInit) {
      let that = this
      this.loading = true
      api.articleByCategoryId(pageInit.menuId, pageInit.page, pageInit.limit, (d) => {
        if (d.list.length > 0) {
          d.list.forEach(item => {
            item.ut = that.timestampToTime(item.ut).slice(0, 10)
            item.content = item.content.replace(/<[^>]+>/g, '')
          })
        }
        that.article_list = d.list
        that.total = d.total
        that.displayDesc = false
        that.loading = false
        that.currentList = 4
        this.loading = false
      })
    },
    readMore (id) {
      this.$router.push({
        path: '/front/detail',
        query: {
          id: id,
          activeIndex2: this.activeIndex2,
          r: Math.random()
        }
      })
      // this.loading = true
      // this.currentArticleId = id
      // api.article(id, (d) => {
      //   this.articleInfo = d.article
      //   this.articleInfo.content = utils.imgTagAddStyle(this.articleInfo.content)
      //   this.articleInfo.ut = this.timestampToTime(this.articleInfo.ut).slice(0, 10)
      //   this.articleInfo.ct = this.timestampToTime(this.articleInfo.ct).slice(0, 10)
      //   this.displayDesc = true
      //   this.loading = false
      //   d.relatedList.forEach(item => {
      //     item.ut = this.timestampToTime(item.ut).slice(0, 10)
      //     item.content = item.content.replace(/<[^>]+>/g, '')
      //   })
      //   this.relatedList = d.relatedList
      // })
    },
    op (item) {
      console.log(item)
      if (item.menuType === 2) {
        this.loading = true
        this.currentArticleId = item._id
        api.articleInfoByMenuId(item._id, (d) => {
          console.log(d)
          console.log(d.article)
          this.total = 0
          this.articleInfo = d.article
          if (this.articleInfo) {
            this.displayDesc = true
            this.loading = false
            return
          }
          this.articleInfo.content = utils.imgTagAddStyle(d.article.content)
          this.articleInfo.ut = this.timestampToTime(this.articleInfo.ut).slice(0, 10)
          this.articleInfo.ct = this.timestampToTime(this.articleInfo.ct).slice(0, 10)
          this.displayDesc = true
          this.loading = false
        })
      }
      if (item.menuType === 3) {
        this.loading = true
        this.pageInit.page = 1
        this.pageInit.menuId = item._id
        this.memuArticleList(this.pageInit)
        this.currentList = MEMU_ARTICLE_LIST
      }
    },
    memuArticleList (pageInit) {
      let that = this
      console.log('pageInit', pageInit)
      api.articleByMenuId(pageInit.menuId, pageInit.page, pageInit.limit, (d) => {
        d.list.forEach(item => {
          item.ut = that.timestampToTime(item.ut).slice(0, 10)
          item.content = item.content.replace(/<[^>]+>/g, '')
        })
        this.article_list = d.list
        this.total = d.total
        this.displayDesc = false
        this.loading = false
      })
    },
    search () {
      let that = this
      this.loading = true
      api.artucleSearch(this.pageInit.keyword, this.pageInit.page, this.pageInit.limit, (d) => {
        d.list.forEach(item => {
          item.ut = that.timestampToTime(item.ut).slice(0, 10)
          item.content = item.content.replace(/<[^>]+>/g, '')
        })
        this.article_list = d.list
        this.total = d.total
        this.displayDesc = false
        this.loading = false
      })
    },
    handleCurrentChange (val) {
      this.cur_page = val
      this.pageInit.page = val
      if (this.currentList === SEARCH_LIST) {
        this.search(this.pageInit)
      } else if (this.currentList === ARTICLE_LIST) {
        this.getArticle(this.pageInit)
      } else if (this.currentList === MEMU_ARTICLE_LIST) {
        this.memuArticleList(this.pageInit)
      } else {
        this.getMenuArticleList(this.pageInit)
      }
      window.scrollTo(0, 0)
    },
    timestampToTime (timestamp) {
      var date = new Date(timestamp * 1000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-'
      var M =
          (date.getMonth() + 1 < 10
            ? '0' + (date.getMonth() + 1)
            : date.getMonth() + 1) + '-'
      var D = date.getDate() + ' '
      var h = date.getHours() + ':'
      var m = date.getMinutes() + ':'
      var s = date.getSeconds()
      return Y + M + D + h + m + s
    },
    getArticle (pageInit) {
      this.loading = true
      let that = this
      api.homeArticleList(pageInit.page, pageInit.limit, (d) => {
        d.list.forEach(item => {
          item.ut = that.timestampToTime(item.ut).slice(0, 10)
          item.content = item.content.replace(/<[^>]+>/g, '')
        })
        this.article_list = d.list
        this.total = d.total
        this.displayDesc = false
        this.loading = false
        this.currentList = ARTICLE_LIST
      })
    },
    previousPage () {
      api.previous(this.currentArticleId, (d) => {
        this.articleInfo = d.article
        this.articleInfo.content = utils.imgTagAddStyle(this.articleInfo.content)
        this.articleInfo.ut = this.timestampToTime(this.articleInfo.ut).slice(0, 10)
        this.articleInfo.ct = this.timestampToTime(this.articleInfo.ct).slice(0, 10)
        this.displayDesc = true
        this.loading = false
        window.scrollTo(0, 0)
      })
    },
    nextPage () {
      api.next(this.currentArticleId, (d) => {
        this.articleInfo = d.article
        this.articleInfo.content = utils.imgTagAddStyle(this.articleInfo.content)
        this.articleInfo.ut = this.timestampToTime(this.articleInfo.ut).slice(0, 10)
        this.articleInfo.ct = this.timestampToTime(this.articleInfo.ct).slice(0, 10)
        this.displayDesc = true
        this.loading = false
        window.scrollTo(0, 0)
      })
    },
    IsPC () {
      var userAgentInfo = navigator.userAgent
      var Agents = ['Android', 'iPhone',
        'SymbianOS', 'Windows Phone',
        'iPad', 'iPod']
      var flag = true
      for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false
          break
        }
      }
      return flag
    }
  },
  created () {
    if (!this.IsPC()) {
      window.location.href = 'https://www.uslazycreditcard.com/m'
    }
    this.loading = true
    api.list((d) => {
      this.list = d.list
    })
    api.hotArticles((d) => {
      let that = this
      d.list.forEach(item => {
        item.ut = that.timestampToTime(item.ut).slice(0, 10)
        item.content = item.content.replace(/<[^>]+>/g, '')
      })
      this.hotList = d.list
    })
    this.pageInit.page = 1
    this.getArticle(this.pageInit)
  }
}
</script>

<style scoped lang="less">
    .font-container {
        background: #F1F1F1;
        border-radius: 5px;
        overflow: hidden;
        .box{
            width: 100%;
            text-align: center;
        }
        .header-container {
            background: #FFFFFF;
            width: 100%;
            margin: auto;
        }

        .header {
            margin: auto;
            padding: 30px 0;
            background: #FFFFFF;
            max-width: 1280px;
            border-bottom: 1px solid #ddd;

            .logo {
                cursor: pointer;
                margin: auto;
                padding-left: 50px;
            }
        }

        .search {
            margin-top: 30px;
        }

        .header-nav {
            background: #333333;
            height: 60px;

            .el-menu-demo {
                margin: auto;
                max-width: 1280px;
            }
        }

        .article-list {
            max-width: 1280px;
            margin: auto;
            width: auto;
            height: 100%;
            padding: 10px;
            box-sizing: border-box;

            .article-content {
                margin: 30px;
                width: 95%;

                .title {
                    cursor: pointer;
                    background: #FFFFFF;
                    font-size: 24px;
                    font-weight: bold;
                    color: #333333;
                    padding: 20px;
                    overflow: hidden;
                    border: 1px solid #e3e3e3;
                }

                .main {
                    margin-top: 20px;
                    background: #FFFFFF;
                    padding: 20px;

                    .record {
                        border-bottom: 1px solid #e3e3e3;

                        .icon {
                            color: #999 !important;
                            font-size: 16px;
                            line-height: 21px;
                            padding-bottom: 5px;
                            padding-left: 10px;
                        }

                        .text {
                            font-size: 12px;
                            color: #999;
                            padding-left: 10px;
                        }
                    }

                    .tag {
                        border-bottom: 1px solid #e3e3e3;
                        height: 40px;
                        color: #999 !important;
                        font-size: 16px;
                        .left {
                            float: left;
                            height: 40px;
                            line-height: 40px;
                        }

                        .right {
                            float: right;
                            height: 40px;
                            line-height: 40px;
                        }
                    }

                    .bg-img {
                        text-align: center;
                        margin-top: 20px;

                        img {
                            max-width: 100%;
                        }
                    }

                    .descripiton {
                        /*margin-top: 20px;*/
                    }
                }
            }

            .article-item {
                margin: 30px;
                min-height: 320px;
                background: #FFFFFF;
                padding: 20px;
                padding-bottom: 5px;
                width: auto;
                -webkit-box-shadow: 0 0 3px #bbb;
                -moz-box-shadow: 0 0 3px #bbb;
                box-shadow: 0 0 3px #bbb;

                .title {
                    color: #437bd0;
                    font-size: 23px;
                    line-height: 100%;
                    margin: 0 0 7px;
                }

                .record {
                    .icon {
                        color: #999 !important;
                        font-size: 16px;
                        line-height: 21px;
                        padding-bottom: 5px;
                        padding-left: 10px;
                    }

                    .text {
                        font-size: 12px;
                        color: #999;
                        padding-left: 10px;
                    }
                }

                .flex {
                    margin-top: 10px;

                    .left {
                        float: left;
                        width: 300px;
                        height: 189px;
                        overflow: hidden;

                        img {
                            width: 300px;
                            max-width: 300px;
                        }
                    }

                    .right {
                        float: right;
                        margin-top: -13px;
                        max-width: 55%;
                        min-width: 55%;

                        .content-text {
                            width: auto;
                            height: 160px;
                            padding: 10px 0;
                            box-sizing: border-box;
                            text-align: justify;
                            font-size: 16px;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 7;
                            overflow: hidden;
                        }

                        .btn {
                            margin-top: 12px;
                            margin-left: 0px;
                            background: #6596DC;
                            border: none;
                        }
                    }

                    .footer {
                        padding-top: 30px;
                        clear: both;
                        position: relative;
                        color: #999;
                        width: 100%;

                        .menu {
                            width: 50%;
                            text-align: left;
                            display: inline-block;
                            overflow: hidden;/*超出部分隐藏*/
                        }

                        .tag {
                            width: 50%;
                            text-align: right;
                            display: inline-block;
                            overflow: hidden;/*超出部分隐藏*/
                            white-space: nowrap;/*不换行*/
                            text-overflow:ellipsis;/*超出部分文字以...显示*/
                        }

                        &:before {
                            content: "";
                            position: absolute;
                            background: #d9d9d9;
                            height: 1px;
                            width: 100%;
                            top: 20px;
                            right: 0px;
                        }
                    }
                }
            }

            .in-search {
                margin: auto;
                margin-top: 30px;
                font-size: 13px;
                width: 95%;
                background: #ffffff;
                min-height: 150px;
                line-height: 150%;
                -webkit-box-shadow: 0 0 3px #bbb;
                -moz-box-shadow: 0 0 3px #bbb;
                box-shadow: 0 0 3px #bbb;

                .title {
                    text-align: left;
                    font-size: 20px;
                    margin: 20px;
                    padding: 10px 0 5px 10px;
                    border-bottom: 1px solid #d8d8d8;
                }

                .inner-search {
                    margin-left: 30px;
                }

                .main {
                    margin: 0 20px;
                    font-family: Arial, Helvetica, sans-serif;
                    line-height: 150%;

                    .smart-post-list-main {
                        margin-left: 0;
                        margin-bottom: 15px;
                    }

                    .sidebar-widget ul {
                        margin: 4px 0 -4px 16px;
                    }

                    .smart-post-list-main, .smart-post-list-main li {
                        list-style: none;
                        float: left;
                    }

                    .smart-post-list-main {
                        width: 100%;
                    }

                    .smart-post-list-main {
                        margin-left: 0;
                    }

                    .smart-post-list-main .smart-post-list-single-container {
                        float: left;
                    }

                    .sidebar-widget ul li {
                        line-height: 200%;
                    }

                    .sidebar-widget p, .sidebar-widget ul li, .sidebar-widget ol li {
                        color: #333;
                        font-size: 13px;
                    }

                    .smart-post-list-main li {
                        margin: 0 0 5px;
                    }

                    .smart-post-list-main, .smart-post-list-main li {
                        list-style: none;
                        float: left;
                    }

                    .smart-post-list-single-container {
                        max-height: 90px;
                        overflow: hidden;
                        padding-bottom: 10px;
                    }

                    .smart-post-list-single-container {
                        max-height: 90px;
                        overflow: hidden;
                        padding-bottom: 10px;
                    }

                    .smart-post-list-main .image-left-of-excerpt {
                        float: left;
                    }

                    .smart-post-list-main .text-left-of-excerpt {
                        /*display: table-row;*/
                        *display: inline-block;
                    }

                    .sidebar-widget ul li a {
                        text-decoration: none;
                    }

                    a {
                        color: #6596dd;
                        text-decoration: none;
                    }

                    a:hover {
                        color: #437bd0;
                    }

                    .sidebar-widget p, .sidebar-widget ul li, .sidebar-widget ol li {
                        color: #333;
                        font-size: 13px;
                    }
                }
            }
        }

        #wrapper-footer {
            background: #333;
            margin: auto;
            height: auto;
            position: relative;
            width: 100%;
        }

        footer {
            border: 0;
            margin: 0;
            padding: 0;
            vertical-align: baseline;
        }

        #footer {
            margin: 0 auto;
            padding: 0;
            position: relative;
            width: 100%;
        }

        .footer-widget-area {
            height: auto;
            margin-right: 30px;
            padding: 30px 0 4px;
            position: relative;
            width: 370px;
            z-index: 50;
        }

        .footer-widget {
            margin-bottom: 20px;
        }

        #footer .footer-widget .footer-headline {
            border-bottom: 1px solid #222;
            color: white;
            font-family: Oswald, Arial, Helvetica, sans-serif;
            font-size: 19px;
            line-height: 100%;
            margin-bottom: 3px;
            padding-bottom: 9px;
        }

        #footer a {
            color: #c1d7f8;
        }

        a {
            color: #437bd0;
            text-decoration: underline;
        }

        .relation {
            margin-top: 20px;
            width: 36px;
            text-align: center;
            padding-top: 10px;
            border-top: 1px solid #d8d8d8;
            font-size: 14px;
        }

        .next-previous {
            margin-top: 20px;
            padding: 5px 10px;
            border-top: 1px solid #d8d8d8;
            border-bottom: 1px solid #d8d8d8;
            .next {
                text-align: right;
            }
            .pre,.next{
                cursor: pointer;
            }
        }
        .re-list{
            #jp-relatedposts {
                display: none;
                padding-top: 1em;
                margin: 1em 0;
                position: relative;
                clear: both;
            }
            #jp-relatedposts h3.jp-relatedposts-headline {
                margin: 0 0 1em 0;
                display: inline-block;
                font-size: 9pt;
                font-weight: 700;
                font-family: inherit;
            }
            #jp-relatedposts h3.jp-relatedposts-headline em {
                font-style: normal;
                font-weight: 700;
            }
            #jp-relatedposts .jp-relatedposts-items-visual {
                margin-right: -20px;
            }
            #jp-relatedposts .jp-relatedposts-items-visual .jp-relatedposts-post {
                padding-right: 20px;
                filter: alpha(opacity=80);
                -moz-opacity: .8;
                opacity: .8;
            }
            #jp-relatedposts .jp-relatedposts-items .jp-relatedposts-post {
                margin: 0 0 1em;
                box-sizing: border-box;
                -moz-box-sizing: border-box;
                -webkit-box-sizing: border-box;
            }
            a {
                color: #437bd0;
                text-decoration: underline;
            }
            #jp-relatedposts .jp-relatedposts-items-visual .jp-relatedposts-post img.jp-relatedposts-post-img, #jp-relatedposts .jp-relatedposts-items-visual .jp-relatedposts-post span {
                max-width: 100%;
            }
            #jp-relatedposts .jp-relatedposts-items .jp-relatedposts-post img.jp-relatedposts-post-img, #jp-relatedposts .jp-relatedposts-items .jp-relatedposts-post span {
                display: block;
                max-width: 90%;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            a img {
                border: 0;
            }

            img {
                max-width: 100%;
            }
            #jp-relatedposts .jp-relatedposts-items-visual h4.jp-relatedposts-post-title {
                text-transform: none;
                margin: 0;
                font-family: inherit;
                display: block;
                max-width: 100%;
            }
            #jp-relatedposts .jp-relatedposts-items p, #jp-relatedposts .jp-relatedposts-items-visual h4.jp-relatedposts-post-title {
                font-size: 14px;
                line-height: 20px;
                margin: 0;
            }
            #jp-relatedposts .jp-relatedposts-items .jp-relatedposts-post .jp-relatedposts-post-title a {
                font-size: inherit;
                font-weight: 400;
                text-decoration: none;
                filter: alpha(opacity=100);
                -moz-opacity: 1;
                opacity: 1;
            }
            #jp-relatedposts .jp-relatedposts-items p, #jp-relatedposts .jp-relatedposts-items-visual h4.jp-relatedposts-post-title {
                font-size: 14px;
                line-height: 20px;
                margin: 0;
            }
        }
        .jp-relatedposts-post-excerpt{
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            line-clamp: 4;
            -webkit-box-orient: vertical;
        }
        .smart-post-list-title{
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            margin-left: 10px;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            line-clamp: 4;
            -webkit-box-orient: vertical;
        }
        .text-left-of-excerpt{

        }

    }
</style>
