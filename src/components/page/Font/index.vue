<template>
	<div class="font-container">
		<header>
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
		</header>
		<el-row class="header-nav">
			<el-menu
					:default-active="activeIndex2"
					class="el-menu-demo"
					mode="horizontal"
					@select="handleSelect"
					background-color="#333333"
					text-color="#fff"
					active-text-color="#ffd04b">
				<el-menu-item index="1">处理中心</el-menu-item>
				<el-submenu index="2">
					<template slot="title">我的工作台</template>
					<el-menu-item index="2-1">选项1</el-menu-item>
					<el-menu-item index="2-2">选项2</el-menu-item>
					<el-menu-item index="2-3">选项3</el-menu-item>
					<el-submenu index="2-4">
						<template slot="title">选项4</template>
						<el-menu-item index="2-4-1">选项1</el-menu-item>
						<el-menu-item index="2-4-2">选项2</el-menu-item>
						<el-menu-item index="2-4-3">选项3</el-menu-item>
					</el-submenu>
				</el-submenu>
				<el-menu-item index="3" disabled>消息中心</el-menu-item>
				<el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
			</el-menu>
		</el-row>
		<div class="article-list">
			<el-row>
				<el-col :span="16">
					<div class="article-item">
						<div class="title">千年平安京一览大唐气象——京都漆樓わかさや町屋入住体验</div>
						<div class="record">
							<icon class="icon el-icon-date"></icon><span class="text">Aleph</span>
							<icon class="icon el-icon-time"></icon><span class="text">2019-03-02</span>
							<icon class="icon el-icon-refresh"></icon><span class="text">2019-03-02</span>
							<icon class="icon el-icon-news"></icon><span class="text">32 Comments</span>
						</div>
						<div class="flex">
							<div class="left">
								<img src="https://i0.wp.com/www.uscreditcardguide.com/wp-content/uploads/IMG_7321.jpg?zoom=2&resize=300%2C189&ssl=1" alt="">
							</div>
							<div class="right">
								<div class="content">
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
							<icon class="icon el-icon-date"></icon><span class="text">Aleph</span>
							<icon class="icon el-icon-time"></icon><span class="text">2019-03-02</span>
							<icon class="icon el-icon-refresh"></icon><span class="text">2019-03-02</span>
							<icon class="icon el-icon-news"></icon><span class="text">32 Comments</span>
						</div>
						<div class="flex">
							<div class="left">
								<img src="https://i0.wp.com/www.uscreditcardguide.com/wp-content/uploads/IMG_7321.jpg?zoom=2&resize=300%2C189&ssl=1" alt="">
							</div>
							<div class="right">
								<div class="content">
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
				<el-col :span="8">
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
export default {
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped lang="less">
	.font-container {
		overflow-y: scroll;
		background: #F1F1F1;
		border-radius: 5px;
		header{
			padding: 30px 0;
			background: #FFFFFF;
			border-bottom: 1px solid #ddd;
			.logo{
				padding-left: 30px;
			}
		}
		.search{
			margin-top: 30px;
		}
		.header-nav{
			.el-menu-demo{
				padding: 0 30px;
			}
		}
		.article-list{
			width: auto;
			height: 100%;
			padding: 10px;
			overflow-y: scroll;
			box-sizing: border-box;
			.article-item{
				margin: 30px;
				height: 350px;
				background: #FFFFFF;
				padding: 20px;
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
					margin-bottom: 20px;
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
						.btn{
							margin-top: 5px;
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
