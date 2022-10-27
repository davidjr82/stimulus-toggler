# Set the on and off classes to toggle

When a variable is set to on, the listener elements will add the `on-classes` and remove the `off-classes`, and viceversa.

Variable can have a different set of classes for both on/off states.

`data-toggler-classes-on="..."` are the classes that wil be **added** when state is *on* and **removed** when the state is *off*.

`data-toggler-classes-off="..."` are the classes that wil be **removed** when state is *on* and **added** when the state is *off*.

**Input**

<<< @/../examples/classes-on-off.html

**Output**

<!--@include: ./../../examples/classes-on-off.html-->


::: info
No `data-toggler-classes` means `data-toggler-classes-on=""` and `data-toggler-classes-off="hidden"`

`data-toggler-classes="my-class"` means `data-toggler-classes-on="my-class"` and `data-toggler-classes-off=""`
:::