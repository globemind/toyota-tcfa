//LOGIN APP --
angular.module('loginapp',['ngRoute', 'ngCookies']);

// MAIN APP
angular.module('mainapp',[
  'ui.router', 
  'ngCookies',
  'ui.router.state.events',
  'oc.lazyLoad',
  'pascalprecht.translate'
]);

angular.module('mainapp').config(['$stateProvider', '$urlRouterProvider', '$translateProvider', function ($stateProvider, $urlRouterProvider, $translateProvider) {
  $urlRouterProvider.otherwise('app/home/favoritos');

  $translateProvider.translations('en',en_translations);
  
  $translateProvider.translations('sp',sp_translations);
  
  $translateProvider.preferredLanguage('en');  

  $stateProvider
    .state('app', {
      url: '/app',
      templateUrl: 'app.html',
      controller: 'mainCtrl',
      abstract: true
    })
    .state('app.home', {
      url: '/home/:param',
      controller: 'homeCtrl',
      templateUrl: 'views/home/index.html',
      data: {
        pageTitle: 'Inicio'
      },
      resolve: {
        service: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load({
            serie: true,
            files: [
              'scripts/services/homeService.js',
              'scripts/controllers/homeCtrl.js',
            ]
          });
        }]
      }
    })
    .state('app.configuration', {
      url: '/configuration',
      template: '<ui-view></ui-view>',
      abstract: true
    })
    
    .state('app.configuration.groups', {
      url: '/groups/:param',
      controller: 'groupsCtrl',
      data: {
        pageTitle: 'Grupo de programas'
      },
      templateUrl: 'views/groups/index.html',
      resolve: {
        service: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load({
            serie: true,
            files: [
              'scripts/services/groupService.js',
              'scripts/controllers/groupsCtrl.js',
            ]
          });
        }]
      }
    })
    
    .state('app.configuration.profiles', {
      url: '/profiles/:param',
      controller: 'profilesCtrl',
      data: {
        pageTitle: 'Perfiles'
      },
      templateUrl: 'views/profiles/index.html',
      resolve: {
        service: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load({
            serie: true,
            files: [
              'scripts/services/profileService.js',
              'scripts/controllers/profilesCtrl.js',
            ]
          });
        }]
      }
    })
    
    .state('app.configuration.modules', {
      url: '/modules/:param',
      controller: 'modulesCtrl',
      data: {
        pageTitle: 'Modulos'
      },
      templateUrl: 'views/modules/index.html',
      resolve: {
        service: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load({
            serie: true,
            files: [
              'scripts/services/moduloService.js',
              'scripts/controllers/modulesCtrl.js',
            ]
          });
        }]
      }
    })
    
    .state('app.configuration.programs', {
      url: '/programs/:param',
      controller: 'programsCtrl',
      data: {
        pageTitle: 'Programas'
      },
      templateUrl: 'views/programs/index.html',
      resolve: {
        service: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load({
            serie: true,
            files: [
              'scripts/services/programService.js',
              'scripts/controllers/programsCtrl.js',
            ]
          });
        }]
      }
    })
    
    .state('app.configuration.users', {
      url: '/users/:param',
      controller: 'usersCtrl',
      data: {
        pageTitle: 'Usuarios'
      },
      templateUrl: 'views/users/index.html',
      resolve: {
        service: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load({
            serie: true,
            files: [
              'scripts/services/profileService.js',
              'scripts/services/userService.js',
              'scripts/controllers/usersCtrl.js',
            ]
          });
        }]
      }
    })
    
    .state('app.configuration.grupoperfil', {
      url: '/grupoperfil/:param/:prespective',
      controller: 'grupoperfilCtrl',
      data: {
        pageTitle: 'Grupos por Perfiles'
      },
      templateUrl: 'views/grupoxperfil/index.html',
      resolve: {
        service: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load({
            serie: true,
            files: [
              'scripts/services/profileService.js',
              'scripts/services/groupService.js',
              'scripts/services/grupoperfilService.js',
              'scripts/controllers/grupoperfilCtrl.js',
            ]
          });
        }]
      }
    })

    .state('app.configuration.programsactions', {
      url: '/programsactions/:param/:prespective',
      controller: 'programsactionsCtrl',
      data: {
        pageTitle: 'Programas Acciones'
      },
      templateUrl: 'views/programsactions/index.html',
      resolve: {
        service: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load({
            serie: true,
            files: [
              'scripts/services/programService.js',
              'scripts/services/actionService.js',
              'scripts/services/programactionService.js',
              'scripts/controllers/programsactionsCtrl.js',
            ]
          });
        }]
      }
    })

    .state('app.configuration.programsmodules', {
      url: '/programsmodules/:param/:prespective',
      controller: 'programsmodulesCtrl',
      data: {
        pageTitle: 'Programas por Módulos'
      },
      templateUrl: 'views/programsmodules/index.html',
      resolve: {
        service: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load({
            serie: true,
            files: [
              'scripts/services/programService.js',
              'scripts/services/moduloService.js',
              'scripts/services/programmoduleService.js',
              'scripts/controllers/programsmodulesCtrl.js',
            ]
          });
        }]
      }
    })

}]);

angular.module('mainapp').factory('setting', ['$rootScope', function($rootScope) {
  var setting = {
    layout: {
      /*pageSidebarMinified: false,
      pageFixedFooter: false,
      pageRightSidebar: false,
      pageTwoSidebar: false,
      pageTopMenu: false,
      pageBoxedLayout: false,
      pageWithoutSidebar: false,
      pageContentFullHeight: false,
      pageContentFullWidth: false,
      pageContentInverseMode: false,
      pageSidebarTransparent: false,
      pageWithFooter: false,
      pageLightSidebar: false,
      pageMegaMenu: false,
      pageBgWhite: false,
      pageWithoutHeader: false,
      paceTop: false*/
    }
  };

  return setting;
}]);

angular.module('mainapp').run(['$rootScope', '$state', 'setting', function ($rootScope, $state, setting) {
  $rootScope.$state = $state;
  $rootScope.setting = setting;
}]);


