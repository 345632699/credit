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
                    active-text-color="#ffd04b">
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
                    <div class="article-content" v-if="articleInfo !== null">
                        <div class="title">
                            {{articleInfo.title}}
                        </div>
                        <div class="main">
                            <div class="record">
                                <i class="icon el-icon-date"></i><span class="text">{{articleInfo.author}}}</span>
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
                                     :src="'http://148.72.64.80/cgi-bin/download.pl?proj=credit&fid=' + articleInfo.coverFid"
                                     alt="">
                            </div>
                            <div class="descripiton" v-html="articleInfo.content">
                            </div>
                        </div>
                    </div>
                    <div v-if="articleInfo === null"
                         style="text-align: center;padding: 20px;margin-top:30px;background: #ffffff">
                        暂无搜索结果
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
                                <img :src="'http://148.72.64.80/cgi-bin/download.pl?proj=credit&fid=' + item.coverFid"
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
                                <li class="smart-post-list-single-container" style="width: 100%; clear: right;">
                                    <div class="image-left-of-excerpt img-container" style="width: 155px;"><a
                                            href="https://www.uscreditcardguide.com/citi-aadvantage-platinum-select/"><img
                                            src="https://i2.wp.com/www.uscreditcardguide.com/wp-content/uploads/card.jpg?resize=150%2C95&amp;ssl=1"
                                            class="smart-post-list-image"></a></div>
                                    <div class="text-left-of-excerpt"><a
                                            href="https://www.uscreditcardguide.com/citi-aadvantage-platinum-select/"
                                            class="smart-post-list-title">Citi AAdvantage Platinum 信用卡【2019.2
                                        更新：5.1起10%返还将被取消】</a></div>
                                </li>
                                <li class="smart-post-list-single-container" style="width: 100%; clear: right;">
                                    <div class="image-left-of-excerpt img-container" style="width: 155px;"><a
                                            href="https://www.uscreditcardguide.com/chase-ihg-premier/"><img
                                            src="https://i2.wp.com/www.uscreditcardguide.com/wp-content/uploads/chase-ihg-premier-e1532539571959.jpg?resize=150%2C95&amp;ssl=1"
                                            class="smart-post-list-image"></a></div>
                                    <div class="text-left-of-excerpt"><a
                                            href="https://www.uscreditcardguide.com/chase-ihg-premier/"
                                            class="smart-post-list-title">Chase IHG Premier 信用卡【2019.2 更新：80k+40k+$50
                                        史高开卡奖励！】</a></div>
                                </li>
                                <li class="smart-post-list-single-container" style="width: 100%; clear: right;">
                                    <div class="image-left-of-excerpt img-container" style="width: 155px;"><a
                                            href="https://www.uscreditcardguide.com/amex-platinum-delta-skymiles/"><img
                                            src="https://i2.wp.com/www.uscreditcardguide.com/wp-content/uploads/platinum-delta-skymiles.png?resize=150%2C95&amp;ssl=1"
                                            class="smart-post-list-image"></a></div>
                                    <div class="text-left-of-excerpt"><a
                                            href="https://www.uscreditcardguide.com/amex-platinum-delta-skymiles/"
                                            class="smart-post-list-title">AmEx Platinum Delta SkyMiles 信用卡【2019.2
                                        更新：75k+$100 历史最高开卡奖励！】</a></div>
                                </li>
                                <li class="smart-post-list-single-container" style="width: 100%; clear: right;">
                                    <div class="image-left-of-excerpt img-container" style="width: 155px;"><a
                                            href="https://www.uscreditcardguide.com/amex-gold-delta-skymiles/"><img
                                            src="https://i2.wp.com/www.uscreditcardguide.com/wp-content/uploads/delta-skymiles.png?resize=150%2C95&amp;ssl=1"
                                            class="smart-post-list-image"></a></div>
                                    <div class="text-left-of-excerpt"><a
                                            href="https://www.uscreditcardguide.com/amex-gold-delta-skymiles/"
                                            class="smart-post-list-title">AmEx Gold Delta SkyMiles 信用卡【2019.2 更新：60k+$50
                                        public offer】</a></div>
                                </li>
                                <li class="smart-post-list-single-container" style="width: 100%; clear: right;">
                                    <div class="image-left-of-excerpt img-container" style="width: 155px;"><a
                                            href="https://www.uscreditcardguide.com/amex-hilton-aspire/"><img
                                            src="https://i2.wp.com/www.uscreditcardguide.com/wp-content/uploads/hilton-honors-aspire-credit-card.png?resize=150%2C95&amp;ssl=1"
                                            class="smart-post-list-image"></a></div>
                                    <div class="text-left-of-excerpt"><a
                                            href="https://www.uscreditcardguide.com/amex-hilton-aspire/"
                                            class="smart-post-list-title">AmEx Hilton Aspire 信用卡【2018.10 更新：150k
                                        开卡奖励】</a></div>
                                </li>
                            </ul>
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
      currentList: ''
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
      this.loading = true
      api.article(id, (d) => {
        this.articleInfo = d.article
        this.articleInfo.content = utils.imgTagAddStyle(this.articleInfo.content)
        this.articleInfo.ut = this.timestampToTime(this.articleInfo.ut).slice(0, 10)
        this.articleInfo.ct = this.timestampToTime(this.articleInfo.ct).slice(0, 10)
        this.displayDesc = true
        this.loading = false
      })
    },
    op (item) {
      console.log(item)
      if (item.menuType === 2) {
        this.loading = true
        api.articleInfoByMenuId(item._id, (d) => {
          console.log(d)
          console.log(d.article)
          this.total = 0
          this.articleInfo = d.article
          if (this.articleInfo === null) {
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
      if (item.menuType == 3) {
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
    }
  },
  created () {
    this.loading = true
    api.list((d) => {
      this.list = d.list
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
                        padding: 10px;
                        padding-top: 30px;
                        clear: both;
                        position: relative;
                        color: #999;
                        width: 100%;
                        .menu {
                            width: 50%;
                            text-align: left;
                            display: inline-block;
                        }
                        .tag {
                            width: 50%;
                            text-align: right;
                            display: inline-block;
                        }
                        &:before {
                            content: "";
                            position: absolute;
                            background: #d9d9d9;
                            height: 1px;
                            width: 100%;
                            top: 20px;
                            right: 5px;
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
                    font-family: Arial,Helvetica,sans-serif;
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
                        display: table-row;
                        *display: inline-block;
                    }
                    .sidebar-widget ul li a {
                        text-decoration: none;
                    }
                    a {
                        color: #6596dd;
                        text-decoration: none;
                    }
                    a:hover{
                        color: #437bd0;
                    }
                    .sidebar-widget p, .sidebar-widget ul li, .sidebar-widget ol li {
                        color: #333;
                        font-size: 13px;
                    }
                }
            }
        }
    }
</style>
