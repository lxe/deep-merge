var test = require("tape")

var DeepMerge = require("../index")
var deepmerge = DeepMerge(function (target, source) {
    return [].concat(target, source)
})

test("deep merge array", function (assert) {
    var a = [1, 2, 3]
    var b = [4, 5, 6]
    var res = deepmerge(a, b)

    assert.deepEqual(a, [1, 2, 3])
    assert.deepEqual(b, [4, 5, 6])
    assert.deepEqual(res, [1, 2, 3, 4, 5, 6])

    assert.end()
})

test("deep merge objects", function (assert) {
    var a = { foo: "bar", bar: "baz" }
    var b = { bar: "foo", baz: "bar" }
    var res = deepmerge(a, b)

    assert.deepEqual(a, { foo: "bar", bar: "baz" })
    assert.deepEqual(b, { bar: "foo", baz: "bar" })
    assert.deepEqual(res, {
        foo: "bar"
        , bar: ["baz", "foo"]
        , baz: "bar"
    })

    assert.end()
})

test("deep merge arbitrary types", function (assert) {
    var a = function () {}
    var b = "foobar"
    var res = deepmerge(a, b)

    assert.deepEqual(res, [a, "foobar"])

    assert.end()
})
