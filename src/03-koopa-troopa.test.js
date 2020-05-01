function KoopaTroopa(firstName) {
  this.firstName = firstName;
}

KoopaTroopa.prototype.fullName = function () {
  return this.firstName + ' Koopa';
};

describe('KoopaTroopa', () => {
  it('should assign the first name passed in to the instance', () => {
    const koopa = new KoopaTroopa('Howard');

    expect(koopa.firstName).toBe('Howard');
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
});
