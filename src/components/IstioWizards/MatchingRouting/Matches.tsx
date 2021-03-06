import * as React from 'react';
import { Chip } from '@patternfly/react-core';
import { style } from 'typestyle';

type Props = {
  matches: string[];
  onRemoveMatch: (match: string) => void;
};

const labelContainerStyle = style({
  marginTop: 5
});

class Matches extends React.Component<Props> {
  render() {
    const matches: any[] = this.props.matches.map((match, index) => (
      <span key={match + '-' + index}>
        <Chip onClick={() => this.props.onRemoveMatch(match)}>{match}</Chip>{' '}
      </span>
    ));
    return (
      <div className={labelContainerStyle}>
        Matching selected: {matches.length > 0 ? matches : <b>Match any request</b>}
      </div>
    );
  }
}

export default Matches;
