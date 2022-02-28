<template>
  <div class="container">
    <img src="./asset/img/vili.png" alt="vili" width="200px" height="200px" />
    <a href="https://github.com/valerijmedvid/">
      <p class="btn">Github</p>
    </a>
    <a href="https://www.linkedin.com/in/valerijmedvid/">
      <p class="btn">LinkedIn</p>
    </a>
    <a href="https://twitter.com/valerijmedvid">
      <p class="btn">Twitter</p>
    </a>
  </div>
</template>
<script setup></script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Rubik&display=swap");

html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  height: 100vh;
}

* {
  box-sizing: border-box;
  font-family: "Rubik", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 400;
}

.container {
  width: 100%;
  height: 100vh;
  display: grid;
  grid-auto-flow: row;
  justify-content: center;
  align-items: center;
  align-content: center;
}

.btn {
  border: 1px solid #393e46;
  color: #393e46;
  border-radius: 0.2em;
  display: inline-block;
  margin: 0 auto;
  font-size: 1.3em;
  transition-duration: 0.2s;
  padding: 1em 2.5em;
  width: 100%;
}
a {
  margin-top: 2em;
}

.btn:hover {
  background-color: #f8b500;
  color: #393e46;
}

img {
  margin-right: 3em;
}

@media (min-width: 1000px) {
  .container {
    grid-auto-flow: column;
  }
  .btn {
    margin: 0;
  }
  a {
    margin: 1em;
  }
}
</style>
