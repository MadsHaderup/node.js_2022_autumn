import fs from "fs";
import express from "express";
const app = express();



app.use(express.static("public"));
app.use('/images', express.static('images'));
app.use(express.urlencoded());

import { renderPage, injectDivData } from "./util/templateEngine.js";

const frontpagePage = renderPage("/frontpage/frontpage.html", 
{ 
    tabTitle: "Node.js Overview", 
    cssLink: `<link rel="stylesheet" href="/pages/frontpage/frontPage.css">` 
});
const loginPage = renderPage("/loginPage/loginPage.html");
const signupPage = renderPage("/loginPage/signupPage.html");
const adminPage = renderPage("/adminPage/adminPage.html");
const wrongLoginPage = renderPage("/adminPage/wrongLoginPage.html");
const editPage = renderPage("/editPage/editPage.html");
const firstServerPage = renderPage("/firstServer/firstServer.html");
const fullCRUDPage = renderPage("/FullCRUDableRESTAPI/FullCRUDableRESTAPIPage.html");
const ssrPage = renderPage("/SSR/ssrPage.html");
const servingHTMLPage = renderPage("/servingHTML/servingHTMLPage.html");


app.get("/", (req, res) => {
    res.send(frontpagePage);
});

app.get("/login", (req, res) => {
    res.send(loginPage);
});

app.get("/signup", (req, res) => {
    res.send(signupPage);
});

app.post("/signup-form", (req, res) => {
    const data = "\n" + req.body.username + " " + req.body.password + " "; 
    fs.appendFileSync("logininfo.txt", data, function(){console.log('done')});
    res.send(loginPage);
})

app.post("/login-form", (req, res) => {
    let loginArray = fs.readFileSync('logininfo.txt').toString().split(" ");
    
    const username = req.body.username;
    const password = req.body.password;
    console.log(username + " " + password);
    let loginCheck = false;
    for (let i = 0; i < loginArray.length-1; i++){
        console.log(loginArray[i] + " " +loginArray[i+1]);
        if (username === loginArray[i].trim() && password === loginArray[i+1].trim()){
            loginCheck = true;
        }
        i++;
    }
    if (loginCheck){
        res.send(adminPage);
    } else {
        res.send(wrongLoginPage);
    }
    
});

app.post("/editHTML", (req, res) => {
    const data = req.body.newText;
    fs.writeFileSync('content.txt', data, function(){console.log('done')});
    res.send(adminPage);

});

app.get("/edit", (req, res) => {
    const data = fs.readFileSync('content.txt', 'utf8', function(){console.log(data)});
    
    const editPageWithData = injectDivData(editPage, data);
    res.send(editPageWithData);
});

app.get("/firstServer", (req, res) => {
    res.send(firstServerPage);
});

app.get("/fullCRUDableRESTAPI", (req, res) => {
    res.send(fullCRUDPage);
});

app.get("/SSR", (req, res) => {
    res.send(ssrPage);
});

app.get("/servingHTML", (req, res) => {
    res.send(servingHTMLPage);
});
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Server is running on port", server.address().port);
});


