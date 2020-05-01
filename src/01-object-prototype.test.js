describe('Object.prototype', () => {
  it('should have a property called toString', () => {
    expect(Object.prototype.toString).toBeDefined();
  });

  it('should have a property called toString directly on it', () => {
    expect(Object.prototype.hasOwnProperty('toString')).toBeTruthy();
  });

  it('should have a property called hasOwnProperty directly on it', () => {
    expect(Object.prototype.hasOwnProperty('hasOwnProperty')).toBeTruthy();
  });

  it('should not have a prototype', () => {
    expect(Object.getPrototypeOf(Object.prototype)).toBe(null);
  });
});
