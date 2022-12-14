function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _await(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  if (!value || !value.then) {
    value = Promise.resolve(value);
  }

  return then ? value.then(then) : value;
}

var axios = require('axios');

function _async(f) {
  return function () {
    for (var args = [], i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }

    try {
      return Promise.resolve(f.apply(this, args));
    } catch (e) {
      return Promise.reject(e);
    }
  };
}

exports.beforePlugins = _async(function () {
  var _this = this;

  var _this$config$themeCon = _this.config.themeConfig,
      github = _this$config$themeCon.github,
      projects = _this$config$themeCon.projects;
  var usePinnedRepos = projects === 'pinned-repos';

  _this.log.info("Fetching GitHub data for ".concat(github, ".."));

  return _await(Promise.all([axios({
    method: 'GET',
    url: "https://api.github.com/users/".concat(github)
  }), axios({
    method: 'GET',
    url: usePinnedRepos ? "https://gh-pinned-repos.now.sh/?username=".concat(github) : "https://api.github.com/search/repositories?q=user:".concat(github, "&sort:stars&per_page=6")
  }).catch(function (error) {
    if (usePinnedRepos) {
      throw error;
    } // No repos


    if (error.response && error.response.status === 422 && error.response.data && error.response.data.message === 'Validation Failed') {
      return {
        data: {
          items: []
        }
      };
    }

    throw error;
  })]), function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        userResult = _ref2[0],
        projectsResult = _ref2[1];

    var updateConfig = function updateConfig() {
      _this.config.siteConfig = Object.assign({
        title: userResult.data.name || userResult.data.login,
        description: userResult.data.bio,
        email: userResult.data.email,
        author: userResult.data.name || userResult.data.login
      }, _this.config.siteConfig);
      _this.config.themeConfig = Object.assign({
        coverLayout: 'minimal',
        hireable: userResult.data.hireable,
        profilePicture: userResult.data.avatar_url
      }, _this.config.themeConfig, {
        projects: usePinnedRepos ? projectsResult.data.map(function (item) {
          return {
            name: item.repo,
            url: "https://github.com/".concat(item.owner, "/").concat(item.repo),
            description: item.description,
            language: item.language,
            stars: item.stars
          };
        }) : projectsResult.data.items.map(function (item) {
          return {
            name: item.name,
            url: item.html_url,
            description: item.description,
            language: item.language,
            stars: item.stargazers_count
          };
        })
      });
    };

    updateConfig();

    _this.hooks.onUpdateConfigFile.tap('theme-node-api', function () {
      updateConfig();
    });

    _this.applyPlugin(require('saber-plugin-prismjs'));
  });
});

exports.chainWebpack = function (config) {
  var _this2 = this;

  config.plugin('constants').tap(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 1),
        constants = _ref4[0];

    return [Object.assign(constants, {
      __PORTFOLIO_STYLE__: JSON.stringify(_this2.config.themeConfig.style)
    })];
  });
};