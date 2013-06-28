// var MyClass = requirejs('MyClass').MyClass;
requirejs(['MyClass'], function (MyClass) {
  describe('MyClassの話', function() {
    it('lengthプロパティで配列長を取得する事ができる', function() {
      expect(MyClass.MyClass.list).toEqual([1,2,3]);
      expect(MyClass.MyClass.list.length).toEqual(3);
    });
  });
});
