
import React from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import LoginForm from '../forms/LoginForm';
import { login } from "../../actions/auth";

class LoginPage extends React.Component {

    submit = async data => {
        try {
            await this.props.login(data);
            this.props.history.push("/dashboard");
        } catch (error) {
            throw error;
        }
    }

    render() {
        return (
            <div>
                <h1>LoginPage</h1>

                <LoginForm submit={this.submit} />

                <Link to="/forgot_password">Forgot Password?</Link>
            </div>
        );
    }
}

LoginPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    login: PropTypes.func.isRequired
};

export default connect(null,{ login })(LoginPage);
