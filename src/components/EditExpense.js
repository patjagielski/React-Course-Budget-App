import React from 'react';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
import {startEditExpense, startRemoveExpense} from '../actions/expenses';


export class EditExpensePage extends React.Component{
    onSubmit = (expense) => {
        this.props.startEditExpense(this.props.expense.id, expense);
        this.props.history.push('/');
    };

    onRemove = () => {
        this.props.startRemoveExpense({ id: this.props.expense.id });
        this.props.history.push('/');
    };

    render(){
        return(
            <div>
            <div className="page-header">
                <div className="content-container">
                    <h1 className="page-header__title">Edit Expense</h1>
                </div>
            </div>
            <div className="content-container">
                <ExpenseForm
                    expense={ this.props.expense } 
                    onSubmit={ this.onSubmit }
                />
                <button className="button-layout__remove" onClick={this.onRemove}>Remove</button>
            </div>
        </div>
        );
    }
};


const mapSateToProps = (state, props) => ({
    expense: state.expenses.find((expense)=> expense.id === props.match.params.id)

});

const mapDispatchToProps = (dispatch, props) => ({
    startRemoveExpense: (data) => dispatch(startRemoveExpense(data)),
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense))
});

export default connect(mapSateToProps, mapDispatchToProps)(EditExpensePage);