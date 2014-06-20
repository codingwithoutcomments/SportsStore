angular.module("sportsStoreAdmin")
.constant("productsURL", "https://incandescent-fire-5353.firebaseio.com/products")
.controller("productCtrl", function($scope, $firebase, productsURL) {

    var productsRef = new Firebase(productsURL);

	$scope.listProducts = function() {

		$scope.products = [];
	    productsRef.on("child_added", function(snap) {

	    	var product = snap.val();
	    	product.id = snap.name();
	    	$scope.products.push(product);
            $scope.$digest();

	    });

	    productsRef.on("child_removed", function(snap) {

	    	for(var i = 0; i < $scope.products.length; i++) {
	    		if($scope.products[i].id == snap.name()) {

	    			$scope.products.splice(i, 1);
	    		}
	    	}

	    });

	    productsRef.on("child_changed", function(snap) {

	    	var product = snap.val();
	    	product.id = snap.name();

	    	for(var i = 0; i < $scope.products.length; i++) {
	    		if($scope.products[i].id == snap.name()) {

	    			$scope.products[i] = product;
	    		}
	    	}

	    });
	};

	$scope.deleteProduct = function (product) {

		productsRef.child(product.id).remove(function(error){

			if(error) {
				console.log("Error removing product");
			}

		});
	}

	$scope.createProduct = function(product) {

		productsRef.push(product);
	}

	$scope.updateProduct = function(product) {

		productsRef.child(product.id).update({
												"Name": product.Name,
												"Description": product.Description,
												"Category": product.Category,
												"Price": product.Price
											});
		$scope.editedProduct = null;
	}

	$scope.startEdit = function(product) {
		$scope.editedProduct = product;
	}

	$scope.cancelEdit = function() {
		$scope.editedProduct = null;
	}

	$scope.listProducts();

});
