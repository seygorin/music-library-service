<template>
  <div class="register">
    <h1 class="title">Register</h1>
    <form @submit.prevent="handleRegister" class="register-form">
      <div class="form-group">
        <label for="login">Username</label>
        <input
          id="login"
          v-model="form.login"
          type="text"
          required
          placeholder="Choose a username"
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="form.password"
          type="password"
          required
          placeholder="Choose a password"
        />
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          v-model="form.confirmPassword"
          type="password"
          required
          placeholder="Confirm your password"
        />
      </div>
      <button type="submit" class="register-button" :disabled="loading || !isValid">
        {{ loading ? 'Registering...' : 'Register' }}
      </button>
    </form>
    <p class="login-link">
      Already have an account?
      <NuxtLink to="/login">Login here</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
const auth = useAuthStore()
const router = useRouter()
const loading = ref(false)

const form = ref({
  login: '',
  password: '',
  confirmPassword: '',
})

const isValid = computed(
  () => form.value.password === form.value.confirmPassword && form.value.password.length >= 6
)

const handleRegister = async () => {
  if (!isValid.value) return

  try {
    loading.value = true
    await auth.register(form.value)
    router.push('/login')
  } catch (error) {
    console.error('Registration failed:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.register {
  max-width: 400px;
  margin: 0 auto;
  padding: $spacing-xl;
}

.title {
  text-align: center;
  margin-bottom: $spacing-xl;
  color: $primary-color;
}

.register-form {
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

.register-button {
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

.login-link {
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
