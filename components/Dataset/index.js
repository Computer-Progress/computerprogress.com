import { Wrapper, Item } from "./styles.js";

export default function Dataset({ buttons, selected }) {
  return (
    <Wrapper>
        <h4>Datasets</h4>
        <div>
            {buttons.map((item, index) => (
              <Item onClick={item.onPress} selected={selected == index}>{item.name}</Item>
            ))}
        </div>
    </Wrapper>
    );
}