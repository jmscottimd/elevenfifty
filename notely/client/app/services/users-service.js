angular.module('notely')
.service('UsersService', ['$http', 'API_BASE', ($http, API_BASE) => {
	class UsersService {
		create(user){
			let userPromise = $http.post(`${API_BASE}users`,{
				user: user
			});
			// after create finishes
			userPromise.then((response) => {
				console.log(response.data.user);
			})
			return userPromise;
		}
	}

	return new UsersService();
	
}]);