<script>
    import Footer from "../../components/Footer.svelte";

    let username = "";
    let password = "";
    async function signup() { 
        console.log(username);
        console.log(password);
        const user = { username: username, password: password };       
        const response = await fetch("http://localhost:8080/api/user/signup", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(user),
        });
        
        if (response.ok){
            const data = await response.json();
            window.location.replace("/login");
            
        } else {
            console.log("error");
        }    
    }
</script>
<div class="container">
    <h3>Sign Up</h3>
    <form class="signup">
        <label for>Email</label>
        <br>
        <input type="email" name="email" placeholder="Email" bind:value={username}>
        <br><br>
        <label for>Password</label>
        <br>
        <input type="password" name="password" placeholder="Password" bind:value={password}>
        <br><br>
        <button type="button" on:click={signup}>Sign up</button>
    </form>
</div>