import React from 'react';
import PropTypes from "prop-types"
import { connect } from "react-redux";
import { Message, Icon, MessageContent, MessageHeader } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import { confirm } from "../../actions/auth";

class ConfirmationPage extends React.Component {
    state = { 
        loading: true,
        success: false
     }

    componentDidMount() {
        this.props.confirm(this.props.match.params.token)
        .then(() => this.setState({ loading: false, success : true }))
        .catch(() => this.setState({ loading: false, success : false}))
    }
    render() {
        const { loading, success } = this.state;

        return (
            <div>
                {loading && (
                    <Message icon>
                        <Icon name= "circle notched" loading />
                        <MessageHeader>Validating your email</MessageHeader>
                    </Message>
                )}

                {!loading && success && (
                    <Message success icon >
                        <Icon name= "checkmark"/>
                        <MessageContent>
                            <MessageHeader>
                                Thank you. Your acount has been verified. 
                            </MessageHeader>
                            <Link to="/dashboard">Go to your dashboard</Link>
                        </MessageContent>
                    </Message>
                )}

                {!loading && !success && (
                    <Message negative icon >
                        <Icon name= "warning sign"/>
                        <MessageContent>
                            <MessageHeader>
                                Oooops. invalid token it seems
                            </MessageHeader>
                        </MessageContent>
                    </Message>
                )}
            </div>
        );
    }
}

ConfirmationPage.propTypes = {
    confirm: PropTypes.func.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            token: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
}

export default connect(null, { confirm } )(ConfirmationPage);
