import React from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SignupForm from "../forms/SignupForm";
import { signup } from "../../actions/users";



class SignupPage extends React.Component {
    submit = async data => {
        try {
            await this.props.signup(data);
            this.props.history.push("/dashboard")
        } catch (error) {
            throw error;
        }
    }

    render() {
        return (
            <div>
                <h1>Signup Page</h1>

                <SignupForm submit={this.submit} />
            </div>
        )
    }
}

SignupPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    signup: PropTypes.func.isRequired
}

export default connect(null, { signup })(SignupPage);
