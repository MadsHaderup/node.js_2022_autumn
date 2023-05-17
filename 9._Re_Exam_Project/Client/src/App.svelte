<script>
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'
  import { Route, Router } from "svelte-navigator";
  import FrontPage from "./pages/FrontPage/FrontPage.svelte";
  import SignupPage from "./pages/SignupPage/SignupPage.svelte";
  import HomePage from "./pages/HomePage/HomePage.svelte";
</script>

<main>
  <Router>
    <div>
      <Route path="/login"><FrontPage /></Route>
      <Route path="/sign"><SignupPage /></Route>
      <Route path="/home"><HomePage /></Route>

    </div>
  </Router>


</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
