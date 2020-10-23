import * as colors from '../../colors';
import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  background: ${colors.darkPrimary};
  color: #fff;

  min-width: 0;
  flex: 0 0 250px;

  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  padding: 15px;
  flex-shrink: 0;
  border-top: 2px solid transparent;
  border-bottom: 2px solid ${colors.darkSecondary};
`;

const HeaderTitle = styled.h2`
  font-size: 1em;
  margin: 0;
  font-weight: normal;
`;

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function SideBar({ title, children }: Props) {
  return (
    <Section>
      <Header>
        <HeaderTitle>{title}</HeaderTitle>
      </Header>
      {children}
    </Section>
  )
}
