import React, { Component } from 'react';
import {
    Input, Form, FormGroup,
    FormFeedback, Alert,
    Container, Button,
    Row, Col, Label, Card,
    CardBody, CardText, CardFooter, CardHeader
} from 'reactstrap';
import reddit from '../Assets/reddit_logo.png'
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { alertActions } from '../_actions';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            url: '',
            touched: {
                url: false
            },
            submitted: false,
            visible: true
        };
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = (errors) => (e) => {
        e.preventDefault();

        this.setState({
            submitted: true
        })

        if (this.state.touched.url) {
            if (errors.url === '') {
                const url = this.state.url;
                const { dispatch } = this.props;
                dispatch(userActions.classify(url));
            }
        }
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true },
        });
    }

    openUrl = (url) => {
        window.open(url, "_blank")
    }

    validate(url) {
        const errors = {
            url: ''
        }

        if (this.state.touched.url) {
            if (0 === url.length) {
                errors.url = 'Reddit post\'s urls begin with https://www.reddit.com/'
            }
            else if (!url.startsWith("https://www.reddit.com")) {
                errors.url = 'Reddit post\'s urls begin with https://www.reddit.com/'
            }
        }
        else {
            if (this.state.submitted && 0 === url.length) {
                errors.url = 'Reddit post\'s urls begin with https://www.reddit.com/'
            }
        }

        return errors;
    }

    onDismiss = () => {
        const { dispatch } = this.props;
        dispatch(alertActions.clear());
    }

    render() {
        const { alert } = this.props;
        const errors = this.validate(this.state.url);

        if (this.props.classify.isLoading) {
            return (
                <div>
                    <Container className="App">
                        <img src={reddit} alt="Reddit logo" style={{ height: 'auto', width: '200px', WebkitBorderRadius: '50%', marginBottom: "10px", marginTop: "50px" }} />
                        <h3 style={{ color: "#EFEFED", marginBottom: "10px" }}>Reddit flair classifier</h3>
                        <Row>
                            <Col sm="12" lg={{ size: 6, offset: 3 }} md={{ size: 6, offset: 3 }}>
                                <Loader type="ThreeDots" color="#EFEFED" height={100} width={100} />
                            </Col>
                        </Row>
                    </Container>
                </div>
            )
        }
        else if (this.props.classify.data) {
            return (
                <div>
                    <Container className="App">
                        <img src={reddit} alt="Reddit logo" style={{ height: 'auto', width: '200px', WebkitBorderRadius: '50%', marginBottom: "10px", marginTop: "50px" }} />
                        <h3 style={{ color: "#EFEFED", marginBottom: "20px" }}>Reddit flair classifier</h3>
                        <div style={{ marginBottom: "50px" }}>
                            <Row>
                                <Col sm="12" lg={{ size: 8, offset: 2 }} md={{ size: 8, offset: 2 }}>
                                    <Card style={{ backgroundColor: "#222222", borderColor: "#545452" }}>
                                        <CardHeader style={{ backgroundColor: "#545452" }} tag="h5">
                                            <Label style={{ color: "#EFEFED", marginRight: "20px" }}>
                                                Actual flair: {this.props.classify.data.link_flair_text}
                                            </Label>
                                            {this.props.classify.data.link_flair_text !== "None" ?
                                                this.props.classify.data.link_flair_text === this.props.classify.data.predicted_flair ?
                                                    <Label style={{ color: "#3BCB56" }}>Predicted flair: {this.props.classify.data.predicted_flair}</Label> :
                                                    <Label style={{ color: "#ED001C" }}>Predicted flair: {this.props.classify.data.predicted_flair}</Label> :
                                                <Label style={{ color: "#EFEFED" }}>Predicted flair: {this.props.classify.data.predicted_flair}</Label>
                                            }
                                        </CardHeader>
                                        <CardBody>
                                            <CardText style={{ color: "#EFEFED" }}>{this.props.classify.data.title}</CardText>
                                            <CardText>
                                                {this.props.classify.data.selftext === "" ?
                                                    <span style={{ color: "#A5A4A4" }}>This post has no body</span> :
                                                    <span style={{ color: "#EFEFED" }}>{this.props.classify.data.selftext}</span>
                                                }
                                            </CardText>
                                        </CardBody>
                                        <CardFooter style={{ backgroundColor: "#545452" }}>
                                            <Label style={{ color: "#A5A4A4", cursor: "pointer" }} onClick={() => this.openUrl(this.state.url)}>Go to the post</Label>
                                        </CardFooter>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                        <Row style={{ marginBottom: "20px" }}>
                            <Col sm="12" lg={{ size: 6, offset: 3 }} md={{ size: 6, offset: 3 }}>
                                <h3 style={{ color: "#EFEFED", marginBottom: "20px" }}>Classify more posts!</h3>
                                {alert.message &&
                                    <Alert color={alert.type} isOpen={true} toggle={this.onDismiss}>{alert.message}</Alert>
                                }
                                <Form>
                                    <FormGroup>
                                        <Input style={{ marginBottom: "10px", background: "#222222", color: "#EFEFED", borderBlockColor: "#545452" }}
                                            type="url" id="url" name="url"
                                            value={this.state.url}
                                            valid={errors.url === ''}
                                            invalid={errors.url !== ''}
                                            onBlur={this.handleBlur('url')}
                                            placeholder="Enter a Reddit post's URL"
                                            onChange={this.handleInputChange} />
                                        <FormFeedback>{errors.url}</FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Button onClick={this.handleSubmit(errors, "log")} type="submit" style={{ borderColor: "#0077D6", backgroundColor: "#0077D6", color: "#EFEFED" }} block>Classify me!</Button>
                                    </FormGroup>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </div >
            )
        }

        return (
            <div>
                <Container className="App">
                    <img src={reddit} alt="Reddit logo" style={{ height: 'auto', width: '200px', WebkitBorderRadius: '50%', marginBottom: "10px", marginTop: "50px" }} />
                    <h3 style={{ color: "#EFEFED", marginBottom: "10px" }}>Reddit flair classifier</h3>
                    <Row>
                        <Col sm="12" lg={{ size: 6, offset: 3 }} md={{ size: 6, offset: 3 }}>
                            {alert.message &&
                                <Alert color={alert.type} isOpen={true} toggle={this.onDismiss}>{alert.message}</Alert>
                            }
                            <Form>
                                <FormGroup>
                                    <Input style={{ marginBottom: "10px", background: "#222222", color: "#EFEFED", borderBlockColor: "#545452" }}
                                        type="url" id="url" name="url"
                                        value={this.state.url}
                                        valid={errors.url === ''}
                                        invalid={errors.url !== ''}
                                        onBlur={this.handleBlur('url')}
                                        placeholder="Enter a Reddit post's URL"
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.url}</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Button onClick={this.handleSubmit(errors)} type="submit" style={{ borderColor: "#0077D6", backgroundColor: "#0077D6", color: "#EFEFED" }} block>Classify me!</Button>
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        classify: state.classify,
        alert: state.alert
    };
}

const connectedHomePage = connect(mapStateToProps)(Home);
export { connectedHomePage as Home }; 