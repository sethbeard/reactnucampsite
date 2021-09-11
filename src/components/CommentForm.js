import React, { Component } from "react";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";

import { Control, LocalForm } from "react-redux-form";

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      author: "",
      rating: "1",
      text: "",
      isModalOpen: false,
      touched: {
        author: false,
      },
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  validate(author) {
    const errors = {
      author: {
          text:"",
          valid:true
    }
}

    if (this.state.touched.author) {
      if (author.length < 2) {
          errors.author.valid = false;
        errors.author.text = "Name must be at least 2 characters.";
      } else if (author.length > 15) {
        errors.author.text = "Name must be 15 or less characters.";
        errors.author.valid = false;
      }
    }
    return errors;
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }
  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    alert("Current state is: " + JSON.stringify(this.state));
    this.toggleModal();
  }
  handleBlur = (field) => () => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };
  render() {
    const errors = this.validate(this.state.author);
    console.log(errors)
    return (
      <>
        <Button outline onClick={this.toggleModal}>
          <i className="fa fa-pencil  fa-lg" />
          Submit Comment
        </Button>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor=".rating">Rating:</label>
                <Control.select
                  model=".rating"
                  id="rating"
                  name="rating"
                  className="form-control"
                  onChange={this.handleInputChange}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Control.select>
                </div>
                 <div class="form-group">
                <label htmlFor=".author">Your Name</label>
                <Control.text
                  placeholder="Your Name"
                  model=".author"
                  id="author"
                  name="author"
                  className="form-control"
                  invalid={!errors.author.valid}
                  onChange={this.handleInputChange}
                  onBlur={this.handleBlur("author")}
                  
                ></Control.text>
                {!errors.author.valid ? <div class="alert alert-danger">{errors.author.text}</div>:<div />}
                
                </div>
                <div class="form-group">
                <label htmlFor=".text">Comment</label>
                <Control.textarea
                  rows="6"
                  model=".text"
                  id="text"
                  name="text"
                  className="form-control"
                  onChange={this.handleInputChange}
                ></Control.textarea>
              </div>
              <Button type="submit" value="submit" color="primary" disabled={!errors.author.valid}>
                Submit
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

export default CommentForm;
