'use strict'

angular.module 'elektorApp'
.controller 'AssistantCtrl', ($scope, $auth, $window, toastr, Auth, $rootScope) ->
  Auth.me (user) ->
    if user.role isnt "member"
      $state.go "login"

.controller 'AccreditationCtrl', ($scope, $auth, $window, toastr, Auth) ->
  