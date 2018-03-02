import React from 'react';
import { Message, Form, Button } from 'semantic-ui-react';
import Validator from 'validator';
import PropTypes from 'prop-types';
import InlineError from '../messages/InlineError';

class ForgotPasswordForm extends React.Component {
    state = {
      data: {
        email: ''
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
      if (!Validator.isEmail(data.email)) errors.email = "Email is invalid"
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
            <Form.Field error={!!errors.email}>
                <label htmlFor="email">Email</label>
                <input
                type="email" 
                id="email" 
                name="email" 
                placeholder="example@gmail.com"
                value= { data.email}
                onChange={ this.onChange } 
                />
                {errors.email && <InlineError text={errors.email}/>}
            </Form.Field>
            <Button primary>Send</Button>
        </Form>
        );
    }
}

ForgotPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired
}

export default ForgotPasswordForm;
