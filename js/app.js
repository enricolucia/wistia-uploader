(function() {
  'use strict';

  var url = 'https://upload.wistia.com/',
    jsonp = 'https://fast.wistia.com/embed/medias/';
  angular.module('demo', [
      'blueimp.fileupload'
    ])
    .directive('wistiaUploader', [
      '$http',
      function($http) {
        return {
          replace: true,
          templateUrl: '/views/directives/wistiaUploader.html',
          scope: {
            api: '='
          },
          link: function(scope) {
            scope.options = {
              url: url,
              multipart: true,
              singleFileUploads: true,
              formData: [{
                name: "api_password",
                value: scope.api
              }]
            };

            scope.$on('fileuploaddone', function(e, data) {
              $http.jsonp(jsonp + data.result["hashed_id"] + ".jsonp?callback=JSON_CALLBACK")
                .then(function(response) {
                  scope.result = response.data.media;
                  scope.result.hashed_id = 'wistia_async_' + data.result["hashed_id"];
                }, function(response) {
                  console.error(response.status);
                });
            });
          }
        }
      }
    ]);

}());
