import { Wrapper, Item } from "./styles.js";

export default function Dataset() {
  return (
    <Wrapper>
        <h4>Datasets</h4>
        <div>
            <Item selected>WMT 2014 (EN-FR)</Item>
            <Item>WMT 2014 (EN-FR)</Item>
        </div>
    </Wrapper>
    );
}