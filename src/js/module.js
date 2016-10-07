/**
 * Angular-xeditable module 
 *
 */
angular.module('xeditable', [])


/**
 * Default options. 
 *
 * @namespace editable-options
 */
//todo: maybe better have editableDefaults, not options...
.value('editableOptions', {
  /**
   * Theme. Possible values `bs3`, `bs2`, `default`.  
   * Default is `default`
   * 
   * @var {string} theme
   * @memberOf editable-options
   */  
  theme: 'default',
  /**
   * Icon Set. Possible values `font-awesome`, `default`.  
   * Default is `default`
   * 
   * @var {string} icon set
   * @memberOf editable-options
   */  
  icon_set: 'default',
  /**
   * Whether to show buttons for single editable element.  
   * Possible values `right`, `no`.  
   * Default is `right`
   * 
   * @var {string} buttons
   * @memberOf editable-options
   */    
  buttons: 'right',
  /**
   * Default value for `blur` attribute of single editable element.  
   * Can be `cancel|submit|ignore`.  
   * Default is `cancel`
   * 
   * @var {string} blurElem
   * @memberOf editable-options
   */
  blurElem: 'cancel',
  /**
   * Default value for `blur` attribute of editable form.  
   * Can be `cancel|submit|ignore`.  
   * Default is `ignore`.
   * 
   * @var {string} blurForm
   * @memberOf editable-options
   */
  blurForm: 'ignore',
  /**
   * How input elements get activated. Possible values: `focus|select|none`.  
   * Default is `focus`
   *
   * @var {string} activate
   * @memberOf editable-options
   */
  activate: 'focus',
  /**
   * Whether to disable x-editable. Can be overloaded on each element.  
   * Default is `false`
   *
   * @var {boolean} isDisabled
   * @memberOf editable-options
   */
   isDisabled: false,
  
  /**
   * Event, on which the edit mode gets activated. 
   * Can be any event.  
   * Default is `click`
   *
   * @var {string} activationEvent
   * @memberOf editable-options
   */
  activationEvent: 'click',

  /**
   * The default title of the submit button.  
   * Default is `Submit`
   *
   * @var {string} submitButtonTitle
   * @memberOf editable-options
   */
  submitButtonTitle: 'Submit',

  /**
   * The default aria label of the submit button.  
   * Default is `Submit`
   *
   * @var {string} submitButtonAriaLabel
   * @memberOf editable-options
   */
  submitButtonAriaLabel: 'Submit',

  /**
   * The default title of the cancel button.  
   * Default is `Cancel`
   *
   * @var {string} cancelButtonTitle
   * @memberOf editable-options
   */
  cancelButtonTitle: 'Cancel',

  /**
   * The default aria label of the cancel button.  
   * Default is `Cancel`
   *
   * @var {string} cancelButtonAriaLabel
   * @memberOf editable-options
   */
  cancelButtonAriaLabel: 'Cancel',

  /**
   * The default title of the clear button.  
   * Default is `Clear`
   *
   * @var {string} clearButtonTitle
   * @memberOf editable-options
   */
  clearButtonTitle: 'Clear',

  /**
   * The default aria label of the clear button.  
   * Default is `Clear`
   *
   * @var {string} clearButtonAriaLabel
   * @memberOf editable-options
   */
  clearButtonAriaLabel: 'Clear',

  /**
   * Whether to display the clear button.  
   * Default is `false`
   *
   * @var {boolean} displayClearButton
   * @memberOf editable-options
   */
  displayClearButton: false
});
