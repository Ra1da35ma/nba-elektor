'use strict'

angular.module 'elektorApp'
.service 'Position', ($resource) ->
  # AngularJS will instantiate a singleton by calling 'new' on this function
  $resource "/api/positions/:id", null,
    update: method: "PUT"
    addCandidate:
      method: "POST"
    ballotPaper:
      method: "GET"
      isArray: true
      url: "/api/positions/ballotPaper"

.service 'Candidate', ($resource) ->
  $resource "/api/positions/:id/candidates/:candidate_id", null,
    destroyCandidate:
      method: "DELETE"
