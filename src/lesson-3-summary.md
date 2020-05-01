# Summary

So, what did we cover today?

- Functions can be used like functions or they can be used to create objects.
- Just use the `new` keyword and next thing you know you're popping out objects.
- Functions are objects.
- They inherit from `Function.prototype`.
- But they also have a prototype property that's just an empty object.
- That empty is used as the prototype of all of the objects that pop out of that constructor.
- This is a good place to put anything that should be shared by all of the instances.
