import React from 'react';

import Card from 'wix-style-react/Card';
import {Container, Row, Col} from 'wix-style-react/Grid';
import {Add} from 'wix-style-react/new-icons';
import TextLink from 'wix-style-react/TextLink';
import EmptyState from 'wix-style-react/EmptyState';

import ImagePlaceholder from '../assets/ImagePlaceholder';

export default () =>
  <div style={{background: '#F0F4F7', padding: 30}} data-hook="card-example-empty-state">
    <Container>
      <Row stretchViewsVertically>
        <Col span={9}>
          <Card stretchVertically>
            <Card.ButtonHeader
              withNewIcons
              title="Card title"
              buttonOnClick={() => alert('Clicked!')}
              theme="fullblue"
              buttonTitle="New image"
              buttonPrefix={<Add/>}
              />

            <Card.Content>
              <EmptyState
                title="You don't have any images yet"
                subtitle="Start by adding new images to your album"
                image={<ImagePlaceholder/>}
                children={<TextLink prefixIcon={<Add/>}>Add image</TextLink>}
                />
            </Card.Content>
          </Card>
        </Col>

        <Col span={3}>
          <Card stretchVertically/>
        </Col>
      </Row>

    </Container>
  </div>;
