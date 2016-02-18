angular.module('auth').controller('HomeCtrl', HomeCtrl);

HomeCtrl.$inject = ['$timeout', 'DataService'];

function HomeCtrl($timeout, DataService) {

	var vm = this;

	vm.formData = {};

	vm.init = function(){
		DataService.list(function(res) {
			$timeout(function(){
				vm.formData.result = res;
			}, 1000)
		}, function(err) {
			console.log(err);
		})
	}

	vm.init();

}