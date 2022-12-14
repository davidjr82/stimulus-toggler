# How to use with tabs

We have said a variable state can be only set to on or off. **This is not true**:

::: danger
Setting arbitrary values for variables is only intended for internal purposes yet, as tabs.

Although it can be used by the end user, no tests are made for it.
:::

A variable state can be set to an arbitrary value with<br />`data-toggler-states="variable:state"`.

The effect is:
- Elements that listen to that variable and that state will react as adding the on classes, and removing the off clases.
- Elements that listen to that variable but to other states will react as removing the on classes, and adding the off clases.

To use tabs in a comfortable way, we have added an *alias* that sets everything when the element is connected with `data-toggler-target="toggleable"`.

::: details See alias for `data-toggler-tab-[link|content]`
- `data-toggler-tab-link="group:content"` is an alias of:
    - `data-action="toggler#states"`
    - `data-toggler-states="-tabs_group,+tab_group_content"`
    - `data-toggler-listen="-tabs_group,+tab_group_content"`


- `data-toggler-tab-content="group:content"` is an alias of:
    - `data-toggler-listen="-tabs_group,+tab_groups_content"`
:::

You should set `data-toggler-tab-active` in one data-toggler-tab-link to start with that tab enabled.
If you don't want the tab-link to be active every time a target is connected, set also `data-toggler-tab-active-forget` in that tab-link.

::: tip
We show a simplified example code for clarity purposes.
:::

**Example code**

<<< @/../examples/tabs-code.html

**Output**

::: details Click here to see the real input code of this output
<<< @/../examples/tabs-example.html
:::

<!--@include: ./../../examples/tabs-example.html-->