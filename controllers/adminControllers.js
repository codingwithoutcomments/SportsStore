angular.module("sportsStoreAdmin")
.constant("firebaseURL", "https://incandescent-fire-5353.firebaseio.com")
.constant("ordersURL", "https://incandescent-fire-5353.firebaseio.com/orders")
.constant("productsURL", "https://incandescent-fire-5353.firebaseio.com/products")
.controller("authCtrl", function($scope, $http, $location, firebaseURL) {

        $scope.data = {}

        var chatRef = new Firebase(firebaseURL);
        var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {

          if (error) {
            // an error occurred while attempting login
            console.log(error);
            $scope.authenticationEroor = error;

          } else if (user) {
            // user authenticated with Firebase
            console.log('User ID: ' + user.uid + ', Provider: ' + user.provider);
            $scope.data.user = user;
            $scope.$digest();

          } else {
            // user is logged out
          }
        });

        $scope.authenticate = function(email, password) {

            auth.login('password', {
              email: email,
              password: password
            });

        }
})
.controller("mainCtrl", function($scope) {

            $scope.screens = ["Products", "Orders"];
            $scope.current = $scope.screens[0];

            $scope.setScreen = function(index) {
                $scope.current = $scope.screens[index];
            };

            $scope.getScreen = function() {
                return $scope.current == "Products" ? "/views/adminProducts.html" : "/views/adminOrders.html";
            };
})
.controller("ordersCtrl", function($scope, $firebase, ordersURL, productsURL) {

    $scope.orders = [];

    var ordersRef = new Firebase(ordersURL);
    var productsRef = new Firebase(productsURL);
    ordersRef.on("child_added", function(snap) {

        this.order = snap.val()
        this.scope = $scope
        this.orders = $scope.orders;
        var order_id = snap.name();
        this.order.id = order_id;

        var ordersProductsRef = ordersRef.child(order_id).child("products");
        this.order.products = []
        $scope.orders.push(order);
        $this = this
        ordersProductsRef.on("child_added", function(snap) {
            var order = $this.order;
            var scope = $this.scope;
            productsRef.child(snap.name()).once("value", function(dataSnapshot) {
                var product = dataSnapshot.val();
                product.count = 1;
                order.products.push(product);

                for(var i = 0; i < scope.orders.length; i++) {
                    var array_id = scope.orders[i].id;
                    if(order.id == array_id) {
                        scope.orders[i] = order;
                    }
                }
                scope.$digest();
            });
        });
    });

    $scope.selectedOrder;

    $scope.selectOrder = function(order) {
        $scope.selectedOrder = order;
    };

    $scope.calcTotal = function(order) {
        var total = 0;
        for (var i = 0; i < order.products.length; i++) {
            var count = order.products[i].count;
            var price = order.products[i].Price;
            total += count * price;
        }
        return total;
    }

});
