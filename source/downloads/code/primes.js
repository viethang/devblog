"use strict";
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

// for (let prime of primes) {
// 	if (prime > 20)
// 		break;
// 	console.log(prime);
// }

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
			let done = (cur > upper)?true:false;
			return {done: done, value: cur};
		}
	};
}

var primesLessThan20 = new primesLessThan(20);
console.log(primesLessThan20);
for (let prime of primesLessThan20) {
	console.log(prime);
}

