'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

//http://localhost/angular-xeditable/dev/angular-xeditable/test/e2e/runner.html

describe('single', function() {

  beforeEach(function() {
    browser().navigateTo('../../../index.html');
  });

  describe('select', function() {
    it('should show error when `onshow` returns string', function() {
      var s = '#select-onshow-err-string ';
      element(s+'a').click();
      expect(element(s+'a').css('display')).toBe('none');
      expect(element(s+'form select:enabled:visible').count()).toBe(1);
      expect(element(s+'button:enabled:visible').count()).toBe(2);
      expect(element(s+'.editable-error:visible').count()).toBe(1);
      expect(element(s+'.editable-error').text()).toBe('error');

      expect(element(s+'form select').val()).toBe('?');
    });

    it('should show error when `onshow` $http-promise rejects', function() {
      var s = '#select-onshow-err-promise-string ';
      element(s+'a').click();
      sleep(0.2);
      expect(element(s+'form select:enabled:visible').count()).toBe(1);
      expect(element(s+'button:enabled:visible').count()).toBe(2);
      expect(element(s+'.editable-error').text()).toMatch('server error');
      expect(element(s+'.editable-error:visible').count()).toBe(1);
      expect(element(s+'form select').val()).toBe('?');

      //second click: error should be cleared
      element(s+'button[type="button"]').click();
      element(s+'a').click();
      expect(element(s+'.editable-error:visible').count()).toBe(0);
      expect(element(s+'.editable-error').text()).toBe('');
    });


    it('should show error when `onshow` promise resolves to string', function() {
      var s = '#select-onshow-err-promise-string2 ';
      element(s+'a').click();
      sleep(0.2);
      expect(element(s+'form select:enabled:visible').count()).toBe(1);
      expect(element(s+'button:enabled:visible').count()).toBe(2);
      expect(element(s+'.editable-error').text()).toMatch('resolve string');
      expect(element(s+'.editable-error:visible').count()).toBe(1);
      expect(element(s+'form select').val()).toBe('?');
    });

  });


  describe('onbeforesave', function() {

    it('should check `onbeforesave` result', function() {
      var s = '#select-onbeforesave ';

      //returns string: error shown
      element(s+'a').click();
      using(s).select('$data').option('0');
      element(s+'button[type="submit"]').click();

      expect(element(s+'a').css('display')).toBe('none');
      expect(element(s+'form select:visible').count()).toBe(1);
      expect(element(s+'.editable-error').text()).toMatch('error status');
      expect(element(s+'.editable-error:visible').count()).toBe(1);

      //returns false: data will not be updated
      using(s).select('$data').option('2');
      element(s+'button[type="submit"]').click();

      expect(element(s+'a').css('display')).not().toBe('none');
      expect(element(s+'form select:visible').count()).toBe(0);
      expect(element(s+'a').text()).toMatch('status2');

      //returns true: data will be updated
      element(s+'a').click();
      using(s).select('$data').option('3');
      element(s+'button[type="submit"]').click();

      expect(element(s+'a').css('display')).not().toBe('none');
      expect(element(s+'form select:visible').count()).toBe(0);
      expect(element(s+'a').text()).toMatch('status4');
    });

  });

  describe('editable form', function() {

/*
    it('should show form by `edit` button click', function() {
      var s = '#editable-form ';

      //form initially hidden
      expect(element(s+'button.edit:visible').count()).toBe(1);
      expect(element(s+'.form-buttons button:visible').count()).toBe(0);

      element(s+'button.edit').click();

      //form shown (disabled) after click
      expect(element(s+'button.edit:visible').count()).toBe(0);
      expect(element(s+'.form-buttons:visible button:disabled').count()).toBe(2);
      expect(element(s+'select:disabled:visible').count()).toBe(2);
      expect(element(s+'input[type="text"]:disabled:visible').count()).toBe(1);
      
      sleep(0.2);

      //form enabled when data loaded
      expect(element(s+'.form-buttons:visible button:enabled').count()).toBe(2);
      expect(element(s+'select:enabled:visible').count()).toBe(2);
      expect(element(s+'input[type="text"]:enabled:visible').count()).toBe(1);

      //click cancel
      element(s+'.form-buttons button[type="button"]').click();

      //form closed
      expect(element(s+'button.edit:visible').count()).toBe(1);
      expect(element(s+'.form-buttons button:visible').count()).toBe(0);
      expect(element(s+'select:visible').count()).toBe(0);
      expect(element(s+'input[type="text"]:visible').count()).toBe(0);
    });

    it('should save data', function() {
      var s = '#editable-form ';
      element(s+'button.edit').click();

      sleep(0.2);

      //set correct values
      using(s+'.username').input('$data').enter('username2'); //ok
      using(s+'.status').select('$data').option('3'); //ok
      using(s+'.group').select('$data').option('3'); //ok

      element(s+'.form-buttons button[type="submit"]').click();

      //errors cleared
      //expect(element(s+'.username .editable-error').text()).toMatch('');
      expect(element(s+'.username .editable-error:visible').count()).toBe(0);
      //expect(element(s+'.status .editable-error').text()).toMatch('');
      expect(element(s+'.status .editable-error:visible').count()).toBe(0);

      //form disabled as onbeforesave returned promise
      //** same problem with disabled after submit 
      //expect(element(s+'.form-buttons:visible button:disabled').count()).toBe(2);
      //expect(element(s+'select:disabled:visible').count()).toBe(2);
      //expect(element(s+'input[type="text"]:disabled:visible').count()).toBe(1);
      

      sleep(0.2);

      expect(element(s+'.username span').text()).toMatch('username2');
      expect(element(s+'.status span').text()).toMatch('status4');
      expect(element(s+'.group span').text()).toMatch('4');

      //form closed
      expect(element(s+'button.edit:visible').count()).toBe(1);
      expect(element(s+'.form-buttons button:visible').count()).toBe(0);
      expect(element(s+'select:visible').count()).toBe(0);
      expect(element(s+'input[type="text"]:visible').count()).toBe(0);

      //onaftersave should be called
      expect(element('#log').text()).toMatch('afterSave');
    });

    it('should not close if children`s onbeforesave returns `string`', function() {
      var s = '#editable-form ';
      element(s+'button.edit').click();

      sleep(0.2);

      //change values
      using(s+'.username').input('$data').enter('username'); //returns promise with 'error'
      using(s+'.status').select('$data').option('0'); //returns string
      using(s+'.group').select('$data').option('3'); //ok

      element(s+'.form-buttons button[type="submit"]').click();

      //form disabled while checking
      //** strange behavior here !! 
      //expect(element(s+'.form-buttons:visible button:disabled').count()).toBe(2);
      //expect(element(s+'select:disabled:visible').count()).toBe(2);
      //expect(element(s+'input[type="text"]:disabled:visible').count()).toBe(1);

      sleep(0.2);

      //form remains visible
      expect(element(s+'.form-buttons:visible button:enabled').count()).toBe(2);
      expect(element(s+'select:enabled:visible').count()).toBe(2);
      expect(element(s+'input[type="text"]:enabled:visible').count()).toBe(1);

      //errors shown
      expect(element(s+'.username .editable-error').text()).toMatch('error username');
      expect(element(s+'.username .editable-error:visible').count()).toBe(1);
      expect(element(s+'.status .editable-error').text()).toMatch('error status');
      expect(element(s+'.status .editable-error:visible').count()).toBe(1);
      expect(element(s+'.group .editable-error').text()).toBe('');
      expect(element(s+'.group .editable-error:visible').count()).toBe(0);
    });
*/
    it('should not save if children`s onbeforesave returns false', function() {
      var s = '#editable-form ';
      element(s+'button.edit').click();

      sleep(0.2);

      using(s+'.username').input('$data').enter('username2'); //ok
      using(s+'.status').select('$data').option('2'); //returns false
      using(s+'.group').select('$data').option('3'); //ok

      element(s+'.form-buttons button[type="submit"]').click();

      sleep(0.2);

      expect(element(s+'.username span').text()).toMatch('username1');
      expect(element(s+'.status span').text()).toMatch('status2');
      expect(element(s+'.group span').text()).toMatch('3');

      //onaftersave should not be called
      expect(element('#log').text()).not().toMatch('editableFormAfterSave');
    });

    it('should not save if form`s onbeforesave rejects', function() {
      var s = '#editable-form ';
      element(s+'button.edit').click();

      sleep(0.2);

      using(s+'.username').input('$data').enter('username2'); //ok
      using(s+'.status').select('$data').option('3'); //ok
      using(s+'.group').select('$data').option('1'); //self ok, but form's onbeforesave rejects

      element(s+'.form-buttons button[type="submit"]').click();

      sleep(0.2);

      expect(element(s+'.username span').text()).toMatch('username1');
      expect(element(s+'.status span').text()).toMatch('status2');
      expect(element(s+'.group span').text()).toMatch('3');

      //onaftersave should not be called
      expect(element('#log').text()).not().toMatch('editableFormAfterSave');
    });


    it('should not save if form`s onbeforesave returns false', function() {
      var s = '#editable-form ';
      element(s+'button.edit').click();

      sleep(0.2);

      using(s+'.username').input('$data').enter('username2'); //ok
      using(s+'.status').select('$data').option('3'); //ok
      using(s+'.group').select('$data').option('0'); //self ok, but form's onbeforesave returns false

      element(s+'.form-buttons button[type="submit"]').click();

      sleep(0.2);

      expect(element(s+'.username span').text()).toMatch('username1');
      expect(element(s+'.status span').text()).toMatch('status2');
      expect(element(s+'.group span').text()).toMatch('3');

      //onaftersave should not be called
      expect(element('#log').text()).not().toMatch('editableFormAfterSave');
    });

  });

/*
 describe('editable row', function() {

    it('should show form by `edit` button click', function() {
      var s = '#editable-row-0 ';

      //form initially hidden
      expect(element(s+'button.edit:visible').count()).toBe(1);
      expect(element(s+'.form-buttons button:visible').count()).toBe(0);

      element(s+'button.edit').click();

      //form shown (disabled) after click
      expect(element(s+'button.edit:visible').count()).toBe(0);
      expect(element(s+'.form-buttons:visible button:disabled').count()).toBe(2);
      expect(element(s+'select:disabled:visible').count()).toBe(2);
      expect(element(s+'input[type="text"]:disabled:visible').count()).toBe(1);
      
      sleep(0.2);

      //form enabled when data loaded
      expect(element(s+'.form-buttons:visible button:enabled').count()).toBe(2);
      expect(element(s+'select:enabled:visible').count()).toBe(2);
      expect(element(s+'input[type="text"]:enabled:visible').count()).toBe(1);

      //click cancel
      element(s+'.form-buttons button[type="button"]').click();

      //form closed
      expect(element(s+'button.edit:visible').count()).toBe(1);
      expect(element(s+'.form-buttons button:visible').count()).toBe(0);
      expect(element(s+'select:visible').count()).toBe(0);
      expect(element(s+'input[type="text"]:visible').count()).toBe(0);
    });

    it('should save data', function() {
      var s = '#editable-row-0 ';
      element(s+'button.edit').click();

      sleep(0.2);

      //set correct values
      using(s+'.username').input('$data').enter('username2'); //ok
      using(s+'.status').select('$data').option('3'); //ok
      using(s+'.group').select('$data').option('3'); //ok

      element(s+'.form-buttons button[type="submit"]').click();

      //errors cleared
      expect(element(s+'.username .editable-error:visible').count()).toBe(0);
      expect(element(s+'.status .editable-error:visible').count()).toBe(0);

      //form disabled as onbeforesave returned promise
      //expect(element(s+'.form-buttons:visible button:disabled').count()).toBe(2);
      //expect(element(s+'select:disabled:visible').count()).toBe(2);
      //expect(element(s+'input[type="text"]:disabled:visible').count()).toBe(1);
      

      sleep(0.2);

      expect(element(s+'.username span').text()).toMatch('username2');
      expect(element(s+'.status span').text()).toMatch('status4');
      expect(element(s+'.group span').text()).toMatch('4');

      //form closed
      expect(element(s+'button.edit:visible').count()).toBe(1);
      expect(element(s+'.form-buttons button:visible').count()).toBe(0);
      expect(element(s+'select:visible').count()).toBe(0);
      expect(element(s+'input[type="text"]:visible').count()).toBe(0);

      //onaftersave should be called
      expect(element('#log').text()).toMatch('afterSave');
    });
  });
*/

/*
  describe('editable column', function() {

    it('should show form by `edit` button click', function() {
      var s = '.editable-col-0 ';

      //form initially hidden
      expect(element(s+'button.edit:visible').count()).toBe(1);
      expect(element(s+'.form-buttons button:visible').count()).toBe(0);

      element(s+'button.edit').click();

      //form shown after click
      expect(element(s+'button.edit:visible').count()).toBe(0);
      expect(element(s+'.form-buttons:visible button:enabled').count()).toBe(2);
      expect(element(s+'input[type="text"]:enabled:visible').count()).toBe(3);

      //click cancel
      element(s+'.form-buttons button[type="button"]').click();

      //form closed
      expect(element(s+'button.edit:visible').count()).toBe(1);
      expect(element(s+'.form-buttons button:visible').count()).toBe(0);
      expect(element(s+'input[type="text"]:visible').count()).toBe(0);
    });

    it('should show waiting form by `edit` button click', function() {
      var s = '.editable-col-2 ';

      //form initially hidden
      expect(element(s+'button.edit:visible').count()).toBe(1);
      expect(element(s+'.form-buttons button:visible').count()).toBe(0);

      element(s+'button.edit').click();

      //form shown (disabled) after click
      expect(element(s+'button.edit:visible').count()).toBe(0);
      expect(element(s+'.form-buttons:visible button:disabled').count()).toBe(2);
      expect(element(s+'select:disabled:visible').count()).toBe(3);

      sleep(0.2);

      //form loaded
      expect(element(s+'button.edit:visible').count()).toBe(0);
      expect(element(s+'.form-buttons:visible button:enabled').count()).toBe(2);
      expect(element(s+'select:enabled:visible').count()).toBe(3);
    });

    it('should save data', function() {
      var s = '.editable-col-0 ';
      element(s+'button.edit').click();

      using('.editable-col-0:eq(1)').input('$data').enter('username2'); //ok
      using('.editable-col-0:eq(2)').input('$data').enter('username1'); //ok

      //submit
      element(s+'.form-buttons button[type="submit"]').click();

      //form closed
      expect(element(s+'button.edit:visible').count()).toBe(1);
      expect(element(s+'.form-buttons button:visible').count()).toBe(0);
      expect(element(s+'input[type="text"]:visible').count()).toBe(0);

      //data saved
      expect(element('.editable-col-0:eq(1) span').text()).toMatch('username2');
      expect(element('.editable-col-0:eq(2) span').text()).toMatch('username1');
      expect(element('.editable-col-0:eq(3) span').text()).toMatch('username3');
    });

  });
 */
 
});

