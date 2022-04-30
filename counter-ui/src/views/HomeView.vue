<template>
  <div
    class="home d-flex justify-content-center flex-column align-items-center mt-5"
  >
    <h2>Counter:</h2>
    <div class="p-4 border mb-3">{{ counter.value }}</div>
    <button class="btn btn-success" @click="increaseCounter()">Increase</button>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      counter: {
        id: null,
        value: 0,
      },
    };
  },
  methods: {
    async fetchCounter() {
      try {
        const res = await fetch("http://localhost:3000/api/counter/");
        let data = await res.json();
        if (data.counter) {
          this.counter = data.counter;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async increaseCounter() {
      this.counter.value++;
      let url = "http://127.0.0.1:3000/api/counter/create/";
      let method = "POST";
      let obj = { ...this.counter };

      if (this.counter.id) {
        url = `http://127.0.0.1:3000/api/counter/${this.counter.id}`;
        method = "PUT";
        obj = { value: this.counter.value };
      }

      try {
        const res = await fetch(url, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: method,
          body: JSON.stringify(obj),
        });
        console.log(await res.json());
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.fetchCounter();
  },
};
</script>
