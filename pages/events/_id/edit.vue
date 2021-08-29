<template>
  <div class="max-w-7xl mx-auto py-16 px-4 sm:py-56 sm:px-6 lg:px-8 min-h-screen">
    <div class="text-center">
      <h2 class="text-base font-semibold text-blue-700 tracking-wide uppercase">Edit current event / hey </h2>
      <nuxt-link :to="{ name: 'events' }" class="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-wider lg:text-6xl">Eventdrive</nuxt-link>

      <div class="py-10">
        <form @submit.prevent="update" class="grid gap-2 grid-cols-1 sm:grid-cols-2 items-end max-w-3xl mx-auto">
          <div class="col-span-1">
            <label for="name" class="block text-sm font-medium text-black tracking-wide">Nom de l'évènement</label>
            <input type="text" name="name" id="name" v-model="form.name" class="mt-1 px-3 py-2 focus:outline-none border block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="Meeting with Jeff Bezos">
          </div>

          <div>
            <button type="submit" class="inline-flex items-center px-8 py-3 border border-transparent text-sm leading-4 font-bold uppercase rounded-md shadow-sm text-white bg-gray-900 focus:outline-none">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    head() {
      return {
        title: 'Eventdrive | Modifier l\'évènement.'
      }
    },
    data() {
      return {
        event: null,
        form: {
          name: '',
        }
      }
    },
    async asyncData({ app, params }) {
      const request = await app.$axios.post('https://api.dev.eventdrive.com/public/v1/token', {
        client_id: 25,
        client_secret: 'FgR7rnRi9AWe3Y0sgrQhLLJKEA0PQQJxdoyKqSxH'
      });
      const token = await request.data;

      app.$axios.setToken(token.access_token, 'Bearer', ['get']);
      let event = await app.$axios.$get(`https://api.dev.eventdrive.com/public/v1/events/${params.id}`);
      console.log('Event', event);
      return { event : event.data }
    },
    methods: {
      async update() {
        try {
          const request = await this.$axios.post('https://api.dev.eventdrive.com/public/v1/token', {
            client_id: 25,
            client_secret: 'FgR7rnRi9AWe3Y0sgrQhLLJKEA0PQQJxdoyKqSxH'
          });
          const token = await request.data;

          this.$axios.setToken(token.access_token, 'Bearer', ['post', 'delete']);
          await this.$axios.post('https://api.dev.eventdrive.com/public/v1/events', {
            name: { en: this.form.name, fr: this.form.name },
            start_date: this.form.start_date,
            end_date: this.form.end_date,
            main_manager_id: 5962,
            default_locale: 'fr',
            available_locales: ['fr']
          });
          this.resetForm();
        } catch (e) {
          console.log('=> ', e);
        }
      },

      async update() {
        try {
          const request = await this.$axios.post('https://api.dev.eventdrive.com/public/v1/token', {
            client_id: 25,
            client_secret: 'FgR7rnRi9AWe3Y0sgrQhLLJKEA0PQQJxdoyKqSxH'
          });
          const token = await request.data;

          this.$axios.setToken(token.access_token, 'Bearer');
          await this.$axios.patch(`https://api.dev.eventdrive.com/public/v1/events/${this.event.id}/put`, this.event);
          this.$router.push({ name : 'events' })
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
</script>
