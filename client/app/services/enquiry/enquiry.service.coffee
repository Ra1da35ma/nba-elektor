'use strict'

angular.module 'elektorApp'
.service 'Enquiry', ($resource) ->
# AngularJS will instantiate a singleton by calling 'new' on this function
  $resource "/api/enquiry/:id", null,
    newMail:
      method: 'POST'
      isArray: false
      url: '/api/enquiry/new'
