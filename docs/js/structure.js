module.exports = [
    {id: 'overview', text: 'Overview', items: []},
    {id: 'getstarted', text: 'Get started', items: []},
    {id: 'text-simple', text: 'Controls', type: 'demos', items: [
        {id: 'text-simple', text: 'Text', fiddle: 'http://jsfiddle.net/ckosloski/NfPcH/19035/'},
        {id: 'select-local', text: 'Select local', fiddle: 'http://jsfiddle.net/ckosloski/NfPcH/19036/'},
        {id: 'select-remote', text: 'Select remote', fiddle: 'http://jsfiddle.net/ckosloski/NfPcH/19039/'},
        {id: 'html5-inputs', text: 'HTML5 inputs', fiddle: 'http://jsfiddle.net/ckosloski/NfPcH/19040/'},
        {id: 'textarea', text: 'Textarea', fiddle: 'http://jsfiddle.net/ckosloski/NfPcH/19041/'},
        {id: 'checkbox', text: 'Checkbox', fiddle: 'http://jsfiddle.net/ckosloski/NfPcH/19042/'},
        {id: 'checklist', text: 'Checklist', fiddle: ''},
        {id: 'radiolist', text: 'Radiolist', fiddle: ''},
        {id: 'bsdate', text: 'Date', fiddle: 'http://jsfiddle.net/ckosloski/NfPcH/19043/'},
        {id: 'uidate', text: 'UI Date', fiddle: ''},
        {id: 'bstime', text: 'Time', fiddle: 'http://jsfiddle.net/ckosloski/NfPcH/19046/'},
        {id: 'combodate', text: 'DateTime', fiddle: '', fiddleText: 'No jsFiddle'},
        {id: 'typeahead', text: 'Typeahead', fiddle: 'http://jsfiddle.net/ckosloski/NfPcH/19049/'},
        {id: 'uiselect', text: 'UI-Select', fiddle: '', fiddleText: 'No jsFiddle'},
        {id: 'ngtags', text: 'ngTagsInput', fiddle: '', fiddleText: 'No jsFiddle'}
    ]},

    {id: 'text-customize', text: 'Techniques', type: 'demos', items: [
        {id: 'text-customize', text: 'Customize input', fiddle: 'http://jsfiddle.net/ckosloski/NfPcH/19050/'},
        {id: 'text-btn', text: 'Trigger manually', fiddle: 'http://jsfiddle.net/ckosloski/NfPcH/19051/'},
        {id: 'select-nobuttons', text: 'Hide buttons', fiddle: 'http://jsfiddle.net/ckosloski/NfPcH/19052/'},
        {id: 'select-multiple', text: 'Select multiple', fiddle: 'http://jsfiddle.net/ckosloski/NfPcH/19053/'},
        {id: 'validate-local', text: 'Validate local', fiddle: 'http://jsfiddle.net/ckosloski/NfPcH/19054/'},
        {id: 'validate-remote', text: 'Validate remote', fiddle: 'http://jsfiddle.net/ckosloski/NfPcH/19055/'},
        {id: 'edit-disabled', text: 'Disable editing'},
        {id: 'editable-popover', text: 'Editable Popover'},
        {id: 'uipopover', text: 'Editable ui-bootstrap Popover'},
        {id: 'e-single', text: 'Single editable in a form'}
    ]},

    {id: 'onbeforesave', text: 'Submit', type: 'demos', items: [
        {id: 'onbeforesave', text: 'Submit via onbeforesave', fiddle: 'http://jsfiddle.net/ckosloski/NfPcH/19056/', menutext: 'Onbeforesave'},
        {id: 'onaftersave', text: 'Submit via onaftersave', fiddle: 'http://jsfiddle.net/ckosloski/NfPcH/19057/', menutext: 'Onaftersave'}
    ]},

    {id: 'editable-form', text: 'Forms', type: 'demos', items: [
        {id: 'editable-form', text: 'Editable form', nodebug: true, fiddle: 'http://jsfiddle.net/ckosloski/NfPcH/19058/'}
    ]},

    {id: 'editable-row', text: 'Tables', type: 'demos', items: [
        {id: 'editable-row', text: 'Editable row', nodebug: true, fiddle: 'http://jsfiddle.net/ckosloski/NfPcH/19059/'},
        {id: 'editable-column', text: 'Editable column', nodebug: true, fiddle: 'http://jsfiddle.net/ckosloski/NfPcH/19060/'},
        {id: 'editable-table', text: 'Editable table', nodebug: true, fiddle: 'http://jsfiddle.net/ckosloski/NfPcH/19061/'}
    ]},

    {id: 'themes', anchor: 'bootstrap3', text: 'Themes', items: [
        {id: 'bootstrap3', text: '', menutext: 'Bootstrap 3'},
        {id: 'bootstrap2', text: '', menutext: 'Bootstrap 2'},
        {id: 'default', text: '', menutext: 'Default'}    
    ]},

    {id: 'reference', anchor: 'ref-element', text: 'Reference', items: [
        {id: 'ref-element', text: '', menutext: 'Editable element'},
        {id: 'ref-form', text: '', menutext: 'Editable form'},
        {id: 'ref-options', text: '', menutext: 'Editable options'}
    ]},

    {id: 'dev-text', text: 'Dev Tests', type: 'demos', env: 'dev', items: [
        {id: 'dev-text'},
        {id: 'dev-form'},
        {id: 'dev-select'},
        {id: 'dev-bsdate'},
        {id: 'dev-uiselect'},
        {id: 'dev-theme'},
        {id: 'dev-ngtags'},
        {id: 'dev-radiolist'},
        {id: 'dev-checklist'},
        {id: 'dev-editable-row'},
        {id: 'dev-textarea'},
        {id: 'dev-combodate'},
        {id: 'dev-eform'},
        {id: 'dev-select-multiple'},
        {id: 'dev-checkbox'}
    ]}
];
