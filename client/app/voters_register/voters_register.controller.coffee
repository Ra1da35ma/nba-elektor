'use strict'

angular.module 'elektorApp'
.controller 'RegisterCtrl', ($scope,Voters_Register,$window, $localStorage) ->
  Voters_Register.branches (data)->
    $scope.branchData = data

#  $scope.sortType = "surname"
#  $scope.sortReverse = false
  $scope.searchMembers = ""
  $scope.perPage = $localStorage.memberPerPage or 15
  $scope.currentPage = 1
  $scope.members = []
  $scope.pageSizes = [10, 15, 25, 50, 100, 200, 500]


  $scope.load = (page) ->
    if $scope.searchMembers is '' or $scope.searchMembers.length >= 3
      Voters_Register.branchDetails
        page: page
        perPage: $scope.perPage
        branchCode: $scope.selectedItem
        search: $scope.searchMembers
        , (members, headers) ->
            $scope.members = members
            $scope.total = parseInt headers "total_found"
            $scope.pages = Math.ceil($scope.total / $scope.perPage)

  $scope.load $scope.currentPage

  $scope.pageChanged = ->
    $localStorage.memberPerPage = $scope.perPage
    $scope.load $scope.currentPage

  $scope.update = (id) ->
    $window.location.href = '/pre_setup/'+id+'/'
