<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">王凯的后台管理系统</span>
        <el-form
          :model="RegisterUser"
          status-icon
          :rules="ruler"
          ref="RegisterForm"
          label-width="100px"
          class="RegisterForm"
        >
          <el-form-item label="用户名" prop="name">
            <el-input v-model="RegisterUser.name" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="RegisterUser.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="RegisterUser.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password2">
            <el-input type="password" v-model="RegisterUser.password2" placeholder="请再输入密码"></el-input>
          </el-form-item>
          <el-form-item label="您的身份">
            <el-select v-model="RegisterUser.identify" placeholder="请选择身份">
              <el-option label="管理员" value="manager"></el-option>
              <el-option label="普通用户" value="user"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <!-- 将 form种 ref种的内容放入@click的参数中 -->
            <!-- <el-button type="primary" class="MySubmit" @click="submitForm('RegisterForm')">登陆</el-button> -->
            <el-button type="primary" class="MySubmit" @click="submitForm('RegisterForm')">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: "register",
  components: {},
  data() {
    // 验证两次密码是否一致
    var CheckPassword = (rule, value, callback) => {
      if (value !== this.RegisterUser.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      RegisterUser: {
        name: "",
        email: "",
        password: "",
        password2: "",
        identify: ""
      },
      // 验证表单规则
      ruler: {
        name: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 2, max: 10, message: "用户名长度应在2-10位之间" }
        ],
        email: [
          {
            type: "email",
            required: true,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "密码长度应在6-20位之间",
            trigger: "blur"
          }
        ],
        password2: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "密码长度应在6-20位之间",
            trigger: "blur"
          },
          { validator: CheckPassword, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid){
         this.$axios.post('/api/users/register',this.RegisterUser).then(result=>{
           this.$message({
             message:'恭喜注册成功',
             type:'success'
           })
         this.$router.push('/login')
         }).catch(err=>{
           this.$message({
             message:'邮箱已被注册，请更换邮箱',
             type:'error'
           })
         })
          
       }
      });
    }
  }
};
</script>
<style scoped>
.register {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/background.png);
  background-size: 100% 100%;
}
.form_container {
  width: 400px;
  height: 200px;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #7ed6df;
}
.RegisterForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
  /* 兼容 */
  filter: alpha(opacity=80); /* IE */
  -moz-opacity: 0.8; /* 老版Mozilla */
  -khtml-opacity: 0.8; /* 老版Safari */
  opacity: 0.8; /* 支持opacity的浏览器*/
}

.MySubmit {
  margin-left: -15%;
  width: 100%;
}
</style>