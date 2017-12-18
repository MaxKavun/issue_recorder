document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e) {
  var issueDesc = document.getElementById('issueDescInput').value;
  var issueSeverity = document.getElementById('issueSeverityInput').value;
  var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
  var issueId = chance.guid();
  var issueStatus = 'Open';

  var issue = {
    id: issueId,
    description: issueDesc,
    severity: issueSeverity,
    assignedTo: issueAssignedTo,
    statusProperty: issueStatus
  }

  if(localStorage.getItem('issues') == null) {
    var issues = [];
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  } else {
    var issues = JSON.parse(localStorage.getItem('issues'));
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  }

  document.getElementById('issueInputForm').reset();

  fetchIssues();

  e.preventDefault();

}

function setStatusClosed(id) {
  var issues = JSON.parse(localStorage.getItem('issues'));
  for(var i = 0; i < issues.length; i++) {
    if(issues[i].id == id) {
      issues[i].statusProperty = 'Closed';
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues));

  fetchIssues();
}

function deleteIssue(id) {
  var issues = JSON.parse(localStorage.getItem('issues'));
  for(var i = 0; i < issues.length; i++) {
    if(issues[i].id == id) {
      issues.splice(i, 1);
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues));

  fetchIssues();
}

function fetchIssues() {
  var issues = JSON.parse(localStorage.getItem('issues'));
  var issuesList = document.getElementById('issuesList');

  issuesList.innerHTML = '';

  for(var i = 0; i < issues.length; i++) {
    var id = issues[i].id;
    var desc = issues[i].description;
    var severity = issues[i].severity;
    var assignedTo = issues[i].assignedTo;
    var status = issues[i].statusProperty;

    issuesList.innerHTML += '<div class="card bg-light mb-3"> '+
                            '<div class="card-body">'+
                            '<h6>Issue ID: '+ id + '</h6>'+
                            '<p><span class="badge badge-info">' + status + '</span></p>' +
                            '<h3>' + desc + '</h3>'+
                            '<p><i class="fa fa-clock-o" aria-hidden="true"></i>' + severity + '</p>' +
                            '<p><i class="fa fa-user-md" aria-hidden="true"></i>' + assignedTo + '</p>' +
                            '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a>'+
                            '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger" style="margin-left:5px">Delete</a>'+
                            '</div></div>';
  }
}
