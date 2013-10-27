/*
angular-xeditable module
*/
angular.module('xeditable', [])
.value('editableOptions', {
  /**
   * Theme. Possible values `bs3`, `bs2`, `default`.
   * 
   * @var {string} theme
   * @memberOf editable-options
   */  
  theme: 'default',
  /**
   * Whether to show buttons for single editalbe element.  
   * Possible values `right` (default), `no`.
   * 
   * @var {string} buttons
   * @memberOf editable-options
   */    
  buttons: 'right',
  /**
   * Default value for `blur` attribute of single editable element.  
   * Can be `cancel|submit|ignore`.
   * 
   * @var {string} blurElem
   * @memberOf editable-options
   */
  blurElem: 'cancel',
  /**
   * Default value for `blur` attribute of editable form.  
   * Can be `cancel|submit|ignore`.
   * 
   * @var {string} blurForm
   * @memberOf editable-options
   */
  blurForm: 'ignore'
});

