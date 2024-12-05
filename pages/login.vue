<template>
  <div class="login">
    <h1 class="title">Login</h1>
    <form @submit.prevent="handleLogin" class="login-form">
      <div class="form-group">
        <label for="login">Username</label>
        <input
          id="login"
          v-model="form.login"
          type="text"
          required
          placeholder="Enter your username"
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="form.password"
          type="password"
          required
          placeholder="Enter your password"
        />
      </div>
      <button type="submit" class="login-button" :disabled="loading">
        {{ loading ? 'Logging in...' : 'Login' }}
      </button>
    </form>
    <p class="register-link">
      Don't have an account?
      <NuxtLink to="/register">Register here</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { useToast } from 'vue-toastification'

const auth = useAuthStore()
const router = useRouter()
const toast = useToast()
const loading = ref(false)

const form = ref({
  login: '',
  password: '',
})

const handleLogin = async () => {
  try {
    loading.value = true
    await auth.login(form.value)
    toast.success('Successfully logged in!')
    router.push('/')
  } catch (error) {
    toast.error('Login failed. Please check your credentials.')
    console.error('Login failed:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.login {
  max-width: 400px;
  margin: 0 auto;
  padding: $spacing-xl;
}

.title {
  text-align: center;
  margin-bottom: $spacing-xl;
  color: $primary-color;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;

  label {
    color: $text-secondary;
  }

  input {
    padding: $spacing-md;
    border: 1px solid $background-secondary;
    border-radius: 4px;
    background: $background-secondary;
    color: $text-primary;

    &:focus {
      outline: none;
      border-color: $primary-color;
    }
  }
}

.login-button {
  background-color: $primary-color;
  color: $text-primary;
  padding: $spacing-md;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: $primary-color;
  }
}

.register-link {
  text-align: center;
  margin-top: $spacing-lg;
  color: $text-secondary;

  a {
    color: $primary-color;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
