import React from "react";
import { Wrapper, ItemWrapper, Separator, StyledButton, Item } from "./styles";

import theme from "../../styles/theme";

const Tabs = ({ items, onClick, selected }) => {
  return (
    <Wrapper>
      {items.map((item, index) => (
        <>
          <ItemWrapper selected={selected === index}>
            <StyledButton
            selected={selected === index}
              color={theme.colors.black}
              onClick={item.onSelect}
            >
              {item.name}
            </StyledButton>
          </ItemWrapper>
          {index < items.length - 1 ? <Separator /> : null}
        </>
      ))}
    </Wrapper>
  );
};

export default Tabs;
