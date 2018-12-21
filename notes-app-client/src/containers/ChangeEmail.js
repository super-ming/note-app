import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { HelpBlock, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./ChangeEmail.css";

export default class ChangeEmail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: "",
      email: "",
      codeSent: false,
      isConfirming: false,
      isSendingCode: false,
      isResendingCodeEmail: false
    };
  }

  validateEmailForm() {
    return this.state.email.length > 0;
  }

  validateConfirmForm() {
    return this.state.code.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleUpdateClick = async event => {
    event.preventDefault();

    this.setState({ isSendingCode: true });

    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(user, { email: this.state.email });

      this.setState({ codeSent: true });
    } catch (e) {
      alert(e.message);
      this.setState({ isSendingCode: false });
    }
  };

  handleConfirmClick = async event => {
    event.preventDefault();

    this.setState({ isConfirming: true });

    try {
      await Auth.verifyCurrentUserAttributeSubmit("email", this.state.code);

      this.props.history.push("/settings");
    } catch (e) {
      alert(e.message);
      this.setState({ isConfirming: false });
    }
  };

  handleResendCodeEmail = async event => {
    event.preventDefault();
    this.setState({ isResendingCodeEmail: true });

    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      await Auth.userAttributes(currentUser);
      if (currentUser.attributes["email_verified"] !== "false") {
        Auth.verifyCurrentUserAttribute("email").then(()=> {
          alert("A confirmation code has been sent to your email.")
          this.setState({ isResendingCodeEmail: false });
        }).catch(e=> {
          alert("The following error occurred: ", e.message)
        })
      }
    } catch (e) {
      alert(e);
    }
  }

  renderUpdateForm() {
    return (
      <form onSubmit={this.handleUpdateClick}>
        <FormGroup bsSize="large" controlId="email">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          text="Update Email"
          loadingText="Updating…"
          disabled={!this.validateEmailForm()}
          isLoading={this.state.isSendingCode}
        />
      </form>
    );
  }

  renderConfirmationForm() {
    return (
      <form onSubmit={this.handleConfirmClick}>
        <FormGroup bsSize="large" controlId="code">
          <ControlLabel>Confirmation Code</ControlLabel>
          <FormControl
            autoFocus
            type="tel"
            value={this.state.code}
            onChange={this.handleChange}
          />
          <HelpBlock>
            Please check your email ({this.state.email}) for the confirmation
            code.
            <LoaderButton
              block
              type="submit"
              bsSize="small"
              text="Resend Confirmation Code Email"
              loadingText="Sending…"
              isLoading={this.state.isResendingCodeEmail}
              onClick={this.handleResendCodeEmail}
            />
          </HelpBlock>
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          text="Confirm"
          loadingText="Confirm…"
          isLoading={this.state.isConfirming}
          disabled={!this.validateConfirmForm()}
        />
      </form>
    );
  }

  render() {
    return (
      <div className="ChangeEmail">
        {!this.state.codeSent
          ? this.renderUpdateForm()
          : this.renderConfirmationForm()}
      </div>
    );
  }
}
