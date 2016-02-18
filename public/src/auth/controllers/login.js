angular.module('auth').controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['$window', '$state', 'UserService'];

function LoginCtrl ($window, $state, UserService) {

	var vm = this;

	vm.formData = {};

	vm.login = function() {
		if(vm.formData.username && vm.formData.password){
			UserService.login(vm.formData, function(res){			
				if(res.pass){
					$window.sessionStorage.token = res.token;
					$state.go('Home');
				}else{
					vm.message = res.data;
				}
			}, function(err){
				console.log(err);
			})
		}
	};

	(function() {
		if($window.sessionStorage.token) {
			$state.go('Home');
		}
	})();

}