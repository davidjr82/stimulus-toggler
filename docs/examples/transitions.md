# How to use with tabs

Transitions can be applied with `data-transition-xxx` in the toggled element.

Example of `data-transition-xxx` values:

```html
<div
    data-transition-enter="ease-in-out duration-500"
    data-transition-enter-start="opacity-0"
    data-transition-enter-end="opacity-100"
    data-transition-leave="ease-in-out duration-500"
    data-transition-leave-start="opacity-100"
    data-transition-leave-end="opacity-0"
>
```

**Input**

<<< @/../examples/transitions.html

**Output**

<!--@include: ./../../examples/transitions.html-->