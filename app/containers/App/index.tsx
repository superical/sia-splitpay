import * as React from 'react';
import {Grid} from "react-bootstrap";
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";

interface IProps {

}

export class App extends React.Component<IProps, any> {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Grid fluid>
                    <Row>
                        <Col xs={12} md={12}>
                            <Row>
                                {this.props.children}
                            </Row>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default App;
