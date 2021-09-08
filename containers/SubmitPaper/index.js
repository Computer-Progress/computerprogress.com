import PrivatePage from "../../components/PrivatePage";
import PageTemplate from "../../components/PageTemplate";
import PaperSubmission from "../../components/PaperSubmission";

function SubmitPaper() {
  return (
    <PageTemplate>
      <PaperSubmission />
    </PageTemplate>
  );
}

export default PrivatePage(SubmitPaper);
