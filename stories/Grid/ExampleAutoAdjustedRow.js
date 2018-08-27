import React from 'react';

import {Container, AutoAdjustedRow} from 'wix-style-react/Grid';
import Card from 'wix-style-react/Card';
import Tooltip from 'wix-style-react/Tooltip';

export default () =>
  <div style={{background: '#F0F4F7', padding: 30}}>
    <Container>
      <AutoAdjustedRow>
        <Card stretchVertically>
          <Card.ButtonHeader
            tooltip={<Tooltip placement="top" alignment="center" content="Hi there!"/>}
            title="Stretched Card 1"
            buttonOnClick={() => alert('Clicked!')}
            buttonTitle="Tooltip button!"
            />
          <Card.Content>
            Here comes some AMAZING content that will blow your mind.
            Or just show you that the card next to me got my height.
          </Card.Content>
        </Card>

        <Card stretchVertically>
          <Card.ButtonHeader
            tooltip={<Tooltip placement="top" alignment="center" content="Hi there!"/>}
            title="Stretched Card 2"
            buttonOnClick={() => alert('Clicked!')}
            buttonTitle="Tooltip button!"
            />
        </Card>
      </AutoAdjustedRow>

      <AutoAdjustedRow>
        <Card>
          <Card.Header title="Card 1"/>
        </Card>

        <Card>
          <Card.Header title="Card 2"/>
        </Card>

        <Card>
          <Card.Header title="Card 3"/>
        </Card>

        <Card>
          <Card.Header title="Card 4"/>
        </Card>
      </AutoAdjustedRow>
    </Container>
  </div>;
