<template>
    <div class="add">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 文章</el-breadcrumb-item>
                <el-breadcrumb-item>添加文章</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="plugins-tips" style="text-align: center">
                添加文章
            </div>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="标题">
                    <el-input type="text" v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="封面图">
                    <el-upload
                        action="https://www.uslazycreditcard.com/cgi-bin/upload.pl?proj=credit"
                        list-type="picture-card"
                        name="local_file"
                        :file-list="file_list"
                        :on-preview="handlePictureCardPreview"
                        :on-success="successcover"
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
                    <el-select v-model="form.classifyIndex" placeholder="请选择" @change="onChange">
                        <el-option v-for="(item, index) in classify_list" :key="index" :label="item.name" :value="index"></el-option>
                    </el-select>
                    <label for="" class="addClassify" @click="visible = true">添加分类</label>
                </el-form-item>
                <el-form-item label="语言">
                    <el-select v-model="form.languageIndex" placeholder="请选择" @change="onChangeLanguage">
                        <el-option v-for="(item, index) in language_list" :key="index" :label="item.name" :value="index"></el-option>
                    </el-select>
                    <label for="" class="addClassify" @click="langVisible = true">添加语言</label>
                </el-form-item>
                <el-form-item label="文章分类">
                    <el-select v-model="form.ownershipMenuId" placeholder="请选择">
                        <el-option v-for="(item, index) in menu_list" :key="index" :label="item.name" :value="item._id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submit">确认提交</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-dialog v-dialogDrag title="添加分类" center :visible.sync="visible" width="30%">
            <el-form ref="form" label-width="80px">
                <el-form-item label="分类名称">
                    <el-input type="text" v-model="classify_name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="addClassify">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog v-dialogDrag title="添加语言" center :visible.sync="langVisible" width="30%">
            <el-form ref="form" label-width="80px">
                <el-form-item label="语言名称">
                    <el-input type="text" v-model="lang_name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelLang">取 消</el-button>
                <el-button type="primary" @click="addLanguage">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import api from './server.js'
export default {
  name: 'editor',
  data: function () {
    return {
      content: '',
      visible: false,
      langVisible: false,
      language_list: [],
      menu_list: [],
      classify_list: [],
      file_list: [],
      dialogImageUrl: '',
      dialogVisible: false,
      form: {
        title: '',
        content: '',
        categoryId: '',
        categoryName: '',
        languageId: '',
        tag: '',
        languageName: '',
        coverFid: '',
        ownershipMenuId: ''
      },
      classify_name: '',
      lang_name: '',
      editorOption: {
        placeholder: '输入正文'
      }
    }
  },
  components: {
    quillEditor
  },
  created () {
    console.log(this.$parent.tagsList)
    this.$parent.tagsList = []
    console.log(this.$parent.tagsList)
    this.getLanguageList()
    this.getClassifyList()
    this.getMenuList()
  },
  methods: {
    onEditorChange ({ editor, html, text }) {
      this.content = html
    },
    getMenuList () {
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
    addClassify () {
      api.addClassifies(this.classify_name, (d) => {
        console.log(d)
        this.classify_name = ''
        this.visible = false
        this.$message.success('添加成功！')
        this.getClassifyList()
      })
    },
    addLanguage () {
      api.addLang(this.lang_name, (d) => {
        console.log(d)
        this.lang_name = ''
        this.langVisible = false
        this.$message.success('添加成功！')
        this.getLanguageList()
      })
    },
    getLanguageList () {
      api.langList((d) => {
        console.log(d)
        this.language_list = d.list
      })
    },
    getClassifyList () {
      api.classifiesList((d) => {
        console.log(d)
        this.classify_list = d.list
      })
    },
    cancel () {
      this.classify_name = ''
      this.visible = false
    },
    cancelLang () {
      this.lang_name = ''
      this.langVisible = false
    },
    submit () {
      api.addArticle(this.form, (d) => {
        console.log(d)
        if (d.uerr == '' || d.uerr == undefined) {
          this.$message.success('提交成功')
          this.$parent.tagsList = []
          this.$router.push({ path: 'articleList' })
        } else {
          this.$message.error(d.ustr)
        }
      })
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
  }
}
</script>
<style scoped lang="less">
    .add {
        width: 80%;
        .addClassify {
            color: #20a0ff;
            padding-left: 20px;
        }
    }

    .editor-btn {
        margin-top: 20px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
