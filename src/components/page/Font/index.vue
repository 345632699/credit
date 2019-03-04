<template>
	<div class="font-container">
		<div class="header-container">
			<div class="header">
				<el-row>
					<el-col class="logo" :span="18">
						<img width="40%" src="https://pgo1b3ii48f1ua79w2tv3s71-wpengine.netdna-ssl.com/wp-content/uploads/logo-horizontal-zh-min.png" alt="">
					</el-col>
					<el-col :span="6">
						<el-autocomplete
								class="search"
								popper-class="my-autocomplete"
								v-model="state3"
								:fetch-suggestions="querySearch"
								placeholder="请输入内容"
								@select="handleSelect">
							<i
									class="el-icon-search el-input__icon"
									slot="suffix"
									@click="handleIconClick">
							</i>
							<template slot-scope="{ item }">
								<div class="name">{{ item.value }}</div>
								<span class="addr">{{ item.address }}</span>
							</template>
						</el-autocomplete>
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
                        >{{itemThree.name}}</el-menu-item>
                    </el-submenu>
                    <el-menu-item
                            v-for="(itemTwo,indexTwo) in item.child"
                            :key="indexTwo"
                            :index="itemTwo._id"
                            v-if="itemTwo.child == ''"
                    >{{itemTwo.name}}</el-menu-item>
                </el-submenu>
                <el-menu-item v-for="(item,index) in list"
                              :key="index"
                              v-if="item.child == ''"
                              :index="item._id">{{ item.name }}</el-menu-item>
            </el-menu>
		</el-row>

        <div class="article-list">
			<el-row>
				<el-col :lg="16" :md="24">
					<div class="article-item">
						<div class="title">千年平安京一览大唐气象——京都漆樓わかさや町屋入住体验</div>
						<div class="record">
							<i class="icon el-icon-date"></i><span class="text">Aleph</span>
							<i class="icon el-icon-time"></i><span class="text">2019-03-02</span>
							<i class="icon el-icon-refresh"></i><span class="text">2019-03-02</span>
							<i class="icon el-icon-news"></i><span class="text">32 Comments</span>
						</div>
						<div class="flex">
							<div class="left">
								<img src="https://i0.wp.com/www.uscreditcardguide.com/wp-content/uploads/IMG_7321.jpg?zoom=2&resize=300%2C189&ssl=1" alt="">
							</div>
							<div class="right">
								<div class="content-text">
									上洛   平安时代，桓武天皇定都平安京，依唐都长安和东都洛阳风水布局，从此京都被视为日本古代文化之高地。作为忠诚度为零的万豪雅高洲际白金、希尔顿钻石、凯悦环球客，笔者来到京都会选择下榻哪间酒店呢？答案是，一个都不榻！到了京都，自然应该体验最纯正最地道的日本和室居所。京都御三家（俵屋、柊家、炭屋）、要庵西富、吉田山庄……嗯，这些奢华的日式旅馆我一个都住不起……于是打开Airbnb，在477…
								</div>
								<el-button class="btn" size="small" type="primary">read more</el-button>
							</div>
							<div class="footer">
								酒店体验
							</div>
						</div>
					</div>
					<div class="article-item">
						<div class="title">千年平安京一览大唐气象——京都漆樓わかさや町屋入住体验</div>
						<div class="record">
							<i class="icon el-icon-date"></i><span class="text">Aleph</span>
							<i class="icon el-icon-time"></i><span class="text">2019-03-02</span>
							<i class="icon el-icon-refresh"></i><span class="text">2019-03-02</span>
							<i class="icon el-icon-news"></i><span class="text">32 Comments</span>
						</div>
						<div class="flex">
							<div class="left">
								<img src="https://i0.wp.com/www.uscreditcardguide.com/wp-content/uploads/IMG_7321.jpg?zoom=2&resize=300%2C189&ssl=1" alt="">
							</div>
							<div class="right">
								<div class="content-text">
									上洛   平安时代，桓武天皇定都平安京，依唐都长安和东都洛阳风水布局，从此京都被视为日本古代文化之高地。作为忠诚度为零的万豪雅高洲际白金、希尔顿钻石、凯悦环球客，笔者来到京都会选择下榻哪间酒店呢？答案是，一个都不榻！到了京都，自然应该体验最纯正最地道的日本和室居所。京都御三家（俵屋、柊家、炭屋）、要庵西富、吉田山庄……嗯，这些奢华的日式旅馆我一个都住不起……于是打开Airbnb，在477…
								</div>
								<el-button class="btn" size="small" type="primary">read more</el-button>
							</div>
							<div class="footer">
								酒店体验
							</div>
						</div>
					</div>
				</el-col>
				<el-col :lg="8" :md="24">
					<div class="in-search">
						<div class="title">
							站内搜索
						</div>
						<el-autocomplete
								class="inner-search"
								popper-class="my-autocomplete"
								v-model="state3"
								:fetch-suggestions="querySearch"
								placeholder="请输入内容"
								@select="handleSelect">
							<i
									class="el-icon-search el-input__icon"
									slot="suffix"
									@click="handleIconClick">
							</i>
							<template slot-scope="{ item }">
								<div class="name">{{ item.value }}</div>
								<span class="addr">{{ item.address }}</span>
							</template>
						</el-autocomplete>
					</div>
				</el-col>
			</el-row>
		</div>

	</div>

</template>

<script>
import api from './server'
import 'element-ui/lib/theme-chalk/display.css'
export default {
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '',
      state3: '1',
      list: []
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    handleIconClick (key, keyPath) {
      console.log(key, keyPath)
    },
    querySearch () {

    }
  },
  created () {
    api.list((d) => {
      this.list = d.list
    })
  }
}
</script>

<style scoped lang="less">
	.font-container {
		background: #F1F1F1;
		border-radius: 5px;
		.header-container{
			background: #FFFFFF;
			width: 100%;
			margin: auto;
		}
		.header{
			margin: auto;
			padding: 30px 0;
			background: #FFFFFF;
			max-width: 1280px;
			border-bottom: 1px solid #ddd;
			.logo{
				margin: auto;
				padding-left: 50px;
			}
		}
		.search{
			margin-top: 30px;
		}
		.header-nav{
			background: #333333;
			height: 60px;
			.el-menu-demo{
				margin: auto;
				max-width: 1280px;
			}
		}
		.article-list{
			max-width: 1280px;
			margin: auto;
			width: auto;
			height: 100%;
			padding: 10px;
			box-sizing: border-box;
			.article-item{
				margin: 30px;
				min-height: 320px;
				background: #FFFFFF;
				padding: 20px;
				padding-bottom: 5px;
				width: auto;
				.title{
					color: #437bd0;
					font-size: 20px;
				}
				.record{
					.icon{
						color: #999 !important;
						font-size: 16px;
						line-height: 21px;
						padding-bottom: 5px;
						padding-left: 10px;
					}
					.text{
						font-size: 12px;
						color: #999;
						padding-left: 10px;
					}
				}
				.flex{
					margin-top: 10px;
					.left{
						float: left;
						width: 45%;
						img{
							width: 100%;
						}
					}
					.right{
						float: right;
						margin-top: -13px;
						width: 55%;
						.content-text{
							width: auto;
							height: 100%;
							padding: 10px 20px;
							box-sizing: border-box;
							text-align: justify;
						}
						.btn{
							margin-top: 15px;
							margin-left: 10px;
							background: #6596DC;
							border: none;
						}
					}
					.footer{
						padding: 10px;
						padding-top: 30px;
						clear: both;
						position: relative;
						color: #999;
						&:before{
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
			.in-search{
				margin: auto;
				margin-top: 30px;
				width: 95%;
				background: #ffffff;
				height: 150px;
				.title{
					text-align: left;
					font-size: 20px;
					margin: 20px;
					padding: 10px 0 5px 10px;
					border-bottom: 1px solid #d8d8d8;
				}
				.inner-search{
					margin-left: 30px;
				}
			}
		}
	}
</style>
