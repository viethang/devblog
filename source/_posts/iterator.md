title: Iterators
date: 2015-08-31 10:49:57
categories: ECMAScript 6
tags: 
- ECMAScript 6
- iterator
---

In ECMAScript 6, to make an object iterable, i.e. to make it support iteration operation like `for ... of`, we need to implement its `[Symbol.iterator]()` method so that this returns an iterator. An  <strong>iterator</strong> is simply an object with a `next()` method that provides access to the next element of the sequence.  It does so by returning an object with two properties `done` and `value`. Property `done` indicates whether we have reached the last element of the sequence, while property `value` provides the value of the next element of the sequence. The following example illustrates the implementation of prime numbers as an iterable object.

<ul>
{% codeblock primes lang:javascript%}
let primes = {
    [Symbol.iterator]() {
        let cur = 1;
        let known = []
        return {
            next() {
                cur = cur + 1;
                let searching = true;
                while (searching) {
                    searching = false;
                    for (let p of known) {
                        if ((cur % p) === 0) {
                            cur++;
                            searching = true;
                            break;
                        }
                    }
                }
                known.push(cur);
                return {done: false, value: cur};
            }
        };
    }
}

for (let prime of primes) {
    if (prime > 20)
        break;
    console.log(prime); //2, 3, 5, 7, 11, 13, 17, 19
}

{% endcodeblock %}

The implementation of prime numbers less than n is almost the same, except that we set `done` to <strong>true</strong> when the value excesses n.
{% codeblock primes_with_upper_bound lang:javascript%}
let primesLessThan = function(n) {
    this.upper = n;
}

primesLessThan.prototype[Symbol.iterator] = function() {
    let cur = 1;
    let known = [];
    let upper = this.upper;
    return {
        next() {
            cur = cur + 1;
            let searching = true;
            while (searching) {
                searching = false;
                for (let p of known) {
                    if ((cur % p) === 0) {
                        cur++;
                        searching = true;
                        break;
                    }
                }
            }
            known.push(cur);
            let done = (cur > upper)? true : false;
            return {done: done, value: cur};
        }
    };
}

var primesLessThan20 = new primesLessThan(20);
for (let prime of primesLessThan20) {
    console.log(prime);//2, 3, 5, 7, 11, 13, 17, 19
}

{% endcodeblock %}

</ul>