// Search controller that we use whenever we have a search inputs
// and search results
dinnerPlannerApp.controller('SearchCtrl', function ($scope, Dinner) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
            $scope.$apply(function(){
                $scope.position = {};
                $scope.position.lat = position.coords.latitude;
                $scope.position.lng = position.coords.longitude;
                console.log(position);
            });
        });
    }
    // TODO in Lab 5: you will need to implement a method that searchers for dishes
    // including the case while the search is still running.

    // Dinner.Dish.get({id:583901})
    $scope.dataLocal = function(){
        var dataL = [];
        var dataTemp = Dinner.getDataLocal();
        if(dataTemp){
            for (key in dataTemp){
                var d = {};
                d.name = 'Store ' + Math.random().toString(36).substring(7).slice(1,7);
                d.address = dataTemp[key].address;
                d.product = dataTemp[key].product_name;
                d.position = {};
                var coord = (dataTemp[key].coordinates).split(", ");
                d.position.lat = Number(coord[0]);
                d.position.lng = Number(coord[1]);
                d.stock = dataTemp[key].in_stock;
                d.description = '<h4>'+ d.name + '</h4>' + '<div>'+ d.address +'</div>' + '<div>'+ d.product + ': '+ d.stock +'</div>';
                dataL.push(d);
                if (key == 10){
                    break;
                }
            }
        }
        return dataL;
    }
    $scope.placeData = [
        {
            position : {lat: 59, lng: 10},
            description : '<div id="content">23333</div>'
        },
        {
            position : {lat: 63, lng: 18},
            description : '<div id="content">23333</div>'
        },
        {
            position : {lat: 54, lng: 18},
            description : '<div id="content"></div>'
        }
    ];
    $scope.searchDumb = function(f){
        if(f == 'Go Pro Hero 4'){
            $scope.initMap();
        }
    }

    $scope.initMap = function() {
        console.log($scope.dataLocal());
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 14,
            center: $scope.position
        });
        var marker = new google.maps.Marker({
            position: $scope.position,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10
            },
            map: map
        });
        var markers = [];
        var infoWindows = [];
        var ddd = $scope.dataLocal();
        infowindow = new google.maps.InfoWindow();
        for (key in ddd){
            markers[key] = new google.maps.Marker({
                position: ddd[key].position,
                map: map
            });
            markers[key].index = key;
            infoWindows[key] = new google.maps.InfoWindow({
                content: ddd[key].description
            });
            google.maps.event.addListener(markers[key], 'click', function() {
                infoWindows[this.index].open(map,markers[this.index]);

            });
        }


    }
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
    $scope.dishes = '';
    $scope.searchDish = function(query,type) {
        // $scope.isLoading = true;
        $scope.isError = false;
        $scope.dishes = JSON.search(JSON.parse($scope.dataLocal() ? JSON.stringify($scope.dataLocal()) : '{}'), query);
        // Dinner.SearchDish.get({query:query,type:type},function(data){
        //     $scope.dishes = data.results;
        //     $scope.isLoading = false;
        // },function(data){
        //     $scope.isLoading = false;
        //     $scope.isError = true;
        // });
    }
    $scope.searchDish($scope.search.filter, $scope.search.type);
});
