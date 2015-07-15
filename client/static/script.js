var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {
	$routeProvider
		.when('/', {templateUrl: 'partials/products.html'})
		.when('/register', {templateUrl: 'partials/registration.html'})
		// will implement user dashboard in the future
		// .when('/products', {templateUrl: 'partials/products.html'})
		.when('/cart', {templateUrl: 'partials/cart.html'})
		.otherwise({redirectTo:'/'});
});

// *** --=== FACTORIES ===-- *** //
myApp.factory("mainFactory", function ($http, $location) {
	var factory = {};

	// **********************//
	// --=== Customers ===-- //
	// **********************//
	factory.showCustomers = function (callback) {
		$http.get('/showCustomers').success(function (result) {
			console.log("Fetching customer data...");
			console.log(result);
			callback(result);
		})
	}

	factory.findOneCust = function (info, callback) {
		$http.post('/findOneCust', info).success(function (result) {
			console.log("user credentials verified");
			console.log(result);
			callback(result);
		})
	}

	factory.addCustomer = function (info, callback) {
		console.log("sending new customer data to the server...");
		$http.post('/addCustomer', info).success(function (result) {
			console.log("Receiving 'add' results from server..");
			callback(result);
		});		
	}

	// **********************//
	// --=== Products  ===-- //
	// **********************//

	factory.showProducts = function (callback) {
		$http.get('/showProducts').success(function (result) {
			console.log("Fetching all products...");
			console.log(result);
			callback(result);
		})
	}

	factory.addProduct = function (info, callback) {
		console.log("sending new product data to the server...");
		$http.post('/addProduct', info).success(function (result) {
			console.log('New product results are: ');
			console.log(result);
			callback(result);
		})
	}

	// **********************//
	// --==== Orders  ====-- //
	// **********************//

	factory.showOrders = function (callback) {
		console.log("showing orders");
		$http.get('/showOrders').success(function (result) {
			console.log("Fetching all orders...");
			console.log(result);
			callback(result);
		})
	}

	factory.addOrder = function (info, callback) {
		console.log("creating new cart...");
		$http.post('/addOrder', info).success(function (result) {
			console.log("Receiving checkout results from server..");
			callback(result);
		});		
	}

	factory.updateOrder = function (info, callback) {
		console.log("sending cart data to the server...");
		$http.post("/updateOrder", info).success(function (result) {
			callback(result);
		})
	}

	return factory;
})

// *** --=== CONTROLLERS ===-- *** //

// --=== Navbar ===-- //
myApp.controller('navBarController', function ($scope, $location, mainFactory) {

	$scope.c_user = {};
	$scope.orderDetails = [];

	$scope.login = function () {
		console.log("logging in with user:");
		console.log($scope.userLogin);
		mainFactory.findOneCust($scope.userLogin, function (data) {
			console.log("in front-end controller with data:");
			$scope.orderDetails.push({uId : data.uId});	
			$scope.c_user = data;
			console.log($scope.c_user);

			mainFactory.addOrder({uId : data.uId}, function (data) {
				console.log("order created..?");
				console.log(data);
				$scope.orderDetails[0].oId = data.oId;
				console.log($scope.orderDetails);
			})
		})
		$scope.userLogin = {};		
	}

	$scope.register = function () {
		$location.path('/register');
	}

})

// --=== Customers ===-- //
myApp.controller('customersController', function ($scope, $location, mainFactory) {
	$scope.newCustomer = {};
	$scope.err_message = {};

	mainFactory.showCustomers(function (data) {
		$scope.customers = data;		
	});

	$scope.createCustomer = function () {
		// $scope.input_err = {};
		
		if ($scope.newCustomer.pw != $scope.newCustomer.conf_pw ) {
			$scope.reg_err = {msg: "Passwords must match"};
			console.log($scope.reg_err);
		} else {
			mainFactory.addCustomer($scope.newCustomer, function (data) {
				console.log(data);
				if (data.err_message) {					
					$scope.db_err = {msg: data.err_message};
				} else {
					mainFactory.showCustomers(function (data) {
						$scope.customers = data;
					});
					$location.path("/products");
				}
			})			
			$scope.newCustomer = {};			
		}
	};
})

// --=== Products ===-- //
myApp.controller('productsController', function ($scope, $location, mainFactory) {
	mainFactory.showProducts(function (data) {
		$scope.products = data;
	})	

	$scope.createProduct = function() {
		console.log($scope.newProduct);
		mainFactory.addProduct($scope.newProduct, function (result) {
			console.log(result);
		})
		mainFactory.showProducts(function (data) {
			$scope.products = data;
		})
		$scope.newProduct = {};
	}

	$scope.addToCart = function (item, quantity) {
		if ($scope.orderDetails.length >= 1) {
			$scope.orderDetails.push({quantity: quantity, productId: item._id, productName: item.name});	
		} else {
			alert("You must be looged-in to add items to your cart.");
		}
	}
})

// --=== Orders ===-- //
myApp.controller('ordersController', function ($scope, $location, mainFactory) {
	mainFactory.showOrders(function (data) {		
		$scope.orders = data;	
		
	})
	console.log("cart details");
	console.log($scope.orderDetails);

	$scope.updateOrder = function() {
		console.log("fix this function!");
		for (var i=1;i<$scope.orderDetails.length;i++) {
			mainFactory.updateOrder({x: $scope.orderDetails[0], y: $scope.orderDetails[i]}, function (data) {
				console.log("order created..?");
				console.log(data);
			})			
		}
	}
})
