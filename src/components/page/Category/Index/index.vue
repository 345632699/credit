<template>
    <div>
        <el-row class="tac">
            <el-col :span="12">
                <h5 class="title">菜单分类</h5>
                <el-button style="margin: 10px" type="primary" @click="editVisible = true">添加根目录</el-button>
                <el-menu
                        default-active="0"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose">
                    <label v-for="(navMenu,index) in list" :key="index">
                        <el-menu-item v-if="navMenu.menuType == 2" :index="navMenu.name">
                            <span slot="title">{{navMenu.name}}</span>
                            <el-tag type="danger" class="my-tag" @click="deleteMenu(navMenu._id)" >删除</el-tag>
                            <el-tag type="info" class="my-tag" @click="modifyDialog(navMenu)">编辑</el-tag>
                            <el-tag type="primary" class="my-tag" @click.native="showDialog(navMenu._id)">添加</el-tag>
                        </el-menu-item>
                        <el-submenu v-if="navMenu.menuType == 1" :index="navMenu.name">
                            <template slot="title">
                                <span>{{navMenu.name}}</span>
                                <el-tag type="danger" style="margin-right: 20px"  class="my-tag" @click="deleteMenu(navMenu._id)" >删除</el-tag>
                                <el-tag type="info" class="my-tag" @click="modifyDialog(navMenu)">编辑</el-tag>
                                <el-tag type="primary" class="my-tag" @click.native="showDialog(navMenu._id)">添加</el-tag>
                            </template>
                            <label v-for="(navMenuTwo) in navMenu.child">
                                <el-menu-item v-if="navMenuTwo.menuType == 2" :index="navMenuTwo.name">
                                    <span slot="title">{{navMenuTwo.name}}</span>
                                    <el-tag type="danger" class="my-tag" @click="deleteMenu(navMenuTwo._id)" >删除</el-tag>
                                    <el-tag type="info" class="my-tag" @click="modifyDialog(navMenuTwo,navMenu._id)">编辑</el-tag>
                                    <el-tag type="primary" class="my-tag" @click.native="showDialog(navMenuTwo._id)">添加</el-tag>
                                </el-menu-item>
                                <el-submenu v-if="navMenuTwo.menuType == 1" :index="navMenuTwo.name">
                                    <template slot="title">
                                        <span>{{navMenuTwo.name}}</span>
                                        <el-tag type="danger" style="margin-right: 20px" class="my-tag" @click="deleteMenu(navMenuTwo._id)" >删除</el-tag>
                                        <el-tag type="info" class="my-tag" @click="modifyDialog(navMenuTwo,navMenu._id)">编辑</el-tag>
                                        <el-tag type="primary" class="my-tag" @click.native="showDialog(navMenuTwo._id)">添加</el-tag>
                                    </template>
                                    <label v-for="(navMenuThree) in navMenuTwo.child">
                                        <el-menu-item v-if="navMenuThree.menuType == 2" :index="navMenuThree.name">
                                            <span slot="title">{{navMenuThree.name}}</span>
                                            <el-tag type="danger" class="my-tag" @click="deleteMenu(navMenuThree._id)" >删除</el-tag>
                                            <el-tag type="info" class="my-tag" @click="modifyDialog(navMenuThree,navMenuTwo._id)">编辑</el-tag>
                                            <!--<el-tag type="primary" class="my-tag" @click.native="showDialog(navMenuThree._id)">添加</el-tag>-->
                                        </el-menu-item>
                                    </label>
                                </el-submenu>
                            </label>
                        </el-submenu>
                    </label>
                </el-menu>
            </el-col>
        </el-row>
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="60%" @close="onclose">
            <el-form ref="form" v-model="form" label-width="80px">
                <el-form-item label="菜单名称">
                    <el-input type="text" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="菜单父id">
                    <el-input type="text" v-model="form.parentId"></el-input>
                </el-form-item>
                <label style="font-size: 14px;color: red;padding-left: 20px" for="">父id为空时，创建的是根菜单</label>
                <el-form-item style="margin-top: 20px">
                    <el-button type="primary" @click="saveEdit">确认提交</el-button>
                    <el-button @click="editVisible = false">取 消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<style lang="less" scoped>
    .title{
        padding: 10px;
    }
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
      list: [],
      editVisible: false,
      form: {
        id: '',
        name: '',
        parentId: ''
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      api.list((d) => {
        console.log(d)
        this.list = d.list
      })
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    saveEdit () {
      if (this.form.id) {
        let params = {
          'id': this.form.id,
          'name': this.form.name,
          'parentId': this.form.parentId
        }
        api.modify(params, (d) => {
          this.getList()
          this.$message.success('修改成功')
          this.editVisible = false
          this.form = []
        })
      } else {
        if (this.form.name == '') {
          this.$message.error('菜单名不能为空')
          return
        }
        api.add(this.form, (d) => {
          this.getList()
          this.$message.success('添加成功')
          this.editVisible = false
          this.form = []
        })
      }
    },
    showDialog (id) {
      this.editVisible = true
      this.form.parentId = id
    },
    modifyDialog (item, parentId = '') {
      this.form.id = item._id
      this.form.name = item.name
      this.form.parentId = parentId
      this.editVisible = true
    },
    deleteMenu (id) {
      api.delete(id, (d) => {
        this.getList()
        this.$message.success('删除成功')
      })
    },
    onclose () {
      this.form = []
    }
  }
}
</script>
