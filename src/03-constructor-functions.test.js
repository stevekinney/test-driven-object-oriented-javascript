describe('Constructor Functions', () => {
  it('should spit out an object that is an instance with the `new` keyword', () => {
    function KoopaTroopa() {}
    const koopa = new KoopaTroopa();

    expect(koopa).toBeInstanceOf(KoopaTroopa);
    expect(koopa).toBeInstanceOf(Object);
  });

  it('should return undefined if we forget the `new` keyword', () => {
    function KoopaTroopa() {}
    const koopa = KoopaTroopa();

    expect(koopa).toBeUndefined();
  });

  it('should be an inherit from Function.prototype', () => {
    function KoopaTroopa() {}

    expect(Object.getPrototypeOf(KoopaTroopa)).toBe(Function.prototype);
  });

  it("should not inherit from it's prototype property", () => {
    function KoopaTroopa() {}

    expect(Object.getPrototypeOf(KoopaTroopa)).not.toBe(KoopaTroopa.prototype);
  });

  it('should have a property called KoopaTroopa.prototype', () => {
    function KoopaTroopa() {}

    expect(KoopaTroopa.prototype).toBeDefined();
  });

  it('should have a property called KoopaTroopa.prototype that inherits from Object.prototype', () => {
    function KoopaTroopa() {}

    expect(Object.getPrototypeOf(KoopaTroopa.prototype)).toBe(Object.prototype);
  });
});
