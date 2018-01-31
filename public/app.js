'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      data: [],
      length: 0,
      size: 10,
      start: 0,
      sort: 'First Name'
    };
    _this.handleNav = _this.handleNav.bind(_this);
    _this.table = _this.table.bind(_this);
    _this.handleSort = _this.handleSort.bind(_this);
    _this.sortData = _this.sortData.bind(_this);
    _this.tableHeader = _this.tableHeader.bind(_this);
    _this.openDropDown = _this.openDropDown.bind(_this);
    _this.changeSize = _this.changeSize.bind(_this);
    _this.changeRange = _this.changeRange.bind(_this);
    return _this;
  }

  _createClass(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var context = this;
      $.ajax({
        type: 'GET',
        url: '/data',
        success: function success(data) {
          var length = data.length;
          context.setState({ data: data });
          context.setState({ length: length });
        }
      });
      console.log('this is the data we receive from the server', this.state.data);
    }
  }, {
    key: 'sortData',
    value: function sortData() {
      var context = this;
      var data = context.state.data.sort(function (a, b) {
        var label = context.state.sort;
        var valueA = a[label];
        var valueB = b[label];
        if (valueA > valueB) {
          return 1;
        }
        if (valueB > valueA) {
          return -1;
        }
        return 0;
      });
      return data;
    }
  }, {
    key: 'handleNav',
    value: function handleNav(e) {
      var navs = document.getElementsByClassName('navbar')[0].childNodes;
      for (var i = 0; i < navs.length; i++) {
        var nav = navs[i];
        if (nav.classList.contains('selected')) {
          nav.classList.toggle('selected');
        }
      }
      e.target.classList.toggle('selected');
    }
  }, {
    key: 'handleSort',
    value: function handleSort(e) {
      this.setState({
        sort: e.target.id
      });
      this.sortData();
    }
  }, {
    key: 'openDropDown',
    value: function openDropDown() {
      this.dropdown.classList.toggle('show');
    }
  }, {
    key: 'changeSize',
    value: function changeSize(e) {
      this.setState({
        size: Number(e.target.id)
      });
      this.dropdown.classList.toggle('show');
    }
  }, {
    key: 'changeRange',
    value: function changeRange(sign) {
      var start = this.state.start;
      var size = this.state.size;
      var min = 0;
      var max = Math.ceil(size / 10 * 10);
      if (sign === 'positive') {
        start = Math.min(start + size, max);
        this.setState({ start: start });
      } else {
        start = Math.max(start - size, min);
        this.setState({ start: start });
      }
    }
  }, {
    key: 'navBar',
    value: function navBar() {
      return React.createElement(
        'div',
        { className: 'navbar' },
        React.createElement(
          'a',
          { onClick: this.handleNav, className: 'nav-1 selected' },
          'Nav Item 1'
        ),
        React.createElement(
          'a',
          { onClick: this.handleNav, className: 'nav-2' },
          'Nav Item 2'
        ),
        React.createElement(
          'a',
          { onClick: this.handleNav, className: 'nav-3' },
          'Nav Item 3'
        )
      );
    }
  }, {
    key: 'table',
    value: function table() {
      var start = this.state.start;
      var size = this.state.size;
      var data = this.sortData().slice(start, start + size);
      return React.createElement(
        'div',
        { id: 'table' },
        React.createElement(
          'div',
          { id: 'table-header' },
          React.createElement(
            'div',
            { onClick: this.handleSort, id: 'First Name' },
            'First Name'
          ),
          React.createElement(
            'div',
            { onClick: this.handleSort, id: 'Last Name' },
            'Last Name'
          ),
          React.createElement(
            'div',
            { onClick: this.handleSort, id: 'Country' },
            'Country'
          ),
          React.createElement(
            'div',
            { onClick: this.handleSort, id: 'Address' },
            'Address'
          ),
          React.createElement(
            'div',
            { onClick: this.handleSort, id: 'City' },
            'City'
          ),
          React.createElement(
            'div',
            { onClick: this.handleSort, id: 'State' },
            'State'
          ),
          React.createElement(
            'div',
            { onClick: this.handleSort, id: 'Zip' },
            'Zip'
          ),
          React.createElement(
            'div',
            { onClick: this.handleSort, id: 'Phone' },
            'Phone'
          )
        ),
        data.map(function (el) {
          return React.createElement(Row, { object: el });
        })
      );
    }
  }, {
    key: 'tableHeader',
    value: function tableHeader() {
      var _this2 = this;

      var start = this.state.start;
      var size = this.state.size;
      var length = this.state.length;
      return React.createElement(
        'div',
        { className: 'table-header' },
        React.createElement(
          'h1',
          null,
          'List of Awesome'
        ),
        React.createElement(
          'div',
          { className: 'pipe-divider' },
          '|'
        ),
        React.createElement(
          'div',
          { className: 'sort' },
          'Sort by:'
        ),
        React.createElement(
          'div',
          { className: 'sort-filter' },
          this.state.sort,
          React.createElement('i', { className: 'fa fa-caret-down one' })
        ),
        React.createElement(
          'div',
          { className: 'float-right' },
          React.createElement(
            'div',
            { className: 'items-per-page' },
            'Items per page:',
            React.createElement(
              'div',
              { className: 'item-number' },
              size
            ),
            React.createElement(
              'div',
              { className: 'dropdown' },
              React.createElement('i', { onClick: this.openDropDown, className: 'fa fa-caret-down' }),
              React.createElement(
                'div',
                { ref: function ref(dropdown) {
                    _this2.dropdown = dropdown;
                  }, className: 'dropdown-content' },
                React.createElement(
                  'div',
                  { onClick: this.changeSize, id: '5' },
                  '5'
                ),
                React.createElement(
                  'div',
                  { onClick: this.changeSize, id: '10' },
                  '10'
                ),
                React.createElement(
                  'div',
                  { onClick: this.changeSize, id: '50' },
                  '50'
                ),
                React.createElement(
                  'div',
                  { onClick: this.changeSize, id: '75' },
                  '75'
                ),
                React.createElement(
                  'div',
                  { onClick: this.changeSize, id: '100' },
                  '100'
                )
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'item-range' },
            start + 1,
            '-',
            start + size,
            ' ',
            React.createElement(
              'span',
              null,
              'of'
            ),
            ' ',
            length
          ),
          React.createElement('i', { onClick: function onClick() {
              return _this2.changeRange();
            }, className: 'fa fa-angle-left' }),
          React.createElement('i', { onClick: function onClick() {
              return _this2.changeRange('positive');
            }, className: 'fa fa-angle-right' })
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        this.navBar(),
        this.tableHeader(),
        this.table(),
        React.createElement(
          'h1',
          null,
          'Dear Puppet, the data of 10 rows is a replicate of what is shown on the GitHub sample. It is hardcoded on the server-side, and is fetched via an ajax request. Thanks! Yours, Daniel.'
        )
      );
    }
  }]);

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));