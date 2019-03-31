/******************************************************************/
// Contact Info section
/******************************************************************/
function displayContactInfo(resume) {
    $('#contactSection').html(
        '<h1 class="text-center">' + resume.contactInfo.fullName + '</h1>' +
        '<hr>' +
        '<span>' + resume.contactInfo.address + '<br>' + 
        resume.contactInfo.phoneNum + '<br>' + 
        resume.contactInfo.email + '<br>' +
        resume.contactInfo.gitHub +'</span>' +
        '<p></p><p>' + resume.openingStatement + '</p>'
    );
}

/******************************************************************/
// Skills section
/******************************************************************/
function displaySkillsSection(resume) {
    $('#skillsSection').html(
        '<div class="row">' +
        '<div class="col-lg-6">' +
        '<ul id="bulletsColumn1"></ul>' +
        '</div>' +
        '<div class="col-lg-6">' +
        '<ul id="bulletsColumn2"></ul>' +
        '</div>' +
        '</div>'
    );

    // Bullets
    let skills = resume.sections.skills;
    for (i = 0; i < skills.bulletSkills.length; i++) {
        if (i < 5) {
            $('#bulletsColumn1').append('<li>' + skills.bulletSkills[i] + '</li>');
        } else {
            $('#bulletsColumn2').append('<li>' + skills.bulletSkills[i] + '</li>');
        }
    }

    $('#skillsSection').append('<p class="mb-0">' + skills.detailedSkills.title + '</p>' +
        '<div class="row"><div class="col-lg-10"><ul id="skillDescriptionList"></ul>');

    // Detailed description
    for (i = 0; i < skills.detailedSkills.description.length; i++) {
        $('#skillDescriptionList').append('<li>' + skills.detailedSkills.description[i] + '</li>');
    }
    $('#skillDescriptionList').append('</div></div>');
}

/******************************************************************/
// Education section
/******************************************************************/
// Degree info
function displayEducationSection(resume) {
    let education = resume.sections.education;

    $('#educationSection').html(

        '<p class="mb-0" id="university">' + education.degree.name + '<br></p>' + 
        '<ul class="mb-0" id="universityDetails"></ul>' +
        '<p>' + education.degree.date + '</p>' +
        '<p class="mb-0">Certificates</p>' +
        '<ul id="certs"></ul>'
    );

    // Displays university details
    for (let key in education.school) {
        if (key == 'name') {
            $('#university').append(education.school[key]);
        } else {
            $('#universityDetails').append('<li>' + education.school[key] + '</li>');
        }
    }

    // Certificates
    let certificates = resume.sections.education.certificates;
    for (i = 0; i < certificates.length; i++) {
        $('#certs').append(
            '<div class="row">' +
                '<div class="col-xs-12">' +
                    '<li>' +
                        '<div>' + 
                            certificates[i].name +
                        '</div>' +
                        '<div class="text-left">' + 
                            certificates[i].date +
                        '</div>' +
                    '</li>' + 
                '</div>' + 
            '</div>');
    }
}

/******************************************************************/
// Experience section
/******************************************************************/
function displayExperienceSection(resume) {
    let html = '';
    let experience = resume.sections.experience;
    for (i = 0; i < experience.workHistory.length; i++) {
        html +=

            '<div>' +
            experience.workHistory[i].title +
            '</div>' +
            '<div text-left">' +
            experience.workHistory[i].date +
            '</div>' +

            '<div class="row">' +
            '<div class="col-xs-10">' +
            '<ul>';

        // Displays dynamic amounts of descriptions
        if (experience.workHistory[i].description.length > 1) {
            experience.workHistory[i].description.forEach(function (description) {
                html += '<li>' + description + '</li>';
            });
        } else {
            html += '<li>' + experience.workHistory[i].description + '</li>';
        }
        html += '</ul></div></div>';
    }
    $('#experienceSection').html(html);
}

// Displays all sections
function displayFromJson(resumeJsonData) {
    displayContactInfo(resumeJsonData);
    displaySkillsSection(resumeJsonData);
    displayEducationSection(resumeJsonData);
    displayExperienceSection(resumeJsonData);
}

// Collapses sections
let show = true; // must not be a member variable 
$('.toggleDisplay').click(function () {
    let rightArrow = '&#9656;';
    let downArrow = '&#9662;';
    let chevronID = '#' + $(this).children().attr('id');
    let divID = chevronID.split('C')[0];

    $(divID).toggle(function () {});
    $(chevronID).html() === '▾' ? $(chevronID).html(rightArrow) : $(chevronID).html(downArrow);
});

// Calls the displayFromJson function when all content is loaded
$(document).ready(function () {
    $.getJSON('resume.json', function (resumeJsonData) {
        displayFromJson(resumeJsonData);
    });
});