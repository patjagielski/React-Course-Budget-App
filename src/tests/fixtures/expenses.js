import moment from 'moment';

export default [{
    id: '1',
    description: 'Rent',
    note: 'test',
    amount: 195,
    createdAt: 0 
}, {
    id: '2',
    description: 'Groceries',
    note: '',
    amount: 2000,
    createdAt: moment(0).subtract(10, 'days').valueOf()
}, {
    id: '3',
    description: 'Water',
    note: 'test 2',
    amount: 4,
    createdAt: moment(0).add(10, 'days').valueOf()
}]