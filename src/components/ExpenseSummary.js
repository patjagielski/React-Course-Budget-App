import React from 'react';
import numeral from 'numeral';
import {connect} from 'react-redux';
import selectTotalExpense from '../selectors/expenses-total';
import selectExpenses from'../selectors/expenses';

export const ExpenseSummary = ({expenseCount, expenseTotal}) => {
    const expenseWord = expenseCount > 1 ? 'expenses' : "expense";
    const formatExpenseTotal = numeral(expenseTotal / 100).format('$0,0.00');
    return (
    <div>
       <h1>Viewing {expenseCount} {expenseWord} totalling {formatExpenseTotal}</h1>
    </div>
    );
};

const mapStateToProps = (state) => {
    const visibleExpenses = selectExpenses(state.expenses, state.filters);

    return {
      expenseCount: visibleExpenses.length,
      expenseTotal: selectTotalExpense(visibleExpenses)
    };
};

export default connect(mapStateToProps)(ExpenseSummary);