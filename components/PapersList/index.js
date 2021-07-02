
import PaperListItem from "./PaperListItem";

import { ItemsWrapper } from './styles';

export default function PapersList({ papers, accuracy, accuracy_list }) {
  const renderItem = (item, index) => (
    <PaperListItem item={item} index={index} length={papers.length} accuracy={accuracy} accuracy_list={accuracy_list} />
  )

  return (
    <ItemsWrapper>
        {papers.map((item, index) => renderItem(item, index))}
    </ItemsWrapper>
  )
}
