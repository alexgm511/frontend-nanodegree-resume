$(function(){
    var model = {
		bio: {
			"name": "Alex G Mendoza",
			"role": "WEB DEVELOPER",
			"welcomeMessage": "Web Developer with a Design background and 15+ years of programming experience!",
			"contacts": {
				"mobile": "410-861-7064",
				"email": "alex@alexgmendoza.com",
				"github": "alexgm511",
				"twitter": "alexgm5of11",
				"blog": "",
				"location": "Oakland, CA"
				},
			"pictureURL": "images/agm-2.jpg",
			"skills": [
				"Web Development",
				"Design",
				"Infographics",
				"Illustration"
				]
		},
		education: {
			"schools": [
			{
				"name": "Pratt Institute",
				"degree": "Master of Science",
				"graduation": "1988",
				"location": "New York, NY",
				"major": ["Communications Design"]
			}, 
			{
				"name": "University of Florida",
				"degree": "Bachelor of Arts",
				"graduation": "1978",
				"location": "Gainesville, FL",
				"major": ["Graphic Design"]
			}
			],

			"onLineCourses": [
			{
				"title": "Startup Engineering",
				"school": "Stanford/Coursera",
				"dates": 2012,
				"url": "https://www.coursera.org/course/startup"
			}, 
			{
				"title": "Precalculus: Algebra & Trigonometry",
				"school": "University of Florida",
				"dates": 2010,
				"url": "https://www.coursera.org/course/startup"
			}
			]
		},
		work: {
			"jobs": [
				{
				"employer": "Venture Media",
				"title": "IT Director",
				"location": "Baltimore, MD",
				"dates": "1995 - 2015",
				"description": "Designed and programmed SQL Server, VB and Access order processing and customer service system that has processed over $68 million in orders.<br /> 			Designed and maintained company websites including www.landriderbikes.com<br /> Developed Google Analytics reports to assign proper percentage of web traffic due to direct response TV ads.<br /> Set up and maintain Inter-tel and Digium Cloud telecom systems."
				}, 
				{
				"employer": "Mendoza Design",
				"title": "Design Director",
				"location": "Baltimore, MD",
				"dates": "1988 - 1995",
				"description": "Identity, branding, exhibit and web design for domestic and international corporate and non-profit clients. Work included logos, icons, posters, infographics, diagrams, manuals, books, newsletters, invitations, trade magazines and interactive exhibits."
				}, 
				{
				"employer": "U.S.News & World Report",
				"title": "Associate Art Director",
				"location": "Washington, DC",
				"dates": "1982 - 1986",
				"description": "Responsible for day to day management of 19-member art department<br /> As Staff Designer received Honorable Mention in American Congress on Surveying and Mapping Map Design Competition"
				}
			]
		},
		projects: {
			"projects": [
				{
				"title": "LandRider Mobile",
				"dates": "01/2015",
				"description": "Created mobile enabled site for AutoShift bicycle site using jQuery Mobile. Users can view bike models and accessories and add them to the shopping cart.",
				"images": [
					"images/landrider-1.jpg",
					"images/landrider-2.jpg"
				]
				}, 
				{
				"title": "imagenIR",
				"dates": "01/2015",
				"description": "Created responsive website to display and analyze infra-red images to evaluate electrical installations using jQuery and Bootstrap. Users can view the temperature in every part of the images by running the cursor over the image.",
				"images": [
					"images/imagenIR-1.jpg",
					"images/imagenIR-2.jpg"
					]
				},
				{
				"title": "eM5 Film Company",
				"dates": "01/2015",
				"description": "As Producer-Director lead production, writing, shooting and editing of four educational and documentary films including Documentary about a Chilean fusion musical group that was featured in the In-Edit Santiago Music Documentary Film Festival, November 2012.",
				"images": [
					"images/congreso.jpg",
					"images/tenis.jpg"
					]
				}
			]
		},
		
		init: function() {
			this.map;
		}
		
    };


    var octopus = {
		getBio: function() {
			return model.bio;
		},
		getEducation: function() {
			return model.education.schools;
		},
		getWork: function() {
			return model.work.jobs;
		},
		getProjects: function() {
			return model.projects.projects;
		},
		getMapElement: function() {
			return view.mapElement();
		},
		/*
		Start here! initializeMap() is called when page is loaded.
		*/
		initializeMap: function() {

			var locations;

			var mapOptions = {
				disableDefaultUI: true
			};

			// This next line makes `map` a new Google Map JavaScript Object and attaches it to
			// <div id="map">, which is appended as part of an exercise late in the course.
			model.map = new google.maps.Map(octopus.getMapElement(), mapOptions);

			/* locationFinder() returns an array of every location string from the JSONs
			written for bio, education, and work. */
			function locationFinder() {
				// initializes an empty array
				var locations = [];

				// adds the single location property from bio to the locations array
				locations.push(model.bio.contacts.location);

				// iterates through school locations and appends each location to
				// the locations array
				for (var school in model.education.schools) {
					locations.push(model.education.schools[school].location);
				}

				// iterates through work locations and appends each location to
				// the locations array
				for (var job in model.work.jobs) {
					locations.push(model.work.jobs[job].location);
				}

				return locations;
			}

			/*
			createMapMarker(placeData) reads Google Places search results to create map pins.
			placeData is the object returned from search results containing information
			about a single location.
			*/
			function createMapMarker(placeData) {

				// The next lines save location data from the search result object to local variables
				var lat = placeData.geometry.location.lat();  // latitude from the place service
				var lon = placeData.geometry.location.lng();  // longitude from the place service
				var name = placeData.formatted_address;   // name of the place from the place service
				var bounds = window.mapBounds;            // current boundaries of the map window

				// marker is an object with additional data about the pin for a single location
				var marker = new google.maps.Marker({
					map: model.map,
					position: placeData.geometry.location,
					title: name
				});

				// infoWindows are the little helper windows that open when you click
				// or hover over a pin on a map. They usually contain more information
				// about a location.
				var infoWindow = new google.maps.InfoWindow({
					//content: name
					content: "Hey "+model.bio.name+" was here once!"
				});

				// hmmmm, I wonder what this is about...
				google.maps.event.addListener(marker, 'click', function() {
					// your code goes here!
					infoWindow.open(model.map,marker);
				});

				// this is where the pin actually gets added to the map.
				// bounds.extend() takes in a map location object
				bounds.extend(new google.maps.LatLng(lat, lon));
				// fit the map to the new marker
				model.map.fitBounds(bounds);
				// center the map
				model.map.setCenter(bounds.getCenter());
			}

			/*
			callback(results, status) makes sure the search returned results for a location.
			If so, it creates a new map marker for that location.
			*/
			function callback(results, status) {
				if (status == google.maps.places.PlacesServiceStatus.OK) {
					createMapMarker(results[0]);
				}
			}

			/*
			pinPoster(locations) takes in the array of locations created by locationFinder()
			and fires off Google place searches for each location
			*/
			function pinPoster(locations) {
				// creates a Google place search service object. PlacesService does the work of
				// actually searching for location data.
				var service = new google.maps.places.PlacesService(model.map);
				// Iterates through the array of locations, creates a search object for each location
				for (var place in locations) {
					// the search request object
					var request = {
						query: locations[place]
					};
					// Actually searches the Google Maps API for location data and runs the callback
					// function with the search results after each search.
					service.textSearch(request, callback);
				}
			}

			// Sets the boundaries of the map based on pin locations
			window.mapBounds = new google.maps.LatLngBounds();

			// locations is an array of location strings returned from locationFinder()
			locations = locationFinder();

			// pinPoster(locations) creates pins on the map for each location in
			// the locations array
			pinPoster(locations);							
		},
					

        init: function() {
            model.init();
            view.init();
			view.displayAll();
        }
    };


    var view = {
        init: function() {
			var HTMLheaderName = '<h1 id="name">%data%</h1>';
			var HTMLheaderRole = '<span class="role">%data%</span><hr/>';

			var HTMLcontactGeneric = '<li class="flex-item"><span class="mustard-text">%contact%</span><span class="white-text">%data%</span></li>';
			var HTMLmobile = '<li class="flex-item"><span class="mustard-text">mobile</span><span class="white-text">%data%</span></li>';
			var HTMLemail = '<li class="flex-item"><span class="mustard-text">email</span><span class="white-text">%data%</span></li>';
			var HTMLtwitter = '<li class="flex-item"><span class="mustard-text">twitter</span><span class="white-text">%data%</span></li>';
			var HTMLgithub = '<li class="flex-item"><span class="mustard-text">github</span><span class="white-text">%data%</span></li>';
			var HTMLblog = '<li class="flex-item"><span class="mustard-text">blog</span><span class="white-text">%data%</span></li>';
			var HTMLlocation = '<li class="flex-item"><span class="mustard-text">location</span><span class="white-text">%data%</span></li>';

			var HTMLbioPic = '<img src="%data%" class="biopic">';
			var HTMLWelcomeMsg = '<span class="welcome-message">%data%</span>';

			var HTMLskillsStart = '<h3 id="skillsH3">Skills at a Glance:</h3><ul id="skills" class="flex-box"></ul>';
			var HTMLskills = '<li class="flex-item"><span class="white-text">%data%</span></li>';

			var HTMLworkStart = '<div class="work-entry"></div>';
			var HTMLworkEmployer = '<a href="#">%data%';
			var HTMLworkTitle = ' - %data%</a>';
			var HTMLworkDates = '<div class="date-text">%data%</div>';
			var HTMLworkLocation = '<div class="location-text">%data%</div>';
			var HTMLworkDescription = '<p><br>%data%</p>';

			var HTMLprojectStart = '<div class="project-entry"></div>';
			var HTMLprojectTitle = '<a href="#">%data%</a>';
			var HTMLprojectDates = '<div class="date-text">%data%</div>';
			var HTMLprojectDescription = '<p><br>%data%</p>';
			var HTMLprojectImage = '<img src="%data%">';

			var HTMLschoolStart = '<div class="education-entry"></div>';
			var HTMLschoolName = '<a href="#">%data%';
			var HTMLschoolDegree = ' -- %data%</a>';
			var HTMLschoolDates = '<div class="date-text">%data%</div>';
			var HTMLschoolLocation = '<div class="location-text">%data%</div>';
			var HTMLschoolMajor = '<em><br>Major: %data%</em>';

			var HTMLonlineClasses = '<h3>Online Classes</h3>';
			var HTMLonlineTitle = '<a href="#">%data%';
			var HTMLonlineSchool = ' - %data%</a>';
			var HTMLonlineDates = '<div class="date-text">%data%</div>';
			var HTMLonlineURL = '<br><a href="#">%data%</a>';

			var googleMap = '<div id="map"></div>';			
			
			// Get bio information, format and append to the page
			var $bio = octopus.getBio();
			var formattedName = HTMLheaderName.replace("%data%", $bio.name);
			var formattedRole = HTMLheaderRole.replace("%data%", $bio.role)
			$("#header").prepend(formattedRole)
				.prepend(formattedName);

			if ($bio.pictureURL.length > 0) {
				var formattedPic = HTMLbioPic.replace("%data%", $bio.pictureURL);
				$('#header').append(formattedPic);
			}
			if ($bio.welcomeMessage.length > 0) {
				var formattedWelcomeMsg = HTMLWelcomeMsg.replace("%data%", $bio.welcomeMessage);
				$('#header').append(formattedWelcomeMsg);
			}
						
			// Check contacts, if not empty, format them and add them to the resume.
			if ($bio.contacts.mobile.length > 0) {
				var formattedMobile = HTMLmobile.replace("%data%", $bio.contacts.mobile);
				$('.flex-box').append(formattedMobile);
			}
			if ($bio.contacts.email.length > 0) {
				var formattedEmail = HTMLemail.replace("%data%", $bio.contacts.email);
				$('.flex-box').append(formattedEmail);
			}
			if ($bio.contacts.twitter.length > 0) {
				var formattedTwitter = HTMLtwitter.replace("%data%", $bio.contacts.twitter);
				$('.flex-box').append(formattedTwitter);
			}
			if ($bio.contacts.github.length > 0) {
				var formattedGithub = HTMLgithub.replace("%data%", $bio.contacts.github);
				$('.flex-box').append(formattedGithub);
			}
			if ($bio.contacts.blog.length > 0) {
				var formattedBlog = HTMLworkDates.replace("%data%", $bio.contacts.blog);
				$('.flex-box').append(formattedBlog);
			}
			if ($bio.contacts.location.length > 0) {
				var formattedLocation = HTMLlocation.replace("%data%", $bio.contacts.location);
				$('.flex-box').append(formattedLocation);
			}
			// Check if there are skills listed, format them and add them to the resume.
			if ($bio.skills.length > 0) {
				$('#header').append(HTMLskillsStart);
				for (i = 0; i < $bio.skills.length; i++) {
					var formattedSkill = HTMLskills.replace("%data%", $bio.skills[i])
					$('#skills').append(formattedSkill);
				}
			}

			var $schools = octopus.getEducation(); //
			for (school in $schools) {
				$('#education').append(HTMLschoolStart);
				var formattedSchool = HTMLschoolName.replace("%data%", $schools[school].name);
				var formattedDegree = HTMLschoolDegree.replace("%data%", $schools[school].degree);
				var formattedSchoolDegree = formattedSchool + formattedDegree;
				$('.education-entry:last').append(formattedSchoolDegree);
				var formattedDates = HTMLschoolDates.replace("%data%", $schools[school].graduation);
				$('.education-entry:last').append(formattedDates);
				var formattedLocation = HTMLschoolLocation.replace("%data%", $schools[school].location);
				$('.education-entry:last').append(formattedLocation);
				var formattedMajor = HTMLschoolMajor.replace("%data%", $schools[school].major);
				$('.education-entry:last').append(formattedMajor);
				// Clear floats and add after last work-entry to fix parent div's height 
				var clearFloats = '<div style="clear: both;"></div>'
				$('.education-entry:last').append(clearFloats);
			}
				
			var $jobs = octopus.getWork(); //
			for (job in $jobs) {
				$('#workExperience').append(HTMLworkStart);
				var formattedEmployer = HTMLworkEmployer.replace("%data%", $jobs[job].employer);
				var formattedTitle = HTMLworkTitle.replace("%data%", $jobs[job].title);
				var formattedEmployerTitle = formattedEmployer + formattedTitle;
				$('.work-entry:last').append(formattedEmployerTitle);
				var formattedLocation = HTMLworkLocation.replace("%data%", $jobs[job].location);
				$('.work-entry:last').append(formattedLocation);
				var formattedDates = HTMLworkDates.replace("%data%", $jobs[job].dates);
				$('.work-entry:last').append(formattedDates);
				var formattedDescription = HTMLworkLocation.replace("%data%", $jobs[job].description);
				$('.work-entry:last').append(formattedDescription);
				// Clear floats and add after last work-entry to fix parent div's height 
				var clearFloats = '<div style="clear: both;"></div>'
				$('.work-entry:last').append(clearFloats);
			}
			
			var $projects = octopus.getProjects();  //
			for (project in $projects) {
				$('#projects').append(HTMLprojectStart);
				var formattedTitle = HTMLprojectTitle.replace("%data%", $projects[project].title);
				$('.project-entry:last').append(formattedTitle);
				var formattedDates = HTMLprojectDates.replace("%data%", $projects[project].dates);
				$('.project-entry:last').append(formattedDates);
				var formattedDescription = HTMLprojectDescription.replace("%data%", $projects[project].description);
				$('.project-entry:last').append(formattedDescription);
				if ($projects[project].images.length > 0) {
					for (image in $projects[project].images) {
						var formattedImage = HTMLprojectImage.replace("%data%", $projects[project].images[image]);
						$('.project-entry:last').append(formattedImage);
					}
				}
			}
			
			// add a map to the resume
			$('#mapDiv').append(googleMap);

			// Calls the initializeMap() function when the page loads
			window.addEventListener('load', octopus.initializeMap);

			// Vanilla JS way to listen for resizing of the window
			// and adjust map bounds
			window.addEventListener('resize', function(e) {
				// Make sure the map bounds get updated on page resize
				model.map.fitBounds(mapBounds);
			});
        },
		mapElement: function() {
			return document.querySelector('#map');
		},
		displayAll: function() {
			if(document.getElementsByClassName('flex-item').length === 0) {
				document.getElementById('topContacts').style.display = 'none';
			}
			if(document.getElementsByTagName('h1').length === 0) {
				document.getElementById('header').style.display = 'none';
			}
			if(document.getElementsByClassName('work-entry').length === 0) {
				document.getElementById('workExperience').style.display = 'none';
			}
			if(document.getElementsByClassName('project-entry').length === 0) {
				document.getElementById('projects').style.display = 'none';
			}
			if(document.getElementsByClassName('education-entry').length === 0) {
				document.getElementById('education').style.display = 'none';
			}
			if(document.getElementsByClassName('flex-item').length === 0) {
				document.getElementById('letsConnect').style.display = 'none';
			}
			if(document.getElementById('map') === null) {
				document.getElementById('mapDiv').style.display = 'none';
			}
		}
		
    };

    octopus.init();
});
