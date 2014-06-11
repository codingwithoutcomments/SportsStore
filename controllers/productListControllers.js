angular.module("sportsStore")
	.constant("productListActiveClass", "btn-primary")
	.constant("productListPageCount", 2)
	.controller("productListCtrl", function ($scope, $filter, productListActiveClass, productListPageCount) {

		var selectedCategory = null;

		$scope.selectedPage = 1;
		$scope.pageSize = productListPageCount;

		$scope.selectCategory = function (newCategory) {
			selectedCategory = newCategory;
			$scope.selectedPage = 1;
		}

		$scope.selectPage = function(newPage) {
			$scope.selectedPage = newPage;
		}

		$scope.categoryFilterFn = function(product) {
			var temp = selectedCategory == null || product.category == selectedCategory;
			return temp;
		}

		$scope.getCategoryClass = function (category) {
			return selectedCategory == category ? productListActiveClass : "";
		}

		$scope.getPageClass = function(page) {
			return $scope.selectedPage == page ? productListActiveClass : "";
		}

});