<template>
  <v-container class="py-4">
    <v-card class="pa-4" outlined>
      <v-card-text>
        <v-form @submit.prevent="submitLogin">
          <label for="username" class="v-label">Username</label>
          <v-text-field id="username" v-model="username" placeholder="Username" autocomplete="username" outlined
            dense></v-text-field>

          <label for="password" class="v-label">Password</label>
          <v-text-field id="password" v-model="password" placeholder="Password" type="password"
            autocomplete="current-password" outlined dense></v-text-field>

          <v-btn class="mt-4" color="primary" block type="submit"> Log In </v-btn>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn color="secondary" block class="mt-2" @click.prevent="showregisterBox = true"> Create New Account </v-btn>
      </v-card-actions>
    </v-card>

    <RegisterBox :show="showregisterBox" @update:show="showregisterBox = $event" />
  </v-container>
</template>


<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import RegisterBox from '@/components/RegisterBox.vue';

export default {
  components: {
    RegisterBox
  },
  setup() {
    const router = useRouter();
    const username = ref('');
    const password = ref('');
    const showregisterBox = ref(false);

    const submitLogin = async () => {
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username.value,
            password: password.value
          })
        });

        if (!response.ok) {
          throw new Error('Login failed');
        }

        const data = await response.json();

        console.debug('Success:', data);

        localStorage.setItem('token', data.token);

        router.push(data.redirectUrl);
      } catch (error) {
        console.error('Error:', error);
        alert('Login failed. Please try again.');
      }
    };

    return {
      username,
      password,
      showregisterBox,
      submitLogin
    };
  }
};
</script>
