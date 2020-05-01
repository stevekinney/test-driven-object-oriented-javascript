# Summary

Alright, so what did we learn here?

- We can use `Object.create` to create objects with some other object as their prototype.
- We can use `Object.create(null)` to create objects with literally nothing as their prototype.
- We can create our own prototype chains by hand if that's something that's interesting to us.

The only problem we have right now, is that process is still super manual process. In the next little ditty, we're going to look at another pattern that makes this a bit easier.
