# How to use transitions

Transitions can be applied with `data-transition-xxx` in the toggled element.

Also, an alias `data-toggler-transition=mytransition` can be used as a shortcut.

::: details See alias for `data-toggler-transition`
- `data-toggler-transition=mydropdown"` is an alias of:
    - `data-transition-enter="mydropdown-enter"`
    - `data-transition-enter-start="mydropdown-start"`
    - `data-transition-enter-end="mydropdown-end"`
    - `data-transition-leave="mydropdown-leave"`
    - `data-transition-leave-start="mydropdown-start"`
    - `data-transition-leave-end="mydropdown-end"`

so you can use it in your css file like:
```css
.mydropdown-enter { ... }
.mydropdown-start { ... }
.mydropdown-end { ... }
.mydropdown-leave { ... }
.mydropdown-start { ... }
.mydropdown-end { ... }
```

:::


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

Example of `data-toggler-transition` value:

```html
<div data-toggler-transition="mydropdown">
```

**Input**

<<< @/../examples/transitions.html

**Output**

<!--@include: ./../../examples/transitions.html-->