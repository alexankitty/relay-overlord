<script setup>
import authV1MaskDark from '@/assets/images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@/assets/images/pages/auth-v1-mask-light.png'
import authV1Tree2 from '@/assets/images/pages/auth-v1-tree-2.png'
import authV1Tree from '@/assets/images/pages/auth-v1-tree.png'
import logo from '@/assets/logo.svg?raw'
import { request } from '@/utils'
import { useTheme } from 'vuetify'
import { useMessageStore } from '@/store'
import router from '@/router'

const messageStore = useMessageStore()

const valid = ref()
const rules = {
  username: [v => !!v || 'Username is required'],
  password: [v => !!v || 'Password is required'],
}

const login = async () => {
  if (!valid.value) {
    const error = 'Please fill the form!'
    messageStore.setError({ error })
  } else {
    await request('post', 'auth/signin', {
      username: username.value,
      password: password.value,
      remember: remember.value,
    })
      .then(res => {
        if (res?.isSuccess === true) {
          localStorage.setItem('token', res?.data?.accessToken)
          router.replace('/')
        }
      })
      .catch(err => {
        messageStore.setError({ error: err.message })
      })
  }
}

const username = ref('')
const password = ref('')
const remember = ref('')

const vuetifyTheme = useTheme()
const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? authV1MaskLight : authV1MaskDark
})
const isPasswordVisible = ref(false)
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
    >
      <VAlert
        v-if="messageStore.error"
        border="bottom"
        color="error"
        dark
        class="text-center"
      >
        {{ messageStore.error }}
      </VAlert>

      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <div v-html="logo" style="color: var(--initial-loader-color)" />
          </div>
        </template>

        <VCardTitle class="font-weight-semibold text-2xl text-uppercase"> Relay Overlord </VCardTitle>
      </VCardItem>

      <VCardText>
        <VForm
          v-model="valid"
          lazy-validation
          @submit.prevent="() => {}"
        >
          <VRow>
            <!-- username -->
            <VCol cols="12">
              <VTextField
                v-model="username"
                label="Username"
                type="username"
                :counter="55"
                :rules="rules.username"
                required
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="password"
                label="Password"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                :rules="rules.password"
                required
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />

              <!-- remember me checkbox -->
              <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
                <VCheckbox
                  v-model="remember"
                  label="Remember me"
                />

                <a
                  class="ms-2 mb-1"
                  href="javascript:void(0)"
                >
                  Forgot Password?
                </a>
              </div>

              <VBtn
                block
                @click="login"
              >
                Login
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>

    <VImg
      class="auth-footer-start-tree d-none d-md-block"
      :src="authV1Tree"
      :width="250"
    />

    <VImg
      :src="authV1Tree2"
      class="auth-footer-end-tree d-none d-md-block"
      :width="350"
    />

    <!-- bg img -->
    <VImg
      class="auth-footer-mask d-none d-md-block"
      :src="authThemeMask"
    />
  </div>
</template>

<style lang="scss">
@use '@core/scss/pages/page-auth.scss';
</style>

<route lang="yaml">
meta:
  layout: blank
</route>
