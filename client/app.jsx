class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      length: 0,
      size: 10,
      start: 0,
      sort: 'First Name',
    }
    this.handleNav = this.handleNav.bind(this);
    this.table = this.table.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.sortData = this.sortData.bind(this);
    this.tableHeader = this.tableHeader.bind(this);
    this.openDropDown = this.openDropDown.bind(this);
    this.changeSize = this.changeSize.bind(this);
    this.changeRange = this.changeRange.bind(this);
  }

  componentDidMount() {
    var context = this;
    $.ajax({
      type: 'GET',
      url: '/data',
      success: function(data) {
        var length = data.length;
        context.setState({ data });
        context.setState({ length });
      }
    });
    console.log('this is the data we receive from the server', this.state.data);
  }

  sortData() {
    var context = this;
    var data = context.state.data.sort(function(a, b) {
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
    })
    return data;
  }

  handleNav(e) {
    var navs = document.getElementsByClassName('navbar')[0].childNodes;
    for (var i = 0; i < navs.length; i++) {
      var nav = navs[i];
      if (nav.classList.contains('selected')) {
        nav.classList.toggle('selected');
      }
    }
    e.target.classList.toggle('selected');
  }

  handleSort(e) {
    this.setState({
      sort: e.target.id
    })
    this.sortData();
  }

  openDropDown() {
    this.dropdown.classList.toggle('show');
  }

  changeSize(e) {
    this.setState({
      size: Number(e.target.id)
    })
    this.dropdown.classList.toggle('show');
  }

  changeRange(sign) {
    var start = this.state.start;
    var size = this.state.size;
    var min = 0;
    var max = Math.ceil((size) / 10 * 10);
    if (sign === 'positive') {
      start = Math.min(start + size, max);
      this.setState({ start });
    } else {
      start = Math.max(start - size, min);
      this.setState({ start });
    }
  }

  navBar() {
    return (
      <div className="navbar">
        <a onClick={this.handleNav} className="nav-1 selected">Nav Item 1</a>
        <a onClick={this.handleNav} className="nav-2">Nav Item 2</a>
        <a onClick={this.handleNav} className="nav-3">Nav Item 3</a>
      </div>
    )
  }

  table() {
    var start = this.state.start;
    var size = this.state.size;
    var data = this.sortData().slice(start, start + size);
    return(
      <div id="table">
        <div id="table-header">
          <div onClick={this.handleSort} id="First Name">First Name</div>
          <div onClick={this.handleSort} id="Last Name">Last Name</div>
          <div onClick={this.handleSort} id="Country">Country</div>
          <div onClick={this.handleSort} id="Address">Address</div>
          <div onClick={this.handleSort} id="City">City</div>
          <div onClick={this.handleSort} id="State">State</div>
          <div onClick={this.handleSort} id="Zip">Zip</div>
          <div onClick={this.handleSort} id="Phone">Phone</div>
        </div>
        {data.map((el) => {
          return <Row object={el}/>
        })}
      </div>
    )
  }

  tableHeader() {
    var start = this.state.start;
    var size = this.state.size;
    var length = this.state.length;
    return (
      <div className="table-header">
        <h1>List of Awesome</h1>
        <div className="pipe-divider">|</div>
        <div className="sort">Sort by:</div>
        <div className="sort-filter">{this.state.sort}<i className="fa fa-caret-down one"/></div>
        <div className="float-right">
          <div className="items-per-page">Items per page:
            <div className="item-number">{size}</div>
            <div className="dropdown">
              <i onClick={this.openDropDown} className="fa fa-caret-down"></i>
              <div ref={(dropdown) => { this.dropdown = dropdown; }} className="dropdown-content">
                <div onClick={this.changeSize} id="5">5</div>
                <div onClick={this.changeSize} id="10">10</div>
                <div onClick={this.changeSize} id="50">50</div>
                <div onClick={this.changeSize} id="75">75</div>
                <div onClick={this.changeSize} id="100">100</div>
              </div>
            </div>
          </div>
          <div className="item-range">
            {start + 1}-{start + size} <span>of</span> {length}
          </div>
          <i onClick={() => this.changeRange()} className="fa fa-angle-left"/>
          <i onClick={() => this.changeRange('positive')} className="fa fa-angle-right"/>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.navBar()}
        {this.tableHeader()}
        {this.table()}
        <h1>Dear Puppet, the data of 10 rows is a replicate of what is shown on the GitHub sample. It is hardcoded on the server-side, and is fetched via an ajax request. Thanks! Yours, Daniel.</h1>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));