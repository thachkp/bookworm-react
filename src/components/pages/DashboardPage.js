import React from 'react';
import { connect } from "react-redux";
import Proptypes from "prop-types";
import ConfirmEmailMessage from "../messages/ConfirmEmailMessage";


const DashboardPage = ({isConfirmed}) => (
    <div>
        {!isConfirmed && <ConfirmEmailMessage />}
    </div>
);

DashboardPage.propTypes = {
    isConfirmed: Proptypes.bool.isRequired,
}

function mapStateToProps(state) {
    return {
        isConfirmed: !!state.user.confirmed
    }
}

export default connect(mapStateToProps)(DashboardPage);
