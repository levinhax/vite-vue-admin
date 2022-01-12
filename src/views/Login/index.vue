<template>
  <div class="login-wrapper">
    <div class="login-container">
      <div class="head">
        <div class="name">
          <div class="title">乾坤</div>
          <div class="tips">Vue3.0 后台管理系统</div>
        </div>
      </div>

      <a-form
        ref="loginForm"
        class="login-form"
        :model="formState"
        :rules="formRules"
        @finish="handleFinish"
        @finishFailed="handleFinishFailed"
      >
        <a-form-item>
          <a-input v-model:value="formState.user" placeholder="Username" style="width: 280px">
            <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input v-model:value="formState.password" type="password" placeholder="Password" style="width: 280px">
            <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            :disabled="formState.user === '' || formState.password === ''"
            style="width: 280px"
          >
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts">
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'
// import { defineComponent, reactive, ref, toRefs, UnwrapRef, onMounted } from 'vue';
import { defineComponent, reactive, ref, toRefs, UnwrapRef } from 'vue'
import { useRouter } from 'vue-router'
// import { apiGetLicense } from '../../api/user';
// import { apiUserLogin } from '../../api/user';
// import actions from '../../shared/actions';
// import { authGetFirstLink } from '../../utils/auth';

interface FormState {
  user: string
  password: string
}

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',
  components: {
    UserOutlined,
    LockOutlined,
  },
  setup() {
    const router = useRouter()
    const loginForm = ref(null)
    const state = reactive({
      formData: {
        user: '',
        password: '',
      },
      formRules: {
        user: [{ required: 'true', message: '账户不能为空', trigger: 'blur' }],
        password: [{ required: 'true', message: '密码不能为空', trigger: 'blur' }],
      },
    })
    const formState: UnwrapRef<FormState> = reactive({
      user: '',
      password: '',
    })
    const handleFinish = async (values: FormState) => {
      // const params = {
      //   ...formState,
      // };
      // const res = await apiUserLogin(params);
      console.log(values, formState)
      if (formState.user === 'admin' && formState.password === '123456') {
        const token = 'token_test'
        localStorage.setItem('token', token)
        // actions.setGlobalState({
        //   token,
        //   qiankun_GlobalName: '主应用',
        // });
        router.push({ path: '/micro1' })
      }
    }
    const handleFinishFailed = (errors: ValidateErrorEntity<FormState>) => {
      console.log(errors)
    }

    // const getLicenseInfo = async () => {
    //   const res = await apiGetLicense();
    //   console.log('getLicenseInfo: ', res);
    // };

    // 登陆后路由跳转
    // const handleRoute = () => {
    //   const firstLink = authGetFirstLink([]);
    //   router.push({
    //     path: firstLink || '/',
    //   });
    // };

    // onMounted(() => {
    //   getLicenseInfo();
    // });

    return {
      ...toRefs(state),
      loginForm,
      formState,
      handleFinish,
      handleFinishFailed,
      // getLicenseInfo,
    }
  },
})
</script>

<style scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #fff;
  height: 100vh;
}

.login-container {
  width: 360px;
  height: 320px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 21px 41px 0px rgba(0, 0, 0, 0.2);
  padding: 0 40px;
}
.head {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px 0 20px 0;
  text-align: center;
}

.head .title {
  font-size: 28px;
  color: #40a9ff;
  font-weight: bold;
}
.head .tips {
  font-size: 12px;
  color: #999;
}

/* .login-form {
  width: 100%;
  margin: 0 auto;
} */
</style>
