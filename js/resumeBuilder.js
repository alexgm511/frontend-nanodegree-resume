// Declaration of variables with information to fill the resume.
var bio = {
    "name": "Alex G Mendoza",
    "role": "WEB DEVELOPER",
    "welcomeMessage": "Let me bring your website to life!",
    "contacts": {
        "mobile": "410-861-7064",
        "email": "alexgm511@gmail.com",
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
}

var education = {
    "schools": [{
        "name": "Pratt Institute",
        "degree": "Master of Science",
        "graduation": "1988",
        "location": "New York, NY",
        "major": ["Communications Design"]
    }, {
        "name": "University of Florida",
        "degree": "Bachelor of Arts",
        "graduation": "1978",
        "location": "Gainesville, FL",
        "major": ["Graphic Design"]
    }],

    "onLineCourses": [{
        "title": "Startup Engineering",
        "school": "Stanford/Coursera",
        "dates": 2012,
        "url": "https://www.coursera.org/course/startup"
    }, {
        "title": "Precalculus: Algebra & Trigonometry",
        "school": "University of Florida",
        "dates": 2010,
        "url": "https://www.coursera.org/course/startup"
    }]
}

var work = {
    "jobs": [{
        "employer": "Venture Media",
        "title": "IT Director",
        "location": "Baltimore, MD",
        "dates": "1995 - 2015",
        "description": "Part of startup team and co-investor in direct-response and media company for 15+ years, both as employee and continued to present as independent consultant. Designed and programmed new order processing and customer service system to accommodate the venture’s rapid growth as well as upgrades, maintenance and support. SQLServer database with Access and VB front end system has processed over $68 million in orders. Designed and maintained company websites including www.landriderbikes.com. Set up and maintain Inter-tel and Digium Cloud telecom systems."
    }, {
        "employer": "Mendoza Design",
        "title": "Design Director",
        "location": "Baltimore, MD",
        "dates": "1988 - 1995",
        "description": "Identity, branding, exhibit and web design for domestic and international corporate and nonprofit clients. Work included logos, icons, posters, infographics, diagrams, manuals, books, newsletters, invitations, trade magazines and exhibitions for 10+ years. Clients included AIGA Baltimore, Catholic Relief Services, National Association of Home Builders, Maryland Association of Nonprofit Organizations. (Santiago, Chile) Identified and lead a team of chat room monitors for TalkCity.com. Programming for interactive exhibit for Federal Reserve Bank for Active8 Design in Baltimore, MD."
    }, {
        "employer": "U.S.News & World Report",
        "title": "Associate Art Director",
        "location": "Washington, DC",
        "dates": "1982 - 1986",
        "description": "Responsible for day to day management of 19-member art department team in the design and production of weekly news magazine for 2 years. Staff Designer: Production of charts, maps and data visualization for graphic illustration of major world events for 2 years. Received Honorable Mention in American Congress on Surveying and Mapping Map Design Competition."
    }]
}

var projects = {
    "projects": [{
        "title": "LandRider Mobile",
        "dates": "01/2015",
        "description": "Created mobile enabled site for AutoShift bicycle site using jQuery Mobile. Users can view bike models and accessories and add them to the shopping cart.",
        "images": [
            "images/landrider-1.jpg",
            "images/landrider-2.jpg"
        ]
    }, {
        "title": "imagenIR",
        "dates": "01/2015",
        "description": "Created responsive website to display and analyze infra-red images to evaluate electrical installations using jQuery and Bootstrap. Users can view the temperature in every part of the images by running the cursor over the image.",
        "images": [
            "images/imagenIR-1.jpg",
            "images/imagenIR-2.jpg"
        ]
    }]
}

// add display function to bio object. 
// Format name and contact information and add it to the resume
bio.display = function() {
    var formattedName = HTMLheaderName.replace("%data%", bio.name);
    var formattedRole = HTMLheaderRole.replace("%data%", bio.role)
    $("#header").prepend(formattedRole);
    $("#header").prepend(formattedName);

    if (bio.pictureURL.length > 0) {
        var formattedPic = HTMLbioPic.replace("%data%", bio.pictureURL);
        $('#header').append(formattedPic);
    }
    if (bio.welcomeMessage.length > 0) {
        var formattedWelcomeMsg = HTMLWelcomeMsg.replace("%data%", bio.welcomeMessage);
        $('#header').append(formattedWelcomeMsg);
    }
    // Check contacts, if not empty, format them and add them to the resume.
    if (bio.contacts.mobile.length > 0) {
        var formattedMobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
        $('.flex-box').append(formattedMobile);
    }
    if (bio.contacts.email.length > 0) {
        var formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);
        $('.flex-box').append(formattedEmail);
    }
    if (bio.contacts.twitter.length > 0) {
        var formattedTwitter = HTMLtwitter.replace("%data%", bio.contacts.twitter);
        $('.flex-box').append(formattedTwitter);
    }
    if (bio.contacts.github.length > 0) {
        var formattedGithub = HTMLgithub.replace("%data%", bio.contacts.github);
        $('.flex-box').append(formattedGithub);
    }
    if (bio.contacts.blog.length > 0) {
        var formattedBlog = HTMLworkDates.replace("%data%", bio.contacts.blog);
        $('.flex-box').append(formattedBlog);
    }
    if (bio.contacts.location.length > 0) {
        var formattedLocation = HTMLlocation.replace("%data%", bio.contacts.location);
        $('.flex-box').append(formattedLocation);
    }
    // Check if there are skills listed, format them and add them to the resume.
    if (bio.skills.length > 0) {
        $('#header').append(HTMLskillsStart);
        for (i = 0; i < bio.skills.length; i++) {
            var formattedSkill = HTMLskills.replace("%data%", bio.skills[i])
            $('#skills').append(formattedSkill);
        }
    }
}

// add display function to education object. 
// Format education information and add it to the resume
education.display = function() {
    for (school in education.schools) {
        $('#education').append(HTMLschoolStart);
        var formattedSchool = HTMLschoolName.replace("%data%", education.schools[school].name);
        var formattedDegree = HTMLschoolDegree.replace("%data%", education.schools[school].degree);
        var formattedSchoolDegree = formattedSchool + formattedDegree;
        $('.education-entry:last').append(formattedSchoolDegree);
        var formattedDates = HTMLschoolDates.replace("%data%", education.schools[school].graduation);
        $('.education-entry:last').append(formattedDates);
        var formattedLocation = HTMLschoolLocation.replace("%data%", education.schools[school].location);
        $('.education-entry:last').append(formattedLocation);
        var formattedMajor = HTMLschoolMajor.replace("%data%", education.schools[school].major);
        $('.education-entry:last').append(formattedMajor);
        // Clear floats and add after last work-entry to fix parent div's height 
        var clearFloats = '<div style="clear: both;"></div>'
        $('.education-entry:last').append(clearFloats);
    }
}

// add display function to work object. 
// Format work information and add it to the resume
work.display = function() {
    for (job in work.jobs) {
        $('#workExperience').append(HTMLworkStart);
        var formattedEmployer = HTMLworkEmployer.replace("%data%", work.jobs[job].employer);
        var formattedTitle = HTMLworkTitle.replace("%data%", work.jobs[job].title);
        var formattedEmployerTitle = formattedEmployer + formattedTitle;
        $('.work-entry:last').append(formattedEmployerTitle);
        var formattedLocation = HTMLworkLocation.replace("%data%", work.jobs[job].location);
        $('.work-entry:last').append(formattedLocation);
        var formattedDates = HTMLworkDates.replace("%data%", work.jobs[job].dates);
        $('.work-entry:last').append(formattedDates);
        var formattedDescription = HTMLworkLocation.replace("%data%", work.jobs[job].description);
        $('.work-entry:last').append(formattedDescription);
        // Clear floats and add after last work-entry to fix parent div's height 
        var clearFloats = '<div style="clear: both;"></div>'
        $('.work-entry:last').append(clearFloats);
    }
}

// add display function to projects object. 
// Format projects information and add it to the resume
projects.display = function() {
    for (project in projects.projects) {
        $('#projects').append(HTMLprojectStart);
        var formattedTitle = HTMLprojectTitle.replace("%data%", projects.projects[project].title);
        $('.project-entry:last').append(formattedTitle);
        var formattedDates = HTMLprojectDates.replace("%data%", projects.projects[project].dates);
        $('.project-entry:last').append(formattedDates);
        var formattedDescription = HTMLprojectDescription.replace("%data%", projects.projects[project].description);
        $('.project-entry:last').append(formattedDescription);
        if (projects.projects[project].images.length > 0) {
            for (image in projects.projects[project].images) {
                var formattedImage = HTMLprojectImage.replace("%data%", projects.projects[project].images[image]);
                $('.project-entry:last').append(formattedImage);
            }
        }
    }
}

// display all sections
bio.display();
education.display();
work.display();
projects.display();

// add a map to the resume
$('#mapDiv').append(googleMap);