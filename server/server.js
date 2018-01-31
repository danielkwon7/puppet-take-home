var session = require('express-session');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser());

var data = [];
var object = {};
var labels = ['First Name', 'Last Name', 'Country', 'Address', 'City', 'State', 'Zip', 'Phone'];
object['First Name'] = ['Zachary', 'Landon', 'Samuel L.', 'Michael', 'Aaron', 'Michael', 'Maite', 'Joel', 'Brian', 'Rahul'];
object['Last Name'] = ['Borgetti', 'Donovan', 'Jackson', 'Jordan', 'Meautiful', 'Myers', 'Perroni', 'Schaper', 'Stallone', 'Veloved'];
object['Country'] = ['USA', 'USA', 'USA', 'USA', 'Mexico', 'USA', 'Mexico', 'USA', 'USA', 'England'];
object['Address'] = ['2234 3rd Ave Ste 3', '18400 S Avalon Blvd', '2226 2nd Ave', '1901 West Madison Street', '3465 Calzada de Tlalpan', '590 Galer St', '2101 Av. Juarez', '1823 Terry Ave, Suite 319', '4567 Lake Washington Blvd NE, Suite 6709', '118 Piccadilly'];
object['City'] = ['Seattle', 'Carson', 'Seattle', 'Chicago', 'Coyoacan', 'Austin', 'Mexico City', 'Seattle', 'Kirkland', 'Mayfair'];
object['State'] = ['WA', 'CA', 'WA', 'IL', 'CDMX', 'TX', 'CDMX', 'WA', 'OR', 'London'];
object['Zip'] = ['98101', '90746', '98121', '60612', '04650', '79935', '06050', '98121', '98132', 'W1J7NW'];
object['Phone'] = ['206-778-5741', '310-630-2200', '206-441-5660', '312-455-4000', '+52-55-5487-3100', '915-857-1770', '+52 55 5365 1250', '206-258-4687', '425-333-4567', '+44 (0)20-7042-7118'];

for (var i = 0; i < 10; i++) {
  var datum = {};
  for (var j = 0; j < labels.length; j++) {
    var label = labels[j];
    datum[label] = object[label][i];
  }
  data.push(datum);
}

app.get('/data', function(req, res) {
  console.log('the request is sent');
  res.status(200).send(data)
})

app.listen(port, function() {
  console.log('server running on port:', port);
})