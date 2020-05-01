[![TypeScript version][ts-badge]][typescript-38]
[![Node.js version][nodejs-badge]][nodejs]
[![APLv2][license-badge]][license]
[![Build Status - Travis][travis-badge]][travis-ci]
[![Build Status - GitHub Actions][gha-badge]][gha-ci]

# Test-Driven, Object-Oriented JavaScript

This is the code—umm, tests are code, right?—for my little mini-series on test-driven, object-oriented JavaScript.

- [Lesson 1 Summary](https://github.com/stevekinney/test-driven-object-oriented-javascript/blob/master/src/lesson-1-summary.md)
- [Lesson 2 Summary](https://github.com/stevekinney/test-driven-object-oriented-javascript/blob/master/src/lesson-2-summary.md)
- [Lesson 3 Summary](https://github.com/stevekinney/test-driven-object-oriented-javascript/blob/master/src/lesson-3-summary.md)
- [Lesson 4 Summary](https://github.com/stevekinney/test-driven-object-oriented-javascript/blob/master/src/lesson-4-summary.md)

## High Level

At a super high level, objects are a way to package up some of your state and business logic so that you can reuse it as needed in whatever you're building.

For example, we've got those pesky Koopa Troopas in Super Mario Bros. Each individual Koopa Troopa is not a unique and special snowflake and—if you're building a full game—you don't want to have to write bespoke code for each and every one of them, right?

No. Of course not. Don't be ridiculous. What you want to do is to define, "Hey, this is what it means to be a Koopa Troopa and I want to scatter a bunch of them around this level."

So, this is where you'd write how an ideal Koopa Troopa behaves and then you'd instantiate a bunch of Koopa Troopa objects that take their cues from this ideal prototype. This is effectively what we're doing when we are talking about object-oriented JavaScript.

### Class-Based versus Prototypal Inheritance

Fun fact, JavaScript is not the only object-oriented programming language on the block. It turns out that there are a whole lot of them. Ruby, Java, Objective-C, Python, and Io come to mind, but that list is nowhere near exhaustive.

JavaScript is a bit unique as it uses this prototypal inheritance model, which is used by a much smaller subset of languages. Lua, Self, and NewtonScript (yes, the language you used to program an Apple Newton) use prototypal inheritance. At the risk of offending someone, I'm going to go ahead and say that JavaScript is the most popular language to use prototypal inheritance.

I'm going to argue that prototypal inheritance is way simpler than class-based inheritance, which is what the other languages use. But, since class-based inheritance is other of magnitude more common. Let's talk about that first and then we'll talk about how prototypal inheritance is different, alright?

**Rant**: I will _not_ be using terms such as "classical" and "prototypical" inheritance. These words do not make sense and just sound kind of like the right words. I'd prefer to maintain my dignity, thank you very much.

### Class-Based Inheritance

Here is the gross over-simplification of class-based inheritance. (Please don't @ me on Twitter over this.)

A class is basically like a blueprint for what an object should be. It defines what kind of properties it has and what kinds of things it can do. You use this blueprint to instantiate objects that can tap into all of that functionality. But, the blueprint itself doesn't have any physical form—insomuch as any of our code as any kind of physical form, but you know what I mean.

### Prototypal inheritance

So, prototypal inheritance is way simpler, actually. Take everything I just said about blueprints and forget it. Can have objects. If we ask an object for something and it doesn't know what we're talking about, it asks it's prototype, which is just another object. This goes on until we get to the end of the line. When this happens, we're done and we give up if we haven't found it yet and just say that it's `undefined`.

It's just a chain of objects. Now, to be clear: JavaScript can be a squirrelly language at times and some of the syntax around this can make it a bit hard to explain, but fact of the matter doesn't change.

They—I honestly forget who "they" is in this case—say that you can implement class-based inheritance using prototypal inheritance but you can't do the reverse. This holds up to logic because if you want to create an object that serves as the blueprint for all Koopa Troopas, there is nothing stopping you from doing that.

## Introduction

In this series, we're going get in the weeds on how objects and prototypal inheritance works in JavaScript. I'm going to make a bunch of bold assumptions and then we're going to back up the ridiculous things that come out of my mouth by writing some unit tests and watching them either pass or fail. Ideally, they should pass—unless I'm trying to make some kind of point or keep you on your toes or something. It's really just a function of how much coffee I've had during the recording of these videos.

## Basic Objects

One of the cool parts about JavaScript is that it's super easy to whip up a plain ol' JavaScript object. We have literal syntax for it. It's a pair of curly braces (e.g. `{}`).

So, what do we know about these basic, little objects?

- It's a much lazier—er, convenient—way to make objects than writing `new Object()` all the time.
- They don't come with any properties or values other than what we define when we create the objects or add in later.
- They all inherit from `Object.prototype` and are instances of `Object`—just like our individual Koopa Troopas are all instances of our platonic ideal of the prototypal Koopa Troopa.

```js
it('should be an instance of Object', () => {
  const objectLiteral = {};
  expect(objectLiteral).toBeInstanceOf(Object);
});
```

We can figure out what the prototype of a given object is by using a special method called `Object.getPrototypeOf`, which pretty much does what it says on the tin.

But, the crazy thing here is that—despite being an instance of `Object`, `Object` is _not_ it's prototype!

```js
it("should not, however, have Object as it's prototype", () => {
  const objectLiteral = {};
  expect(Object.getPrototypeOf(objectLiteral)).not.toBe(Object);
});
```

All objects created this way also inherit from a magical and mystical object known as `Object.prototype`, which is the usually the end of the line for the prototype change for _almost_ all objects. (I chose my words _very_ carefully there.)

```js
it("should instead have Object.prototype as it's prototype", () => {
  const objectLiteral = {};
  expect(Object.getPrototypeOf(objectLiteral)).toBe(Object.prototype);
});
```

`Object.prototype` has a whole bunch of methods on it, which makes total sense. Otherwise, why bother having it in the the prototype chain at all? So, it's got a bunch of methods. I'll leave it as an exercise to the reader to hit up MDN and figure out what they are, but let's just hypothetically say that `Object.prototype.toString()` is one of them. I say, "hypothetically," but it's totally one. Trust me. It's the fun one that basically turns your super cool object into the super boring `"[object Object]"`.

```js
it('should inherit a property called toString', () => {
    const objectLiteral = {};
    expect(objectLiteral.toString).toBeTruthy();
  });
});
```

Our good buddy, `Object.prototype`, gives us a few more helpful methods that each object has access to. One such helpful little friend is `Object.prototype.hasOwnProperty`. We can give it the name of the property and it will tell us whether or not the object itself has the property—regardless of whether or not it's in the prototype chain.

```js
it('should not actually have a property called toString', () => {
  const objectLiteral = {};
  expect(objectLiteral.hasOwnProperty('toString')).toBeFalsy();
});
```

Let's get a bit more meta here.

```js
it('should not actually have a property called hasOwnProperty', () => {
  const objectLiteral = {};
  expect(objectLiteral.hasOwnProperty('hasOwnProperty')).toBeFalsy();
});
```

We can use `hasOwnProperty` because it's in the inheritance chain and it's sitting on `Object.prototype`. In the name of proving stuff I say using tests, let's actually apply the same scrutiny to `Object.prototype`.

```js
describe('Object.prototype', () => {
  it('should have a property called toString', () => {
    expect(Object.prototype.toString).toBeTruthy();
  });

  it('should have a property called toString directly on it', () => {
    expect(Object.prototype.hasOwnProperty('hasOwnProperty')).toBeTruthy();
  });

  it('should have a property called hasOwnProperty directly on it', () => {
    expect(Object.prototype.hasOwnProperty('hasOwnProperty')).toBeTruthy();
  });
});
```

Okay, so what did we learn?

- The easiest way to think of prototypal inheritance is that it's basically a system where we'll check another object for a property if it's not on the one we're working with.
- Any object can be the prototype for another object, but a lot of times we make special objects that serve as the blueprint for a "class" of objects.
- Object literals are just short-hand for making new instances of `Object`,
- The prototype object for all objects is `Object.prototype`.
- All objects made this way will inherit from `Object.prototype`.
- `Object.prototype` has some helpful methods on it.

## Making Our Own Prototype Chains

In the last tutorial, we learned how to create objects. They're all instances of `Object` and they all inherit from `Object.prototype`. We'll get into how `Object` and `Object.prototype` relate to each other later on. But, I'm just going to get all hand-wavy about it for right now.

Object literals are definitely the easiest way to create an object. And we learned they all inherit from our buddy, `Object.prototype`. The natural follow-up question is "What's the easiest way to spit out an object that inherits from another object."

That's a great question and the answer is `Object.create()`, which is not be confused with `new Object()` even though it's absolutely totally confusing, but welcome to JavaScript, friends.

`Object.create()` takes an argument. Surprise: It's the object that you want your brand spanking new object to inherit from. Imagine that. Let's take it for a spin.

```js
it('should create an object with a set prototype', () => {
  const parent = {};
  const child = Object.create(parent);

  expect(Object.getPrototypeOf(child)).toBe(parent);
});
```

So, `child` inherits from `parent` which inherits from `Object.prototype`. If a property doesn't exist on `child`, we'll check the `parent` and if that fails, then we'll go take a good hard look at `Object.prototype`. I'll leave this as an exercise for the reader, but you can totally right a test to see if `child` has a `toString` property. (Spoiler alert: It definitely does.)

What if we wanted to create an object that has no prototype whatsoever. Is that even a thing we can do? It's this the plotline to the Star Wars prequels? Weren't they bad? I digress.

Anyway, that's something we can do.

```js
it('should be able to create an object without a prototype', () => {
  const orphan = Object.create(null);

  expect(Object.getPrototypeOf(orphan)).toBe(null);
});
```

Why? This is one of those things where this a infinitesimally small chance you'll need this. If that ever happens, well, I just saved you the better part of an afternoon. I first learned about it during a ridiculous coding challenge someone got one time for an interview.

Steve's theorem of practicality: The less practical something is, the more likely it is to appear on a technical interview. If this ever comes up in a technical interview, you can buy me a beer or something.

Okay, here are my best—and arguably really forced—explanations:

- Theoretically, `Object.prototype` is mutable and can be monkey-patched by literally any other script on the page. Stuff you didn't expect could be added to `Object.prototype` or someone could change the way `Object.prototype.hasOwnProperty` works or something.
- JavaScript objects do double duty. They're objects, but a lot of time we just use them as hash maps or associative arrays. If you want them expressly for that purpose, this can be helpful.

I don't know. Neither of these are particularly good reasons. The real reason that I'm setting myself up for some half-baked point I'm going to try to make in a subsequent video.

But, anyway. Let's verify that literally anything I just said was true.

```js
it('should not inherit a property called toString', () => {
  const orphan = Object.create(null);

  expect(orphan.toString).toBeUndefined();
});
```

I'd try to demonstrate it using `hasOwnProperty`, but little orphan object over here doesn't have `Object.prototype` in its inheritance chain and thereby no access to `Object.prototype.hasOwnProperty`.

Alright, anyway. Let's very that our child that is not destined to be the Dark Lord of the Sith can access properties on its parent.

```js
it('should should check its prototype for properties', () => {
  const parent = { lastName: 'Kinney' };
  const child = Object.create(parent);

  expect(child.lastName).toBe('Kinney');
  expect(child.hasOwnProperty('lastName')).toBeFalsy();
});
```

That should probably be two tests, but I got incredibly lazy and couldn't be bothered to split it into two. But, let's be both lazy and super thorough. Let's make an even longer inheritance chain and validate that

```js
it('should should check its grandparent for properties', () => {
  const grandparent = { lastName: 'Kinney' };
  const parent = Object.create(grandparent);
  const child = Object.create(parent);

  expect(child.lastName).toBe('Kinney');
  expect(child.hasOwnProperty('lastName')).toBeFalsy();
});
```

Alright, so what did we learn here?

- We can use `Object.create` to create objects with some other object as their prototype.
- We can use `Object.create(null)` to create objects with literally nothing as their prototype.
- We can create our own prototype chains by hand if that's something that's interesting to us.

The only problem we have right now, is that process is still super manual process. In the next little ditty, we're going to look at another pattern that makes this a bit easier.

## Understanding Constructors

In the last tutorial we saw that we can create objects that inherit from other objects. But, it was kind of a manual process.

My general rule on programming and programmers: We're all super lazy and if something is tedious, there is probably a better way to do whatever it is you're trying to do. If not, you should probably solve the problem for the rest of us—because, we're all very lazy.

Constructor functions are another way of creating objects in JavaScript. These are useful in the case where you want to create a bunch of similar objects that all share a lot of the same functionality.

Careful readers will probably noticed that constructor functions pre-date all of that `Object.create` tomfoolery that I got myself into in earlier videos. I don't care.

So, yea—it's not wrong to think of constructor functions as little factories that spit out a given type of object.

Let's start simple:

```js
it('should spit out an object that is an instance with the `new` keyword', () => {
  function KoopaTroopa() {}
  const koopa = new KoopaTroopa();

  expect(koopa).toBeInstanceOf(KoopaTroopa);
});
```

That `new` keyword is pretty critical. If you omit it. Things are going to go real poorly.

```js
it('should return undefined if we forget the `new` keyword', () => {
  function KoopaTroopa() {}
  const koopa = KoopaTroopa();

  expect(koopa).toBeUndefined();
});
```

See, there isn't really anything about `KoopaTroopa` that makes it a _constructor_ function per se. It's just a normal function and normal functions return `undefined` if they don't have a return statement and they're called normally. The function isn't wrong we are.

The secret sauce is in that `new` keyword. That takes any old function and calls it as a constructor for new objects. In fact that capital letter in `KoopaTroopa` isn't even mandatory, it's just a convention to keep us from losing our damn minds trying to remember which functions are supposed to be called the normal way and which ones are supposed to be called in some special way.

We're testing JavaScript in these videos, but sometimes JavaScript is testing our sanity, right?

### Constructor Functions Wire Up a Prototype For Us

Okay, so this is part is going to be a little weird because words are hard and they tend to mean things, but bear with me here.

Functions are actually just weird objects that you can call.

```js
it('should be an object', () => {
  function KoopaTroopa() {}

  expect(KoopaTroopa).toBeInstanceOf(Object);
});
```

Here is another fun one just to drive my point home:

```js
it('should be an inherit from Function.prototype', () => {
  function KoopaTroopa() {}

  expect(Object.getPrototypeOf(KoopaTroopa)).toBe(Function.prototype);
});
```

So, it stands to reason: If objects can have properties and functions are weird, callable objects—then, functions should be able to have some properties on them as well.

Guess what? It turns out that they do. They're just kind of hidden. But you can peek under the covers using a special method called `Object.getOwnPropertyNames(KoopaTroopa)`.

```js
Object.getOwnPropertyNames(KoopaTroopa);
// ["length", "name", "arguments", "caller", "prototype"]
```

Right now, I'm only concerned with that last one there: `prototype`.

Okay, take a deep breath:

- Every function has a property called `prototype`.
- This is `not` that function's prototype. (We covered that `Function.prototype` is a given function's prototype.)
- This `prototype` property just holds onto an empty object.
- That empty object in the `prototype` property is what we use as the prototype for all of the objects that pop out of our function when it's used as a constructor.

```js
it('should have a prototype property', () => {
  function KoopaTroopa() {}

  expect(KoopaTroopa.prototype).toEqual({});
});
```

```js
it("should shoot out object that has it's prototype property as its—umm—prototype", () => {
  function KoopaTroopa() {}
  const koopa = new KoopaTroopa();

  expect(Object.getPrototypeOf(koopa)).toBe(KoopaTroopa.prototype);
});
```

Why does any of this exist? Well, now we have the ability to put the properties that are unique to object on that object and move all of the shared stuff to the prototype.

Here is an example of this in practice:

```js
function KoopaTroopa(firstName) {
  this.firstName = firstName;
}

KoopaTroopa.prototype.fullName = function () {
  return this.firstName + ' Koopa';
};
```

Let's take it for a spin with some tests, alright?

```js
it('should have its own first name property', () => {
  const koopa = new KoopaTroopa('Howard');

  expect(koopa.hasOwnProperty('firstName')).toBeTruthy();
});

it('should inherit the fullName method from KoopaTroopa.prototype', () => {
  const koopa = new KoopaTroopa('Howard');

  expect(koopa.fullName).not.toBeUndefined();
  expect(koopa.fullName()).toBe('Howard Koopa');
});
```

I could make like a dillion Koopa Troopas but all of them could have the exact same way of figuring out their full name (e.g. take your first name and tack on a space and "Koopa"). I don't want burden each and every Koopa Troopa with having to know how to do this. So, I just teach the prototypal Koopa Troopa how to do this and the rest of them can just look to `KoopaTroopa.prototype` and see how to do it.

Because if I just shoved that on to that each individual Koopa, that would be like a dillion instances of that function and that just seems real wasteful.

### Summary

So, what did we cover today.

- Functions can be used like functions or they can be used to create objects.
- Just use the `new` keyword and next thing you know you're popping out objects.
- Functions are objects.
- They inherit from `Function.prototype`.
- But they also have a prototype property that's just an empty object.
- That empty is used as the prototype of all of the objects that pop out of that constructor.
- This is a good place to put anything that should be shared by all of the instances.

## JavaScript Doesn't Have Classes Except When It Does

People made a big fuss about JavaScript being all weird and different. (I prefer the word "unique," by the way.) So, JavaScript has classes now, except it's all pretty much a big lie and not real. It's the same stuff I showed you in the previous videos, but with syntactic sugar to make y'all feel better about life.

So, remember our `KoopaTroopa` constructor?

We could refactor it like this:

```js
class KoopaTroopa {
  constructor(firstName) {
    this.firstName = firstName;
  }

  fullName() {
    return this.firstName + ' Koopa';
  }
}
```

This is literally the same thing in practice. The `constructor()` method is just basically that function we had before. All of the other methods are put onto `KoopaTroopa.prototype`. Nothing you learned earlier is any less relevant.

```js
it('should be a function', () => {
  expect(KoopaTroopa).toBeInstanceOf(Function);
});

it('should have a prototype property', () => {
  expect(KoopaTroopa.prototype).not.toBeUndefined();
});
```

There are some cool things here however. If you remember from before, constructor functions aren't any different than functions. It's all in how you call them.

- If you use the `new` keyword, they're executed as a constructor in order to make a new object.
- If you don't they're called just like a regular function.

The big problem here is that calling a function intended to be a constructor function like a regular function can causes Bad Things™ to happen.

Again, let's look at our traditional example:

```js
function KoopaTroopa(firstName) {
  this.firstName = firstName;
}

KoopaTroopa.prototype.fullName = function () {
  return this.firstName + ' Koopa';
};
```

`this` is a tricky little beast in JavaScript and deserves a series of its own. But, let's start with a gross over-simplification:

- If you're calling a function as a constructor function, then `this` is whatever object you're constructing.
- Otherwise, `this` is the context that we're calling the function from. (That sounds confusing and like I said, I'll make some additional videos explaining it. But for now, let's just get hand-wavy and assume that it's `window`).

Call `new KoopaTroopa()` and everything works as expected.

```js
koopa = new KoopaTroopa('Beatrice');
// KoopaTroopa {firstName: "Beatrice"}
```

Forget to call it and not only are you going to get undefined, you're also going to put weird stuff onto the global object.

```js
KoopaTroopa('Eric');
// undefined
window.firstName;
// "Eric"
```

Uh oh. That's not what we expected. But, what if we did this with a class?

```js
it('should throw an error in the event that you forget the new keyword', () => {
  expect(() => {
    const koopa = KoopaTroopa();
    console.log(koopa.fullName);
  }).toThrow();
});
```

In this case, it'll throw. This is way better than unexpected weirdness. Errors seem scary but they're better then not getting an error _and_ not getting what you expected.

We _can_, however, add this functionality to our constructor functions.

```js
describe('KoopaTroopa Constructor with Safeguards', () => {
  function KoopaTroopa(firstName) {
    if (!(this instanceof KoopaTroopa)) throw TypeError;
    this.firstName = firstName;
  }

  KoopaTroopa.prototype.fullName = function () {
    return this.firstName + ' Koopa';
  };

  it('should throw an error in the event that you forget the new keyword', () => {
    expect(() => {
      const koopa = KoopaTroopa('Lorinda');
      console.log(koopa.fullName);
    }).not.toThrow(TypeError);
  });
});
```

But, with all that said—not having to think about this with classes is also super nice and ES2015 is pretty well supported.

What did we cover today?

- Classes are just syntactic sugar over the regular prototypal inheritance stuff.
- Not using `new` with a function that intended to be a constructor can be lead to unintended consequences where you don't get the object you wanted _and_ you accidentally mutate the global object.
- Classes have some built-in in magic to protect you from these unintended cases.
- You _can_ implement this yourself with a quick check inside of your constructor functions.

[ts-badge]: https://img.shields.io/badge/TypeScript-3.8-blue.svg
[nodejs-badge]: https://img.shields.io/badge/Node.js->=%2012.13-blue.svg
[nodejs]: https://nodejs.org/dist/latest-v12.x/docs/api/
[travis-badge]: https://travis-ci.org/stevekinney/typescript-boilerplate.svg?branch=master
[travis-ci]: https://travis-ci.org/stevekinney/typescript-boilerplate
[gha-badge]: https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fstevekinney%2Ftypescript-boilerplate%2Fbadge&style=flat
[gha-ci]: https://github.com/stevekinney/typescript-boilerplate/actions
[typescript-38]: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html
[license-badge]: https://img.shields.io/badge/license-APLv2-blue.svg
[license]: https://github.com/stevekinney/typescript-boilerplate/blob/master/LICENSE
