<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 回收站</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <!--<el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>-->
                <!--<el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10">-->
                    <!--<el-option key="1" label="广东省" value="广东省"></el-option>-->
                    <!--<el-option key="2" label="湖南省" value="湖南省"></el-option>-->
                <!--</el-select>-->
                <!--<el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>-->
                <!--<el-button type="primary" icon="search" @click="search">搜索</el-button>-->
                <el-button type="primary" icon="search" @click="() => {this.$router.push({path: '/add'})}">添加文章</el-button>
            </div>
            <el-table v-loading="loading" :data="articleList" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="author" label="作者" width="120">
                </el-table-column>
                <el-table-column prop="ut" label="时间" sortable width="150">
                </el-table-column>
                <el-table-column prop="title" label="标题" width="250">
                </el-table-column>
                <el-table-column prop="tag" label="标签">
                </el-table-column>
                <el-table-column
                        label="内容"
                        >
                    <template slot-scope="scope">
                        <span style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{ scope.row.content }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <!--<el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
                        <el-button type="text" icon="el-icon-edit" @click="handleDelete(scope.$index, scope.row)">恢复</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="total">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="60%">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="标题">
                        <el-input type="text" v-model="form.title"></el-input>
                    </el-form-item>
                    <el-form-item label="封面图">
                        <el-upload
                            action="http://148.72.64.80/cgi-bin/upload.pl?proj=credit"
                            list-type="picture-card"
                            name="local_file"
                            limit="1"
                            :on-exceed="handleExceed"
                            :on-preview="handlePictureCardPreview"
                            :on-success="successcover"
                            :file-list="file_list"
                            :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </el-form-item>
                    <el-form-item label="内容详情">
                        <quill-editor ref="myTextEditor" v-model="form.content" :options="editorOption"></quill-editor>
                    </el-form-item>
                    <el-form-item label="标签">
                        <el-input type="text" v-model="form.tag"></el-input>
                    </el-form-item>
                    <el-form-item label="分类">
                        <el-select v-model="form.categoryName" placeholder="请选择" @change="onChange">
                            <el-option v-for="(item, index) in classify_list" :key="index" :label="item.name" :value="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="语言">
                        <el-select v-model="form.languageName" placeholder="请选择" @change="onChangeLanguage">
                            <el-option v-for="(item, index) in language_list" :key="index" :label="item.name" :value="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="文章分类">
                        <el-select v-model="form.ownershipMenuId" placeholder="请选择">
                            <el-option v-for="(item, index) in menu_list" :key="index" :label="item.name" :value="item._id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="saveEdit">确认提交</el-button>
                        <el-button @click="editVisible = false">取 消</el-button>
                    </el-form-item>
                </el-form>
            </el-form>
            <!--<span slot="footer" class="dialog-footer">-->
                <!--<el-button @click="editVisible = false">取 消</el-button>-->
                <!--<el-button type="primary" @click="saveEdit">确 定</el-button>-->
            <!--</span>-->
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">确认恢复文章吗？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleRecovery">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
/* eslint-disable camelcase */
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import api from './server.js'
export default {
  name: 'basetable',
  data () {
    return {
      url: './vuetable.json',
      tableData: [],
      articleList: [],
      language_list: [],
      menu_list: [],
      file_list: [],
      classify_list: [],
      cur_page: 1,
      multipleSelection: [],
      select_cate: '',
      select_word: '',
      del_list: [],
      is_search: false,
      editVisible: false,
      delVisible: false,
      loading: false,
      dialogImageUrl: '',
      dialogVisible: false,
      editorOption: {
        placeholder: '输入正文'
      },
      form: {
        name: '',
        date: '',
        address: ''
      },
      idx: -1,
      total: 0,
      pageInit: {
        page: 1,
        limit: 10
      },
      currentRow: ''
    }
  },
  async mounted () {
    this.getList(this.pageInit)
    await this.getLanguageList()
    await this.getClassifyList()
    await this.getMenuList()
  },
  computed: {
    data () {
      return this.tableData.filter((d) => {
        let is_del = false
        for (let i = 0; i < this.del_list.length; i++) {
          if (d.name === this.del_list[i].name) {
            is_del = true
            break
          }
        }
        if (!is_del) {
          if (d.address.indexOf(this.select_cate) > -1 &&
            (d.name.indexOf(this.select_word) > -1 ||
              d.address.indexOf(this.select_word) > -1)
          ) {
            return d
          }
        }
      })
    }
  },
  components: {
    quillEditor
  },
  methods: {
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
    // 分页导航
    handleCurrentChange (val) {
      this.cur_page = val
      let pageInit = {
        page: val,
        limit: 10
      }
      this.getList(pageInit)
    },
    // 获取 easy-mock 的模拟数据
    getData () {
      // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
      if (process.env.NODE_ENV === 'development') {
        this.url = '/ms/table/list'
      }
      this.$axios.post(this.url, {
        page: this.cur_page
      }).then((res) => {
        this.tableData = res.data.list
      })
    },
    search () {
      this.is_search = true
    },
    formatter (row, column) {
      return row.address
    },
    filterTag (value, row) {
      return row.tag === value
    },
    async handleEdit (index, row) {
      this.idx = index
      const item = this.articleList[index]
      this.form = {
        title: item.title,
        content: item.content,
        articleId: item._id,
        coverFid: item.coverFid,
        tag: item.tag,
        ownershipMenuId: item.ownershipMenuId,
        languageId: item.languageId,
        languageName: item.languageName,
        categoryName: item.categoryName,
        categoryId: item.categoryId,
        file_list: [{ url: 'http://148.72.64.80/cgi-bin/download.pl?proj=credit&fid=' + item.coverFid }]
      }
      this.file_list = [{ url: 'http://148.72.64.80/cgi-bin/download.pl?proj=credit&fid=' + item.coverFid }]
      this.editVisible = true
    },
    handleDelete (index, row) {
      this.idx = index
      this.currentRow = row
      this.delVisible = true
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    delAll () {
      const length = this.multipleSelection.length
      let str = ''
      this.del_list = this.del_list.concat(this.multipleSelection)
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + ' '
      }
      this.$message.error('删除了' + str)
      this.multipleSelection = []
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 保存编辑
    saveEdit () {
      console.log(this.form)
      api.edit(this.form, (d) => {
        this.getList(this.pageInit)
        this.$message.success(`修改成功`)
      })
      this.editVisible = false
    },
    // 确定删除
    handleRecovery () {
      let id = this.articleList[this.idx]._id
      this.tableData.splice(this.idx, 1)
      api.recovery(id, (d) => {
        this.getList(this.pageInit)
        this.$message.success('恢复成功')
      })
      this.delVisible = false
    },
    getList (pageInit) {
      this.loading = true
      api.list(pageInit.page, pageInit.limit, (d) => {
        this.total = d.total
        let that = this
        d.list.forEach(item => {
          item.ut = that.timestampToTime(item.ut).slice(0, 10)
        })
        this.articleList = d.list
        this.loading = false
      })
    },
    async getLanguageList () {
      api.langList((d) => {
        console.log(d)
        this.language_list = d.list
      })
    },
    async getClassifyList () {
      api.classifiesList((d) => {
        console.log(d)
        this.classify_list = d.list
      })
    },
    async getMenuList () {
      api.menuList((d) => {
        console.log(d)
        this.menu_list = d.list
      })
    },
    onChange (e) {
      this.form.categoryId = this.classify_list[e]._id
      this.form.categoryName = this.classify_list[e].name
      console.log(this.form)
    },
    onChangeLanguage (e) {
      this.form.languageId = this.language_list[e]._id
      this.form.languageName = this.language_list[e].name
    },
    successcover (response, file, fileList) {
      this.form.coverFid = response.fid
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  },
  watch: {
    $route (to, from) {
      this.getList(this.pageInit)
    }
  }
}

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
    .mr10{
        margin-right: 10px;
    }
</style>
