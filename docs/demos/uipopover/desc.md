To make a single element editable via `ui-boostrap popover` do the following:
- Wrap the editable in `<div class="ui-popover-wrapper">`.
- Put the following attributes on the editable element:
    - `uib-popover-template="'popover.html'"` - The template is generated when the `popover` attribute is set to `true'
    - `popover-is-open="popoverIsOpen"` - Controls when the popover is opened
    - `onshow="popoverIsOpen = !popoverIsOpen"` - Opens the popover when the editable form is shown
    - `onhide="popoverIsOpen = !popoverIsOpen"` - Closes the popover when the editable form is closed
    - `popover="true"` - Tells the editable directive that this element is to be displayed in the ui-bootstrap popover
    - `popover-class="increase-popover-width"` - Add this attribute to change the width of the popover
