import { connect } from 'react-redux';

import { rehydrateNameandAccountNum } from '../actions';
import App from '../components/App';

const mapStateToProps = (state) => (
    {
        name: state.name,
        accountNumber: state.accountNumber,
    }
);

const mapDispatchToProps = (dispatch) => (
    {
        onRehydrateFromLocalStorage: (name, accountNumber) => {
            dispatch(rehydrateNameandAccountNum(name, accountNumber));
        }
    }
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
