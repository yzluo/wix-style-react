import React from 'react';

import {Container, Row, Col} from 'wix-style-react/Grid';
import Card from 'wix-style-react/Card';

import FormField from 'wix-style-react/FormField';
import Input from 'wix-style-react/Input';
import Button from 'wix-style-react/Button';

export default () =>
  <div data-hook="card-example" style={{background: '#F0F4F7', padding: 30}}>
    <Container>
      <Row>
        <Col span={6}>
          <Card>
            <Card.CollapsedHeader title="Card with collapsable content">
              <Card.Content>
                {field()}
              </Card.Content>
            </Card.CollapsedHeader>
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Card.CollapsedHeader
              title="Card with collapsable content"
              subtitle="with button toggle"
              toggleStyle="button"
              >
              <Card.Content>
                {field()}
              </Card.Content>
            </Card.CollapsedHeader>
          </Card>
        </Col>
      </Row>

      <ControlledExample/>
    </Container>
  </div>;

class ControlledExample extends React.Component {
  state = {
    collapsed: false,
    toggled: false
  };

  onCollapsedChange() {
    this.setState({toggled: true});
    setTimeout(() => this.setState({toggled: false}), 500);
  }

  render() {
    const {collapsed} = this.state;
    return (
      <Row>
        <Col span={10}>
          <Card>
            <Card.CollapsedHeader
              collapsed={collapsed}
              controlled
              title={`Controlled <Card collapsed={${collapsed.toString()}}>`}
              onCollapsedChange={this.onCollapsedChange}
              >
              <Card.Content>
                {field()}
              </Card.Content>
            </Card.CollapsedHeader>
          </Card>
        </Col>

        <Col span={2}>
          <Button
            onClick={() => this.setState(({collapsed}) => ({collapsed: !collapsed}))}
            height="large"
            theme={collapsed ? 'fullred' : 'fullblue'}
            >
            {collapsed ? 'Expand' : 'Collapse'}
          </Button>
        </Col>
      </Row>
    );
  }
}

function field() {
  return (
    <FormField label="Text Field">
      <Input placeholder="You can type here"/>
    </FormField>
  );
}
