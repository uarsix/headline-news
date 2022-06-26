<template>
  <div>
    <van-nav-bar title="登陆">
      <!-- <van-icon name="cross" slot="left" /> -->
      <template v-slot:left> <van-icon name="cross" /> </template>
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model.trim="mobile"
        name="mobile"
        placeholder="手机号"
        :rules="[
          { required: true, message: '请输入正确手机号' },
          {
            pattern:
              /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
            message: '请输入正确格式',
          },
        ]"
      >
        <i class="toutiao toutiao-shouji" slot="left-icon"></i>
      </van-field>
      <van-field
        v-model.number="code"
        type="code"
        name="code"
        placeholder="验证码"
        :rules="[{ required: true, message: '请填写验证码' }]"
      >
        <i class="toutiao toutiao-yanzhengma" slot="left-icon"></i>
        <template #button>
          <van-count-down
            :time="time"
            format="sss"
            v-if="isCountDownShow"
            @finish="isCountDownShow = false"
          />
          <!-- -->
          <van-button
            size="small"
            class="yzm"
            native-type="button"
            v-else
            @click="OnSendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          class="login_button"
          >登陆</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { getSnsCode, login } from '@/api/user'
export default {
  data () {
    return {
      mobile: '15257124299',
      code: '246810',
      time: 60 * 1000,
      isCountDownShow: false
    }
  },
  methods: {
    async onSubmit (values) {
      try {
        const res = await login(values)
        this.$store.commit('setUser', res.data.data)
        this.$toast.success('登陆成功')
      } catch (err) { this.$toast.fail(err.response.data.message) }
    },
    async OnSendSms () {
      try {
        await this.$refs.form.validate('mobile')
        this.$toast.success('发送成功')
        this.isCountDownShow = true
        try {
          await getSnsCode(this.mobile)
        } catch (err) {
          this.$toast.fail('发送失败')
        }
      } catch (err) {
        console.log(err)
        this.$toast.fail('校验失败')
      }
    }
  }
}
</script>

<style scoped lang='less'>
.toutiao {
  font-size: 30px;
}
.yzm {
  width: 152px;
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  border-radius: 23px;
  font-size: 22px;
  color: #666;
  .van-button__text {
    zoom: 0.96;
  }
}
.login_button {
  width: 694px;
  height: 88px;
  background-color: #6db4fb;
  border-radius: 10px;
  color: #ffffff;
  font-size: 30px;
}
.van-count-down {
  text-align: center;
  width: 74px;
  height: 22px;
}
</style>
