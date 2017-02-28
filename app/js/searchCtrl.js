// Search controller that we use whenever we have a search inputs
// and search results
dinnerPlannerApp.controller('SearchCtrl', function ($scope,Dinner) {

    // TODO in Lab 5: you will need to implement a method that searchers for dishes
    // including the case while the search is still running.

    // Dinner.Dish.get({id:583901})

    $scope.search = {
        filter: '',
        type: ''
    }
    $scope.types = [
        {id:'', name:'All dishes'},
        {id:'appetizer', name:'Appetizer'},
        {id:'beverage', name:'Beverage'},
        {id:'bread', name:'Bread'},
        {id:'breakfast', name:'Breakfast'},
        {id:'dessert', name:'Dessert'},
        {id:'drink', name:'Drink'},
        {id:'main course', name:'Main course'},
        {id:'salad', name:'Salad'},
        {id:'sauce', name:'Sauce'},
        {id:'side dish', name:'Side dish'},
        {id:'soup', name:'Soup'}
    ];

    $scope.searchDish = function(filter, type){
        $scope.dishes = Dinner.SearchDish.get({query:filter,type:type});
    }
    $scope.d = function(){
        console.log($scope.search.filter);
        console.log($scope.search.type);
    }
});
