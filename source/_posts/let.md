layout: '[post]'
title: 'Variable declaration with LET'
date: 2015-09-01 09:55:41
tags: 
- ECMAScript 6
- let
---
<ol>
<li><strong>let</strong> is non-hoisted. 


{% codeblock test_hoisting lang:javascript%}
function test_var() {console.log(x); var x;}
function test_let() {console.log(x); let x;}

test_var(); // undefined
test_let(); // ReferenceError: can't access lexical declaration `x' before initialization
{% endcodeblock %}

In `test_var()`, variable `x` is declared with <strong>var</strong> and is hoisted with initial value <strong>undefined</strong>, while in `test_let()`, the declaration with <strong>let</strong> is not hoisted, resulting in a ReferenceError.
</li>
<li>The variable declared by <strong>let</strong> is accessible only in the scope of the smallest block containing it.

{% codeblock block_scope lang:javascript %}
{
    var x = 2;
    x; // 2
}
x; // 2

{
   let y = 2;
   y; // 2
}
y; // ReferenceError: y is not defined
{% endcodeblock %}
</li>

<li>Each round of a loop creates a block scope.

{% codeblock loop lang:javascript %}
for (let i = 1; i<10; i++) {
    var x = i;
    setTimeout(function() {console.log(x)});
}
//1, 2, 3, 4, 5, 6, 7, 8, 9

for (let i = 1; i<10; i++) {
    let x = i;
    setTimeout(function() {console.log(x)});
}

//print ten times 9
{% endcodeblock %}
</li>
</ol>