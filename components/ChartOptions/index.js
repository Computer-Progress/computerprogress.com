import { Wrapper, Item } from "./styles.js";

export default function ChartOptions({ buttons, selected, title }) {
  return (
    <Wrapper>
        <h4>{title}</h4>
        <div>
            {buttons.map((item, index) => (
              <Item onClick={item.onPress} selected={selected == index}>{item.name}</Item>
            ))}
        </div>
    </Wrapper>
    );
}