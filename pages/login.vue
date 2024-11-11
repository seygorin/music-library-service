<template>
  <div class="login">
    <h1 class="title">Login</h1>
    <form @submit.prevent="handleLogin" class="login-form">
      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" v-model="email" type="email" required placeholder="Enter your email" />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          required
          placeholder="Enter your password"
        />
      </div>
      <button type="submit" class="login-button">Login</button>
    </form>
  </div>
</template>

<script setup lang="ts">
const auth = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  const mockUser = {
    id: 1,
    email: email.value,
    name: 'Test User',
  }

  auth.setUser(mockUser)
  router.push('/')
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
</style>
