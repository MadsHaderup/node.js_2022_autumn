// --------------------------------------
// Objects
// --------------------------------------
// Exercise 1 - Retrieve value from object by key

const alienMessage = {
	message: "Hello, earthling! I bring peace."
};

// Log the message 
console.log(alienMessage.message);
// --------------------------------------
// Exercise 2 - Defining an object. 

// Create an object that has your name and age. 
const mads = {
	name: "Mads Pontoppidan Haderup",
    age: 25
};
console.log(mads);
// --------------------------------------
// Exercise 3 - Add a key-value pair 

const stackOverflow = {};

// make a rule called isAllowed and let the value be true
stackOverflow.isAllowed = true;
console.log(stackOverflow.isAllowed);
// --------------------------------------
// Exercise 4 - Remove a key-value pair 

const thisSong = {
	description: "The best song in the world."
}

// remove the property "description" and add a property called "about" that should say "Just a tribute." 
delete thisSong.description;
thisSong.about = "Just a tribute.";
console.log(thisSong);
// --------------------------------------
