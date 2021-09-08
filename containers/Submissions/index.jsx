import PrivatePage from "../../components/PrivatePage";
import UserPageTemplate from "../../components/UserPageTemplate";
import Submissions from '../../components/Submissions';

function Review() {
  // const isMobile = useMediaQuery(MuiTheme.breakpoints.down("md"));
  const papers = [
    {
      name: 'Segmentation Transformer: Object Contextual Representations',
      models: [
        'Semantic Segmentation',
        'Panoptic Segmentation',
      ],
      last_update: '2 dias atrás',
      status: 0,
    },
    {
      name: 'Segmentation Transformer: Object Contextual Representations',
      models: [
        'Semantic Segmentation',
        'Panoptic Segmentation',
      ],
      last_update: '2 dias atrás',
      status: 2,
    },
    {
      name: 'Segmentation Transformer: Object Contextual Representations',
      models: [
        'Semantic Segmentation',
        'Panoptic Segmentation',
      ],
      last_update: '2 dias atrás',
      status: 1,
    },
  ]

  return (
    <UserPageTemplate selectedPage={1}>
      <Title>Submissions</Title>
      <Submissions papers={papers} />
    </UserPageTemplate>
  );
}

export default PrivatePage(Review)
