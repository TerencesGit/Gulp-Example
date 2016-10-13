module.exports = function foo() { 

    let x;

    {

      // okay, block scoped name

      const x = "sneaky";

      // error, const

      //x = "foo";

console.log(x);

    }

    // okay, declared with `let`

    x = "bar";

    // error, already declared in block

    //let x = "inner";

    console.log(x);

}
