import {login, logout} from '../../actions/auth';

test('test login action', ()=> {
    const action = login('123abc');
    expect(action).toEqual({
        type:'LOGIN',
        uid: '123abc'
    });
});

test('testing logout action', ()=> {
    const result = logout();
    expect(result).toEqual({
        type:'LOGOUT'
    });
});