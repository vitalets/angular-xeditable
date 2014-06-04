module.exports = [
    {id: 'overview', text: 'Overview', items: []},
    {id: 'getstarted', text: 'Get started', items: []},
    {id: 'text-simple', text: 'Controls', type: 'demos', items: [
        {id: 'text-simple', text: 'Text', fiddle: 'http://jsfiddle.net/NfPcH/25/'},
        {id: 'select-local', text: 'Select local', fiddle: 'http://jsfiddle.net/NfPcH/28/'},
        {id: 'select-remote', text: 'Select remote', fiddle: 'http://jsfiddle.net/NfPcH/29/'},
        {id: 'html5-inputs', text: 'HTML5 inputs', fiddle: 'http://jsfiddle.net/NfPcH/82/'},
        {id: 'textarea', text: 'Textarea', fiddle: 'http://jsfiddle.net/NfPcH/32/'},
        {id: 'checkbox', text: 'Checkbox', fiddle: 'http://jsfiddle.net/NfPcH/33/'},
        {id: 'checklist', text: 'Checklist', fiddle: ''},
        {id: 'radiolist', text: 'Radiolist', fiddle: ''},
        {id: 'bsdate', text: 'Date', fiddle: 'http://jsfiddle.net/NfPcH/23/', fiddleText: 'View Bootstrap 2 jsFiddle'},
        {id: 'bstime', text: 'Time', fiddle: 'http://jsfiddle.net/NfPcH/34/', fiddleText: 'View Bootstrap 2 jsFiddle'},
        {id: 'combodate', text: 'DateTime', fiddle: '', fiddleText: 'No jsFiddle'},
        {id: 'typeahead', text: 'Typeahead', fiddle: 'http://jsfiddle.net/NfPcH/46/', fiddleText: 'View Bootstrap 2 jsFiddle'}
    ]},

    {id: 'text-customize', text: 'Techniques', type: 'demos', items: [
        {id: 'text-customize', text: 'Customize input', fiddle: 'http://jsfiddle.net/NfPcH/26/'},
        {id: 'text-btn', text: 'Trigger manually', fiddle: 'http://jsfiddle.net/NfPcH/27/'},
        {id: 'select-nobuttons', text: 'Hide buttons', fiddle: 'http://jsfiddle.net/NfPcH/31/'},
        {id: 'select-multiple', text: 'Select multiple', fiddle: 'http://jsfiddle.net/NfPcH/30/'},
        {id: 'validate-local', text: 'Validate local', fiddle: 'http://jsfiddle.net/NfPcH/35/'},
        {id: 'validate-remote', text: 'Validate remote', fiddle: 'http://jsfiddle.net/NfPcH/36/'}
    ]},

    {id: 'onbeforesave', text: 'Submit', type: 'demos', items: [
        {id: 'onbeforesave', text: 'Submit via onbeforesave', fiddle: 'http://jsfiddle.net/NfPcH/37/', menutext: 'Onbeforesave'},
        {id: 'onaftersave', text: 'Submit via onaftersave', fiddle: 'http://jsfiddle.net/NfPcH/38/', menutext: 'Onaftersave'}
    ]},

    {id: 'editable-form', text: 'Forms', type: 'demos', items: [
        {id: 'editable-form', text: 'Editable form', nodebug: true, fiddle: 'http://jsfiddle.net/NfPcH/81/'},
    ]},

    {id: 'editable-row', text: 'Tables', type: 'demos', items: [
        {id: 'editable-row', text: 'Editable row', nodebug: true, fiddle: 'http://jsfiddle.net/NfPcH/93/'},
        {id: 'editable-column', text: 'Editable column', nodebug: true, fiddle: 'http://jsfiddle.net/NfPcH/80/'},
        {id: 'editable-table', text: 'Editable table', nodebug: true, fiddle: 'http://jsfiddle.net/NfPcH/78/'}
    ]},

    {id: 'themes', anchor: 'bootstrap3', text: 'Themes', items: [
        {id: 'bootstrap3', text: '', menutext: 'Bootstrap 3'},
        {id: 'bootstrap2', text: '', menutext: 'Bootstrap 2'},
        {id: 'default', text: '', menutext: 'Default'}    
    ]},

    {id: 'reference', anchor: 'ref-element', text: 'Reference', items: [
        {id: 'ref-element', text: '', menutext: 'Editable element'},
        {id: 'ref-form', text: '', menutext: 'Editable form'},
    ]},

    {id: 'dev-text', text: 'Dev Tests', type: 'demos', env: 'dev', items: [
        {id: 'dev-text'},
        {id: 'dev-form'},
        {id: 'dev-select'}
    ]}
];