requirejs(['misc'], function (misc) {
  describe('misc module test suite', function () {
    it("misc hello は hello, world", function () {
      expect(misc.hello()).toBe("hello, world");
    });
  });
});
