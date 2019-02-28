<template>
    <div>
        <el-row class="tac">
            <el-col :span="12">
                <h5>菜单分类</h5>
                <el-menu
                        default-active="0"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose">
                    <label v-for="(navMenu,index) in list" :key="index">
                        <el-menu-item v-if="navMenu.menuType == 2" :index="navMenu.name">
                            <span slot="title">{{navMenu.name}}</span>
                            <el-tag type="danger" class="my-tag" @click="deleteMenu(navMenu._id)" >删除</el-tag>
                            <el-tag type="info" class="my-tag">编辑</el-tag>
                            <el-tag type="primary" class="my-tag">添加</el-tag>
                        </el-menu-item>
                        <el-submenu v-if="navMenu.menuType == 1" :index="navMenu.name">
                            <template slot="title">
                                <span>{{navMenu.name}}</span>
                                <el-tag type="danger" class="my-tag" @click="deleteMenu(navMenu._id)" >删除</el-tag>
                                <el-tag type="info" class="my-tag">编辑</el-tag>
                                <el-tag type="primary" class="my-tag">添加</el-tag>
                            </template>
                            <label v-for="(navMenuTwo) in navMenu.child">
                                <el-menu-item v-if="navMenuTwo.menuType == 2" :index="navMenuTwo.name">
                                    <span slot="title">{{navMenuTwo.name}}</span>
                                    <el-tag type="danger" class="my-tag">删除</el-tag>
                                    <el-tag type="info" class="my-tag">编辑</el-tag>
                                    <el-tag type="primary" class="my-tag">添加</el-tag>
                                </el-menu-item>
                                <el-submenu v-if="navMenuTwo.menuType == 1" :index="navMenuTwo.name">
                                    <template slot="title">
                                        <span>{{navMenuTwo.name}}</span>
                                        <el-tag type="danger" class="my-tag">删除</el-tag>
                                        <el-tag type="info" class="my-tag">编辑</el-tag>
                                        <el-tag type="primary" class="my-tag">添加</el-tag>
                                    </template>
                                    <label v-for="(navMenuThree) in navMenuTwo.child">
                                        <el-menu-item v-if="navMenuThree.menuType == 2" :index="navMenuThree.name">
                                            <span slot="title">{{navMenuThree.name}}</span>
                                            <el-tag type="danger" class="my-tag">删除</el-tag>
                                            <el-tag type="info" class="my-tag">编辑</el-tag>
                                            <el-tag type="primary" class="my-tag">添加</el-tag>
                                        </el-menu-item>
                                    </label>
                                </el-submenu>
                            </label>
                        </el-submenu>
                    </label>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>
<style lang="less" scoped>
    .my-tag{
        text-align: right;
        float: right;
        vertical-align: middle;
        transform: translateY(70%);
        margin: 0 5px;
        cursor:pointer;
    }
</style>
<script>
import api from './server'
export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    api.list((d) => {
      console.log(d)
      this.list = d.list
    })
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    deleteMenu (id) {
      console.log(id)
    }
  }
}
</script>
