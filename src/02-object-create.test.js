describe('Object.create', () => {
  it('should create an object with a set prototype', () => {
    const parent = {};
    const child = Object.create(parent);

    expect(Object.getPrototypeOf(child)).toBe(parent);
  });

  it('should be able to create an object without a prototype', () => {
    const orphan = Object.create(null);

    expect(Object.getPrototypeOf(orphan)).toBe(null);
  });

  it('should not inherit a property called toString', () => {
    const orphan = Object.create(null);

    expect(orphan.toString).toBeUndefined();
  });

  it('should should check its prototype for properties', () => {
    const parent = { lastName: 'Kinney' };
    const child = Object.create(parent);

    expect(child.lastName).toBe('Kinney');
    expect(child.hasOwnProperty('lastName')).toBeFalsy();
  });

  it('should should check its grandparent for properties', () => {
    const grandparent = { lastName: 'Kinney' };
    const parent = Object.create(grandparent);
    const child = Object.create(parent);

    expect(child.lastName).toBe('Kinney');
    expect(child.hasOwnProperty('lastName')).toBeFalsy();
  });
});
