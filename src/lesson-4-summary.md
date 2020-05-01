# Summary

What did we cover today?

- Classes are just syntactic sugar over the regular prototypal inheritance stuff.
- Not using `new` with a function that intended to be a constructor can be lead to unintended consequences where you don't get the object you wanted _and_ you accidentally mutate the global object.
- Classes have some built-in in magic to protect you from these unintended cases.
- You _can_ implement this yourself with a quick check inside of your constructor functions.
