class KoopaTroopa {
  constructor(firstName) {
    this.firstName = firstName;
  }

  fullName() {
    return this.firstName + ' Koopa';
  }
}

describe('KoopaTroopa', () => {
  it('should assign the first name passed in to the instance', () => {
    const koopa = new KoopaTroopa('Howard');

    expect(koopa.firstName).toBe('Howard');
  });

  it('has a prototype property', () => {
    expect(KoopaTroopa.prototype).toBeDefined();
  });

  it('has a prototype property with a fullName property', () => {
    expect(KoopaTroopa.prototype.fullName).toBeDefined();
  });

  it('is a instance function', () => {
    expect(KoopaTroopa).toBeInstanceOf(Function);
  });

  it("should assign the first name to it's own property", () => {
    const koopa = new KoopaTroopa('Howard');

    expect(koopa.hasOwnProperty('firstName')).toBeTruthy();
  });

  it("should be able to come up with it's full name", () => {
    const koopa = new KoopaTroopa('Howard');

    expect(koopa.fullName()).toBe('Howard Koopa');
  });

  it('should not have fullName as part of the instance', () => {
    const koopa = new KoopaTroopa('Howard');

    expect(koopa.hasOwnProperty('fullName')).toBeFalsy();
  });

  it('should throw an error in the event that you forget the new keyword', () => {
    expect(() => {
      KoopaTroopa('Wes');
    }).toThrow();
  });
});
