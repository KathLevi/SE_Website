var app = angular.module('webApp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "partials/home.htm",
        controller : 'main as ctrl'
    })
    .when("/demo", {
        templateUrl : "partials/demo.htm",
        controller : 'main as ctrl'
    })
    .when("/profile", {
        templateUrl : "partials/profile.htm",
        controller : 'profile as ctrl'
    })
	.when("/viewSkills", {
        templateUrl : "partials/viewSkills.htm",
        controller : 'viewSkills as ctrl'
    })
	.when("/createSkills", {
        templateUrl : "partials/createSkills.htm",
        controller : 'skills as ctrl'
    })
	.when("/team", {
        templateUrl : "partials/team.htm",
        controller : 'team as ctrl'
    })
	.when("/contact", {
        templateUrl : "partials/contact.htm",
        controller : 'main as ctrl'
    })
	.when("/signIn", {
        templateUrl : "partials/signIn.htm",
        controller : 'main as ctrl'
    })
    .when("/register", {
        templateUrl : "partials/register.htm",
        controller : 'register as ctrl'
    })
});

app.controller('main', function($scope, $http) {
    var vm = this;
});

app.controller('register', function($scope, $http) {
    var vm = this,
        rand1 = Math.floor(Math.random() * 20) + 1, 
        rand2 = Math.floor(Math.random() * 3), 
        rand3 = Math.floor(Math.random() * 20) + 1,
        sign, answer;
    $("#newPassword, #confirmPassword").keyup(checkPasswordMatch);

    //CAPCHA
    if (rand2 == 0) {
        sign = "+";
        answer = rand1 + rand3;
    }
    else if (rand2 == 1){
        sign = "-";
        answer = rand1 - rand3;
    }
    else {
        sign = "*";
        answer = rand1 * rand3;
    }
    $("#number1").html(rand1);
    $("#sign").html(sign);
    $("#number2").html(rand3);
});

app.controller('profile', function($scope, $http) {
	var vm = this,
		img = ["default1.jpg", "default1.jpg", "default1.jpg", "default1.jpg"];

	//finds images and gives a path based on page
	vm.images = convertImagePath(img);
});

app.controller('viewSkills', function($scope, $http) {
	var vm = this,
		img = ["default1.jpg", "default2.jpg", "default3.jpg", "default4.jpg", "default1.jpg", "default2.jpg", "default3.jpg", "default4.jpg", "default1.jpg", "default2.jpg", "default3.jpg", "default4.jpg"];

	//finds images and gives a path based on page
	vm.images = convertImagePath(img);
	
	vm.openModal = function(image) {
		vm.title = image.name;
		vm.modalImg = image.path;
	};
});

app.controller('skills', function($scope, $http) {
    var vm = this,
        templates = [
            {
                name: "Simple Skills",
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            },
            {
                name: "News Briefing",
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            },
            {
                name: "Complex Skills",
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
            }
        ];

    vm.templateTypes = templates;
})

app.controller('team', function($scope, $http) {
    var vm = this,
        team = [
            {
                name: "Person A",
                path: "img/default3.jpg",
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            },
            {
                name: "Person B",
                path: "img/default3.jpg",
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            },
            {
                name: "Person C",
                path: "img/default3.jpg",
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
            }
        ];

	//finds images and gives a path based on page
    vm.team = team;

    vm.dropModal = function(image) {
       if (vm.teamName == image.name) {
           console.log("click");
           vm.teamName = null;
           vm.teamDesc = null;
       }
       else {
           vm.teamName = image.name;
           vm.teamDesc = image.desc;
       }
    };
});


//converts a ton of images to the correct path
function convertImagePath(img){
	var imgPath = []
	angular.forEach(img, function(item, idx){
		imgPath.push({"name":item, "path":getImagePath(item)});
	})
	return imgPath;
};

//get image path
function getImagePath(imageName){
	return "img/" + imageName;	
};

//check if passwords match on registration page
function checkPasswordMatch() {
    var password = $("#newPassword").val();
    var confirmPassword = $("#confirmPassword").val();

    if (password != confirmPassword)
        $("#noMatch").html("Passwords do not match");
    else
        $("#noMatch").html("");
}