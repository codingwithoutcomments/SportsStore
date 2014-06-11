angular.module("sportsStore")
	.constant("productsURL", "https://incandescent-fire-5353.firebaseio.com/products")
	.controller("sportsStoreCtrl", function ($scope, $firebase, productsURL) {

		var productsRef = new Firebase(productsURL);

		/*productsRef.push({
			"Name" : "Kayak",
			"Description" : "A boat for one person",
			"Category" : "Watersports",
			"Price" : "275"
		}); */

		$scope.data = {}
		$scope.data.products = []
		productsRef.on('child_added', function(snapshot) {
		  var product = snapshot.val();
		  var product_dict = {}
		  product_dict["name"] = product.Name
		  product_dict["description"] = product.Description
		  product_dict["category"] = product.Category
		  product_dict["price"] = product.Price
		  $scope.data.products.push(product_dict);
		  $scope.$digest();
		});


		/*$scope.data = {
			products : [
			{
				name: "Product #1",
				description: "A product",
				category: "Category #1",
				price: 100
			},
			{
				name: "Product #2",
				description: "A product",
				category: "Category #1",
				price: 100
			},
			{
				name: "Product #3",
				description: "A product",
				category: "Category #2",
				price: 100
			},
			{
				name: "Product #1",
				description: "A product",
				category: "Category #1",
				price: 100
			},
			{
				name: "Product #2",
				description: "A product",
				category: "Category #1",
				price: 100
			},
			{
				name: "Product #3",
				description: "A product",
				category: "Category #2",
				price: 100
			}
			]
		}; */

});