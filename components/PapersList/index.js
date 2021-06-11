
import PaperListItem from "./PaperListItem";

import { ItemsWrapper } from './styles';

export default function PapersList({ papers, accuracy }) {
  const renderItem = (item, index) => (
      <a>
        <PaperListItem item={item} index={index} length={papers.length} accuracy={accuracy} />
      </a>
  )

  return (
    <ItemsWrapper>
        {papers.map((item, index) => renderItem(item, index))}
    </ItemsWrapper>
  )
}
