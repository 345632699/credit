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
								@click="op(itemThree)"
                        >{{itemThree.name}}</el-menu-item>
                    </el-submenu>
                    <el-menu-item
                            v-for="(itemTwo,indexTwo) in item.child"
                            :key="indexTwo"
                            :index="itemTwo._id"
                            v-if="itemTwo.child == ''"
							@click="op(itemTwo)"
                    >{{itemTwo.name}}</el-menu-item>
                </el-submenu>
                <el-menu-item v-for="(item,index) in list"
                              :key="index"
                              v-if="item.child == ''"
                              :index="item._id" @click="item"
				>{{ item.name }}</el-menu-item>
            </el-menu>
		</el-row>

        <div class="article-list">
			<el-row>
				<el-col :lg="16" :md="24">
					<div class="article-detail">

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

    },
    op (item) {
      if (item.menuType == 2) {
        api.articleByMenuId(item._id, (d) => {
          console.log(d)
        })
      }
      if (item.menuType == 3) {
        api.articleInfoByMenuId(item._id, (d) => {
          console.log(d)
        })
      }
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
			.article-detail{
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
