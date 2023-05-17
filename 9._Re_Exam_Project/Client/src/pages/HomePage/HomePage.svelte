<script>
    
    import Footer from "../../components/Footer.svelte";
    let title = "";
    let description = "";
    let category = "";
    let price = 0;
    
    
    async function newproduct() {   
        
        const product = new FormData();
        const fileField = document.querySelector('input[type="file"]');
        console.log(fileField.files[0]);
        product.append("title", title);
        product.append("description", description);
        product.append("category", category);
        product.append("price", price);
        product.append("image", fileField.files[0]);
        for (const value of product.values()) {
            console.log(value);
        }
        const response = await fetch("http://localhost:8080/api/product/", {
            method: "POST",                      
            body: product 
        });
        
        if (response.ok){
            const data = await response.json();
            
            
        } else {
            console.log("error");
        }    
    }
</script>

<div class="container">
    <h3>Sign Up</h3>
    <form class="newproduct">
        <label for>Navn</label>
        <br>
        <input type="text" name="title" placeholder="Produkt Navn" bind:value={title}>
        <br><br>
        <label for>Beskrivelse</label>
        <br>
        <input type="text" name="description" placeholder="Beskrivelse" bind:value={description}>
        <br><br>
        <label for>Kategori</label>
        <br>
        <input type="text" name="title" placeholder="Kategori" bind:value={category}>
        <br><br>
        <label for>Pris</label>
        <br>
        <input type="number" name="price" placeholder="Pris" step=".01" bind:value={price}>
        <br><br>
        <label for>Produkt Billede</label>
        <br>
        <input type="file" name="productimage" placeholder="Billede">
        <br><br>
        <button type="button" on:click={newproduct}>Sign up</button>
    </form>
</div>