var page = function(){
    this.beginEdit = function(){
        element(by.binding('user.name')).click();
    }
};

module.exports = page;