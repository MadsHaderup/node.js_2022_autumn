/*
Why: Javascript is single-threaded
If we didn't write asynchronous code we would have blocking code.

Use cases of aynchronous code:
- Data traveling over a network (fetch).
- Reading and writing to files.
- Import when asynchronously calling URL's.
- Interacting with a database.
- Heavy calculations.
- Encryption/Decryption.
- Event listeners (DOM).

Basically anything that takes time (since we don't want to block and prevent other 
code from running).

Solution 1:
Callback functions.
Problems: Callback hell, Pyramid of doom.

Solution 2:
introducing promises!
Can have two different states:
- Pending
- fulfilled
    - Resolved, Rejected

*/