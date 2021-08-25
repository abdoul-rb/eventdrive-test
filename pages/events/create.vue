<template>
  <div class="antialiased font-sans bg-gray-200 overflow-hidden">
    <div class="" style="">
      <div class="bg-gray-100 pt-16 pb-20 px-4 sm:px-6 lg:pt-12 lg:pb-28 lg:px-12">
        <div class="max-w-7xl mx-auto">
          <div class="">
            <h2 class="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">Eventdrive</h2>
            <p class="mt-1 text-xl text-gray-900">
              Organisez des événements virtuels & hybrides en toute simplicité.
            </p>
          </div>
          <p>
            {{ events }}
          </p>
          <div class="mt-12 mx-auto grid gap-x-6 gap-y-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:max-w-none">

            <div :key="x" class="flex flex-col rounded-xl shadow-md overflow-hidden" v-for="x in 7">
              <div class="flex-shrink-0">
                <img alt=""
                     class="h-56 w-full object-cover"
                     src="https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1679&amp;q=80">
              </div>
              <div class="flex-1 bg-white p-6 flex flex-col justify-between">
                <div class="flex-1">
                  <p class="text-xs font-medium text-gray-600">Created by Eventdrive</p>
                  <nuxt-link :to="{ name: '' }" class="block">
                    <p class="text-lg sm:text-xl font-medium  text-gray-900">Boost your conversion rate</p>
                    <div class="text-xs font-medium text-red-600 flex space-x-1 items-center">
                      <svg class="h-auto w-4" fill="none" stroke="currentColor" stroke-linecap="round"
                           stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"
                           xmlns="http://www.w3.org/2000/svg">
                        <rect height="18" rx="2" ry="2" width="18" x="3" y="4"></rect>
                        <line x1="16" x2="16" y1="2" y2="6"></line>
                        <line x1="8" x2="8" y1="2" y2="6"></line>
                        <line x1="3" x2="21" y1="10" y2="10"></line>
                      </svg>
                      <span>Saturday, 25 July 2021 at 19:00 GMT</span>
                    </div>
                    <div class="mt-6 bg-gray-100 -mx-6 px-6 py-4">
                      <p class="text-base text-gray-800 font-medium">Registration</p>
                      <div class="mt-2 text-xs font-medium text-gray-800 flex items-center justify-between">
                        <span class="block">Paid online event</span>
                        <button
                          class="inline-flex items-center px-6 py-1 border border-blue-500 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                          type="button">
                          Share link
                        </button>
                      </div>
                    </div>
                  </nuxt-link>
                </div>
                <div class="mt-6 flex items-center">
                  <span class="relative z-0 inline-flex shadow-sm rounded-md w-full">
                    <nuxt-link :to="{ name: '' }"
                               class="relative inline-flex items-center justify-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none w-full">
                      Editer
                    </nuxt-link>
                    <nuxt-link :to="{ name: '' }"
                               class="-ml-px relative inline-flex items-center justify-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none w-full">
                      Supprimer
                    </nuxt-link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    head() {
      return {
        title: 'Eventdrive | Créer un évènement'
      }
    },
    data() {
      return {
        events: [],
      }
    },
    async fetch() {
      const request = await fetch('https://api.dev.eventdrive.com/public/v1/token', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          client_id: 25,
          client_secret: 'FgR7rnRi9AWe3Y0sgrQhLLJKEA0PQQJxdoyKqSxH',
        })
      });
      const token = await request.json();

      const events = await fetch('https://api.dev.eventdrive.com/public/v1/events', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + token.access_token,
        },
      });
      const data = await events.json();
      console.log(data.items);
    }
  }
</script>
