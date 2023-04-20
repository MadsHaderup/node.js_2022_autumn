
import bcrypt from "bcrypt";
const saltRounds = 12;
const plaintextPassword = "hunter12";
const encryptedPassword = "$2b$12$O5M8beWoaw6vQzmrlhNaVOQR./vi4j.6PmhKzjrTmovb.GSUOIY5q";

const encryptedPasswordResult = await bcrypt.hash(plaintextPassword, saltRounds);


const passwordComparison = await bcrypt.compare(plaintextPassword, encryptedPasswordResult);
console.log(passwordComparison);