describe('Object Literals', () => {
  it('should be an instance of Object', () => {
    const objectLiteral = {};
    expect(objectLiteral).toBeInstanceOf(Object);
  });

  it("should now, however, have Object as it's prototype", () => {
    const objectLiteral = {};
    expect(Object.getPrototypeOf(objectLiteral)).not.toBe(Object);
  });

  it("should not, however, have Object as it's prototype", () => {
    const objectLiteral = {};
    expect(Object.getPrototypeOf(objectLiteral)).toBe(Object.prototype);
  });

  it('should inherit a property called toString', () => {
    const objectLiteral = {};
    expect(objectLiteral.toString).not.toBeUndefined();
  });

  it('should not actually have a property called toString', () => {
    const objectLiteral = {};
    expect(objectLiteral.hasOwnProperty('toString')).toBeFalsy();
  });

  it('should not actually have a property called hasOwnProperty', () => {
    const objectLiteral = {};
    expect(objectLiteral.hasOwnProperty('hasOwnProperty')).toBeFalsy();
  });
});
