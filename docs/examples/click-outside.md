# Changing state when clicking outside of an element

This feature should be enabled in the controller element with<br />`data-action="click@window->toggler#clickOutside"`.

It will set variables when clicking outside this element, with<br />`data-toggler-click-outside="..."`.

Click-outside can be ignored in other element if it is set in it<br />`data-toggler-click-outside-ignore="..."`.

**Input**

<<< @/../examples/click-outside.html

**Output**

<!--@include: ./../../examples/click-outside.html-->


::: info
`click-outside-ignore` is very useful for elements as dropdowns, where you want them to be hidden only if you click outside the dropdown itself
:::