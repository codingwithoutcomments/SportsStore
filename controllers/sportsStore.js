angular.module("sportsStore")
	.constant("firebaseURL", "https://incandescent-fire-5353.firebaseio.com")
	.constant("productsURL", "https://incandescent-fire-5353.firebaseio.com/products")
	.constant("ordersURL", "https://incandescent-fire-5353.firebaseio.com/orders")
	.controller("sportsStoreCtrl", function ($scope, $firebase, $http, $location, firebaseURL, productsURL, ordersURL, cart) {

		var productsRef = new Firebase(productsURL);

		/*productsRef.push(
		{
			"Name" : "Kayak",
			"Description" : "A boat for one person",
			"Category" : "Watersports",
			"Price" : "275"
		}
		);

		productsRef.push(
		{
			"Name": "Lifejacket",
			"Description" : "Protective and fashionable",
			"Category" : "Watersports",
			"Price" : "48.95"
		}
		);

		productsRef.push(
		 {
			"Name": "Soccer Ball",
			"Description" : "FIFA-approved size and weight",
			"Category" : "Socccer",
			"Price" : "19.50"
		}
		);

		productsRef.push(
		{
			"Name": "Corner Flags",
			"Description" : "Give your playing field a professional touch",
			"Category" : "Soccer",
			"Price" : "34.95"
		}
		); */

		$scope.data = {}
		$scope.data.products = []
		productsRef.on('child_added', function(snapshot) {
		  var product = snapshot.val();
		  var product_dict = {}
		  product_dict["name"] = product.Name
		  product_dict["description"] = product.Description
		  product_dict["category"] = product.Category
		  product_dict["price"] = product.Price
		  product_dict["id"] = snapshot.name();
		  $scope.data.products.push(product_dict);
		  $scope.$digest();
		});

		$scope.socialLogin = function() {

			var chatRef = new Firebase(firebaseURL);
			var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {

			  if (error) {
			    // an error occurred while attempting login
			    console.log(error);

			  } else if (user) {
			    // user authenticated with Firebase
			    console.log('User ID: ' + user.uid + ', Provider: ' + user.provider);
			    $scope.data.user = user;
			    $scope.$digest();

			  } else {
			    // user is logged out
			  }
			});

			auth.login('facebook');
		}

		$scope.silentLogin = function() {

			var chatRef = new Firebase(firebaseURL);
			$scope.data.auth = new FirebaseSimpleLogin(chatRef, function(error, user) {

			  if (error) {
			    // an error occurred while attempting login
			    console.log(error);

			  } else if (user) {
			    // user authenticated with Firebase
			    console.log('User ID: ' + user.uid + ', Provider: ' + user.provider);
			    $scope.data.user = user;
			    $scope.$digest();

			  } else {
			    // user is logged out
			  }
			});
		}

		$scope.logout = function() {

			$scope.data.auth.logout();

		}

		$scope.silentLogin();

		$scope.sendOrder = function(shippingDetails) {

			var order = angular.copy(shippingDetails);
			var products = cart.getProducts();
			var products_dict = {}
			for(var i = 0; i < products.length; i++) {
				products_dict[products[i].id] = true
			}

			order.products = products_dict;

			var orderRef = new Firebase(ordersURL);
			orderRef.push(order, function(error){

				if(!error) {

					cart.getProducts().length = 0;

				} else {

					$scope.data.orderError = error;
				}

				$location.path("/complete");

			});

		}

});