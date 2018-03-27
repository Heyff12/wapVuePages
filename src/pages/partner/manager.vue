<template>
    <div>
        <div class="right_head">
            门店管理人信息
        </div>
        <div class="right_body">
            <el-form label-width="140px" class="demo-ruleForm" :model="searchkey" :rules="searchkey_rule" ref="searchkey">
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                        <el-form-item label="大区名称：" prop="district_name">
                            <el-input v-model.trim="searchkey.district_name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                        <el-form-item label="门店编号：" prop="store_id">
                            <el-input v-model.trim="searchkey.store_id"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                        <el-form-item label="门店名称：" prop="store_name">
                            <el-input v-model.trim="searchkey.store_name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                        <el-form-item label="门店管理人手机号：" prop="mobile">
                            <el-input v-model.trim="searchkey.mobile"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                        <el-form-item label="运行状态：">
                            <el-select v-model="searchkey.status" placeholder="请选择运行状态">
                                <el-option label="待激活" value="2"></el-option>
                                <el-option label="已激活" value="3"></el-option>
                                <el-option label="已注销" value="4"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                        <el-form-item label-width="0" class="t_c">
                            <el-button type="primary" @click="search_sub">查询</el-button>
                            <el-button type="info" @click="resetForm('searchkey')">重置</el-button>
                            <!-- <el-button type="success" @click="addItem">新增</el-button> -->
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template>
                        <el-table :data="list_now" border stripe style="width: 100%">
                            <el-table-column prop="district_name" label="大区名称" resizable min-width="100px">
                            </el-table-column>
                            <el-table-column prop="store_id" label="门店编号" resizable min-width="100px">
                            </el-table-column>
                            <el-table-column prop="store_name" label="门店名称" resizable min-width="100px">
                            </el-table-column>
                            <el-table-column prop="store_address" label="门店详细地址" resizable min-width="120px">
                            </el-table-column>
                            <el-table-column prop="name" label="门店管理人姓名" resizable min-width="100px">
                            </el-table-column>
                            <el-table-column prop="idnumber" label="门店管理人身份证号" resizable min-width="120px">
                            </el-table-column>
                            <el-table-column prop="mobile" label="门店管理人手机号" resizable min-width="120px">
                            </el-table-column>
                            <el-table-column prop="update_time" label="更新时间" resizable min-width="130px">
                            </el-table-column>
                            <el-table-column prop="status" label="运行状态" resizable>
                                <template slot-scope="scope">
                                    <span v-if="scope.row.status==2"  class="warn">待激活</span>
                                    <span v-else-if="scope.row.status==3" class="success">已激活</span>
                                    <span v-else class="danger">已注销</span>
</template>
                    </el-table-column>
                    <el-table-column label="操作" resizable min-width="100px">
<template slot-scope="scope">
    <el-button type="warning" @click="editItem(scope.row)" plain>
        编辑</el-button>
</template>
                    </el-table-column>
                </el-table>
            </template>
            <div class="block t_r mar_t20">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page_now" :page-sizes="[20,50,100,200,250]" :page-size="page_per" layout="total, sizes, prev, pager, next" :total="pages_all">
                </el-pagination>
            </div>
        </div>
        <bounced :visible="dialogEdit" :newclass="big_bounced">
            <span slot="header">编辑门店管理人信息</span>
            <el-form :model="editMan" :rules="rules" ref="editMan" label-width="170px" class="demo-ruleForm">
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                        <el-form-item label="大区名称：">
                            <el-input v-model.trim="editMan.district_name" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                        <el-form-item label="门店编号：">
                            <el-input v-model.trim="editMan.store_id" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                        <el-form-item label="门店名称：" prop="store_name">
                            <el-input v-model.trim="editMan.store_name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                        <el-form-item label="门店地址：" prop="store_address">
                            <el-input v-model.trim="editMan.store_address"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                        <el-form-item label="门店管理人姓名：" prop="name">
                            <el-input v-model.trim="editMan.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                        <el-form-item label="门店管理人身份证号：" prop="idnumber">
                            <el-input v-model.trim="editMan.idnumber"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                        <el-form-item label="门店管理人手机号：">
                            <el-input v-model.trim="editMan.mobile" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                        <el-form-item label="运行状态：">
                            <el-select v-model="editMan.status" placeholder="" disabled>
                                <el-option label="待激活" value="2"></el-option>
                                <el-option label="已激活" value="3"></el-option>
                                <el-option label="已注销" value="4"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <p slot="footer">
                <span class="bounced_button bounced_sure" @click="mendSure">确认</span>
                <span class="bounced_button bounced_cancle"  @click="dialogEdit = false">取消</span>
            </p>
        </bounced>
    </div>
</template>

<script>
import bounced from "@/components/bounced";
import {
  test_number,
  test_chinese,
  test_tel,
  test_idnumber
} from "@/method/yanzheng";
import { searchPost, mendPost } from "@/method/util";
export default {
  name: "manager",
  components: {
    bounced
  },
  data() {
    return {
      dialogEdit: false, //编辑弹框默认不显示
      big_bounced: "large_bounced", //注销弹框变大--样式
      searchkey: {
        store_name: "",
        store_id: "",
        district_name: "",
        mobile: "",
        status: ""
      },
      searchkey_rule: {
        store_name: test_chinese("门店名称", 0, 15, false, "blur"),
        store_id: test_number("门店编号", 0, 20, false, "blur"),
        district_name: test_chinese("大区名称", 0, 15, false, "blur"),
        mobile: test_tel("门店管理人手机号", false, "blur")
      },
      list_url: "/fenqi_mis/v1/api/partner/store_mgr/list", //获取列表
      edit_url: "/fenqi_mis/v1/api/partner/store_mgr/modify", //修改
      editMan: {
        store_name: "",
        name: "",
        idnumber: "",
        store_address: ""
      }, //单个负责人信息
      rules: {
        store_name: test_chinese("门店名称", 0, 15, true, "blur"),
        name: test_chinese("门店管理人姓名", 0, 5, true, "blur"),
        idnumber: test_idnumber("门店管理人身份证号", true, "blur"),
        store_address: test_chinese("门店地址", 0, 15, true, "blur")
      },
      editManCompare: {
        store_name: "",
        name: "",
        idnumber: "",
        store_address: ""
      }, //单个负责人信息--初始比较值
      pages_all: 0, //总信息数
      page_per: 20, //每页信息数
      page_now: 1, //当前页数
      pages: 1, //总页数
      list_now: [] //当前展示信息
    };
  },
  created: function() {
    this.get_list(); //获取列表
  },
  methods: {
    //获取列表
    get_list: function() {
      let _this = this;
      let post_data = {
        page: _this.page_now,
        page_size: _this.page_per
      };
      searchPost(this.searchkey.store_name, "store_name", post_data);
      searchPost(this.searchkey.store_id, "store_id", post_data);
      searchPost(this.searchkey.district_name, "district_name", post_data);
      searchPost(this.searchkey.mobile, "mobile", post_data);
      searchPost(this.searchkey.status, "status", post_data, true);
      this.$ajax_axios.ajax_get(this, this.list_url, post_data, data_return => {
        _this.pages_all = data_return.data.store_cnt;
        _this.list_now = data_return.data.store_info;
      });
    },
    //提交查询
    search_sub: function() {
      this.$refs.searchkey.validate(valid => {
        if (valid) {
          this.get_list();
        } else {
          return false;
        }
      });
    },
    //重置
    resetForm: function(formName) {
      this.$refs[formName].resetFields();
      this.searchkey.status = "";
    },
    //新增
    addItem() {},
    //修改
    editItem(val) {
      this.$refs["editMan"].resetFields(); //重置
      this.editManCompare.store_name = val.store_name;
      this.editManCompare.name = val.name;
      this.editManCompare.idnumber = val.idnumber;
      this.editManCompare.store_address = val.store_address;
      //   this.editMan = val;
      this.editMan.store_name = val.store_name;
      this.editMan.store_id = val.store_id;
      this.editMan.district_name = val.district_name;
      this.editMan.store_address = val.store_address;
      this.editMan.name = val.name;
      this.editMan.idnumber = val.idnumber;
      this.editMan.mobile = val.mobile;
      this.editMan.status = val.status.toString();
      this.dialogEdit = true;
    },
    //确认修改--验证
    mendSure() {
      this.$refs.editMan.validate(valid => {
        if (valid) {
          this.mendSure_post();
        } else {
          return false;
        }
      });
    },
    //确认提交事件
    mendSure_post() {
      let post_data = {};
      mendPost(
        this.editMan.store_name,
        "store_name",
        post_data,
        this.editManCompare.store_name
      );
      mendPost(this.editMan.name, "name", post_data, this.editManCompare.name);
      mendPost(
        this.editMan.idnumber,
        "idnumber",
        post_data,
        this.editManCompare.idnumber
      );
      mendPost(
        this.editMan.store_address,
        "store_address",
        post_data,
        this.editManCompare.store_address
      );
      let post_dataLen = Object.keys(post_data).length;
      if (post_dataLen <= 0) {
        this.$message({
          message: "当前信息尚无修改",
          type: "warning"
        });
        return false;
      }
      this.$ajax_axios.ajax_post(
        this,
        this.edit_url,
        this.post_data,
        data_return => {
          this.dialogEdit = false; //关闭弹框
          this.get_list(); //刷新数据
        },
        () => {
          this.dialogEdit = false; //关闭弹框
        },
        () => {
          this.dialogEdit = false; //关闭弹框
        }
      );
    },
    //更改每页显示信息条数
    handleSizeChange(val) {
      let _this = this;
      //console.log(`每页 ${val} 条`);
      _this.page_per = val;
      _this.page_now = 1;
      this.get_list();
    },
    //获取当前页信息
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      let _this = this;
      _this.page_now = val;
      this.get_list();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">

</style>
