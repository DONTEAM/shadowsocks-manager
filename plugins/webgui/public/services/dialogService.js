const app = require('../index').app;

app.factory('alertDialog' , [ '$mdDialog', ($mdDialog) => {
  const publicInfo = {};
  publicInfo.isLoading = false;
  publicInfo.content = '';
  publicInfo.button = '';
  const close = () => {
    return $mdDialog.hide().then(success => {
      publicInfo.isLoading = false;
      alertDialogPromise = null;
      return;
    }).catch(err => {
      publicInfo.isLoading = false;
      alertDialogPromise = null;
      return;
    });
  };
  publicInfo.close = close;
  let alertDialogPromise = null;
  const isDialogShow = () => {
    if(alertDialogPromise && !alertDialogPromise.$$state.status) {
      return true;
    }
    return false;
  };
  const dialog = {
    templateUrl: '/public/views/home/alertDialog.html',
    escapeToClose: false,
    locals: { bind: publicInfo },
    bindToController: true,
    controller: ['$scope', '$mdDialog', 'bind', function($scope, $mdDialog, bind) {
      $scope.publicInfo = bind;
    }],
    clickOutsideToClose: false,
  };
  const show = (content, button) => {
    publicInfo.content = content;
    publicInfo.button = button;
    if(isDialogShow()) {
      publicInfo.isLoading = false;
      return alertDialogPromise;
    }
    alertDialogPromise = $mdDialog.show(dialog);
    return alertDialogPromise;
  };
  const loading = () => {
    publicInfo.isLoading = true;
    if(!isDialogShow()) {
      show();
    }
  };
  return {
    show,
    loading,
    close,
  };
}]);
