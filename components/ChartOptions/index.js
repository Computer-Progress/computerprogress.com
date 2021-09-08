import { Wrapper, Item } from "./styles.js";
import DoneIcon from "@material-ui/icons/Done";

export default function ChartOptions({
  buttons,
  selected,
  title,
  onPress,
  secondTitle,
  secondButtons,
  onPressSecond,
  selectedSecond,
}) {
  return (
    <Wrapper>
      <h4>{title}</h4>
      <div>
        {buttons.map((item, index) => (
          <Item
            onClick={() => onPress(item, index)}
            avatar={selected == index ? <DoneIcon /> : null}
            label={item.name}
            selected={selected == index}
          ></Item>
        ))}
      </div>
      {secondTitle && secondButtons ? (
        <>
          <h4>{secondTitle}</h4>
          <div>
            {secondButtons.map((item, index) => (
              <Item
                onClick={() => onPressSecond(item, index)}
                avatar={selectedSecond == index ? <DoneIcon /> : null}
                label={item.name}
                selected={selected == index}
              ></Item>
            ))}
          </div>
        </>
      ) : null}
    </Wrapper>
  );
}
