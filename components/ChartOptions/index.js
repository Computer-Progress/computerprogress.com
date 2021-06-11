import { Wrapper, Item } from "./styles.js";
import DoneIcon from '@material-ui/icons/Done';


export default function ChartOptions({ buttons, selected, title }) {
  return (
    <Wrapper>
        <h4>{title}</h4>
        <div>
            {buttons.map((item, index) => (
              <Item onClick={item.onPress} avatar={selected == index ? <DoneIcon /> : null} label={item.name} selected={selected == index}></Item>
            ))}
        </div>
    </Wrapper>
    );
}