'use strict'

angular.module 'elektorApp'
.service 'Poll',  ( $resource ) ->
  $resource "api/polls/:id", null,
    update: method: "PUT"
    my_polls:
      method: "GET"
      isArray: true
      url: "api/polls/user_polls"
    published_polls:
      method: "GET"
      isArray: true
      url: "api/polls/published_polls"