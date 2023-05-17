<script>
    import Footer from "../../components/Footer.svelte";

    
    let username = "";
    let password = "";
    async function login() { 
        console.log(username);
        console.log(password);
        const user = { username: username, password: password };       
        const response = await fetch("http://localhost:8080/api/user/login", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(user),
        });
        
        if (response.ok){
            const data = await response.json();
            window.location.replace("/home");
            
        } else {
            console.log("error");
        }
        
    }

</script>
<div class="container">
    <h3>Login</h3>
    <div class="loginContainer">
        <form class="login">
            <label for>Username</label>
            <br>
            <input type="text" name="username" bind:value={username}>
            <br><br>
            <label for>Password</label>
            <br>
            <input type="password" name="password" bind:value={password}>
            <br><br>
            <button type="button" on:click={login} id="loginbutton">Login</button>
        </form>
        <br>
        
    </div>
</div>
<Footer />