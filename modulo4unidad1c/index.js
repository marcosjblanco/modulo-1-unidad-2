const moment = require('moment');
moment.locale('es'); 
console.log('Naci ' + moment('12/08/1989','DD/MM/YYYY').fromNow())