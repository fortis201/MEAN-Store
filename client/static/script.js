var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {
	$routeProvider
		.when('/', {templateUrl: 'partials/dashboard.html'})
		.when('/customers', {templateUrl: 'partials/customers.html'})
		.when('/products', {templateUrl: 'partials/products.html'})
		.when('/orders', {templateUrl: 'partials/cart.html'})
		.otherwise({redirectTo:'/'});
});

// *** --=== FACTORIES ===-- *** //
myApp.factory("mainFactory", function ($http, $location) {
	var factory = {};

	factory.showCustomers = function (callback) {
		$http.get('/showCustomers').success(function (result) {
			console.log("Fetching customer data...");
			console.log(result);
			callback(result);
		})
	}

	factory.showProducts = function (callback) {
		$http.get('/showProducts').success(function (result) {
			console.log("Fetching all products...");
			console.log(result);
			callback(result);
		})
	}

	factory.showOrders = function (callback) {
		$http.get('/showOrders').success(function (result) {
			console.log("Fetching all orders...");
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

	factory.addProduct = function (info, callback) {
		console.log("sending new product data to the server...");
		$http.post('/addProduct', info).success(function (result) {
			console.log('New product results are: ');
			console.log(result);
			callback(result);
		})
	}

	factory.addOrder = function (info, callback) {
		console.log("sending new customer data to the server...");
		$http.post('/addCustomer', info).success(function (result) {
			console.log("Receiving 'add' results from server..");
			callback(result);
		});		
	}

	factory.miniCart = {};
	factory.miniCart.contents = [];

	return factory;
})

// *** --=== CONTROLLERS ===-- *** //
// --=== Customers ===-- //
myApp.controller('customersController', function ($scope, $location, mainFactory) {

	mainFactory.showCustomers(function (data) {
		$scope.customers = data;
	});

	$scope.createCustomer = function () {
		$scope.err_message = {};
		if (!$scope.newCustomer) {
			$scope.err_message = {msg: "this field cannot be empty"};
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

// --=== Navbar ===-- //
myApp.controller('navBarController', function ($scope, $location, mainFactory) {
	$scope.login = function () {
		console.log("logging in...");
	}

	$scope.register = function () {
		console.log("registering...");
	}

})

// --=== Products ===-- //
myApp.controller('productsController', function ($scope, $location, mainFactory) {
	mainFactory.showProducts(function (data) {
		$scope.products = data;
	})

	$scope.orderDetails = {};

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
		console.log(quantity);
		var itemId = item._id;
		var itemName = item.name;
		$scope.orderDetails.quantity = quantity;
		$scope.orderDetails.productId = itemId;
		$scope.orderDetails.productName = itemName;

		console.log($scope.orderDetails);
		mainFactory.miniCart.contents.push($scope.orderDetails);
		console.log("minicart");
		console.log(mainFactory.miniCart);

		$scope.orderDetails = {};
	}
})

// --=== Orders ===-- //
myApp.controller('ordersController', function ($scope, $location, mainFactory) {
	// mainFactory.showOrders(function (data) {
	// 	$scope.products = data;	
		
	// })
	console.log("cart details");
	$scope.cartDetails = mainFactory.miniCart.contents;
	console.log($scope.cartDetails);

	$scope.createOrder = function() {
		// console.log("in orderCtrl");
		// console.log($scope.newOrder);



		// mainFactory.addOrder($scope.newOrder, function (result) {
		// 	console.log(result);
		// })
		// mainFactory.showOrder(function (data) {
		// 	$scope.orders = data;
		// })
		// $scope.newOrder = {};
	}
})
