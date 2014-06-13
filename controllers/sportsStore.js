angular.module("sportsStore")
	.constant("productsURL", "https://incandescent-fire-5353.firebaseio.com/products")
	.constant("ordersURL", "https://incandescent-fire-5353.firebaseio.com/orders")
	.controller("sportsStoreCtrl", function ($scope, $firebase, productsURL, ordersURL, cart) {

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

		$scope.sendOrder = function(shippingDetails) {

			var order = angular.copy(shippingDetails);
			var products = cart.getProducts();
			var products_array = [];
			for(var i = 0; i < products.length; i++) {
				product = {}
				product.name = products[i].name
				product.count = products[i].count
				product.id = products[i].id
				product.price = products.price
				products_array.push(product)
			}

			order.products = products_array;

			var orderRef = new Firebase(ordersURL);
			orderRef.push(order);
		}

});