requirejs(['a'], function (a) {
  describe('a otamesi', function () {
    it("simple string format", function () {
      // 通常
      expect(a.pf("a is %s hoge %s", 1, "jasmine")).toEqual("a is 1 hoge jasmine");
      // 無駄な引数
      expect(a.pf("a a a", 1)).toEqual("a a a");
      // 引数がない
      expect(a.pf("a a b")).toEqual("a a b");
    });
  });
  describe("multiple string format", function () {
    var str_obj = null;
    var str_ary = null;

    beforeEach(function () {
      str_obj = new a.String("abc {hoge} {moge}");
      str_ary = new a.String("abc {0} {1}");
    });

    it("zisaku string format1", function () {
      describe("obj", function () {
        // なにもしない場合
        expect(str_obj).toEqual("abc {hoge} {moge}");
        // 引数を入れる object
        expect(str_obj.format({hoge: "text"})).toEqual("abc text {moge}");
        // 引数を複数入れる object
        expect(str_obj.format({hoge: "text1", moge: "text2"})).toEqual("abc text1 text2");
      });
      describe("ary", function () {
        // なにもしない場合
        expect(str_ary).toEqual("abc {0} {1}");
        // 引数を入れる array int
        expect(str_ary.format(1)).toEqual("abc 1 {1}");
        // 引数を入れる array string
        expect(str_ary.format("baba")).toEqual("abc baba {1}");
        // 引数を複数入れる array int
        expect(str_ary.format(4,5)).toEqual("abc 4 5");
        // 引数を複数入れる array string
        expect(str_ary.format("moha", "toge")).toEqual("abc moha toge");
        // 引数を複数入れる array string int
        expect(str_ary.format("moha", 4)).toEqual("abc moha 4");
      });
    });
    it("karita string foramt2", function () {
      describe("obj", function () {
        // なにもしない場合
        expect(str_obj).toEqual("abc {hoge} {moge}");
        // 引数を入れる object
        expect(str_obj.format2({hoge: "text"})).toNotEqual("abc text {moge}");
        // 引数が多かったら undefined
        expect(str_obj.format2({hoge: "text"})).toEqual("abc text undefined");
        // 引数を複数入れる object
        expect(str_obj.format2({hoge: "text1", moge: "text2"})).toEqual("abc text1 text2");
      });
      describe("ary", function () {
        // なにもしない場合
        expect(str_ary).toEqual("abc {0} {1}");
        // 引数を入れる array int
        expect(str_ary.format2(1)).toNotEqual("abc 1 {1}");
        // 引数が多かったら undefined
        expect(str_ary.format2(1)).toEqual("abc 1 undefined");
        // 引数を入れる array string
        expect(str_ary.format2("baba")).toNotEqual("abc baba {1}");
        expect(str_ary.format2("baba")).toEqual("abc baba undefined");
        // 引数を複数入れる array int
        expect(str_ary.format2(4,5)).toEqual("abc 4 5");
        // 引数を複数入れる array string
        expect(str_ary.format2("moha", "toge")).toEqual("abc moha toge");
        // 引数を複数入れる array string int
        expect(str_ary.format2("moha", 4)).toEqual("abc moha 4");
      });
    });
  });
  describe("datetime format", function () {
    var date = null;

    beforeEach(function () {
      date = new Date(2012, 1, 2, 3, 4, 5);
    });

    it("strftime", function () {
      expect(a.strftime(date)).toEqual("2012年01月02日:03時04分05秒");
    });
  });
  describe("sync sleep", function () {
    it("sync!", function () {
      // initialize
      var start_date = new Date().getTime();
      var expect_end_date = start_date + 100;

      // 100ms sync wait
      a.sync_sleep(100);
      var end_date = new Date().getTime();

      expect(expect_end_date).toBeLessThan(end_date);
    });
  });
  describe("fib", function () {
    it("fib fib ifb", function () {
      expect(a.fib(1)).toEqual(1);
      expect(a.fib(2)).toEqual(1);
      expect(a.fib(3)).toEqual(2);
      expect(a.fib(4)).toEqual(3);
      expect(a.fib(5)).toEqual(5);
    });
  });
  describe("decorator", function () {

    var add = function (arg1, arg2) {
      if (arguments.length < 2) return arg1;
      return arg1 + arg2;
    };
    var decorated = a.decorator(add);

    it("decorator", function () {
      // safe
      expect(decorated(1,2)).toEqual(3);
      // unsafe
      expect(decorated(1)).toEqual(1);
      // too args
      expect(decorated(1,2,3)).toEqual(3);
    });
  });
  describe("ES5 Object.keys", function () {
    var o = {'hoge': 1, 'moge': 2, 'toge':'tata'};

    it("keys", function () {
      expect(Object.keys(o)).toEqual(['hoge', 'moge', 'toge']);
    });
  });
  describe("hasOwnProperty", function () {
    var o = {'hoge': 1, 'moge': 2, 'toge':'tata'};

    it("__has", function () {
      expect(a.__.prototype.has(o, "hoge")).toBeTruthy();
      expect(a.__.prototype.has(o, "moge")).toBeTruthy();
      expect(a.__.prototype.has(o, "toge")).toBeTruthy();
    });
    it("not __has", function () {
      expect(a.__.prototype.has(o, "aaaa")).toBeFalsy();
    });
  });
  describe("valus ", function () {
    var o = {'hoge': 1, 'moge': 2, 'toge':'tata'};

    it("values", function () {
      expect(a.__.prototype.values(o)).toEqual([1, 2, 'tata']);
    });
  });
});
