function KoopaTroopa(firstName) {
  if (!(this instanceof KoopaTroopa))
    throw TypeError(
      "Class constructor KoopaTroopa cannot be invoked without 'new'",
    );
  this.firstName = firstName;
}

KoopaTroopa.prototype.fullName = function () {
  return this.firstName + ' Koopa';
};

describe('KoopaTroopa', () => {
  it('should throw an error in the event that you forget the new keyword', () => {
    expect(() => {
      KoopaTroopa('Wes');
    }).toThrow();
  });
});
