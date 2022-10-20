// The Evervault Node.js SDK (https://docs.evervault.com/sdk/nodejs) is pre-initialized in 
// all Functions as the globally-scoped `evervault` object.This allows you to encrypt the result, 
// and store it in your database.

// `data` is the data you encrypted and passed into `evervault.run` from your server. The Function 
// automatically decrypts the data and maintains its structure so you can treat event exactly as 
// you did when you passed it into `evervault.run`.
exports.handler = async (data) => {
    // Check if the data sent into the Function included the `name` key
    if (data.name && typeof data.name === "string") {
        console.debug(`A name of length ${data.name.length} has arrived into the Function.`);
    
        // Process the decrypted name value, and re-encrypt the original name using the globally available evervault package.
        // Note all Functions have the evervault SDK automatically injected into their global scope.
        return {
            message: `Hello from a Function! It seems you have ${data.name.length} letters in your name`,
            name: await evervault.encrypt(data.name),
        };
    } else {
        console.debug('An empty name has arrived into the Function.');
    
        return {
            message: 'Hello from a Function! Send an encrypted `name` parameter to show Function decryption in action',
        };
    }
};
