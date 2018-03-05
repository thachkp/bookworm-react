import React from 'react';
import { Message, Form, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import InlineError from '../messages/InlineError';

class ForgotPasswordForm extends React.Component {
    state = {
      data: {
        token: this.props.token,
        password: '',
        passwordMatch: ''
      },
      loading: false,
      errors: {}
    }

    onChange = e => this.setState({
      data: { ...this.state.data,
        [e.target.name]: e.target.value
      }
    });

    onSubmit = (e) => {
      e.preventDefault();
      const errors = this.validate(this.state.data);
      this.setState({
        errors
      });
      if (Object.keys(errors).length === 0) {
        this.setState({
          loading: true
        });

        this.props.submit(this.state.data)
          .catch(err => this.setState({
            errors: err.response.data.errors,
            loading: false
          }));
      }
    }

    validate = (data) => {
      const errors = {};
      if (!data.password) errors.password = "Cannot be blank"
      if (!data.passwordMatch) errors.passwordMatch = "Cannot be blank"
      if (data.password !== data.passwordMatch) errors.passwordMatch = "Password does not match"
      return errors;
    }

    render() {
        const {
          data,
          errors,
          loading
        } = this.state;

        return (
          <Form onSubmit={this.onSubmit} loading={loading}>
            {!!errors.global && (
              <Message negative> {errors.global} </Message>
            )}
            <Form.Field error={!!errors.password}>
                <label htmlFor="password">Password</label>
                <input
                type="password" 
                id="password" 
                name="password" 
                placeholder="new password"
                value= { data.password}
                onChange={ this.onChange } 
                />
                {errors.password && <InlineError text={errors.password}/>}
            </Form.Field>

            <Form.Field error={!!errors.passwordMatch}>
                <label htmlFor="passwordMatch">Confirm your new password</label>
                <input
                type="password" 
                id="passwordMatch" 
                name="passwordMatch" 
                placeholder="retype new password"
                value= { data.passwordMatch}
                onChange={ this.onChange } 
                />
                {errors.passwordMatch && <InlineError text={errors.passwordMatch}/>}
            </Form.Field>
            
            <Button primary>Send</Button>
        </Form>
        );
    }
}

ForgotPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired
}

export default ForgotPasswordForm;
