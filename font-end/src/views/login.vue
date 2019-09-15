<template>
  <div class="login">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">王凯的后台管理系统</span>
        <el-form
          :model="LoginUser"
          status-icon
          :rules="ruler"
          ref="LoginForm"
          label-width="100px"
          class="LoginForm"
        >
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="LoginUser.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="LoginUser.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <!-- 将 form种 ref种的内容放入@click的参数中 -->
            <!-- <el-button type="primary" class="MySubmit" @click="submitForm('RegisterForm')">登陆</el-button> -->
            <el-button type="primary" class="MySubmit" @click="submitForm('LoginForm')">登录</el-button>
          </el-form-item>
          <div class="tips">
            <router-link to="/register">注册新账号</router-link>
          </div>
        </el-form>
      </div>
    </section>
  </div>
</template>
<script>
// 解析token
import JwtDecode from "jwt-decode";
export default {
  name: "login",
  components: {},
  data() {
    return {
      LoginUser: {
        email: "",
        password: ""
      },
      // 验证表单规则
      ruler: {
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
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("/api/users/login", this.LoginUser)
            .then(result => {
              const { token } = result.data;
              localStorage.setItem("UserToken", token);
              // 解析token
              const decoded = JwtDecode(token);
              this.$store.dispatch("SetAuthenticated", !this.isEmpty(decoded));
              this.$store.dispatch("setUser", decoded);
              //  打印token console.log(decoded);
              this.$router.push("/index");
            })
            .catch(err => {
             
                this.$message({
                  message: "邮箱或密码错误",
                  type: "error"
                });
              
            });
        }
      });
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>
<style scoped>
.login {
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
.LoginForm {
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
.tips {
  color: #7ed6df;
  text-align: right;
  font-size: 12px;
}
.tips a {
  text-decoration: none;
}
.MySubmit {
  margin-left: -15%;
  width: 100%;
}
</style>